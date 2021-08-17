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
        <div class="titleText title_text">如何上课</div>
        <div class="titleDv "></div>
      </div>
    </header>
    <body>
      <div class="textBox ft14">
        <div>1.下载猴猴画APP</div>
        <div>2.根据购买订单手机号登录猴猴画APP</div>
        <div>3.收到画材，联系班主任排课</div>
        <div>4.点击底部“课表”选项卡</div>
        <div>
          5.进入课堂界面（可提前15分钟进直播教室），点击开始“开始上课”按钮
        </div>
        <div>6.要结束课程，点击左上角返回键退出教室</div>
      </div>
    </body>
  </div>
</template>

<script>
export default {
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    let that = this;
    dsBridge.registerAsyn("goback", function(arg1, arg2, arg3) {
      that.toBack();
    });
  },
  methods: {
    toBack() {
      this.$router.push({
        path: "/phone/findPhone",
        query: { token: this.$route.query.token }
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
    padding: 57px 15px 0px;
    .textBox {
      padding: 15px 15px 7.5px;
      background: #ffffff;
      border-radius: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #292d33;
      line-height: 25px;
      margin-bottom: 15px;
      div {
        margin-bottom: 7.5px;
      }
    }
  }
}
</style>
