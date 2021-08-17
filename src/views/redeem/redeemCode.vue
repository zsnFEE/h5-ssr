<template>
  <div class="coin" v-title data-title="兑换优惠券">
    <body>
      <h1>兑换优惠券</h1>
      <van-field
        v-model="exchange"
        label="兑换码"
        placeholder="请输入兑换码"
        maxlength="20"
      />

      <div class="getSms cursor" @click="exchangeok">兑换</div>
    </body>
  </div>
</template>
<script>
import { isMobile } from "../../common/util";
import { Field } from "vant";
import { setExchangeCoupon, apiInfo } from "../../api/common";
export default {
  components: {
    [Field.name]: Field
  },
  data() {
    return {
      flag: isMobile(),
      exchange: ""
    };
  },

  mounted() {
    apiInfo().then(res => {});
  },
  watch: {
    exchange() {
      this.exchange = this.exchange.replace(/[\W]/g, "");
    }
  },
  methods: {
    exchangeok() {
      if (this.exchange) {
        setExchangeCoupon({ exchange: this.exchange }).then(res => {
          // console.log(res);
          if (res.code == 0) {
            this.$toast("兑换成功");
            // if (document.documentElement.clientWidth >= 768) {
            //   this.$router.push({
            //     path: "/redeemcode/pc/myCoupon",
            //     query: { token: this.$route.query.token, defaultPage: 1 }
            //   });
            // } else {
            //   this.$router.push({
            //     path: "/redeemcode/phone/myCouponPhone",
            //     query: { token: this.$route.query.token, defaultPage: 1 }
            //   });
            // }
          } else {
            this.$toast(res.msg);
          }
        });
      } else {
        this.$toast("请输入兑换码");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.new_header {
  width: 100%;
  padding: 8px 20px 8px 21px;
  background: #fff;
  display: flex;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  z-index: 9;
  align-items: center;
}
.header_blockpc {
  position: fixed;
  z-index: 9;
  width: 100%;
  padding: 11px 40px;
  background: #fff;
  box-sizing: border-box;
  font-size: 21px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
}
.back {
  width: 20px;
  height: 20px;
}
.back img {
  width: 100%;
  height: 100%;
}
.new_font {
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #292d33;
  text-align: center;
  margin: auto;
  font-weight: 500;
}

.coin {
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
    box-shadow: rgba(61, 193, 125, 1) 0 5px 10px -5px;
  }
  body {
    padding: 50px calc(calc(100vw - 330px) / 2);
    // padding-top: 180px;
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
h1 {
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #000000;
  margin: 0;
  margin-bottom: 75px;
}
</style>
