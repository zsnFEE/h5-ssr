<template>
  <div class="temp minHeight" :class="!isMobile && !isIos ? 'pc_box' : ''">
    <Header v-if="isMobile" :title="'修改密码'" @toBack="toBack"> </Header>

    <div class="body">
      <div class="bigTitle ft30" v-if="!isMobile">
        修改密码
      </div>

      <div class="codeBox">
        <div class="sms ft16">
          请输入
          <span>{{
            userInfo.phone &&
              userInfo.phone.substr(0, 3) + "****" + userInfo.phone.substr(7, 4)
          }}</span>
          收到的验证码
        </div>
        <div class="codeNum">
          <span
            >{{ code[0] }}
            <div>{{ inputFocus && code.length == 0 ? "|" : "" }}</div></span
          >
          <span
            >{{ code[1] }}
            <div>{{ inputFocus && code.length == 1 ? "|" : "" }}</div></span
          >
          <span
            >{{ code[2] }}
            <div>{{ inputFocus && code.length == 2 ? "|" : "" }}</div></span
          >
          <span
            >{{ code[3] }}
            <div>{{ inputFocus && code.length == 3 ? "|" : "" }}</div></span
          >
          <span
            >{{ code[4] }}
            <div>{{ inputFocus && code.length == 4 ? "|" : "" }}</div></span
          >
          <span
            >{{ code[5] }}
            <div :class="code.length > 5 ? 'end' : ''">
              {{ inputFocus && code.length > 5 ? "|" : "" }}
            </div></span
          >
          <input
            maxlength="6"
            v-model="code"
            @keyup.enter="toChangePassword"
            @focus="inputFocus = true"
            @blur="inputFocus = false"
          />
        </div>
        <div
          v-if="!count_flage"
          class="codeCount ft14"
          @click="getverification"
        >
          发送验证码
        </div>
        <div v-else class="codeCount ft14 grey">
          {{ count_time }}秒后重新发送
        </div>
        <button class="codeButton ft18" @click="toChangePassword">
          下一步
        </button>
      </div>
      <!-- <div class="tipsText ft16">
        请输入
        <span>{{
          userInfo.phone &&
            userInfo.phone.substr(0, 3) + "****" + userInfo.phone.substr(7, 4)
        }}</span>
        收到的的短信验证码
      </div>
      <div class="inputBox">
        <input
          type="number"
          class="ft16"
          v-model="code"
          placeholder="请输入手机号"
        />
        <button class="ft16" v-if="!count_flage" @click="getverification">
          获取验证码
        </button>
        <div class="ft16" v-else>{{ count_time }}s</div>
      </div>
      <div class="submitBox">
        <button class="ft18" @click="toChangePassword">下一步</button>
      </div> -->
    </div>
  </div>
</template>

<script>
import { apiInfo } from "../../api/common";
import { sendMessage } from "../../api/client";
import { sendOutCode, checkSms } from "../../api/common";
import { isMobile, isIos, Debounce } from "../../common/util";

export default {
  components: {},
  data() {
    return {
      inputFocus: false,
      code: "",
      userInfo: [],
      count_flage: false,
      count_time: "",
      isMobile: isMobile(),
      isIos: isIos(),
      flag: this.$route.query.flag,
      timer: null
    };
  },
  mounted() {
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.Back();
    });
    dsBridge.call("hidetabbar", "", function(v) {});
    apiInfo().then(res => {
      if (res.code == 0) {
        this.userInfo = res.data;
      } else {
        this.$toast(res.msg || res.message);
      }
    });
  },
  watch: {
    code(val, old) {
      if (val.length > 6) this.code = old;
      if (!(val && /^\d{1,}$/.test(val))) {
        if (val == "") {
        } else {
          this.code = old;
        }
      }
    }
  },
  methods: {
    toBack() {
      if (this.flag == 1) {
        this.$router.push({
          path: "/phone/settingPhone"
        });
      } else {
        this.$router.push({
          path: "/pc/Personalpc"
        });
      }
    },
    toChangePassword: Debounce(function(e) {
      if (this.code.length < 6) {
        this.$toast("请输入完整验证码");
        return;
      }
      checkSms({ phone: this.userInfo.phone, code: this.code }).then(res => {
        if (res.code == 0) {
          this.$router.push({
            path: "/phone/changePassword",
            query: { routeFlag: 1, token: res.data.token, flag: this.flag }
          });
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    }),
    getverification() {
      this.getTrueCode();
      this.countDown();
    },
    countDown() {
      var TIME_COUNT = 60;
      if (!this.timer) {
        this.count_time = TIME_COUNT;
        this.count_flage = true;
        this.timer = setInterval(() => {
          if (this.count_time > 0 || this.count < TIME_COUNT + 1) {
            this.count_time--;
          } else {
            clearInterval(this.timer);
            this.timer = null;
            this.count_flage = false;
          }
        }, 1000);
      }
    },
    getTrueCode() {
      sendOutCode({
        phone: this.userInfo.phone,
        use: "login"
      }).then(res => {});
    }
  }
};
</script>

<style lang="less" scoped>
.temp {
  &.pc_box {
    height: calc(100vh - 40px);
    padding: 20px;
    background: #f3f5f9;
    .body {
      padding: 0;
      background: #ffffff;
      height: calc(100vh - 40px);
      border-radius: 8px;
      .bigTitle {
        margin-top: 120px;
      }
    }
  }
  header {
    .title {
      z-index: 3;
      height: 42px;

      .titleDv {
        width: 18px;
      }
    }
  }

  .body {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 71px 25px 0px;
    .bigTitle {
      max-width: 325px;
      width: 100%;
      font-weight: bold;
      color: #333333;
      line-height: 42px;
    }
    .codeBox {
      display: flex;
      // align-items: center;
      flex-direction: column;
      padding-top: 70px;
      .sms {
        font-weight: 400;
        color: #b8bfcc;
        line-height: 22px;
        span {
          color: #3dc17d;
        }
      }
      .codeNum {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 325px;
        margin-top: 14px;
        span {
          display: inline-block;
          text-align: center;
          font-size: 28px;
          // font-family: PingFangSC-Regular, PingFang SC;
          font-weight: bold;
          color: #000000;
          background: #f2f5fa;
          border-radius: 6px;
          height: 50px;
          width: 47.5px;
          line-height: 50px;
          // border: 1px solid #cccccc;
          position: relative;
          div {
            font-weight: normal;
            position: absolute;
            top: 45%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: twinkle 0.5s infinite alternate;
          }
          .end {
            transform: translate(90%, -50%);
          }
          @keyframes twinkle {
            0% {
              opacity: 0.8;
            }
            50% {
              opacity: 0.8;
            }
            51% {
              opacity: 0;
            }
            100% {
              opacity: 0;
            }
          }
        }
        input {
          border: 0;
          position: absolute;
          left: 0;
          background: rgba(255, 255, 255, 0);
          width: calc(100% - 40px);
          padding: 0px 15px 0px 25px;
          height: 100%;
          color: rgba(255, 255, 255, 0);
          caret-color: #000;
          // font-size: 28px;
          // letter-spacing: 52px;
          opacity: 0;
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      }
      .codeCount {
        font-weight: 500;
        color: #3dc17d;
        margin-top: 28px;
        line-height: 15px;
      }
      .grey {
        color: #b8bfcc;
      }
      .codeButton {
        margin-top: 60px;
        width: 326px;
        height: 53px;
        background: #3dc17d;
        border-radius: 5px;
        border: 0;
        font-weight: 400;
        color: #ffffff;
        line-height: 24px;
      }
    }
    .tipsText {
      margin-top: 80px;
      font-weight: 400;
      color: #666666;
      line-height: 22px;
      span {
        color: #3dc17d;
      }
    }
    .inputBox {
      box-sizing: border-box;
      max-width: 325px;
      height: 50px;
      background: #ffffff;
      border-radius: 5px;
      // border: 1px solid #cccccc;
      background: #f2f5fa;
      margin-top: 21px;
      display: flex;
      justify-content: space-between;
      input {
        width: 100%;
        border-radius: 5px;
        border: 0;
        padding: 0 15px;
        background: #f2f5fa;
      }
      #input::-webkit-input-placeholder {
        font-size: 16px;
        font-weight: 500;
        color: #999999;
      }
      #input:-moz-placeholder {
        font-size: 16px;
        font-weight: 500;
        color: #999999;
      }
      #input:-ms-input-placeholder {
        font-size: 16px;
        font-weight: 500;
        color: #999999;
      }
      button {
        min-width: 131px;
        width: 131px;
        border: 0;
        background: #f2f5fa;
        border-radius: 5px;
        font-weight: 400;
        color: #3dc17d;
        line-height: 22px;
      }
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 131px;
        width: 131px;
        border: 0;
        background: #f2f5fa;
        border-radius: 26px;
        font-weight: 400;
        color: #999;
        line-height: 22px;
      }
    }
    .submitBox {
      width: 100%;
      margin-top: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        width: 100%;
        max-width: 325px;
        height: 50px;
        background: #3dc17d;
        border-radius: 5px;
        border: 0;
        font-weight: 400;
        color: #ffffff;
        line-height: 24px;
      }
    }
  }
}
</style>
