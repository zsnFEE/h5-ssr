<template>
  <div class="body" v-title data-title="订单详情">
    <div class="backgroundColor"></div>
    <Header v-if="appFlag" :title="`订单详情-${statusName}`" @toBack="toBack">
    </Header>

    <body class="temp" :class="appFlag ? '' : 'active'">
      <OrderDetail
        v-if="orderInfo"
        :orderInfo="orderInfo"
        :logisticsList="logisticsList"
        @tologisticsInfo="tologisticsInfo"
        :type="1"
      ></OrderDetail>
    </body>
  </div>
</template>

<script>
import { getOrderInfo } from "../../api/common";
import OrderDetail from "../../components/orderDetail";
export default {
  components: {
    OrderDetail
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
      },
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
    // 去物流信息页面
    tologisticsInfo() {
      this.$router.push({
        path: "/phone/logisticsInfo",
        query: {
          token: this.$route.query.token,
          order_id: this.$route.query.order_id,
          appFlag: this.appFlag
        }
      });
    },
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
  .infoBox {
    width: calc(100% - 30px);
    background: rgba(255, 255, 255, 1);
    border-radius: 12px;
    padding-bottom: 20px;
    padding-top: 18px;
    // display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
    .infoTitle {
      width: 100%;
      margin-bottom: 15px;
      height: 25px;
      // font-size: 18px;
      align-items: center;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 25px;
      display: flex;
      justify-content: space-between;
      div {
        margin: 0 15px;
      }
      .infoState {
        width: 96px;
        height: 24px;
        // background: linear-gradient(
        //     70deg,
        //     transparent 8px,
        //     rgba(255, 115, 0, 1) 0%,
        //     rgba(255, 115, 0, 1)
        //   )
        //   bottom left;
        background: url("../../assets/img/rectangle.png") no-repeat center
          center/cover;
        margin: 0;
        // font-size: 12px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 24px;
        text-align: center;
      }
    }
    .logisticsBox {
      width: calc(100% - 30px);
      margin: 0 15px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f7fa;
      .logisticsTitle {
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        margin-bottom: 6px;
      }
      .logisticsInfo {
        margin-bottom: 3px;
      }
      .logisticsDate {
        margin-bottom: 20px;
      }
      .logisticsStyle {
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #8a8f99;
        line-height: 16.5px;
      }
      .logisticsStyle.active {
        color: #292d33;
      }
    }

    .infoListBox {
      width: calc(100% - 30px);
      margin: 0 auto;
      .packageBox {
        border-bottom: 1px solid #f5f7fa;
        margin-bottom: 12px;
      }
      .packageBox.active {
        border-bottom: 0;
        margin-bottom: 0;
      }
      .classInfoTitle {
        // font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 21px;
        margin-bottom: 10px;
      }

      .infoClassBox {
        margin-bottom: 12px;
        display: flex;
        flex-direction: row;
        .infoClass {
          min-width: 70px;
          height: 70px;
          // background: rgba(242, 245, 250, 1);
          border-radius: 6px;
          margin-right: 10px;
          background: rgba(242, 245, 250, 0);
        }
        .infoClassImg {
          min-width: 70px;
          height: 70px;
          // background: rgba(242, 245, 250, 1);
          border-radius: 6px;
          margin-right: 30px;
          background: url(../../assets/img/img_commodity.png) no-repeat center
            center / cover;
        }
        .infoBoxClassImg {
          min-width: 70px;
          height: 70px;
          // background: rgba(242, 245, 250, 1);
          border-radius: 6px;
          margin-right: 30px;
          background: url(../../assets/img/img_box.png) no-repeat center center /
            cover;
        }
        .infoClassName {
          // font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(138, 143, 153, 1);
          line-height: 20px;
          li {
            word-break: break-all;
            margin-bottom: 4px;
            list-style: outside;
          }
        }
      }
      .infoList {
        margin-bottom: 6px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .infoListName {
          max-width: 100%;
          min-width: 21vw;
          // font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(138, 143, 153, 1);
          line-height: 20px;
          margin-right: 10px;
        }
        .infoListData {
          max-width: calc(100% - 80px);
          // font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
          word-wrap: break-word;
          word-break: break-all;
          overflow: hidden;
          text-align: right;
        }
      }
    }
  }
}
.temp.active {
  padding-top: 15px;
  height: calc(100% - 15px);
}
</style>
