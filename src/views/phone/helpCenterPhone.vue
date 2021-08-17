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
        <div class="titleText title_text">帮助中心</div>
        <div class="titleDv "></div>
      </div>
    </header>
    <body>
      <div class="textBox ft14">
        <div><strong>1.如何购买课程</strong></div>
        <div>您好，购买课程具体操作步骤如下：</div>
        <div>（1）点击下方“课程”选择对应的体验课或系统班课程。</div>
        <div>
          （2）点击“立即购买”进入付款界面，选择购买课程阶段并详细填写收件人及地址信息。
        </div>
        <div>
          （3）检查地址填写无误，选择支付方式（微信和支付宝），完成购买。
        </div>
        <div>
          （4）付款成功后将会收到上课详情短信通知，请根据短信内容添加老师微信，等待上课。
        </div>
      </div>
      <div class="textBox ft14">
        <div><strong>2.画材发货时间</strong></div>
        <div>
          画材礼盒在您购课成功后3-5个工作日寄出，物流信息可在APP中点击“我的”-“我的订单”-“物流信息”查看快递详情。
        </div>
      </div>
      <div class="textBox ft14">
        <div><strong>3.支持哪些设备上课</strong></div>
        <div>
          您好，猴猴画APP支持电脑/iPad/手机所有设备安装，您可根据自己的需求使用相应设备。
        </div>
      </div>
      <div class="textBox ft14">
        <div><strong>4.如何添加班主任微信</strong></div>
        <div>
          您在购课成功后，会有短信通知您班主任微信号及手机号，您可以根据短信提示进行添加，添加成功后请耐心等待，班主任会在24小时之内通过您的微信申请。
        </div>
      </div>
      <div class="textBox ft14">
        <div><strong>5.退课咨询</strong></div>
        <div>
          APP端无退课通道，具体退课细节可联系班主任沟通解决。
        </div>
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
        path: "/phone/myInfoPhone",
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
    padding: 57px 15px 60px;
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
