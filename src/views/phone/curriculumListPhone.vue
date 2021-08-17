<template>
  <div class="temp">
    <div class="backgroundColor"></div>
    <header class="header">
      <ClassTab :current="titleIndex" @selectTab="selection" />
    </header>
    <body class="body">
      <div id="liveBox" v-if="titleIndex == 0">
        <div class="noCurriculumList ft14" v-show="liveClassList == ''">
          当前暂无直播课程
        </div>
        <div>
          <TodayCard :list="liveClassList" :type="1"></TodayCard>
        </div>
      </div>
      <div class="recordingBox" v-else>
        <div class="noCurriculumList ft14" v-show="recordingClassList == ''">
          当前暂无视频课程
        </div>
        <div
          class="curriculumList"
          v-for="item in recordingClassList"
          :key="item.id"
        >
          <div class="videoPackageBox">
            <VideoPackage :info="item" @toRecordListPhone="play">
            </VideoPackage>
          </div>
          <!-- <div class="curriculumInfoBox">
            <div
              class="curriculumImg cover_size"
              :style="{
                background:
                  'url(' +
                  item.cdn +
                  item.logo +
                  ')' +
                  'no-repeat center center / cover'
              }"
            ></div>
            <div class="layout">
              <div class="curriculumInfo">
                <span class="curriculumInfoTitle ft16">{{ item.name }}</span>
                <div class="curriculumInfoName ft12">
                  <span>{{
                    item.watch_lesson_name == ""
                      ? ""
                      : `观看至 ${item.watch_lesson_name}`
                  }}</span>
                </div>
              </div>
              <dir class="buttonBox">
                <button class=" button_color ft13" @click="play(item)">
                  <span>开始上课</span>
                  <img src="../../assets/img/ic_get_in_white.png" />
                  <img src="../../assets/img/btn_ic_play_dis.png" />
                </button>
              </dir>
            </div>
          </div> -->
        </div>
      </div>
    </body>
  </div>
</template>

<script>
import { getMyLiveClass, getMyRecordClasses } from "../../api/common";
import ClassTab from "../../components/classTab";
import TimeBar from "../../components/timeBar";
import ClassButton from "../../components/classButton";
import VideoPackage from "../../components/videoPackage";
import { Toast } from "vant";
import DateTimeTab from "../../components/dateTimeTab";
import TodayCard from "../../components/todayCard";
export default {
  components: {
    [Toast.name]: Toast,
    ClassTab,
    TimeBar,
    ClassButton,
    DateTimeTab,
    TodayCard,
    VideoPackage
  },
  data() {
    return {
      info: {
        isCanClick: true
      },
      titleList: [
        { id: 0, name: "直播课" },
        { id: 1, name: "视频课" }
      ],
      liveClassList: [],
      recordingClassList: [],
      titleIndex: 0,
      sum: 0
    };
  },
  created() {
    let titleNum = localStorage.getItem("titleNum");
    if (titleNum == null || titleNum == "") {
      localStorage.setItem("titleNum", 0);
    } else {
      this.titleIndex = titleNum;
    }
    let that = this;
    dsBridge.registerAsyn("RefreshData", function(arg1, arg2, arg3) {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });
      let second = 3;
      const timer = setInterval(() => {
        second--;
        if (second) {
        } else {
          clearInterval(timer);
          Toast.clear();
        }
      }, 1000);
      let flag = 0;
      let newTime = Math.round(new Date() / 1000);
      getMyLiveClass().then(res => {
        if (res.code == 0) {
          that.liveClassList = res.data;
          for (let index = 0; index < that.liveClassList.length; index++) {
            if (
              that.liveClassList[index].start_time >= newTime ||
              (that.liveClassList[index].start_time < newTime &&
                that.liveClassList[index].end_time > newTime)
            ) {
              break;
            }
            flag++;
          }
          that.sum = flag * 182;
          that.selection(that.titleIndex);
          if (that.titleIndex == 0) {
            Toast.clear();
          }
        } else {
          that.$toast(res.msg);
        }
      });
      getMyRecordClasses().then(res => {
        if (res.code == 0) {
          that.recordingClassList = res.data;
          if (that.titleIndex == 1) {
            Toast.clear();
          }
        } else {
          that.$toast(res.msg);
        }
      });
    });
  },
  mounted() {
    dsBridge.call("showtabbar", "", function(v) {});
    let flag = 0;
    let newTime = Math.round(new Date() / 1000);
    //status 3-直播中 2-结束  1-未开始
    getMyLiveClass().then(res => {
      if (res.code == 0) {
        this.liveClassList = res.data;
        for (let index = 0; index < this.liveClassList.length; index++) {
          if (
            this.liveClassList[index].start_time >= newTime ||
            (this.liveClassList[index].start_time < newTime &&
              this.liveClassList[index].end_time > newTime)
          ) {
            break;
          }
          flag++;
        }
        this.sum = flag * 182;
        this.selection(this.titleIndex);
      } else {
        this.$toast(res.msg || res.message);
      }
    });
    getMyRecordClasses().then(res => {
      if (res.code == 0) {
        this.recordingClassList = res.data;
      } else {
        this.$toast(res.msg);
      }
    });
    dsBridge.registerAsyn("goback", function(arg1, arg2, arg3) {
      dsBridge.call("goexit", "", function(v) {});
    });
  },
  methods: {
    toEvaluate(item) {
      if (item.report_id == 0) {
        this.$toast("课堂报告生成中");
      } else {
        this.$router.push({
          path: "/phone/evaluatePhone",
          query: {
            class_name: item.lesson_info.name,
            token: this.$route.query.token,
            schedule_id: item.report_id
          }
        });
      }
    },
    play(item) {
      this.$router.push({
        path: "/phone/recordListPhone",
        query: {
          class_id: item.class_id,
          class_name: item.name,
          token: this.$route.query.token
        }
      });
    },
    start(item) {
      let model = {
        classId: item.clazz_id,
        lessonId: item.lesson_id,
        lessonName: item.lesson_info.name,
        clazzId: item.clazz_id
      };
      // dsBridge.call("classbegin", JSON.stringify(model), function(v) {});
      if (item.class.class_type == 1) {
        dsBridge.call("largeclassbegin", JSON.stringify(model), function(v) {});
      } else if (item.class.class_type == 2) {
        dsBridge.call("smallclassbegin", JSON.stringify(model), function(v) {});
      } else if (item.class.class_type == 3) {
        dsBridge.call("classbegin", JSON.stringify(model), function(v) {});
      } else if (item.class.class_type == 4) {
        dsBridge.call("normalclassbegin", JSON.stringify(model), function(
          v
        ) {});
      }
    },
    playback(item) {
      if (item.play_url) {
        let model = {
          videoid: 0,
          videoplay: item.cdn + item.play_url,
          videorate: 0
        };
        dsBridge.call("video", JSON.stringify(model), function(v) {});
      } else {
        this.$toast("回放资源准备中");
      }
    },
    timeCalculation(item, number) {
      if (item.status == 1) {
        let index = item.start_time - Math.round(new Date() / 1000);
        let endIndex = item.end_time - Math.round(new Date() / 1000);
        if (
          (index > 0 && index <= item.first_advance_sec) ||
          (index < 0 && endIndex >= 0)
        ) {
          // this.liveClassList[number].status = 2;
          return;
        } else if (index < 0 && endIndex < 0) {
          this.liveClassList[number].status = 3;
          return;
        } else if (index < 3600) {
          return Math.floor(index / 60) + " 分钟后开始";
        } else if (index < 86400 && index > 3600) {
          return Math.floor(index / 3600) + " 小时后开始";
        } else if (index > 86400) {
          return;
        }
      } else return;
    },
    ready(item) {
      if (item.status == 1) {
        let index = item.start_time - Math.round(new Date() / 1000);
        let endIndex = item.end_time - Math.round(new Date() / 1000);
        if (
          (index > 0 && index <= item.first_advance_sec) ||
          (index < 0 && endIndex >= 0)
        ) {
          return true;
        } else {
          return false;
        }
      }
    },
    // resources(item) {
    //   if (item.status == 3) {
    //     if (item.play_url) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   }
    // },
    selection(index) {
      this.titleIndex = index;
      localStorage.setItem("titleNum", index);
      if (index == 0) {
        this.$nextTick(() => {
          window.scrollTo(0, this.sum);
        });
      } else {
        this.$nextTick(() => {
          window.scrollTo(0, 0);
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.temp {
  min-height: 100%;
  // background: rgba(243, 245, 249, 1);
  // box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.12);
  .header {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    padding-top: 16px;
    padding-bottom: 6.5px;
    padding-left: 10px;
    // display: flex;
    // justify-content: center;
    position: fixed;
    top: 0;
    z-index: 1;
    .titleSelection {
      margin: 0px 30px;
      // width: 65px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .titleText {
        // font-size: 21px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(130, 138, 153, 1);
        line-height: 29.5px;
      }
      .titleText.active {
        color: rgba(41, 45, 51, 1);
      }
      .titleSign {
        margin-top: 4px;
        width: 40px;
        height: 5px;
        background: rgba(101, 81, 234, 1);
        box-shadow: 0px -2px 0px 0px rgba(255, 255, 255, 0.15);
        border-radius: 14px;
      }
    }
  }
  .body {
    width: calc(100% -30px);
    padding: 61px 15px 15px 15px;
    #liveBox {
      .noCurriculumList {
        margin-top: 90px;
        text-align: center;
        // font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(184, 192, 205, 1);
        line-height: 20px;
      }
      .curriculumList {
        margin-top: 20px;
        .curriculumTimeBox {
          display: flex;
          align-items: center;
          .curriculumSign {
            width: 8px;
            height: 8px;
            box-shadow: 0px -1px 0px 0px rgba(255, 255, 255, 0.15);
            border-radius: 4px;
            margin-right: 8px;
          }
          .curriculumSign.active {
            background: rgba(184, 191, 204, 1);
          }
          .curriculumTime {
            // font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(130, 138, 153, 1);
            line-height: 20px;
            white-space: nowrap;
          }
        }
        .curriculumInfoBox {
          position: relative;
          margin-top: 12px;
          padding: 15px;
          width: calc(100% - 30px);
          background: rgba(255, 255, 255, 1);
          border-radius: 8px;
          display: flex;
          flex-direction: row;
          .curriculumImg {
            background: #f2f5fa;
            margin-right: 12px;
            .classImg {
              object-fit: cover;
            }
          }
          .layout {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 100%;
          }
          .curriculumInfo {
            .curriculumInfoTitle {
              // font-size: 16px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: rgba(41, 45, 51, 1);
              line-height: 22.5px;
            }
            .curriculumInfoName {
              margin-top: 4px;
              // font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(130, 138, 153, 1);
              line-height: 16.5px;
              img {
                height: 10px;
                width: 11px;
                margin-left: 8px;
              }
            }
          }
          .buttonBox {
            display: flex;
            flex-direction: row-reverse;
            margin-top: 10px;
            span {
              // font-size: 14px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: rgba(130, 138, 153, 1);
              line-height: 20px;
            }
            button {
              position: relative;
              padding: 0;
              width: 105px;
              height: 28px;
              box-shadow: 0px -2px 0px 0px rgba(255, 255, 255, 0.15);
              border-radius: 14px;
              border: 0px;
              // font-size: 13px;

              line-height: 28px;
              display: flex;
              justify-content: center;
              span {
                line-height: 28px;
                padding-right: 20px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
              }
              img {
                position: absolute;
                width: 12px;
                height: 12px;
                top: 50%;
                right: 16px;
                transform: translate(0, -50%);
              }
            }
            div {
              display: flex;
              flex-direction: row;
              button {
                padding: 0;
                width: 90px;
                height: 28px;
                border-radius: 14px;
                border: 1px solid rgba(255, 115, 0, 1);
                background: rgba(255, 255, 255, 1);
                // font-size: 13px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: rgba(255, 115, 0, 1);
                line-height: 26px;
              }
              button.active {
                border: 1px solid rgba(255, 115, 0, 0.5);
                color: rgba(255, 115, 0, 0.5);
              }
            }
          }
        }
      }
    }
    .recordingBox {
      .noCurriculumList {
        margin-top: 90px;
        text-align: center;
        // font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(184, 192, 205, 1);
        line-height: 20px;
      }
      .curriculumList {
        margin-top: 20px;
        .videoPackageBox {
          width: 100%;
        }
        .curriculumInfoBox {
          position: relative;
          margin-top: 12px;
          padding: 15px;
          width: calc(100% - 30px);
          background: rgba(255, 255, 255, 1);
          border-radius: 8px;
          display: flex;
          flex-direction: row;
          .curriculumImg {
            background: #f2f5fa;
            margin-right: 12px;
          }
          .layout {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 100%;
          }
          .curriculumInfo {
            .curriculumInfoTitle {
              // font-size: 16px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: rgba(41, 45, 51, 1);
              line-height: 22.5px;
            }
            .curriculumInfoName {
              margin-top: 4px;
              // font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(130, 138, 153, 1);
              line-height: 16.5px;
              img {
                height: 10px;
                width: 11px;
                margin-left: 8px;
              }
            }
          }
          .buttonBox {
            display: flex;
            flex-direction: row-reverse;
            margin-top: 10px;
            margin-bottom: 0px;
            button {
              position: relative;
              padding: 0;
              width: 105px;
              height: 28px;
              box-shadow: 0px -2px 0px 0px rgba(255, 255, 255, 0.15);
              border-radius: 14px;
              border: 0px;
              // font-size: 13px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              line-height: 28px;
              color: rgba(255, 255, 255, 1);
              display: flex;
              justify-content: center;
              span {
                padding-right: 20px;
              }
              img {
                position: absolute;
                width: 12px;
                height: 12px;
                top: 50%;
                right: 16px;
                transform: translate(0, -50%);
              }
            }
          }
        }
      }
    }
  }
}
</style>
