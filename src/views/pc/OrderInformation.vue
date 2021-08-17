<template>
  <div class="information">
    <div class="information_content">
      <div class="information_title">订单信息</div>
      <!--订单的详细信息部分开始-->
      <div class="particulars">
        <div class="information_detail">
          <div class="course_name">课程名称：</div>
          <div class="name_data">{{ class_data.name }}</div>
        </div>
        <div class="information_detail">
          <div class="course_name">开课时间：</div>
          <div class="name_data">{{ class_data.start_time }}</div>
        </div>
        <div class="information_detail">
          <div class="course_name">授课教师：</div>
          <div class="name_data">{{ class_data.teacher_name }}</div>
        </div>
        <div class="information_detail">
          <div class="course_name">订单原价：</div>
          <div class="name_data">¥ {{ class_data.price }}</div>
        </div>
        <div class="information_detail">
          <div class="course_name">已优惠：</div>
          <div class="name_data">¥ 100.00</div>
        </div>
        <div class="information_detail">
          <div class="course_name">需支付：</div>
          <div class="name_data">¥ {{ class_data.price }}</div>
        </div>
      </div>
      <!--订单的详细信息部分结束-->
      <!--备注部分开始-->
      <div class="remarks">
        <div class="remarks_font">备注</div>
        <!-- <textarea class="remarks_content">选填：对本次交易的说明</textarea> -->
        <textarea
          name=""
          placeholder="选填：对本次交易的说明"
          id=""
          cols="30"
          rows="10"
          class="remarks_content"
        ></textarea>
      </div>
      <!--备注部分结束-->
      <!-- 支付按钮部分开始 -->
      <div class="button">
        <button class="Preferential" @click="toast">优惠使用</button>
        <button class="payment" @click="toast">支付</button>
      </div>
      <!-- 支付按钮部分结束 -->
    </div>
    <!--支付弹框部分开始-->
    <div class="toast" v-show="pay_toast">
      <div class="pay_toast">
        <div class="pattern">
          <div class="block" @click="pattern(1)">
            <div>
              <img v-if="use == 1" src="../../assets/img/ic_wechat.png" />
              <img v-else src="../../assets/img/ic_wechatpay.png" />
            </div>
            <div class="wxpay">微信支付</div>
          </div>
          <div class="pattern_line"></div>
          <div class="block" @click="pattern(2)">
            <div>
              <img v-if="use == 2" src="../../assets/img/ic_alipay.png" />
              <img v-else src="../../assets/img/ic_alipay2.png" />
            </div>
            <div class="wxpay">支付宝支付</div>
          </div>
        </div>
        <!--二维码部分开始-->
        <div class="code">
          <img :src="code" />
        </div>
        <!--二维码部分结束-->
        <div class="no_pay" @click="toast">取消支付</div>
      </div>
    </div>
    <!--支付弹框部分结束-->
  </div>
</template>
<script>
import { getCreat, Querystatus } from "../../api/common";
import env from "../../config/env";
const URL = env.baseUrl;
export default {
  data() {
    return {
      use: 1,
      pay_toast: false,
      goods_id: "",
      order_id: "",
      class_data: "",
      code: "",
      timer: null
    };
  },
  created() {},
  watch: {},
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});

    this.goods_id = this.$route.query.goods_id;
    this.class_data = this.$route.query.class_data;
  },
  methods: {
    // 切换支付方式的方法
    pattern(use) {
      this.use = use;

      if (use === 1) {
        clearTimeout(this.timer);
        // 微信支付
        getCreat({ gateway: 1, goods_id: this.goods_id }).then(res => {
          this.order_id = res.order_id;
          if (res.status) {
            this.code = `${URL}/fe/pay/pay_wx_qr/${res.order_id}`;
            this.getStatus(res.order_id);
          }
        });
      } else {
        clearTimeout(this.timer);
        getCreat({ gateway: 16, goods_id: this.goods_id }).then(res => {
          this.order_id = res.order_id;
          if (res.status) {
            this.code = `${URL}/fe/pay/pay_ali_qr/${res.order_id}`;
            this.getStatus(res.order_id);
          }
        });
      }
    },
    // 查看支付状态的接口
    getStatus(order) {
      const that = this;
      // 实现轮询
      this.timer = setTimeout(() => {
        Querystatus({ order_id: order }).then(res => {
          if (res.data.status === "1") {
            clearTimeout(this.timer);
            this.$toast("支付完成");
            this.$router.go(-1);
          } else {
            that.getStatus(that.order_id);
          }
        });
      }, 1000);
    },

    // 控制二维码的显示隐藏
    toast() {
      this.pay_toast = !this.pay_toast;
      if (this.pay_toast === true) {
        getCreat({ goods_id: this.goods_id }).then(res => {
          this.order_id = res.order_id;
          if (res.status) {
            this.code = `${URL}/fe/pay/pay_wx_qr/${res.order_id}`;
            this.getStatus(res.order_id);
          }
        });
      } else {
        clearTimeout(this.timer);
      }
    }
  },
  destroyed() {
    clearTimeout(this.timer);
  }
};
</script>

<style lang="less" scoped>
.information {
  // max-width: 100%;
  // min-width: 918px;
  // min-height: 676px;
  height: 100%;
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
.remarks {
  width: 100%;
  border-top: 1px solid #f2f5fa;
  border-bottom: 1px solid #f2f5fa;
  padding: 20px 0;
}
.remarks_font {
  height: 34px;
  font-size: 24px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 34px;
  margin-bottom: 5%;
}
.remarks_content {
  height: 24px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(184, 191, 204, 1);
  line-height: 24px;
  margin-left: 8px;
  border: 0;
  width: 100%;
}
.button {
  margin-top: 60px;
  // margin-left: 60%;
  position: absolute;
  display: flex;
  right: 154px;
}
.Preferential {
  width: 119px;
  height: 35px;
  border-radius: 5px;
  border: 1px solid rgba(255, 119, 0, 1);
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(255, 128, 0, 1);
  background: #fff;
  margin-right: 2%;
  cursor: pointer;
}
.payment {
  width: 81px;
  height: 35px;
  background: rgba(255, 128, 0, 1);
  border-radius: 5px;
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  border: 0;
  cursor: pointer;
}
.toast {
  width: 100%;
  // height: 100%;
  // min-width: 918px;
  // height: 676px;
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  top: 0px;
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pay_toast {
  max-width: 100%;
  max-height: 100%;
  min-width: 351px;
  min-height: 472px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  border-radius: 16px;
  padding: 81px 36px 0;
}
.block {
  display: flex;
}
.block > div {
  cursor: pointer;
}
.pattern {
  display: flex;
}
.pattern img {
  width: 27px;
  height: 24px;
}
.pattern_line {
  width: 1px;
  height: 14px;
  background: rgba(127, 127, 127, 1);
  margin: 6px 24px;
}
// 选中的样式
.wxpay_active {
  height: 24px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 24px;
  margin-left: 7px;
}
// 未选中的样式
.wxpay {
  height: 24px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 24px;
  margin-left: 7px;
  color: rgba(130, 138, 153, 1);
}
.code {
  width: 243px;
  height: 243px;
  margin: 41px auto 23px;
}
.code img {
  width: 100%;
  height: 100%;
}
.no_pay {
  height: 27px;
  font-size: 19px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(130, 138, 153, 1);
  line-height: 27px;
  text-align: center;
  margin: auto;
  cursor: pointer;
}
</style>
