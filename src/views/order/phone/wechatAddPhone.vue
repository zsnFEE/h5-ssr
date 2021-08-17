<template>
  <div class="temp" v-title data-title="报名成功">
    <div class="backgroundColor"></div>
    <!-- <header>
      <img
        src="../../assets/img/ic_back.png"
        class="titleArrow"
        @click="toBack"
      />
      <div class="titleText">报名成功</div>
      <div class="titleArrow"></div>
    </header> -->
    <div class="titleBox">
      <div class="backgroundStyle">
        <div class="backgroundball"></div>
        <hr />
        <div class="backgroundball"></div>
      </div>
      <div class="procedure">
        <div class="textBoxOne">
          <img src="../../../assets/img/ic_success.png" class="Icon" />
          <div class="notes">报名成功</div>
        </div>
        <div class="textBoxTwo">
          <div class="Icon">2</div>
          <div class="notes">添加班主任微信</div>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="titleText">添加班主任微信获取班主任1对1辅导</div>
      <img :src="`${teacherInfo.qrcode}`" alt="" class="qrcode" />
      <span class="wechatNumber">老师微信：{{ teacherInfo.wechat }}</span>
      <div class="lineBox"></div>
      <div class="buttonBox">
        <div class="buttonDv">
          <div class="video button_color"></div>
          <button @click="paste()" class="button_color">
            复制班主任微信号
          </button>
        </div>
        <span>在微信内粘贴搜索即可</span>
      </div>
    </div>
  </div>
</template>
<script>
import { getCanvas, getWechat } from "../../../api/common";
export default {
  data() {
    return {
      teacherInfo: {},
      domain: "",
      img: "",
      canvasUrl: "",
      imgUrl: "",
      longClick: 0,
      timeOutEvent: 0,
      dataURL: "",
      class_id: ""
    };
  },
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    this.class_id = localStorage.getItem("class_id");
    getWechat({
      order_id: this.$route.query.order_id || localStorage.order_id
    }).then(res => {
      if (res.code == 0) {
        this.teacherInfo = res.teacher;
      }
    });
  },
  methods: {
    toBack() {
      if (localStorage.getItem("classType") == 1) {
        this.$router.push({
          path: "/phone/findPhone",
          query: {
            token: this.$route.query.token
            // class_id: this.class_id
          }
        });
      } else if (localStorage.getItem("classType") == 2) {
        this.$router.push({
          path: "/phone/smallClassPhone",
          query: {
            token: this.$route.query.token
            // class_id: this.class_id
          }
        });
      }
    },
    toW() {
      let that = this;
      this.$copyText(this.teacherInfo.wechat).then(
        function(e) {
          that.$toast("已复制到剪切板");
        },
        function(e) {
          // that.$message.error("复制失败");
        }
      );
      window.location.href = "weixin://dl/scan";
    },
    paste() {
      this.$copyText(this.teacherInfo.wechat).then(
        e => {
          this.$toast("已复制到剪切板");
          setTimeout(() => {
            this.goWxchat();
          }, 100);
        },
        e => {
          this.$toast(e);
        }
      );
    },
    goWxchat() {
      window.location.href = "weixin://";
    }
  }
};
</script>
<style lang="less" scoped>
.temp {
  // background: rgba(243, 245, 249, 1);
  padding: 19px 22px;
  // padding-top: 61px;
  height: calc(100% - 80px);
  header {
    position: fixed;
    padding: 0 10px;
    top: 0px;
    left: 0px;
    height: 42px;
    width: calc(100% - 20px);
    display: flex;
    justify-content: space-between;
    background: rgba(255, 255, 255, 1);
    z-index: 1;
    align-items: center;
    .titleArrow {
      height: 18px;
      width: 18px;
    }
    .titleText {
      height: 29.5px;
      font-size: 21px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(42, 46, 51, 1);
      line-height: 29.5px;
    }
  }
  .titleBox {
    background: rgba(255, 255, 255, 1);
    border-radius: 12px;
    padding: 22.5px 0 21px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .procedure {
      margin-top: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      width: 100%;
      .textBoxOne {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 66.5px;
        margin-right: 19px;
        margin-left: 21px;
        .Icon {
          width: 40px;
          height: 40px;
        }
        .notes {
          margin-top: 6.5px;
          font-size: 14px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
        }
      }
      .textBoxTwo {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 66.5px;
        margin-left: 64px;
        .Icon {
          font-size: 18px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(130, 138, 153, 1);
          line-height: 40px;
          text-align: center;
          width: 40px;
          height: 40px;
        }
        .notes {
          margin-top: 6.5px;
          font-size: 14px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(130, 138, 153, 1);
          line-height: 20px;
        }
      }
    }
    .backgroundStyle {
      position: absolute;
      top: 26px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80%;
      .backgroundball {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        background: rgba(242, 245, 250, 1);
      }
      hr {
        margin: 0px;
        width: 120px;
        height: 3px;
        background: rgba(242, 245, 250, 1);
        border: 0;
      }
    }
  }
  .body {
    margin-top: 15px;
    width: calc(100% - 35px);
    background: #ffffff;
    border-radius: 12px;
    padding: 45px 17.5px 114px 17.5px;
    /* display: flex; */
    /* flex-direction: column; */
    /* align-items: center; */
    /* justify-content: center; */
    text-align: center;

    .titleText {
      width: 100%;
      text-align: center;
      font-size: 16.5px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 23px;
    }
    .qrcode {
      width: 160px;
      height: 160px;
      min-width: 160px;
      margin: 0 auto;
      min-height: 160px;
      margin-top: 25px;
    }
    .wechatNumber {
      margin-top: 22px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(130, 138, 153, 1);
      line-height: 20px;
    }
    .lineBox {
      margin-top: 35px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: calc(100% + 35px);
      height: 6px;
      background: url(../../../assets/img/img_line.png) no-repeat center center /
        cover;
    }
    .buttonBox {
      margin-top: 37.5px;
      .buttonDv {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        button {
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 50px;
          width: 250px;
          height: 50px;
          // background: linear-gradient(
          //   129deg,
          //   rgba(255, 115, 0, 1) 0%,
          //   rgba(255, 85, 0, 1) 100%
          // );
          border-radius: 25px;
          border: 0px;
          z-index: 1;
        }
        .video {
          position: absolute;
          top: 12.5px;
          width: 224px;
          height: 46px;
          // background: linear-gradient(
          //   129deg,
          //   rgba(255, 115, 0, 1) 0%,
          //   rgba(255, 85, 0, 1) 100%
          // );
          border-radius: 6px;
          opacity: 0.41;
          filter: blur(10px);
        }
      }
      span {
        // position: absolute;
        width: 250px;
        font-size: 14px;
        text-align: center;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(130, 138, 153, 1);
        line-height: 20px;
        margin: 0 auto;
        margin-top: 20px;
      }
    }
  }
  img {
    width: 100%;
  }
  span {
    display: block;
    text-align: center;
  }
  .title {
    height: 39px;
    width: 100%;
    display: flex;
    align-items: center;
    .titleArrow {
      height: 18px;
      width: 18px;
      margin-left: 16px;
    }
  }

  .iconBox {
    display: flex;
    flex-direction: column;
    align-content: center;
    padding: 0 40.5px;
    margin-bottom: 40.5px;
    .successIcon {
      height: 80px;
      width: 80px;
    }
    .successText {
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 25px;
      text-align: center;
    }
  }
  .remarks {
    margin-top: 14px;
    width: calc(100% - 80px);
    text-align: center;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(130, 138, 153, 1);
    line-height: 20px;
  }
  .dowDv {
    .imgDv {
      width: 100%;
      border-radius: 12px;
    }
  }
}
</style>
