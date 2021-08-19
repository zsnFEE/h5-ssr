<template>
  <div class="setting">
    <div class="backgroundColor"></div>
    <Header :title="'个人资料'" @toBack="toBack"> </Header>
    <body>
      <div class="messageControl ft14" @click="getAvatar">
        <span>头像</span>
        <div class="InfoBox">
          <img :src="user.headimgurl" class="headimg" />
          <img src="../../assets/img/btn_arrow_right.png" alt="" />
        </div>
      </div>
      <div class="messageControl ft14" @click="toUpdateName">
        <span>昵称</span>
        <div class="InfoBox">
          <div class="infoClass ft14" :class="user.nickname ? '' : 'active'">
            {{ user.nickname ? user.nickname : "未填写" }}
          </div>
          <img src="../../assets/img/btn_arrow_right.png" alt="" />
        </div>
      </div>
      <div class="messageControl ft14" @click="showPopup">
        <span>性别</span>
        <div class="InfoBox">
          <div class="infoClass ft14" :class="user.sex == 0 ? 'active' : ''">
            {{ user.sex == 0 ? "未填写" : user.sex == 1 ? "男" : "女" }}
          </div>
          <img src="../../assets/img/btn_arrow_right.png" alt="" />
        </div>
      </div>
      <div class="messageControl ft14" @click="showDatetime">
        <span>生日</span>
        <div class="InfoBox">
          <div
            class="infoClass ft14"
            :class="
              user.born && user.born.substr(0, 10) != '0000-00-00'
                ? ''
                : 'active'
            "
          >
            {{
              user.born && user.born.substr(0, 10) != "0000-00-00"
                ? user.born.substr(0, 10)
                : "未填写"
            }}
          </div>
          <img src="../../assets/img/btn_arrow_right.png" alt="" />
        </div>
      </div>
      <div class="messageControl ft14" @click="toAddressList">
        <span>收货地址</span>
        <img src="../../assets/img/btn_arrow_right.png" alt="" />
      </div>
      <div class="messageControl ft14" @click="replacePhone">
        <span>手机号</span>
        <div class="InfoBox">
          <div class="infoClass ft14" :class="user.phone ? '' : 'active'">
            {{
              user.phone
                ? user.phone.substr(0, 3) + "****" + user.phone.substr(7, 4)
                : "未填写"
            }}
          </div>
          <img src="../../assets/img/btn_arrow_right.png" alt="" />
        </div>
      </div>
      <div class="messageControl ft14" @click="toAccessCode">
        <span>修改密码</span>
        <div class="InfoBox">
          <img src="../../assets/img/btn_arrow_right.png" alt="" />
        </div>
      </div>
      <div class="messageControl ft14" v-if="false">
        <div class="weChatInfo">
          <span>绑定微信</span>
          <div class="weChatName">
            {{ user.is_bind_wx == 1 ? "解绑" : "未绑定" }}
          </div>
        </div>
        <div class="InfoBox">
          <button
            @click="toBinding"
            class="infoButton"
            :class="user.is_bind_wx == 1 ? '' : 'active'"
          >
            {{ user.is_bind_wx == 1 ? "解绑" : "绑定" }}
          </button>
          <!-- <div
            class="infoClass ft14"
            :class="user.is_bind_wx ? '' : 'active'"
          ></div> -->
          <img src="../../assets/img/btn_arrow_right.png" alt="" />
        </div>
      </div>
    </body>
    <van-dialog
      v-model="dialogShow"
      title="微信账号解绑"
      show-cancel-button
      confirm-button-text="解除绑定"
      @confirm="receiving"
    >
      要解除当前绑定的微信账号吗？
    </van-dialog>

    <van-popup v-model="datetimeShow" position="bottom" round>
      <van-datetime-picker
        type="date"
        v-model="currentDate"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="datetimeShow = false"
        @confirm="onAddrConfirm"
      />
    </van-popup>
    <van-popup v-model="show" position="bottom" round>
      <van-picker
        title=""
        show-toolbar
        :columns="columns"
        @cancel="show = false"
        @confirm="onConfirm"
        :default-index="user.sex == 0 ? 0 : user.sex - 1"
      />
    </van-popup>
  </div>
</template>
<script>
import { DatetimePicker, Popup, Picker, Dialog } from "vant";
import { apiInfo, updateProfile, wxUnbind } from "../../api/common";
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Picker.name]: Picker
  },
  data() {
    return {
      checked: false,
      cachesize: "",
      user: {},
      show: false,
      columns: ["男", "女"],
      datetimeShow: false,
      maxDate: new Date(),
      minDate: new Date(new Date(1899, 12, 1).getTime()),
      dialogShow: false,
      currentDate: new Date()
    };
  },
  mounted() {
    apiInfo().then(res => {
      if (res.code == 0) {
        this.user = res.data;
        if (this.user.born.substr(0, 10) == "0000-00-00") {
          this.currentDate = new Date();
        } else {
          this.currentDate = new Date(this.user.born);
        }
        this.minDate =
          res.data.is_staff == 1
            ? new Date(new Date(1899, 12, 1).getTime())
            : new Date(new Date(1899, 12, 1).getTime());
      } else {
        this.$toast(res.msg || res.message);
      }
    });
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
    receiving() {
      wxUnbind().then(res => {
        if (res.code == 0) {
          this.$toast("解绑成功");
          this.user.is_bind_wx = 0;
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    },

    toBinding() {
      if (this.user.is_bind_wx == 0) {
        dsBridge.call("bindingwechat", "", function(v) {});
      } else {
        this.dialogShow = !this.dialogShow;
      }
    },

    updatePart(key, val, arr) {
      let model = {};
      model[key] = val;
      updateProfile(model).then(res => {
        if (res.code == 0) {
          this.user = arr;
          this.$toast("修改成功");
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    },
    getAvatar() {
      dsBridge.call("uploadimage", "", function(v) {});
      let that = this;
      dsBridge.registerAsyn("UploadImage", function(arg1, arg2, arg3) {
        let logo = JSON.parse(arg1).relative;
        let imgUrl = JSON.parse(arg1).absolutely;
        let arr = {
          nickname: that.user.nickname,
          born: that.user.born,
          sex: that.user.sex,
          headimgurl: imgUrl,
          phone: that.user.phone
        };
        that.updatePart("headimgurl", imgUrl, arr);
      });
    },
    toUpdateName() {
      this.$router.push({
        path: "/phone/updateNamePhone",
        query: { token: this.$route.query.token, name: this.user.nickname }
      });
    },
    replacePhone() {
      this.$router.push({
        path: "/phone/replacePhone",
        query: { token: this.$route.query.token, phone: this.user.phone }
      });
    },
    toAccessCode() {
      this.$router.push({
        path: "/phone/accessCode",
        query: { flag: 1 }
      });
    },
    onAddrConfirm(val) {
      let born = this.formatDate(val, "yyyy-MM-dd hh:mm").substr(0, 10);
      let arr = {
        nickname: this.user.nickname,
        born: born,
        sex: this.user.sex,
        headimgurl: this.user.headimgurl,
        phone: this.user.phone
      };
      this.updatePart("born", born, arr);
      this.$toast("修改成功");
      this.datetimeShow = false;
    },
    formatDate(date, fmt) {
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      let o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds()
      };
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + "";
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : this.padLeftZero(str)
          );
        }
      }
      return fmt;
    },
    padLeftZero(str) {
      return ("00" + str).substr(str.length);
    },
    onConfirm(value, index) {
      // this.user.sex = index + 1;
      let arr = {
        nickname: this.user.nickname,
        born: this.user.born,
        sex: index + 1,
        headimgurl: this.user.headimgurl,
        phone: this.user.phone
      };
      this.updatePart("sex", index + 1, arr);
      this.show = false;
    },
    showPopup() {
      this.show = true;
    },
    offPopup() {
      this.datetimeShow = false;
    },
    offDatetimePopup() {
      this.show = false;
    },
    showDatetime() {
      this.datetimeShow = true;
    },
    clearCache() {
      dsBridge.call("clearcache", "", function(v) {});
      let that = this;
      dsBridge.registerAsyn("UploadCacheSize", function(arg1, arg2, arg3) {
        that.cachesize = JSON.parse(arg1).size;
      });
    },
    toAddressList() {
      localStorage.setItem("WebpageId", -2);
      this.$router.push({
        path: "/phone/choiceAddressPhone",
        query: {
          addressIndex: -2,
          token: this.$route.query.token
        }
      });
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
/deep/ .van-dialog__header {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #2b2c30;
  line-height: 25px;
  padding-top: 20px;
}

/deep/ .van-dialog__content {
  margin-top: 7px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #8a8f99;
  line-height: 22px;
  margin-bottom: 20px;
  text-align: center;
}

/deep/ .van-picker__toolbar {
  padding: 15px;
}
/deep/.van-overlay {
  background-color: rgba(0, 0, 0, 0.5);
}
// /deep/ .van-picker__columns {
//   height: 210px !important;
// }
// /deep/ .van-picker__frame {
//   top: 63% !important;
// }
/deep/ .van-dialog {
  width: 300px;
  border-radius: 10px;
  top: 37%;
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
      width: 100%;
      box-sizing: border-box;
      .weChatInfo {
        display: flex;
        align-items: center;
        width: 70%;
        .weChatName {
          width: 70%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-left: 8px;
          font-size: 12px;
          font-weight: 400;
          color: #8a8f99;
          line-height: 16px;
        }
      }
      .InfoBox {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;

        .infoClass {
          // font-size: 14.5px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #292d33;
          line-height: 20px;
          word-wrap: break-word;
          max-width: 50vw;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .infoClass.active {
          color: #8a8f99;
        }
        .infoButton {
          width: 65px;
          height: 30px;
          background: #ffffff;
          border-radius: 7px;
          border: 1px solid #d8d8d8;
          box-sizing: border-box;
          font-size: 14px;
          font-weight: 400;
          color: #333333;
          line-height: 20px;
          position: absolute;
          right: 15px;
        }
        .infoButton.active {
          background: #3dc17d;
          color: #ffffff;

          border: 0px;
        }
        .headimg {
          width: 21px;
          height: 21px;
          border-radius: 50%;
          object-fit: cover;
        }
      }

      img {
        margin-left: 8px;
        width: 7px;
        height: 12px;
      }
      span {
        // font-size: 14px;
        // font-size: 3.7333vw;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(41, 45, 51, 1);
        line-height: 20px;
      }
      div {
        // font-size: 14px;
        // font-size: 3.7333vw;
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
::v-deep .van-picker__frame {
  background: #e8eaee;
  opacity: 0.3;
}
::v-deep .van-picker-column {
  z-index: 9;
}
::v-deep .van-picker__mask {
  z-index: 10;
}
// ::v-deep .sexstyle {
//   .van-picker__toolbar {
//     padding: 15px;
//     padding-bottom: 0px;
//     position: absolute;
//     z-index: 3;
//     bottom: 173px;
//     width: 100%;
//     box-sizing: border-box;
//   }

//   .van-picker__columns {
//     height: 217px !important;
//   }
//   .van-picker__frame {
//     top: 56%;
//   }
//   .van-picker__mask {
//     background-size: 100% 87px !important;
//   }
//   ul li:nth-child(1) {
//     height: 26px !important;
//   }
//   ul li:nth-child(2) {
//     height: 55px !important;
//   }
// }
</style>
