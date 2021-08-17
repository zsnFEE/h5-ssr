<template>
  <div>
    <!-- <header>
      <div class="title">
        <img
          @click="toBack"
          src="../../assets/img/ic_back.png"
          class="titleArrow"
        />
        <div class="titleText">订单</div>
        <div class="titleDv"></div>
      </div>
  </header>-->
    <body class="temp">
      <!-- <div class="address" @click="addAddress()" name="viewport">
      <div class="addressBox">
        <div
          class="addressText"
          :class="addressFlag ? 'active' : ''"
        >{{ `${!addressFlag ? "添加收获地址" : addressInfo}` }}</div>
        <div
          class="addressRemarks"
          :class="!addressFlag ? 'active' : ''"
        >{{ `${!addressFlag ? remarksInfo : addressName}` }}</div>
      </div>
      <img src="../../assets/img/btn_arrow_right.png" class="addressArrow" />
    </div>-->
      <div class="loginBox">
        <div class="orderTimeBox">
          <div class="orderTime">
            <div class="peopleText">仅剩{{ surplus }}名</div>
            <div class="tips">剩余优惠名额</div>
          </div>
          <div class="orderTime" style="border:0">
            <van-count-down :time="endTime" format="HH:mm:ss" />
            <div class="tips">剩余支付时间</div>
          </div>
        </div>
        <input
          type="text"
          class="telText"
          placeholder="请输入手机号"
          v-model="tel"
          maxlength="11"
          onkeyup="this.value=this.value.replace(/[^0-9-]+/,'');"
        />
        <div class="verificationBox">
          <input
            class="verification"
            type="text"
            placeholder="请输入验证码"
            v-model="code"
            maxlength="6"
            onkeyup="this.value=this.value.replace(/[^0-9-]+/,'');"
          />
          <button
            class="verificationButton"
            v-show="!count_flage"
            @click="getverification"
          >
            获取验证码
          </button>
          <div v-show="count_flage" class="count">{{ count_time }}秒</div>
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
            v-show="!weChatFlag"
          >
            <img :src="items.imgsrc" class="payIcon" />
            <div class="payTitle">{{ items.name }}</div>
          </div>
          <div
            class="payOneBox"
            :class="payIndex == 0 ? 'active' : ''"
            v-show="weChatFlag"
          >
            <img src="../../assets/img/ic_wechat.png" class="payIcon" />
            <div class="payTitle">微信支付</div>
          </div>
        </div>
      </div>
      <div class="infoBox">
        <div class="infoTitle">订单信息</div>
        <div class="infoListBox">
          <div class="classInfoTitle">
            {{ `猴猴画美术体验课S${Sid} （${type_id}）` }}
          </div>
          <div class="infoClassBox">
            <div class="infoClassImg"></div>
            <!-- <div class="infoClassName">{{ classInfo.name }}</div> -->
            <!-- <div class="infoClassName">
              猴猴画创意美术课2节+猴猴画定制礼盒1个
          </div>-->
            <ul class="infoClassName">
              <li>创意美术课2节</li>
              <li>配套随材礼包1盒</li>
            </ul>
          </div>
          <div class="infoList">
            <div class="infoListName">课程原价：</div>
            <!-- <div class="infoListData">{{ classInfo.start_date }}</div> -->
            <div class="infoListData">￥266.00</div>
          </div>
          <div class="infoList">
            <div class="infoListName">礼盒金额：</div>
            <!-- <div class="infoListData">{{ classInfo.teacher_name }}</div> -->
            <div class="infoListData">￥69.90</div>
          </div>
          <div class="infoList">
            <div class="infoListName">优惠金额：</div>
            <!-- <div class="infoListData">{{ `¥${classInfo.price}` }}</div> -->
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
    </body>
    <div class="placeOrder">
      <div class="moneyBox">
        <div class="moneyText">￥9.90</div>
        <div class="moneyTips">优惠已减326.00</div>
      </div>
      <button @click="confirm" class="buttonDv">立即支付</button>
    </div>
    <div class="mask" v-show="!flag"></div>
  </div>
</template>

<script>
import axios from "axios";
import wechat from "../../assets/img/ic_wechat.png";
import alipay from "../../assets/img/ic_alipay.png";

import {
  getLoginSms,
  getPhoneLogin,
  getJssdkConfig,
  getOpenid,
  getJspay
} from "../../api/common";
import { log } from "util";
import wx from "weixin-js-sdk";

export default {
  data() {
    return {
      Sid: "",
      type_id: "",
      apiSite: process.env.VUE_APP_APISITE
        ? process.env.VUE_APP_APISITE
        : "api.houhouhua.com", // apiSite: "api.houhouhua.com",
      fileSite: "api.houhouhua.com",
      apiYoudaotiSite: "api.youdaoti.cn",
      apiHouhouhuaSite: "api.houhouhua.com",
      fileHouhouthuaSite: "api.houhouhua.com",
      fileYoudaotiSite: "api.youdaoti.cn/static/dist",
      groupingFlag: false,
      endTime: "",
      surplus: "",
      classInfo: {},
      userAllInfo: {},
      addressFlag: false,
      addressInfo: "",
      remarksInfo: "",
      addressName: "",
      userInfo: [],
      code: "",
      tel: "",
      count_time: "",
      count_flage: false,
      timer: null,
      flag: false,
      Tcode: false,
      dataInfo: {
        price: "￥ 9.90",
        name: "猴猴画创意美术课2节+猴猴画定制礼盒",
        date: "7月4日",
        teacherName: "李鹏飞"
      },
      payList: [
        { name: "微信支付", imgsrc: wechat },
        { name: "支付宝支付", imgsrc: alipay }
      ],
      payIndex: 0,
      isBlanced: true,
      access_token: "",
      refresh_token: "",
      weChatFlag: false
      // weChatCode:'',
      // openid:''
    };
  },
  created() {
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf("micromessenger") != -1;
    if (isWeixin) {
      this.weChatFlag = true;
    } else {
      this.weChatFlag = false;
    }

    this.Sid = this.$route.query.Sid;
    if (this.$route.query.type == "7-9") {
      this.type_id = "7-10周岁";
    } else {
      this.type_id = this.$route.query.type + "周岁";
    }
    //倒计时
    var grouping = this.$route.query.type;
    localStorage.setItem("type_id", grouping);
    var count_Down = localStorage.getItem("count_Down" + grouping);
    if (count_Down == null || count_Down == "") {
      localStorage.setItem(
        "count_Down" + grouping,
        Math.round(new Date() / 1000) + 900
      );
      count_Down = localStorage.getItem("count_Down" + grouping);
      this.endTime = (count_Down - Math.round(new Date() / 1000)) * 1000;
    } else {
      if (count_Down > Math.round(new Date() / 1000)) {
        this.endTime = (count_Down - Math.round(new Date() / 1000)) * 1000;
      } else {
        localStorage.setItem("count_Down" + grouping, "");
        this.$router.push({
          path: "/landingPage",
          query: {
            token: this.$route.query.token
          }
        });
      }
    }

    //剩余数量
    var surplus_loc = localStorage.getItem("surplus_loc" + grouping);
    var surplus_time = localStorage.getItem("surplus_time" + grouping);
    if (surplus_loc == null || surplus_time == null) {
      localStorage.setItem(
        "surplus_loc" + grouping,
        Math.ceil(Math.random() * (15 - 13) + 13)
      );
      localStorage.setItem(
        "surplus_time" + grouping,
        Math.round(new Date() / 1000)
      );
      surplus_loc = localStorage.getItem("surplus_loc" + grouping);
      surplus_time = localStorage.getItem("surplus_time" + grouping);
    }
    var calculation = (Math.round(new Date() / 1000) - surplus_time) / 86400;
    if (Math.floor(calculation) > 0) {
      var num = Math.ceil(Math.random() * 2);
      var min = 4;
      if (grouping == "7-9") {
        min = 3;
      } else if (grouping == "3-5") {
        min = 5;
      }
      if (surplus_loc - num < min) {
        this.surplus = surplus_loc;
        localStorage.setItem(
          "surplus_time" + grouping,
          Math.round(new Date() / 1000)
        );
      } else {
        localStorage.setItem("surplus_loc" + grouping, surplus_loc - num);
        localStorage.setItem(
          "surplus_time" + grouping,
          Math.round(new Date() / 1000)
        );
        surplus_loc = localStorage.getItem("surplus_loc" + grouping);
        this.surplus = surplus_loc;
      }
    } else {
      this.surplus = surplus_loc;
    }
  },
  mounted() {
    // setTimeout(function() {
    //   window.scrollTo(0, 35);
    // }, 0);
    // setTimeout(function() {
    //   window.scrollTo(0, 30);
    // }, 0);

    // document.getElementsByTagName("body")[0].scrollIntoView();
    // document.getElementsByTagName("body").scrollIntoView();
    // window.scrollTo(0, 0);

    // 获取微信支付授权
    // if(this.weChatFlag){
    //   let local = window.location.href;
    //   let APIs = ['chooseWXPay'];
    //   getJssdkConfig({"apis": APIs,"url": local}).then(res =>{
    //     if(res.data){
    //       let origin =  location.href;
    //       let urlNow =encodeURIComponent(origin);
    //       var wxcode = this.GetQueryString("code")
    //       if(wxcode === null || wxcode === ''){
    //         window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+res.data.appId+"&redirect_uri="+urlNow+"&response_type=code&scope=snsapi_base#wechat_redirect"
    //       } else{
    //         axios
    //           .get(
    //             `https://${this.apiSite}/api/mp/xcode/${wxcode}/1`,
    //           )
    //           .then(res => {
    //             if(res.data.code == 0){
    //               this.openid = res.data.data.openid;
    //             }
    //             else{
    //               this.$toast(res.data.message);
    //             }

    //           });
    //       }
    //       wx.config({
    //         debug: res.data.debug,
    //         appId: res.data.appId,
    //         timestamp: res.data.timestamp,
    //         nonceStr: res.data.nonceStr,
    //         signature: res.data.signature,
    //         jsApiList: res.data.jsApiList
    //       });
    //       wx.ready(function () {
    //         console.log('ready接口处理成功验证')
    //       });
    //       wx.error(function (res) {
    //         this.$toast(res);
    //       });
    //     } else{
    //       this.$toast(res.message);
    //     }
    //   });
    // }

    this.tel = "";
    this.code = "";
    // console.log(2, this.tel, "3", this.code, "4");
    this.classInfo = JSON.parse(localStorage.classInfo);
    if (this.userAllInfo) {
      this.addressFlag = true;
      this.addressInfo = this.userAllInfo.address;
      this.addressName =
        this.userAllInfo.nameInfo + " " + this.userAllInfo.telInfo;
    } else {
      if (this.$route.query.addFlag === true) {
        this.addressFlag = true;
        this.addressInfo = this.$route.query.address;
        this.addressName =
          this.$route.query.nameInfo + " " + this.$route.query.telInfo;
        this.userInfo = {
          name: this.$route.query.nameInfo,
          tel: this.$route.query.telInfo,
          address: this.$route.query.address
        };
      }
    }
  },
  watch: {
    code(val) {
      if (val.length === 6 && this.Tcode) {
        getPhoneLogin({
          dis_id: this.$route.query.dis_id,
          phone: this.tel,
          code: this.code
        }).then(res => {
          if (res.code == 0) {
            var grouping = this.$route.query.type || localStorage.type;
            var count_Down = localStorage.getItem("count_Down" + grouping);
            var surplus_loc = localStorage.getItem("surplus_loc" + grouping);

            if (count_Down < Math.round(new Date() / 1000)) {
              this.$toast("订单已超时，请刷新页面");
            } else if (surplus_loc <= 0) {
              this.$toast("名额已满");
            } else {
              this.$toast("验证码正确");
              this.userAllInfo = res.data.member;
              this.refresh_token = res.data.refresh_token;
              // console.log(res);
              document.cookie =
                "bd_access_token" +
                "=" +
                res.data.access_token +
                "; domain=" +
                this.GetCookieDomain() +
                "; path=/";
              document.cookie =
                "bd_access_token" +
                "=" +
                res.data.access_token +
                "; domain=" +
                ".houhouhua.com" +
                "; path=/";
              // console.log(document.cookie, res.data.access_token);
              // document.cookie = `bd_access_token=${res.data.access_token}`;
              localStorage.setItem("access_token", res.data.access_token);
              this.access_token = res.data.access_token;
              this.flag = true;
            }
          } else {
            // console.log(res);
            this.$toast(res.msg);
          }
        });
      }
    }
  },

  methods: {
    GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      var context = "";
      if (r != null) context = r[2];
      reg = null;
      r = null;
      return context == null || context == "" || context == "undefined"
        ? ""
        : context;
    },
    GetCookieDomain() {
      var host = location.hostname;
      var ip = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
      if (ip.test(host) === true || host === "localhost") return host;
      var regex = /([^]*).*/;
      var match = host.match(regex);
      if (typeof match !== "undefined" && null !== match) host = match[1];
      if (typeof host !== "undefined" && null !== host) {
        var strAry = host.split(".");
        if (strAry.length > 1) {
          host = strAry[strAry.length - 2] + "." + strAry[strAry.length - 1];
        }
      }
      return "." + host;
    },
    confirm() {
      window.onpageshow = null;
      window.onpageshow = function(event) {
        location.reload();
      };

      var grouping = this.classInfo.type || this.$route.query.type;
      var count_Down = localStorage.getItem("count_Down" + grouping);
      var surplus_loc = localStorage.getItem("surplus_loc" + grouping);

      if (count_Down < Math.round(new Date() / 1000)) {
        this.$toast("订单已超时，请重新下单");
        localStorage.setItem("count_Down" + grouping, "");
        this.$router.push({
          path: "/landingPage",
          query: {
            token: this.$route.query.token
          }
        });
      } else if (surplus_loc <= 0) {
        this.$toast("名额已满");
      } else {
        this.sendInfo();
      }
    },
    sendInfo() {
      // if (this.isBlanced === !true) {
      //   this.$toast("请选择支付方式");
      // } else {
      let string = "";
      if (this.payIndex === 1) {
        string = "支付宝";
        let GOODS_ID = 1;
        axios
          .get(
            `https://${this.apiSite}/api/order/create?goods_id=${
              this.classInfo.goods_id
            }&gateway=6&tag=${this.$route.query.type}&class_id=${
              this.$route.query.class_id
            }&only_create=1&client_platform=1&dis_id=${
              this.$route.query.dis_id ? this.$route.query.dis_id : 0
            }&link=${this.$route.query.uri}`,
            {
              headers: {
                "X-AccessToken": localStorage.access_token
              }
            }
          )
          .then(res => {
            if (res.data.code == 0) {
              // axios
              //   .get(
              //     `https://${this.apiSite}/api/order/alipay/${res.data.order_id}/0/wap/1/1`,
              //     {
              //       headers: {
              //         "X-AccessToken": this.access_token
              //       }
              //     }
              //   )
              //   .then(res => {
              //     console.log(res.data.data);
              //   });
              // console.log(res.data);
              localStorage.setItem("order_id", res.data.order_id);
              window.location.href = `https://${this.apiSite}/api/order/alipay/${res.data.order_id}/0/wap/1`;
              // window.location.href = `https://${this.apiSite}/api/order/alipay/${res.data.order_id}/0/wap/1/1`;
            } else {
              this.$toast(res.data.msg);
            }
          });

        // window.location.href = `https://api.youdaoti.cn/api/order/alipay/order_id${}/uid/trade_type/redirect_url?goods_id=${

        // https://api.youdaoti.cn/api/quickapp/uget/bf394847d2f745bbb2e370e1ffb47650
        //https://xiaotian.beidouclass.cn/api/quickapp/get_page_data/14
      } else {
        string = "微信支付";
        if (this.weChatFlag) {
          axios
            .get(
              `https://${this.apiSite}/api/order/create?goods_id=${
                this.classInfo.goods_id
              }&gateway=1&tag=${this.$route.query.type}&class_id=${
                this.$route.query.class_id
              }&only_create=1&client_platform=0&redirect_type=1&dis_id=${
                this.$route.query.dis_id ? this.$route.query.dis_id : 0
              }&link=${this.$route.query.uri}`,
              {
                headers: {
                  "X-AccessToken": localStorage.access_token
                }
              }
            )
            .then(res => {
              if (res.data.code == 0) {
                localStorage.setItem("order_id", res.data.order_id);
                window.location.href = `https://${this.apiSite}/mp/pay/index/${res.data.order_id}`;
                // axios
                //   .get(
                //     `https://${this.apiSite}/api/mp/jspay/${res.data.order_id}/${this.openid}`,
                //   )
                //   .then(res => {
                //     console.log(res)
                //     wx.chooseWXPay({
                //       timestamp: res.data.timeStamp,
                //       nonceStr: res.data.nonceStr,
                //       package: res.data.package,
                //       signType: res.data.signType,
                //       paySign: res.data.paySign,
                //       appId: res.data.appId,
                //       success: function (r) {
                //         if (r.errMsg == "chooseWXPay:ok") {
                //           alert('支付成功')
                //       　} else {
                //           alert('支付失败')
                //         }
                //   　　},
                //   　　cancel: function(r) {
                //         alert('取消支付')
                //       }
                //     });
                //   });
              } else {
                this.$toast(res.data.msg);
              }
            });
        } else {
          axios
            .get(
              `https://${this.apiSite}/api/order/create?goods_id=${
                this.classInfo.goods_id
              }&gateway=1&tag=${this.$route.query.type}&class_id=${
                this.$route.query.class_id
              }&only_create=1&client_platform=1&dis_id=${
                this.$route.query.dis_id ? this.$route.query.dis_id : 0
              }&link=${this.$route.query.uri}`,
              {
                headers: {
                  "X-AccessToken": localStorage.access_token
                }
              }
            )
            .then(res => {
              // console.log(res.data.order_id);
              if (res.data.code == 0) {
                localStorage.setItem("order_id", res.data.order_id);
                window.location.href = `https://${this.apiSite}/fe/pay/wx_h5pay/${res.data.order_id}/1`;
              } else {
                this.$toast(res.data.msg);
              }
              // localStorage.classInfo = {};
            });
        }
      }
    },
    toBack() {
      this.$router.push({
        path: "/landingPage",
        query: {
          dis_id: this.$route.query.dis_id,
          platform_id: this.$route.query.platform_id,
          class_id: this.$route.query.class_id,
          token: this.$route.query.token
        }
      });
    },
    addAddress() {
      this.$router.push({
        path: "/order/addAddress",
        query: {
          dis_id: this.$route.query.dis_id,
          platform_id: this.$route.query.platform_id,
          token: this.$route.query.token
        }
      });
    },
    addImg(index) {
      this.isBlanced = !this.isBlanced;
      this.payIndex = index;
    },
    getverification() {
      if (!(this.tel && /^1[3456789]\d{9}$/.test(this.tel))) {
        this.$toast("请输入正确的手机号码");
      } else {
        this.getTrueCode();
        this.countDown();
      }
    },
    countDown() {
      var TIME_COUNT = 60;
      if (!this.timer) {
        this.count_time = TIME_COUNT;
        this.count_flage = true;
        this.timer = setInterval(() => {
          if (this.count_time > 0 || this.count < TIME_COUNT + 1) {
            this.count_time--;
          } else {
            clearInterval(this.timer);
            this.timer = null;
            this.count_flage = false;
          }
        }, 1000);
      }
    },
    getTrueCode() {
      getLoginSms({ use: "login", phone: this.tel }).then(res => {
        if (res.code == 0) {
          this.Tcode = true;
        } else {
          this.Tcode = false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-transition-delay: 99999s;
    -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
  }
  position: fixed;
  display: flex;
  top: 0;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  background: rgba(242, 245, 250, 1);
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
    margin-bottom: 4.5px;
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
  overflow-y: auto;
  padding-top: 18.5px;
  padding-bottom: 93px;
  background: linear-gradient(
    180deg,
    rgba(242, 245, 250, 1) 0%,
    rgba(250, 251, 253, 1) 100%
  );
  .loginBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100% - 40px);
    margin-bottom: 12px;
    background: rgba(255, 255, 255, 1);
    border-radius: 12px;
    padding-bottom: 23.5px;
    .orderTimeBox {
      width: calc(100% - 40px);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 27.5px;
      margin-bottom: 30px;
      align-items: center;
      .orderTime {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50%;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(138, 143, 153, 1);
        line-height: 16.5px;
        border-right: 0.5px solid #b8bfcc;
        .tips {
          margin-top: 3px;
        }
        .van-count-down {
          font-size: 23px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(255, 87, 0, 1);
          line-height: 32.5px;
        }
        .peopleText {
          font-size: 23px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(255, 87, 0, 1);
          line-height: 32.5px;
        }
      }
    }
    .telText {
      width: calc(100% - 70px);
      border: 1.5px solid rgba(243, 244, 251, 1);
      border-radius: 6px;
      line-height: 45px;
      padding: 12.5px 15px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      line-height: 20px;
      -webkit-appearance: none;
    }
    input::-webkit-input-placeholder {
      /* WebKit browsers */
      color: rgba(184, 191, 204, 1);
      font-weight: 500;
    }
    .verificationBox {
      margin-top: 12px;
      width: calc(100% - 70px);
      height: 45px;
      border-radius: 6px;
      border: 1.5px solid rgba(243, 244, 251, 1);
      padding-left: 15px;
      padding-right: 15px;
      display: flex;
      flex-direction: r;
      justify-content: space-between;
      align-items: center;
      .verification {
        font-weight: 500;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        // font-weight: 400;
        color: black;
        line-height: 20px;
        border: 0px;
        width: 100px;
        -webkit-appearance: none;
      }
      .verificationButton {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 87, 0, 1);
        line-height: 20px;
        padding: 0px;
        border: 0px;
        // padding-left: 20px;
        // padding-right: 20px;
        display: flex;
        // flex-direction: r;
        justify-content: space-between;
        align-items: center;
        background: rgba(255, 255, 255, 1);
      }
      .count {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 400;
        line-height: 20px;
        color: rgba(184, 191, 204, 1);
      }
    }
  }
  .address {
    width: calc(100% - 30px);
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: 0.5px solid;
    border-bottom-color: rgba(218, 227, 242, 1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .addressBox {
      //   height: 51px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .addressText {
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 87, 0, 1);
        line-height: 25px;
      }
      .addressText.active {
        // height: 25px;
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 25px;
      }
      .addressRemarks {
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(138, 143, 153, 1);
        line-height: 20px;
      }
      .addressRemarks.active {
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 20px;
      }
    }
    .addressArrow {
      width: 5px;
      height: 10px;
    }
  }
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
.mask {
  border-radius: 0px 12px 0px 0px;
  position: fixed;
  bottom: 0;
  right: 0;
  height: 75px;
  width: 34.66%;
  background: white;
  z-index: 2;
  opacity: 0.5;
}
// .subButton {
//   position: fixed;
//   bottom: 0;
//   height: 57px;
//   width: 100%;
//   border: 0px;
//   background: linear-gradient(
//     129deg,
//     rgba(255, 115, 0, 1) 0%,
//     rgba(255, 85, 0, 1) 100%
//   );
//   display: flex;
//   justify-content: center;
//   font-size: 18px;
//   font-family: PingFangSC-Semibold, PingFang SC;
//   font-weight: 600;
//   color: rgba(255, 255, 255, 1);
//   line-height: 57px;
//   padding: 0px;
// }
</style>
