<template>
  <div class="childcoupon">
    <div v-for="(item, index) in list" :key="index" class="card">
      <div
        class="cou cursor"
        @click="selectCoupon(index)"
        :class="[
          item.use_status == 3 || page == 2 ? 'active' : '',
          item.explainFlag ? 'notRadius' : ''
        ]"
      >
        <img
          class="select"
          src="../assets/img/ic_selected@2x.png"
          v-if="item.user_id == minus_id"
        />

        <div
          class="dotted_left"
          :class="item.use_status == 3 || page == 2 ? 'active' : ''"
        >
          <div
            v-if="item.preferential_type == 1 || item.preferential_type == 3"
          >
            <div class="top_price">
              <span class="price">{{ parseFloat(item.discount) }}</span>
              <span class="fracture">折</span>
            </div>
            <div class="describes ft12" v-if="item.preferential_type == 3">
              满{{ item.discount_piece }}件可用
            </div>
          </div>
          <div v-else>
            <div class="top_price">
              <div class="symbol">￥</div>
              <div class="price">{{ parseFloat(item.minus) }}</div>
              <!-- <div class="symbol"></div> -->
            </div>
            <div class="describes ft12">满{{ item.full }}元可用</div>
          </div>
        </div>
        <!--虚线左边部分结束-->
        <!--虚线右边部分开始-->
        <div class="dotted_right">
          <!--使用人群开始-->
          <div class="use">{{ item.name }}</div>
          <!--使用人群结束-->
          <div class=" ft12" :class="item.info ? 'time' : 'notime'">
            {{ timeConversion(item) }}
          </div>
          <!--使用说明部分开始-->
          <div class="instructions cursor" v-if="item.info">
            <div @click.stop="instruction(index)" class="instructionsText ft12">
              {{ page == 2 ? "不可用原因" : "使用说明" }}
            </div>
            <div class="img">
              <img
                :src="item.explainFlag ? arrow_up : arrow_down"
                @click.stop="instruction(index)"
              />
            </div>
          </div>
          <!--使用说明部分结束-->
        </div>
        <!--虚线右边部分结束-->
        <!--领取按钮部分开始-->
        <div
          class="draw"
          v-show="item.user_coupon_status == 0"
          @click.stop="receive(index)"
        >
          领取
        </div>
        <div class="draw_active" v-show="item.user_coupon_status == 2">
          已领
        </div>
        <div
          class="draw"
          v-show="
            item.use_status &&
              item.use_status == 1 &&
              page == 1 &&
              btnshow == true
          "
          @click="clip(item)"
        >
          使用
        </div>
        <img
          src="../assets/img/img_Expired.png"
          alt=""
          class="seal"
          v-show="item.use_status == 3"
        />
        <img
          src="../assets/img/img_Used.png"
          alt=""
          class="seal"
          v-show="item.use_status == 2"
        />
        <!--领取按钮部分结束-->
      </div>
      <!--使用说明内容开始-->
      <div class="use_content" v-if="item.explainFlag">
        <div>
          <div>{{ item.info }}</div>
        </div>
      </div>
      <!--使用说明内容结束-->
    </div>
  </div>
</template>
<script>
import { setUserCoupon } from "../api/common";
export default {
  name: "coupon",
  props: [
    "list",
    "page",
    "color",
    "nouselist",
    "uselist",
    "minusid",
    "minus",
    "class_id",
    "btnshow"
  ],
  data() {
    return {
      arrow_up: require("../assets/img/ic_arrow_up@2x.png"),
      arrow_down: require("../assets/img/ic_arrow_down@2x.png"),
      selectIndex: -1,
      roundColor: 2,
      minus_id: this.minusid,
      coupon_price_after: this.minus,
      coupon_class_id: this.class_id
    };
  },
  created() {},

  mounted() {
    this.roundColor = this.color;
  },
  methods: {
    //使用说明
    timeConversion(item) {
      if (
        item.term_type == 2 &&
        item.user_coupon_status != 1 &&
        this.page == 1
      ) {
        return "领取后" + item.term_date + "天可用";
      } else {
        return (
          item.term_start_time
            .substr(0, 10)
            .split("-")
            .join(".") +
          " - " +
          item.term_end_time
            .substr(0, 10)
            .split("-")
            .join(".")
        );
      }
    },
    receive(index) {
      setUserCoupon({ coupon_id: this.list[index].id }).then(res => {
        if (res.code == 0) {
          this.list[index].user_coupon_status = 2;
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    },
    instruction(index) {
      this.list[index].explainFlag = !this.list[index].explainFlag;
      if (this.roundColor != 1) {
        this.roundColor = 1;
      } else {
        this.roundColor = this.color;
      }
    },
    clip(item) {
      console.log(item.target_parent);
      if (item.target_parent.length > 1) {
        this.$emit("clip", 1);
      } else {
        if (item.target_parent[0] == 2) {
          this.$emit("clip", 0);
        } else if (item.target_parent[0] == 1) {
          this.$emit("clip", 1);
        }
      }
    },
    selectCoupon(index) {
      // page==0可用page==1我的优惠券不可选page==2 不可用状态灰色背景颜色
      if (this.page == 0) {
        if (this.minus_id == this.list[index].user_id) {
          this.minus_id = -1;
          this.coupon_class_id = this.list[index].goods_id;
        } else {
          this.minus_id = this.list[index].user_id;
          this.coupon_price_after = this.list[index].coupon_price_after;
          this.coupon_class_id = this.list[index].goods_id;
        }
        let path = {
          minus_id: this.minus_id,
          coupon_class_id: this.list[index].goods_id,
          coupon_price_after: this.list[index].coupon_price_after
        };
        this.$emit("search", path);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.childcoupon {
  margin-bottom: 20px;
}
.card {
  margin-bottom: 20px;
}
.cou {
  width: 99.8%;
  height: 90px;
  background: #feaa4b;
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
  // -webkit-mask: radial-gradient(circle at 0, #0000 5px, red 0),
  //   radial-gradient(circle at right, #0000 5px, red 0);
  // -webkit-mask-composite: source-in;
  // mask-composite: intersect;
  -webkit-mask: radial-gradient(circle at 5px, #0000 5px, red 0) -5px;
  .seal {
    top: 10px;
    right: 10px;
    position: absolute;
    width: 33px;
    height: 33px;
  }
}
.cou.active {
  background: #c3c3c3;
  cursor: unset;
}
.cou.notRadius {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}
// 白色的半圆开始
.top_round {
  position: absolute;
  left: 90px;
  width: 10px;
  height: 6px;
  background: #fff;
  border-radius: 0 0 10px 10px;
  top: -1px;
}
.bottom_round {
  position: absolute;
  bottom: -1px;
  left: 90px;
  width: 10px;
  height: 6px;
  background: #fff;
  border-radius: 10px 10px 0 0;
}
// 白色的半圆结束
// 灰色的半圆开始
.top_round_gray {
  position: absolute;
  left: 90px;
  width: 10px;
  height: 6px;
  background: #f5f7fa;
  border-radius: 0 0 10px 10px;
  top: -1px;
}
.bottom_round_gray {
  position: absolute;
  bottom: -1px;
  left: 90px;
  width: 10px;
  height: 6px;
  background: #f5f7fa;
  border-radius: 10px 10px 0 0;
}
// 灰色的半圆结束
// 虚线左边部分开始
.dotted_left {
  width: 95px;
  min-width: 95px;
  text-align: center;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dotted_left.active {
}
.top_price {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 34px;
  font-family: DIN;
  font-weight: bold;
  color: #ffffff;
}
.symbol {
  font-size: 16px;
  font-family: DIN;
  font-weight: bold;
  color: #ffffff;
  margin-top: 10px;
  line-height: 18.5px;
}
.price {
  line-height: 40px;
}
.fracture {
  margin-top: 10px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 20px;
}
.describes {
  // font-size: 12px !important;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  transform: scale(0.8333);
}
// 虚线左边部分结束
.dotted_right {
  margin-left: 11.5px;
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
.use {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 20px;
}
.time {
  margin-top: 4px;
  margin-bottom: 13px;
  white-space: nowrap;
  line-height: 14px;
  transform: scale(0.8333);
  transform-origin: 0 0;
}
.notime {
  margin-top: 4px;
  white-space: nowrap;
  line-height: 14px;
  transform: scale(0.8333);
  transform-origin: 0 0;
}
.instructions {
  display: flex;
  align-items: center;
  line-height: 14px;
  .instructionsText {
    transform: scale(0.8333);
    transform-origin: 0 0;
  }
  .img {
    display: flex;
    align-items: center;
  }
  img {
    width: 10px;
    height: 6px;
    // padding-left: 7px;
  }
}
//使用说明内容部分开始
//使用说明内容部分结束
.use_content {
  background: #ffffff;
  border-radius: 0px 0px 12px 12px;
  border: 1px solid #f2f5fa;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #88898a;

  padding-top: 25px;
  box-sizing: border-box;
  margin-top: -26px;
  div > div {
    box-sizing: border-box;
    padding: 6.5px 12px 7px;
    line-height: 16.5px;
    word-wrap: break-word;
  }
}
.use_contentphone {
  background: #ffffff;
  border-radius: 0px 0px 12px 12px;

  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #828a99;

  padding-top: 25px;
  box-sizing: border-box;
  margin-top: -26px;
  div > div {
    box-sizing: border-box;
    padding: 6.5px 12px 7px;
  }
}
.select {
  position: absolute;
  width: 46px;
  height: 39px;
  right: -1px;
  top: -1px;
  // background: #fff;
}
.draw {
  background: #ffffff;
  border-radius: 2px;
  padding: 1px 9px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ff6b4d;
  position: absolute;
  right: 15px;
}
.draw_active {
  padding: 1px 9px;
  border-radius: 2px;
  border: 1px solid #ffffff;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  position: absolute;
  right: 15px;
}
</style>
