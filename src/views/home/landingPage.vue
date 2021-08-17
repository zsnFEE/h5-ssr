<template>
  <div class="landingPage">
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
        <div class="moneyText">￥9.90</div>
        <div class="moneyTips">优惠已减326.00</div>
      </div>
      <button @click="showAction" class="buttonDv">立即抢购</button>
    </div>
    <!-- <div class="buttonContainer">
      <div @click="showAction">立即报名¥ {{ classInfo.price }}</div>
    </div>-->
    <!-- <van-action-sheet
      v-model="type"
      title="选择级别"
      description="请根据孩子的实际年龄选择，以获得更好的教学效果"
    >
      <div class="title">请根据孩子的实际年龄选择，以获得更好的教学效果</div>
      <div class="content" v-for="(item, index) in typeList" :key="index">
        <img :src="item.url" alt @click="toSale(item)" />
      </div>
    </van-action-sheet>-->
    <van-popup v-model="type" round position="bottom" bind:close="onClose">
      <!-- <div class="content" v-for="(item, index) in typeList" :key="index">
      <img :src="item.url" alt @click="toSale(item)" />
      </div>-->
      <div class="popupBox">
        <div class="popupTitle">选择级别</div>
        <div class="popupTips">请选择孩子的实际年龄，以获得更好的教学效果</div>
        <div
          class="contentBox"
          v-for="(item, index) in typeList"
          :key="index"
          @click="addType(item.id, item.type_id)"
        >
          <div :class="className('iconS', item.id)">S{{ item.id }}</div>
          <div
            class="broder"
            :class="
              classIndex == item.id && flag ? className('S', item.id) : ''
            "
          >
            <div class="itemTitle">{{ item.title }}</div>
            <div class="itemTips">{{ item.tips }}</div>
          </div>
        </div>
        <div class="buttonBox">
          <div class="mask" v-show="!flag"></div>
          <div class="video"></div>
          <button @click="toSale()">确定</button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { statsLog } from "../../api/common";
import axios from "axios";
import { ActionSheet } from "vant";
import img_s1 from "../../assets/img/img_s1.png";
import img_s2 from "../../assets/img/img_s2.png";
import img_s3 from "../../assets/img/img_s3.png";
import img_a from "../../assets/img/img_a.png";
import img_b from "../../assets/img/img_b.png";
import img_c from "../../assets/img/img_c.png";
import img_d from "../../assets/img/img_d.png";
import img_e from "../../assets/img/img_e.png";

export default {
  components: {
    [ActionSheet.name]: ActionSheet
  },
  data() {
    return {
      type_id: "",
      classIndex: 1,
      flag: false,
      apiSite: process.env.VUE_APP_APISITE
        ? process.env.VUE_APP_APISITE
        : "api.youdaoti.cn",
      // apiSite: "api.houhouhua.com",
      fileSite: "api.houhouhua.com",
      apiYoudaotiSite: "api.youdaoti.cn",
      apiHouhouhuaSite: "api.houhouhua.com",
      fileHouhouthuaSite: "api.houhouhua.com",
      fileYoudaotiSite: "api.youdaoti.cn/static/dist",
      // apiSite: "api.youdaoti.cn",
      webSite: "",
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
      imgList: [
        { id: "1", url: img_a },
        { id: "2", url: img_b },
        { id: "3", url: img_c },
        { id: "4", url: img_d },
        { id: "5", url: img_e }
      ],
      classInfo: {}
    };
  },
  mounted() {
    let classAll = localStorage.classInfo && JSON.parse(localStorage.classInfo);
    statsLog({
      dis_id: this.$route.query.dis_id ? this.$route.query.dis_id : 0
    }).then(res => {});
    axios
      .get(
        `https://${this.apiSite}/api/quickapp/get_page_data/${this.$route.query
          .class_id || classAll.class_id}`,
        {
          headers: {
            // "X-AccessToken": this.$route.query.token
          }
        }
      )
      .then(res => {
        // console.log(res.data);
        // console.log(this.changeMoney(res.data.data.goods.price));
        let model = {
          dis_id: this.$route.query.dis_id ? this.$route.query.dis_id : 0,
          class_id: this.$route.query.class_id || classAll.class_id,

          goods_id: res.data.data.goods.id,
          teacher_name: res.data.data.class.teacher_name,
          price: this.changeMoney(res.data.data.goods.price),
          name: res.data.data.class.name,
          start_date: res.data.data.class.start_date,
          logo: res.data.data.class.logo,
          type: this.type_id
          // flag: true
        };
        localStorage.setItem("classInfo", JSON.stringify(model));
        this.classInfo = model;
      });
  },
  methods: {
    sendInfo() {},
    addType(index, id) {
      if (this.classIndex == index) {
        this.flag = !this.flag;
      } else {
        this.classIndex = index;
        this.flag = true;
      }
      this.type_id = id;
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
      if (
        localStorage.getItem("count_Down" + this.type_id) <
        Math.round(new Date() / 1000)
      ) {
        localStorage.setItem("count_Down" + this.type_id, "");
      }
      this.$router.push({
        path: "/order/fillOrder",
        query: {
          uri: encodeURIComponent(window.location.href),
          dis_id: this.$route.query.dis_id,
          class_id: this.$route.query.class_id,
          type: this.type_id,
          token: this.$route.query.token,
          Sid: this.classIndex
          // classInfo: this.classInfo
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.landingPage {
  height: 100vh;
  .van-action-sheet__description::after {
    border: none;
  }
  .landingpageBox {
    padding-bottom: 60px;
    display: flex;
    flex-direction: column;
    .landingpageImg {
      width: 100%;
    }
  }
  .placeOrder {
    position: fixed;
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
        font-size: 24px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 87, 0, 1);
        line-height: 33.5px;
      }
      .moneyTips {
        margin-left: 6px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(138, 143, 153, 1);
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
      font-size: 18px;
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
    font-size: 14px;
    margin-bottom: 24.5px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(138, 143, 153, 1);
  }
  .popupBox {
    padding: 40.5px 22.5px 25.5px 22.5px;
    width: calc(100% - 45px);
    .popupTitle {
      font-size: 21px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(42, 46, 51, 1);
      line-height: 29.5px;
      text-align: center;
      margin-bottom: 6px;
    }
    .popupTips {
      font-size: 14px;
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
        background: linear-gradient(
          131deg,
          rgba(255, 213, 0, 1) 0%,
          rgba(255, 191, 0, 1) 100%
        );
        font-size: 35px;
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
        background: linear-gradient(
          129deg,
          rgba(95, 67, 237, 1) 0%,
          rgba(132, 67, 237, 1) 100%
        );
        font-size: 35px;
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
        background: linear-gradient(
          129deg,
          rgba(255, 115, 0, 1) 0%,
          rgba(255, 85, 0, 1) 100%
        );
        font-size: 35px;
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
        border: 1.5px solid #fec702;
        display: flex;
        flex-direction: column;
        padding: 15px 0px 15px 104.5px;
      }
      .broder.S2 {
        // width: calc(100% - 3px);
        height: 47px;
        border-radius: 6px;
        border: 1.5px solid #7443ee;
        display: flex;
        flex-direction: column;
        padding: 15px 0px 15px 104.5px;
      }
      .broder.S3 {
        // width: calc(100% - 3px);
        height: 47px;
        border-radius: 6px;
        border: 1.5px solid #fb6101;
        display: flex;
        flex-direction: column;
        padding: 15px 0px 15px 104.5px;
      }
      .itemTitle {
        font-size: 23px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(87, 92, 102, 1);
        line-height: 32.5px;
      }
      .itemTips {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(138, 143, 153, 1);
        line-height: 20px;
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
        opacity: 0.5;
      }
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
