<template>
  <div class="information">
    <div class="information_content">
      <div class="information_title">订单详情</div>
      <!--订单的详细信息部分开始-->
      <div class="particulars">
        <div class="information_detail">
          <div class="course_name">助教老师：</div>
          <div class="name_data">{{ classData.teacher_name }}</div>
        </div>
        <div class="information_detail">
          <div class="course_name">下单时间：</div>
          <div class="name_data">{{ List.create_time }}</div>
        </div>
        <div class="information_detail">
          <div class="course_name">支付时间：</div>
          <div class="name_data">{{ List.paid_at_time }}</div>
        </div>
        <div class="information_detail">
          <div class="course_name">支付方式：</div>
          <div class="name_data">{{ List.payment_gateway_name }}</div>
        </div>
        <div class="information_detail">
          <div class="course_name">课程原价：</div>
          <div class="name_data">¥ {{ List.price }}</div>
        </div>
        <div class="information_detail">
          <div class="course_name">优惠金额：</div>
          <div class="name_data">¥ {{ 0.0 }}</div>
        </div>
        <div class="information_detail">
          <div class="course_name">总金额：</div>
          <div class="name_data">¥ {{ List.price }}</div>
        </div>
      </div>
      <!--订单的详细信息部分结束-->
    </div>
  </div>
</template>
<script>
import { getDetails } from "../../api/common";
export default {
  data() {
    return {
      List: "",
      goods: "",
      classData: ""
    };
  },
  created() {},
  watch: {},
  mounted() {
    getDetails({ order_id: this.$route.query.order_id }).then(res => {
      this.List = res.data;
      this.goods = res.data.goods;
      this.classData = res.data.goods.class;
    });
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.information {
  // max-width: 100%;
  // min-width: 918px;
  height: 676px;
  // max-height: 100%;
  //  background:rgba(0,0,0,0.3);
}
.information_content {
  padding: 20px 154px 0 154px;
  box-sizing: border-box;
  position: relative;
}
.information_title {
  height: 34px;
  font-size: 24px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 34px;
  margin-bottom: 36px;
}
.particulars {
  width: 100%;
}
.information_detail {
  // width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.course_name {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(130, 138, 153, 1);
}
.name_data {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
</style>
