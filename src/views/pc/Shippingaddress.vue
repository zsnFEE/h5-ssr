<template>
  <div class="address">
    <div class="bgpc"></div>
    <Header v-if="flag" :title="'填写收货地址'" @toBack="toBack">
      <div v-if="delFlag" class="delete" @click="delet">{{ delFlag }}</div>
    </Header>

    <div class="header_pc" v-show="!flag">
      <div>填写收货地址</div>
      <div v-if="delFlag" class="delete" @click="delet">{{ delFlag }}</div>
    </div>
    <!--body部分开始-->
    <div class="address_box">
      <div class="administration">
        <div class="address_list">
          <div class="address_name">收货人</div>
          <div class="input" style="margin-left: 25px;">
            <input type="text" placeholder="请填写收货人" v-model="name" />
          </div>
          <div class="img_right">
            <!-- <img src="../../assets/img/btn_arrow.png" /> -->
          </div>
        </div>
        <div class="address_list">
          <div class="address_name">联系电话</div>
          <div class="input">
            <input
              type="text"
              placeholder="请填写手机号"
              v-model="tel"
              maxlength="11"
            />
          </div>
          <div class="img_right">
            <!-- <img src="../../assets/img/btn_arrow.png" /> -->
          </div>
        </div>
        <div class="address_list" @click="show = true">
          <div class="address_name">所在地区</div>
          <div class="input">
            <input
              readonly
              id="textColor"
              type="text"
              placeholder="请选择"
              v-model="areaTitle"
            />
          </div>
          <div class="img_right">
            <img src="../../assets/img/btn_arrow.png" />
          </div>
        </div>
        <div class="address_list">
          <div class="address_name">详细地址</div>
          <textarea
            class="ft14"
            placeholder="请填写详细地址"
            ref="textarea"
            :style="{ height: textAreaHeight }"
            v-model="detailed"
          ></textarea>
          <!-- <div class="input">
            <input
              type="text"
              placeholder="请填写详细地址"
              v-model="detailed"
            />
          </div> -->
        </div>
      </div>
      <div class="defaultAddress">
        <van-cell center title="设为默认收货地址">
          <template #right-icon>
            <van-switch
              :disabled="addressIndex == -2"
              active-color="#49C265"
              v-model="defaultAddress"
              size="24"
            />
          </template>
        </van-cell>
      </div>
      <div class="button" @click="ok">保存</div>
      <van-popup v-model="show" position="bottom" round>
        <van-area
          title="请选择"
          :value="areaNumber"
          :area-list="areaList"
          @cancel="show = false"
          @confirm="onAddrConfirm"
        />
      </van-popup>
    </div>
    <!--body部分结束-->
  </div>
</template>
<script>
import { ActionSheet, Popup, Field, Cell, Area, Toast, Switch } from "vant";
import area from "../../common/area";
import { isMobile } from "../../common/util";
import {
  getMyAddress,
  dropAddress,
  addAddress,
  updateAddress
} from "../../api/common";
import calcTextareaHeight from "../../assets/css/calcTextareaHeight";

export default {
  components: {
    [ActionSheet.name]: ActionSheet,
    [Popup.name]: Popup,
    [Area.name]: Area,
    [Cell.name]: Cell,
    [Switch.name]: Switch,
    [Toast.name]: Toast
  },
  data() {
    return {
      defaultAddress: false, //默认地址选择
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
      flag: isMobile(),
      textAreaHeight: "20px"
    };
  },

  created() {},
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.toBack();
    });
    this.addressIndex = this.$route.query.addressIndex;
    if (this.$route.query.addressIndex > -1) {
      getMyAddress().then(res => {
        if (res.code == 0) {
          this.name = res.data[this.addressIndex].name;
          this.tel = res.data[this.addressIndex].phone;
          this.areaTitle = res.data[this.addressIndex].address.replace(
            res.data[this.addressIndex].detail,
            ""
          );

          this.defaultAddress =
            res.data[this.addressIndex].default == 1 ? true : false;
          this.detailed = res.data[this.addressIndex].detail;
          this.areaNumber = res.data[this.addressIndex].area;
          document.getElementById("textColor").style.color = "#333";
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    }
    if (this.addressIndex == -2) {
      this.defaultAddress = true;
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
      console.log("1");
      this.textAreaHeight = calcTextareaHeight(
        this.$refs.textarea,
        1,
        null
      ).height;
    },
    onAddrConfirm(val) {
      this.areaTitle = val[0].name + " " + val[1].name + " " + val[2].name;
      this.areaNumber = val[2].code;
      document.getElementById("textColor").style.color = "#333";
      this.show = false;
    },
    toBack() {
      this.$router.go(-1);
    },
    //获取填写的地址信息
    ok() {
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
            address: this.areaTitle + " " + this.detailed,
            default: this.defaultAddress ? 1 : 0
          }).then(res => {
            if (res.code == 0) {
              this.$router.push({
                path: "/pc/Fillorder",
                query: {
                  addressIndex: 0,
                  token: this.$route.query.token,
                  type: localStorage.getItem("type"),
                  levelId: localStorage.getItem("levelId"),
                  levelName: localStorage.getItem("levelName"),
                  Classtype: this.$route.query.Classtype
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
            address: this.areaTitle + " " + this.detailed,
            default: this.defaultAddress ? 1 : 0
          }).then(res => {
            if (res.code == 0) {
              this.$router.push({
                path: "/pc/Selectaddress",
                query: {
                  addressIndex: -2,
                  token: this.$route.query.token,
                  Classtype: this.$route.query.Classtype
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
            address: this.areaTitle + " " + this.detailed,
            default: this.defaultAddress ? 1 : 0
          }).then(res => {
            if (res.code == 0) {
              this.$router.push({
                path: "/pc/Selectaddress",
                query: {
                  addressIndex: this.addressIndex,
                  token: this.$route.query.token,
                  Classtype: this.$route.query.Classtype
                }
              });
            } else {
              this.$toast(res.msg || res.message);
            }
          });
        }
      }
    },
    // 删除地址
    delet() {
      if (this.addressIndex > -1) {
        dropAddress({ id: this.$route.query.addressId }).then(res => {
          if (res.code == 0) {
            this.$router.push({
              path: "/pc/Selectaddress",
              query: {
                addressIndex: localStorage.getItem("WebpageId"),
                token: this.$route.query.token,
                Classtype: this.$route.query.Classtype
              }
            });
          } else {
          }
        });
      }
    }
  },
  watch: {
    name() {
      if (this.name.length > 25) {
        this.name = this.name.substr(0, 25);
        Toast({
          message: "收货人最多25个字",
          position: "top"
        });
        // this.$toast("收货人最多25个字", 1500, 1);
      }
    },
    detailed() {
      this.getHeight();
      if (this.detailed.length > 50) {
        this.detailed = this.detailed.substr(0, 50);
        Toast({
          message: "详细地址最多50个字",
          position: "top"
        });

        // this.$toast("详细地址最多50个字", 1500, 1);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.defaultAddress {
  margin-top: 20px;
  ::v-deep .van-cell {
    border-radius: 5px;
  }
}
.button {
  cursor: pointer;
  margin-top: 55px;
  width: 100%;
  height: 53px;
  background: #3dc17d;
  border-radius: 5px;
  border: 0;
  font-weight: 400;
  color: #ffffff;
  line-height: 53px;
  text-align: center;
}
.new_header {
  width: 100%;
  padding: 8px 20px 8px 21px;
  background: #fff;
  display: flex;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  z-index: 9;
}
.header_pc {
  width: 100%;
  padding: 11px 40px;
  background: #fff;
  display: flex;
  box-sizing: border-box;
  position: fixed;
  z-index: 9;
  font-size: 21px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
  justify-content: space-between;
  align-items: center;
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
.delete {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(138, 143, 153, 1);
  cursor: pointer;
}
.address {
  width: 100%;
  height: 100%;
  background: #f2f5fa;
}
.address_box {
  background: #f2f5fa;
  padding: 72px 112px 60px;
  box-sizing: border-box;
  width: 100%;
}
// 地址管理部分
.administration {
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  padding: 0px 30px 10px;
  position: relative;
}
.address_list {
  width: 100%;
  display: flex;
  // border-bottom: 1px solid rgba(218, 227, 242, 1);
  padding-bottom: 14px;
  padding-top: 14px;
  position: relative;
  align-items: center;

  textarea {
    margin-left: 25px;
    border: 0px;
    padding: 0px;
    width: 100%;
    // font-size: 14px;
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
}
.address_name {
  min-width: 56px;
  font-size: 14px;
  font-weight: 400;
  font-weight: 400;
  color: #333333;
}
.address_list .input {
  margin-left: 25px;
  width: 70%;
  height: 100%;
}
.address_list input {
  width: 100%;

  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(41, 45, 51, 1);
  border: 0;
}
.img_right {
  position: absolute;
  right: 1px;
  cursor: pointer; /*鼠标悬停变小手*/
}
.img_right img {
  width: 7px;
  height: 12px;
}
.address_list input::placeholder {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(184, 191, 204, 1);
}
.address_btn {
  position: absolute;
  background: rgba(255, 115, 0, 1);
  border-radius: 25px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  padding: 12px 61px;
  right: 30px;
  bottom: 20px;
  cursor: pointer;
}
.del_btn {
  position: absolute;
  border-radius: 25px;
  border: 1px solid rgba(255, 115, 0, 1);
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 115, 0, 1);
  padding: 11px 31px;
  right: 220px;
  bottom: 20px;
  cursor: pointer;
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
</style>
