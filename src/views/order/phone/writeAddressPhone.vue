<template>
  <div class="temp" v-title data-title="填写收获地址">
    <div class="backgroundColor"></div>
    <!-- <header>
      <div class="title title_box">
        <img
          @click="toBack"
          src="../../assets/img/ic_back.png"
          class="titleArrow title_arrow"
        />
        <div class="titleText title_text">填写收获地址</div>
        <div class="titleDv" @click="delet">
          {{ delFlag }}
        </div>
      </div>
    </header> -->
    <body class="body">
      <div class="infoListBox">
        <div class="infoBox">
          <van-field v-model="name" label="收货人" placeholder="请填写收货人" />
        </div>
        <div class="infoBox">
          <van-field
            v-model="tel"
            type="tel"
            label="联系电话"
            placeholder="请填写手机号"
          />
        </div>
        <div class="infoBox">
          <div class="infoTitle">所在地区</div>
          <van-cell is-link @click="showPopup">
            <div id="textColor">{{ areaTitle }}</div>
          </van-cell>
        </div>
        <div class="infoBox">
          <div class="infoTitle">详细地址</div>
          <textarea
            placeholder="请填写详细地址"
            ref="textarea"
            :style="{ height: textAreaHeight }"
            v-model="detailed"
          ></textarea>
        </div>
        <div class="buttonBox">
          <!-- <div class="video"></div> -->
          <button @click="toSale">确定</button>
        </div>
      </div>
      <van-popup v-model="show" position="bottom" round>
        <van-area
          title="请选择"
          :value="areaNumber"
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
import area from "../../../common/area";
import {
  getMyAddress,
  dropAddress,
  addAddress,
  updateAddress
} from "../../../api/common";
import calcTextareaHeight from "../../../assets/css/calcTextareaHeight";

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
      areaNumber: "110101",
      type: true,
      name: "",
      tel: "",
      detailed: "",
      areaTitle: "请选择",
      show: false,
      areaList: {},
      delFlag: "",
      addressIndex: "",
      textAreaHeight: "20px"
    };
  },
  created() {},
  watch: {
    detailed(val) {
      if (val.length > 50) {
        this.detailed = val.substr(0, 50);
        this.$toast("详细地址最多50个字");
      }
      this.getHeight();
    },
    name(val) {
      if (val.length > 25) {
        this.name = val.substr(0, 25);
        this.$toast("收货人最多25个字");
      }
    }
  },
  mounted() {
    this.addressIndex = this.$route.query.addressIndex;
    if (this.$route.query.addressIndex > -1) {
      getMyAddress().then(res => {
        if (res.code == 0) {
          this.name = res.data[this.addressIndex].name;
          this.tel = res.data[this.addressIndex].phone;
          // this.areaTitle = res.data[this.addressIndex].address.replace(
          //   res.data[this.addressIndex].detail,
          //   ""
          // );
          this.areaTitle =
            area.province_list[res.data[this.addressIndex].province * 10000] +
            " " +
            area.city_list[res.data[this.addressIndex].city * 100] +
            " " +
            area.county_list[res.data[this.addressIndex].area];
          this.detailed = res.data[this.addressIndex].detail;
          this.areaNumber = res.data[this.addressIndex].area;
          document.getElementById("textColor").style.color = "#333";
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    }
    if (this.addressIndex > -1) {
      this.delFlag = "删除该地址";
    }
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isiOS) {
      window.scrollTo(0, 35);
    }
    this.areaList = area;
  },
  methods: {
    getHeight() {
      this.textAreaHeight = calcTextareaHeight(
        this.$refs.textarea,
        1,
        null
      ).height;
    },
    toBack() {
      this.$router.go(-1);
    },
    toSale() {
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
        let province = this.areaNumber.substr(0, 2);
        let city = this.areaNumber.substr(0, 4);

        if (this.addressIndex == -1) {
          addAddress({
            name: this.name,
            phone: this.tel,
            province: province,
            city: city,
            area: this.areaNumber,
            detail: this.detailed,
            address: this.areaTitle + " " + this.detailed
          }).then(res => {
            if (res.code == 0) {
              this.$router.push({
                path: "/order/phone/createOrderAddressPhone",
                query: {
                  addressIndex: 0,
                  classType: localStorage.getItem("classType"),
                  token: this.$route.query.token
                }
              });
            } else {
              this.$toast(res.msg || res.message);
            }
          });
        } else if (this.addressIndex == -2) {
          addAddress({
            name: this.name,
            phone: this.tel,
            province: province,
            city: city,
            area: this.areaNumber,
            detail: this.detailed,
            address: this.areaTitle + " " + this.detailed
          }).then(res => {
            if (res.code == 0) {
              this.$router.push({
                path: "/order/phone/choiceAddressPhone",
                query: {
                  addressIndex: -2,
                  token: this.$route.query.token
                }
              });
            } else {
              this.$toast(res.msg || res.message);
            }
          });
        } else {
          updateAddress({
            id: this.$route.query.addressId,
            name: this.name,
            phone: this.tel,
            province: province,
            city: city,
            area: this.areaNumber,
            detail: this.detailed,
            address: this.areaTitle + " " + this.detailed
          }).then(res => {
            if (res.code == 0) {
              this.$router.push({
                path: "/order/phone/choiceAddressPhone",
                query: {
                  addressIndex: localStorage.getItem("AddressIndex"),
                  token: this.$route.query.token
                }
              });
            } else {
              this.$toast(res.msg || res.message);
            }
          });
        }
      }
    },
    delet() {
      if (this.addressIndex > -1) {
        dropAddress({ id: this.$route.query.addressId }).then(res => {
          if (res.code == 0) {
            this.$router.push({
              path: "/order/phone/choiceAddressPhone",
              query: {
                addressIndex: 0,
                token: this.$route.query.token
              }
            });
          } else {
          }
        });
      }
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
      this.areaTitle = val[0].name + " " + val[1].name + " " + val[2].name;
      this.areaNumber = val[2].code;
      document.getElementById("textColor").style.color = "#333";
      this.show = false;
    }
  }
};
</script>

<style lang="less" scoped>
.temp {
  width: 100%;
  min-height: 100%;
  // background: rgba(243, 245, 249, 1);
  // box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.12);
  .title {
    .titleArrow {
      margin-right: 52px;
    }
    .titleDv {
      width: 70px;
      margin-top: 13px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(138, 143, 153, 1);
      line-height: 20px;
    }
  }
  .body {
    padding: 15px;
    .infoListBox {
      width: calc(100% - 30px);
      padding: 7px 15px 29px 15px;
      background: rgba(255, 255, 255, 1);
      border-radius: 8px;
      .infoBox {
        display: flex;
        flex-direction: row;
        padding-top: 15px;
        padding-bottom: 15px;
        border-bottom: 0.5px solid;
        border-bottom-color: rgba(218, 227, 242, 1);
        textarea {
          border: 0px;
          padding: 0px;
          width: 100%;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          line-height: 20px;
          resize: none;
        }
        textarea::-webkit-input-placeholder {
          color: #b8bfcc;
        }
        textarea::-moz-placeholder {
          color: #b8bfcc;
        }
        textarea:-moz-placeholder {
          color: #b8bfcc;
        }
        textarea:-ms-input-placeholder {
          color: #b8bfcc;
        }
        .infoTitle {
          margin-top: 0px;
          margin-bottom: 0px;
          min-width: 56px;
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
          /deep/ .van-cell__value--alone {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(184, 191, 204, 1);
            line-height: 20px;
          }
          /deep/ .van-cell__right-icon {
            height: 20px;
            width: 10px;
            min-width: 14px;
            color: #000;
          }
          /deep/ .van-cell__right-icon {
            margin: 0px;
          }
        }
        .van-cell::after {
          border: 0px;
        }
        .van-field {
          padding: 0;
          /deep/ .van-field__label {
            width: 56px;
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 20px;
            margin-right: 30px;
          }
          /deep/ .van-field__control {
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            line-height: 20px;
          }
        }
      }
      .buttonBox {
        position: relative;
        width: 100%;
        margin-top: 54px;
        display: flex;
        justify-content: center;
        align-items: center;
        .mask {
          position: fixed;
          bottom: 0;
          height: 77px;
          width: 100%;
          background: white;
          z-index: 2;
          opacity: 0.5;
        }
        button {
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 50px;
          width: 280px;
          height: 50px;
          background: rgba(255, 115, 0, 1);
          border-radius: 25px;
          border: 0px;
          z-index: 1;
          box-shadow: rgba(255, 115, 0, 1) 0 5px 5px -5px;
        }
        .video {
          position: absolute;
          top: 12.5px;
          width: 254px;
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
}
</style>
