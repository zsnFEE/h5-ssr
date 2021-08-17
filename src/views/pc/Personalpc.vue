<template>
  <div class="set">
    <div class="bgpc"></div>
    <Header v-if="flag" :title="'个人资料'" @toBack="toBack"> </Header>

    <div class="header_blockpc" v-else>
      个人资料
    </div>
    <!--body部分开始-->
    <div class="set_box" :class="flag ? 'padContain' : ''">
      <div class="administration">
        <div class="address_list" @click="ChangeHeader">
          <div class="address_name">头像</div>
          <div class="img_right">
            <img class="header" v-if="headimgurl" :src="headimgurl" alt="" />
            <img src="../../assets/img/btn_arrow.png" />
          </div>
        </div>
        <div class="address_list" @click="toNickname">
          <div class="address_name">昵称</div>
          <div class="img_right">
            <div :class="nickname ? 'font' : 'mes'">
              <input
                readonly
                type="text"
                placeholder="未填写"
                v-model="nickname"
              />
            </div>
            <img src="../../assets/img/btn_arrow.png" />
          </div>
        </div>
        <div class="address_list" @click="sex = true">
          <div class="address_name">性别</div>
          <div class="img_right">
            <div :class="gender ? 'font' : 'mes'">
              <input
                readonly
                type="text"
                placeholder="未填写"
                v-model="gender"
              />
            </div>
            <img src="../../assets/img/btn_arrow.png" />
          </div>
        </div>
        <div class="address_list" @click="popup = true">
          <div class="address_name">生日</div>
          <div class="img_right">
            <div :class="birthday ? 'font' : 'mes'">
              <input
                readonly
                type="text"
                v-model="birthday"
                placeholder="未填写"
              />
            </div>
            <img src="../../assets/img/btn_arrow.png" />
          </div>
        </div>
        <div class="address_list" @click="toAddressList">
          <div class="address_name">收货地址</div>
          <div class="img_right">
            <img src="../../assets/img/btn_arrow.png" />
          </div>
        </div>
        <div class="address_list" @click="toReplacephone">
          <div class="address_name">手机号</div>
          <div class="img_right">
            <div class="font" v-if="phone">
              {{ mphone }}
            </div>
            <div class="mes" v-else>
              未填写
            </div>
            <img src="../../assets/img/btn_arrow.png" />
          </div>
        </div>
        <div class="address_list" @click="toAccessCode">
          <div class="address_name">修改密码</div>
          <div class="img_right">
            <img src="../../assets/img/btn_arrow.png" />
          </div>
        </div>
        <!--微信账号绑定开始-->
        <!-- <div
          class="address_list"
          v-show="flag"
          v-if="is_bind_wx == 0"
          @click="bindingwechat"
        >
          <div class="address_name">绑定微信</div>
          <div class="img_right">
            <div class="font">
              未绑定
            </div>
            <img src="../../assets/img/btn_arrow.png" />
          </div>
        </div>
        <div
          class="address_list"
          v-show="flag"
          v-if="is_bind_wx == 1"
          @click="show = !show"
        >
          <div class="wechat">
            <div class="address_name">绑定微信</div>
            <div class="wechatfont">已绑定土拨鼠快乐星球</div>
          </div>
          <div class="img_right">
            <div class="btn">
              解绑
            </div>
            <img src="../../assets/img/btn_arrow.png" />
          </div>
        </div> -->
        <!--微信账号绑定结束-->
      </div>
    </div>
    <!--body部分结束-->
    <!--性别部分开始-->
    <van-popup v-model="sex" position="bottom" round>
      <van-picker
        title=""
        show-toolbar
        :columns="columns"
        @confirm="onGender"
        @cancel="sex = false"
        @change="onChange"
        :default-index="0"
      />
    </van-popup>

    <!--性别部分结束-->
    <!--生日部分开始-->
    <van-popup v-model="popup" position="bottom" round>
      <van-datetime-picker
        type="date"
        v-model="currentDate"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="popup = false"
        @confirm="onAddrConfirm"
      />
    </van-popup>
    <!--生日部分结束-->
    <!-- 弹出框开始 -->
    <transition name="alert_box">
      <div class="coutoast" v-show="show" @touchmove.stop.prevent>
        <div class="coutoast_box">
          <div class="alert">
            <div class="text_title">微信账号解绑</div>
            <div class="mintitle">要解除当前绑定的微信账号吗？</div>
            <!-- 确认和取消按钮开始 -->
            <div class="alert_btn">
              <div class="cancel cursor" @click="show = false">取消</div>
              <div class="affirm cursor" @click="unbound">
                确认解绑
              </div>
            </div>
            <!-- 确认和取消按钮结束 -->
          </div>
        </div>
      </div>
      <!-- 弹出框结束 -->
    </transition>
  </div>
</template>
<script>
import { sendMessage } from "../../api/client";

import { isMobile } from "../../common/util";
import { DatetimePicker, Popup, Picker } from "vant";
import { apiInfo, updateProfile, wxUnbind } from "../../api/common";
export default {
  components: {
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Picker.name]: Picker
  },
  data() {
    return {
      show: false,
      cachesize: "",
      headimgurl: "", //后台传过来的头像
      logo: "",
      flag: isMobile(),
      popup: false, //生日的弹出框
      sex: false,
      maxDate: new Date(),
      minDate: new Date(new Date(1899, 12, 1).getTime()),
      birthday: "", //生日
      columns: ["男", "女"],
      gender: "",
      messageData: "", //个人信息,
      nickname: "", //昵称
      phone: "", //电话
      mphone: "", //截取过的电话
      is_bind_wx: "",
      currentDate: new Date()
    };
  },
  mounted() {
    window["recvMessage"] = msg => {
      this.recvMessage(msg);
    };
    apiInfo().then(res => {
      this.messageData = res.data;
      this.headimgurl = res.data.headimgurl;
      if (res.data.born.substr(0, 10) == "0000-00-00") {
        this.currentDate = new Date();
      } else {
        this.currentDate = new Date(res.data.born);
      }

      this.nickname = this.$route.query.nickname || res.data.nickname;
      let model = {
        changetype: "1", //修改昵称
        nickname: this.nickname //昵称
      };
      sendMessage(model);
      if (res.data.sex == 1) {
        this.gender = "男";
      } else if (res.data.sex == 2) {
        this.gender = "女";
      } else if (res.data.sex == 0) {
        this.gender = "未填写";
      }
      this.minDate =
        res.data.is_staff == 1
          ? new Date(new Date(1899, 12, 1).getTime())
          : new Date(new Date(1899, 12, 1).getTime());
      this.birthday = res.data.born.substr(0, 10);

      this.mphone =
        res.data.phone.substr(0, 3) + "****" + res.data.phone.substr(7);
      this.phone = res.data.phone;
    });

    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.toBack();
    });
    dsBridge.call("getcachesize", "", function(v) {});
    let that = this;
    dsBridge.registerAsyn("UploadCacheSize", function(arg1, arg2, arg3) {
      that.cachesize = JSON.parse(arg1).size;
    });
  },
  methods: {
    // 绑定微信
    bindingwechat() {
      dsBridge.call("bindingwechat", "", function(v) {});
    },
    //确认解除绑定按钮
    unbound() {
      wxUnbind().then(res => {
        if (res.code == 0) {
          this.$toast("解绑成功");
          this.is_bind_wx = 0;
          this.show = !this.show;
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    },
    // 更换头像
    ChangeHeader() {
      if (this.flag) {
        // console.log("手机端");
      } else {
        // console.log("pc端");
      }
      dsBridge.call("uploadimage", "", function(v) {});
      let that = this;
      dsBridge.registerAsyn("UploadImage", function(arg1, arg2, arg3) {
        //获取native返回的图片地址
        that.logo = JSON.parse(arg1).relative;
        let imgUrl = JSON.parse(arg1).absolutely;
        updateProfile({
          headimgurl: imgUrl
        }).then(res => {
          if (res.code == 0) {
            that.headimgurl = imgUrl;
            that.$toast("修改成功");
          }
        });
      });
      that.getImg();
    },
    getImg() {
      sendMessage({
        signal: "getImgList"
      });
    },
    recvMessage(msg) {
      let imgurl = JSON.parse(msg).imgList[0].url;
      updateProfile({
        headimgurl: imgurl
      }).then(res => {
        if (res.code == 0) {
          this.headimgurl = imgurl;
          let model = {
            changetype: "0", //修改头像
            headimgurl: this.headimgurl //头像
          };
          sendMessage(model);
          this.$toast("修改成功");
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    },
    //去修改昵称
    toNickname() {
      this.$router.push({
        path: "/pc/Nickname",
        query: {
          token: this.$route.query.token,
          nickname: this.nickname
        }
      });
    },
    // 去更换手机号页面
    toReplacephone() {
      // 如果有手机号就可以跳转到更换手机号页面
      if (this.phone) {
        localStorage.setItem("phone", this.phone);
        this.$router.push({
          path: "/pc/Replacephone",
          query: {
            token: this.$route.query.token,
            phone: this.phone
          }
        });
      } else {
        // 如果没有手机号提醒暂无手机号
        this.$toast("暂无手机号");
      }
    },
    toAccessCode() {
      this.$router.push({
        path: "/phone/accessCode",
        query: { flag: 0 }
      });
    },
    // 性别的方法开始
    onGender(value, index) {
      this.sex = false;
      this.gender = value;
      updateProfile({
        sex: index + 1
      }).then(res => {
        if (res.code == 0) {
          // console.log(res);
          this.$toast("修改成功");
        }
      });
    },
    onChange(picker, value, index) {
      // console.log("onchange", picker);
    },

    // 性别的方法结束
    // 生日部分的方法开始
    onAddrConfirm(val) {
      this.birthday = this.formatDate(val, "yyyy-MM-dd hh:mm").substr(0, 10);
      updateProfile({
        born: this.formatDate(val, "yyyy-MM-dd hh:mm").substr(0, 10)
      }).then(res => {
        if (res.code == 0) {
          // console.log(res);
          this.$toast("修改成功");
        }
      });
      this.popup = false;
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
    // 生日部分的方法结束
    toBack() {
      this.$router.push({
        path: "/pc/Me",
        query: { token: this.$route.query.token }
      });
    },
    toAddressList() {
      // localStorage.setItem("WebpageId", -2);
      this.$router.push({
        path: "/pc/Selectaddress",
        query: {
          // addressIndex: -2,
          token: this.$route.query.token
        }
      });
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
/deep/ .van-picker__confirm {
  font-size: 16px;
  font-weight: bold;
  padding: 0 30px;
}
/deep/.van-picker__cancel {
  font-size: 16px;
  font-weight: bold;
  padding: 0 30px;
}
.van-picker__toolbar {
  height: 50px;
}
.new_header {
  width: 100%;
  padding: 8px 20px 8px 21px;
  background: #fff;
  display: flex;
  box-sizing: border-box;
}
.header_blockpc {
  width: 100%;
  padding: 11px 20px;
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
  padding: 20px 20px 0px;
  background: #f3f5f9;
  width: 100%;
  box-sizing: border-box;
  &.padContain {
    padding: 80px 120px 0px;
  }
}
// 地址管理部分
.administration {
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  padding: 15px 30px 15px;
  position: relative;
  margin-bottom: 15px;
}
.address_list {
  width: 100%;
  display: flex;
  // border-bottom: 1px solid #f2f5fa;
  padding-bottom: 15px;
  padding-top: 15px;
  // position: relative;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  .btn {
    background: #ffffff;
    border-radius: 32px;
    border: 2px solid #d8d8d8;
    padding: 4px 18px;
    box-sizing: border-box;
    cursor: pointer;
    margin-right: 13px;
    font-size: 16px;
    font-weight: 400;
    color: #18191a;
  }
  .wechat {
    display: flex;
    align-items: center;
    .wechatfont {
      margin-left: 8px;
      font-size: 14px;
      font-weight: 400;
      color: #666666;
    }
  }
}
.set_list {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 14px;
  padding-top: 14px;
}
.address_name {
  font-size: 16px;
  font-weight: 500;
  color: #292d33;
}
.dele {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(138, 143, 153, 1);
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
  object-fit: cover;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  margin-right: 9px;
  position: absolute;
  right: 39px;
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
  color: #8a8f99;
  margin-right: 9px;
}
.img_right .font input::-webkit-input-placeholder {
  color: #8a8f99;
  font-weight: 400;
  font-size: 14px;
}
/deep/ .van-picker-column {
  font-size: 20px;
}
.coutoast {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  z-index: 9;
  font-size: 16px;
  .coutoast_box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .alert {
    width: 300px;
    height: 145px;
    background: #fff;
    border-radius: 16px;
    // position: absolute;
    top: 50%;
    left: 50%;
    animation: mymove 0.3s;
    box-sizing: border-box;
    .text_title {
      text-align: center;
      padding: 20px 0px 7px;
      font-size: 18px;
      font-weight: 500;
    }
    .mintitle {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #8a8f99;
      text-align: center;
      margin-bottom: 20px;
    }
    .alert_btn {
      font-size: 17px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-top: 0.5px solid rgba(237, 238, 239, 1);
      width: 100%;
      .cancel,
      .affirm {
        width: 50%;
        text-align: center;
        padding: 10.5px 0;
      }
      .cancel:active {
        background: #e6e6e6;
        border-bottom-left-radius: 16px;
      }
      .affirm:active {
        background: #e6e6e6;
        border-bottom-right-radius: 16px;
      }
      .cancel {
        border-right: 0.5px solid rgba(237, 238, 239, 1);
        color: rgba(24, 25, 26, 1);
      }
      .affirm {
        color: #ee0a24;
      }
    }
  }
}
.alert_box-enter-active,
.alert_box-leave-active {
  transition: opacity 0.5s;
}
.alert_box-enter,
.alert_box-leave-to {
  opacity: 0;
}

@keyframes mymove {
  0% {
    transform: scale(0); /*开始为原始大小*/
  }
  100% {
    transform: scale(1);
  }
}
// /deep/.van-picker__cancel,
// .van-picker__confirm {
//   font-weight: 500;
//   color: #999999;
// }
.sex {
  .van-picker__columns {
    height: 195px !important;
  }
  .van-picker__frame {
    top: 67% !important;
  }
  .van-picker__mask {
    background-size: 100% 45px !important;
  }
}
// /deep/.van-picker-column {
//   font-weight: 500;
//   color: #666666;
//   line-height: 35px;
// }

// ::v-deep .van-picker-column__item--selected {
//   background: rgba(61, 193, 125, 1);
// }
::v-deep .van-picker__frame {
  background: #e8eaee;
  opacity: 0.3;
  right: 80px;
  left: 80px;
}
::v-deep .van-picker-column {
  z-index: 9;
}
::v-deep .van-picker__mask {
  z-index: 10;
}
::v-deep .van-picker__mask ::after {
  border: 0px;
}
// ::v-deep .sexstyle {
//   .van-picker__toolbar {
//     padding: 15px 0px;
//     margin: 0 15px;
//     // padding-top: 20px;
//     position: absolute;
//     z-index: 3;
//     top: 0;
//     width: calc(100% - 30px);
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
