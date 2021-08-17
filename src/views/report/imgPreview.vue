<template>
  <div class="report">
    <div class="box">
      <div class="title">
        <span>({{ i + 1 }}/1)</span>
        <div class="close" @click="close">
          <img src="../../assets/img/close.png" />
        </div>
      </div>
      <div class="preview">
        <div class="precenter">
          <img class="img" :src="imglist" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { sendMessage } from "../../api/client";

export default {
  components: {},
  data() {
    return {
      imglist: this.$route.query.imglist,
      i: this.$route.query.index ? this.$route.query.index * 1 : 0
    };
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
    close() {
      let pcmodel = {
        signal: "closeview"
      };
      sendMessage(pcmodel);
      // this.$router.push({
      //   path: "/pc/teacherReport",
      //   query: { lesson_id: this.$route.query.lesson_id }
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
      font-size: 19px;
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
        cursor: pointer;
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
