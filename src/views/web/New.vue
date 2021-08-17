<template>
  <div class="new">
    <div class="bgpc"></div>
    <!-- <div class="new_header" v-show="flag">
      <div class="back" @click="toback">
        <img src="../../assets/img/ic_back.png" />
      </div>
      <div class="new_font">订单详情</div>
    </div>
    <div class="header_pc" v-show="!flag">
      订单详情
    </div> -->
    <div class="new_box">
      <div class="content">
        <div class="right_lable">{{ Data.status_name }}</div>
        <div class="title">订单信息</div>
        <div v-for="(item, index) in goods" :key="index" class="goods">
          <!--图片和课程部分开始-->
          <div class="class_detail">
            <div class="img_detail">
              <img :src="item.cdn + item.logo" />
            </div>
            <div class="detail_font">
              <!-- <div class="font" style="margin-bottom:6px;">
                <div class="dot"></div>
                <div class="after_font">创意美术课 2 节</div>
              </div>
              <div class="font">
                <div class="dot"></div>
                <div class="after_font">配套随材礼包 1 盒</div>
              </div> -->
              <!--副标题start-->
              <div class="class_name">{{ item.name }}</div>
              <!--副标题end-->
            </div>
          </div>
          <!--图片和课程部分结束-->
          <div class="info">
            <div class="info_name">课程原价：</div>
            <div class="info_con">¥ {{ item.price }}</div>
          </div>
        </div>

        <!-- 详情信息部分开始 -->
        <div class="info">
          <div class="info_name">助教老师：</div>
          <div class="info_con">{{ Data.seller_name }}</div>
        </div>
        <!-- <div class="info">
					<div class="info_name">助教微信：</div>
					<div class="info_con">houhouhua04</div>
				</div> -->
        <div class="info">
          <div class="info_name">下单时间：</div>
          <div class="info_con">{{ Data.create_time }}</div>
        </div>
        <div class="info">
          <div class="info_name">支付时间：</div>
          <div class="info_con">{{ Data.paid_at_time }}</div>
        </div>
        <div class="info">
          <div class="info_name">支付方式：</div>
          <div class="info_con">{{ Data.payment_gateway_name }}</div>
        </div>

        <!-- <div class="info">
					<div class="info_name">礼盒价格：</div>
					<div class="info_con">¥ 69.90</div>
				</div> -->
        <div class="info">
          <div class="info_name">优惠金额：</div>
          <div class="info_con">-¥ 0.00</div>
        </div>
        <div class="info">
          <div class="info_name">总金额：</div>
          <div class="info_price">¥ {{ Data.price }}</div>
        </div>
        <!-- 详情信息部分结束 -->
      </div>
      <!-- <div class="content"> -->
      <!-- <div class="title">订单信息</div> -->
      <!-- 详情信息部分开始 -->
      <!-- <div class="info">
          <div class="info_name">收货人：</div>
          <div class="info_con">{{ Data.receiver_name }}</div>
        </div>
        <div class="info">
          <div class="info_name">联系电话：</div>
          <div class="info_con">{{ Data.phone }}</div>
        </div> -->
      <!-- <div class="info">
					<div class="info_name">所在地区：</div>
					<div class="info_con">北京市 海淀区</div>
				</div> -->
      <!-- <div class="info">
          <div class="info_name">详细地址：</div>
          <div class="info_con">{{ Data.address }}</div>
        </div> -->
      <!-- 详情信息部分结束 -->
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
import { getOrderInfo } from "../../api/common";
import { isMobile } from "../../common/util";

export default {
  data() {
    return {
      Data: "",
      // className: "",
      // openingTime: "",
      // imgUrl: "",
      flag: isMobile(),
      goods: ""
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
        // this.className = res.data.goods.class.name;
        // this.openingTime = res.data.goods.class.start_time;
        // this.imgUrl = res.data.goods.class.cdn + res.data.goods.class.logo;
        this.Data = res.data;
      }
    });
  },
  methods: {
    toback() {
      // this.$router.push({
      // 	path: "/pc/Orders",
      // 	query: { token: this.$route.query.token }
      // });
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
}
.header_pc {
  width: 100%;
  padding: 11px 40px;
  background: #fff;
  box-sizing: border-box;
  position: fixed;
  font-size: 21px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
  z-index: 9;
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
  margin: 80px auto 40px;
  width: 800px;
  background: #f3f5f9;
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
  margin-bottom: 15px;
}
.class_name {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #292d33;
}
.class_detail {
  display: flex;
  margin-top: 11px;
  margin-bottom: 15px;
}
.img_detail {
  width: 100px;
  height: 60px;
}
.img_detail img {
  width: 100%;
  height: 100%;
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
  background: #292d33;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  margin-right: 7.5px;
}
.after_font {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #292d33;
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
  width: 112px;
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
  border-bottom: 1px solid #f2f5fa;
}
</style>
