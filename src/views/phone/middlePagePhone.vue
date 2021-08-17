<template>
  <body class="temp">
    <div class="brand">
      <div class="logo">
        <img src="../../assets/img/img_logo2.png" alt="" />
      </div>
      <div class="brand_font">Dipper</div>
    </div>

    <button class="success" @click="success">
      已完成支付
    </button>
    <!-- v-show="completeFlag" -->
    <!-- <button class="success" @click="sendInfo" v-show="!completeFlag">
      重新支付
    </button> -->
    <div class="fail" @click="fail">更换支付方式</div>
  </body>
  <!-- <div>
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
      <img src="../../assets/img/img_logo2.png" class="logo" />
      <button class="success ft18" @click="success" v-show="completeFlag">
        已完成支付
      </button>
      
      <button class="fail ft18" @click="fail">更换支付方式</button>
    </body>
  </div> -->
</template>

<script>
import { getOrderStatus } from "../../api/common";

export default {
  data() {
    return {
      completeFlag: true
    };
  },
  mounted() {
    let that = this;
    dsBridge.registerAsyn("fail", function(arg1, arg2, arg3) {
      that.toBack();
    });
  },
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
      getOrderStatus(
        {
          order_id: this.$route.query.order_id || localStorage.order_id
        },
        {
          "X-AccessToken": this.$route.query.k || localStorage.access_token
        }
      ).then(res => {
        if (res.code == -1) {
          this.$toast(res.msg);
        } else {
          if (res.data.status == 1 || res.data.status == 6) {
            var grouping = localStorage.getItem("type_id");
            var surplus_loc = localStorage.getItem("surplus_loc" + grouping);
            localStorage.setItem("count_Down" + grouping, "");
            localStorage.setItem("surplus_loc" + grouping, surplus_loc - 1);
            this.$router.push({
              path: "/phone/wechatAddPhone",
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
      getOrderStatus(
        {
          order_id: this.$route.query.order_id || localStorage.order_id
        },
        {
          "X-AccessToken": this.$route.query.k || localStorage.access_token
        }
      ).then(res => {
        if (res.code == -1) {
          this.$toast(res.msg);
          this.$router.push({
            path: "/phone/createOrderAddressPhone",
            query: {
              gid: localStorage.smallClass
            }
          });
          // this.$router.push({
          //   path: "/phone/createOrderAddressPhone",
          //   query: {
          //     token: this.$route.query.token,
          //     classType: localStorage.getItem("classType"),
          //     addressIndex: localStorage.getItem("AddressIndex")
          //   }
          // });
        } else {
          if (res.data.status == 1 || res.data.status == 6) {
            this.$toast("已完成支付");
            var grouping = localStorage.getItem("type_id");
            var surplus_loc = localStorage.getItem("surplus_loc" + grouping);
            localStorage.setItem("count_Down" + grouping, "");
            localStorage.setItem("surplus_loc" + grouping, surplus_loc - 1);
            this.$router.push({
              path: "/phone/wechatAddPhone",
              query: {
                k: this.$route.query.k,
                order_id: this.$route.query.order_id,
                token: this.$route.query.token
              }
            });
          } else if (res.data.status == 0) {
            this.$router.push({
              path: "/phone/createOrderAddressPhone",
              query: {
                gid: localStorage.smallClass
              }
            });
            this.$toast("支付未完成,请重新支付");
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
.temp {
  padding: 0px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 1);
  header {
    .title_box {
      position: fixed;
      display: flex;
      top: 0;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      background: #fff;
      padding: 9px 16px;
      z-index: 1;
      left: 0;
      width: 100%;
      height: 42px;
    }
    .title_font {
      font-size: 18px;
      font-weight: 500;
      color: #292d33;
      line-height: 25px;
    }
    .backimg {
      width: 18px;
      height: 18px;
      object-fit: cover;
    }
  }
  .brand {
    margin-top: 136px;
    .logo {
      width: 64px;
      height: 64px;
      margin-bottom: 16px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .brand_font {
      font-size: 23px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #292d33;
      line-height: 33px;
    }
  }
  // .logo {
  //   margin-top: 155px;
  //   width: 290px;
  // }
  .success {
    margin-top: 80px;
    width: 290px;
    height: 50px;
    background: linear-gradient(
      129deg,
      rgba(61, 193, 125, 1) 0%,
      rgba(61, 193, 125, 1) 100%
    );
    border: 0px;
    border-radius: 5px;
    font-size: 18px;

    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 50px;
  }
  .fail {
    margin-top: 25px;
    outline: none;
    width: 290px;
    height: 50px;
    border-radius: 5px;
    border: 2px solid #3dc17d;
    text-align: center;
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #3dc17d;
    line-height: 46px;
    box-sizing: border-box;
  }
}
// .title {
//   .titleDv {
//     width: 18px;
//   }
// }
// .temp {
//   padding: 0px;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   background: rgba(255, 255, 255, 1);

//   .logo {
//     margin-top: 155px;
//     width: 185px;
//     // height: 73.5px;
//   }
//   .success {
//     margin-top: 69px;
//     width: 290px;
//     height: 50px;
//     background: rgba(101, 81, 234, 1);
//     border: 0px;
//     border-radius: 25px;
//     // font-size: 18px;
//     font-family: PingFangSC-Medium, PingFang SC;
//     font-weight: 500;
//     color: rgba(255, 255, 255, 1);
//     line-height: 50px;
//   }
//   .fail {
//     margin-top: 20px;
//     width: 290px;
//     height: 50px;
//     border-radius: 25px;
//     border: 1.5px solid rgba(255, 87, 0, 1);
//     // font-size: 18px;
//     font-family: PingFangSC-Medium, PingFang SC;
//     font-weight: 500;
//     color: rgba(255, 87, 0, 1);
//     line-height: 50px;
//     background: rgba(255, 255, 255, 1);
//   }
// }
</style>
