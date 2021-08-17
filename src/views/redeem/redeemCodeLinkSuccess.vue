<template>
  <div class="redeemCodeLink" ref="redeemCodeLink">
    <img
      :src="
        windowWidth < 768
          ? require('../../assets/img/bg_coupon_success.png')
          : require('../../assets/img/bg_coupon_success_pad.png')
      "
      alt=""
      class="bgImg"
    />
    <div class="couponStyle">
      <div class="couponBox">
        <div
          class="couponBoxLeft"
          v-if="
            couponInfo.preferential_type == 1 ||
              couponInfo.preferential_type == 3
          "
        >
          <div class="intensity">
            <div class="ft30 intensityNum">
              {{ parseFloat(couponInfo.discount) }}
            </div>
            <div class="ft13 intensityUnit">折</div>
          </div>
          <div class="ft12 limit" v-if="couponInfo.preferential_type == 3">
            满{{ couponInfo.discount_piece }}件可用
          </div>
        </div>
        <div class="couponBoxLeft" v-else>
          <div class="intensity">
            <div class="ft13 intensityUnit">￥</div>
            <div class="ft30 intensityNum">
              {{ parseFloat(couponInfo.minus) }}
            </div>
          </div>
          <div class="ft12 limit">满{{ couponInfo.full }}元可用</div>
        </div>

        <div class="couponBoxRight">
          <div class="couponName ft13">{{ couponInfo.name }}</div>
          <div class="couponTime ft12">
            {{ timeConversion(couponInfo) }}
          </div>
        </div>
        <img src="../../assets/img/img_receive.png" alt="" class="seal" />
      </div>
    </div>
  </div>
</template>

<script>
import { getExchangeCoupon, setExchangeCoupon } from "../../api/common";

export default {
  data() {
    return {
      maskShow: true,
      couponInfo: [],
      show: false,
      windowWidth: 375
    };
  },
  mounted() {
    this.getApi();
    this.getWindowWidth();
    window.addEventListener("resize", this.getWindowWidth);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowWidth);
  },
  methods: {
    getWindowWidth() {
      this.windowWidth = this.$refs["redeemCodeLink"].scrollWidth;
    },
    timeConversion(item) {
      if (item.term_start_time && item.term_end_time) {
        return (
          item.term_start_time
            .substr(0, 10)
            .split("-")
            .join(".") +
          " - " +
          item.term_end_time
            .substr(0, 10)
            .split("-")
            .join(".")
        );
      }
    },

    getApi() {
      getExchangeCoupon({
        exchange: this.$route.query.exchange
      }).then(res => {
        if (res.code == 0) {
          this.show = true;
          this.couponInfo = res.data;
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.redeemCodeLink {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: #eda85e;

  .bgImg {
    position: absolute;
    width: 100%;
    top: -2px;
    left: 0px;
    right: 0px;
    height: auto;
  }
  .couponStyle {
    padding-top: 115%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 768px) {
      padding-top: 40%;
    }
  }
  .couponBox {
    padding: 0 13px;
    box-sizing: border-box;
    width: 85%;
    max-width: 320px;
    height: 100px;
    background: linear-gradient(90deg, #fff0e1 0%, #fadbaa 100%);
    border-radius: 8px;
    // margin-top: 26.27322%;
    position: relative;
    color: #ffffff;
    display: flex;
    flex-direction: row;
    align-items: center;
    // box-shadow: rgba(255, 115, 0, 1) 0 5px 5px -5px;
    .seal {
      width: 42px;
      height: 42px;
      position: absolute;
      right: 7px;
      top: 29px;
    }
    .couponBoxLeft {
      width: 77px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .intensity {
        display: flex;
        flex-direction: row;
        justify-content: center;
        .intensityUnit {
          margin-top: 14px;
          font-family: DIN;
          font-weight: bold;
          color: #472f03;
          line-height: 15px;
        }
        .intensityNum {
          font-family: DIN;
          font-weight: bold;
          color: #472f03;
          line-height: 35px;
        }
      }
      .limit {
        margin-top: 2px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #5e3c06;
        line-height: 11px;

        font-size: 12px;
        transform-origin: center 0;
      }
    }
    .ballTop {
      position: absolute;
      width: 10px;
      height: 10px;
      background: #fffbea;
      z-index: 2078;
      border-radius: 5px;
      top: -5px;
      left: 73px;
    }
    .ballBottom {
      position: absolute;
      width: 10px;
      height: 6px;
      background: #fffbea;
      z-index: 2078;
      border-radius: 10px 10px 0 0;
      bottom: -1px;
      left: 73px;
    }
    .couponBoxRight {
      height: calc(100% - 10px);
      padding-left: 9px;
      // border-left: 1px dashed #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .couponName {
        margin-top: 5px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #3c2f1d;
        line-height: 16px;
        transform-origin: left center;
      }
      .couponTime {
        margin-top: 14px;
        // margin-bottom: 5px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #646464;
        line-height: 11px;
        transform-origin: left center;
      }
    }
  }
}
</style>
