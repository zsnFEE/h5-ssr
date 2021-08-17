<template>
  <div class="withdraw">
    <header>
      <Myheader @Faterback="toback" v-show="flag">
        <div>提现</div>
      </Myheader>
      <div class="header_pc" v-show="!flag">
        提现
      </div>
    </header>
    <body>
      <div class="box">
        <div class="box_top">
          <div class="sum">提现金额</div>
          <div class="rule" @click="toRule">
            <div>查看提现规则</div>
            <img src="../../assets/img/btn_arrow.png" />
          </div>
        </div>
        <div class="input">
          <div class="symbol">￥</div>
          <input type="number" v-model="money" />
        </div>
        <div class="alert" v-if="maxFlag">
          单笔提现最高金额为 ¥{{ maxMoney }}.00
        </div>
        <div class="input_bottom" v-else>
          可提现金额为 ¥{{ have }}，<span @click="all">全部提现</span>
        </div>
        <div :class="money ? 'btn_ok' : 'btn'" @click="withdraw">提现</div>
      </div>
    </body>
  </div>
</template>
<script>
import Myheader from "../../components/header";
import { postApiWidthdraw } from "../../api/common";
import { isMobile } from "../../common/util";

export default {
  components: {
    Myheader
  },
  data() {
    return {
      money: "",
      have: this.$route.query.last_amount,
      maxMoney: 200,
      maxFlag: false,
      flag: isMobile()
    };
  },
  created() {},
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.toback();
    });
  },
  methods: {
    toback() {
      // console.log(this.$route.query.home);
      this.$router.push({
        path: "/pc/Earnings",
        query: { token: this.$route.query.token, home: this.$route.query.home }
      });
    },
    // 去规则页面
    toRule() {
      this.$router.push({
        path: "/pc/Rule",
        query: { token: this.$route.query.token, withdraw: 2 }
      });
    },
    // 全部提现
    all() {
      this.money = this.have;
    },
    // 提现
    withdraw() {
      if (this.money) {
        if (this.money >= 1 && 200 >= this.money) {
          if (this.have >= this.money) {
            postApiWidthdraw({ amount: this.money }).then(res => {
              // console.log(res);
              if (res.code == 0) {
                // this.have = res.data.wealth;
                this.$toast("您已提现成功");
                this.money = "";
                this.toback();
              } else {
                this.$toast(res.msg || res.message);
              }
            });
          } else {
            this.$toast("余额不足");
          }
        } else {
          this.$toast("单笔提现金额在1-200之间");
        }
      } else {
        this.$toast("请输入提现金额");
      }
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
  }
};
</script>
<style lang="less" scoped>
.withdraw {
  width: 100%;
  min-height: 100%;
  background: #f0f4fb;
  body {
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    padding: 72px 9% 15px;
  }
}
.box {
  background: #ffffff;
  border-radius: 6px;
  padding: 20px 20px 23px;
}
.box_top {
  display: flex;
  justify-content: space-between;
  color: #828a99;
  .sum {
    font-family: PingFangSC-Medium, PingFang SC;
    font-size: 14px;
    font-weight: 500;
  }
  .rule {
    font-family: PingFangSC-Regular, PingFang SC;
    font-size: 12px;
    display: flex;
    align-items: center;
    font-weight: 400;
    img {
      width: 6px;
      height: 11px;
      margin-left: 7.5px;
    }
  }
}
.input {
  margin-top: 24px;
  border-bottom: 0.5px solid #d8d8d8;
  padding-bottom: 12px;
  display: flex;
  align-items: center;
  .symbol {
    color: #333333;
    font-size: 30px;
    font-weight: 600;
    margin-right: 12px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }

  input {
    border: 0;
    width: 90%;
    font-size: 40px;
    font-weight: 600;
  }
}
.input_bottom {
  font-family: PingFangSC-Medium, PingFang SC;
  margin-top: 21px;
  color: #828a99;
  font-size: 12px;
  font-weight: 500;
  span {
    font-family: PingFangSC-Semibold, PingFang SC;
    color: #24ad93;
  }
}
.alert {
  font-family: PingFangSC-Medium, PingFang SC;
  margin-top: 21px;
  color: #ff5533;
  font-size: 12px;
  font-weight: 500;
}
.btn {
  margin-top: 21px;
  background: linear-gradient(135deg, #d7deeb 0%, #c4ccda 100%);
  border-radius: 5px;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
  padding: 7.5px 134.5px;
  text-align: center;
}
.btn_ok {
  margin-top: 21px;
  border-radius: 5px;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
  padding: 7.5px 134.5px;
  text-align: center;
  background: linear-gradient(129deg, #ff7300 0%, #ff5500 100%);
}
</style>
