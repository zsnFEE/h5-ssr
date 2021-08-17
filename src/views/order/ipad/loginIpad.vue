<template>
  <div class="loginPhone">
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
      <h1>登录后更精彩</h1>
      <div v-show="!flag">
        <van-field
          v-model="tel"
          type="tel"
          label="手机号"
          placeholder="请填写手机号"
        />
        <div class="getSms" @click="getsms">获取验证码</div>
      </div>
      <div class="sms font-style" v-show="flag">验证码已发送至{{ tel }}</div>
      <van-password-input
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
      />
      <div class="resSend font-style" v-show="count_flag">
        重新发送{{ count_time }}s
      </div>
      <div v-show="flag && !count_flag" @click="resSend">重新发送</div>
    </body>
  </div>
</template>
<script>
import { smsLogin, getLoginSms } from "../../../api/common";

import { Field, NumberKeyboard, PasswordInput } from "vant";

export default {
  watch: {
    sms(val, old) {
      if (val.length == 6) {
        //  登录
        smsLogin({
          phone: this.tel,
          code: val
        }).then(res => {
          if (res.code == 0) {
            this.$toast("登录成功");
            localStorage.setItem("access_token", res.data.access_token);
            localStorage.setItem("member", JSON.stringify(res.data.member));
            this.$router.push({
              path: "../ipad/Fillorder",
              query: {
                token: this.$route.query.token,
                Classtype: this.$route.query.Classtype
              }
            });
          } else {
            this.$toast(res.msg || res.message);
          }
        });
      }
    }
  },
  data() {
    return {
      timer: null,
      time: 60,
      sms: "",
      tel: "",
      flag: false,
      showKeyboard: false,
      count_flag: false,
      count_time: ""
    };
  },
  components: {
    [Field.name]: Field,
    [PasswordInput.name]: PasswordInput,
    [NumberKeyboard.name]: NumberKeyboard
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
    font-weight: 500;
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
    border-radius: 25px;
    background: #6551ea;
    box-shadow: 0px -1px 0px 0px rgba(255, 255, 255, 0.15);
  }
  body {
    padding: 50px 22.5px;
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
      padding: 15px;
      border-radius: 50px;
    }
    .van-field__control {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
    }
  }
}
</style>
