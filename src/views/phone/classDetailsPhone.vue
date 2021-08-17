<template>
  <div class="landingPage">
    <div class="backgroundColor"></div>
    <!-- <header> -->
    <div class="title title_box">
      <img
        @click="toBack"
        src="../../assets/img/ic_back.png"
        class="titleArrow title_arrow"
      />
      <div class="titleText title_text" v-if="classType == 0">
        趣味体验课
      </div>
      <div class="titleText title_text" v-else>精品直播课</div>
      <div class="titleDv "></div>
    </div>
    <!-- </header> -->
    <div class="landingpageBox">
      <img
        v-for="(item, index) in imgList"
        :key="index"
        class="landingpageImg"
        :src="item.url"
      />
    </div>
    <div class="placeOrder">
      <div class="moneyBox">
        <div class="moneyText ft24">
          {{ classType == 0 ? "￥9.90" : "￥2880" }}
        </div>
        <div class="moneyTips ft14">
          {{ classType == 0 ? "优惠已减190.10" : "优惠已减2880.00" }}
        </div>
      </div>
      <button @click="showAction" class="buttonDv ft18">立即抢购</button>
    </div>
    <van-popup v-model="type" round position="bottom" bind:close="onClose">
      <div class="popupBox" v-if="classType == 0">
        <div class="popupTitle ft21">
          <img src="../../assets/img/ic_back.png" @click="toLevelBack" />
          <div>{{ !levelFlag ? "选择阶段" : `S${type_id}阶段` }}</div>
          <div class="popupTitleDv"></div>
        </div>
        <div class="popupTips ft14">
          请选择孩子的实际年龄，以获得更好的教学效果
        </div>
        <div v-show="!levelFlag">
          <div
            class="contentBox"
            v-for="(item, index) in typeList"
            :key="index"
            @click="addType(item.id, item.type_id)"
          >
            <div :class="className('iconS', item.id)" class="ft35">
              S{{ item.id }}
            </div>
            <div
              class="broder"
              :class="
                classIndex == item.id && flag ? className('S', item.id) : ''
              "
            >
              <div class="itemTitle ft23">{{ item.title }}</div>
              <div class="itemTips ft14">{{ item.tips }}</div>
            </div>
          </div>
        </div>
        <div class="levelListBox" v-show="levelFlag">
          <div
            class="levelBox"
            v-for="(item, index) in displayLevel()"
            :key="index"
            @click="addLevel(index, item.listId)"
            :class="
              (index == levelIndex ||
                index == levelIndex + 1 ||
                (levelIndex == 3 && index == levelIndex - 1 && type_id == 3)) &&
              choiceFlag
                ? 'active'
                : ''
            "
          >
            <div class="levelInfo">
              <div
                class="levelText ft18"
                :class="
                  (index == levelIndex ||
                    index == levelIndex + 1 ||
                    (levelIndex == 3 &&
                      index == levelIndex - 1 &&
                      type_id == 3)) &&
                  choiceFlag
                    ? 'active'
                    : ''
                "
              >
                课程{{ item.listId }}
              </div>
              <div
                class="levelRemarks ft14"
                :class="
                  (index == levelIndex ||
                    index == levelIndex + 1 ||
                    (levelIndex == 3 &&
                      index == levelIndex - 1 &&
                      type_id == 3)) &&
                  choiceFlag
                    ? 'active'
                    : ''
                "
              >
                适合{{ item.listName }}岁宝贝学习
              </div>
            </div>
            <div
              class="levelIcon"
              :class="
                (index == levelIndex ||
                  index == levelIndex + 1 ||
                  (levelIndex == 3 &&
                    index == levelIndex - 1 &&
                    type_id == 3)) &&
                choiceFlag
                  ? 'active'
                  : ''
              "
            ></div>
          </div>
        </div>
        <div class="buttonBox">
          <div class="mask" v-show="!flag || !choiceFlag"></div>
          <div class="video" :class="choiceFlag && flag ? '' : 'active'"></div>
          <button
            @click="toSale()"
            :class="choiceFlag && flag ? '' : 'active'"
            class="ft18"
          >
            确定
          </button>
        </div>
      </div>
      <div v-else class="popupBox" :class="systemFlag ? 'active' : ''">
        <div class="popupTitle ft21" v-show="!systemFlag">
          <img src="../../assets/img/ic_back.png" @click="toSystemBack" />
          <div>请选择宝贝年龄</div>
          <div class="popupTitleDv"></div>
        </div>
        <div class="popupTips ft14" v-show="!systemFlag">
          请选择孩子的实际年龄，以获得更好的教学效果
        </div>
        <input
          class="ft16"
          type="text"
          placeholder="请选择宝贝生日"
          v-model="birthday"
          readonly
          @click="systemShow"
          v-show="!systemFlag"
        />
        <van-datetime-picker
          v-show="systemFlag"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="toSystemBack"
          @confirm="onAddrConfirm"
        />
        <div class="buttonBox" v-show="!systemFlag">
          <div class="mask" v-show="!birthday"></div>
          <div class="video" :class="choiceFlag ? '' : 'active'"></div>
          <button
            @click="toSystemSale()"
            :class="choiceFlag ? '' : 'active'"
            class="ft18"
          >
            确定
          </button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { apiInfo, getCouponList, setUserCoupon } from "../../api/common";
import { ActionSheet, Popup, Field, Cell, Area, DatetimePicker } from "vant";
import axios from "axios";
import img_a from "../../assets/img/landingPage_system1.png";
import img_b from "../../assets/img/landingPage_system2.png";
import img_c from "../../assets/img/landingPage_system3.png";
import img_d from "../../assets/img/landingPage_system4.png";
import img_e from "../../assets/img/landingPage_system5.png";
import img_1 from "../../assets/img/landingPage_experience1.png";
import img_2 from "../../assets/img/landingPage_experience2.png";
import img_3 from "../../assets/img/landingPage_experience3.png";
import img_4 from "../../assets/img/landingPage_experience4.png";

export default {
  components: {
    [ActionSheet.name]: ActionSheet,
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [Area.name]: Area,
    [DatetimePicker.name]: DatetimePicker
  },
  data() {
    return {
      birthday: "",
      systemFlag: false,
      maxDate: new Date(),
      minDate: new Date(new Date(2010, 12, 1).getTime()),
      apiSite: process.env.VUE_APP_BASEURL
        ? process.env.VUE_APP_BASEURL
        : "https://shihao.beidouclass.cn",
      type_id: "",
      classIndex: -1,
      levelId: "A",
      levelIndex: -1,
      levelName: "",
      levelFlag: false,
      choiceFlag: false,
      flag: false,
      type: false,
      typeList: [
        {
          id: "1",
          type_id: "3-5",
          title: "3-5 周岁",
          tips: "2015年7月-2017年6月底出生"
        },
        {
          id: "2",
          type_id: "5-7",
          title: "5-7 周岁",
          tips: "2013年7月-2015年6月底出生"
        },
        {
          id: "3",
          type_id: "7-9",
          title: "7-10 周岁",
          tips: "2010年7月-2013年6月底出生"
        }
      ],
      levelList: [
        {
          id: "1",
          list: [
            { listId: "A", listName: "3-3.5" },
            { listId: "B", listName: "3.5-4" },
            { listId: "C", listName: "4-4.5" },
            { listId: "D", listName: "4.5-5" }
          ]
        },
        {
          id: "2",
          list: [
            { listId: "A", listName: "5-5.5" },
            { listId: "B", listName: "5.5-6" },
            { listId: "C", listName: "6-6.5" },
            { listId: "D", listName: "7.5-7" }
          ]
        },
        {
          id: "3",
          list: [
            { listId: "A", listName: "7-7.5" },
            { listId: "B", listName: "7.5-8" },
            { listId: "C", listName: "8-8.5" },
            { listId: "D", listName: "8.5-9" }
          ]
        }
      ],
      imgList: [],
      classType: ""
    };
  },
  created() {
    // apiInfo().then(res => {
    //   if (res.code == 0) {
    //     if (res.data.born.substr(0, 10) != "0000-00-00") {
    //       this.birthday = res.data.born.substr(0, 10);
    //       this.choiceFlag = true;
    //     }
    //   } else {
    //     this.$toast(res.msg || res.message);
    //   }
    // });
    dsBridge.call("hidetabbar", "", function(v) {});
    this.classType = this.$route.query.classType;
    if (this.$route.query.classType == 0) {
      this.imgList = [
        { id: "1", url: img_1 },
        { id: "2", url: img_2 },
        { id: "3", url: img_3 },
        { id: "4", url: img_4 }
      ];
      let classAll =
        localStorage.classInfo && JSON.parse(localStorage.classInfo);
      axios
        .get(`${this.apiSite}/api/quickapp/get_page_data/360`, {
          headers: {
            // "X-AccessToken": this.$route.query.token
          }
        })
        .then(res => {
          // console.log(res.data);
          // console.log(this.changeMoney(res.data.data.goods.price));
          let model = {
            class_id: 360,
            goods_id: res.data.data.goods.id,
            teacher_name: res.data.data.class.teacher_name,
            price: this.changeMoney(res.data.data.goods.price),
            name: res.data.data.class.name,
            start_date: res.data.data.class.start_date,
            logo: res.data.data.class.logo,
            type: this.levelName
            // flag: true
          };
          localStorage.setItem("classInfo", JSON.stringify(model));
          this.classInfo = model;
        });
    } else if (this.$route.query.classType == 1) {
      this.imgList = [
        { id: "1", url: img_a },
        { id: "2", url: img_b },
        { id: "3", url: img_c },
        { id: "4", url: img_d },
        { id: "5", url: img_e }
      ];
    }
  },
  mounted() {
    let that = this;
    dsBridge.registerAsyn("goback", function(arg1, arg2, arg3) {
      that.toBack();
    });
  },
  methods: {
    toSystemSale() {
      localStorage.setItem("birthday", this.birthday);
      this.$router.push({
        path: "/phone/createOrderAddressPhone",
        query: {
          classType: this.$route.query.classType,
          token: this.$route.query.token
        }
      });
    },
    onAddrConfirm(val) {
      this.systemFlag = false;
      this.choiceFlag = true;
      this.birthday = this.formatDate(val, "yyyy-MM-dd hh:mm").substr(0, 10);
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
    toSystemBack() {
      if (this.systemFlag) {
        this.systemFlag = false;
      } else {
        this.type = !this.type;
      }
    },
    systemShow() {
      this.systemFlag = true;
    },
    displayLevel() {
      for (let index = 0; index < this.levelList.length; index++) {
        if (this.levelList[index].id == this.type_id) {
          return this.levelList[index].list;
        }
      }
      return;
    },
    toBack() {
      this.$router.push({
        path: "/phone/findPhone",
        query: {
          token: this.$route.query.token
          // class_id: this.class_id
        }
      });
    },
    toLevelBack() {
      if (this.levelFlag) {
        this.levelFlag = false;
        this.choiceFlag = true;
      } else {
        this.type = !this.type;
      }
    },
    addType(index, id) {
      if (this.classIndex == index) {
        this.flag = !this.flag;
        this.choiceFlag = !this.choiceFlag;
      } else {
        this.classIndex = index;
        this.flag = true;
        this.choiceFlag = true;
      }
      this.type_id = index;
      this.levelName = id;
    },
    addLevel(index, id) {
      if (
        this.levelIndex == index ||
        (this.levelIndex == 3 && index == 2 && this.type_id == 3) ||
        (this.levelIndex == 2 && index == 3 && this.type_id == 3)
      ) {
        this.levelIndex = index;
        this.choiceFlag = !this.choiceFlag;
      } else {
        this.levelIndex = index;
        this.choiceFlag = true;
      }
      this.levelId = id;
    },
    className(a, b) {
      return a + b;
    },
    changeMoney(num) {
      var regexp = /(?:\.0*|(\.\d+?)0+)$/;
      if (num > 1000000) {
        num =
          JSON.stringify(num).slice(0, JSON.stringify(num).length - 4) / 100;
        return num + "万";
      } else {
        num = (num / 100).toFixed(2);
        num = num.replace(regexp, "$1");
        return num;
      }
    },

    showAction() {
      this.type = !this.type;
    },
    toSale() {
      getCouponList().then(res => {
        if (res.code == 0) {
          if (res.data.grant_type_auto.length > 0) {
            for (let i = 0; i < res.data.grant_type_auto.length; i++) {
              setUserCoupon({
                coupon_id: res.data.grant_type_auto[i].id
              }).then(res => {});
            }
          }
        }
      });
      if (this.$route.query.classType == 0) {
        localStorage.setItem("type", "S" + this.type_id);
        localStorage.setItem("levelName", this.levelName);
        this.$router.push({
          path: "/phone/createOrderAddressPhone",
          query: {
            classType: this.$route.query.classType,
            token: this.$route.query.token
          }
        });
      } else if (this.levelFlag) {
        localStorage.setItem("type", "S" + this.type_id);
        localStorage.setItem("levelId", this.levelId);
        localStorage.setItem("levelName", this.levelName);
        this.$router.push({
          path: "/phone/createOrderAddressPhone",
          query: {
            classType: this.$route.query.classType,
            token: this.$route.query.token
          }
        });
      } else {
        this.levelFlag = true;
        if (this.levelIndex == -1) {
          this.choiceFlag = false;
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.landingPage {
  .title {
    .titleDv {
      width: 18px;
    }
  }
  .van-action-sheet__description::after {
    border: none;
  }
  .landingpageBox {
    // height: calc(100vh - 103px);
    // overflow: auto;
    padding-top: 42px;
    padding-bottom: 60px;
    display: flex;
    flex-direction: column;
    .landingpageImg {
      width: 100%;
    }
  }
  .placeOrder {
    position: fixed;
    // top: calc(100% - 75px);
    bottom: 0;
    height: 75px;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px -1px 25px 0px rgba(0, 0, 0, 0.1);
    border-radius: 12px 12px 0px 0px;
    display: flex;
    justify-content: space-between;
    .moneyBox {
      width: 63.34%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .moneyText {
        // font-size: 24px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 87, 0, 1);
        line-height: 33.5px;
      }
      .moneyTips {
        margin-left: 6px;
        // font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 87, 0, 1);
        line-height: 20px;
      }
    }
    .buttonDv {
      height: 100%;
      width: 34.66%;
      background: linear-gradient(
        129deg,
        rgba(255, 115, 0, 1) 0%,
        rgba(255, 85, 0, 1) 100%
      );
      border-radius: 0px 12px 0px 0px;
      border: 0;
      // font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
    }
  }
  .buttonContainer {
    width: calc(100% - 30px);
    background: white;
    padding: 10px 15px;
    position: fixed;
    bottom: 0;
    div {
      width: 100%;
      height: 40px;
      background: linear-gradient(
        129deg,
        rgba(255, 115, 0, 1) 0%,
        rgba(255, 85, 0, 1) 100%
      );
      border-radius: 5px;
      text-align: center;
      line-height: 40px;
      color: white;
    }
  }
  .van-action-sheet__description {
    padding: 0 22.5px;
    text-align: center;
    // font-size: 14px;
    font-size: 3.7333vw;
    margin-bottom: 24.5px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(138, 143, 153, 1);
  }
  .popupBox {
    padding: 40.5px 22.5px 25.5px 22.5px;
    width: calc(100% - 45px);
    input {
      background: rgba(242, 245, 250, 1);
      border-radius: 6px;
      border: 0px;
      width: calc(100% - 75px);
      margin: 29px 22.5px 30px;
      line-height: 50px;
      // font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      padding: 0 15px;
    }
    input::-webkit-input-placeholder {
      // font-size: 16px;
      font-size: 4.2667vw;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(184, 191, 204, 1);
    }
    .popupTitle {
      // font-size: 21px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(42, 46, 51, 1);
      line-height: 29.5px;
      text-align: center;
      margin-bottom: 6px;
      display: flex;
      justify-content: space-between;
      img {
        height: 18px;
        width: 18px;
      }
      .popupTitleDv {
        width: 18px;
      }
    }
    .popupTips {
      // font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(138, 143, 153, 1);
      line-height: 20px;
      margin-bottom: 24.5px;
      text-align: center;
    }
    .contentBox {
      margin-bottom: 12px;
      width: 100%;
      .iconS1 {
        position: absolute;
        width: 87.5px;
        height: 80px;
        border-radius: 6px 0px 50px 6px;
        background: rgba(255, 115, 0, 1);
        // font-size: 35px;
        // font-family: PingFangSC-Semibold, PingFang SC;
        color: rgba(255, 255, 255, 1);
        line-height: 80px;
        text-align: center;
        z-index: 1;
      }
      .iconS2 {
        position: absolute;
        width: 87.5px;
        height: 80px;
        border-radius: 6px 0px 50px 6px;
        background: rgba(101, 81, 234, 1);
        // font-size: 35px;
        // font-family: PingFangSC-Semibold, PingFang SC;
        color: rgba(255, 255, 255, 1);
        line-height: 80px;
        text-align: center;
        // z-index: 1;
      }
      .iconS3 {
        position: absolute;
        width: 87.5px;
        height: 80px;
        border-radius: 6px 0px 50px 6px;
        background: rgba(255, 90, 0, 1);
        // font-size: 35px;
        // font-family: PingFangSC-Semibold, PingFang SC;
        color: rgba(255, 255, 255, 1);
        line-height: 80px;
        text-align: center;
        // z-index: 1;
      }
      .broder {
        // width: calc(100% - 3px);
        height: 47px;
        border-radius: 6px;
        border: 1.5px solid rgba(242, 245, 250, 1);
        display: flex;
        flex-direction: column;
        padding: 15px 0px 15px 104.5px;
      }
      .broder.S1 {
        // width: calc(100% - 3px);
        height: 47px;
        border-radius: 6px;
        border: 1.5px solid rgba(255, 115, 0, 1);
        display: flex;
        flex-direction: column;
        padding: 15px 0px 15px 104.5px;
      }
      .broder.S2 {
        // width: calc(100% - 3px);
        height: 47px;
        border-radius: 6px;
        border: 1.5px solid rgba(101, 81, 234, 1);
        display: flex;
        flex-direction: column;
        padding: 15px 0px 15px 104.5px;
      }
      .broder.S3 {
        // width: calc(100% - 3px);
        height: 47px;
        border-radius: 6px;
        border: 1.5px solid rgba(255, 90, 0, 1);
        display: flex;
        flex-direction: column;
        padding: 15px 0px 15px 104.5px;
      }
      .itemTitle {
        // font-size: 23px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(87, 92, 102, 1);
        line-height: 32.5px;
      }
      .itemTips {
        // font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(138, 143, 153, 1);
        line-height: 20px;
      }
    }
    .levelListBox {
      .levelBox {
        margin-top: 9px;
        padding: 17.5px 15px;
        width: calc(100% -36px);
        border-radius: 6px;
        border: 1.5px solid rgba(242, 245, 250, 1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        .levelInfo {
          display: flex;
          align-items: center;
          .levelText {
            // font-size: 18px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(87, 92, 102, 1);
            line-height: 25px;
            margin-right: 12px;
          }
          .levelText.active {
            color: rgba(255, 255, 255, 1);
          }
          .levelRemarks {
            // font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(138, 143, 153, 1);
            line-height: 20px;
          }
          .levelRemarks.active {
            color: rgba(255, 255, 255, 1);
          }
        }
        .levelIcon {
          width: 24px;
          height: 24px;
          background: url("../../assets/img/ic_nor.png") no-repeat center center /
            cover;
        }
        .levelIcon.active {
          background: url("../../assets/img/ic_selected_white.png") no-repeat
            center center / cover;
        }
      }
      .levelBox.active {
        background: rgba(255, 115, 0, 1);
        border: 1.5px solid rgba(255, 115, 0, 1);
      }
    }
    .buttonBox {
      position: relative;
      width: 100%;
      margin-top: 39px;
      display: flex;
      justify-content: center;
      .mask {
        position: fixed;
        bottom: 0;
        height: 77px;
        width: 100%;
        background: white;
        z-index: 2;
        opacity: 0;
      }
      button {
        // font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 50px;
        width: 320px;
        height: 50px;
        background: rgba(255, 115, 0, 1);
        border-radius: 25px;
        border: 0px;
        z-index: 1;
      }
      button.active {
        background: #d7deeb;
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
      .video.active {
        background: #d7deeb;
      }
    }
  }
  .popupBox.active {
    padding-top: 15px;
  }
  .van-popup--bottom {
    bottom: var(--window-bottom, 0);
  }

  // .content {
  //   padding: 0 22.5px;
  //   margin-bottom: 10px;
  //   img {
  //     // height: 80px;
  //     width: 100%;
  //   }
  // }
}
</style>
