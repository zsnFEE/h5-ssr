<template>
  <div class="loginPhone">
    <Header
      :title="
        `${show ? (flag == 0 ? '输入原手机号' : '输入新手机号') : '手机号'}`
      "
      @toBack="toBack"
    >
    </Header>

    <body v-if="show">
      <div v-show="flag == 0">
        <!-- <h1 class="ft32">输入原手机号</h1> -->
        <div v-show="!flag">
          <van-field
            maxlength="11"
            v-model="oldTel"
            type="tel"
            label="手机号"
            placeholder="请填写手机号"
          />
          <div class="getSms ft18" @click="inputOldPhone">下一步</div>
        </div>
      </div>
      <div v-show="flag == 1">
        <!-- <h1 class="ft32">输入新手机号</h1> -->
        <div>
          <van-field
            maxlength="11"
            v-model="tel"
            type="tel"
            label="手机号"
            placeholder="请填写手机号"
          />
          <div class="getSms ft18" @click="getsms">下一步</div>
        </div>
      </div>
      <div v-show="flag == 2">
        <h1 class="ft32">输入验证码</h1>
        <div class="sms font-style ft16">验证码已发送至{{ tel }}</div>
        <van-password-input
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
        <div class="resSend font-style ft16" v-show="count_flag">
          重新发送{{ count_time }}s
        </div>
        <div
          v-show="flag && !count_flag"
          @click="resSend"
          class="resSend font-style ft16"
        >
          重新发送
        </div>
      </div>
    </body>
    <body v-else>
      <div class="bindingBox">
        <div class="bindingTitle ft14">绑定手机号</div>
        <div class="bindingPhone ft30">
          {{ phone.substr(0, 3) + "****" + phone.substr(7, 4) }}
        </div>
        <button class="bindingButton ft18" @click="bindingShow">
          更换手机号码
        </button>
      </div>
    </body>
  </div>
</template>
<script>
import { getLoginSms, checkPhone, resetPhone } from "../../api/common";

import { Field, NumberKeyboard, PasswordInput } from "vant";

export default {
  watch: {
    sms(val, old) {
      if (val.length == 6) {
        resetPhone({ phone: this.tel, code: val }).then(res => {
          if (res.code == 0) {
            this.$toast("修改成功");
            this.phone = this.tel;
            this.toBack();
          } else {
            this.$toast(res.msg || res.message);
          }
        });
        // //  登录
        // smsLogin({
        //   phone: this.tel,
        //   code: val
        // }).then(res => {
        //   if (res.code == 0) {
        //     this.$toast("登录成功");
        //     localStorage.setItem("access_token", res.data.access_token);
        //     localStorage.setItem("member", JSON.stringify(res.data.member));
        //     if (localStorage.fromRouterPath == "/phone/invitationPhone") {
        //       this.$router.go(-1);
        //     } else {
        //       this.$router.go(-1);
        //       // this.$router.push({
        //       //   path: "/selectCourseType"
        //       // });
        //     }
        //   } else {
        //     this.$toast(res.msg||res.message);
        //   }
        // });
      }
    }
  },
  data() {
    return {
      fromURL: "",
      timer: null,
      time: 60,
      sms: "",
      tel: "",
      oldTel: "",
      flag: 0,
      showKeyboard: false,
      count_flag: false,
      count_time: "",
      show: false,
      phone: this.$route.query.phone
    };
  },
  components: {
    [Field.name]: Field,
    [PasswordInput.name]: PasswordInput,
    [NumberKeyboard.name]: NumberKeyboard
  },
  mounted() {
    let that = this;
    dsBridge.registerAsyn("goback", function(arg1, arg2, arg3) {
      that.toBack();
    });
  },
  methods: {
    inputOldPhone() {
      if (!(this.oldTel && /^1[3456789]\d{9}$/.test(this.oldTel))) {
        this.$toast("手机号有误");
        return;
      } else {
        checkPhone({ phone: this.oldTel }).then(res => {
          if (res.code == 0) {
            this.flag = 1;
            this.$toast("验证成功");
          } else {
            this.$toast(res.msg || res.message);
          }
        });
      }
    },
    bindingShow() {
      this.show = true;
    },
    toBack() {
      if (this.show) {
        this.show = false;
        this.flag = 0;
        this.sms = "";
        this.tel = "";
        this.oldTel = "";
      } else {
        this.$router.push({
          path: "/phone/settingPhone",
          query: { token: this.$route.query.token }
        });
      }
    },
    resSend() {
      //请求
      getLoginSms({ use: "reset_phone", phone: this.tel }).then(res => {
        if (res.code == 0) {
          this.flag = 2;
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
        getLoginSms({ use: "reset_phone", phone: this.tel }).then(res => {
          if (res.code == 0) {
            this.flag = 2;
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
::v-deep .van-cell__value {
  margin-top: 140px;
}
.loginPhone {
  header {
    .title {
      .titleDv {
        width: 18px;
      }
    }
  }

  h1 {
    // font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #000000;
    margin: 0;
    margin-bottom: 75px;
  }
  .getSms {
    height: 50px;
    // font-size: 18px;
    line-height: 50px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
    border-radius: 5px;
    background: rgba(61, 193, 125, 1);
    box-shadow: #3dc17d 0 7px 15px -5px;
  }
  body {
    .bindingBox {
      width: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      .bindingTitle {
        margin-top: 75px;
        // font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #292d33;
        line-height: 20px;
      }
      .bindingPhone {
        margin-top: 10px;
        // font-size: 30px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        line-height: 42px;
      }
      .bindingButton {
        margin-top: 69px;
        // font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #8a8f99;
        height: 50px;
        border-radius: 25px;
        width: calc(100% - 130px);
        background: rgba(255, 255, 255, 0);
        border: 1.5px solid #8a8f99;
      }
    }
    padding: 50px 22.5px;
    .sms {
      margin-bottom: 14px;
    }
    .font-style {
      // font-size: 16px;
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
      // font-size: 28px;
      font-size: 7.4667vw;
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
      border-radius: 5px;
    }
    .van-field__control {
      // font-size: 16px;
      font-size: 4.2667vw;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
    }
  }
}
</style>
