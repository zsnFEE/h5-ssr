<template>
  <div class="body" v-title data-title="填写订单">
    <div class="backgroundColor"></div>
    <!-- <header>
      <div class="title title_box">
        <img
          @click="toBack"
          src="../../assets/img/ic_back.png"
          class="titleArrow title_arrow"
        />
        <div class="titleText title_text">填写订单</div>
        <div class="titleDv "></div>
      </div>
    </header> -->
    <body class="temp">
      <div class="addressBox" @click="toAddress">
        <div>
          <div
            class="adddressName"
            :class="addressIndex != -1 ? 'active' : ''"
            v-if="addressIndex == -1"
          >
            {{ customerName }}
          </div>
          <div
            class="adddressName"
            :class="addressIndex != -1 ? 'active' : ''"
            v-else
          >
            <div class="personalNameInfo">{{ name }}</div>

            <div>
              {{ tel.substr(0, 3) + "****" + tel.substr(7, 4) }}
            </div>
          </div>
          <div class="adddressText" :class="addressIndex != -1 ? 'active' : ''">
            {{ addressInfo }}
          </div>
        </div>
        <img src="../../../assets/img/btn_arrow_right.png" />
      </div>
      <div class="infoBox">
        <div class="infoTitle">订单信息</div>
        <div class="infoListBox">
          <div
            class="packageBox"
            :class="classInfo.length == 1 ? 'active' : ''"
            v-for="(item, index) in classInfo"
            :key="index"
          >
            <div class="classInfoTitle">
              {{ item.name }}
            </div>
            <div class="infoClassBox">
              <div class="infoClassImg">
                <!-- <img
                  v-show="classType == 2"
                  class="classImg"
                  :src="item.url"
                  alt
                /> -->
              </div>
              <ul class="infoClassName">
                <li>创意美术课2节</li>
                <li>配套随材礼包1盒</li>
              </ul>
            </div>
            <div class="infoList">
              <div class="infoListName">课程原价：</div>
              <div class="infoListData">
                ￥266.00
              </div>
            </div>
            <div class="infoList" v-show="!item.price">
              <div class="infoListName">礼盒金额：</div>
              <div class="infoListData">￥69.90</div>
            </div>
          </div>
          <div class="infoList">
            <div class="infoListName">优惠金额：</div>
            <div class="infoListData">-￥326.00</div>
          </div>
          <div class="infoList" style="margin: 0">
            <div class="infoListName">总金额：</div>
            <div class="infoListData" style="color:rgba(255,87,0,1)">
              ￥9.90
            </div>
          </div>
        </div>
      </div>
      <div class="payBox" v-show="!weChatFlag">
        <div class="payTitle">支付方式</div>
        <div class="payOptionBox">
          <div
            class="payOneBox"
            v-for="(items, index) in payList"
            :key="index"
            @click="addImg(index)"
            :class="payIndex == index ? 'active' : ''"
            v-show="!weChatFlag"
          >
            <img :src="items.imgsrc" class="payIcon" />
            <div class="payTitle">{{ items.name }}</div>
          </div>
        </div>
      </div>
    </body>
    <div ref="aliPag" class="aliPag"></div>
    <div class="placeOrder">
      <div class="moneyBox">
        <div class="moneyText">
          ￥9.90
        </div>
        <div class="moneyTips">
          优惠已减326.00
        </div>
      </div>
      <button @click="confirm" class="buttonDv">立即支付</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import wechat from "../../../assets/img/ic_wechat.png";
import alipay from "../../../assets/img/ic_alipay.png";

import {
  getClassInfo,
  postCreate,
  getGoods,
  getMyAddress,
  aiPay,
  getExperienceGoods
} from "../../../api/common";

export default {
  data() {
    return {
      apiSite: process.env.VUE_APP_BASEURL,
      classInfo: [],
      tel: "",
      payList: [
        { name: "微信支付", imgsrc: wechat },
        { name: "支付宝支付", imgsrc: alipay }
      ],
      payIndex: 0,
      isBlanced: true,
      // access_token: "",
      customerName: "添加收货地址",
      addressInfo: "教辅礼盒将在3-5个工作日内发货",
      addressIndex: -1,
      name: "",
      classType: "",
      weChatFlag: false,
      addressId: "",
      inter_goods: ""
    };
  },
  created() {
    this.classType = localStorage.getItem("classType");
    if (localStorage.getItem("classType") == 1) {
      getGoods({
        stage: localStorage.getItem("type"),
        tag: localStorage.getItem("levelId")
      }).then(res => {
        if (res.code == 0) {
          this.classInfo = res.data;
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    } else if (localStorage.getItem("classType") == 0) {
      getExperienceGoods({
        tag: {
          "3-5": "s1",
          "5-7": "s2",
          "7-9": "s3"
        }[localStorage.getItem("levelName")]
      }).then(res => {
        if (res.code == 0) {
          this.inter_goods = res.data[0].id;
        } else {
          this.$toast(res.msg || res.message);
        }
      });
      this.classInfo[0] = {
        name:
          "猴猴画美术体验课" +
          localStorage.getItem("type") +
          " " +
          localStorage.getItem("levelName")
      };
    }

    getMyAddress().then(res => {
      if (res.code == 0) {
        if (res.data.length > 0) {
          if (this.$route.query.addressIndex != null) {
            this.addressIndex = this.$route.query.addressIndex;
          } else {
            this.addressIndex = 0;
          }
          this.name = res.data[this.addressIndex].name;
          this.tel = res.data[this.addressIndex].phone;
          this.customerName =
            res.data[this.addressIndex].name +
            " " +
            res.data[this.addressIndex].phone;
          this.addressInfo = res.data[this.addressIndex].address;
          this.addressId = res.data[this.addressIndex].id;
          localStorage.setItem("AddressIndex", this.addressIndex);
        }
      } else {
        this.$toast(res.msg || res.message);
      }
    });
  },
  mounted() {
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf("micromessenger") != -1;
    if (isWeixin) {
      this.weChatFlag = true;
    } else {
      this.weChatFlag = false;
    }
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
    //     this.$toast(res.msg||res.message);
    //   }
    // });
  },
  methods: {
    toAddress() {
      if (this.addressIndex == -1) {
        this.$router.push({
          path: "/order/phone/writeAddressPhone",
          query: {
            addressIndex: -1,
            token: this.$route.query.token
          }
        });
      } else {
        this.$router.push({
          path: "/order/phone/choiceAddressPhone",
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
      if (this.addressIndex == -1) {
        this.$toast("请填写收货地址");
      } else {
        this.sendInfo();
      }
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
    handle(item) {
      let str = "";
      for (let i = 0; i < item.length; i++) {
        if (i == 0) {
          str = item[i].id;
        } else {
          str = str + "," + item[i].id;
        }
      }
      return str;
    },
    sendInfo() {
      let string = "";
      if (this.payIndex === 1) {
        string = "支付宝";
        if (localStorage.getItem("classType") == 1) {
          postCreate(
            {
              goods_id: this.handle(this.classInfo),
              gateway: 6,
              only_create: 1,
              tag: localStorage.getItem("levelName"),
              address_id: this.addressId,
              client_platform: localStorage.getItem("c")
                ? localStorage.getItem("c")
                : 2,
              upline_id: localStorage.getItem("s")
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
                redirect_type: 2
              }).then(res => {
                let aliForm = res.data;
                this.$refs.aliPag.innerHTML = aliForm;
                document.forms[0].submit();
              });
            } else if (res.code == 900002) {
              this.$toast(res.message);
            } else {
              this.$toast(res.msg || res.message);
            }
          });
        } else if (localStorage.getItem("classType") == 0) {
          let classInfo = JSON.parse(localStorage.classInfo);
          postCreate(
            {
              goods_id: this.inter_goods,
              class_id: classInfo.class_id,
              gateway: 6,
              only_create: 1,
              tag: localStorage.getItem("levelName"),
              address_id: this.addressId,
              client_platform: localStorage.getItem("c")
                ? localStorage.getItem("c")
                : 2,
              upline_id: localStorage.getItem("s")
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
                redirect_type: 2
              }).then(res => {
                let aliForm = res.data;
                this.$refs.aliPag.innerHTML = aliForm;
                document.forms[0].submit();
              });
            } else if (res.code == 900002) {
              this.$toast(res.message);
            } else {
              this.$toast(res.msg || res.message);
            }
          });
        }
      } else {
        string = "微信支付";
        if (localStorage.getItem("classType") == 1) {
          postCreate(
            {
              goods_id: this.handle(this.classInfo),
              tag: localStorage.getItem("levelName"),
              address_id: this.addressId,
              client_platform: localStorage.getItem("c")
                ? localStorage.getItem("c")
                : 2,
              upline_id: localStorage.getItem("s"),
              redirect_type: 4
            },
            {
              headers: { "X-AccessToken": this.$route.query.token }
            }
          ).then(res => {
            if (res.code == 0) {
              localStorage.setItem("order_id", res.order_id);
              if (this.weChatFlag) {
                window.location.href = `${this.apiSite}/mp/pay/index/${res.order_id}`;
              } else {
                window.location.href = `${this.apiSite}/fe/pay/wx_h5pay/${res.order_id}/4`;
              }
            } else {
              this.$toast(res.msg || res.message);
            }
          });
        } else if (localStorage.getItem("classType") == 0) {
          // receiver: this.name,
          //     phone: this.tel,
          //     address: this.addressInfo,
          let classInfo = JSON.parse(localStorage.classInfo);
          postCreate(
            {
              goods_id: this.inter_goods,
              class_id: classInfo.class_id,
              tag: localStorage.getItem("levelName"),

              address_id: this.addressId,
              client_platform: localStorage.getItem("c")
                ? localStorage.getItem("c")
                : 2,
              upline_id: localStorage.getItem("s"),
              redirect_type: 4
            },
            {
              headers: { "X-AccessToken": this.$route.query.token }
            }
          ).then(res => {
            if (res.code == 0) {
              localStorage.setItem("order_id", res.order_id);
              if (this.weChatFlag) {
                window.location.href = `${this.apiSite}/mp/pay/index/${res.order_id}`;
              } else {
                window.location.href = `${this.apiSite}/fe/pay/wx_h5pay/${res.order_id}/4`;
              }
            } else {
              this.$toast(res.msg || res.message);
            }
          });
        }
      }
    },
    addImg(index) {
      this.isBlanced = !this.isBlanced;
      this.payIndex = index;
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
  min-height: calc(100% - 146.5px);
  overflow-y: auto;
  padding-top: 15px;
  padding-bottom: 75px;
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
      display: flex;
      .personalNameInfo {
        word-wrap: break-word;
        max-width: 25vw;
        width: 25vw;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 15px;
      }
    }
    .adddressName.active {
      color: rgba(41, 45, 51, 1);
    }
    .adddressText {
      word-wrap: break-word;
      max-width: 75vw;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-top: 6px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(138, 143, 153, 1);
      line-height: 20px;
      word-wrap: break-word;
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
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 25px;
    }
    .infoListBox {
      width: calc(100% - 30px);
      .packageBox {
        border-bottom: 1.5px solid #f5f7fa;
        margin-bottom: 12px;
      }
      .packageBox.active {
        border-bottom: 0;
        margin-bottom: 0;
      }
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
          // background: rgba(242, 245, 250, 1);
          border-radius: 6px;
          margin-right: 30px;
          background: url(../../../assets/img/img_goods.png) no-repeat center
            center / cover;
          .classImg {
            min-width: 100%;
            height: 100%;
            border-radius: 6px;
            object-fit: cover;
          }
        }
        .infoClassImg.active {
          margin-right: 15px;
        }
        .infoClassName {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
          li {
            margin-bottom: 6px;
            list-style: outside;
          }
        }
      }
      .infoList {
        margin-bottom: 6px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .infoListName {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(138, 143, 153, 1);
          line-height: 20px;
          margin-right: 10px;
        }
        .infoListData {
          max-width: calc(100% - 80px);
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
        }
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
      font-size: 18px;
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
          font-size: 14px;
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
      font-size: 24px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(255, 87, 0, 1);
      line-height: 33.5px;
    }
    .moneyTips {
      margin-left: 6px;
      font-size: 14px;
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
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
