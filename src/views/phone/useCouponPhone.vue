<template>
  <div class="temp">
    <div class="backgroundColor"></div>
    <header>
      <div class="title title_box">
        <img
          @click="toBack"
          src="../../assets/img/ic_back.png"
          class="titleArrow title_arrow"
        />
        <div class="titleText title_text">优惠券</div>
        <div class="titleDv "></div>
      </div>
    </header>
    <body>
      <div class="couponList">
        <div class="ft16">可使用优惠券 ({{ numAvailable }})</div>
        <Card
          :list="availableList"
          :page="0"
          :color="2"
          :minusid="countId"
          @search="search"
        ></Card>
      </div>
      <div class="couponList" :class="true ? 'active' : ''">
        <div class="ft16">不可用优惠券 ({{ numNotAvailable }})</div>
        <Card :list="notAvailableList" :page="2" :color="2"></Card>
      </div>
      <div class="bottomBox">
        <button class="ft18" @click="determine">
          {{ countId > 0 ? "确定" : "不使用优惠券" }}
        </button>
      </div>
    </body>
  </div>
</template>

<script>
import Card from "../../components/coupon";
import { useuserCoupon } from "../../api/common";

export default {
  components: {
    Card
  },
  data() {
    return {
      availableList: [],
      notAvailableList: [],
      numAvailable: 0,
      numNotAvailable: 0,
      page: 1,
      per_page: 10,
      selectFlag: false,
      countId: localStorage.getItem("countId")
    };
  },
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    let that = this;
    dsBridge.registerAsyn("goback", function(arg1, arg2, arg3) {
      that.toBack();
    });
    useuserCoupon({ goods_id: this.$route.query.goodsId }).then(res => {
      if (res.code == 0) {
        this.numAvailable = res.data.ok.count;
        this.numNotAvailable = res.data.no.count;
        this.availableList = res.data.ok.data;
        this.notAvailableList = res.data.no.data;
        this.notAvailableList.map((item, i) => {
          this.$set(this.notAvailableList[i], "explainFlag", false);
        });
        this.availableList.map((item, i) => {
          this.$set(this.availableList[i], "explainFlag", false);
        });
      } else {
      }
    });
  },
  methods: {
    search(arr) {
      this.countId = arr.minus_id;
    },
    toBack() {
      this.$router.push({
        path: "/phone/createOrderAddressPhone",

        query: {
          token: this.$route.query.token,
          classType: localStorage.getItem("classType")
        }
      });
    },
    determine() {
      localStorage.setItem("countId", this.countId);
      this.$router.push({
        path: "/phone/createOrderAddressPhone",
        query: {
          token: this.$route.query.token,
          classType: localStorage.getItem("classType")
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.temp {
  width: 100%;
  height: 100%;
  .title {
    .titleDv {
      width: 18px;
    }
  }
  body {
    padding: 57px 15px 110px;
    .couponList {
      div {
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #292d33;
        line-height: 22.5px;
        margin-bottom: 15px;
      }
    }
    .couponList.active {
      margin-top: 30px;
    }
    .bottomBox {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 79px;
      background: #ffffff;
      border-top: 1px solid #f2f5fa;
      display: flex;
      align-items: center;
      padding: 0 15px;
      button {
        width: 100%;
        height: 50px;
        background: #ff6b4d;
        border-radius: 25px;
        border: 0px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 25px;
      }
    }
  }
}
</style>
