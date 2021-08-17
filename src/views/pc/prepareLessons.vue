<template>
  <div class="prepareLessons">
    <div class="bgpc"></div>
    <div class="header_pc">{{ this.$route.query.lesson_name }}</div>
    <div class="box">
      <div
        class="list"
        v-for="(item, index) in originallyList"
        :key="index"
        @click="preview(item)"
      >
        <div class="lefthint">
          <img v-if="item.type == 'pdf'" src="../../assets/img/ic_pdf_S2.png" />
          <img
            v-else-if="item.type == 'jpg'"
            src="../../assets/img/ic_image_s.png"
          />
          <img
            v-else-if="item.type == 'pptx'"
            src="../../assets/img/ic_ppt_s.png"
          />
          <img
            v-else-if="item.type == 'docx'"
            src="../../assets/img/ic_word_s.png"
          />
          <img
            v-else-if="item.type == 'mp4'"
            src="../../assets/img/ic_video_s.png"
          />
          <img v-else src="../../assets/img/ic_unknown_s.png" />
          <span>{{ item.ppt_title }}</span>
        </div>
        <!-- <div class="rightdownload cursor" @click="download">
          <img src="../../assets/img/download.png" />
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { isMobile } from "../../common/util";
import { sendMessage } from "../../api/client";

import { getScheduleSlides } from "../../api/common";

export default {
  components: {},
  data() {
    return {
      originallyList: []
    };
  },
  mounted() {
    getScheduleSlides({ schedule_id: this.$route.query.schedule_id }).then(
      res => {
        if (res.code == 0) {
          this.originallyList = res.data;
        } else {
          this.$toast(res.msg);
        }
      }
    );
  },

  methods: {
    preview(item, index) {
      if (
        item.type == "3gp" ||
        item.type == "avi" ||
        item.type == "flv" ||
        item.type == "mp4" ||
        item.type == "mpg" ||
        item.type == "asf" ||
        item.type == "wmv" ||
        item.type == "mkv" ||
        item.type == "mov" ||
        item.type == "webm" ||
        item.type == "mxf"
      ) {
        this.playback(item);
      } else {
        console.log(item);
        let model = {
          signal: "openView",
          name: "teacherPreview",
          url: `${window.location.protocol}//${window.location.host}/report/preview?lesson_name=${this.$route.query.lesson_name}&schedule_id=${this.$route.query.schedule_id}&ppt_id=${item.ppt_id}`,
          size: true,
          modal: true,
          width: 696,
          height: 437
          // closeButton: "hide"
        };
        sendMessage(model);
        // this.$router.push({
        //   path: "/report/preview",
        //   query: {
        //     schedule_id: this.$route.query.schedule_id,
        //     lesson_name: this.$route.query.lesson_name,
        //     ppt_id: item.ppt_id
        //   }
        // });
      }
    },
    playback(item) {
      console.log(item);
      if (item.path) {
        // let pcmodel = {
        //   videoid: 0, //id
        //   videoplay: item.cdn + item.path, //播放地址
        //   videorate: 0 //进度条
        // };
        let pcmodel = {
          videoid: 0, //id
          videoplay: item.cdn + item.path, //播放地址
          videorate: 0, //进度条
          videoname: item.ppt_title //课程名字
        };
        sendMessage(pcmodel);
      } else {
        this.$toast("课件预览资源准备中");
      }
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.prepareLessons {
  width: 100%;
  height: 100%;
  background: #f3f5f9;
  padding-top: 68px;
  box-sizing: border-box;
}

.header_pc {
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  color: #333333;
  line-height: 28px;
  box-shadow: 0px 2px 2px -2px #ccc;
}
.box {
  padding: 20px;

  box-sizing: border-box;
  .list + .list {
    margin-top: 10px;
  }
  .list {
    width: 100%;
    background: #ffffff;
    border-radius: 4px;
    padding: 16px;
    padding-right: 18px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .lefthint {
      display: flex;
      align-items: center;

      img {
        width: 17px;
        height: 21px;
        object-fit: cover;
        margin-right: 10px;
      }
      span {
        font-size: 16px;
        font-weight: 500;
        color: #333333;
        line-height: 20px;
      }
    }
    .rightdownload {
      padding-left: 11px;
      box-sizing: border-box;
      border-left: 1px solid #dae3f2;
      display: flex;
      align-items: center;
      img {
        width: 16px;
        height: 16px;
        object-fit: cover;
      }
    }
  }
}
</style>
