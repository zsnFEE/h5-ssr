<template>
  <div class="orders">
    <div class="bgpc"></div>
    <div class="new_header" v-show="flag">
      <div class="back" @click="toBack">
        <img src="../../assets/img/ic_back.png" />
      </div>
      <div class="new_font">{{ title }}</div>
    </div>
    <div class="header_pc" v-show="!flag">
      {{ title }}
    </div>
    <!-- -->
    <div class="orders_box">
      <img class="inquiry" src="../../assets/img/img_inquiry.jpg" alt="" />
    </div>
  </div>
</template>
<script>
import { isMobile } from "../../common/util";
export default {
  components: {},
  data() {
    return {
      flag: isMobile(),
      title: this.$route.query.title
    };
  },
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.toback();
    });
  },
  methods: {
    toBack() {
      this.$router.go(-1);
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.orders {
  width: 100%;
  height: 100%;
  background: #f3f5f9;
  padding-top: 62px;
  box-sizing: border-box;
}
.orders_box {
  padding: 20px 112px;
  height: 100%;
  // overflow: auto;
}
.new_header {
  width: 100%;
  padding: 8.5px 0 8.5px 21.05px;
  background: #fff;
  display: flex;
  box-sizing: border-box;
  position: fixed;
  z-index: 9;
  top: 0;
}
.header_pc {
  width: 100%;
  padding: 11px 40px;
  background: #fff;
  box-sizing: border-box;
  position: fixed;
  z-index: 9;
  top: 0;
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
.inquiry {
  width: 100%;
}
</style>
