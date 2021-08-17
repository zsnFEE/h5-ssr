<template>
  <div class="temp">
    <!-- <header v-show="flag">
      <img src="../../assets/img/ic_back.png" @click="toBack" />
    </header> -->

    <body>
      <div class="headFrame ">
        <div class="imgurl cursor" v-if="!imgUrl" @click="getAvatar"></div>
        <img class="cursor" v-else :src="imgUrl" @click="getAvatar" />
        <img
          class="avatarLogo cursor"
          src="../../assets/img/btn_upload.png"
          @click="getAvatar"
        />
        <div class="click_p">点击上传头像</div>
      </div>
      <div class="infoBox">
        <div class="radioBox">
          <div class="choiceBox" @click="sexrRdio(1)">
            <div class="icon_boy" :class="sexFlag == 1 ? 'active' : ''"></div>
            <div class="text" :class="sexFlag == 1 ? 'active' : ''">男生</div>
          </div>
          <div class="choiceBox" @click="sexrRdio(2)">
            <div class="icon_girl" :class="sexFlag == 2 ? 'active' : ''"></div>
            <div class="text" :class="sexFlag == 2 ? 'active' : ''">女生</div>
          </div>
        </div>
        <input type="text" placeholder="请输入宝贝名字" v-model="name" />
        <input
          readonly
          type="text"
          placeholder="请输入宝贝生日"
          v-model="birthday"
          @click="show = true"
        />
        <div class="buttonBox">
          <!-- <div
            class="video button_color"
            :class="monitor() ? 'active' : ''"
          ></div> -->
          <button
            class="button_color cursor"
            :class="monitor() ? '' : 'active'"
            @click="Submit"
          >
            完成
          </button>
        </div>
      </div>
    </body>
    <van-popup v-model="show" position="bottom" round>
      <van-datetime-picker
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="show = false"
        @confirm="onAddrConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { sendMessage } from "../../api/client";
import { DatetimePicker, Popup } from "vant";
import { isMobile } from "../../common/util";
import { apiInfo, updateProfile } from "../../api/common";
export default {
  components: {
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup
  },
  data() {
    return {
      show: false,
      sexFlag: 0,
      imgUrl: "",
      logo: "",
      mySign: false,
      name: "",
      birthday: "",
      flag: isMobile(),
      maxDate: new Date(),
      minDate: new Date(new Date(2010, 12, 1).getTime())
    };
  },
  mounted() {
    window["recvMessage"] = msg => {
      this.recvMessage(msg);
    };
    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.toBack();
    });
    if (this.$route.query.mySign) {
      this.mySign = this.$route.query.mySign;
      apiInfo().then(res => {
        if (res.code == 0) {
          this.name = res.data.nickname;
          this.sexFlag = res.data.sex;
          this.imgUrl = res.data.headimgurl;
          this.birthday = res.data.born.substr(0, 10);
          this.minDate =
            res.data.is_staff == 1
              ? new Date(new Date(1949, 12, 1).getTime())
              : new Date(new Date(2010, 12, 1).getTime());
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    }
  },
  methods: {
    monitor() {
      if (
        // this.imgUrl == "" ||
        this.sexFlag == 0 ||
        this.name == "" ||
        this.birthday == "" ||
        this.birthday == "0000-00-00"
      ) {
        return true;
      } else {
        return false;
      }
    },
    onAddrConfirm(val) {
      this.birthday = this.formatDate(val, "yyyy-MM-dd hh:mm").substr(0, 10);
      this.show = false;
    },
    // showPopup() {
    //   this.show = true;
    // },
    // offPopup() {
    //   this.show = false;
    // },
    Submit() {
      // if (this.imgUrl == "") {
      //   this.$toast("请上传头像");
      // } else
      if (this.sexFlag == 0) {
        this.$toast("请选择宝贝性别");
      } else if (this.name == "") {
        this.$toast("请填写宝贝名字");
      } else if (this.birthday == "" || this.birthday == "0000-00-00") {
        this.$toast("请选择宝贝生日");
      } else {
        updateProfile({
          sex: this.sexFlag,
          headimgurl: this.imgUrl,
          nickname: this.name,
          born: this.birthday
        }).then(res => {
          if (res.code == 0) {
            dsBridge.call("completionnewuser", "", function(v) {});
            this.$router.push({
              path: "/pc/Homepage",
              query: {
                token: this.$route.query.token
              }
            });
            let model = {
              login: true,
              headimgurl: this.imgUrl,
              nickname: this.name
            };
            sendMessage(model);
          } else {
            this.$toast(res.msg || res.message);
          }
        });
      }
    },

    // toBack() {
    //   this.$router.push({
    //     path: "/pc/Me",
    //     query: {
    //       token: this.$route.query.token
    //     }
    //   });
    // },
    sexrRdio(index) {
      this.sexFlag = index;
    },
    // 判断移动端还是pc端
    // isMobile方法
    isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return (
        flag ||
        (navigator.userAgent.toLowerCase().indexOf("macintosh") > -1 &&
          navigator.maxTouchPoints &&
          navigator.maxTouchPoints > 2)
      );
    },
    // 上传头像的方法
    getAvatar() {
      if (this.flag) {
        dsBridge.call("uploadimage", "", function(v) {});
        let that = this;
        dsBridge.registerAsyn("UploadImage", function(arg1, arg2, arg3) {
          //获取native返回的图片地址
          that.logo = JSON.parse(arg1).relative;
          that.imgUrl = JSON.parse(arg1).absolutely;
        });
      } else {
        this.getImg();
      }
    },
    getImg() {
      sendMessage({
        signal: "getImgList"
      });
    },
    recvMessage(msg) {
      console.log("试试这个:", msg, JSON.parse(msg).imgList);
      this.imgUrl = JSON.parse(msg).imgList[0].url;
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
    }
  },
  watch: {
    // 监听input框输入的长度
    name() {
      var len = 0;
      let index = -1;
      for (var i = 0; i < this.name.length; i++) {
        if (this.name[i].match(/[^\x00-\xff]/gi) != null) len += 2;
        else len += 1;
        if (len > 16) {
          this.$toast("内容太长，最多支持8个中文或16个英文，请修改后再试");
          break;
        }
        index = i;
      }
      this.name = this.name.substr(0, index + 1);
      this.name = this.name.replace(/\s+/g, "");
    }
  }
};
</script>

<style lang="less" scoped>
.temp {
  min-height: 100%;
  // background: url("../../assets/img/img_bg.png") no-repeat center center / cover;
  header {
    height: 30px;
    width: 100%;
    position: fixed;
    top: 9px;
    img {
      width: 18px;
      height: 18px;
      margin-top: 6px;
      margin-left: 16px;
    }
  }
  .headFrame {
    position: absolute;
    left: 50%;

    transform: translate(-50%, -40%);
    .imgurl {
      width: 100px;
      height: 100px;
      border-radius: 50px;
      background: url("../../assets/img/Group 3.png") no-repeat center center /
        cover;
    }
    img {
      width: 100px;
      height: 100px;
      border-radius: 50px;
      object-fit: cover;
    }
    .avatarLogo {
      position: absolute;
      width: 54px;
      height: 54px;
      top: 62.5px;
      left: 58px;
      cursor: pointer;
    }
    .click_p {
      text-align: center;
      font-size: 14px;
      margin-top: 6px;

      color: rgba(184, 191, 204, 1);
    }
  }
  body {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .infoBox {
      width: 325px;

      margin: auto;
      padding: 78.5px 35px 57px 35px;
      background: rgba(255, 255, 255, 1);
      border-radius: 20px;
      .radioBox {
        width: 100%;
        margin-bottom: 12px;
        display: flex;
        justify-content: space-around;
        margin-top: 24px;
        .choiceBox {
          display: flex;
          flex-direction: row;
          cursor: pointer;
          .text {
            margin-top: 6.5px;
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(184, 191, 204, 1);
            line-height: 22.5px;
            letter-spacing: 0.5px;
          }
          .text.active {
            color: rgba(41, 45, 51, 1);
          }
          .icon_boy {
            width: 49px;
            height: 50px;
            background: url("../../assets/img/btn_boy.png") no-repeat center
              center / cover;
          }
          .icon_boy.active {
            background: url("../../assets/img/btn_boy_selected.png") no-repeat
              center center / cover;
          }
          .icon_girl {
            width: 49px;
            height: 50px;
            background: url("../../assets/img/btn_girl.png") no-repeat center
              center / cover;
          }
          .icon_girl.active {
            background: url("../../assets/img/btn_girl_selected.png") no-repeat
              center center / cover;
          }
        }
      }
      input {
        background: rgba(242, 245, 250, 1);
        border-radius: 6px;
        border: 0px;
        width: calc(100% - 30px);
        margin-top: 15px;
        line-height: 50px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        padding: 0 15px;
      }
      input::-webkit-input-placeholder {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(184, 191, 204, 1);
      }
      .buttonBox {
        position: relative;
        width: 100%;
        margin-top: 135px;
        display: flex;
        justify-content: center;
        button {
          width: 37px;
          height: 25px;
          font-size: 18px;

          font-weight: 500;
          color: #ffffff;
          line-height: 25px;
          z-index: 1;
          width: 325px;
          height: 50px;
          background: rgba(61, 193, 125, 0.6);
          border-radius: 5px;
          border: 0;
        }
        .active {
          background: rgba(61, 193, 125, 1);
          box-shadow: #3dc17d 0 7px 15px -5px;
        }
        .video {
          position: absolute;
          top: 12.5px;
          width: 252px;
          height: 46px;
          box-shadow: 0px -1px 0px 0px rgba(255, 255, 255, 0.15);
          border-radius: 46px;
          opacity: 0.24;
          filter: blur(10px);
        }
        // .active {
        //   background: rgba(61, 193, 125, 0.6);
        //   // box-shadow: #3dc17d 0 7px 15px -5px;
        // }
      }
    }
  }
}
/deep/ .van-picker-column {
  font-size: 20px;
}
// /deep/ .van-picker {
//   height: 400px;
// }
// /deep/ .van-picker__columns {
//   height: 350px !important;
// }
// /deep/ .van-picker__frame {
//   top: 31%;
// }
</style>
