<template>
  <div class="fillorder">
    <div class="bgpc"></div>
    <div class="new_header" v-show="flag">
      <div class="back" @click="toBack">
        <img src="../../assets/img/ic_back.png" />
      </div>
      <div class="new_font">填写订单</div>
    </div>
    <div class="header_pc" v-show="!flag">
      填写订单
    </div>
    <!--body部分开始-->
    <div class="fillorder_box">
      <!--添加收货地址部分开始-->
      <!-- <div class="add cursor" @click="toAddress">
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
        <img src="../../assets/img/btn_arrow.png" />
      </div> -->
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
          <div class="explain" v-show="Classtype != 2">
            {{ item.name }}
          </div>
          <!--图片和课程部分开始-->
          <div class="class_detail">
            <div class="img_detail" v-if="Classtype == 0">
              <div>
                <img src="../../assets/img/img_069.png" />
                <img src="../../assets/img/shop_img1.png" />
              </div>
            </div>
            <div class="img_detail" v-else-if="Classtype == 1">
              <div>
                <img :src="item.cdn + item.logo" />
                <img src="../../assets/img/shop_img2.png" />
              </div>
            </div>
            <div class="img_detail_w" v-else>
              <div>
                <img :src="cdnlogo" />
              </div>
            </div>

            <div class="detail_font" v-show="Classtype != 2">
              <div class="font" style="margin-bottom:6px;">
                <div class="dot"></div>
                <div class="after_font">
                  创意直播课 {{ Classtype == 1 ? "24" : "1" }} 节
                </div>
              </div>
              <div class="font" style="margin-bottom:6px;">
                <div class="dot"></div>
                <div class="after_font">
                  精品视频课 {{ Classtype == 1 ? "24" : "1" }} 节
                </div>
              </div>
              <div class="font">
                <div class="dot"></div>
                <div class="after_font">配套画材礼盒 1 盒</div>
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
              ¥
              {{
                Classtype == 2
                  ? classDetail &&
                    classDetail.goods &&
                    classDetail.goods.old_price
                  : "266.00"
              }}
              <!-- ¥{{ Classtype == 1 ? "2400.00" : "160.00" }} -->
            </div>
          </div>
          <div class="info" v-if="Classtype != 2">
            <div class="info_name">礼盒价格：</div>
            <div class="info_con">
              ¥{{ Classtype == 1 ? "480.00" : "40.00" }}
            </div>
          </div>
          <!-- <div class="info">
            <div class="info_name">总金额：</div>
            <div class="info_price">¥ {{ price }}</div>
          </div> -->
          <!-- 详细信息结束 -->
        </div>
        <div class="info_name total" v-if="Classtype == 1">合计</div>
        <div class="info " style="margin-top:10px;" v-if="Classtype == 1">
          <div class="info_name ">课程总价：</div>
          <div class="info_con">¥4800.00</div>
        </div>
        <div class="info " style="margin-top:10px;" v-if="Classtype == 1">
          <div class="info_name ">礼盒总价：</div>
          <div class="info_con">¥960.00</div>
        </div>
        <div class="info" v-if="Classtype != 2" style="margin-top:10px;">
          <div class="info_name">优惠金额：</div>
          <div class="info_con">
            -¥{{ Classtype == 1 ? "2880.00" : "190.10" }}
          </div>
        </div>
        <div class="info">
          <div class="info_name">总金额：</div>
          <div class="info_price">¥ {{ price }}</div>
        </div>
      </div>
      <!--优惠券开始-->
      <div class="coupon cursor" @click="couok">
        <div class="coupon_box">
          <div>优惠券</div>
          <div class="boxright">
            <div v-if="use_ok != 0">
              <div class="couponprice" v-if="selectIndex == -1">
                有{{ use_ok }}张可用优惠券
              </div>
              <div class="couponprice" v-else>
                -¥{{ (minus * 1).toFixed(2) }}
              </div>
            </div>
            <div class="couponprice" v-else>
              无优惠券可用
            </div>
            <div>
              <img src="../../assets/img/btn_arrow.png" />
            </div>
          </div>
        </div>
      </div>
      <!--优惠券结束-->

      <!--订单信息部分结束-->
      <!--支付方式部分开始-->
      <div class="pay">
        <div class="order_title">支付方式</div>
        <div class="pattern">
          <!-- 微信方式按钮 -->
          <div class="pay_box" @click="pay(1)">
            <div :class="Payclass == true ? 'wxpay' : 'alipay'">
              <div class="pay_img">
                <img src="../../assets/img/ic_wechat.png" />
              </div>
              <div class="pay_font">微信支付</div>
            </div>
          </div>
          <!-- 支付宝方式按钮 -->
          <div class="pay_box" @click="pay(2)">
            <div :class="Payclass == true ? 'alipay' : 'wxpay'">
              <div class="pay_img">
                <img src="../../assets/img/ic_alipay.png" />
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
          <div class="price">
            ¥
            {{ `${algorithm(price, minus, -1).toFixed(2)}` }}
          </div>
          <!-- <div class="price" v-else>¥ 9.90</div> -->
          <!-- <div class="font" v-if="!price">优惠已减326.00</div> -->
          <div class="font" v-if="preferential">优惠已减{{ preferential }}</div>
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
            src="../../assets/img/ic_wechat_pay@2x.png"
          />
          <img v-else class="ic" src="../../assets/img/ic_alipay@2x.png" />
        </div>
        <div class="remind" v-if="use_pay == 1">请使用微信扫码完成支付</div>
        <div class="remind" v-else>请使用支付宝扫码完成支付</div>
        <div class="pay_code">
          <img :src="code" />
        </div>
      </div>
    </div>
    <!--弹出支付方式框部分结束-->
    <!--body部分结束-->
    <!-- 优惠券弹框开始 -->
    <div class="coutoast" v-show="coutoast" @click.self="nocouok">
      <div class="coubox">
        <div class="coutitle">优惠券</div>
        <div class="noparent" v-if="use_ok == 0 && use_no == 0">
          暂时没有优惠券
        </div>
        <div class="parent" v-else>
          <div class="usable" v-if="use_ok > 0">
            可使用优惠券（{{ use_ok }}）
          </div>
          <!--可用优惠券列表开始-->
          <div v-if="uselist.length > 0" class="uselist">
            <Coupon
              :list="uselist"
              :page="0"
              :minusid="minusid"
              @search="getsearch"
              :minus="minus"
              ref="cou"
              :color="1"
              :class_id="class_id"
            ></Coupon>
          </div>
          <!--可用优惠券列表结束-->
          <div class="usable" v-if="use_no > 0">
            不可使用优惠券（{{ use_no }}）
          </div>
          <!--不可用优惠券列表开始-->
          <div v-if="nouselist.length > 0" class="nolist">
            <Coupon :list="nouselist" :page="2" :color="1"></Coupon>
          </div>
          <!--不可用优惠券列表结束-->
        </div>
        <!--按钮 -->
        <div class="coubtn">
          <div class="couok cursor" v-if="selectIndex == -1" @click="nocouok">
            不使用优惠券
          </div>
          <div class="couok cursor" v-else @click="couok">确定</div>
        </div>
      </div>
    </div>
    <!-- 优惠券弹框结束 -->
  </div>
</template>
<script>
import env from "../../config/env";
import Coupon from "../../components/coupon";
import { isMobile, isWeiXin } from "../../common/util";

import axios from "axios";
const URL = env.baseUrl;
import {
  getClssInfomation,
  getCreat,
  Querystatus,
  getClassInfo,
  postCreate,
  getGoods,
  getMyAddress,
  aiPay,
  getExperienceGoods,
  useuserCoupon
} from "../../api/common";
export default {
  components: {
    Coupon
  },
  data() {
    return {
      weixin: isWeiXin(),
      classDetail: {},
      coutoast: false,
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
      preferential: "",
      address_id: "",
      phone: "",
      uselist: [],
      nouselist: [],
      use_ok: 0,
      use_no: 0,
      minusid: 0,
      minus: "",
      selectIndex: 0,
      class_id: 0,

      // 体验课课程价格详情
      trialclass: {
        original: "200.00", //课程原价
        // gift: "40.00", //礼盒价格
        // total: "4800.00", //课程总价
        // gifttotal: "960.00", //礼盒总价
        coupon: "190.10" //优惠金额
      },
      // 直播课课程价格详情
      liveclass: {
        original: "2880.00", //课程原价
        // gift: "480.00", //礼盒价格
        total: "5760.00", //课程总价
        // gifttotal: "960.00", //礼盒总价
        coupon: "2280" //优惠金额
      }
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
    // var Classtype = localStorage.getItem("Classtype");

    this.Classtype = this.$route.query.classType;
    var Classtype = this.Classtype;

    if (Classtype == 2) {
      // this.classInfo = [{ name: fillname, price: price }];
      // this.price = price;
      // this.goods_id = goods_id;
      // this.fillname = fillname;
      // this.old_price = old_price;
      // this.cdnlogo = cdnlogo;
      getClssInfomation({ id: localStorage.smallClass }).then(res => {
        if (res.code == 0) {
          this.classDetail = res.data;
          (this.fillname = this.classDetail.goods.name),
            (this.classInfo = [
              {
                name: this.classDetail.goods.name,
                price: this.classDetail.goods.old_price
              }
            ]);
          this.price = this.classDetail.goods.price;
          this.cdnlogo =
            this.classDetail.goods.cdn + this.classDetail.goods.logo;

          this.goods_id = res.data.goods.id;
          // 获取优惠券的接口开始
          this.goods_id &&
            useuserCoupon({ goods_id: this.goods_id }).then(res => {
              if (res.code == 0) {
                this.nouselist = res.data.no.data;
                this.uselist = res.data.ok.data;
                this.use_ok = res.data.ok.count;
                this.use_no = res.data.no.count;
                this.class_id = res.data.class_id;

                if (this.minusid == 0) {
                  this.minusid = res.data.minus_id;
                }
                if (res.data.minus > 0) {
                  this.minus = res.data.minus;
                }
                this.nouselist.map((item, i) => {
                  this.$set(this.nouselist[i], "explainFlag", false);
                });
                this.uselist.map((item, i) => {
                  this.$set(this.uselist[i], "explainFlag", false);
                });
              } else {
                this.minusid = 0;
              }
            });
        } else {
          this.$toast(res.msg);
        }
      });
    } else if (Classtype == 1) {
      // 系统课
      this.price = "2880";
      this.preferential = "2880.00";
      getGoods({
        born: type //传递过去的出生日期
      }).then(res => {
        if (res.code == 0) {
          this.classInfo = res.data;
          this.goods_id = res.data
            .map((item, i) => {
              return item.id;
            })
            .join(",");
          // 获取优惠券的接口开始
          this.goods_id &&
            useuserCoupon({ goods_id: this.goods_id }).then(res => {
              if (res.code == 0) {
                this.nouselist = res.data.no.data;
                this.uselist = res.data.ok.data;
                this.use_ok = res.data.ok.count;
                this.use_no = res.data.no.count;
                this.class_id = res.data.class_id;

                if (this.minusid == 0) {
                  this.minusid = res.data.minus_id;
                }
                if (res.data.minus > 0) {
                  this.minus = res.data.minus;
                }
                this.nouselist.map((item, i) => {
                  this.$set(this.nouselist[i], "explainFlag", false);
                });
                this.uselist.map((item, i) => {
                  this.$set(this.uselist[i], "explainFlag", false);
                });
              } else {
                this.minusid = 0;
              }
            });
          // 获取优惠券的接口结束
        } else {
          this.$toast(res.msg || res.message);
        }
      });
      // getGoods({
      //   stage: type,
      //   tag: levelId
      // }).then(res => {
      //   if (res.code == 0) {
      //     console.log(res.data);
      //     this.classInfo = res.data;
      //     this.goods_id = res.data
      //       .map((item, i) => {
      //         return item.id;
      //       })
      //       .join(",");
      //   } else {
      //     this.$toast(res.msg||res.message);
      //   }
      // });
    } else if (Classtype == 0) {
      // 体验课
      this.price = "9.90";
      this.preferential = "190.10";
      let type = localStorage.getItem("type");
      if (type == "S1") {
        var tag = "3-5";
      } else if (type == "S2") {
        var tag = "5-7";
      } else if (type == "S3") {
        var tag = "7-9";
      }
      this.classInfo = [{ name: `趣味体验课${type} ${tag}`, price: price }];

      // axios
      //   .get(`${URL}/api/quickapp/get_page_data/360`, {
      //     headers: {
      //       // "X-AccessToken": this.$route.query.token
      //     }
      //   })
      //   .then(res => {
      //     this.goods_id = res.data.data.goods.id;
      //   });
      //获取goods的id
      getExperienceGoods({
        tag: {
          "3-5": "s1",
          "5-7": "s2",
          "7-9": "s3"
        }[tag]
      }).then(res => {
        if (res.code == 0) {
          this.goods_id = res.data[0].id;
          // 获取优惠券的接口开始
          this.goods_id &&
            useuserCoupon({ goods_id: this.goods_id }).then(res => {
              if (res.code == 0) {
                this.nouselist = res.data.no.data;
                this.uselist = res.data.ok.data;
                this.use_ok = res.data.ok.count;
                this.use_no = res.data.no.count;
                this.class_id = res.data.class_id;

                if (this.minusid == 0) {
                  this.minusid = res.data.minus_id;
                }
                if (res.data.minus > 0) {
                  this.minus = res.data.minus;
                }
                this.nouselist.map((item, i) => {
                  this.$set(this.nouselist[i], "explainFlag", false);
                });
                this.uselist.map((item, i) => {
                  this.$set(this.uselist[i], "explainFlag", false);
                });
              } else {
                this.minusid = 0;
              }
            });
          // 获取优惠券的接口结束
        } else {
          this.$toast(res.msg || res.message);
        }
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
    // 获取优惠券的接口开始
    this.goods_id &&
      useuserCoupon({ goods_id: this.goods_id }).then(res => {
        if (res.code == 0) {
          this.nouselist = res.data.no.data;
          this.uselist = res.data.ok.data;
          this.use_ok = res.data.ok.count;
          this.use_no = res.data.no.count;
          this.class_id = res.data.class_id;

          if (this.minusid == 0) {
            this.minusid = res.data.minus_id;
          }
          if (res.data.minus > 0) {
            this.minus = res.data.minus;
          }
          this.nouselist.map((item, i) => {
            this.$set(this.nouselist[i], "explainFlag", false);
          });
          this.uselist.map((item, i) => {
            this.$set(this.uselist[i], "explainFlag", false);
          });
        } else {
          this.minusid = 0;
        }
      });
    // 获取优惠券的接口结束
    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.toBack();
    });
    // localStorage.setItem("access_token", this.$route.query.token);
    localStorage.setItem("WebpageId", -1);
  },
  methods: {
    algorithm(a, b, c) {
      return Number(b) * Number(c) + Number(a);
    },
    getsearch(path) {
      this.selectIndex = path.minus_id;
      this.class_id = path.coupon_class_id;
      this.minus = path.coupon_price_after;
    },
    nocouok() {
      this.coutoast = !this.coutoast;
      if (this.selectIndex == -1) {
        this.class_id = 0;
        this.minus = 0;
      }
    },
    couok() {
      this.coutoast = !this.coutoast;
    },

    // 添加收货地址
    toAddress() {
      let Classtype = localStorage.getItem("Classtype");
      if (this.addressIndex == -1) {
        this.$router.push({
          path: "/pc/Shippingaddress",
          query: {
            addressIndex: -1,
            token: this.$route.query.token,
            Classtype: Classtype
          }
        });
      } else {
        this.$router.push({
          path: "/pc/Selectaddress",
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
      localStorage.setItem("countId", 0);
      this.$router.push({
        path: "/lp",
        query: {
          token: this.$route.query.token,
          gid: localStorage.getItem("smallClass"),
          s: localStorage.getItem("secretKey")
        }
      });
      // let Classtype = localStorage.getItem("Classtype");
      // let classid = localStorage.getItem("classid");
      // if (Classtype == 2) {
      //   // 从小课堂跳转过来的
      //   localStorage.setItem("countId", 0);
      //   this.$router.push({
      //     path: "/phone/smallClassDetailsPhone",
      //     query: {
      //       token: this.$route.query.token,
      //       gid: localStorage.getItem("smallClass")
      //     }
      //   });
      //   // this.$router.push({
      //   //   path: "/pc/Trialclass",
      //   //   query: {
      //   //     token: this.$route.query.token,
      //   //     id: classid,
      //   //     Classtype: Classtype
      //   //   }
      //   // });
      // } else if (Classtype == 1 || Classtype == 0) {
      //   // 从系统课跳转过来的
      //   this.$router.push({
      //     path: "/pc/Trialclass",
      //     query: {
      //       token: this.$route.query.token,
      //       Classtype: Classtype
      //     }
      //   });
      // }
    },
    //支付方式切换
    pay(use) {
      if (use != this.use_pay) {
        this.Payclass = !this.Payclass;
        this.use_pay = use;
      }
    },
    toast() {
      if (this.$refs.cou && this.$refs.cou.minus_id > 0) {
        var coupon_id = this.$refs.cou.minus_id;
      } else {
        var coupon_id = 0;
      }

      if (this.paytoast == true) {
        this.paytoast = !this.paytoast;
        return;
      }
      let s = localStorage.getItem("type");
      let Classtype = localStorage.getItem("Classtype");
      if (Classtype == 1) {
        if (s == "S1") {
          var tag = "3-5";
        } else if (s == "S2") {
          var tag = "5-7";
        } else if (s == "S3") {
          var tag = "7-9";
        }
      } else if (Classtype == 2) {
        var tag = "";
      }

      // if (this.addressIndex == -1) {
      //   this.$toast("请填写收货地址");
      // } else {
      if (this.use_pay == 1) {
        clearTimeout(this.timer);

        // 微信支付
        postCreate({
          client_platform: isWeiXin() ? 0 : 1,
          redirect_type: 1,
          secret_key: localStorage.getItem("secretKey"),
          goods_id: this.goods_id,
          // tag: tag,
          // address_id: this.address_id,
          coupon_id: coupon_id, //优惠券id
          coupon_class_id: this.class_id,
          // receiver: this.name,
          // phone: this.tel,
          // address: this.addressInfo,

          gateway: 1
        }).then(res => {
          this.order_id = res.order_id;
          localStorage.setItem("order_id", res.order_id);
          if (res.code == 0) {
            this.paytoast = !this.paytoast;
            this.code = `${URL}/fe/pay/pay_wx_qr/${res.order_id}`;
            this.getStatus(res.order_id);
          } else {
            this.$toast(res.msg || res.message);
          }
        });
      } else if (this.use_pay == 2) {
        clearTimeout(this.timer);
        postCreate({
          gateway: 16,
          goods_id: this.goods_id,
          // tag: tag,
          // address_id: this.address_id,
          coupon_id: coupon_id, //优惠券id
          coupon_class_id: this.class_id,
          // receiver: this.name,
          // phone: this.tel,
          // address: this.addressInfo,
          client_platform: 1,
          secret_key: localStorage.getItem("secretKey")
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
      // }
    },
    // 查看接口状态
    getStatus(order) {
      let Classtype = localStorage.getItem("Classtype");
      const that = this;
      // 实现轮询
      this.timer = setTimeout(() => {
        Querystatus({ order_id: order }).then(res => {
          if (res.data.status == 1 || res.data.status == 6) {
            clearTimeout(this.timer);
            this.$toast("支付完成");
            this.$router.push({
              path: "/pc/Signup",
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
    }
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
  border-radius: 4px;
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
  width: 80%;
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
  margin-bottom: 5px;
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
  width: 100%;
  display: flex;
  margin-top: 11px;
  margin-bottom: 12px;
}
.img_detail_w {
  div {
    display: flex;
    justify-content: space-between;
  }
}
.img_detail {
  div {
    width: 150.5px;
    display: flex;
    justify-content: space-between;
  }
}

.img_detail img {
  width: 70px;
  height: 70px;
  border-radius: 6px;
  object-fit: cover;
}
.img_detail_w img {
  width: 70px;
  height: 70px;
  border-radius: 6px;
  object-fit: cover;
}
.detail_font {
  margin-left: 18.5px;
}
.detail_font .font {
  display: flex;
  align-items: center;
}
.dot {
  background: #8a8f99;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  margin-right: 7.5px;
}
.after_font {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #8a8f99;
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
  border-radius: 4px;
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
    color: rgba(255, 87, 0, 1);
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
  // height: 400px;
  height: 350px;
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
  padding-top: 10px;
}
.total {
  color: #292d33 !important;
}
//优惠券部分开始
.coupon {
  margin-top: 15px;
  margin-bottom: 15px;
  background: rgba(255, 255, 255, 1);
  padding: 18px 30px;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #292d33;
  border-radius: 4px;
}
.coupon_box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .boxright {
    display: flex;
    align-items: center;
  }
  img {
    width: 7px;
    height: 12px;
  }
}
.couponprice {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ff7300;
  margin-right: 12px;
}
//优惠券部分结束
//优惠券弹框开始
.coutoast {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.49);
  position: fixed;
  top: 0;
  z-index: 9;
  .coubox {
    background: #fff;
    width: 375px;
    height: 590px;
    border-radius: 16px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 12.5px 15px 15px;
    box-sizing: border-box;
  }
  .parent {
    overflow: scroll;
    height: 454px;
  }
  .coutitle {
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #292d33;
    text-align: center;
    margin-bottom: 12.5px;
  }
  .usable {
    margin-top: 13px;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #292d33;
    margin-bottom: 15px;
  }
  //可使用优惠卷列表

  //不可使用优惠卷列表

  ::-webkit-scrollbar {
    display: none;
  }
  .coubtn {
    padding: 15px;
    border-top: 1px solid rgba(242, 245, 250, 1);
    position: absolute;
    width: 100%;
    left: 0;
    box-sizing: border-box;
    bottom: 0px;
    background: #fff;
    border-radius: 0 0 12px 12px;
    z-index: 9;
  }
  .couok {
    padding: 12.5px 0px;
    background: #ff6b4d;
    border-radius: 25px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .nocouok {
    padding: 12.5px 0px;
    background: rgba(184, 191, 204, 1);
    border-radius: 25px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.noparent {
  height: 454px;
  font-size: 16px;
  text-align: center;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #828a99;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
