<template>
  <div class="trialclass" :style="{ overflow: hidd }">
    <div class="backgroundpc"></div>
    <div class="new_header" v-show="flag">
      <div class="back" @click="toback">
        <img src="../../assets/img/ic_back.png" />
      </div>
      <div class="new_font" v-if="!toast">{{ data.name }}</div>
      <div class="new_font" v-if="toast">猴猴画美术体验课</div>
    </div>
    <div class="header_pc" v-show="!flag" v-if="!toast">{{ data.name }}</div>
    <div class="header_pc" v-show="!flag" v-if="toast">猴猴画美术体验课</div>
    <div class="trialclass_box">
      <div class="bg_box ">
        <div class="content" v-if="data" v-html="data.content"></div>
        <!--固定的部分开始-->
        <div class="bottom_btn ">
          <div class="describe">
            <div class="price" v-if="goods.price">¥ {{ goods.price }}</div>
            <div class="price" v-else>¥ 0.00</div>
            <div class="font" v-if="toast">优惠已减326.00</div>
          </div>
          <div class="btn button_color" @click="gofillorder">
            立即抢购
          </div>
        </div>
        <!--固定的部分结束-->
      </div>
    </div>
  </div>
</template>
<script>
import { isMobile } from "../../common/util";
import {
  getSmallClassDetail,
  getClssInfomation,
  apiInfo,
  getExperienceGoods,
  getCouponList
} from "../../api/common";
export default {
  data() {
    return {
      // i: -1,

      hidd: "",
      flag: isMobile(),
      data: "",
      goods: "",
      toast: true, //控制是否有弹框
      is_bought: ""
    };
  },
  mounted() {
    if (this.$route.query.Classtype == 2) {
      this.toast = false;
      // 小课堂的详情数据
      let classid = localStorage.getItem("classid");
      getClssInfomation({ id: this.$route.query.id }).then(res => {
        if (res.code == 0) {
          this.data = res.data;
          this.goods = res.data.goods;
          this.is_bought = res.data.is_bought;
          localStorage.setItem("goods_id", res.data.goods.id);
          localStorage.setItem("price", res.data.goods.price);
          localStorage.setItem("fillname", res.data.name);
          localStorage.setItem("old_price", res.data.goods.old_price);
          localStorage.setItem("cdnlogo", res.data.cdn + res.data.logo);
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    }
    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.toback();
    });
  },

  methods: {
    toback() {
      if (this.$route.query.Classtype == 2) {
        if (this.$route.query.course == 2) {
          this.$router.push({
            path: "/pc/Courselist",
            query: {
              token: this.$route.query.token,
              category_id: this.$route.query.category_id,
              name: this.$route.query.name
              // class_id: this.class_id
            }
          });
        } else {
          this.$router.push({
            path: "/pc/Smallclass",
            query: {
              token: this.$route.query.token,
              category_id: this.$route.query.category_id,
              name: this.$route.query.name
              // class_id: this.class_id
            }
          });
        }
      }
    },

    // 从小课堂页面进来需要跳转到支付页面的方法

    gofillorder() {
      // 自动领券开始
      getCouponList().then(res => {
        if (res.code == 0) {
          if (this.is_bought == 0) {
            this.$router.push({
              path: "../pc/Fillorder",
              query: {
                // price: this.goods.price,
                // goods_id: this.goods.id,
                Classtype: this.$route.query.Classtype, //从小课堂跳转过去的
                token: this.$route.query.token
              }
            });
          } else {
            this.$toast("你已购买过该课程,不可重复购买");
          }
          // if (res.data.grant_type_auto.length > 0) {
          //   for (let i = 0; i < res.data.grant_type_auto.length; i++) {
          //     setUserCoupon({
          //       coupon_id: res.data.grant_type_auto[i].id
          //     }).then(res => {});
          //   }
          // }
        } else {
          this.$toast(res.msg);
        }
      });
      // 自动领券结束
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.trialclass {
  width: 100vw;
  height: 100%;
}
.trialclass_box {
  background: rgba(255, 255, 255, 1);
  padding: 60px 9% 74px;
}
.bg_box {
  width: 100%;
  // height: 100%;
  // padding-bottom: 10%;
  box-sizing: border-box;
}
// 中间图片部分start
.content {
  width: 100%;
  margin: auto;
}
/deep/ .content > * {
  width: 100%;
  padding: 0;
  margin: 0 auto;
  img {
    width: 100%;
    display: block;
  }
}

.content img {
  width: 100%;
  // height: 100%;
}
// 中间图片部分end

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
  position: fixed;
  z-index: 9;
  font-size: 21px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
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
  bottom: 0px;
  left: 0px;
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
  width: 29%;
  text-align: center;
  padding: 25px 0px;
  box-sizing: border-box;
  // background: rgba(255, 115, 0, 1);
  border-radius: 0px 12px 0px 0px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  cursor: pointer; /*鼠标悬停变小手*/
}
// 弹框部分开始
.choice {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.49);
  position: fixed;
  top: 0;
  z-index: 99;
  .choice_bottom {
    background: rgba(255, 255, 255, 1);
    border-radius: 20px 20px 0px 0px;
    position: fixed;
    bottom: 0;
    padding: 30px 9% 44px;
    box-sizing: border-box;
    width: 100%;
    .bottom_body {
      .title_img {
        width: 18px;
        height: 18px;
        position: absolute;
        top: 34px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .body_title {
        font-size: 21px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(42, 46, 51, 1);
        margin-bottom: 6px;
        text-align: center;
      }
      .account {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(138, 143, 153, 1);
        margin-bottom: 25px;
        text-align: center;
      }
      .select_img {
        display: flex;
        justify-content: space-around;
        width: 100%;
        .select_s {
          width: 31%;
          border-radius: 6px;
          cursor: pointer; /*鼠标悬停变小手*/
          // border: 1px solid #f2f5fa;
          .s_title {
            border-radius: 6px 6px 0px 0px;
            // padding: 15px 106px 16px;
            padding: 15px 0px 16px;
            text-align: center;
            font-size: 35px;
            font-family: PingFangSC-Semibold, PingFang SC;
            color: rgba(255, 255, 255, 1);
          }
          .s1 {
            background: rgba(255, 115, 0, 1);
          }

          .s2 {
            background: rgba(101, 81, 234, 1);
          }
          .s3 {
            background: rgba(255, 90, 0, 1);
          }
        }
        .select_font {
          padding: 12px 34px 20px;
          text-align: center;
          // border: ;
          border-left: 1px solid rgba(242, 245, 250, 1);
          border-right: 1px solid rgba(242, 245, 250, 1);
          border-bottom: 1px solid rgba(242, 245, 250, 1);
          border-radius: 0px 0px 6px 6px;

          .age {
            font-size: 23px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(87, 92, 102, 1);
            line-height: 32px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .years {
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(138, 143, 153, 1);
            line-height: 20px;
          }
        }
      }
    }
  }
}
.select_btn {
  // background: rgba(255, 115, 0, 1);
  border-radius: 25px;
  padding: 12px 41px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  width: 320px;
  margin: 25px auto 0;
  cursor: pointer; /*鼠标悬停变小手*/
}
.select_button {
  // background: rgba(255, 115, 0, 1);
  border-radius: 25px;
  padding: 12px 41px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  width: 320px;
  margin: 31px auto 0;
  cursor: pointer; /*鼠标悬停变小手*/
}
.active_a {
  // border: 1px solid rgba(255, 115, 0, 1) !important;
  border-left: 1px solid rgba(255, 115, 0, 1) !important;
  border-right: 1px solid rgba(255, 115, 0, 1) !important;
  border-bottom: 1px solid rgba(255, 115, 0, 1) !important;
  border-radius: 0 0 6px 6px !important;
}
.active_b {
  // border: 1px solid rgba(101, 81, 234, 1) !important;
  border-left: 1px solid rgba(101, 81, 234, 1) !important;
  border-right: 1px solid rgba(101, 81, 234, 1) !important;
  border-bottom: 1px solid rgba(101, 81, 234, 1) !important;
  border-radius: 0 0 6px 6px !important;
}
.active_c {
  border-left: 1px solid rgba(255, 90, 0, 1) !important;
  border-right: 1px solid rgba(255, 90, 0, 1) !important;
  border-bottom: 1px solid rgba(255, 90, 0, 1) !important;

  border-radius: 0 0 6px 6px !important;
}
// 弹框1部分结束

//弹框2中间部分开始
.course {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.courseA {
  background: rgba(255, 115, 0, 1);
  border-radius: 6px;
  padding: 22px 20px;
  box-sizing: border-box;
  display: flex;
  margin-bottom: 15px;
  position: relative;
  width: 39vw;
  cursor: pointer; /*鼠标悬停变小手*/
}

.course_name {
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  // color: rgba(255, 255, 255, 1);
  margin-right: 12px;
  color: rgba(87, 92, 102, 1);
}
.active_name {
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  margin-right: 12px;
}
.name_after {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  // color: rgba(255, 255, 255, 1);
  color: #8a8f99;
  margin-top: 2px;
}
.active_after {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  margin-top: 2px;
}
.course_flex {
  display: flex;
}
.course_img {
  width: 24px;
  height: 24px;
  // margin-left: 101px;
  position: absolute;
  right: 20px;
}
.course_img img {
  width: 100%;
  height: 100%;
}
.courseB {
  border: 1px solid rgba(242, 245, 250, 1);
  border-radius: 6px;
  padding: 22px 20px;
  box-sizing: border-box;
  display: flex;
  margin-bottom: 15px;
  position: relative;
  width: 39vw;
  cursor: pointer; /*鼠标悬停变小手*/
}
//弹框2中间部分结束
</style>
