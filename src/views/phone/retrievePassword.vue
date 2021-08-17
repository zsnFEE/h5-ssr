<template>
  <div class="temp minHeight">
    <div class="header">
      <img @click="Back" src="../../assets/img/ic_back.png" class="" />
      <!-- <div @click="Back">
        <icon name="back" :w="17" :h="17"></icon>
      </div> -->
    </div>
    <div :class="isMobile ? 'body' : 'pcBody'">
      <div class="title ft30">
        找回密码
      </div>
      <div class="phoneBox" v-if="!codeFlag">
        <input
          v-model="tel"
          class="inputBox ft16"
          placeholder="请输入账号/手机号"
          @keyup.enter="getverification"
        />
        <button class="phoneButton ft18" @click="getverification">
          立即找回
        </button>
      </div>
      <div v-else class="codeBox">
        <div class="sms ft16">
          短信验证码已发送至<span>{{ tel }}</span>
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
          重新发送
        </div>
        <div v-else class="codeCount ft14">{{ count_time }}秒后重新发送</div>
        <button class="codeButton ft18" @click="toChangePassword">
          下一步
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Debounce, isMobile } from "../../common/util";
import { sendMessage } from "../../api/client";
import { sendOutCode, checkSms } from "../../api/common";

export default {
  data() {
    return {
      inputFocus: false,
      timer: null,
      tel: "",
      code: "",
      codeFlag: false,
      count_flage: false,
      count_time: "",
      isMobile: isMobile()
    };
  },
  watch: {
    tel(val) {
      val = val.replace(/[^0-9]/gi, "");
      this.tel = val.replace(/\D/g, "").replace(/^0{1,}/g, "");
    },
    code(val, old) {
      // if (!(this.code && /^\d{1,}$/.test(val))) {
      //   this.code = old;
      // }
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
    End(e) {
      let obj = e.srcElement;
      obj.focus();
      const len = obj.value.length;
      //光标定位要加上 setTimeOut，不然就会重新光标定位失败
      setTimeout(() => {
        obj.selectionStart = obj.selectionEnd = len;
      }, 60);
    },
    Back() {
      if (this.codeFlag) {
        this.codeFlag = false;
        clearInterval(this.timer);
        this.timer = null;
        this.code = "";
      } else {
        sendMessage({ signal: "retrievePasswordBack" });
        dsBridge.call("gonativelogin", "", function(v) {});
      }
    },
    toChangePassword: Debounce(function(e) {
      if (this.code.length < 6) {
        this.$toast("请输入完整验证码");
        return;
      }
      checkSms({ phone: this.tel, code: this.code }).then(res => {
        if (res.code == 0) {
          if (this.$route.query.check) {
            this.$router.push({
              path: "/phone/changePassword",
              query: { routeFlag: 0, token: res.data.token, check: 1 }
            });
          } else {
            this.$router.push({
              path: "/phone/changePassword",
              query: { routeFlag: 0, token: res.data.token }
            });
          }
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    }),
    getverification() {
      if (!(this.tel && /^1[3456789]\d{9}$/.test(this.tel))) {
        this.$toast("手机号有误");
        return;
      } else {
        this.codeFlag = true;
        this.getTrueCode();
        this.countDown();
      }
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
        phone: this.tel,
        use: "login"
      }).then(res => {});
    }
  }
};
</script>

<style lang="less" scoped>
.temp {
  .header {
    padding: 20px 21px;
    height: calc(71px - 44px);
    display: flex;
    align-items: center;
    position: fixed;
    top: 0px;
    left: 0;
    right: 0;
    z-index: 10;
    background: #ffffff;
    img {
      width: 18px;
      height: 18px;
    }
  }
  .body {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 25px;
    padding-top: 80px;
    .title {
      width: 100%;
      max-width: 325px;
      font-weight: bold;
      color: #333333;
      line-height: 41px;
      position: relative;
      z-index: 1;
      .blueLine {
        position: absolute;
        width: 97px;
        height: 7px;
        background: #0099ff;
        bottom: 0;
        z-index: 0;
      }
    }
    .phoneBox {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;

      .inputBox {
        margin-top: 30px;
        max-width: 325px;
        width: 100%;
        height: 50px;
        background: #ffffff;
        border-radius: 5px;
        border: 0;
        background: #f2f5fa;
        box-sizing: border-box;
        padding: 0 15px;
        font-weight: 400;
        color: #000;
      }
      input::-webkit-input-placeholder {
        font-size: 16px;
        // font-size: 4.2667vw;
        font-weight: 400;
        color: #999999;
      }
      .phoneButton {
        margin-top: 14px;
        /* width: 325px; */
        height: 50px;
        background: #3dc17d;
        border-radius: 5px;
        border: 0;
        font-weight: 400;
        color: #ffffff;
        line-height: 24px;
        max-width: 325px;
        width: 100%;
      }
    }
    .codeBox {
      display: flex;
      // align-items: center;
      flex-direction: column;
      padding-top: 20px;
      width: 100%;
      max-width: 325px;

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
      .codeButton {
        margin-top: 60px;
        width: 100%;
        max-width: 325px;
        height: 53px;
        background: #3dc17d;
        border-radius: 5px;
        border: 0;
        font-weight: 400;
        color: #ffffff;
        line-height: 24px;
      }
    }
  }
  .pcBody {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 45px;
    padding-top: 80px;
    .title {
      font-size: 24px;
      width: 100%;
      max-width: 325px;
      font-weight: bold;
      color: #333333;
      line-height: 41px;
      position: relative;
      z-index: 1;
      .blueLine {
        position: absolute;
        width: 97px;
        height: 7px;
        background: #0099ff;
        bottom: 0;
        z-index: 0;
      }
    }
    .phoneBox {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;

      .inputBox {
        margin-top: 30px;
        max-width: 325px;
        width: 100%;
        height: 40px;
        background: #ffffff;
        border-radius: 5px;
        border: 0;
        background: #f2f5fa;
        box-sizing: border-box;
        padding: 0 10px;
        font-weight: 400;
        color: #000;
        font-size: 12px;
      }
      input::-webkit-input-placeholder {
        font-size: 12px;
        // font-size: 4.2667vw;
        font-weight: 400;
        color: #999999;
      }
      .phoneButton {
        font-size: 14px;
        margin-top: 14px;
        /* width: 325px; */
        height: 40px;
        background: #3dc17d;
        border-radius: 5px;
        border: 0;
        font-weight: 400;
        color: #ffffff;
        line-height: 24px;
        max-width: 325px;
        width: 100%;
      }
    }
    .codeBox {
      display: flex;
      // align-items: center;
      flex-direction: column;
      padding-top: 30px;
      width: 100%;
      max-width: 325px;

      .sms {
        font-size: 14px;
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
        // width: 325px;
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
          height: 40px;
          width: 36px;
          line-height: 40px;
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
        font-size: 12px;
        font-weight: 500;
        color: #3dc17d;
        margin-top: 20px;
        line-height: 15px;
      }
      .codeButton {
        font-size: 14px;
        margin-top: 30px;
        width: 100%;
        max-width: 325px;
        height: 40px;
        background: #3dc17d;
        border-radius: 5px;
        border: 0;
        font-weight: 400;
        color: #ffffff;
        line-height: 24px;
      }
    }
  }

  // .paddingTop {
  //   padding-top: 0px;
  // }
}
</style>
