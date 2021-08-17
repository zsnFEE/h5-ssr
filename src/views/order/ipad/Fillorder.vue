<template>
  <div class="fillorder">
    <div class="bgpc"></div>
    <!-- <div class="new_header" v-show="flag">
      <div class="back" @click="toBack">
        <img src="../../../assets/img/ic_back.png" />
      </div>
      <div class="new_font">填写订单</div>
    </div>
    <div class="header_pc" v-show="!flag">
      填写订单
    </div> -->
    <!--body部分开始-->
    <div class="fillorder_box">
      <!--添加收货地址部分开始-->
      <div class="add" @click="toAddress">
        <div class="add_font" :class="addressIndex != -1 ? 'add_active' : ''">
          <div class="address">
            <div class="span">{{ customerName }}</div>
            <div v-if="phone">
              {{ phone.substr(0, 3) + "****" + phone.substr(7, 4) }}
            </div>
          </div>
        </div>
        <div class="hint" :class="addressIndex != -1 ? 'hint_active' : ''">
          {{ addressInfo }}
        </div>
        <img src="../../../assets/img/btn_arrow.png" />
      </div>
      <!--添加收货地址部分结束-->
      <!--订单信息部分开始-->
      <div class="order_info">
        <div class="order_title">订单信息</div>
        <!--商品的循环列表-->
        <div
          v-for="(item, index) in classInfo"
          :key="index"
          :class="classInfo.length == 1 ? '' : 'classinfo'"
        >
          <div class="explain" v-show="Classtype != 2">{{ item.name }}</div>
          <!--图片和课程部分开始-->
          <div class="class_detail">
            <div class="img_detail">
              <img
                v-if="Classtype != 2"
                src="../../../assets/img/img_goods.png"
              />
              <img v-else :src="cdnlogo" />
            </div>
            <div class="detail_font" v-show="Classtype != 2">
              <div class="font" style="margin-bottom:6px;">
                <div class="dot"></div>
                <div class="after_font">创意美术课 2 节</div>
              </div>
              <div class="font">
                <div class="dot"></div>
                <div class="after_font">配套随材礼包 1 盒</div>
              </div>
            </div>
            <div class="detail_font" v-show="Classtype == 2">
              <div class="font" style="margin-bottom:6px;">
                <div class="after_font">{{ fillname }}</div>
              </div>
            </div>
          </div>
          <!--图片和课程部分结束-->
          <!-- 详细信息开始 -->
          <div class="info">
            <div class="info_name">课程原价：</div>
            <div class="info_con">
              ¥ {{ Classtype == 2 ? old_price : "266.00" }}
            </div>
          </div>
          <div class="info" v-if="Classtype != 2">
            <div class="info_name">礼盒价格：</div>
            <div class="info_con">¥ 69.90</div>
          </div>

          <!-- 详细信息结束 -->
        </div>
        <div class="info" v-if="Classtype != 2">
          <div class="info_name">优惠金额：</div>
          <div class="info_con">-¥ 326.00</div>
        </div>
        <div class="info">
          <div class="info_name">总金额：</div>
          <div class="info_price">¥ {{ price }}</div>
        </div>
      </div>
      <!--订单信息部分结束-->
      <!--支付方式部分开始-->
      <div class="pay">
        <div class="order_title">支付方式</div>
        <div class="pattern">
          <!-- 微信方式按钮 -->
          <div class="pay_box" @click="pay(1)">
            <div :class="Payclass == true ? 'wxpay' : 'alipay'">
              <div class="pay_img">
                <img src="../../../assets/img/ic_wechat.png" />
              </div>
              <div class="pay_font">微信支付</div>
            </div>
          </div>
          <!-- 支付宝方式按钮 -->
          <div class="pay_box" @click="pay(2)" v-if="!wechat">
            <div :class="Payclass == true ? 'alipay' : 'wxpay'">
              <div class="pay_img">
                <img src="../../../assets/img/ic_alipay.png" />
              </div>
              <div class="pay_font">支付宝支付</div>
            </div>
          </div>
        </div>
      </div>
      <div ref="aliPag" class="aliPag"></div>
      <!--支付方式部分结束-->
      <!--固定的部分开始-->
      <div class="bottom_btn">
        <div class="describe">
          <div class="price">¥ {{ price }}</div>
          <!-- <div class="price" v-else>¥ 9.90</div> -->
          <div class="font" v-if="!price">优惠已减326.00</div>
        </div>
        <div class="btn button_color" @click="toast">立即抢购</div>
      </div>
      <!--固定的部分结束-->
    </div>
    <!--弹出支付方式框部分开始-->
    <div class="paytoast" v-show="paytoast" @click.self="toast">
      <div class="payment">
        <div class="ment">
          <img
            v-if="use_pay == 1"
            src="../../../assets/img/ic_wechat_pay@2x.png"
          />
          <img v-else class="ic" src="../../../assets/img/ic_alipay@2x.png" />
        </div>
        <div class="remind" v-if="use_pay == 1">请使用微信扫码完成支付</div>
        <div class="remind" v-else>请使用支付宝扫码完成支付</div>
        <div class="pay_code">
          <img :src="code" />
        </div>
        <!--去app支付部分开始-->
        <div class="toapp" @click="goapp" v-show="flag">
          <div class="toapp_font" v-if="use_pay == 1">打开微信app支付</div>
          <div class="toapp_color" v-else>打开支付宝app支付</div>
          <div class="toapp_img">
            <img
              v-if="use_pay == 1"
              src="../../../assets/img/ic_arrow_green@2x.png"
            />
            <img v-else src="../../../assets/img/ic_arrow_blue@2x.png" />
          </div>
        </div>
        <!--去app支付部分结束-->
      </div>
    </div>
    <!--弹出支付方式框部分结束-->
    <!--body部分结束-->
  </div>
</template>
<script>
import env from "../../../config/env";

import { isMobile } from "../../../common/util";
import axios from "axios";

const URL = env.baseUrl;
import {
  getClassInfo,
  postCreate,
  getGoods,
  getMyAddress,
  aiPay,
  getCreat,
  Querystatus,
  getExperienceGoods
} from "../../../api/common";
export default {
  data() {
    return {
      use_pay: 1,
      Payclass: true,
      paytoast: false,
      classInfo: "",
      customerName: "添加收货地址",
      addressInfo: "教辅礼盒将在3-5个工作日内发货",
      addressIndex: -1,
      tel: "",
      name: "",
      code: "",
      timer: null,
      order_id: "",
      flag: isMobile(),
      goods_id: "",
      price: "",
      old_price: "",
      Classtype: "",
      cdnlogo: "",
      fillname: "",
      wechat: "",
      address_id: "",
      phone: ""
    };
  },
  created() {
    var type = localStorage.getItem("type");

    var levelId = localStorage.getItem("levelId");
    let old_price = localStorage.getItem("old_price");
    let cdnlogo = localStorage.getItem("cdnlogo");

    let goods_id = localStorage.getItem("goods_id");
    let price = localStorage.getItem("price");
    let fillname = localStorage.getItem("fillname");

    // 保存一个判断首页是哪个的字段在中间页用到
    var Classtype = localStorage.getItem("Classtype");
    this.Classtype = this.$route.query.Classtype;
    if (Classtype == 2) {
      this.classInfo = [{ name: fillname, price: price }];

      this.price = price;
      this.goods_id = goods_id;
      this.fillname = fillname;
      this.old_price = old_price;
      this.cdnlogo = cdnlogo;
    } else if (Classtype == 1) {
      this.price = "9.90";
      getGoods({
        stage: type,
        tag: levelId
      }).then(res => {
        if (res.code == 0) {
          // console.log(res.data);
          this.classInfo = res.data;
          this.goods_id = res.data
            .map((item, i) => {
              return item.id;
            })
            .join(",");
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    } else if (Classtype == 0) {
      this.price = "9.90";
      let type = localStorage.getItem("type");
      // console.log(type);
      if (type == "S1") {
        var tag = "3-5";
      } else if (type == "S2") {
        var tag = "5-7";
      } else if (type == "S3") {
        var tag = "7-9";
      }
      this.classInfo = [
        { name: `猴猴画美术体验课${type} ${tag}`, price: price }
      ];

      axios
        .get(`${URL}/api/quickapp/get_page_data/448`, {
          headers: {
            // "X-AccessToken": this.$route.query.token
          }
        })
        .then(res => {
          // console.log(res.data);
          this.goods_id = res.data.data.goods.id;
        });
      //获取goods的id
      getExperienceGoods({
        tag: {
          "3-5": "s1",
          "5-7": "s2",
          "7-9": "s3"
        }[tag]
      }).then(res => {
        this.goods_id = res.data[0].id;
      });
    }
    // 查看用户是否有收货地址
    getMyAddress().then(res => {
      if (res.code == 0) {
        if (res.data.length > 0) {
          if (this.$route.query.addressIndex != null) {
            this.addressIndex = this.$route.query.addressIndex;
            // if (this.$route.query.addressIndex == -1) {
            // 	this.addressIndex = 0;
            // }
          } else {
            this.addressIndex = 0;
          }
          this.address_id = res.data[this.addressIndex].id;
          this.name = res.data[this.addressIndex].name;
          this.tel = res.data[this.addressIndex].phone;
          this.customerName = res.data[this.addressIndex].name;
          this.phone = res.data[this.addressIndex].phone;
          this.addressInfo = res.data[this.addressIndex].address;
          localStorage.setItem("AddressIndex", this.addressIndex);
        }
      } else {
        this.$toast(res.msg || res.message);
      }
    });
  },
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.toBack();
    });
    localStorage.setItem("WebpageId", -1);
    var is_weixin = (function() {
      return navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
    })();
    if (is_weixin) {
      this.wechat = true;
    } else {
      this.wechat = false;
    }
  },
  methods: {
    // 添加收货地址
    toAddress() {
      let Classtype = localStorage.getItem("Classtype");
      if (this.addressIndex == -1) {
        this.$router.push({
          path: "../ipad/Shippingaddress",
          query: {
            addressIndex: -1,
            token: this.$route.query.token,
            Classtype: Classtype
          }
        });
      } else {
        this.$router.push({
          path: "../ipad/Selectaddress",
          query: {
            addressIndex: this.addressIndex,
            token: this.$route.query.token,
            Classtype: Classtype
          }
        });
      }
    },
    // 返回上一页
    toBack() {
      let Classtype = localStorage.getItem("Classtype");
      let classid = localStorage.getItem("classid");
      if (Classtype == 2) {
        // 从小课堂跳转过来的
        this.$router.push({
          path: "../ipad/Trialclass",
          query: {
            token: this.$route.query.token,
            id: classid,
            Classtype: Classtype
          }
        });
      } else if (Classtype == 1) {
        // 从系统课跳转过来的
        this.$router.push({
          path: "../ipad/Trialclass",
          query: {
            token: this.$route.query.token,
            Classtype: Classtype
          }
        });
      }
    },
    //支付方式切换
    pay(use) {
      if (use != this.use_pay) {
        this.Payclass = !this.Payclass;
        this.use_pay = use;
      }
    },
    toast() {
      let s = localStorage.getItem("type");
      let Classtype = localStorage.getItem("Classtype");
      if (Classtype == 2) {
        var tag = "";
      } else {
        if (s == "S1") {
          var tag = "3-5";
        } else if (s == "S2") {
          var tag = "5-7";
        } else if (s == "S3") {
          var tag = "7-9";
        }
      }

      if (this.addressIndex == -1) {
        this.$toast("请填写收货地址");
      } else {
        if (this.use_pay == 1) {
          clearTimeout(this.timer);
          // 微信支付
          getCreat({
            goods_id: this.goods_id,
            tag: tag,
            address_id: this.address_id,
            // receiver: this.name,
            // phone: this.tel,
            // address: this.addressInfo,
            client_platform: 2,
            gateway: 1,
            upline_id: localStorage.getItem("s")
          }).then(res => {
            this.order_id = res.order_id;
            localStorage.setItem("order_id", res.order_id);
            if (res.code == 0) {
              this.paytoast = !this.paytoast;
              // this.code = `${URL}/fe/pay/pay_wx_qr/${res.order_id}`;
              if (this.wechat) {
                window.location.href = `${URL}/mp/pay/index/${res.order_id}`;
              } else {
                this.code = `${URL}/fe/pay/pay_wx_qr/${res.order_id}`;
              }
              this.getStatus(res.order_id);
            } else {
              this.$toast(res.msg || res.message);
            }
          });
        } else if (this.use_pay == 2) {
          clearTimeout(this.timer);
          getCreat({
            gateway: 16,
            goods_id: this.goods_id,
            tag: tag,
            address_id: this.address_id,
            // receiver: this.name,
            // phone: this.tel,
            // address: this.addressInfo,
            client_platform: 2,
            upline_id: localStorage.getItem("s")
          }).then(res => {
            this.order_id = res.order_id;
            if (res.code == 0) {
              this.paytoast = !this.paytoast;
              this.code = `${URL}/fe/pay/pay_ali_qr/${res.order_id}`;
              this.getStatus(res.order_id);
            } else {
              this.$toast(res.msg || res.message);
            }
          });
        }
      }
    },
    // 查看接口状态
    getStatus(order) {
      let Classtype = localStorage.getItem("Classtype");
      const that = this;
      // 实现轮询
      this.timer = setTimeout(() => {
        Querystatus({ order_id: order }).then(res => {
          if (res.data.status == 1) {
            clearTimeout(this.timer);
            this.$toast("支付完成");
            this.$router.push({
              path: "../ipad/Signup",
              query: {
                order_id: order,
                token: this.$route.query.token,
                Classtype: Classtype
              }
            });
          } else {
            that.getStatus(that.order_id);
          }
        });
      }, 1000);
    },
    // 去app支付方法开始
    goapp() {
      let Classtype = localStorage.getItem("Classtype");
      let s = localStorage.getItem("type");
      if (Classtype == 2) {
        var tag = "";
      } else {
        if (s == "S1") {
          var tag = "3-5";
        } else if (s == "S2") {
          var tag = "5-7";
        } else if (s == "S3") {
          var tag = "7-9";
        }
      }
      if (this.addressIndex == -1) {
        this.$toast("请填写收货地址");
      } else {
        if (this.use_pay == 1) {
          // 去微信app支付
          // 微信支付
          getCreat({
            goods_id: this.goods_id,
            tag: tag,
            address_id: this.address_id,
            // receiver: this.name,
            // phone: this.tel,
            // address: this.addressInfo,
            client_platform: 2,
            gateway: 1
          }).then(res => {
            //保存订单id到本地
            if (res.code == 0) {
              // console.log(res);
              localStorage.setItem("order_id", res.order_id);
              // window.location.href = `${URL}/fe/pay/wx_h5pay/${res.order_id}/3`;
              let amount = this.price * 100;
              // console.log("价格am", amount);
              let data = {
                type: "iPad",
                orderNO: res.order_id,
                amount: amount
              };
              dsBridge.call("payment", JSON.stringify(data), function(v) {});
            } else {
              this.$toast(res.msg || res.message);
            }
          });
        } else if (this.use_pay == 2) {
          // 去支付宝app支付

          getCreat(
            {
              goods_id: this.goods_id,
              gateway: 6,
              only_create: 1,
              tag: tag,
              address_id: this.address_id,
              // receiver: this.name,
              // phone: this.tel,
              // address: this.addressInfo,
              client_platform: 2
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
      }
    }
    // 去app支付方法结束
  },
  watch: {
    paytoast() {
      if (this.paytoast == false) {
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
.fillorder {
  width: 100%;
  height: 100%;
  background: rgba(242, 245, 250, 1);
}
.fillorder_box {
  width: 100%;

  padding: 60px 8% 95px;
  background: rgba(242, 245, 250, 1);

  box-sizing: border-box;
}
// 添加收货地址部分开始
.add {
  padding: 18px 30px;
  background: #fff;
  position: relative;
  margin-bottom: 15px;
  cursor: pointer; /*鼠标悬停变小手*/
}
.add img {
  width: 7px;
  height: 12px;
  position: absolute;
  top: 37px;
  right: 30px;
}
.add_font {
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(255, 115, 0, 1);
}
.hint {
  margin-top: 6px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(138, 143, 153, 1);
  word-wrap: break-word;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.add_active {
  color: rgba(41, 45, 51, 1);
  .address {
    display: flex;
    align-items: center;
    .span {
      margin-right: 15px;
      word-wrap: break-word;
      max-width: 25vw;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
.hint_active {
  color: rgba(138, 143, 153, 1);
}
// 添加收货地址部分结束
// 订单信息部分开始
.order_info {
  padding: 18px 30px 10px;
  background: #fff;
  margin-bottom: 15px;
  border-radius: 4px;
}
.order_title {
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(41, 45, 51, 1);
  margin-bottom: 15px;
}
.explain {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(41, 45, 51, 1);
  margin-bottom: 10px;
}
// 图片详情部分start
.class_detail {
  display: flex;
  margin-top: 11px;
  margin-bottom: 12px;
}
.img_detail {
  width: 100px;
  height: 60px;
}
.img_detail img {
  width: 100%;
  height: 100%;
  border-radius: 6px;
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
// 图片详情部分end
// 支付方式部分开始
.pay {
  padding: 18px 30px 22px;
  background: #fff;
}
.pattern {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}
.pay_box {
  width: 48%;
  cursor: pointer; /*鼠标悬停变小手*/
}
.pay_img {
  width: 25px;
  height: 25px;
  margin-right: 12px;
}
.pattern img {
  width: 100%;
  height: 100%;
}
.wxpay {
  border-radius: 6px;
  border: 1px solid rgba(255, 115, 0, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 17px 0px;
}
.alipay {
  border-radius: 6px;
  border: 1px solid rgba(243, 244, 251, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 17px 0px;
}
.pay_font {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(41, 45, 51, 1);
  margin-bottom: 3px;
}
// 支付方式部分结束
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
  font-size: 21px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
  position: fixed;
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
// 固定在底部的btn
.bottom_btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px -1px 25px 0px rgba(0, 0, 0, 0.1);
  border-radius: 12px 12px 0px 0px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9;
}
.describe {
  padding: 21px 0 20px 112px;
  display: flex;
  .price {
    font-size: 24px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 87, 0, 1);
  }
  .font {
    margin-left: 6px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(138, 143, 153, 1);
    margin-top: 8px;
  }
}
.btn {
  padding: 25px 112px;
  box-sizing: border-box;
  // background: rgba(255, 115, 0, 1);
  border-radius: 0px 12px 0px 0px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  cursor: pointer; /*鼠标悬停变小手*/
}
//弹框部分开始
.paytoast {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.49);
  position: fixed;
  top: 0;
}
.payment {
  padding-top: 50px;
  background: #fff;
  width: 345px;
  height: 400px;
  border-radius: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.ment {
  width: 130px;
  height: 32px;
  margin: auto;
  margin-bottom: 35px;
}
.ment img {
  width: 100%;
  height: 100%;
}
.ic {
  width: 107px !important;
  height: 32px !important;
}
.remind {
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  display: flex;
  justify-content: center;
  margin-bottom: 17px;
}
.pay_code {
  width: 160px;
  height: 160px;
  margin: 0 auto 21px;
}
.pay_code img {
  width: 100%;
  height: 100%;
}
.toapp {
  display: flex;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 161, 66, 1);
  justify-content: center;
}
.toapp_font {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 161, 66, 1);
  margin-right: 7px;
}
.toapp_color {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  margin-right: 7px;
  color: #258aee;
}
.toapp_img {
  width: 7px;
  height: 12px;
}
.toapp_img img {
  width: 100%;
  height: 100%;
  margin-top: 4px;
}
//弹框部分结束
.aliPag {
  display: none;
}
.classinfo {
  border-bottom: 1px solid #f2f5fa;
}
</style>
