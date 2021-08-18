<template>
  <div class="myInfo">
    <client-only>
      <!-- <div class="backgroundColor"></div> -->
      <img src="../../assets/img/bg_myinfo.png" alt="" class="backgroundImg" />
      <body>
        <!-- <div class="middle">
        <div class="infoBox">
          <div class="imgContainer">
            <img :src="user.headimgurl" alt="" @click="toSet" />
            <div @click="toSet">
              <div class="nickname ft18">{{ user.nickname }}</div>
              <div class="integralBox">
                <span class="number ft16">0</span>
                <span class="text ft12">积分</span>
              </div>
            </div>
            <img
              src="../../assets/img/ic_setting.png"
              class="settingDv"
              @click="toSet"
            />
          </div>
          <div class="timeBox">
            <div class="oneTimeBox">
              <div class="numberClass numberColor ft24">
                {{ user.not_start_num }}
              </div>
              <div class="textSign ft10">剩余课节</div>
            </div>
            <div class="oneTimeBox">
              <div class="numberClass specialNumber ft24">
                {{ user.started_num }}
              </div>
              <div class="textSign ft10">累计课节</div>
            </div>
            <div class="oneTimeBox">
              <div class="numberClass ft24">{{ user.planting_num }}</div>
              <div class="textSign ft10">我的作品</div>
            </div>
          </div>
        </div>
      </div> -->
        <div class="infoBox" @click="toSet">
          <div class="infoLeft">
            <img :src="user.headimgurl" alt="" class="head" />
            <div class="info">
              <div class="infoName">
                <div>
                  {{ user.nickname }}
                </div>
                <img src="../../assets/img/btn_arrow_right.png" />
              </div>
              <div class="infoIntegral">
                {{ user.integral }}
                <span>积分</span>
              </div>
            </div>
          </div>
          <div class="infoRight">
            <!-- <img src="../assets/img/btn_arrow_right.png" /> -->
          </div>
        </div>
        <div class="bottomContainer ft14">
          <!-- @click="sharescreen" -->
          <!-- <button @click="sharescreen">
          <div>
            <img src="../../assets/img/ic_airplay.png" />
            <span>开始投屏</span>
          </div>
          <img src="../../assets/img/btn_arrow_right.png" />
        </button> -->
          <button @click="toMyOrder">
            <div>
              <img src="../../assets/img/ic_order_green.png" />
              <span>我的订单</span>
            </div>
            <img src="../../assets/img/btn_arrow_right.png" />
          </button>
          <button @click="toMyCoupon">
            <div>
              <img src="../../assets/img/ic_coupon_green.png" />
              <span>优惠券</span>
            </div>
            <img src="../../assets/img/btn_arrow_right.png" />
          </button>
          <button @click="toInvitation">
            <div>
              <img src="../../assets/img/ic_gift_green.png" />
              <span>邀请有礼</span>
            </div>
            <img src="../../assets/img/btn_arrow_right.png" />
          </button>
          <button @click="toProfit">
            <div>
              <img src="../../assets/img/ic_profit.png" />
              <span>我的收益</span>
            </div>
            <img src="../../assets/img/btn_arrow_right.png" />
          </button>
          <button
            @click="commenton"
            v-show="isDevice == 'ipad' || isDevice == 'iphone'"
          >
            <div>
              <img src="../../assets/img/ic_score_green.png" />
              <span>为我们评分</span>
            </div>
            <img src="../../assets/img/btn_arrow_right.png" />
          </button>
          <button @click="toAboutApp">
            <div>
              <img src="../../assets/img/ic_about_green.png" />
              <span>关于Dipper</span>
            </div>
            <img src="../../assets/img/btn_arrow_right.png" />
          </button>
          <button @click="clearCache">
            <div>
              <img src="../../assets/img/ic_clear_green.png" />
              <span>清理缓存</span>
            </div>
            <img src="../../assets/img/btn_arrow_right.png" />
          </button>
          <button @click="quit">
            <div>
              <img src="../../assets/img/ic_quit.png" />
              <span>退出登录</span>
            </div>
            <img src="../../assets/img/btn_arrow_right.png" />
          </button>
          <!-- <button>
          <div>
            <img src="../../assets/img/ic_mall.png" />
            <span>积分商城</span>
          </div>
          <img src="../../assets/img/btn_arrow_right.png" />
        </button> -->
        </div>
        <!-- <div class="bottomContainer">
        <button @click="toInquiry">
          <div>
            <img src="../../assets/img/ic_service.png" />
            <span>
              在线客服
            </span>
          </div>
          <img src="../../assets/img/btn_arrow_right.png" />
        </button>
        <button @click="toHlep">
          <div>
            <img src="../../assets/img/ic_help.png" />
            <span>帮助中心</span>
          </div>
          <img src="../../assets/img/btn_arrow_right.png" />
        </button>
        <button @click="toPersonal">
          <div>
            <img src="../../assets/img/ic_setting.png" />
            <span>设置</span>
          </div>
          <img src="../../assets/img/btn_arrow_right.png" />
        </button>
       
      </div> -->
      </body>
      <van-popup round v-model="show">
        <input
          type="text"
          placeholder="请输入验证码"
          v-model="code"
          class="codeInput ft16"
          onkeyup="this.value=this.value.replace(/[^0-9-]+/,'');"
        />
        <button class="codeButton" @click="sharescreen">确认</button>
      </van-popup>
    </client-only>
  </div>
</template>
<script>
import { isDevice } from "../../common/util";

import { apiInfo } from "../../api/common";
import { Popup, Toast } from "vant";
export default {
  components: {
    [Popup.name]: Popup,
    [Toast.name]: Toast
  },
  data() {
    return {
      isDevice: isDevice(),
      user: {},
      history: [],
      show: false,
      code: "",
      iosFlag: ""
    };
  },
  mounted() {
    var u = navigator.userAgent;
    this.iosFlag = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    dsBridge.registerAsyn("goback", function(arg1, arg2, arg3) {
      dsBridge.call("goexit", "", function(v) {});
    });
    let that = this;
    dsBridge.registerAsyn("RefreshData", function(arg1, arg2, arg3) {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });
      let second = 3;
      const timer = setInterval(() => {
        second--;
        if (second) {
        } else {
          clearInterval(timer);
          Toast.clear();
        }
      }, 1000);
      apiInfo().then(res => {
        Toast.clear();
        that.user = res.data;
        that.history = res.data.history;
      });
    });
    dsBridge.call("showtabbar", "", function(v) {});
    apiInfo().then(res => {
      this.user = res.data;
      this.history = res.data.history;
    });
  },
  methods: {
    quit() {
      dsBridge.call("logout", "", function(v) {});
    },
    toMyInfo() {
      this.$router.push({
        path: "/phone/improveInfoPhone",
        query: {
          token: this.$route.query.token,
          mySign: true
        }
      });
    },
    toHlep() {
      this.$router.push({
        path: "/phone/helpCenterPhone",
        query: {
          token: this.$route.query.token
        }
      });
    },

    sharescreen() {
      dsBridge.call("sharescreen", "", function(v) {});
      // if (this.code.length > 3) {
      //   let model = {
      //     screencode: this.code
      //   };
      //   dsBridge.call("sharescreen", JSON.stringify(model), function(v) {});
      //   this.show = false;
      // } else {
      //   this.$toast("请输入4位及以上验证码");
      // }
    },
    commenton() {
      dsBridge.call("commenton", "", function(v) {});
    },
    clearCache() {
      dsBridge.call("clearcache", "", function(v) {});
    },
    toInvitation() {
      this.$router.push({
        path: "/phone/invitationHomePhone",
        query: {
          appFlag: 1,
          appType: 1,
          appRoute: 0
        }
      });
    },
    toProfit() {
      this.$router.push({
        path: "/phone/invitationProfitPhone",
        query: { appFlag: 0, appType: 1, appRoute: 1 }
      });
    },
    toAboutApp() {
      this.$router.push({
        path: "/phone/aboutAppPhone",
        query: { token: this.$route.query.token }
      });
    },
    showPopup() {
      this.show = true;
    },
    toPersonal() {
      this.$router.push({
        path: "/phone/personalPhone",
        query: { token: this.$route.query.token }
      });
    },
    toSet() {
      this.$router.push({
        path: "/phone/settingPhone",
        query: { token: this.$route.query.token }
      });
    },
    toMyOrder() {
      this.$router.push({
        path: "/phone/orderPhone",
        query: { token: this.$route.query.token, appFlag: 1 }
      });
    },
    toMyCoupon() {
      this.$router.push({
        path: "/phone/myCouponPhone",
        query: { token: this.$route.query.token }
      });
    },

    toInquiry() {
      this.$router.push({
        path: "/phone/inquiryTeacherPhone",
        query: { token: this.$route.query.token, title: 2 }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.van-popup {
  padding: 25px;
  border-radius: 8px;
}
.myInfo {
  padding: 16px 15px;
  // background: #f7f8fc;
  height: calc(100% - 32px);
  // header {
  //   padding: 5px 15px;
  //   // width: 100%;
  //   display: flex;
  //   align-items: center;
  //   justify-content: space-between;
  //   .goback {
  //     width: 20px;
  //     height: 20px;
  //   }
  //   img {
  //     width: 24px;
  //   }
  // }
  .backgroundColor {
    background-color: #fff;
    z-index: -5;
  }
  .backgroundImg {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    position: absolute;
    z-index: -1;
  }
  body {
    .middle {
      border-radius: 8px;
      padding-top: 25px;
      // background: #fff;
      width: 100;
      background: url("../../assets/img/bg_profile.png") no-repeat center center /
        cover;
      .infoBox {
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.05);
        border-radius: 0px 50px 8px 8px;
        padding: 19px 25px;
        .timeBox {
          margin-top: 15px;
          display: flex;
          justify-content: space-between;
          .oneTimeBox {
            display: flex;
            flex-direction: column;
            align-items: center;
            .numberClass {
              // font-size: 24px;
              font-family: DINAlternate-Bold, DINAlternate;
              font-weight: bold;
              color: rgba(255, 90, 0, 1);
              line-height: 28px;
            }
            .specialNumber {
              color: rgba(101, 81, 234, 1);
            }
            .numberColor {
              color: rgba(255, 115, 0, 1);
            }
            .textSign {
              margin-top: 3px;
              // font-size: 10px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 400;
              color: #333;
            }
          }
        }
      }
      .studyTime {
        font-size: 18px;
        font-weight: 500;
      }
      .imgContainer {
        display: flex;
        align-items: center;
        .nickname {
          word-wrap: break-word;
          max-width: 47vw;
          // font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(41, 45, 51, 1);
          line-height: 25px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .integralBox {
          display: flex;
          align-items: center;
          .number {
            // font-size: 16px;
            font-family: DINAlternate-Bold, DINAlternate;
            font-weight: bold;
            color: rgba(130, 138, 153, 1);
            line-height: 18.5px;
          }
          .text {
            margin-left: 4px;
            // font-size: 12px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(130, 138, 153, 1);
            line-height: 16.5px;
          }
        }
        .settingDv {
          width: 24px;
          height: 24px;
          position: absolute;
          right: 26px;
        }
      }
      .studentAll {
        // font-size: 12px;
        color: white;
        width: 60px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background: linear-gradient(
          129deg,
          rgba(255, 115, 0, 1) 0%,
          rgba(255, 85, 0, 1) 100%
        );
      }
      img {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        margin-right: 15px;
      }
    }
    .infoBox {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-top: 62px;
      margin-bottom: 30px;
      margin-right: 5px;
      .infoLeft {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 90%;
        flex-grow: 1;

        img {
          height: 50px;
          width: 50px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 15px;
        }
        .info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 40%;
          flex-grow: 1;
          .infoName {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            font-size: 18px;
            font-weight: bold;
            color: #292d33;
            line-height: 25px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            div {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            img {
              margin-right: 12px;
              border-radius: 0%;
              width: 7px;
              height: 14px;
            }
          }
          .infoIntegral {
            margin-top: 2px;
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: 16px;
            font-weight: bold;
            // color: #707682;
            color: rgba(7, 48, 27, 0.5);
            line-height: 18px;
            span {
              font-size: 12px;
              font-weight: 500;
              // color: #707682;
              color: rgba(7, 48, 27, 0.5);
              line-height: 16px;
              margin-left: 4px;
            }
          }
        }
      }
      .infoRight {
        img {
          width: 7px;
          height: 12px;
        }
      }
    }
    .bottomContainer {
      margin: 15px 0;
      padding: 7px 15px;
      background: #fff;
      border-radius: 6px;

      button,
      a {
        padding: 15px 0px;
        width: 100%;
        border: 0;
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        div {
          display: flex;
          align-items: center;
          span {
            // font-size: 14px;
            // font-size: 3.7333vw;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(41, 45, 51, 1);
            line-height: 20px;
            a {
              color: rgba(41, 45, 51, 1);
            }
          }
          img {
            width: 24px;
            height: 24px;
            margin-right: 8px;
          }
        }
        img {
          width: 7px;
          height: 12px;
        }
      }
    }
  }
  .codeInput {
    // font-size: 16px;
    border-radius: 29px;
    padding: 15px;
    border: 1px solid #cfcfcf;
    outline: none;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .codeButton {
    width: 100%;
    margin-top: 15px;
    border: 0px;
    border-radius: 29px;
    padding: 15px 0px;
    background: #6551ea;
    color: #fff;
  }
}
</style>
