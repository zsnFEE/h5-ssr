<template>
  <div class="temp">
    <Header :title="'报名成功'" @toBack="toBack"> </Header>
    <div class="main">
      <div class="header">
        <div class="img">
          <img src="../../assets/img/img-complete.png" alt="" />
        </div>
        <div class="font">报名成功</div>
      </div>
      <div class="body">
        <div class="titleText">添加班主任微信获取班主任1对1辅导</div>
        <img :src="`${teacherInfo.qrcode}`" alt="" class="qrcode" />
        <span class="wechatNumber">班主任微信：{{ teacherInfo.wechat }}</span>
        <!-- <div class="lineBox"></div> -->
        <div class="buttonBox">
          <div class="buttonDv">
            <div class="video"></div>
            <button @click="paste()">复制班主任微信号</button>
          </div>
          <!-- <div class="button">
          <div @click="paste" class="clickStyle"></div>
        </div> -->
          <span>在微信内粘贴搜索即可</span>
        </div>
      </div>
      <div class="footer">
        <div class="left">
          <div class="img">
            <img src="../../assets/img/ic-public.png" />
          </div>
          <div class="midfont">关注微信公号</div>
        </div>
        <div class="btn">
          <span>关注</span>
          <img src="../../assets/img/ic_arrow_green@2x.png" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCanvas, getWechat } from "../../api/common";
export default {
  data() {
    return {
      teacherInfo: {},
      domain: "",
      img: "",
      canvasUrl: "",
      imgUrl: "../../assets/img/HOHO DRAW_img.png",
      longClick: 0,
      timeOutEvent: 0,
      dataURL: ""
    };
  },
  mounted() {
    getWechat(
      {
        order_id: this.$route.query.order_id || localStorage.order_id
      },
      {
        headers: {
          "X-AccessToken": this.$route.query.k || localStorage.access_token
        }
      }
    ).then(res => {
      if (res.code == 0) {
        this.teacherInfo = res.teacher;
      } else {
        this.$toast(res.msg || res.message);
      }
    });
  },
  methods: {
    toBack() {
      this.$router.push({
        path: "/order/middlePage",
        query: { token: this.$route.query.token }
      });
    },
    paste() {
      let that = this;
      this.$copyText(this.teacherInfo.wechat)
        .then(e => {
          this.$toast("已复制到剪切板");
          setTimeout(() => {
            this.goWxchat();
          }, 100);
        })
        .catch(e => {
          this.$toast("复制失败");
        });
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
  // min-height: calc(100vh - 38px);
  .main {
    height: calc(100vh - 38px);
    padding: 19px 22px 19px 22px;
  }
  header {
    .title_box {
      position: fixed;
      display: flex;
      top: 0;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      background: #fff;
      padding: 9px 16px;
      z-index: 1;
      left: 0;
      width: 100%;
    }
    .title_font {
      font-size: 18px;
      font-weight: 500;
      color: #292d33;
      line-height: 25px;
    }
    .backimg {
      width: 18px;
      height: 18px;
      object-fit: cover;
    }
  }
  .footer {
    margin-top: 15px;
    background: #ffffff;
    border-radius: 4px;
    padding: 15px 13px 15px 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
    }
    .img {
      width: 25px;
      height: 25px;
      object-fit: cover;
    }
    .midfont {
      margin-left: 8px;
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #494949;
      line-height: 21px;
    }
    .btn {
      background: #ffffff;
      border-radius: 15px;
      border: 1px solid #3dc17d;
      box-sizing: border-box;
      width: 65px;
      height: 30px;
      font-size: 14px;
      font-weight: 600;
      color: #3dc17d;
      line-height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 5px;
        height: 10px;
        object-fit: cover;
        margin-left: 8px;
      }
    }
  }
  .header {
    margin-top: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 15px;
    box-sizing: border-box;
    .img {
      width: 30px;
      height: 29px;
      object-fit: cover;
    }
    .font {
      margin-left: 5px;
      font-size: 22px;
      font-weight: 600;
      color: #333333;
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
      top: 45px;
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
    // margin-top: 15px;
    width: calc(100% - 35px);
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    // padding: 45px 17.5px 114px 17.5px;
    padding: 45px 17.5px 66px 17.5px;
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
      margin-top: 20px;

      font-size: 14px;
      font-weight: 400;
      color: #999999;
      line-height: 20px;
    }
    .lineBox {
      margin-top: 35px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: calc(100% + 35px);
      height: 6px;
      background: url(../../assets/img/img_line.png) no-repeat center center /
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

          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 50px;
          width: 250px;
          height: 50px;
          background: linear-gradient(
            129deg,
            RGBA(61, 193, 125, 1) 0%,
            RGBA(61, 193, 125, 1) 100%
          );
          border-radius: 6px;
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
            RGBA(61, 193, 125, 1) 0%,
            RGBA(61, 193, 125, 1) 100%
          );
          border-radius: 6px;
          opacity: 0.41;
          filter: blur(10px);
        }
      }
      // .button {
      //   height: 97px;
      //   width: 281px;
      //   background: url(../../assets/img/btn_copy.png) no-repeat center center /
      //     cover;
      //   display: flex;
      //   justify-content: center;
      //   .clickStyle {
      //     margin-top: 14px;
      //     width: 250px;
      //     height: 48px;
      //     border-radius: 6px;
      //   }
      // }
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
    // height: 39px;
    // width: 100%;
    // display: flex;
    // align-items: center;
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
    // width: calc(100% - 60px);
    // margin-top: 25.5px;
    .imgDv {
      width: 100%;
      border-radius: 12px;
    }
  }
}
</style>
