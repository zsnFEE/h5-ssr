<template>
  <div class="temp" v-title data-title="提现">
    <div class="backgroundColor"></div>
    <header v-show="appFlag">
      <div class="title title_box">
        <img
          @click="toBack"
          src="../../assets/img/ic_back.png"
          class="titleArrow title_arrow"
        />
        <div class="titleText title_text">提现</div>
        <div class="titleDv"></div>
      </div>
    </header>
    <body>
      <div class="station" v-show="appFlag"></div>
      <div class="card">
        <div class="titleBox">
          <div class="titleText">提现金额</div>
          <!-- <div class="rule" @click="toRule">
            查看提现规则<img src="../../assets/img/btn_arrow.png" />
          </div> -->
        </div>
        <div class="amountBox">
          <div>￥</div>
          <input type="number" v-model="money" />
        </div>
        <div class="tipsBox">
          <div class="default" v-show="!maxFlag">
            可提现金额为￥{{ haveMoney }}，
            <div class="event" @click="fillIn">全部提现</div>
          </div>
          <div v-show="maxFlag" class="warning">
            单笔提现最高金额为 ¥{{ maxMoney }}.00
          </div>
        </div>
        <button :class="money == '' ? '' : 'active'" @click="withdraw">
          提现
        </button>
      </div>
    </body>
  </div>
</template>

<script>
import { postApiWidthdraw, getJssdkConfig } from "../../api/common";
import axios from "axios";
import env from "../../config/env";
const URL = env.baseUrl;

export default {
  data() {
    return {
      money: "",
      haveMoney: this.$route.query.last_amount
        ? this.$route.query.last_amount
        : "0.00",
      maxMoney: 200.0,
      maxFlag: false,
      appFlag: this.$route.query.appFlag,
      openid: ""
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.scrollTo(0, 1);
      window.scrollTo(0, 0);
    });
    if (this.$route.query.last_amount) {
      localStorage.setItem("last_amount", this.$route.query.last_amount);
    } else {
      this.haveMoney = localStorage.getItem("last_amount");
    }

    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf("micromessenger") != -1;
    if (isWeixin) {
      let local = window.location.href;
      var openId = this.GetQueryString("openid");
      if (!openId) {
        let urlNow = encodeURIComponent(local);
        window.location.href = URL + "/auth/redirect_h5?url=" + urlNow;
      } else {
        this.openid = openId;
      }
      // let local = window.location.href;
      // let APIs = ["chooseWXPay"];
      // getJssdkConfig({ apis: APIs, url: local }).then(res => {
      //   if (res.data) {
      //     console.log(1);
      //     let urlNow = encodeURIComponent(local);
      //     console.log(2);
      //     var wxcode = this.GetQueryString("code");
      //     this.$toast(wxcode);
      //     if (wxcode === null || wxcode === "") {
      //       this.$toast(1);
      //       console.log(
      //         "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
      //           res.data.appId +
      //           "&redirect_uri=" +
      //           urlNow +
      //           "&response_type=code&scope=snsapi_base#wechat_redirect"
      //       );
      //       console.log(res.data.appId);
      //       console.log(urlNow);
      //       window.location.href =
      //         "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
      //         res.data.appId +
      //         "&redirect_uri=" +
      //         urlNow +
      //         "&response_type=code&scope=snsapi_base#wechat_redirect";
      //     } else {
      //       console.log(4);
      //       axios
      //         .get(`https://${this.apiSite}/api/mp/xcode/${wxcode}/1`)
      //         .then(res => {
      //           console.log(3);
      //           if (res.data.code == 0) {
      //             this.openid = res.data.data.openid;
      //             this.$toast(this.openid);
      //           } else {
      //             this.$toast(res.data.message);
      //           }
      //         });
      //     }
      //   } else {
      //     this.$toast(res.message);
      //   }
      // });
      let that = this;
      dsBridge.registerAsyn("goback", function(arg1, arg2, arg3) {
        that.toBack();
      });
    }
  },
  watch: {
    money(val, old) {
      this.money = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
      if (val > this.maxMoney) {
        this.maxFlag = true;
      } else if (val <= this.maxMoney) {
        this.maxFlag = false;
      }
    }
  },
  methods: {
    GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      var context = "";
      if (r != null) context = r[2];
      reg = null;
      r = null;
      return context == null || context == "" || context == "undefined"
        ? ""
        : context;
    },
    fillIn() {
      this.money = this.haveMoney;
    },
    toBack() {
      this.$router.push({
        path: "/phone/invitationProfitPhone",
        query: {
          token: this.$route.query.token,
          appFlag: this.$route.query.appFlag,
          appType: this.$route.query.appType,
          appRoute: this.$route.query.appRoute
        }
      });
    },
    toRule() {
      this.$router.push({
        path: "/phone/invitationRulePhone",
        query: {
          token: this.$route.query.token,
          appFlag: this.$route.query.appFlag,
          appType: this.$route.query.appType,
          appRoute: this.$route.query.appRoute,
          homeFlag: true
        }
      });
    },
    withdraw() {
      if (this.money) {
        if (this.money >= 1 && this.money <= 200) {
          if (this.haveMoney >= this.money) {
            postApiWidthdraw({ amount: this.money, openid: this.openid }).then(
              res => {
                if (res.code == 0) {
                  this.money = "";
                  this.$toast("您已提现成功");
                  this.toBack();
                } else {
                  this.$toast(res.msg || res.message);
                }
              }
            );
          } else {
            this.$toast("请输入提现金额");
          }
        } else {
          this.$toast("单笔提现金额请在1到200之间");
        }
      } else {
        this.$toast("请输入提现金额");
      }
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
    padding: 15px;
    @media (min-width: 767px) {
      padding: 15px 10%;
    }
    .station {
      height: 42px;
      width: 10px;
    }
    .card {
      padding: 22px 20px 23px;
      background: #ffffff;
      border-radius: 6px;
      @media (min-width: 767px) {
        padding: 22px 25px 23px;
      }
      .titleBox {
        display: flex;
        justify-content: space-between;
        .titleText {
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #828a99;
          line-height: 20px;
        }
        .rule {
          display: flex;
          align-items: center;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #828a99;
          line-height: 16.5px;
          img {
            margin-left: 7.5px;
            width: 6px;
            height: 11px;
          }
        }
      }
      .amountBox {
        display: flex;
        flex-direction: row;
        font-size: 30px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #333333;
        line-height: 42px;
        margin-top: 12px;
        padding: 15px 0;
        border-bottom: 0.5px #d8d8d8 solid;
        input {
          border: 0px;
          width: 100%;
          font-size: 30px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #333333;
          line-height: 42px;
        }
      }
      .tipsBox {
        margin-top: 21px;
        .default {
          display: flex;
          flex-direction: row;
          font-size: 12px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #828a99;
          line-height: 16.5px;
          .event {
            color: #24ad93;
          }
        }
        .warning {
          font-size: 12px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ff5533;
          line-height: 16.5px;
        }
      }
      button {
        margin-top: 20px;
        width: 100%;
        height: 40px;
        background: rgba(61, 193, 125, 1);
        border-radius: 5px;
        border: 0;
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
        line-height: 25px;
        opacity: 0.48;
      }
      button.active {
        background: rgba(61, 193, 125, 1);
        opacity: 1;
      }
    }
  }
}
</style>
