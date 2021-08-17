<template>
  <div class="body">
    <div class="backgroundColor"></div>
    <header>
      <div class="title title_box">
        <img
          @click="toBack"
          src="../../assets/img/ic_back.png"
          class="titleArrow title_arrow"
        />
        <div class="titleText title_text">填写订单</div>
        <div class="titleDv "></div>
      </div>
    </header>
    <body class="temp">
      <div class="infoBox">
        <div class="infoTitle ft18">订单信息</div>
        <div class="infoListBox">
          <div class="infoClassBox">
            <img
              v-if="classDetail.goods"
              class="infoClassImg"
              :src="`${classDetail.goods.cdn}${classDetail.goods.logo}`"
              alt=""
            />
            <!-- <div class="infoClassImg"></div> -->
            <ul class="infoClassName ft14" v-if="classDetail.goods">
              <li>{{ classDetail.goods.name }}</li>
            </ul>
          </div>
          <div class="infoList">
            <div class="infoListName ft14">商品原价：</div>
            <div class="infoListData ft14">
              ￥
              {{
                classDetail && classDetail.goods && classDetail.goods.old_price
              }}
            </div>
          </div>
          <!-- <div class="infoList" v-show="!classInfo.price">
            <div class="infoListName ft14">礼盒金额：</div>
            <div class="infoListData ft14">￥69.90</div>
          </div>
          <div class="infoList" v-show="!classInfo.price">
            <div class="infoListName ft14">优惠金额：</div>
            <div class="infoListData ft14">-￥326.00</div>
          </div> -->
          <div class="infoList" style="margin: 0">
            <div class="infoListName ft14">总金额：</div>
            <div class="infoListData ft14" style="color:rgba(255,87,0,1)">
              ￥
              {{ classDetail && classDetail.goods && classDetail.goods.price }}
            </div>
          </div>
        </div>
      </div>
      <div class="couponBox" @click="toUseCoupon">
        <span class="ft18">优惠券</span>
        <div class="couponTips ft14">
          <span v-if="numDiscount == 0">无可用的优惠券</span>
          <span v-else-if="countId > 0"> {{ `-￥${minus.toFixed(2)}` }}</span>
          <span v-else>有{{ numDiscount }}张可用优惠券</span>
          <img src="../../assets/img/btn_arrow_right.png" />
        </div>
      </div>

      <div class="payBox">
        <div class="payTitle ft18">支付方式</div>
        <div class="payOptionBox">
          <div
            class="payOneBox"
            v-for="items in payList"
            :key="items.id"
            @click="addImg(items.id)"
            :class="payIndex == items.id ? 'active' : ''"
          >
            <img :src="items.imgsrc" class="payIcon" />
            <div class="payTitle ft14">{{ items.name }}</div>
          </div>
        </div>
      </div>
    </body>
    <div ref="aliPag" class="aliPag"></div>
    <div class="placeOrder">
      <div class="moneyBox">
        <div class="moneyText ft24">
          ¥
          {{
            classDetail &&
              classDetail.goods &&
              `${algorithm(classDetail.goods.price, minus, -1).toFixed(2)}`
          }}
        </div>
        <div class="moneyTips ft14">
          {{
            countId > 0 ? `优惠已减${algorithm(0, minus, 1).toFixed(2)}` : ""
          }}
        </div>
      </div>
      <button @click="confirm" class="buttonDv ft18">立即支付</button>
    </div>
  </div>
</template>
<script>
import wechat from "../../assets/img/ic_wechat.png";
import alipay from "../../assets/img/ic_alipay.png";
import { isWeiXin, isAlipay } from "../../common/util";

import {
  getClssInfomation,
  getClassInfo,
  postCreate,
  getGoods,
  getMyAddress,
  aiPay,
  wxPay,
  getSmallClassDetail,
  useuserCoupon
} from "../../api/common";

export default {
  data() {
    return {
      weixin: isWeiXin(),
      alipay: isAlipay(),
      classDetail: {},
      apiSite: process.env.VUE_APP_BASEURL,
      classInfo: {},
      tel: "",
      payList: [
        { id: 0, name: "微信支付", imgsrc: wechat },
        { id: 1, name: "支付宝支付", imgsrc: alipay }
      ],
      payIndex: 0,
      // isBlanced: true,
      // access_token: "",
      customerName: "添加收货地址",
      addressInfo: "教辅礼盒将在3-5个工作日内发货",
      addressIndex: -1,
      name: "",
      numDiscount: 0,
      countId: 0,
      minus: 0,
      couponClassId: 0
    };
  },
  created() {
    if (this.weixin) {
      this.payList = [{ id: 0, name: "微信支付", imgsrc: wechat }];
    } else if (this.alipay) {
      this.payList = [{ id: 1, name: "支付宝支付", imgsrc: alipay }];
      this.payIndex = 1;
    } else {
      this.payList = [
        { id: 0, name: "微信支付", imgsrc: wechat },
        { id: 1, name: "支付宝支付", imgsrc: alipay }
      ];
    }
    // localStorage.setItem("classType", this.$route.query.classType);
    // if (this.$route.query.classType == 1) {
    //   getGoods({
    //     stage: localStorage.getItem("type"),
    //     tag: localStorage.getItem("levelId")
    //   }).then(res => {
    //     if (res.code == 0) {
    //       this.classInfo = res.data;
    //     } else {
    //       this.$toast(res.msg);
    //     }
    //   });
    // } else if (this.$route.query.classType == 2) {
    //   this.classInfo = {
    //     name: localStorage.getItem("smallClassName"),
    //     id: localStorage.getItem("smallClassId"),
    //     price: localStorage.getItem("smallClassPrice"),
    //     oldPrice: localStorage.getItem("smallClassOldPrice"),
    //     logo: localStorage.getItem("imgUrl")
    //   };
    // }
    this.countId = localStorage.getItem("countId");
    getClssInfomation({ id: localStorage.smallClass }).then(res => {
      if (res.code == 0) {
        this.classDetail = res.data;
        useuserCoupon({ goods_id: this.classDetail.goods.id }).then(res => {
          if (res.code == 0) {
            this.numDiscount = res.data.ok.count;
            if (this.countId == 0) {
              localStorage.setItem("countId", res.data.minus_id);
              this.countId = res.data.minus_id;
            }
            if (this.countId > 0) {
              for (let i = 0; i < res.data.ok.count; i++) {
                if (this.countId == res.data.ok.data[i].user_id) {
                  this.minus = Number(res.data.ok.data[i].coupon_price_after);
                  this.couponClassId = res.data.ok.data[i].goods_id;
                }
              }
            }
          } else {
            // this.$toast(res.msg || res.message);
          }
        });
      } else {
        this.$toast(res.msg);
      }
    });
    // getMyAddress().then(res => {
    //   if (res.code == 0) {
    //     if (res.data.length > 0) {
    //       if (this.$route.query.addressIndex != null) {
    //         this.addressIndex = this.$route.query.addressIndex;
    //       } else {
    //         this.addressIndex = 0;
    //       }
    //       this.name = res.data[this.addressIndex].name;
    //       this.tel = res.data[this.addressIndex].phone;
    //       this.customerName =
    //         res.data[this.addressIndex].name +
    //         " " +
    //         res.data[this.addressIndex].phone;
    //       this.addressInfo = res.data[this.addressIndex].address;
    //       localStorage.setItem("AddressIndex", this.addressIndex);
    //     }
    //   } else {
    //     this.$toast(res.msg);
    //   }
    // });
  },
  mounted() {
    if (this.$route.query.token) {
      document.cookie =
        "bd_access_token" +
        "=" +
        this.$route.query.token +
        "; domain=" +
        this.GetCookieDomain() +
        "; path=/";
      document.cookie =
        "bd_access_token" +
        "=" +
        this.$route.query.token +
        "; domain=" +
        ".houhouhua.com" +
        "; path=/";
    }
    localStorage.setItem("WebpageId", -1);
    // localStorage.setItem("access_token", this.$route.query.token);
    // getClassInfo({ class_id: this.$route.query.class_id }).then(res => {
    //   if (res.code == 0) {
    //     this.classInfo = res.data.class;
    //   } else {
    //     this.$toast(res.msg);
    //   }
    // });
    let that = this;
    dsBridge.registerAsyn("goback", function(arg1, arg2, arg3) {
      that.toBack();
    });
  },
  methods: {
    algorithm(a, b, c) {
      return (
        Number(b.toString().replace(/\,/g, "")) *
          Number(c.toString().replace(/\,/g, "")) +
        Number(a.toString().replace(/\,/g, ""))
      );
    },

    toUseCoupon() {
      let goodsId = this.classDetail.goods.id;

      this.$router.push({
        path: "/phone/useCouponPhone",
        query: { token: this.$route.query.token, goodsId: goodsId }
      });
    },

    toAddress() {
      if (this.addressIndex == -1) {
        this.$router.push({
          path: "/phone/writeAddressPhone",
          query: {
            addressIndex: -1,
            token: this.$route.query.token
          }
        });
      } else {
        this.$router.push({
          path: "/phone/choiceAddressPhone",
          query: {
            addressIndex: this.addressIndex,
            token: this.$route.query.token
          }
        });
      }
    },
    confirm() {
      window.onpageshow = null;
      window.onpageshow = function(event) {
        location.reload();
      };
      this.sendInfo();
    },
    GetCookieDomain() {
      var host = location.hostname;
      var ip = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
      if (ip.test(host) === true || host === "localhost") return host;
      var regex = /([^]*).*/;
      var match = host.match(regex);
      if (typeof match !== "undefined" && match !== null) host = match[1];
      if (typeof host !== "undefined" && host !== null) {
        var strAry = host.split(".");
        if (strAry.length > 1) {
          host = strAry[strAry.length - 2] + "." + strAry[strAry.length - 1];
        }
      }
      return "." + host;
    },
    sendInfo() {
      let string = "";
      // if (this.$route.query.classType == 1) {
      //   if (this.payIndex === 1) {
      //     string = "支付宝";
      //     postCreate(
      //       {
      //         goods_id: this.classInfo.id,
      //         gateway: 6,
      //         only_create: 1,
      //         tag: localStorage.getItem("levelName"),
      //         client_platform: 2
      //       },

      //       {
      //         headers: {
      //           "X-AccessToken": this.$route.query.token
      //         }
      //       }
      //     ).then(res => {
      //       if (res.code == 0) {
      //         localStorage.setItem("order_id", res.order_id);
      //         aiPay({
      //           order_id: res.order_id,
      //           redirect_type: 1
      //         }).then(res => {
      //           let aliForm = res.data;
      //           this.$refs.aliPag.innerHTML = aliForm;
      //           document.forms[0].submit();
      //         });
      //         // `https://${this.apiSite}/api/order/alipay/${res.order_id}/0/wap/2/1`

      //         // window.location.href = `https://${this.apiSite}/api/order/alipay/${res.order_id}/0/wap/2`;
      //       } else if (res.code == 900002) {
      //         this.$toast(res.message);
      //       } else {
      //         this.$toast(res.msg);
      //       }
      //     });
      //   } else {
      //     string = "微信支付";
      //     postCreate(
      //       {
      //         goods_id: this.classInfo.id,
      //         tag: localStorage.getItem("levelName"),
      //         client_platform: 2
      //       },
      //       { headers: { "X-AccessToken": this.$route.query.token } }
      //     ).then(res => {
      //       if (res.code == 0) {
      //         localStorage.setItem("order_id", res.order_id);
      //         window.location.href = `${this.apiSite}/fe/pay/wx_h5pay/${res.order_id}/2`;
      //       } else {
      //         this.$toast(res.msg);
      //       }
      //     });
      //   }
      // } else if (this.$route.query.classType == 2) {

      // }
      if (this.payIndex === 1) {
        string = "支付宝";
        let string = "";
        let coupon_id = this.countId;
        let coupon_class_id = this.couponClassId;
        if (coupon_id <= 0) {
          coupon_id = 0;
          coupon_class_id = 0;
        }

        postCreate(
          {
            goods_id: this.classDetail.goods.id,
            gateway: 6,
            only_create: 1,
            client_platform: 1,
            coupon_id: coupon_id,
            coupon_class_id: coupon_class_id,
            secret_key: localStorage.getItem("secretKey")
          },

          {
            headers: {
              "X-AccessToken": this.$route.query.token
            }
          }
        ).then(res => {
          if (res.code == 0) {
            localStorage.setItem("order_id", res.order_id);
            aiPay({
              order_id: res.order_id,
              redirect_type: 1
            }).then(res => {
              localStorage.setItem("countId", 0);
              let aliForm = res.data;
              this.$refs.aliPag.innerHTML = aliForm;
              document.forms[0].submit();
            });
            // `https://${this.apiSite}/api/order/alipay/${res.order_id}/0/wap/2/1`

            // window.location.href = `https://${this.apiSite}/api/order/alipay/${res.order_id}/0/wap/2`;
          } else if (res.code == 900002) {
            this.$toast(res.message);
          } else {
            this.$toast(res.msg);
          }
        });
      } else {
        string = "微信支付";

        let coupon_id = this.countId;
        let coupon_class_id = this.couponClassId;
        if (coupon_id <= 0) {
          coupon_id = 0;
          coupon_class_id = 0;
        }

        postCreate(
          {
            goods_id: this.classDetail.goods.id,
            client_platform: isWeiXin() ? 0 : 1,
            coupon_id: coupon_id,
            coupon_class_id: coupon_class_id,
            gateway: 1,
            redirect_type: 1,
            secret_key: localStorage.getItem("secretKey")
          },
          { headers: { "X-AccessToken": this.$route.query.token } }
        ).then(res => {
          if (res.code == 0) {
            localStorage.setItem("countId", 0);
            localStorage.setItem("order_id", res.order_id);
            if (isWeiXin()) {
              window.location.href = `${this.apiSite}/mp/pay/index/${
                res.order_id
              }/${
                window.location.href.includes("?")
                  ? encodeURIComponent(window.location.href.split("?")[1])
                  : "gid=" + this.$route.query.gid
                  ? this.$route.query.gid
                  : localStorage.smallClass
              }`;
            } else {
              window.location.href = `${this.apiSite}/fe/pay/wx_h5pay/${res.order_id}/1`;
            }
          } else {
            this.$toast(res.msg);
          }
        });
        // }
      }
    },

    toBack() {
      localStorage.setItem("countId", 0);
      this.$router.push({
        path: "/lp",
        query: {
          token: this.$route.query.token,
          gid: localStorage.getItem("smallClass"),
          s: localStorage.getItem("secretKey")
        }
      });
    },

    addImg(index) {
      // this.isBlanced = !this.isBlanced;
      this.payIndex = index;
    }
  }
};
</script>

<style lang="less" scoped>
.title_box {
  align-items: center;
}
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
  min-height: calc(100% - 146.5px);
  overflow-y: auto;
  padding-top: 53.5px;
  padding-bottom: 93px;
  // background: linear-gradient(
  //   180deg,
  //   rgba(242, 245, 250, 1) 0%,
  //   rgba(250, 251, 253, 1) 100%
  // );
  .addressBox {
    background: rgba(255, 255, 255, 1);
    width: calc(100% - 60px);
    border-radius: 12px;
    margin-bottom: 15px;
    padding: 18px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .adddressName {
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(255, 115, 0, 1);
      line-height: 25px;
    }
    .adddressName.active {
      color: rgba(41, 45, 51, 1);
    }
    .adddressText {
      margin-top: 6px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(138, 143, 153, 1);
      line-height: 20px;
    }
    .adddressText.active {
      color: rgba(138, 143, 153, 1);
    }
    img {
      width: 7px;
      height: 12px;
      margin-left: 22px;
    }
  }
  .infoBox {
    width: calc(100% - 30px);
    background: rgba(255, 255, 255, 1);
    border-radius: 12px;
    padding-bottom: 17px;
    padding-top: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .infoTitle {
      width: calc(100% - 40px);
      margin-bottom: 15px;
      height: 25px;
      // font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 25px;
    }
    .infoListBox {
      width: calc(100% - 30px);
      .classInfoTitle {
        font-size: 14px;
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
        .infoClassImg {
          min-width: 100px;
          height: 60px;
          object-fit: cover;
          // background: rgba(242, 245, 250, 1);
          border-radius: 6px;
          margin-right: 15px;
          // background: url(../../assets/img/img_goods.png) no-repeat center
          //   center / cover;
        }
        .infoClassName {
          // font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
          li {
            margin-bottom: 6px;
            list-style-type: none;
          }
        }
      }
      .infoList {
        margin-bottom: 6px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .infoListName {
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
        }
      }
    }
  }
  .couponBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 60px);
    background: rgba(255, 255, 255, 1);
    border-radius: 12px;
    margin-top: 15px;
    padding: 18px 16px;
    span {
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #292d33;
      line-height: 25px;
    }
    .couponTips {
      display: flex;
      align-items: center;
      span {
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ff7300;
        line-height: 20px;
      }
      img {
        margin-left: 6px;
        width: 7px;
        height: 12px;
      }
    }
  }

  .payBox {
    width: calc(100% - 30px);
    background: rgba(255, 255, 255, 1);
    border-radius: 12px;
    margin-bottom: 15px;
    margin-top: 15px;
    padding: 18px 0px 22px 0px;
    .payTitle {
      margin-left: 20px;
      margin-bottom: 15px;
      // font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 25px;
    }
    .payOptionBox {
      margin-left: 15px;
      width: calc(100% - 30px);
      display: flex;
      justify-content: space-between;
      .payOneBox {
        height: 50px;
        width: calc(50% - 8px);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        border: 1.5px solid rgba(243, 244, 251, 1);
        .payIcon {
          width: 25px;
          height: 25px;
        }
        .payTitle {
          height: 20px;
          // font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
          margin-left: 12px;
          margin-top: 0px;
          margin-bottom: 0px;
        }
      }
      .payOneBox.active {
        border: 1.5px solid #ff5700;
      }
    }
  }
}
.aliPag {
  display: none;
}
.placeOrder {
  position: fixed;
  bottom: 0;
  height: 75px;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px -1px 25px 0px rgba(0, 0, 0, 0.1);
  border-radius: 12px 12px 0px 0px;
  display: flex;
  justify-content: space-between;
  .moneyBox {
    width: 63.34%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .moneyText {
      white-space: nowrap;
      // font-size: 24px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(255, 87, 0, 1);
      line-height: 33.5px;
    }
    .moneyTips {
      margin-left: 6px;
      // font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 87, 0, 1);
      line-height: 20px;
      width: 102px;
    }
  }
  .buttonDv {
    height: 100%;
    width: 34.66%;
    background: rgba(255, 115, 0, 1);
    border-radius: 0px 12px 0px 0px;
    border: 0;
    // font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
