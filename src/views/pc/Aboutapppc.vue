<template>
  <div class="set">
    <div class="bgpc" :class="!flag ? 'grey' : ''"></div>
    <div class="new_header" v-show="flag">
      <div class="back" @click="toBack">
        <img src="../../assets/img/ic_back.png" />
      </div>
      <!-- <div class="new_font">关于猴猴画</div> -->
    </div>
    <div class="header_blockpc" v-show="!flag">
      关于Dipper
    </div>
    <div v-show="!flag" class="set_box">
      <div class="administration">
        <div class="set_list">
          <div class="address_name">当前版本</div>
          <div style="display: flex; ">
            <div class="dele">Version {{ version }}</div>
            <div class="img_right">
              <!-- <img src="../../assets/img/btn_arrow.png" /> -->
            </div>
          </div>
        </div>
        <div class="address_list" @click="policyPhone">
          <div class="address_name">Dipper用户协议</div>
          <div class="img_right">
            <img src="../../assets/img/btn_arrow.png" />
          </div>
        </div>
        <div class="address_list" @click="privacyPhone">
          <div class="address_name">Dipper隐私政策</div>
          <div class="img_right">
            <img src="../../assets/img/btn_arrow.png" />
          </div>
        </div>
      </div>
    </div>

    <div v-show="flag" class="ipadBody">
      <div class="logoBox">
        <img src="../../assets/img/img_logo2.png" alt="" class="logo" />
        <div class="appName">Dipper</div>
        <div class="edition">Version{{ version }}</div>
      </div>
      <div class="choiceBox">
        <div class="choice ft14" @click="policyPhone">
          <span>Dipper用户协议</span>
          <img src="../../assets/img/btn_arrow_right.png" alt="" />
        </div>
        <div class="choice ft14" @click="privacyPhone">
          <span>Dipper隐私政策</span>
          <img src="../../assets/img/btn_arrow_right.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { sendMessage } from "../../api/client";
import { isMobile } from "../../common/util";
import { apiInfo, updateProfile } from "../../api/common";
export default {
  components: {},
  data() {
    return {
      flag: isMobile(),
      version: ""
    };
  },
  mounted() {
    window["recvMessage"] = msg => {
      this.recvMessage(msg);
    };
    this.getVersion();

    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.toBack();
    });
    dsBridge.call("getversion", "", function(v) {});
    let that = this;
    dsBridge.registerAsyn("Uploadversion", function(arg1, arg2, arg3) {
      that.version = "v" + " " + JSON.parse(arg1).version;
    });
  },
  methods: {
    getVersion() {
      sendMessage({
        signal: "getVersion"
      });
    },
    recvMessage(msg) {
      if (localStorage.getItem("version") != undefined) {
        this.version = localStorage.getItem("version");
      } else {
        this.version = "v" + " " + JSON.parse(msg).version;
        let v = "v" + " " + JSON.parse(msg).version;
        localStorage.setItem("version", v);
      }
    },
    //去用户协议
    policyPhone() {
      this.$router.push({
        path: "/pc/policyPhone",
        query: { about: 1 }
      });
    },
    //去隐私政策页面
    privacyPhone() {
      this.$router.push({
        path: "/pc/privacyPhone",
        query: { about: 1 }
      });
    },
    // 评分的方法结束
    toBack() {
      this.$router.go(-1);
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.header_blockpc {
  padding: 11px 20px;
}
.bgpc {
  background: #fff;
}
.grey {
  background: #f3f5f9;
}
.new_header {
  width: 100%;
  padding: 8px 20px 8px 21px;
  background: #fff;
  display: flex;
  align-items: center;
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

.set_box {
  padding: 20px 20px 20px;
  background: #f3f5f9;

  width: 100%;

  box-sizing: border-box;
}
// 地址管理部分
.administration {
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  padding: 0px 20px 0px;
  position: relative;
  margin-bottom: 15px;
}
.address_list {
  width: 100%;
  display: flex;
  // border-bottom: 1px solid #f2f5fa;
  justify-content: space-between;
  padding-bottom: 15px;
  padding-top: 15px;
  // position: relative;
  cursor: pointer;
  align-items: center;
}
.set_list {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  padding-top: 15px;
}
.address_name {
  font-size: 16px;
  font-weight: bolder;
  color: #292d33;
  line-height: 34px;
}
.dele {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(138, 143, 153, 1);
  margin-right: 17px;
}
.img_right {
  // position: absolute;
  right: 1px;
  display: flex;
  align-items: center;
}
.img_right img {
  width: 7px;
  height: 12px;
}
.img_right .header {
  width: 21px;
  height: 21px;
  border-radius: 50%;
  margin-right: 13px;
}
.img_right input {
  border: 0;
  text-align: right;
}
.img_right .mes input::-webkit-input-placeholder {
  color: #8a8f99;
  font-weight: 400;
  font-size: 14px;
}
.img_right .mes {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #8a8f99;
  margin-right: 9px;
}
.img_right .font {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #292d33;
  margin-right: 9px;
}
.img_right .font input::-webkit-input-placeholder {
  color: #292d33;
  font-weight: 400;
  font-size: 14px;
}
/deep/ .van-picker-column {
  font-size: 20px;
}

.logo {
  display: flex;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 50px;
  align-items: center;
  img {
    width: 185px;
  }
}
.ipadBody {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 315px;
  margin: 0 auto;
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
</style>
