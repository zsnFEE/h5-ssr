<template>
  <div class="temp" v-title data-title="邀请有礼">
    <div class="backgroundColor"></div>
    <header v-show="appFlag">
      <div class="title title_box">
        <img
          @click="toBack"
          src="../../assets/img/ic_back.png"
          class="titleArrow title_arrow"
        />
        <div class="titleText title_text">邀请有礼</div>
        <div class="titleDv "></div>
      </div>
    </header>
    <body :class="appFlag ? '' : 'active'" v-if="!defaultFlag">
      <canvas
        id="myCanvas"
        :width="548 * multiple"
        :height="975 * multiple"
        ref="myCanvas"
        v-show="false"
      ></canvas>
      <img :src="imageUrl" class="canvasImg" />
      <div v-show="weChatFlag" class="text">长按保存图片</div>
      <div class="buttonList" :class="weChatFlag ? 'active' : ''">
        <!-- <div class="buttonBox" @click="toProfit">
          <img src="../../assets/img/ic_wallet.png" />
          <span>我的收益</span>
        </div> -->
        <div class="buttonBox" @click="toRule">
          <img src="../../assets/img/ic_rule.png" />
          <span>活动规则</span>
        </div>
        <div class="buttonBox" @click="toSave" v-show="!weChatFlag">
          <img src="../../assets/img/ic_download.png" />
          <span>保存图片</span>
        </div>
      </div>
    </body>
    <body :class="appFlag ? '' : 'active'" v-else>
      <div class="empty ft14 ">
        <img
          style="width:264px;height:264px;"
          src="../../assets/img/img_activity.png"
        />
        <div class="imgPosition">{{ defaultText }}</div>
      </div>
    </body>
  </div>
</template>

<script>
import env from "../../config/env";
import { getMemberCode, shareActivityDetail } from "../../api/common";
import html2canvas from "html2canvas";
import { Toast } from "vant";

export default {
  components: {
    [Toast.name]: Toast
  },
  data() {
    return {
      defaultText: "活动未上架",
      defaultFlag: true,
      multiple: 1.5,
      imgUrl: "",
      canvasImg: "",
      isCanvas: true,
      qeCode: "",
      img: "",
      imgCount: 0,
      appFlag: this.$route.query.appFlag,
      imageUrl: "",
      weChatFlag: false,
      member: {},
      poster: ""
    };
  },
  created() {
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf("micromessenger") != -1;
    if (isWeixin) {
      this.weChatFlag = true;
    } else {
      this.weChatFlag = false;
    }

    dsBridge.call("hidetabbar", "", function(v) {});
    let that = this;
    dsBridge.registerAsyn("goback", function(arg1, arg2, arg3) {
      that.toBack();
    });
    shareActivityDetail({ id: this.$route.query.id }).then(res => {
      if (res.code == 0) {
        if (res.data.online_status == 1) {
          this.defaultText = "活动未上架";
          this.defaultFlag = true;
        } else if (res.data.active_status == 1) {
          this.defaultText = "活动未开始";
          this.defaultFlag = true;
        } else if (res.data.active_status == 3) {
          this.defaultText = "活动已结束";
          this.defaultFlag = true;
        } else {
          this.defaultFlag = false;
          getMemberCode({ act_id: this.$route.query.id }).then(res => {
            this.imgUrl = res.data.url;
            this.member = res.data.member;
            this.poster = res.data.poster;
            Toast.loading({
              message: "加载中...",
              forbidClick: true,
              duration: 0
            });
            this.$nextTick(() => {
              window.scrollTo(0, 1);
              window.scrollTo(0, 0);
              this.drowCanvas();
            });
          });
        }
      } else {
        this.$toast(res.msg || res.message);
      }
    });
  },

  methods: {
    drowCanvas() {
      let myCanvas = this.$refs.myCanvas;
      let Cwidth = 548 * this.multiple;
      let CHeight = 975 * this.multiple;
      var ctx = myCanvas.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, Cwidth, CHeight);
      new Promise((resolve, reject) => {
        let imgObj = new Image();
        let that = this;
        imgObj.setAttribute("crossOrigin", "Anonymous");
        imgObj.onload = function() {
          ctx.drawImage(
            imgObj,
            20 * that.multiple,
            26 * that.multiple,
            508 * that.multiple,
            816 * that.multiple
          );
          resolve();
        };
        imgObj.onerror = function(err) {
          reject(err);
        };
        let img1 = this.poster + "?tamp=" + new Date().valueOf();
        if (img1.indexOf("https") == -1) {
          img1 = img1.replace("http", "https");
        }
        imgObj.src = img1;
      })
        .then(() => {
          return new Promise((resolve, reject) => {
            ctx.fillStyle = "#828A99";
            ctx.font = 18 * this.multiple + "px PingFangSC-Regular";
            ctx.fillText(
              this.member.nickname + "  推荐了这个课程",
              56 * this.multiple,
              897 * this.multiple
            );
            ctx.fillStyle = "#000";
            ctx.font = 20 * this.multiple + "px PingFangSC-Regular";
            ctx.fillText(
              "识别图中二维码可查看课程详情",
              20 * this.multiple,
              935 * this.multiple
            );
            var headimgurl = new Image();
            headimgurl.setAttribute("crossOrigin", "Anonymous");
            let that = this;

            headimgurl.onload = function() {
              ctx.save();
              var cx = 20 * that.multiple;
              var cy = 876 * that.multiple;
              let r = 15 * that.multiple;
              ctx.arc(cx + r, cy + r, r, 0, 2 * Math.PI);
              ctx.clip();
              ctx.drawImage(this, cx, cy, r * 2, r * 2);
              ctx.restore();
              resolve();
            };
            headimgurl.onerror = function(err) {
              reject(err);
            };
            let img2 = this.member.headimgurl + "?tamp=" + new Date().valueOf();
            if (img2.indexOf("https") == -1) {
              img2 = img2.replace("http", "https");
            }
            headimgurl.src = img2;
          });
        })
        .then(() => {
          return new Promise((resolve, reject) => {
            var imgobj = new Image();
            imgobj.setAttribute("crossOrigin", "Anonymous");
            let that = this;

            imgobj.onload = function() {
              ctx.drawImage(
                this,
                445 * that.multiple,
                866 * that.multiple,
                84 * that.multiple,
                84 * that.multiple
              );
              resolve();
            };
            imgobj.onerror = function(err) {
              reject(err);
            };
            let img3 = this.imgUrl + "?tamp=" + new Date().valueOf();
            if (img3.indexOf("https") == -1) {
              img3 = img3.replace("http", "https");
            }
            imgobj.src = img3;
          });
        })
        .then(() => {
          this.$nextTick(() => {
            Toast.clear();
            this.imageUrl = myCanvas.toDataURL("image/png");
          });
        })
        .catch(res => {
          Toast.clear();
          alert("图片加载失败");
        });
    },
    downloadFile(data, filename) {
      var save_link = document.createElement("a");
      save_link.href = data;
      var event = new MouseEvent("click");
      save_link.download = filename;
      // var event = document.createEvent("MouseEvents");
      // event.initMouseEvent(
      //   "click",
      //   true,
      //   false,
      //   window,
      //   0,
      //   0,
      //   0,
      //   0,
      //   0,
      //   false,
      //   false,
      //   false,
      //   false,
      //   0,
      //   null
      // );
      // console.log(1, save_link, save_link.click());
      // save_link.click();
      save_link.dispatchEvent(event);
    },
    toSave() {
      if (this.$route.query.appFlag) {
        let model = {
          type: this.imageUrl.split(",")[0],
          image: this.imageUrl.split(",")[1]
        };
        dsBridge.call("saveimage", JSON.stringify(model), function(v) {});
      } else {
        let imageUrl = myCanvas.toDataURL("image/png", 0.5);
        this.downloadFile(imageUrl, "邀请有礼海报.png");
      }
    },
    toBack() {
      if (this.$route.query.appType == 0) {
        this.$router.push({
          path: "/pc/invitationHomePad",
          query: {
            token: this.$route.query.token,
            appFlag: this.$route.query.appFlag,
            appType: this.$route.query.appType,
            appRoute: this.$route.query.appRoute
          }
        });
      } else {
        this.$router.push({
          path: "/phone/invitationHomePhone",
          query: {
            token: this.$route.query.token,
            appFlag: this.$route.query.appFlag,
            appType: this.$route.query.appType,
            appRoute: this.$route.query.appRoute
          }
        });
      }
    },
    toProfit() {
      this.$router.push({
        path: "/phone/invitationProfitPhone",
        query: {
          token: this.$route.query.token,
          appFlag: this.$route.query.appFlag
        }
      });
    },
    toRule() {
      this.$router.push({
        path: "/phone/invitationRulePhone",
        query: {
          id: this.$route.query.id,
          appFlag: this.$route.query.appFlag,
          appType: this.$route.query.appType,
          appRoute: this.$route.query.appRoute
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
  .title {
    .titleDv {
      width: 18px;
    }
  }
  body {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 64px 6% 140px;
    .canvasImg {
      max-width: 100%;
      height: 68vh;
      border-radius: 4px;
      object-fit: contain;
      box-shadow: rgba(71, 79, 116, 1) 0px 8px 35px -20px;
      // object-fit: cover;
    }
    .text {
      width: 265px;
      margin-top: 10px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #828a99;
      line-height: 16.5px;
      text-align: center;
    }
    .canvasBox {
      position: relative;
      height: 445px;
      border-radius: 15px 15px 15px 15px;
      background: #f5f7fa;
      /deep/.qrcode {
        width: 65px;
        height: 65px;
        position: absolute;
        bottom: 35px;
        right: 80px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .wallet {
        width: 250px;
        height: 445px;
        -o-object-fit: cover;
        object-fit: cover;
        border-radius: 15px 15px 15px 15px;
        position: absolute;
        top: 0;
        /* margin: auto; */
        left: 50%;
        transform: translate(-50%);
      }
      .poster {
        width: 100%;
        height: auto;
        position: absolute;
        top: 0;
        z-index: -1;
        border-radius: 15px 15px 15px 15px;
        height: 400px;
      }
      button {
        position: absolute;
        bottom: 0px;
      }
    }
    .canvasedBox {
      width: 100%;
      border-radius: 15px 15px 15px 15px;
    }
    .buttonList {
      position: fixed;
      width: calc(88% - 60px);
      bottom: 50px;
      padding: 0px 30px;
      display: flex;
      justify-content: space-between;
      @media (min-width: 767px) {
        width: calc(500px - 30px);
      }
      .buttonBox {
        width: 80px;
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
        img {
          width: 80px;
          height: 80px;
        }
        span {
          position: absolute;
          font-size: 12px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;
          line-height: 16.5px;
          top: 66px;
        }
      }
    }
    .buttonList.active {
      width: calc(88% - 90px);
      padding: 0px 45px;
      @media (min-width: 767px) {
        width: calc(500px - 90px);
      }
    }
    .empty {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      font-size: 14px;
      font-weight: 500;
      color: #666666;
    }
  }
  body.active {
    padding-top: 22px;
  }
}
</style>
