<template>
  <div class="new">
    <div class="bgpc"></div>
    <div class="new_header" v-if="flag">
      <div class="back" @click="toback">
        <img src="../../assets/img/ic_back.png" />
      </div>
      <div class="new_font">订单详情-{{ Data.status_name }}</div>
    </div>
    <div class="header_pc" v-else>订单详情-{{ Data.status_name }}</div>
    <div class="new_box" :class="!flag ? 'pcBox' : ''">
      <OrderDetail
        v-if="Data"
        :orderInfo="Data"
        :logisticsList="Actionlist"
        @tologisticsInfo="tologisticsInfo"
        :type="2"
      ></OrderDetail>
    </div>
  </div>
</template>
<script>
import { getOrderInfo } from "../../api/common";
import { isMobile } from "../../common/util";
import OrderDetail from "../../components/orderDetail";

export default {
  components: {
    OrderDetail
  },
  data() {
    return {
      Data: "",
      flag: isMobile(),
      goods: "",
      Actionlist: []
    };
  },
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.toback();
    });

    getOrderInfo({ order_id: this.$route.query.order_id }).then(res => {
      if (res.code == 0) {
        this.goods = res.data.goods;

        this.Data = res.data;
        this.Actionlist = res.data.traces.reverse();
        if (res.data.status == 7) {
          let arr = {
            Action: 7,
            AcceptStation: "商家已发货正在等待快递员揽件",
            AcceptTime: res.data.delivered_at
          };
          this.Actionlist.push(arr);
        }
      }
    });
  },
  methods: {
    // 去物流信息页面
    tologisticsInfo() {
      this.$router.push({
        path: "/pc/logisticsInfo",
        query: {
          token: this.$route.query.token,
          order_id: this.$route.query.order_id
        }
      });
    },
    toback() {
      this.$router.go(-1);
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.new_header {
  width: 100%;
  padding: 8.5px 0 8.5px 21.05px;
  background: #fff;
  display: flex;
  box-sizing: border-box;
  position: fixed;
  z-index: 9;
  right: 0;
}
.header_pc {
  width: 100%;
  padding: 11px 20px;
  background: #fff;
  box-sizing: border-box;
  position: fixed;
  font-size: 21px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
  z-index: 99;
  right: 0;
}
.back {
  width: 20px;
  height: 20px;
  margin-top: 9px;
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
}
.new {
  width: 100%;
  height: 100%;
  background: #f3f5f9;
}
.new_box {
  box-sizing: border-box;
  padding: 66px 112px 43px 112px;
  width: 100%;
  background: #f3f5f9;
  &.pcBox {
    padding: 73px 20px 43px 20px;
  }
}
.content {
  padding: 18px 30px 10px 30px;
  background: #ffffff;
  border-radius: 8px;
  margin-bottom: 15px;
  position: relative;
}
.title {
  font-family: PingFangSC-Semibold;
  font-size: 18px;
  color: #292d33;
  margin-bottom: 5px;
  font-weight: 600;
}
.class_name {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #292d33;
  line-height: 42px;
}
.class_detail {
  display: flex;
  margin-top: 11px;
  margin-bottom: 15px;
}
.img_detail {
  div {
    width: 150.5px;
    display: flex;
    justify-content: space-between;
  }
}

.img_detail img {
  width: 70px;
  height: 70px;
  border-radius: 6px;
  object-fit: cover;
}

.detail_font {
  margin-left: 18.5px;
}
.detail_font .font {
  display: flex;
  align-items: center;
}
.dot {
  background: #8a8f99;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  margin-right: 7.5px;
}
.after_font {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #8a8f99;
  letter-spacing: 0;
}
.info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.info_name {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #8a8f99;
  white-space: nowrap;
}
.info_con {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #292d33;
}
.info_price {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #ff5700;
}
// 右边的已完成标签
.right_lable  {
  position: absolute;
  width: 97.5px;
  height: 24px;
  background: url("../../assets/img/rectangle.png") no-repeat center
    center/cover;
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #fff;
  text-align: center;
  line-height: 24px;
  right: 0;
}
.goods {
  border-bottom: 1px solid #f5f7fa;
  padding-top: 10px;
}
// 新增的物流信息部分
.travel {
  margin-top: 9px;
  margin-bottom: 6px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;

  color: #8a8f99;
}
.color {
  color: #292d33;
}
.carriage {
  color: #8a8f99;
}
.place {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;

  margin-bottom: 3px;
}
.timenode {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  // color: #8a8f99;
  margin-bottom: 20.1px;
}

.line {
  height: 1px;
  background: #f5f7fa;
  margin-bottom: 19px;
}
.right {
  text-align: right;
}
</style>
