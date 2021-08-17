<template>
  <div class="loginPhone" v-title data-title="登录">
    <!-- <header>
      <div class="title title_box">
        <img
          @click="toBack"
          src="../../assets/img/ic_back.png"
          class="titleArrow title_arrow"
        />
        <div class="titleDv "></div>
      </div>
    </header> -->
    <body>
      <h1>欢迎登录</h1>
      <div v-show="!flag">
        <van-field
          v-model="tel"
          type="tel"
          label="手机号"
          placeholder="请填写手机号"
          maxlength="11"
        />
        <div class="getSms cursor" @click="getsms">获取验证码</div>
      </div>
      <div class="sms font-style" v-show="flag">验证码已发送至{{ tel }}</div>

      <div class="codeNum" v-show="flag">
        <span>{{ code[0] }}</span>
        <span>{{ code[1] }}</span>
        <span>{{ code[2] }}</span>
        <span>{{ code[3] }}</span>
        <span>{{ code[4] }}</span>
        <span>{{ code[5] }}</span>
        <input type="number" maxlength="6" v-model="code" />
      </div>

      <!-- <van-password-input
        v-show="flag"
        :value="sms"
        :focused="showKeyboard"
        :mask="false"
        @focus="showKeyboard = true"
      />
      <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false"
      /> -->
      <div class="resSend font-style" v-show="count_flag">
        重新发送{{ count_time }}s
      </div>
      <div
        v-show="flag && !count_flag"
        class="resSend font-style cursor"
        @click="resSend"
      >
        重新发送
      </div>
    </body>
  </div>
</template>
<script>
import { smsLogin, getLoginSms } from "../../api/common";
import { isMobile } from "../../common/util";
import { Field, NumberKeyboard, PasswordInput } from "vant";

export default {
  components: {
    [Field.name]: Field,
    [PasswordInput.name]: PasswordInput,
    [NumberKeyboard.name]: NumberKeyboard
  },
  data() {
    return {
      fromURL: "",
      timer: null,
      time: 60,
      sms: "",
      tel: "",
      flag: false,
      showKeyboard: false,
      count_flag: false,
      count_time: "",
      code: ""
    };
  },

  mounted() {},
  watch: {
    code(val, old) {
      if (old.length > val.length) {
        this.code = old.substr(0, old.length - 1);
      }
      if (val.length > 6) {
        this.code = val.substr(0, 6);
      }
      if (val.length == 6) {
        //  登录
        smsLogin({
          phone: this.tel,
          code: val,
          gid: this.$route.query.gid ? this.$route.query.gid : ""
        }).then(res => {
          if (res.code == 0) {
            this.$toast("登录成功");
            localStorage.setItem("access_token", res.data.access_token);
            localStorage.setItem("member", JSON.stringify(res.data.member));
            if (localStorage.fromRouterPath == "/") {
              if (isMobile()) {
                this.$router.go(-1);
                // this.$router.push({
                //   path: "/phone/findPhone"
                // });
              } else {
                this.$router.go(-1);
              }
            } else {
              this.$router.go(-1);
              // this.$router.push({
              //   path: "/selectCourseType"
              // });
            }
          } else {
            this.$toast(res.msg || res.message);
          }
        });
      }
    }
  },
  methods: {
    toBack() {},
    resSend() {
      //请求
      getLoginSms({ use: "login", phone: this.tel }).then(res => {
        if (res.code == 0) {
          this.flag = true;
          this.countDown();
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    },
    countDown() {
      var TIME_COUNT = 60;
      if (!this.timer) {
        this.count_time = TIME_COUNT;
        this.count_flag = true;
        this.timer = setInterval(() => {
          if (this.count_time > 0 || this.count < TIME_COUNT + 1) {
            this.count_time--;
          } else {
            clearInterval(this.timer);
            this.timer = null;
            this.count_flag = false;
          }
        }, 1000);
      }
    },
    onInput(key) {
      this.sms = (this.sms + key).slice(0, 6);
    },
    onDelete() {
      this.sms = this.sms.slice(0, this.sms.length - 1);
    },
    getsms() {
      if (!(this.tel && /^1[3456789]\d{9}$/.test(this.tel))) {
        this.$toast("手机号有误");
        return;
      } else {
        getLoginSms({ use: "login", phone: this.tel }).then(res => {
          if (res.code == 0) {
            this.flag = true;
            this.countDown();
          } else {
            this.$toast(res.msg || res.message);
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.loginPhone {
  header {
    .title {
      .titleDv {
        width: 18px;
      }
    }
  }

  h1 {
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #000000;
    margin: 0;
    margin-bottom: 75px;
  }
  .getSms {
    height: 50px;
    font-size: 18px;
    line-height: 50px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
    border-radius: 5px;
    background: rgba(61, 193, 125, 1);
    box-shadow: 0px -1px 0px 0px rgba(255, 255, 255, 0.15);
  }
  body {
    padding: 50px calc(calc(100vw - 330px) / 2);

    .sms {
      margin-bottom: 14px;
    }
    .font-style {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #b8bfcc;
    }
    .resSend {
      margin-top: 28px;
    }
  }

  input.van-field__control {
    &::-webkit-input-placeholder {
      color: #b8bfcc;
    }
    &::-moz-placeholder {
      color: #b8bfcc;
    }
    &:-moz-placeholder {
      color: #b8bfcc;
    }
    &:-ms-input-placeholder {
      color: #b8bfcc;
    }
  }
  .van-password-input__cursor {
    background-color: #ff7300;
  }
  /deep/ .van-cell {
    padding: 0;
    margin-bottom: 24px;
  }
  /deep/ .van-password-input {
    margin: 0;
    .van-hairline--left::after {
      border: none;
    }
    .van-hairline--surround::after {
      border: none;
    }
    .van-password-input__security {
      justify-content: space-between;
    }
    .van-password-input__security li {
      font-size: 28px;
      font-family: DINAlternate-Bold, DINAlternate;
      font-weight: bold;
      color: #000000;
      background: #f2f5fa;
      border-radius: 12px;
      height: 50px;
      width: 50px;
      flex: unset;
    }
  }
  /deep/ .van-field {
    .van-field__label {
      display: none;
    }
    .van-field__value {
      background: #f2f5fa;
      padding: 15px 25px;
      border-radius: 5px;
    }
    .van-field__control {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
    }
  }
}
.codeNum {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    display: inline-block;
    text-align: center;
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: bold;
    color: #000000;
    background: #f2f5fa;
    border-radius: 12px;
    height: 50px;
    width: 50px;
    line-height: 50px;
  }
  input {
    border: 0;
    position: absolute;
    left: 0;
    background: rgba(255, 255, 255, 0);
    width: 100%;
    height: 100%;
    color: rgba(255, 255, 255, 0);
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
</style>
