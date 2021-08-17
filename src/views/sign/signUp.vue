<template>
  <body class="temp">
    <div class="successTemp">
      <div class="iconBox">
        <img src="../../assets/img/ic_success.png" class="successIcon" />
        <div class="successText">报名成功</div>
      </div>
      <div class="remarks">
        请在微信关注「猴猴画」公众号，获取上课时间、开课提醒等重要通知
      </div>
    </div>
    <div class="telTemp">
      <div class="telRemarks">
        助教老师将通过手机号添加您的微信，为您安排上课时间
      </div>
      <input
        type="text"
        class="telText"
        placeholder="请输入手机号"
        v-model="tel"
        maxlength="11"
        onkeyup="this.value=this.value.replace(/[^0-9-]+/,'');"
      />
      <div class="buttonBox">
        <p class="boxShow"></p>
        <input
          type="button"
          class="okButton"
          value="完成"
          @click="complete()"
        />
      </div>
    </div>
  </body>
</template>

<script>
export default {
  data() {
    return {
      tel: ""
    };
  },
  methods: {
    complete() {
      if (!(this.tel && /^1[3456789]\d{9}$/.test(this.tel))) {
        this.$toast("电话号码不符合规范");
      } else {
      }
    }
  }
};
</script>

<style lang="less" scoped>
.temp {
  position: relative;
  height: 100%;
  .successTemp {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 34.4%;
    width: 100%;
    background: linear-gradient(
      180deg,
      rgba(250, 251, 253, 1) 0%,
      rgba(242, 245, 250, 1) 100%
    );
    .iconBox {
      display: flex;
      flex-direction: column;
      align-content: center;
      margin-top: 8.92%;
      .successIcon {
        height: 80px;
        width: 80px;
      }
      .successText {
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 25px;
        text-align: center;
      }
    }
    .remarks {
      width: 64.4%;
      font-size: 14px;
      margin-top: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(130, 138, 153, 1);
      line-height: 20px;
      text-align: center;
    }
  }
  .telTemp {
    position: absolute;
    bottom: 0;
    height: 67.77%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px -10px 20px 0px rgba(196, 204, 218, 0.3);
    border-radius: 20px 20px 0px 0px;
    .telRemarks {
      margin-top: 14.5%;
      width: 85.3%;
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 25px;
    }
    .telText {
      width: calc(85.3% - 48px);
      height: 50px;
      margin-top: 45px;
      background: rgba(242, 245, 250, 1);
      border-radius: 12px;
      border: 0px;
      line-height: 50px;
      padding-left: 24px;
      padding-right: 24px;
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
    }

    .buttonBox {
      width: 85.3%;
      position: relative;
      .okButton {
        position: absolute;
        margin-top: 18px;
        width: 100%;
        height: 50px;
        background: linear-gradient(
          129deg,
          rgba(255, 115, 0, 1) 0%,
          rgba(255, 85, 0, 1) 100%
        );
        border-radius: 12px;
        border: 0px;
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        z-index: 2;
      }
      .boxShow {
        position: absolute;
        top: 30.5px;
        left: 13px;
        width: calc(100% - 25px);
        height: 46px;
        background: linear-gradient(
          129deg,
          rgba(255, 115, 0, 1) 0%,
          rgba(255, 85, 0, 1) 100%
        );
        border-radius: 6px;
        opacity: 0.41;
        filter: blur(10px);
        z-index: 1;
      }
    }
  }
}
</style>
