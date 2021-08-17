<template>
  <div class="report">
    <div class="box">
      <div class="title">
        <span class="fonthidden">{{ ppt_title }}</span>
        <span v-if="imglist.length > 0"
          >({{ i + 1 }}/{{ imglist.length }})</span
        >

        <div class="close cursor" @click="close">
          <img src="../../assets/img/close.png" />
        </div>
      </div>
      <div class="preview">
        <div class="precenter" :class="imglist.length > 0 ? '' : 'centerStyle'">
          <div class="next cursor" @click="next(-1)" v-if="imglist.length > 0">
            <img src="../../assets/img/ic-Left@2x.png" />
          </div>
          <div
            v-for="(item, index) in imglist"
            :key="index"
            v-show="index == i"
            class="foritem"
          >
            <img class="img" :src="item" />
          </div>
          <img v-if="imglist.length == 0 && srcImg" class="img" :src="srcImg" />
          <iframe
            ref="iframe"
            v-if="htmlppt"
            class="img"
            :src="htmlppt"
            frameborder="0"
          ></iframe>
          <div class="next cursor" @click="next(1)" v-if="imglist.length > 0">
            <img src="../../assets/img/ic-right@2x.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { sendMessage } from "../../api/client";
import { getScheduleSlides } from "../../api/common";

export default {
  components: {},
  data() {
    return {
      htmlppt: "",
      imglist: [],
      ppt_title: "",
      srcImg: "",
      i: 0
    };
  },
  created() {
    this.load();
  },
  mounted() {
    let pcmodel = {
      signal: "windowSettings",
      // size: true, //不允许放大缩小
      // modal: true, //是否可以拖动
      width: 1080,
      height: 680,
      closeButton: "hide"
    };
    sendMessage(pcmodel);
  },
  methods: {
    // slide_type:2是视频1是图片8是动态ppt
    load() {
      getScheduleSlides({ schedule_id: this.$route.query.schedule_id }).then(
        res => {
          if (res.code == 0) {
            res.data.map(item => {
              if (item.ppt_id == this.$route.query.ppt_id) {
                if (item.slide_type == 3) {
                  this.srcImg = item.cdn + item.path + item.pics;
                } else if (item.type == "pptx") {
                  if (item.slide_type == 8) {
                    this.htmlppt = item.cdn + item.path + item.pics;
                  } else {
                    this.$nextTick(() => {
                      this.imglist = this.format(item);
                    });
                  }
                } else {
                  this.$nextTick(() => {
                    this.imglist = this.format(item);
                  });
                }

                this.ppt_title = item.ppt_title;
              }
            });
          } else {
            this.$toast(res.msg);
          }
        }
      );
    },
    format(item) {
      let handoutList = [];
      if (item.slide_type == 1) {
        for (let i = 0; i < item.ppt_page_count; i++) {
          handoutList.push(
            item.cdn + item.path + item.pics.replace("{page}", i + 1)
          );
        }
        return handoutList;
      } else {
        handoutList.push(item.cdn + item.path);
        return handoutList;
      }
    },

    close() {
      let pcmodel = {
        signal: "closeview"
      };
      sendMessage(pcmodel);
    },
    next(e) {
      this.i = (this.i + e + this.imglist.length) % this.imglist.length;
      // this.$nextTick(() => {
      //   console.log(this.$refs.iframe.contentWindow.playMsg());
      // });
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.report {
  &::-webkit-scrollbar {
    display: none;
  }
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: #fff;
  .box {
    height: 100%;
    .title {
      width: 100%;
      z-index: 1;
      font-size: 17px;
      font-weight: 500;
      color: #333333;
      // text-align: center;
      padding: 15px 0 11px 16px;
      box-sizing: border-box;
      position: relative;
      border-bottom: 1px solid #e4e5e6;
      display: flex;
      align-items: center;
      .fonthidden {
        display: inline-block;
        max-width: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .close {
        position: absolute;
        right: 21px;

        top: 28%;
        width: 13px;
        height: 13px;
        img {
          width: 13px;
          height: 13px;
          object-fit: cover;
        }
      }
    }
    .preview {
      background: #f0f2f5;

      height: 100%;
      padding: 17px 17px 19px;
      box-sizing: border-box;
      // padding-top: 3%;

      .precenter {
        height: calc(100% - 6%);
        display: flex;
        align-items: center;
        justify-content: space-between;
        .foritem {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }
        .next {
          width: 32px;
          height: 32px;
          img {
            width: 32px;
            height: 32px;
            object-fit: cover;
          }
        }
        .img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 8px;
        }
      }
    }
  }
}
.centerStyle {
  justify-content: center !important;
  height: calc(100% - 6%) !important;
}
</style>
