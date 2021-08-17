<template>
  <div class="temp">
    <div class="backgroundColor"></div>
    <Header :title="''" @toBack="toBack"> </Header>

    <body>
      <div class="logoBox">
        <img src="../../assets/img/img_logo2.png" alt="" class="logo" />
        <div class="appName">Dipper</div>
        <div class="edition">Version{{ cachesize }}</div>
      </div>
      <div class="choiceBox">
        <div class="choice ft14" @click="toPolicy">
          <span>Dipper用户协议</span>
          <img src="../../assets/img/btn_arrow_right.png" alt="" />
        </div>
        <div class="choice ft14" @click="toPrivacy">
          <span>Dipper隐私政策</span>
          <img src="../../assets/img/btn_arrow_right.png" alt="" />
        </div>
      </div>
    </body>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cachesize: ""
    };
  },
  mounted() {
    dsBridge.call("getversion", "", function(v) {});
    let that = this;
    dsBridge.registerAsyn("Uploadversion", function(arg1, arg2, arg3) {
      that.cachesize = "v" + " " + JSON.parse(arg1).version;
    });
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
    },
    toPolicy() {
      this.$router.push({
        path: "/phone/policyPhone",
        query: { token: this.$route.query.token, appFlag: true }
      });
    },
    toPrivacy() {
      this.$router.push({
        path: "/phone/privacyPhone",
        query: { token: this.$route.query.token, appFlag: true }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.temp {
  width: 100%;
  .backgroundColor {
    background: #fff;
  }
  .title {
    .titleDv {
      width: 18px;
    }
  }
  body {
    padding: 15px;
    padding-top: 57px;
    display: flex;
    align-items: center;
    flex-direction: column;
    .logoBox {
      display: flex;
      align-items: center;
      flex-direction: column;
      .logo {
        margin: 50px 0 0px;
        width: 63px;
        height: 63px;
        object-fit: cover;
      }
      .appName {
        margin-top: 16px;
        font-size: 23px;
        font-weight: 400;
        color: #292d33;
        line-height: 32px;
      }
      .edition {
        margin-top: 5px;
        font-size: 17px;
        font-weight: bold;
        color: #292d33;
        line-height: 20px;
      }
    }
    .choiceBox {
      width: calc(100% - 30px);
      margin-top: 35px;
      background: rgba(255, 255, 255, 1);
      // border-radius: 8px;
      // padding: 0px 0px;
      border-top: 1px solid #e4e5e6;
      .choice {
        padding: 15px 0px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e4e5e6;

        span {
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(41, 45, 51, 1);
          line-height: 20px;
        }
        img {
          margin-left: 8px;
          width: 7px;
          height: 12px;
        }
        div {
          // font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(138, 143, 153, 1);
          line-height: 20px;
        }
      }
    }
  }
}
</style>
