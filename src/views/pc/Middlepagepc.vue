<template>
  <div>
    <header>
      <div class="title title_box">
        <img
          @click="fail"
          src="../../assets/img/ic_back.png"
          class="titleArrow title_arrow"
        />
        <div class="titleText title_text"></div>
        <div class="titleDv "></div>
      </div>
    </header>
    <body class="temp">
      <div class="temp_box">
        <img src="../../assets/img/img_logo2.png" class="logo" />
        <button class="success" @click="success" v-show="completeFlag">
          已完成支付
        </button>
        <button class="fail" @click="fail">更换支付方式</button>
      </div>
    </body>
  </div>
</template>

<script>
import { getOrderPayStatus } from "../../api/common";

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
      getOrderPayStatus({
        order_id: this.$route.query.order_id || localStorage.order_id
      }).then(res => {
        if (res.code == -1) {
          this.$toast(res.msg || res.message);
        } else {
          if (res.data.status == 1) {
            this.$router.push({
              path: "/pc/Signup",
              query: {
                k: this.$route.query.k,
                order_id: this.$route.query.order_id,
                token: this.$route.query.token
              }
            });
            this.$toast("完成支付");
          } else if (res.data.status == 0) {
            this.$toast("支付未完成");
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
            path: "/pc/Fillorder",
            query: {
              token: this.$route.query.token,
              Classtype: localStorage.getItem("Classtype"),
              addressIndex: localStorage.getItem("AddressIndex")
            }
          });
        } else {
          if (res.data.status == 1) {
            this.$toast("已完成支付");
            this.$router.push({
              path: "/pc/Signup",
              query: {
                k: this.$route.query.k,
                order_id: this.$route.query.order_id,
                token: this.$route.query.token,
                Classtype: localStorage.getItem("Classtype")
              }
            });
          } else if (res.data.status == 0) {
            this.$router.push({
              path: "/pc/Fillorder",
              query: {
                token: this.$route.query.token,
                Classtype: localStorage.getItem("Classtype"),
                addressIndex: localStorage.getItem("AddressIndex")
              }
            });
            this.$toast("支付未完成");
          }
        }
      });
    }
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
  width: 100%;
  height: 100vh;
  background: rgba(255, 255, 255, 1);
  position: relative;
  .temp_box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 41%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .logo {
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
