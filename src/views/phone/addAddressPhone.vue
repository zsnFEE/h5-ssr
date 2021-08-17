<template>
  <div class="addAdress">
    <body class="temp">
      <div class="successTemp">
        <div class="iconBox">
          <p>
            <img src="../../assets/img/ic_success.png" class="successIcon" />
          </p>
          <div class="successText">支付成功</div>
        </div>
      </div>
      <div class="popupBox">
        <div class="actionTitle">填写收货信息</div>
        <div class="titleTips">
          请填写收货地址，商品将在3-5个工作日内发货
        </div>
        <div class="tempBox">
          <div class="infoBox">
            <van-field
              v-model="name"
              label="收货人"
              placeholder="请填写收货人"
              @blur="monitor"
            />
          </div>
          <div class="infoBox">
            <van-field
              v-model="tel"
              type="tel"
              label="联系电话"
              placeholder="请填写手机号"
              @blur="monitor"
            />
          </div>
          <div class="infoBox">
            <div class="infoTitle">所在地区</div>
            <van-cell is-link @click="showPopup">
              <div id="textColor">{{ areaTitle }}</div>
            </van-cell>
          </div>
          <div class="infoBox">
            <van-field
              v-model="detailed"
              label="详细地址"
              placeholder="请填写详细地址"
              @blur="monitor"
              @change="change"
            />
          </div>
        </div>
        <div class="buttonBox">
          <div class="video"></div>
          <button @click="sendInfo()">完成</button>
        </div>
      </div>
      <van-popup v-model="show" position="bottom" round>
        <van-area
          title="请选择"
          :area-list="areaList"
          @cancel="offPopup"
          @confirm="onAddrConfirm"
        />
      </van-popup>
    </body>
  </div>
</template>

<script>
import { ActionSheet, Popup, Field, Cell, Area } from "vant";
import area from "../../common/area";
import { updateOrderReceiver } from "../../api/common";

export default {
  components: {
    [ActionSheet.name]: ActionSheet,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [Cell.name]: Cell,
    [Area.name]: Area
  },
  data() {
    return {
      type: true,
      name: "",
      tel: "",
      detailed: "",
      areaTitle: "请选择",
      show: false,
      areaList: {}
    };
  },
  methods: {
    change(val) {
      console.log(val);
    },
    monitor() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isiOS) {
        window.scrollTo(0, 0);
      }
    },
    showPopup() {
      this.show = true;
    },
    offPopup() {
      this.show = false;
    },
    onAddrConfirm(val) {
      this.areaTitle = val[0].name + val[1].name + val[2].name;
      document.getElementById("textColor").style.color = "#333";
      this.show = false;
    },
    sendInfo() {
      if (
        this.name == "" ||
        this.tel == "" ||
        this.detailed == "" ||
        this.areaTitle == "请选择"
      ) {
        this.$toast("请完善信息");
      } else if (!(this.tel && /^1[3456789]\d{9}$/.test(this.tel))) {
        this.$toast("电话号码不符合规范");
      } else {
        updateOrderReceiver({
          receiver: this.name,
          address: `${this.areaTitle}${this.detailed}`,
          phone: this.tel,
          order_id: this.$route.query.order_id,
          default: this.defaultAddress
        }).then(res => {
          if (res.code == 0) {
            this.$router.push({
              path: "/phone/wechatAddPhone",
              query: {
                order_id: this.$route.query.order_id,
                token: this.$route.query.token
              }
            });
          } else {
            this.$toast(res.msg);
          }
        });
      }
    }
  },
  mounted() {
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isiOS) {
      window.scrollTo(0, 35);
    }
    this.areaList = area;
  }
};
</script>

<style lang="less" scoped>
.addAdress {
  .title {
    display: flex;
    position: fixed;
    padding-bottom: 10px;
    top: 0;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    .titleArrow {
      height: 18px;
      width: 18px;
      margin-top: 10.5px;
      margin-left: 16px;
    }
    .titleText {
      height: 29.5px;
      font-size: 21px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(42, 46, 51, 1);
      line-height: 29.5px;
      margin-top: 4.5px;
    }
    .titleDv {
      height: 18px;
      width: 18px;
      margin-top: 10.5px;
      margin-right: 16px;
    }
  }
  .temp {
    background: linear-gradient(
      180deg,
      rgba(250, 251, 253, 1) 0%,
      rgba(242, 245, 250, 1) 100%
    );
    height: 100vh;
    .van-action-sheet__close {
      display: none;
    }
    .successTemp {
      padding-top: 37px;
      width: 100%;
      .iconBox {
        p {
          text-align: center;
        }
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
    .popupBox {
      position: fixed;
      bottom: 0;
      display: flex;
      flex-direction: column;
      justify-items: center;
      padding: 0 27.5px;
      width: calc(100% - 55px);
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px -10px 20px 0px rgba(196, 204, 218, 0.3);
      border-radius: 20px 20px 0px 0px;
    }
    .van-action-sheet__content {
      padding: 0 22.5px;
    }
    .actionTitle {
      margin-top: 40px;
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 25px;
    }
    .titleTips {
      margin-top: 3px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(130, 138, 153, 1);
      line-height: 20px;
      margin-bottom: 10px;
    }
    .tempBox {
      margin-top: 3px;
      .infoBox {
        height: 20px;
        display: flex;
        flex-direction: row;
        padding-top: 15px;
        padding-bottom: 15px;
        border-bottom: 0.5px solid;
        border-bottom-color: rgba(218, 227, 242, 1);
        .infoTitle {
          margin-top: 0px;
          margin-bottom: 0px;
          width: 56px;
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
          margin-right: 30px;
        }
        input.van-field__control {
          &::-webkit-input-placeholder {
            color: #b8bfcc;
          }
          &::-moz-placeholder {
            color: #b8bfcc;
          }
          &:-moz-placeholder {
            color: #b8bfcc;
          }
          &:-ms-input-placeholder {
            color: #b8bfcc;
          }
        }
        .van-cell {
          padding: 0;
          width: calc(100% - 86px);
          display: flex;
          height: 20px;
          justify-content: space-between;
          .van-cell__value--alone {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(184, 191, 204, 1);
            line-height: 20px;
          }
          .van-cell__right-icon {
            height: 20px;
            width: 10px;
            min-width: 14px;
            color: #000;
          }
          .van-cell__right-icon {
            margin: 0px;
          }
        }
        .van-cell::after {
          border: 0px;
        }
        .van-field {
          padding: 0;
          .van-field__label {
            width: 56px;
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 20px;
            margin-right: 30px;
          }
          .van-field__control {
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            line-height: 20px;
          }
        }
      }
    }
    .buttonBox {
      position: relative;
      width: 100%;
      margin-top: 154.5px;
      margin-bottom: 34px;
      display: flex;
      justify-content: center;
      button {
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 50px;
        width: 320px;
        height: 50px;
        background: linear-gradient(
          129deg,
          rgba(255, 115, 0, 1) 0%,
          rgba(255, 85, 0, 1) 100%
        );
        border-radius: 6px;
        border: 0px;
        z-index: 1;
      }
      .video {
        position: absolute;
        top: 12.5px;
        width: 294px;
        height: 46px;
        background: linear-gradient(
          129deg,
          rgba(255, 115, 0, 1) 0%,
          rgba(255, 85, 0, 1) 100%
        );
        border-radius: 6px;
        opacity: 0.41;
        filter: blur(10px);
      }
    }
  }
}
</style>
