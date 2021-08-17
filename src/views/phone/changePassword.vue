<template>
  <div class="temp minHeight" :class="!isMobile && !isIos ? 'pc_box' : ''">
    <Header
      v-if="isMobile"
      :title="routeFlag == 0 ? '找回密码' : '修改密码'"
      @toBack="toBack"
    >
    </Header>
    <img
      class="imgBack cursor"
      src="../../assets/img/ic_back.png"
      alt=""
      v-if="!isMobile && routeFlag == 0"
      @click="toBack"
    />

    <div :class="!isMobile && routeFlag == 0 ? 'SignPcBody' : 'body'">
      <div class="bigTitle ft30" v-if="!isMobile">
        {{ routeFlag == 0 ? "找回密码" : "修改密码" }}
      </div>
      <div class="inputBox">
        <div class="passwordBox ft16">
          <input
            type="text"
            v-model="newPassword"
            v-if="newFlag"
            placeholder="新密码"
          />
          <input
            type="password"
            v-model="newPassword"
            v-else
            placeholder="新密码"
          />
          <img
            src="../../assets/img/ic-close.png"
            alt=""
            v-if="!newFlag"
            @click="newFlag = !newFlag"
          />
          <img
            src="../../assets/img/ic-open.png"
            alt=""
            v-else
            @click="newFlag = !newFlag"
          />
        </div>
      </div>
      <div class="inputBox">
        <div class="passwordBox ft16">
          <input
            type="text"
            v-model="confirmPassword"
            v-if="confirmFlag"
            placeholder="再次输入"
          />
          <input
            type="password"
            v-model="confirmPassword"
            v-else
            placeholder="再次输入"
          />
          <img
            src="../../assets/img/ic-close.png"
            alt=""
            v-if="!confirmFlag"
            @click="confirmFlag = !confirmFlag"
          />
          <img
            src="../../assets/img/ic-open.png"
            alt=""
            v-else
            @click="confirmFlag = !confirmFlag"
          />
        </div>
      </div>
      <div class="submitBox">
        <button class="ft18" @click="showPopup">确定</button>
      </div>
    </div>
    <!-- <van-popup v-model="show" round>
      <div class="popupDiv">
        <div class="popupText ft19">成功</div>
        <div class="popupButton ft18" @click="confirm">确认</div>
      </div>
    </van-popup> -->
  </div>
</template>

<script>
import { Popup } from "vant";
import { sendMessage } from "../../api/client";
import { updatePassword } from "../../api/common";
import { isMobile, isIos, Debounce } from "../../common/util";
import md5 from "js-md5";

export default {
  components: {
    [Popup.name]: Popup
  },
  data() {
    return {
      newPassword: "",
      newFlag: false,
      confirmPassword: "",
      confirmFlag: false,
      show: false,
      routeFlag: this.$route.query.routeFlag,
      token: this.$route.query.token,
      isMobile: isMobile(),
      isIos: isIos(),
      flag: this.$route.query.flag
    };
  },
  watch: {
    newPassword(val, old) {
      val = val.replace(/\s+/g, "");
      this.newPassword = val;
    },
    confirmPassword(val, old) {
      val = val.replace(/\s+/g, "");
      this.confirmPassword = val;
    }
  },
  methods: {
    toBack() {
      // this.$router.go(-1);
      if (this.routeFlag == 0) {
        this.$router.push({
          path: "/phone/retrievePassword",
          query: { flag: this.flag }
        });
      } else {
        this.$router.push({
          path: "/phone/accessCode",
          query: { flag: this.flag }
        });
      }
    },
    showPopup: Debounce(function() {
      if (this.newPassword == "") {
        this.$toast("新密码不能为空");
      } else if (this.confirmPassword == "") {
        this.$toast("确认密码不能为空");
      } else if (this.newPassword != this.confirmPassword) {
        this.$toast("两次密码不一致");
      } else if (
        !/^[0-9a-zA-Z_]{6,16}$/.test(this.newPassword) &&
        !/^[0-9a-zA-Z_]{6,16}$/.test(this.confirmPassword)
      ) {
        this.$toast("密码格式为字母与数字，长度为6~16个字符");
      } else {
        updatePassword({
          token: this.token,
          password: md5(this.newPassword),
          confirm_password: md5(this.confirmPassword)
        }).then(res => {
          if (res.code == 0) {
            this.$toast("密码修改成功");
            if (this.routeFlag == 0) {
              sendMessage({ signal: "retrieveSuccess" });
              dsBridge.call("gonativelogin", "", function(v) {});
            } else {
              sendMessage({ signal: "modifySuccess" });
              if (this.flag == 1) {
                this.$router.push({
                  path: "phone/settingPhone"
                });
              } else {
                this.$router.push({
                  path: "/pc/Personalpc"
                });
              }
            }
          } else {
            this.$toast(res.msg || res.message);
          }
        });
      }
    }, 500),
    confirm() {
      this.show = false;

      // if (this.routeFlag == 0) {
      //   sendMessage({ signal: "retrieveSuccess" });
      //   dsBridge.call("gonativelogin", "", function(v) {});
      // } else {
      //   sendMessage({ signal: "modifySuccess" });
      //   if (this.isMobile) {
      //     this.$router.push({
      //       path: "/pad/personalCenter"
      //     });
      //   }
      // }
      // retrieveSuccess
    }
  }
};
</script>

<style lang="less" scoped>
.van-popup--round {
  border-radius: 5px;
}
.temp {
  .imgBack {
    position: fixed;
    top: 20px;
    left: 20px;
    width: 18px;
    height: 18px;
  }
  &.pc_box {
    height: calc(100vh - 40px);
    padding: 0 45px;
    // background: #f3f5f9;
    .body {
      padding: 0;
      background: #ffffff;
      height: calc(100vh - 40px);
      border-radius: 8px;
      .bigTitle {
        margin-bottom: 30px;
        margin-top: 80px;
      }
    }
  }
  header {
    .title {
      z-index: 3;
      height: 42px;

      .titleDv {
        width: 18px;
      }
    }
  }
  .popupDiv {
    width: 359px;
    height: 137px;
    background: #ffffff;
    // border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .popupText {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;

      font-weight: 400;
      color: #333333;
    }
    .popupButton {
      font-weight: 400;
      color: #676869;
      text-align: center;
      line-height: 53px;
      max-height: 53px;
      height: 53px;
      border-top: 1px solid #cecece;
    }
  }
  .body {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 25px;
    padding-top: 71px;
    .bigTitle {
      max-width: 325px;
      width: 100%;
      font-weight: bold;
      color: #333333;
      line-height: 42px;
      margin-bottom: 56px;
    }
    .inputBox {
      margin-top: 24px;
      width: 100%;
      max-width: 325px;
      .inputTitle {
        padding: 0px 31px 16px;
        font-weight: 400;
        color: #666666;
        line-height: 22px;
      }
      .passwordBox {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // width: 527px;
        width: 100%;
        max-width: 325px;
        height: 50px;
        background: #f2f5fa;
        border-radius: 5px;
        // border: 1px solid #cccccc;
        input {
          height: 100%;
          width: 100%;
          width: 100%;
          border-radius: 5px;
          background: #f2f5fa;
          border: 0;
          padding: 0 15px;
        }
        img {
          width: 26px;
          height: 26px;
          min-width: 26px;
          min-height: 26px;
          margin-right: 17px;
        }
      }
    }
    .submitBox {
      width: 100%;
      margin-top: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        width: 100%;
        max-width: 325px;
        height: 50px;
        background: #3dc17d;
        border-radius: 5px;
        border: 0;
        font-weight: 400;
        color: #ffffff;
        line-height: 24px;
      }
    }
  }
  .SignPcBody {
    display: flex;
    align-items: center;
    flex-direction: column;
    // padding: 25px;
    padding-top: 80px;
    .bigTitle {
      max-width: 325px;
      width: 100%;
      font-weight: bold;
      color: #333333;
      line-height: 33px;
      margin-bottom: 18px;
      font-size: 24px;
    }
    .inputBox {
      margin-top: 12px;
      width: 100%;
      max-width: 325px;
      .inputTitle {
        padding: 0px 31px 16px;
        font-weight: 400;
        color: #666666;
        line-height: 22px;
      }
      .passwordBox {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // width: 527px;
        width: 100%;
        max-width: 325px;
        height: 40px;
        background: #f2f5fa;
        border-radius: 5px;
        // border: 1px solid #cccccc;
        input {
          height: 100%;
          width: 100%;
          width: 100%;
          border-radius: 5px;
          background: #f2f5fa;
          border: 0;
          padding: 0 10px;

          font-size: 12px;
        }
        img {
          width: 26px;
          height: 26px;
          min-width: 26px;
          min-height: 26px;
          margin-right: 17px;
        }
      }
    }
    .submitBox {
      width: 100%;
      margin-top: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        font-size: 14px;
        width: 100%;
        max-width: 325px;
        height: 40px;
        background: #3dc17d;
        border-radius: 5px;
        border: 0;
        font-weight: 400;
        color: #ffffff;
        line-height: 24px;
      }
    }
  }
}
</style>
