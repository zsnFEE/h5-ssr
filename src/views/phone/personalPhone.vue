<template>
  <div class="setting">
    <div class="backgroundColor"></div>
    <Header :title="'个人中心设置'" @toBack="toBack"> </Header>
    <!-- <header>
      <div class="title title_box">
        <img
          @click="toBack"
          src="../../assets/img/ic_back.png"
          class="titleArrow title_arrow"
        />
        <div class="titleText title_text">个人中心设置</div>
        <div class="titleDv "></div>
      </div>
    </header> -->
    <body>
      <div class="messageControl ft14" @click="commenton">
        <span>为我们评分</span>
        <img src="../../assets/img/btn_arrow_right.png" alt="" />
      </div>
      <div class="messageControl ft14" @click="toAboutApp">
        <span>关于猴猴画</span>
        <img src="../../assets/img/btn_arrow_right.png" alt="" />
      </div>
      <div class="messageControl ft14" @click="clearCache">
        <span>清理缓存</span>
        <div>{{ cachesize }}</div>
      </div>
    </body>
  </div>
</template>
<script>
import { DatetimePicker, Popup, Picker } from "vant";
import { apiInfo, updateProfile } from "../../api/common";
import Header from "../../components/header";

export default {
  components: {
    Header,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Picker.name]: Picker
  },
  data() {
    return {
      cachesize: ""
    };
  },
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.call("getcachesize", "", function(v) {});
    let that = this;
    dsBridge.registerAsyn("UploadCacheSize", function(arg1, arg2, arg3) {
      that.cachesize = JSON.parse(arg1).size;
    });
    dsBridge.registerAsyn("goback", function(arg1, arg2, arg3) {
      that.toBack();
    });
  },
  methods: {
    toAboutApp() {
      this.$router.push({
        path: "/phone/aboutAppPhone",
        query: { token: this.$route.query.token }
      });
    },
    clearCache() {
      dsBridge.call("clearcache", "", function(v) {});
      let that = this;
      dsBridge.registerAsyn("UploadCacheSize", function(arg1, arg2, arg3) {
        that.cachesize = JSON.parse(arg1).size;
      });
    },
    commenton() {
      dsBridge.call("commenton", "", function(v) {});
    },
    quit() {
      dsBridge.call("logout", "", function(v) {});
    },
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
/deep/ .van-picker__toolbar {
  padding: 15px;
}
.setting {
  padding-top: 42px;
  // background: #f2f5fa;
  height: calc(100% - 42px);
  header {
    .titleDv {
      width: 18px;
    }
  }
  body {
    margin: 15px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    padding: 7px 15px;
    .messageControl {
      color: #333333;
      // font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 0px;
      background: white;
      .InfoBox {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .infoClass {
          // font-size: 14.5px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #292d33;
          line-height: 20px;
        }
        .infoClass.active {
          color: #8a8f99;
        }
        .headimg {
          width: 21px;
          height: 21px;
          border-radius: 50%;
        }
      }

      img {
        margin-left: 8px;
        width: 7px;
        height: 12px;
      }
      span {
        // font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(41, 45, 51, 1);
        line-height: 20px;
      }
      div {
        // font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(138, 143, 153, 1);
        line-height: 20px;
      }
    }
    .noBorder {
      border: 0;
    }
  }
  .quitButton {
    margin-left: 15px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    width: calc(100% - 30px);
    padding: 20px 0px;
    border: 0px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 600;
    color: rgba(255, 85, 51, 1);
  }
  /deep/ .van-cell__right-icon {
    color: #000000;
  }
}
</style>
