<template>
  <div class="orderDetail">
    <div
      class="first"
      @click="tologisticsInfo"
      v-if="logisticsList.length > 0 && false"
      style="position:relative"
    >
      <div class="left">
        <img src="../assets/img/ic-carry.png" />
      </div>
      <div class="midde">
        <div class="status">
          <span class="status_font">{{
            actions[logisticsList[0].Action]
          }}</span>
          <span class="time">{{ logisticsList[0].AcceptTime }}</span>
        </div>
        <div class="detail">
          {{ logisticsList[0].AcceptStation }}
        </div>
      </div>
      <div class="right" style="position:absolute;right:15px;top:50%">
        <img src="../assets/img/btn_arrow_right.png" />
      </div>
    </div>
    <!-- 定位 -->
    <div class="first" v-if="false">
      <div class="left">
        <img src="../assets/img/ic-address.png" />
      </div>
      <div class="midde">
        <div class="status">
          <span class="status_font">{{ orderInfo.receiver_name }}</span>
          <span class="status_font">{{
            orderInfo.phone &&
              orderInfo.phone.substr(0, 3) +
                "****" +
                orderInfo.phone.substr(7, 4)
          }}</span>
        </div>
        <div class="detail">
          {{ orderInfo.address }}
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="order" :class="type == 1 ? 'phone' : 'cursor'">
      <div class="name " v-for="(item, index) in orderInfo.goods" :key="index">
        <span class="class_name">{{ item.name }}</span>
        <span class="price">¥ {{ item.origin_price }}</span>
      </div>
      <!-- <div class="subtitle">
        月 号开课 {{ orderInfo.live_course_num }}节课时
      </div>
      <div class="subtitle border">
        教材大礼包
      </div> -->
      <div class="discounts">
        <div style="margin-bottom:10px;">
          <span>优惠立减</span>
          <span class="reduction"
            >-¥ {{ orderInfo.coupon_minus_price || "0.00" }}</span
          >
        </div>
        <div>
          <span>优惠卷抵扣</span>
          <span class="reduction"
            >-¥ {{ orderInfo.coupon_price || "0.00" }}</span
          >
        </div>
      </div>
      <div class="reality">
        <span>实付：</span>
        <span class="price">¥{{ orderInfo.price || "0.00" }}</span>
      </div>
    </div>
    <div class="order" :class="type == 1 ? 'phone' : 'cursor'">
      <div class="message">
        <span class="class_name">订单信息</span>
        <span class="msgstatus">{{ orderInfo.status_name }}</span>
      </div>
      <div class="detaimsg">
        <div class="spanfont">
          <span>助教老师</span>
          <span class="black">{{ orderInfo.seller_name }}</span>
        </div>
        <div class="spanfont">
          <span>助教微信</span>
          <span class="black">{{ orderInfo.seller_wx }}</span>
        </div>
        <div class="spanfont">
          <span>下单时间</span>
          <span class="black">{{ orderInfo.create_time }}</span>
        </div>
        <div class="spanfont">
          <span>支付时间</span>
          <span class="black">{{ orderInfo.paid_at_time }}</span>
        </div>
        <div class="spanfont">
          <span>支付方式</span>
          <span class="black">{{ orderInfo.payment_gateway_name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "orderDetail",
  props: ["orderInfo", "logisticsList", "type"],
  data() {
    return {
      actions: {
        0: "暂无轨迹信息",
        1: "已揽收",
        2: "运输中",
        202: "派送中",
        211: "已放入快递柜或驿站",
        301: "已签收",
        302: "派件异常后最终签收",
        304: "代收签收",
        311: "快递柜或驿站签收",
        4: "问题件",
        401: "发货无信息",
        402: "超时未签收",
        403: "超时未更新",
        404: "拒收(退件)",
        405: "派件异常",
        406: "退货签收",
        407: "退货未签收",
        412: "快递柜或驿站超时未取",
        7: "已发货"
      }
    };
  },
  mounted() {},
  methods: {
    tologisticsInfo() {
      this.$emit("tologisticsInfo");
    }
  }
};
</script>
<style lang="less" scoped>
.orderDetail {
  width: 100%;
  .first {
    padding: 15px;
    margin-bottom: 10px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 5px;
    display: flex;
    width: 100%;
    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 9px;
      img {
        width: 23px;
        height: 23px;
        object-fit: cover;
      }
    }
    .midde {
      .status {
        margin-bottom: 9px;
        .status_font {
          font-size: 16px;
          font-weight: 600;
          color: #242216;
          margin-right: 10px;
        }
        .time {
          font-size: 12px;
          font-weight: 600;
          color: #999999;
        }
      }
      .detail {
        font-size: 14px;
        font-weight: 400;
        color: #8a8f99;
      }
    }
    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 9px;
      img {
        width: 5px;
        height: 10px;
        object-fit: cover;
      }
    }
  }
  .phone {
    margin-bottom: 15px !important;
  }
  .order {
    padding: 15px;
    margin-bottom: 20px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 5px;
    width: 100%;
    .name {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      .class_name {
        font-size: 16px;
        font-weight: 500;
        color: #292d33;
      }
      .price {
        font-size: 15px;
        font-family: DIN;
        font-weight: bold;
        color: #828a99;
      }
    }
    .subtitle {
      font-size: 12px;
      font-weight: 400;
      color: #828a99;
      margin-bottom: 8px;
    }
    .border {
      padding-bottom: 10px;
      border-bottom: 1px solid #dae3f2;
      margin-bottom: 20px;
    }
    .discounts {
      padding-bottom: 10px;
      border-bottom: 1px solid #dae3f2;
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        font-weight: 400;
        color: #8a8f99;

        .reduction {
          font-size: 16px;
          font-family: DIN;
          font-weight: bold;
          color: #ff5700;
        }
      }
    }
    .reality {
      padding-top: 20px;
      font-size: 16px;
      font-weight: 500;
      color: #828a99;
      text-align: right;
      .price {
        font-size: 17px;
        font-family: DIN;
        font-weight: bold;
        color: #292d33;
        margin-left: 13px;
      }
    }
    // 订单信息
    .message {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 10px;
      border-bottom: 1px solid #dae3f2;
      .msgstatus {
        font-size: 12px;
        font-weight: 500;
        color: #828a99;
      }
    }
    .detaimsg {
      padding-top: 10px;
      .spanfont {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 14px;
          font-weight: 400;
          color: #8a8f99;
        }
        .black {
          font-size: 15px;
          color: #292d33;
        }
      }
    }
  }
}
</style>
