<template>
  <div class="cards">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="todayCard"
      :class="[type == 1 ? 'phone' : '', index >= 0 ? `LiveClass${index}` : '']"
    >
      <DateTimeTab :item="item"></DateTimeTab>
      <div class="bottomcard">
        <div class="title">{{ item.lesson_info.name }}</div>
        <div class="subtitle">{{ item.class.name }}</div>
        <div
          style="display: flex; justify-content: space-between; align-items:center;"
        >
          <div
            class="coursestatus before"
            v-if="item.status == 1 && !ready(item)"
          >
            {{ timeCalculation(item, index) || "待开播" }}
          </div>

          <div class="coursestatus ing" v-if="item.status == 2 || ready(item)">
            直播中
            <!-- {{ openingTime(item) }} -->
            <img
              style=" height: 10px;width: 11px;margin-left: 2px;"
              src="../assets/img/ic_live_orange.png"
              v-show="item.status == 2"
            />
          </div>
          <!-- <div
            class="coursestatus"
            v-if="item.status == 3 && item.class_status != 0"
          >
            已结束
          </div> -->
          <div
            class="coursestatus"
            v-if="item.status == 3 && item.class_status == 0"
          >
            已过期
          </div>

          <div style="display: flex;">
            <!-- <ClassButton
              v-if="item.status == 3 && item.role_id == 0 && item.is_leave == 1"
              :leave="true"
              :text="'查看报告'"
              :icon="'ic_reportwgite2.png'"
              :info="info"
            /> -->
            <div
              v-if="item.status == 3 && item.class_status != 0"
              class="afterButton"
              @click="toEvaluate(item, index)"
            >
              {{ item.role_id == 0 ? "查看报告" : "课堂报告" }}
            </div>
            <!-- <ClassButton
              v-else-if="item.status == 3 && item.class_status != 0"
              @click="toEvaluate(item, index)"
              :text="item.role_id == 0 ? '查看报告' : '课堂报告'"
              :icon="
                item.status == 3 && (item.role_id != 0 || item.report_id != 0)
                  ? 'ic_report.png'
                  : 'ic_report.png'
              "
              :disabled="
                item.status == 3 && (item.role_id != 0 || item.report_id != 0)
                  ? false
                  : true
              "
              :info="info"
            /> -->
            <div class="afterButton" @click="toprepareLessons(item)">
              备课资料
            </div>
            <!-- <ClassButton
              :text="'备课资料'"
              :icon="'ic-data2.png'"
              :disabled="true"
              :info="info"
              @click="toprepareLessons(item)"
            /> -->
            <!-- <ClassButton
              v-if="item.status == 3 && item.role_id == 0 && item.is_leave == 1"
              :leave="true"
              :text="'课程回顾'"
              :icon="'ic-vd-click2.png'"
              :info="info"
            /> -->
            <!-- <ClassButton
              v-else-if="item.status == 3 && item.class_status != 0"
              :text="'课程回顾'"
              :icon="item.play_url ? 'ic-video2.png' : 'ic-video2.png'"
              :disabled="item.play_url ? false : true"
              :info="info"
              @click="playback(item)"
            /> -->
            <div
              class="afterButton"
              v-if="item.status == 3 && item.class_status != 0"
              @click="playback(item)"
            >
              课程回顾
            </div>
            <!-- <ClassButton
              v-if="item.status != 3 && item.role_id == 0 && item.is_leave == 1"
              :text="'开始上课'"
              icon="ic-vd-click2.png"
              :leave="true"
              :info="info"
            /> -->
            <!-- <ClassButton
              style="background: #3dc17d;border: 2px solid #3abd77;"
              v-else-if="item.status != 3 && (item.status == 2 || ready(item))"
              @click="start(item)"
              :text="'开始上课'"
              :icon="
                item.status == 2 || ready(item)
                  ? 'ic-vd-click2.png'
                  : 'ic-video2.png'
              "
              :disabled="item.status == 2 || ready(item) ? false : true"
              :info="info"
            /> -->
            <div
              style="margin-left:10px"
              class="divButton disabled"
              v-if="item.status != 3 && item.role_id == 0 && item.is_leave == 1"
            >
              开始上课
            </div>
            <div
              style="margin-left:10px"
              class="divButton"
              v-else-if="item.status != 3 && (item.status == 2 || ready(item))"
              @click="start(item)"
            >
              开始上课
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DateTimeTab from "../components/dateTimeTab";
import ClassButton from "../components/classButton";
import { getMyLiveClassStatus } from "../api/common";
import { sendMessage } from "../api/client";

export default {
  name: "todayCard",
  props: ["list", "type"],
  components: {
    ClassButton,
    DateTimeTab
  },
  computed: {},
  data() {
    return {
      info: {
        isCanClick: true
      }
    };
  },
  mounted() {},
  methods: {
    // 教师备课资料
    toprepareLessons(item) {
      console.log(item);
      this.$router.push({
        path: "/pc/prepareLessons",
        query: {
          schedule_id: item.id,
          lesson_name: item.lesson_name
        }
      });
    },
    openingTime(item) {
      return (
        this.formatDate(new Date(item.start_time * 1000), "hh:mm") +
        "-" +
        this.formatDate(new Date(item.end_time * 1000), "hh:mm")
      );
    },
    formatDate(date, fmt) {
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      let o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds()
      };
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + "";
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : this.padLeftZero(str)
          );
        }
      }
      return fmt;
    },
    padLeftZero(str) {
      return ("00" + str).substr(str.length);
    },
    timeCalculation(item, number) {
      if (item.status == 1) {
        let index = item.start_time - Math.round(new Date() / 1000);
        let endIndex = item.end_time - Math.round(new Date() / 1000);
        if ((index > 0 && index <= 900) || (index < 0 && endIndex >= 0)) {
        } else if (index < 0 && endIndex < 0) {
          if (this.liveClassList) {
            this.liveClassList[number].status = 3;
          }
        } else if (index < 3600) {
          return Math.floor(index / 60) + " 分钟后直播";
        } else if (index < 86400 && index > 3600) {
          return Math.floor(index / 3600) + " 小时后直播";
        } else if (index > 86400) {
          return;
        }
      }
      return;
    },
    ready(item) {
      if (item.status == 1) {
        let index = item.start_time - Math.round(new Date() / 1000);
        let endIndex = item.end_time - Math.round(new Date() / 1000);
        if ((index > 0 && index <= 900) || (index < 0 && endIndex >= 0)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    // 开始上课
    start(item) {
      if (item.status == 2 || this.ready(item)) {
        let model = {
          roleId: item.role_id,
          classId: item.clazz_id,
          lessonId: item.lesson_id,
          lessonName: item.lesson_info.name,
          clazzId: item.clazz_id,
          micMaxNum: item.max_micro_num,
          micApplyNum: item.max_micro_apply_num,
          autoOnMic: item.is_auto_on_micro == 1 ? true : false,
          allowStuOffMic: item.is_allow_off_micro == 1 ? true : false,
          studentNum: item.max_student_num
        };
        // dsBridge.call("classbegin", JSON.stringify(model), function(v) {});
        if (item.class.class_type == 1) {
          dsBridge.call("largeclassbegin", JSON.stringify(model), function(
            v
          ) {});
        } else if (item.class.class_type == 2) {
          dsBridge.call("classbegin", JSON.stringify(model), function(v) {});
        } else if (item.class.class_type == 3) {
          dsBridge.call("classbegin", JSON.stringify(model), function(v) {});
        } else if (item.class.class_type == 4) {
          dsBridge.call("classbegin", JSON.stringify(model), function(v) {});
        }

        let pcModel = {
          gui_type: 3,
          roleId: item.role_id,
          courseId: item.course_id,
          name: item.lesson_info.name,
          //讲台封面
          cover: item.class.rostrum_cover,
          lessonId: item.lesson_id,
          clazzId: item.clazz_id,
          class_type: item.class.class_type,
          micMaxNum: item.max_micro_num,
          micApplyNum: item.max_micro_apply_num,
          autoOnMic: item.is_auto_on_micro == 1 ? true : false,
          allowStuOffMic: item.is_allow_off_micro == 1 ? true : false,
          studentNum: item.max_student_num
        };
        // let pcModel = {
        //   gui_type: 3,
        //   roleId: item.role_id,
        //   courseId: item.course_id,
        //   name: item.lesson_info.name,
        //   //讲台封面
        //   cover: item.class.rostrum_cover,
        //   lessonId: item.lesson_id,
        //   clazzId: item.clazz_id,
        //   class_type: item.class.class_type,
        //   micMaxNum: 8,
        //   micApplyNum: 8,
        //   autoOnMic: false,
        //   allowStuOffMic: true,
        //   studentNum: 8
        // };
        sendMessage(pcModel);
      } else {
        this.$toast("课程还未开始");
      }
    },
    toEvaluate(item, i) {
      if (item.role_id == 0) {
        getMyLiveClassStatus({
          member_schedule_id: item.member_schedule_id
        }).then(res => {
          if (res.code == 0) {
            if (res.data.status == 0) {
              this.$toast("课程已过期无报告");
            } else if (res.data.status == 1) {
              this.$toast("课堂报告准备中");
            } else {
              if (this.type == 1) {
                this.$router.push({
                  path: "/report/learningReport",
                  query: {
                    lesson_id: item.lesson_id,
                    token: this.$route.query.token,
                    clazz_schedule_id: item.clazz_schedule_id,
                    type: 1
                  }
                });
              } else {
                this.$router.push({
                  path: "/report/learningReport",
                  query: {
                    lesson_id: item.lesson_id,
                    token: this.$route.query.token,
                    clazz_schedule_id: item.clazz_schedule_id,
                    type: 2
                  }
                });
              }
            }
          } else {
            this.$toast(res.msg || res.message);
          }
        });
      } else {
        localStorage.setItem("lesson_id", this.list[i].lesson_id);
        this.$router.push({
          path: "/pc/teacherReport",
          query: {
            lesson_id: this.list[i].lesson_id
          }
        });
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
        let pcmodel = {
          videoid: 0, //id
          videoplay: item.cdn + item.play_url, //播放地址
          videorate: 0 //进度条
        };
        sendMessage(pcmodel);
      } else {
        this.$toast("回放资源准备中");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.cards {
  display: flex;
  flex-wrap: wrap;

  justify-content: space-between;
  width: 100%;
  .phone {
    width: calc(100%) !important;
    margin-bottom: 15px !important;
  }
  .todayCard {
    // min-width: 345px;

    width: calc(50% - 10px);
    margin-bottom: 20px;

    .bottomcard {
      margin-top: 10px;
      width: 100%;
      background: #ffffff;
      border-radius: 8px;
      padding: 16px;
      box-sizing: border-box;
      min-height: 130px;
      .title {
        font-size: 16px;
        font-weight: 500;
        color: #3d3d3d;
        line-height: 1;
        margin-bottom: 10px;
      }
      .subtitle {
        font-size: 12px;
        font-weight: 400;
        color: #666666;
        margin-bottom: 15px;
      }
      .coursestatus {
        font-size: 14px;
        font-weight: 600;
        color: rgba(153, 153, 153, 1);
        // margin-bottom: 8px;
      }
      .ing {
        // color: rgba(253, 149, 29, 1);
        color: #3dc17d;
      }
      .before {
        // color: rgba(51, 51, 51, 1);
        color: #ff8022;
      }
      .imging {
        height: 10px;
        width: 11px;
        margin-left: 10px;
      }
    }
  }
}
@media (min-width: 768px) {
  // .todayCard + .todayCard {
  //   margin-left: 20px;
  // }
  .todayCard {
    // min-width: 410px;

    width: calc(50% - 10px);

    margin-bottom: 20px;

    .bottomcard {
      margin-top: 10px;
      width: 100%;
      // height: 155px;
      background: #ffffff;
      border-radius: 4px;
      padding: 16px;
      box-sizing: border-box;

      .title {
        font-size: 20px;
        // font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        margin-bottom: 8px;
        line-height: 1;
      }
      .subtitle {
        font-size: 12px;
        // font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        margin-bottom: 11px;
      }
      .coursestatus {
        font-size: 16px;
        // font-family: PingFangTC-Semibold, PingFangTC;
        font-weight: 600;
        color: #999999;
        // margin-bottom: 10px;
      }
    }
  }
}
.colorStyle {
  color: white !important;
}
.divButton {
  background: #3dc17d;
  border-radius: 4px;
  padding: 5px 16px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  line-height: 20px;
  cursor: pointer;
  &.disabled {
    border: 1px solid #638475;
    background: unset;
    cursor: not-allowed;
    color: #6a8376;
  }
}
.afterButton {
  border-radius: 4px;
  border: 1px solid #638475;
  padding: 5px 16px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 500;
  color: #6a8376;
  line-height: 20px;
  cursor: pointer;
}
.afterButton + .afterButton {
  margin-left: 10px;
}
</style>
