<template>
  <div class="new">
    <div class="bgpc"></div>
    <div class="new_header" v-show="flag">
      <div class="back" @click="toback">
        <img src="../../assets/img/ic_back.png" />
      </div>
      <div class="new_font">物流信息</div>
    </div>
    <div class="header_pc" v-show="!flag">
      物流信息
    </div>
    <div class="new_box">
      <Logistics :orderInfo="Data" :list="Actionlist"></Logistics>
    </div>
  </div>
</template>
<script>
import { getOrderInfo } from "../../api/common";
import { isMobile } from "../../common/util";

import Logistics from "../../components/logistics";

export default {
  components: {
    Logistics
  },
  data() {
    return {
      Data: "",
      // className: "",
      // openingTime: "",
      // imgUrl: "",
      flag: isMobile(),
      goods: "",

      Actionlist: []
    };
  },
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.toback();
    });
    getOrderInfo({ order_id: this.$route.query.order_id }).then(res => {
      if (res.code == 0) {
        this.goods = res.data.goods;
        this.Data = res.data;
        this.Actionlist = res.data.traces.reverse();
        if (res.data.status == 7) {
          let arr = {
            Action: 7,
            AcceptStation: "商家已发货正在等待快递员揽件",
            AcceptTime: res.data.delivered_at
          };
          this.Actionlist.push(arr);
        }
      }
    });
  },
  methods: {
    toback() {
      // this.$router.push({
      // 	path: "/pc/Orders",
      // 	query: { token: this.$route.query.token }
      // });
      this.$router.go(-1);
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
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
  font-size: 21px;
  // font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
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
  // font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #292d33;
  text-align: center;
  margin: auto;
}
.new {
  width: 100%;
  height: 100%;
  background: #f3f5f9;
}
.new_box {
  box-sizing: border-box;
  padding: 60px 112px 43px 112px;
  width: 100%;
  background: #f3f5f9;
}
</style>
