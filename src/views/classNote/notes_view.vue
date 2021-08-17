<template>
  <div class="temp">
    <div class="head">
      <div class="leftBox">
        {{ noteList[index] && noteList[index].create_at }}
      </div>
      <div class="rightBox" ref="rightBox">
        <div class="turnPage">
          <div class="arrowLeft" @click="turn(-1)"></div>
          <div class="pageNumber">{{ index + 1 }}/ {{ noteList.length }}</div>
          <div class="arrowRight" @click="turn(1)"></div>
        </div>
        <div class="icon">
          <img
            src="../../assets/img/ic_copy.png"
            @click="paste(noteList[index], index)"
            alt=""
          />
        </div>
        <div class="icon">
          <img
            src="../../assets/img/ic_clear.png"
            @click="deleteImg(noteList[index], index)"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="showcase">
      <img
        :src="
          noteList[index] && noteList[index].cdn + noteList[index].snapboard_url
        "
        alt=""
      />
    </div>
  </div>
</template>

<script>
import { sendMessage } from "../../api/client";
import { getLessonSnapboard, delLessonSnap } from "../../api/common";
export default {
  data() {
    return {
      index: this.$route.query.index ? this.$route.query.index * 1 : 0,
      noteList: []
    };
  },
  mounted() {
    this.apiLoad();
  },
  methods: {
    turn(i) {
      this.index =
        (this.index + i + this.noteList.length) % this.noteList.length;
    },
    deleteImg(item, index) {
      delLessonSnap({ id: item.id }).then(res => {
        if (res.code == 0) {
          this.$toast("删除成功");
          this.apiLoad();
          let model = {
            signal: "del",
            index: index
          };
          sendMessage(model);
        } else {
          this.$toast(res.msg);
        }
      });
    },
    paste(item, index) {
      this.loadImg(item.cdn + item.snapboard_url)
        .then(res => {
          let model = {
            width: res.width,
            height: res.height,
            signal: "copy",
            url: item.cdn + item.snapboard_url,
            index: index
          };
          sendMessage(model);
        })
        .catch(err => {
          this.$toast(err);
        });
    },
    loadImg(url) {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = function() {
          resolve(img);
        };
        img.onerror = function(err) {
          reject("图片错误");
        };
        img.src = url;
      });
    },
    apiLoad() {
      getLessonSnapboard({
        lesson_id: this.$route.query.lesson_id
      }).then(res => {
        if (res.code == 0) {
          this.noteList = res.data;

          let model = {
            width: this.$refs["rightBox"].offsetWidth + 48,
            barheight: 50,
            signal: "windowTool"
          };
          sendMessage(model);
        } else {
          this.$toast(res.msg);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.temp {
  width: 100vw;
  height: 100vh;
  background-color: #2e2f30;
  .head {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #000;
    height: 50px;
    color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .leftBox {
      margin-left: 48px;
      height: 18px;
      font-size: 12px;
      font-weight: 500;
      color: #ffffff;
      line-height: 18px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .rightBox {
      min-width: 160px;
      margin-right: 48px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .turnPage {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .arrowLeft {
          width: 18px;
          height: 18px;
          background: url("../../assets/img/btn_arrow_left_ash.png") no-repeat
            center center / cover;
          cursor: pointer;
        }
        .arrowLeft:hover {
          background: url("../../assets/img/btn_arrow_left_white.png") no-repeat
            center center / cover;
        }
        .pageNumber {
          margin: 0 17px;
          height: 18px;
          font-size: 12px;
          font-weight: 600;
          color: #ffffff;
          line-height: 18px;
          cursor: pointer;
        }
        .arrowRight {
          width: 18px;
          height: 18px;
          background: url("../../assets/img/btn_arrow_right_ash.png") no-repeat
            center center / cover;
          cursor: pointer;
        }
        .arrowRight:hover {
          background: url("../../assets/img/btn_arrow_right_white.png")
            no-repeat center center / cover;
        }
      }
      .icon {
        height: 18px;
        margin-left: 17px;
        img {
          cursor: pointer;
          height: 18px;
          width: 18px;
        }
      }
    }
  }
  .showcase {
    padding-top: 50px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
