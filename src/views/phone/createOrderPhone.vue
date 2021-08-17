<template>
  <div class="body">
    <header>
      <div class="title">
        <img
          @click="toBack"
          src="../../assets/img/ic_back.png"
          class="titleArrow"
        />
        <div class="titleText">确认订单</div>
        <div class="titleDv"></div>
      </div>
    </header>
    <body class="temp">
      <div class="infoBox">
        <div class="infoTitle">订单信息</div>
        <div class="infoListBox">
          <div class="infoList">
            <div class="infoListName">课程名称：</div>
            <div class="infoListData">{{ classInfo.name }}</div>
          </div>
          <div class="infoList">
            <div class="infoListName">开课时间：</div>
            <div class="infoListData">{{ classInfo.start_time }}</div>
          </div>
          <div class="infoList" style="margin: 0">
            <div class="infoListName">授课教师：</div>
            <div class="infoListData">{{ classInfo.teacher_name }}</div>
          </div>
        </div>
      </div>
      <div class="payBox">
        <div class="payTitle">支付方式</div>
        <div class="payOptionBox">
          <div
            class="payOneBox"
            v-for="(items, index) in payList"
            :key="index"
            @click="addImg(index)"
            :class="payIndex == index ? 'active' : ''"
          >
            <img :src="items.imgsrc" class="payIcon" />
            <div class="payTitle">{{ items.name }}</div>
          </div>
        </div>
      </div>
      <div class="infoBox">
        <div class="infoTitle">结算</div>
        <div class="infoListBox">
          <div class="infoList">
            <div class="infoListName">课程原价：</div>
            <div class="infoListData">￥{{ classInfo.price }}</div>
          </div>
          <div class="infoList">
            <div class="infoListName">优惠金额：</div>
            <div class="infoListData">-￥0</div>
          </div>
          <div class="infoList" style="margin: 0">
            <div class="infoListName">总金额：</div>
            <div class="infoListData" style="color:rgba(255,87,0,1)">
              ￥{{ classInfo.price }}
            </div>
          </div>
        </div>
      </div>
    </body>
    <div class="placeOrder">
      <div class="moneyBox">
        <div class="moneyText">￥{{ classInfo.price }}</div>
        <div class="moneyTips">优惠已减0.00</div>
      </div>
      <button @click="confirm" class="buttonDv">立即支付</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import wechat from "../../assets/img/ic_wechat.png";
import alipay from "../../assets/img/ic_alipay.png";

import { getClassInfo, postCreate } from "../../api/common";

export default {
  data() {
    return {
      apiSite: process.env.VUE_APP_APISITE,
      classInfo: {},
      userAllInfo: {},
      code: "",
      tel: "",
      payList: [
        { name: "微信支付", imgsrc: wechat },
        { name: "支付宝支付", imgsrc: alipay }
      ],
      payIndex: 0,
      isBlanced: true,
      access_token: ""
    };
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

    localStorage.setItem("access_token", this.$route.query.token);
    getClassInfo({ class_id: this.$route.query.class_id }).then(res => {
      if (res.code == 0) {
        this.classInfo = res.data.class;
      } else {
        this.$toast(res.msg || res.message);
      }
    });
  },
  methods: {
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
      if (this.payIndex === 1) {
        string = "支付宝";
        postCreate(
          { goods_id: this.classInfo.goods_id, gateway: 6, only_create: 1 },
          { headers: { "X-AccessToken": this.$route.query.token } }
        ).then(res => {
          if (res.code == 0) {
            localStorage.setItem("order_id", res.order_id);
            window.location.href = `https://${this.apiSite}/api/order/alipay/${res.order_id}/0/wap/2`;
          } else {
            this.$toast(res.msg || res.message);
          }
        });
      } else {
        string = "微信支付";
        postCreate(
          { goods_id: this.classInfo.goods_id },
          { headers: { "X-AccessToken": this.$route.query.token } }
        ).then(res => {
          if (res.code == 0) {
            localStorage.setItem("order_id", res.order_id);
            window.location.href = `https://${this.apiSite}/fe/pay/wx_h5pay/${res.order_id}/2`;
          } else {
            this.$toast(res.msg || res.message);
          }
        });
      }
    },
    toBack() {
      this.$router.push({
        path: "/phone/courseDetailsPhone",
        query: {
          class_id: this.$route.query.class_id,
          token: this.$route.query.token
        }
      });
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
  position: fixed;
  display: flex;
  top: 0;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  background: #ffffff;
  .titleArrow {
    height: 18px;
    width: 18px;
    margin-top: 10.5px;
    margin-left: 16px;
  }
  .titleText {
    height: 29.5px;
    font-size: 21px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(42, 46, 51, 1);
    line-height: 29.5px;
    margin-top: 4.5px;
    margin-bottom: 8px;
  }
  .titleDv {
    height: 18px;
    width: 18px;
    margin-top: 10.5px;
    margin-right: 16px;
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
  background: linear-gradient(
    180deg,
    rgba(242, 245, 250, 1) 0%,
    rgba(250, 251, 253, 1) 100%
  );
  .infoBox {
    width: calc(100% - 45px);
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
      width: calc(100% - 40px);
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
          background: url(../../assets/img/img_goods.png) no-repeat center
            center / cover;
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
    width: calc(100% - 45px);
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
      margin-left: 20px;
      width: calc(100% - 40px);
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
      color: rgba(138, 143, 153, 1);
      line-height: 20px;
    }
  }
  .buttonDv {
    height: 100%;
    width: 34.66%;
    background: linear-gradient(
      129deg,
      rgba(255, 115, 0, 1) 0%,
      rgba(255, 85, 0, 1) 100%
    );
    border-radius: 0px 12px 0px 0px;
    border: 0;
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
