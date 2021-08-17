<template>
  <div class="temp">
    <div class="backgroundColor"></div>
    <Header :title="'优惠券'" @toBack="toBack">
      <div class="titleDv ft14" @click="toRedeem">
        兑换优惠券
      </div>
    </Header>

    <header>
      <!-- <div class="title title_box">
        <img
          @click="toBack"
          src="../../assets/img/ic_back.png"
          class="titleArrow title_arrow"
        />
        <div class="titleText title_text">优惠券</div>
        <div class="titleDv ft14" @click="toRedeem">
          兑换优惠券
        </div>
      </div> -->
      <div class="choiceTitle ft16">
        <div
          v-for="(item, index) in titleList"
          :key="index"
          class="choiceBox"
          :class="choiceIndex == index ? 'active' : ''"
          @click="switchTitle(index)"
        >
          <span>{{ item.name }}</span>
          <div class="choiceIcon" v-show="choiceIndex == index"></div>
        </div>
      </div>
    </header>
    <body>
      <div class="listBox">
        <div class="empty ft14 " v-if="lessonList.length == 0">
          <img
            style="width:264px;height:264px;"
            src="../../assets/img/img-coupon@2x.png"
          />
          <div class="imgPosition">还没有优惠券哦</div>
        </div>
        <div class="existence" v-else>
          <Card
            v-if="lessonList"
            :list="lessonList"
            :page="1"
            :color="2"
            :minusid="0"
          ></Card>
        </div>
      </div>
    </body>

    <div class="maskBox" v-if="maskShow" @touchmove.prevent>
      <img src="../../assets/img/btn-home-close.png" alt="" @click="closePop" />
      <transition name="alert_box">
        <div class="popBox">
          <div class="popTitle ft20">兑换优惠券</div>
          <input
            type="text"
            placeholder="请输入兑换码"
            v-model="exchangeCode"
          />
          <button
            class="18px"
            :class="this.exchangeCode == '' ? '' : 'active'"
            @click="exchange"
          >
            兑换
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Card from "../../components/coupon";
import {
  getCouponList,
  getUserCouponList,
  setUserCoupon,
  setExchangeCoupon
} from "../../api/common";

export default {
  components: {
    Card
  },
  data() {
    return {
      maskShow: false,
      exchangeCode: "",
      lessonList: [],
      titleList: [
        { name: "可领取" },
        { name: "未使用" },
        { name: "已使用" },
        { name: "已过期" }
      ],
      choiceIndex: 0
    };
  },
  watch: {
    exchangeCode(val, old) {
      val = val.replace(/[\W]/g, "");
      this.exchangeCode = val;
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
      } else {
        this.$toast(res.msg || res.message);
      }
    });
  },
  methods: {
    toRedeem() {
      this.maskShow = true;
    },
    closePop() {
      this.maskShow = false;
      this.exchangeCode = "";
    },
    exchange() {
      if (this.exchangeCode == "") {
      } else {
        setExchangeCoupon({ exchange: this.exchangeCode }).then(res => {
          if (res.code == 0) {
            this.$toast("兑换成功");
            this.exchangeCode = "";
            this.maskShow = false;
            this.switchTitle(this.choiceIndex);
          } else {
            this.$toast(res.msg || res.message);
          }
        });
      }
    },
    switchTitle(index) {
      if (this.choiceIndex != index) {
        this.choiceIndex = index;
        if (index == 0) {
          getCouponList().then(res => {
            if (res.code == 0) {
              this.lessonList = res.data.grant_type_manual;
              for (let i = 0; i < this.lessonList.length; i++) {
                this.$set(this.lessonList[i], "explainFlag", false);
              }
            } else {
              this.$toast(res.msg || res.message);
            }
          });
        } else {
          getUserCouponList({ use_status: index }).then(res => {
            if (res.code == 0) {
              this.lessonList = res.data;
              for (let i = 0; i < this.lessonList.length; i++) {
                this.$set(this.lessonList[i], "explainFlag", false);
              }
            } else {
              this.$toast(res.msg || res.message);
            }
          });
        }
      }
    },
    toBack() {
      this.$router.push({
        path: "/phone/myInfoPhone",
        query: { token: this.$route.query.token }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.temp {
  width: 100%;
  height: 100%;
  .title {
    .titleArrow {
      margin-right: 52px;
    }
    .titleDv {
      line-height: 42px;
      width: 70px;
      font-size: 14px;
      font-weight: bold;
      color: #292d33;
    }
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
      font-weight: 600;
      color: #292d33;
    }
  }
  body {
    padding-top: 84px;
    width: 100%;
    min-height: calc(100% - 84px);
    .listBox {
      padding: 20px;

      .empty {
        // margin-top: 66%;
        // text-align: center;
        // font-family: PingFangSC-Medium, PingFang SC;
        // font-weight: 500;
        // color: #828a99;
        // line-height: 20px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        color: #666666;
      }
    }
  }
  .maskBox {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.5);
    padding: 0 27px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;
    .popBox {
      margin-bottom: 36vh;

      animation: mymove 0.3s;
      padding: 11px 15px 35px;
      width: calc(100% - 30px);
      border-radius: 12px;
      background: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .popTitle {
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #292d33;
        line-height: 28px;
        width: 100%;
        text-align: center;
        padding: 0 15px 10px;
        border-bottom: 1px solid #f2f5fa;
      }
      input {
        margin-top: 21px;
        width: calc(100% - 46px);
        padding: 11px 23px;
        border: 0px;
        color: #000000;
        background: #f2f5fa;
        border-radius: 8px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;

        line-height: 23px;
      }
      input::-webkit-input-placeholder {
        font-size: 16px;
        // font-size: 4.2667vw;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(184, 191, 204, 1);
      }
      button {
        width: 100%;
        height: 46px;
        border-radius: 8px;
        border: 0px;
        background: rgba(61, 193, 125, 0.6);
        font-family: DIN, PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 23px;
        margin-top: 24px;
        // opacity: 0.5;
      }
      button.active {
        background: rgba(61, 193, 125, 1);
        // opacity: 1;
        box-shadow: rgba(61, 193, 125, 1) 0 5px 10px -5px;
      }
    }
    img {
      height: 40px;
      width: 40px;
      // margin-top: 6.7733vh;
      margin-bottom: 6.15763vh;
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
}
</style>
