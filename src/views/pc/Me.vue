<template>
  <div class="me" :class="!flag ? 'pcContain' : ''">
    <img class="bgimg" src="../../assets/img/bg2.png" />
    <div class="me_box">
      <div class="header" @click="toPersonalpc">
        <div class="act">
          <img :src="user.headimgurl" />
        </div>
        <div>
          <div class="name">
            {{ user.nickname }}
            <img class="next" src="../../assets/img/btn_arrow.png" />
          </div>
          <div class="">
            <span class="num">{{ user.integral }}</span>
            <span class="font">积分</span>
          </div>
        </div>
      </div>

      <!--下边部分开始-->
      <div class="link">
        <!--课程投屏-->
        <!-- <div class="link_item" @click="getCode" v-show="flag">
          <div class="item_left">
            <div class="link_img">
              <img src="../../assets/img/ic_airplay@2x.png" />
            </div>
            <div class="link_font">课件投屏</div>
          </div>
          <div class="img_right">
            <img src="../../assets/img/btn_arrow.png" />
          </div>
        </div> -->
        <!-- 我的订单 -->
        <div
          class="link_item cursor"
          @click="toOrders"
          :class="flag ? '' : 'bottom'"
        >
          <div class="item_left">
            <div class="link_img">
              <img src="../../assets/img/ic_order_green.png" />
            </div>
            <div class="link_font">我的订单</div>
          </div>
          <div class="img_right">
            <img src="../../assets/img/btn_arrow.png" />
          </div>
        </div>
        <div
          class="link_item cursor"
          @click="toCoupon"
          :class="flag ? '' : 'bottom'"
        >
          <div class="item_left">
            <div class="link_img">
              <img src="../../assets/img/ic_coupon_green.png" />
            </div>
            <div class="link_font">优惠券</div>
          </div>
          <div class="img_right">
            <img src="../../assets/img/btn_arrow.png" />
          </div>
        </div>
        <div
          v-show="flag"
          class="link_item cursor"
          @click="toInvitation"
          :class="flag ? '' : 'bottom'"
        >
          <div class="item_left">
            <div class="link_img">
              <img src="../../assets/img/ic_gift_green.png" />
            </div>
            <div class="link_font">邀请有礼</div>
          </div>
          <div class="img_right">
            <img src="../../assets/img/btn_arrow.png" />
          </div>
        </div>
        <div
          v-show="flag"
          class="link_item cursor"
          @click="toProfit"
          :class="flag ? '' : 'bottom'"
        >
          <div class="item_left">
            <div class="link_img">
              <img src="../../assets/img/ic_profit.png" />
            </div>
            <div class="link_font">我的收益</div>
          </div>
          <div class="img_right">
            <img src="../../assets/img/btn_arrow.png" />
          </div>
        </div>
        <div
          v-show="flag && isIos"
          class="link_item cursor"
          :class="flag ? '' : 'bottom'"
          @click="score"
        >
          <div class="item_left">
            <div class="link_img">
              <img src="../../assets/img/ic_score_green.png" />
            </div>
            <div class="link_font">为我们评分</div>
          </div>
          <div class="img_right">
            <img src="../../assets/img/btn_arrow.png" />
          </div>
        </div>
        <div
          class="link_item cursor"
          :class="flag ? '' : 'bottom'"
          @click="toAboout"
        >
          <div class="item_left">
            <div class="link_img">
              <img src="../../assets/img/ic_about_green.png" />
            </div>
            <div class="link_font">关于Dipper</div>
          </div>
          <div class="img_right">
            <img src="../../assets/img/btn_arrow.png" />
          </div>
        </div>
        <div
          class="link_item cursor"
          @click="clearCache"
          v-show="flag"
          :class="flag ? '' : 'bottom'"
        >
          <div class="item_left">
            <div class="link_img">
              <img src="../../assets/img/ic_clear_green.png" />
            </div>
            <div class="link_font">清理缓存</div>
          </div>
          <div class="img_right">
            <img src="../../assets/img/btn_arrow.png" />
          </div>
        </div>
        <div v-if="!flag && !isMac" class="link_item">
          <div class="item_left">
            <div class="link_img">
              <img src="../../assets/img/ratio.png" />
            </div>
            <div class="link_font">跟随系统分辨率</div>
          </div>
          <div class="img_right ratio">
            <span class="tips">{{
              ratio
                ? "如出现软件显示不完整的情况，建议关闭该功能"
                : "如出现文字等元素过小的情况，建议开启该功能"
            }}</span>
            <el-switch @change="ratioChanged" v-model="ratio"></el-switch>
          </div>
        </div>
      </div>
      <!--弹出输入验证码的框开始-->
      <div class="screen_toast" v-show="toast" @click.self="code_btn">
        <div class="toast">
          <div class="code">
            <input
              type="text"
              placeholder="请输入验证码"
              v-model="code"
              onkeyup="this.value=this.value.replace(/[^0-9-]+/,'');"
            />
          </div>
          <div class="code_btn cursor" @click="getCode">确认</div>
        </div>
      </div>
      <!--弹出输入验证码的框结束-->
    </div>
  </div>
</template>
<script>
import { apiInfo } from "../../api/common";
import { isMobile, isDevice, isIos, isMac } from "../../common/util";
import { Toast } from "vant";
import { sendMessage } from "../../api/client";

export default {
  data() {
    return {
      ratio: false,
      isMac: isMac(),
      toast: false,
      code: "",
      user: {},
      history: [],
      flag: isMobile(),
      isDevice: isDevice(),
      isIos: isIos()
    };
  },
  mounted() {
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
    window["recvMessage"] = msg => {
      if (JSON.parse(msg).signal == "followSystem") {
        this.ratioChanged(JSON.parse(msg).isFollow, true);
      } else {
        this.apiLoad();
      }
    };

    dsBridge.call("showtabbar", "", function(v) {});
    this.apiLoad();
  },
  methods: {
    ratioChanged(val, member) {
      member
        ? (this.ratio = val)
        : sendMessage({ signal: "followSystem", isFollow: this.ratio });
    },

    apiLoad() {
      apiInfo().then(res => {
        this.user = res.data;
        let model = {
          changetype: "1", //修改昵称
          nickname: this.user.nickname //昵称
        };
        sendMessage(model);
        this.history = res.data.history;
      });
    },
    //去关于页面
    toAboout() {
      this.$router.push({
        path: "/pc/Aboutapppc",
        query: { token: this.$route.query.token }
      });
    },
    // 去优惠券页面
    toCoupon() {
      this.$router.push({
        path: "/pc/myCoupon",
        query: {
          token: this.$route.query.token,
          title: "优惠券"
        }
      });
    },
    toInvitation() {
      this.$router.push({
        path: "/pc/invitationHomePad",
        query: {
          appFlag: 1,
          appType: 0,
          appRoute: 0
        }
      });
    },
    toProfit() {
      this.$router.push({
        path: "/phone/invitationProfitPhone",
        query: { appFlag: 1, appType: 0, appRoute: 1 }
      });
    },
    // 评分的方法开始
    score() {
      dsBridge.call("commenton", " ", function(v) {});
    },
    // 评分的方法结束
    // 清除缓存
    clearCache() {
      dsBridge.call("clearcache", "", function(v) {});
      let that = this;
      dsBridge.registerAsyn("UploadCacheSize", function(arg1, arg2, arg3) {
        that.cachesize = JSON.parse(arg1).size;
      });
    },
    // 去在线客服页面
    toConsult() {
      this.$router.push({
        path: "/pc/Consult",
        query: {
          token: this.$route.query.token,
          title: "在线客服"
        }
      });
    },
    //去帮助中心
    toHelp() {
      this.$router.push({
        path: "/pc/Help",
        query: {
          token: this.$route.query.token
        }
      });
    },
    // 去个人资料页面
    toPersonalpc() {
      this.$router.push({
        path: "/pc/Personalpc",
        query: {
          token: this.$route.query.token
        }
      });
    },
    // toInvitation() {
    //   this.$router.push({
    //     path: "/phone/invitationPhone",
    //     query: {
    //       token: this.$route.query.token,
    //       appFlag: true
    //     }
    //   });
    // },
    // 暂时不要的去头像页面的方法
    // toMyInfo() {
    //   this.$router.push({
    //     path: "/pc/improveInfoPc",
    //     query: {
    //       token: this.$route.query.token,
    //       mySign: true,
    //       Classtype: this.$route.query.Classtype
    //     }
    //   });
    // },
    getCode() {
      // if (this.code.length > 3) {
      // let model = {
      //   screencode: this.code
      // };
      // dsBridge.call("sharescreen", JSON.stringify(model), function(v) {});
      // this.toast = !this.toast;
      // } else {
      //   this.$toast("请输入四位及以上验证码");
      // }
      // this.code = "";

      dsBridge.call("sharescreen", "", function(v) {});
    },
    code_btn() {
      this.toast = !this.toast;
    },
    // 退出登录
    backlogin() {
      dsBridge.call("logout", "", function(v) {});
      //pc退出登陆
      sendMessage({ signal: "logout" });
      // this.$router.push({
      // 	path: "/pc/Personalpc",
      // 	query: { token: this.$route.query.token }
      // });
    },
    // 去登录页面
    toset() {
      this.$router.push({
        path: "/pc/Set",
        query: { token: this.$route.query.token }
      });
    },
    // 去我的订单页面
    toOrders() {
      this.$router.push({
        path: "/pc/Orders",
        query: { token: this.$route.query.token }
      });
    },
    //去赏金奖励页面
    toAward() {
      localStorage.setItem("home", 3);
      this.$router.push({
        path: "/pc/Rule",
        query: { home: 3, token: this.$route.query.token }
      });
    }
  },
  watch: {
    // code () {
    //   this.getCode()
    // }
  }
};
</script>
<style lang="less" scoped>
.lefticon {
  display: flex;
  align-items: center;

  img {
    width: 17px;
    height: 17px;
    margin-right: 13px;
  }
  span {
    font-size: 15px;
    font-weight: 500;
    color: #333333;
  }
  .phonenumber {
    font-size: 15px;
    font-weight: 500;
    color: #646464;
  }
}

.me {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  position: relative;

  &.pcContain {
    background: linear-gradient(180deg, #ffffff 0%, #f3f5f9 100%);
    padding: 24px 20px 0px 20px;
    max-height: 100vh;
    width: 100%;
    .bgimg {
      width: calc(100% - 40px);
      border-radius: 10px 10px 0px 0px;
    }
  }

  .bgimg {
    width: 100%;
    max-height: calc(100% - 24px);
    -o-object-fit: cover;
    object-fit: cover;
    position: absolute;
  }
}
.me_box {
  width: 100%;
  position: relative;
  padding: 44px 20px 0px 20px;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 38px;
    .act {
      width: 50px;
      height: 50px;
      margin-right: 15px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .name {
      font-size: 18px;
      font-weight: 500;
      color: #07301b;
      cursor: pointer;
    }
    .num {
      font-size: 16px;
      // font-family: DINAlternate-Bold, DINAlternate;
      font-weight: bold;
      color: rgba(7, 48, 27, 0.5);
      margin-right: 4px;
    }
    .font {
      font-size: 12px;
      font-weight: 500;
      color: rgba(7, 48, 27, 0.5);
      margin-right: 25px;
    }
  }
  .next {
    width: 7px;
    height: 12px;
    margin-left: 25px;
  }
}

.link {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  padding: 13px 20px;
  margin-top: 20px;
  box-sizing: border-box;
}
.link_item {
  display: flex;
  justify-content: space-between;
  // border-bottom: 1px solid #f2f5fa;
  padding: 13px 0px;
  align-items: center;
}
.link_img {
  width: 24px;
  height: 24px;
}
.link_img img {
  width: 100%;
  height: 100%;
}
.item_left {
  display: flex;
}
.link_font {
  font-size: 14px;
  // font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin-left: 10px;
  margin-top: 2px;
}
.ratio {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  margin-left: 10px;
  margin-top: 2px;
}
.el-switch {
  margin-left: 10px;
}
.img_right img {
  width: 7px;
  height: 12px;
}
.screen_toast {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
}
.screen_toast .toast {
  width: 300px;

  background: #fff;
  margin: 10% auto;
  border-radius: 10px;
  padding: 25px 15px;
  box-sizing: border-box;
  position: absolute;
  top: 32%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.code {
  margin: auto;
  width: 80%;
  display: flex;
}
.code input {
  width: 100%;
  border-radius: 29px;
  border: 1px solid #cfcfcf;
  padding: 9px 0 9px 20px;
  font-size: 16px;
  outline: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.code input::placeholder {
  color: #b8bfcc;
}
.code_btn {
  width: 67%;
  background: #6551ea;
  border-radius: 14px;
  padding: 5px 15px;
  color: #fff;
  margin: 20px auto 0;
  text-align: center;
  font-size: 16px;
}
.bottom {
  border-bottom: 0;
}
</style>
