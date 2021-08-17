<template>
  <div class="body" v-title data-title="物流信息">
    <div class="backgroundColor"></div>
    <header v-show="appFlag">
      <div class="title title_box">
        <img
          @click="toBack"
          src="../../assets/img/ic_back.png"
          class="titleArrow title_arrow"
        />
        <div class="titleText title_text">物流信息</div>
        <div class="titleDv"></div>
      </div>
    </header>

    <body class="temp" :class="appFlag ? '' : 'active'">
      <Logistics :orderInfo="orderInfo" :list="logisticsList"></Logistics>
    </body>
  </div>
</template>

<script>
import { getOrderInfo } from "../../api/common";

import Logistics from "../../components/logistics";

export default {
  components: {
    Logistics
  },
  data() {
    return {
      remarks: "",
      classInfo: [],
      teacherName: "",
      price: "",
      paymentGatewayName: "",
      createTime: "",
      paidAtTime: "",
      receiverName: "",
      adid: "",
      phone: "",
      imgUrl: "",
      statusName: "",

      logisticsList: [],
      expressnumber: "",
      status: "",
      appFlag: this.$route.query.appFlag,
      orderInfo: {}
    };
  },
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    getOrderInfo({ order_id: this.$route.query.order_id }).then(res => {
      if (res.code == 0) {
        this.orderInfo = res.data;
        this.classInfo = res.data.goods;
        this.teacherName = res.data.seller_name;
        this.price = res.data.price;
        this.createTime = res.data.create_time;
        this.paymentGatewayName = res.data.payment_gateway_name;
        this.paidAtTime = res.data.paid_at_time;
        this.receiverName = res.data.receiver_name;
        this.adid = res.data.address;
        this.phone = res.data.phone;
        this.statusName = res.data.status_name;
        this.expressnumber = res.data.expressnumber;
        this.logisticsList = res.data.traces.reverse();
        if (res.data.status == 7) {
          let list = {
            Action: 7,
            AcceptStation: "商家已发货，正在等待快递员揽收",
            AcceptTime: res.data.delivered_at
          };
          this.logisticsList.push(list);
        }
      } else {
        this.$toast(res.msg || res.message);
      }
    });
    let that = this;
    dsBridge.registerAsyn("goback", function(arg1, arg2, arg3) {
      that.toBack();
    });
  },
  methods: {
    toBack() {
      this.$router.push({
        path: "/phone/orderPhone",
        query: { token: this.$route.query.token, appFlag: this.appFlag }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.body {
  height: 100%;
}
.title {
  .titleDv {
    width: 18px;
  }
}
.temp {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow-y: auto;
  padding-top: 57px;
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
  // height: calc(100% - 57px);
  // background: linear-gradient(
  //   180deg,
  //   rgba(242, 245, 250, 1) 0%,
  //   rgba(250, 251, 253, 1) 100%
  // );
}
.temp.active {
  padding-top: 15px;
  height: calc(100% - 15px);
}
</style>
