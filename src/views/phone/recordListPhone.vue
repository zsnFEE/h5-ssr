<template>
  <div class="temp">
    <div class="backgroundColor"></div>
    <Header :title="`${titleName}`" @toBack="toBack"> </Header>
    <body class="listBox">
      <div
        class="curriculumList"
        v-for="(item, index) in classList"
        :key="index"
      >
        <div class="videoClassCardBox">
          <VideoClassCard :info="item"></VideoClassCard>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
import { getMyClassCourse } from "../../api/common";
import VideoClassCard from "../../components/videoClassCard";

export default {
  components: { VideoClassCard },
  data() {
    return {
      titleName: "",
      classList: []
    };
  },
  created() {
    dsBridge.call("hidetabbar", "", function(v) {});
    this.titleName = this.$route.query.class_name;
    this.getMyRecord();
    let that = this;
    dsBridge.registerAsyn("VideoUpdate", function(arg1, arg2, arg3) {
      that.getMyRecord();
    });
  },
  mounted() {
    let that = this;
    dsBridge.registerAsyn("goback", function(arg1, arg2, arg3) {
      that.toBack();
    });
  },
  methods: {
    getMyRecord() {
      getMyClassCourse({ class_id: this.$route.query.class_id }).then(res => {
        if (res.code == 0) {
          this.classList = res.data;
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    },
    play(item) {
      if (item.is_video_locked == 0) {
        let model = {
          videoid: item.course_id,
          videoplay: item.play_url,
          videorate: item.watch_percent
        };
        dsBridge.call("video", JSON.stringify(model), function(v) {});
      } else {
        this.$toast("请按照目录顺序观看");
      }
    },
    toBack() {
      this.$router.push({
        path: "/phone/standardCurriculumListPhone",
        query: {
          token: this.$route.query.token
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.temp {
  width: 100%;
  height: 100%;
  .listBox {
    padding: 57px 15px 15px 15px;
    span {
      // font-size: 21px;
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
      .videoClassCardBox {
        width: 100%;
        // margin-bottom: 10px;
        margin-bottom: 15px;
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
          .curriculumInfoTitle.active {
            color: rgba(130, 138, 153, 1);
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

          button {
            width: 50px;
            height: 28px;
            box-shadow: 0px -2px 0px 0px rgba(255, 255, 255, 0.15);
            border-radius: 14px;
            border: 0px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 12px;
              height: 12px;
            }
          }
          button.active {
            background: linear-gradient(
              135deg,
              rgba(215, 222, 235, 1) 0%,
              rgba(196, 204, 218, 1) 100%
            );
          }
        }
      }
    }
  }
}
</style>
