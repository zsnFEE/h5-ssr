<template>
  <div v-title data-title="完成支付">
    <!-- <header>
      <div class="title title_box">
        <img
          @click="fail"
          src="../../assets/img/ic_back.png"
          class="titleArrow title_arrow"
        />
        <div class="titleText title_text"></div>
        <div class="titleDv "></div>
      </div>
    </header> -->
    <body class="temp">
      <img src="../../../assets/img/img_logo2.png" class="logo" />
      <button class="success" @click="success" v-show="completeFlag">
        已完成支付
      </button>
      <!-- <button class="success" @click="sendInfo" v-show="!completeFlag">
			重新支付
		</button> -->
      <button class="fail" @click="fail">更换支付方式</button>
    </body>
  </div>
</template>

<script>
import { getOrderPayStatus } from "../../../api/common";

export default {
  data() {
    return {
      completeFlag: true
    };
  },
  mounted() {},
  methods: {
    toBack() {},
    success() {
      // axios
      //   .get(
      //     `https://${this.apiSite}/api/quickapp/get_order_pay_status/${this
      //       .$route.query.order_id || localStorage.order_id}`,
      //     {
      //       headers: {
      //         "X-AccessToken": this.$route.query.k || localStorage.access_token
      //       }
      //     }
      //   )
      getOrderPayStatus({
        order_id: this.$route.query.order_id || localStorage.order_id
      }).then(res => {
        if (res.code == -1) {
          this.$toast(res.msg || res.message);
        } else {
          if (res.data.status == 1 || res.data.status == 6) {
            this.$router.push({
              path: "/order/phone/wechatAddPhone",
              query: {
                k: this.$route.query.k,
                order_id: this.$route.query.order_id,
                token: this.$route.query.token
              }
            });
            this.$toast("完成支付");
          } else if (res.data.status == 0) {
            this.$toast("支付未完成");
            // this.completeFlag = false;
          }
        }
      });
    },
    fail() {
      getOrderPayStatus({
        order_id: this.$route.query.order_id || localStorage.order_id
      }).then(res => {
        if (res.code == -1) {
          this.$toast(res.msg || res.message);
          this.$router.push({
            path: "/order/phone/createOrderAddressPhone",
            query: {
              token: this.$route.query.token,
              classType: localStorage.getItem("classType"),
              addressIndex: localStorage.getItem("AddressIndex")
            }
          });
        } else {
          if (res.data.status == 1) {
            this.$toast("已完成支付");
            this.$router.push({
              path: "/order/phone/wechatAddPhone",
              query: {
                k: this.$route.query.k,
                order_id: this.$route.query.order_id,
                token: this.$route.query.token
              }
            });
          } else if (res.data.status == 0) {
            this.$router.push({
              path: "/order/phone/createOrderAddressPhone",
              query: {
                token: this.$route.query.token,
                classType: localStorage.getItem("classType"),
                addressIndex: localStorage.getItem("AddressIndex")
              }
            });
            this.$toast("支付未完成");
          }
        }
      });
    }
    // sendInfo() {
    // 	window.location.href = `https://${this.apiSite}/fe/pay/wx_h5pay/${this
    // 		.$route.query.order_id || localStorage.order_id}/2`;
    // 	this.completeFlag = true;
    // }
  }
};
</script>

<style lang="less" scoped>
.title {
  .titleDv {
    width: 18px;
  }
}
.temp {
  padding: 0px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 1);

  .logo {
    margin-top: 155px;
    width: 185px;
    height: 73.5px;
  }
  .success {
    margin-top: 69px;
    width: 290px;
    height: 50px;
    background: rgba(101, 81, 234, 1);
    border: 0px;
    border-radius: 25px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 50px;
  }
  .fail {
    margin-top: 20px;
    width: 290px;
    height: 50px;
    border-radius: 25px;
    border: 1.5px solid rgba(255, 87, 0, 1);
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 87, 0, 1);
    line-height: 50px;
    background: rgba(255, 255, 255, 1);
  }
}
</style>
