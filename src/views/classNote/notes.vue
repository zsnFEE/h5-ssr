<template>
  <div class="notes">
    <div class="header">
      课堂笔记
    </div>
    <div class="cardContainerBox" ref="cardContainerBox">
      <div
        class="cardContainer"
        v-for="(item, index) in noteList"
        :key="item.id"
      >
        <div class="top">
          <span>{{ item.create_at }}</span>
          <div>
            <img
              src="../../assets/img/ic_copy.png"
              @click="paste(item, index)"
              alt=""
            />
            <img
              src="../../assets/img/ic_clear.png"
              @click="deleteImg(item, index)"
              alt=""
            />
          </div>
        </div>
        <img
          class="snapImg"
          :src="item.cdn + item.snapboard_url"
          alt=""
          @click="previewNote(item, index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { sendMessage } from "../../api/client";
import { getLessonSnapboard, delLessonSnap } from "../../api/common";
export default {
  data() {
    return {
      noteList: []
    };
  },
  mounted() {
    window["recvMessage"] = msg => {
      this.recvMessage(msg);
    };
    let pcmodel = {
      type: "windowSettings",
      width: 310,
      height: 502,
      closeButton: "show"
    };
    sendMessage(pcmodel);
    this.apiLoad();
  },
  methods: {
    recvMessage(msg) {
      if (JSON.parse(msg).operation == "refreshData") {
        this.apiLoad(true);
      }
    },
    apiLoad(isNative) {
      getLessonSnapboard({
        lesson_id: this.$route.query.lesson_id
      }).then(res => {
        if (res.code == 0) {
          this.noteList = res.data;
          if (isNative) {
            //滚动到底部
            this.$nextTick(() => {
              this.$refs["cardContainerBox"].scrollTop = this.$refs[
                "cardContainerBox"
              ].scrollHeight;
            });
          }
        } else {
          this.$toast(res.msg);
        }
      });
    },
    deleteImg(item, index) {
      delLessonSnap({ id: item.id }).then(res => {
        if (res.code == 0) {
          let pcmodel = {
            signal: "del",
            index: index
          };
          sendMessage(pcmodel);
          this.$toast("删除成功");
          this.apiLoad();
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
    previewNote(item, index) {
      this.loadImg(item.cdn + item.snapboard_url)
        .then(res => {
          let model = {
            // width: res.width,
            // height: res.height,
            width: 965,
            height: 580,
            signal: "preview",
            index: index,
            url: this.noteList
              .map(val => val.cdn + val.snapboard_url)
              .join(","),
            current_url: item.cdn + item.snapboard_url
          };
          sendMessage(model);
        })
        .catch(err => {
          this.$toast(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background: #494a4d;
  border-radius: 6px;
  position: absolute;
}
::-webkit-scrollbar-track {
  // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  background-color: #1e1e1f;
}
.notes {
  // min-height: calc(100vh - 120px);
  overflow: auto;
  background: #1e1e1f;
  // padding: 60px 20px;
  position: relative;
  .header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    padding: 24px 0 14px 0;
    background: #1e1e1f;
    font-size: 12px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: white;
    text-align: center;
  }
  .cardContainerBox {
    padding: 4px 12px 25px 20px;
    box-sizing: border-box;
    width: 100%;
    height: calc(100vh - 56px);
    margin-top: 56px;
    overflow-y: scroll;
  }
  .cardContainer {
    width: auto;
    background: #494a4d;
    border-radius: 6px;
    padding: 8px;
    margin-bottom: 12px;
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 11px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
      }
      img {
        cursor: pointer;
        height: 18px;
        width: 18px;
      }
    }
  }
  .snapImg {
    width: 100%;
    height: 142px;
    object-fit: cover;
    cursor: pointer;
  }
}
</style>
