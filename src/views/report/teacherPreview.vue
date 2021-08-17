<template>
  <div class="report">
    <div class="box">
      <div class="title">
        <span>教师课程笔记({{ i + 1 }}/{{ imglist.length }})</span>
        <div class="close" @click="close">
          <img src="../../assets/img/close.png" />
        </div>
      </div>
      <div class="preview">
        <div class="precenter">
          <div class="next" @click="next(-1)">
            <img src="../../assets/img/ic-Left@2x.png" />
          </div>
          <div
            v-for="(item, index) in imglist"
            :key="index"
            v-show="index == i"
            class="foritem"
            style=" display: flex;
        justify-content: center;
        align-items: center;"
          >
            <img class="img" :src="item.snapboard_url" />
          </div>

          <div class="next" @click="next(1)">
            <img src="../../assets/img/ic-right@2x.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getTeacherClassReport, getLearningReport } from "../../api/common";
import { sendMessage } from "../../api/client";

export default {
  components: {},
  data() {
    return {
      imglist: [],
      i: this.$route.query.index ? this.$route.query.index * 1 : 0
    };
  },
  mounted() {
    this.load();
    let pcmodel = {
      signal: "windowSettings",
      // size: true, //不允许放大缩小
      // modal: true, //是否可以拖动
      // width: 696,
      // height: 437,
      closeButton: "hide"
    };
    sendMessage(pcmodel);
  },
  methods: {
    load() {
      if (this.$route.query.type == "pc") {
        getLearningReport({
          clazz_schedule_id: this.$route.query.clazz_schedule_id
        }).then(res => {
          if (res.code == 0) {
            this.imglist = res.data.note_list;
          }
        });
      } else {
        getTeacherClassReport({
          clazz_schedule_id: this.$route.query.lesson_id
        }).then(res => {
          if (res.code == 0) {
            this.imglist = res.data.snapboard_list;
          }
        });
      }
    },
    close() {
      if (this.$route.query.type == "pc") {
        this.$router.push({
          path: "/report/learningReport",
          query: { clazz_schedule_id: this.$route.query.clazz_schedule_id }
        });
      } else {
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
    next(e) {
      this.i = (this.i + e + this.imglist.length) % this.imglist.length;
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
      font-size: 19px;
      font-weight: 500;
      color: #333333;
      text-align: center;
      padding: 15px 0 11px;
      box-sizing: border-box;
      position: relative;
      border-bottom: 1px solid #e4e5e6;
      .close {
        position: absolute;
        right: 21px;
        // top: 21px;
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
      // height: calc(100vh - 55px);
      height: 100%;
      padding: 17px 17px 19px;
      box-sizing: border-box;
      padding-top: 10%;
      // display: flex;
      // justify-content: center;
      // align-items: center;
      .precenter {
        display: flex;
        align-items: center;
        justify-content: space-between;
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
          width: calc(100% - 200px);
          height: calc(100% - 36px);
          object-fit: contain;
          border-radius: 8px;
        }
      }
    }
  }
}
</style>
