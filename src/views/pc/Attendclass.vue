<template>
  <div class="set">
    <div class="bgpc"></div>
    <div class="new_header" v-show="flag">
      <div class="back" @click="toBack">
        <img src="../../assets/img/ic_back.png" />
      </div>
      <div class="new_font">如何上课</div>
    </div>
    <div class="header_blockpc" v-show="!flag">
      如何上课
    </div>
    <!--body部分开始-->
    <div class="set_box">
      <div class="attend">
        <p>1.下载猴猴画APP</p>
        <p>2.根据购买订单手机号登录猴猴画APP</p>
        <p>3.收到画材，联系班主任排课</p>
        <p>4.点击底部“课表”选项卡</p>
        <p>
          5.进入课堂界面（可提前15分钟进直播教室），点击开始“开始上课”按钮
        </p>
        <p>6.要结束课程，点击左上角返回键退出教室</p>
      </div>
    </div>
  </div>
</template>
<script>
import { isMobile } from "../../common/util";
import { apiInfo, updateProfile } from "../../api/common";
export default {
  components: {},
  data() {
    return {
      flag: isMobile()
    };
  },
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.toBack();
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
.new_header {
  width: 100%;
  padding: 8px 20px 8px 21px;
  background: #fff;
  display: flex;
  box-sizing: border-box;
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
}
.back {
  width: 20px;
  height: 20px;
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
  font-weight: 500;
}

.set {
  width: 100%;
  height: 100%;
  background: #f3f5f9;
}
.set_box {
  padding: 60px 112px 20px;
  background: #f3f5f9;
  width: 100%;
  box-sizing: border-box;
}
.attend {
  background: #fff;
  border-radius: 12px;
  padding: 12.5px 14px 11.5px 15px;
  line-height: 25px;
  font-size: 14px;
  margin-bottom: 15px;
  p {
    margin-bottom: 7.5px;
  }
}
</style>
