<template>
  <div class="address">
    <div class="bgpc"></div>
    <!-- <div class="new_header" v-show="flag">
      <div class="back" @click="toBack">
        <img src="../../../assets/img/ic_back.png" />
      </div>
      <div class="new_font">填写收货地址</div>
      <div class="delete" @click="delet">{{ delFlag }}</div>
    </div>
    <div class="header_pc" v-show="!flag">
      填写收货地址
    </div> -->
    <!--body部分开始-->
    <div class="address_box">
      <div class="administration">
        <div class="address_list">
          <div class="address_name">收货人</div>
          <div class="input" style="margin-left: 39px;">
            <input type="text" placeholder="请填写收货人" v-model="name" />
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
            <img src="../../../assets/img/btn_arrow.png" />
          </div>
        </div>
        <div class="address_list">
          <div class="address_name">详细地址</div>
          <div class="input">
            <input
              type="text"
              placeholder="请填写详细地址"
              v-model="detailed"
            />
          </div>
        </div>
        <!--完成按钮start-->
        <div class="del_btn" @click="delet" v-show="!flag && delFlag">
          {{ delFlag }}
        </div>
        <div class="address_btn" @click="ok">完成</div>
        <!--完成按钮end-->
      </div>
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
import { ActionSheet, Popup, Field, Cell, Area } from "vant";
import area from "../../../common/area";
import { isMobile } from "../../../common/util";
import {
  getMyAddress,
  dropAddress,
  addAddress,
  updateAddress
} from "../../../api/common";
export default {
  components: {
    [ActionSheet.name]: ActionSheet,
    [Popup.name]: Popup,
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
      flag: isMobile()
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
            address: this.areaTitle + " " + this.detailed
          }).then(res => {
            if (res.code == 0) {
              this.$router.push({
                path: "../ipad/Fillorder",
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
            address: this.areaTitle + " " + this.detailed
          }).then(res => {
            if (res.code == 0) {
              this.$router.push({
                path: "../ipad/Selectaddress",
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
            address: this.areaTitle + " " + this.detailed
          }).then(res => {
            if (res.code == 0) {
              this.$router.push({
                path: "../ipad/Selectaddress",
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
              path: "../ipad/Selectaddress",
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
        this.$toast("收货人最多25个字");
      }
    },
    detailed() {
      if (this.detailed.length > 50) {
        this.detailed = this.detailed.substr(0, 50);
        this.$toast("详细地址最多50个字");
      }
    }
  }
};
</script>
<style lang="less" scoped>
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
  padding: 60px 112px 60px;
  box-sizing: border-box;
  width: 100%;
}
// 地址管理部分
.administration {
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  padding: 0px 30px 99px;
  position: relative;
}
.address_list {
  width: 100%;
  display: flex;
  border-bottom: 1px solid rgba(218, 227, 242, 1);
  padding-bottom: 14px;
  padding-top: 14px;
  position: relative;
  align-items: center;
}
.address_name {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(41, 45, 51, 1);
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
</style>
