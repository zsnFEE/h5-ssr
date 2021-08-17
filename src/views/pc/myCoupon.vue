<template>
  <div class="temp">
    <div class="backgroundColor"></div>
    <header>
      <!-- <div class="title title_box">
        <img
          @click="toBack"
          src="../../assets/img/ic_back.png"
          class="titleArrow title_arrow"
        />
        <div class="titleText title_text">优惠券</div>
        <div class="titleDv "></div>
      </div> -->
      <div class="new_header" v-show="flag">
        <div class="back" @click="toBack">
          <img src="../../assets/img/ic_back.png" />
        </div>
        <div class="new_font">优惠券</div>
        <div class="coin cursor" @click="toCoin">兑换优惠券</div>
      </div>
      <div class="header_blockpc" v-show="!flag">
        <div>优惠券</div>
        <div class="coinpc cursor" @click="toCoin">兑换优惠券</div>
      </div>

      <div class="choiceTitle ft16" :class="flag ? 'ipadchoiceTitle' : ''">
        <div class="titbox">
          <div
            v-for="(item, index) in titleList"
            :key="index"
            class="choiceBox cursor"
            :class="choiceIndex == index ? 'active' : ''"
            @click="switchTitle(index)"
          >
            <span>{{ item.name }}</span>
            <div class="choiceIcon" v-show="choiceIndex == index"></div>
          </div>
        </div>
      </div>
    </header>
    <body :class="flag ? 'ipadbody' : ''">
      <div class="listBox">
        <div class="empty ft14" v-if="lessonList.length == 0">
          <img
            style="width:264px;height:264px;"
            src="../../assets/img/img-coupon@2x.png"
          />
          <div class="imgPosition">还没有优惠券哦</div>
        </div>
        <div class="existence" v-else>
          <Coupon
            v-if="lessonList"
            :list="lessonList"
            :page="1"
            :color="2"
            :minusid="0"
          ></Coupon>
        </div>
      </div>
    </body>
    <transition name="alert_box">
      <div class="coutoast" v-show="showalert == true" @touchmove.stop.prevent>
        <div class="coutoast_box">
          <div class="alert">
            <div class="text_title">兑换优惠券</div>
            <!-- 输入框和按钮开始 -->
            <div class="input_btn">
              <div class="input">
                <input
                  type="text"
                  v-model="exchange"
                  placeholder="请输入兑换码"
                />
              </div>
              <div
                class="getSms cursor"
                :class="exchange == '' ? 'getsmscative' : 'getsmsselect'"
                @click="exchangeok"
              >
                兑换
              </div>
            </div>
            <!-- 输入框和按钮结束 -->
            <div class="delimg">
              <img
                src="../../assets/img/btn-home-close.png"
                class="cursor"
                @click.stop="delimg"
              />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Coupon from "../../components/coupon";
import { isMobile } from "../../common/util";
import {
  getCouponList,
  getUserCouponList,
  setExchangeCoupon
} from "../../api/common";
export default {
  components: {
    Coupon
  },
  data() {
    return {
      lessonList: [],
      titleList: [
        { name: "可领取" },
        { name: "未使用" },
        { name: "已使用" },
        { name: "已过期" }
      ],
      choiceIndex: 0,
      flag: isMobile(),
      exchange: "",
      showalert: false
    };
  },
  watch: {
    exchange(val, old) {
      val = val.replace(/[\W]/g, "");
      this.exchange = val;
    }
  },
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    let that = this;
    dsBridge.registerAsyn("goback", function(arg1, arg2, arg3) {
      that.toBack();
    });
    getCouponList().then(res => {
      if (res.code == 0) {
        this.lessonList = res.data.grant_type_manual;
        for (let i = 0; i < this.lessonList.length; i++) {
          this.$set(this.lessonList[i], "explainFlag", false);
        }
        // res.data.grant_type_manual.map(item => {
        //   item.explainFlag = false;
        // });
      } else {
        this.$toast(res.msg || res.message);
      }
    });
  },
  methods: {
    delimg() {
      this.showalert = !this.showalert;
      this.exchange = "";
    },
    exchangeok() {
      if (this.exchange) {
        setExchangeCoupon({ exchange: this.exchange }).then(res => {
          if (res.code == 0) {
            this.$toast("兑换成功");
            this.exchange = "";
            this.showalert = !this.showalert;

            this.switchTitle(this.choiceIndex);
          } else {
            this.$toast(res.msg);
          }
        });
      } else {
        this.$toast("请输入兑换码");
      }
    },

    toCoin() {
      // this.$router.push({
      //   path: "/pc/Coin",
      //   query: { token: this.$route.query.token }
      // });
      this.showalert = !this.showalert;
    },

    switchTitle(index) {
      if (this.choiceIndex != index) {
        this.choiceIndex = index;
        // 如果index==0调用可领取的接口获取可领取优惠券列表
        if (index == 0) {
          getCouponList().then(res => {
            if (res.code == 0) {
              this.lessonList = res.data.grant_type_manual;
              // for (let i = 0; i < this.lessonList.length; i++) {
              //   this.$set(this.lessonList[i], "explainFlag", false);
              // }
              this.lessonList.map((item, i) => {
                // item.explainFlag = false;
                this.$set(this.lessonList[i], "explainFlag", false);
              });
            } else {
              this.$toast(res.msg || res.message);
            }
          });
          // 如果index!=0调用未使用,已使用,已过期的接口获取优惠券列表
        } else {
          getUserCouponList({ use_status: index }).then(res => {
            if (res.code == 0) {
              this.lessonList = res.data;
              // for (let i = 0; i < this.lessonList.length; i++) {
              //   this.$set(this.lessonList[i], "explainFlag", false);
              // }
              this.lessonList.map((item, i) => {
                // item.explainFlag = false;
                this.$set(this.lessonList[i], "explainFlag", false);
              });
            } else {
              this.$toast(res.msg || res.message);
            }
          });
        }
      }
    },
    toBack() {
      this.$router.push({
        path: "/pc/Me",
        query: { token: this.$route.query.token }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.new_header {
  width: 100%;
  padding: 18px 20px 8px 21px;
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
  padding: 11px 20px;
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

.temp {
  width: 100%;
  height: 100%;
  .title {
    .titleDv {
      width: 18px;
    }
  }
  .titbox {
    width: 450px;
    display: flex;
    justify-content: space-between;
    margin: auto;
  }
  .ipadchoiceTitle {
    top: 52px !important;
  }
  .choiceTitle {
    left: 0;
    right: 0;
    position: fixed;
    top: 42px;
    height: 36px;
    background: #ffffff;
    padding: 6px 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    z-index: 9;
    .choiceBox {
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #828a99;
      line-height: 22.5px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .choiceIcon {
        margin-top: 5.5px;
        width: 40px;
        height: 5px;
        background: #ff6b4d;
        border-radius: 14px;
      }
    }
    .choiceBox.active {
      color: #292d33;
      font-weight: 600;
    }
  }
  .ipadbody {
    padding-top: 94px !important;

    min-height: calc(100% - 94px) !important;
  }
  body {
    padding-top: 84px;
    width: 100%;
    min-height: calc(100% - 84px);

    .listBox {
      .existence {
        width: 451px;
        margin: 20px auto;
      }
      .empty {
        // margin-top: 26%;
        // text-align: center;
        // font-family: PingFangSC-Medium, PingFang SC;
        // font-weight: 500;
        // color: #828a99;
        // line-height: 20px;
        position: absolute;
        left: 50%;
        top: 55%;
        transform: translate(-50%, -50%);
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        color: #666666;
      }
    }
  }
}
.coin {
  font-size: 14px;
  // font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #292d33;
}
.coinpc {
  font-size: 14px;
  // font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #292d33;
  position: absolute;
  right: 20px;

  bottom: 11px;
}
.coutoast {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  z-index: 9;
  font-size: 16px;
  .coutoast_box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .alert {
    width: 278px;
    height: 179px;

    background: #fff;
    border-radius: 12px;
    top: 50%;
    left: 50%;
    animation: mymove 0.3s;
    padding: 0px 0px 15px;
    box-sizing: border-box;
    // margin-bottom: 36vh;
    .text_title {
      font-size: 20px;
      line-height: 1;
      // font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(41, 45, 51, 1);
      text-align: center;
      padding: 11px 0px 10.5px;
      border-bottom: 0.5px solid rgba(242, 245, 250, 1);
      box-sizing: border-box;
    }
  }
}
.alert_box-enter-active,
.alert_box-leave-active {
  transition: opacity 0.5s;
}
.alert_box-enter,
.alert_box-leave-to {
  opacity: 0;
}

@keyframes mymove {
  0% {
    transform: scale(0); /*开始为原始大小*/
  }
  100% {
    transform: scale(1);
  }
}
.input_btn {
  padding: 0px 15px;
}
.input {
  margin-top: 14px;
  margin-bottom: 14px;

  input {
    width: 100%;
    border: 0;
    background: #f2f5fa;
    border-radius: 4px;
    padding: 11.5px 23.5px 11px;
    font-size: 16px;
    box-sizing: border-box;
  }
  ::-webkit-input-placeholder {
    color: rgba(184, 191, 204, 1);
  }
}
.getsmscative {
  background: rgba(61, 193, 125, 0.6);
}
.getsmsselect {
  background: rgba(61, 193, 125, 1);
  box-shadow: rgba(61, 193, 125, 1) 0 5px 10px -5px;
}
.getSms {
  height: 45px;
  font-size: 16px;
  line-height: 45px;
  // font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
  border-radius: 4px;

  box-shadow: 0px -1px 0px 0px rgba(255, 255, 255, 0.15);
}
.delimg img {
  width: 32px;
  height: 32px;
  position: relative;
  bottom: 200px;
  left: 280px;
}
</style>
