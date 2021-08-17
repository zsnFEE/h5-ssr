<template>
  <div class="Originalphone">
    <header>
      <Myheader @Faterback="toback" v-show="flag"> </Myheader>
      <div class="header_pc" v-show="!flag">
        <!-- 手机号 -->
      </div>
    </header>
    <body>
      <div>
        <div class="bind">输入验证码</div>
        <div class="sms font-style">验证码已发送至{{ tel }}</div>
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
        <div class="resSend font-style" v-if="count_flag">
          重新发送{{ count_time }}s
        </div>
        <div @click="resSend" class="resSend font-style cursor" v-else>
          重新发送
        </div>
      </div>
    </body>
  </div>
</template>
<script>
import Myheader from "../../components/header";
import { isMobile } from "../../common/util";

import { getLoginSms, checkPhone, resetPhone } from "../../api/common";
import { Field, NumberKeyboard, PasswordInput } from "vant";

export default {
  components: {
    Myheader,
    [Field.name]: Field,
    [PasswordInput.name]: PasswordInput,
    [NumberKeyboard.name]: NumberKeyboard
  },

  data() {
    return {
      flag: isMobile(),
      time: 60,
      sms: "",
      tel: "",
      showKeyboard: false,
      count_time: 60,
      count_flag: false
    };
  },
  created() {
    this.tel = localStorage.getItem("phone");
  },
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.toback();
    });
    this.countDown();
  },
  methods: {
    resSend() {
      //请求
      getLoginSms({ use: "reset_phone", phone: this.tel }).then(res => {
        if (res.code == 0) {
          this.countDown();
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    },
    toback() {
      this.$router.push({
        path: "/pc/Replacephone",
        query: {
          token: this.$route.query.token
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
      // console.log(key);
      this.sms = (this.sms + key).slice(0, 6);
      console.log(this.sms);
    },
    onDelete() {
      this.sms = this.sms.slice(0, this.sms.length - 1);
    },
    getsms() {
      if (!(this.tel && /^1[3456789]\d{9}$/.test(this.tel))) {
        this.$toast("手机号有误");
        return;
      } else {
      }
    }
  },
  watch: {
    sms() {
      if (this.sms && this.sms.length == 6) {
        resetPhone({
          phone: this.tel,
          code: this.sms
        }).then(res => {
          if (res.code == 0) {
            this.$toast("修改成功");
            this.toback();
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
.Originalphone {
  width: 100%;
  min-height: 100%;
  background: #ffffff;
  body {
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    padding: 72px 17% 15px;
  }
}
.bind {
  font-size: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #000000;
  margin-top: 2%;
  margin-bottom: 10%;
}
.phone {
  margin: auto;
  width: 320px;
  box-sizing: border-box;
}
.phone input {
  padding: 13.99px 24px 13.5px;
  background: #f2f5fa;
  border-radius: 25px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  width: 100%;
  border: 0;
  box-sizing: border-box;
}
.phone input::-webkit-input-placeholder {
  color: #b8bfcc;
}
.replace_btn {
  background: #6551ea;
  box-shadow: 0px -2px 0px 0px rgba(255, 255, 255, 0.15);
  border-radius: 25px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  padding: 12.5px 132.5px;
  text-align: center;
  width: 320px;
  box-sizing: border-box;
  margin: 2.9% auto 0;
}
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
</style>
