<template>
  <div class="temp">
    <div class="bgpc"></div>
    <!-- <header v-show="flag">
      <img
        src="../../../assets/img/ic_back.png"
        class="titleArrow"
        @click="toBack"
      />
      <div class="titleText">报名成功</div>
      <div class="titleArrow"></div>
    </header> -->
    <!-- <div class="header_pc" v-show="!flag">
      报名成功
    </div> -->

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
          <div class="video"></div>
          <button @click="paste(teacherInfo.wechat)">复制班主任微信号</button>
        </div>
        <span>在微信内粘贴搜索即可</span>
      </div>
    </div>
  </div>
</template>
<script>
import { getCanvas, getWechat } from "../../../api/common";
import { isMobile } from "../../../common/util";

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
      flag: isMobile()
    };
  },
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.toBack();
    });
    let order_id = localStorage.getItem("order_id");
    getWechat({
      order_id: this.$route.query.order_id || order_id
    }).then(res => {
      if (res.code == 0) {
        this.teacherInfo = res.teacher;
      } else {
        this.$toast({
          message: res.msg
        });
      }
    });
  },
  methods: {
    toBack() {
      let Classtype = localStorage.getItem("Classtype");

      if (Classtype == 2) {
        this.$router.push({
          path: "/pc/Smallclass",
          query: {
            token: this.$route.query.token,
            Classtype: Classtype
          }
        });
      } else if (Classtype == 1) {
        this.$router.push({
          path: "/pc/Homepage",
          query: {
            token: this.$route.query.token,
            Classtype: Classtype
            // class_id: this.class_id
          }
        });
      }
    },

    paste(cdkey) {
      var input = document.createElement("input");
      input.value = cdkey;
      document.body.appendChild(input);
      input.select();
      input.setSelectionRange(0, input.value.length),
        document.execCommand("Copy");
      document.body.removeChild(input);
      this.$toast("复制成功");
      // 跳转到微信app
      // setTimeout(() => {
      // 	this.goWxchat();
      // }, 100);
    },
    goWxchat() {
      window.location.href = "weixin://";
    }
  }
};
</script>
<style lang="less" scoped>
.temp {
  background: rgba(243, 245, 249, 1);
  padding: 61px 112px;
  // padding-top: 61px;
  min-height: 100%;
  box-sizing: border-box;
  .header_pc {
    width: 100%;
    padding: 11px 40px;
    background: #fff;
    box-sizing: border-box;
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    font-size: 21px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(0, 0, 0, 1);
  }
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
      top: 87px;
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
    background: rgba(255, 255, 255, 1);
    border-radius: 12px;
    padding: 45px 17.5px 90px 17.5px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
      margin-top: 25px;
      width: 160px;
      height: 160px;
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
          background: linear-gradient(
            129deg,
            rgba(255, 115, 0, 1) 0%,
            rgba(255, 85, 0, 1) 100%
          );
          border-radius: 25px;
          border: 0px;
          z-index: 1;
        }
        .video {
          position: absolute;
          top: 12.5px;
          width: 224px;
          height: 46px;
          background: linear-gradient(
            129deg,
            rgba(255, 115, 0, 1) 0%,
            rgba(255, 85, 0, 1) 100%
          );
          border-radius: 6px;
          opacity: 0.41;
          filter: blur(10px);
        }
      }
      span {
        position: absolute;
        width: 250px;
        font-size: 14px;
        text-align: center;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(130, 138, 153, 1);
        line-height: 20px;
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
