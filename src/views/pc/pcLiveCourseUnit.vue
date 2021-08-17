<template>
  <div class="temp">
    <div class="bgpc"></div>
    <header>
      <div class="new_header" v-show="flag">
        <div class="back" @click="toBack">
          <img src="../../assets/img/ic_back.png" />
        </div>
        <div class="new_font">{{ titleName }}</div>
        <div class="titleDv "></div>
      </div>
      <div class="header_pc" v-show="!flag">
        <div>{{ titleName }}</div>
      </div>
    </header>
    <body class="listBox" :class="flag ? '' : 'marginTop'">
      <BroadcastSchedule
        ref="mychild"
        class="cursor"
        type="2"
      ></BroadcastSchedule>
    </body>
  </div>
</template>

<script>
import { sendMessage } from "../../api/client";

import { isMobile } from "../../common/util";

import BroadcastSchedule from "../../components/broadcastSchedule.vue";

export default {
  components: { BroadcastSchedule },
  data() {
    return {
      titleName: "",
      classList: [],
      flag: isMobile(),
      page: 1,
      per_page: 1
    };
  },
  created() {
    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.toBack();
    });
    this.titleName = this.$route.query.class_name;
    // this.getChapter();
    let that = this;
    dsBridge.registerAsyn("VideoUpdate", function(arg1, arg2, arg3) {
      // that.getChapter();
      this.$refs.mychild.getChapter(); // 调用子组件的方法
    });
    window["recvMessage"] = msg => {
      if (JSON.parse(msg).type == "VideoUpdate") {
        // this.getChapter();
        this.$refs.mychild.getChapter(); // 调用子组件的方法
      }
    };
  },
  methods: {
    play(item) {
      if (item.is_video_locked == 0) {
        let model = {
          videoid: item.course_id,
          videoplay: item.play_url,
          videorate: item.watch_percent
        };
        dsBridge.call("video", JSON.stringify(model), function(v) {});
        let pcmodel = {
          videoid: item.course_id, //id
          videoplay: item.play_url, //播放地址
          videorate: item.watch_percent, //进度条
          videoname: item.name //课程名字
        };
        sendMessage(pcmodel);
      } else {
        if (item.lock_type == 2) {
          this.$toast("还未到可观看时间");
        } else if (item.lock_type == 3 || item.lock_type == 1) {
          this.$toast("请按照目录顺序观看");
        }
      }
    },
    toBack() {
      if (this.$route.query.status == 1) {
        // this.$router.push({
        //   path: "/pc/Studentschedules",
        //   query: {
        //     class_id: this.$route.query.class_id,
        //     class_name: this.$route.query.class_name
        //   }
        // });
        this.$router.push({
          path: "/pc/pcNewSchedule",
          query: {}
        });
      } else if (this.$route.query.status == 2) {
        this.$router.push({
          path: "/phone/phoneNewSchedule",
          query: {}
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.new_header {
  width: 100%;
  padding: 8px 20px 8px 21px;
  background: #fff;
  display: flex;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  z-index: 9;
}

.back {
  width: 20px;
  height: 20px;
  line-height: 38px;
}
.back img {
  width: 100%;
  height: 100%;
}
.new_font {
  font-size: 18px;
  color: #292d33;
  text-align: center;
  margin: auto;
  font-weight: 500;
}
.temp {
  width: 100%;
  height: 100%;
  background: rgba(243, 245, 249, 1);
  .title {
    .titleDv {
      width: 18px;
    }
  }
  .header_pc {
    width: 100%;
    padding: 11px 20px;
    background: #fff;
    display: flex;
    box-sizing: border-box;
    position: fixed;
    z-index: 9;
    font-size: 21px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(0, 0, 0, 1);
    justify-content: space-between;
    align-items: center;
  }
  .listBox {
    padding: 63px 9% 20px;
    background: rgba(243, 245, 249, 1);
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    // gap: 10px;

    span {
      font-size: 21px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
      line-height: 29.5px;
      display: inline-block;
      width: 100%;
      word-wrap: break-word;
      white-space: normal;
    }
    .curriculumList {
      margin: 0 20px 20px 0px;
      width: calc(50% - 10px);
      &.isSecond {
        margin-right: 0px;
      }
      .videoClassCardBox {
        width: 100%;
      }
      .curriculumInfoBox {
        position: relative;
        margin-top: 20px;
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
        .curriculumInfo {
          .curriculumInfoTitle {
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(41, 45, 51, 1);
            line-height: 22.5px;
          }
          .curriculumInfoTitle.active {
            color: rgba(130, 138, 153, 1);
          }
          .curriculumInfoName {
            margin-top: 4px;
            font-size: 12px;
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
          position: absolute;
          bottom: 15px;
          right: 15px;
          width: 50px;
          height: 28px;
          box-shadow: 0px -2px 0px 0px rgba(255, 255, 255, 0.15);
          border-radius: 14px;
          border: 0px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;

          img {
            width: 12px;
            height: 12px;
          }
        }
        .buttonBox.active {
          background: linear-gradient(
            135deg,
            rgba(215, 222, 235, 1) 0%,
            rgba(196, 204, 218, 1) 100%
          );
        }
      }
    }
  }
  .marginTop {
    padding: 73px 20px 20px 20px;
  }
}
@media (max-width: 500px) {
  .listBox {
    padding: 57px 15px 15px !important;
  }
  .back {
    width: 18px !important;
    height: 18px !important;
  }
}
</style>
