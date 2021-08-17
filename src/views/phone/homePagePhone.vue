<template>
  <div class="home">
    <div class="backgroundColor"></div>
    <body>
      <van-swipe class="my-swipe" indicator-color="white" :autoplay="3000">
        <van-swipe-item v-for="(item, index) in banner" :key="index">
          <img :src="item.src" alt />
        </van-swipe-item>
      </van-swipe>
      <div class="classList" v-for="(item, index) in courseList" :key="index">
        <div class="classTitleBox">
          <div class="iconShallowViolet"></div>
          <div class="iconDeepViolet"></div>
          <div class="classTitleText">{{ item.name }}</div>
          <div class="more" @click="toMore(item)">
            更多
            <img src="../../assets/img/btn_arrow.png" />
          </div>
        </div>
        <Card :list="item.classes" @toCourse="toCourse"></Card>
      </div>
    </body>
  </div>
</template>
<script>
import {
  getAppList,
  getClassCategory,
  getCouponList,
  setUserCoupon
} from "../../api/common";
import { Swipe, SwipeItem, Toast } from "vant";
import Card from "../../components/cardPhone";

export default {
  components: {
    [SwipeItem.name]: SwipeItem,
    [Swipe.name]: Swipe,
    [Toast.name]: Toast,
    Card
  },
  data() {
    return {
      banner: [
        // { src: require("../../assets/img/img_banner_1.jpg") },
        // { src: require("../../assets/img/img_banner_2.jpg") },
        { src: require("../../assets/img/img_banner_3.jpg") },
        { src: require("../../assets/img/img_banner_4.jpg") }
      ],
      courseList: []
    };
  },
  mounted() {
    // getCouponList().then(res => {
    //   if (res.code == 0) {
    //     if (res.data.grant_type_auto.length > 0) {
    //       for (let i = 0; i < res.data.grant_type_auto.length; i++) {
    //         setUserCoupon({
    //           coupon_id: res.data.grant_type_auto[i].id
    //         }).then(res => {});
    //       }
    //     }
    //   }
    // });

    dsBridge.registerAsyn("goback", function(arg1, arg2, arg3) {
      dsBridge.call("goexit", "", function(v) {});
    });
    let that = this;
    dsBridge.registerAsyn("RefreshData", function(arg1, arg2, arg3) {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });
      let second = 3;
      const timer = setInterval(() => {
        second--;
        if (second) {
        } else {
          clearInterval(timer);
          Toast.clear();
        }
      }, 1000);
      let flag = 0;
      getClassCategory().then(res => {
        if (res.code == 0) {
          this.courseList = res.data;
          Toast.clear();
        } else {
          this.$toast(res.msg);
        }
      });
    });
    dsBridge.call("showtabbar", "", function(v) {});
    getClassCategory({ page: 1, per_page: 2 }).then(res => {
      if (res.code == 0) {
        this.courseList = res.data;
      } else {
        this.$toast(res.msg);
      }
    });
  },
  methods: {
    toCourse(item) {
      localStorage.setItem("morePage", -1);
      localStorage.setItem("smallClass", item.id);
      this.$router.push({
        path: "/lp",
        query: { token: this.$route.query.token }
      });
    },
    toMore(item) {
      this.$router.push({
        path: "/phone/morePhone",
        query: {
          categoryId: item.id,
          titleName: item.name,
          token: this.$route.query.token
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  border: 0px solid rgba(74, 74, 74, 1);
  body {
    padding: 16px 0px;
    .classList {
      margin: 0 15px;
      margin-top: 25px;
      margin-bottom: 10px;
      .classTitleBox {
        display: flex;
        align-items: center;
        .iconShallow {
          width: 15px;
          height: 15px;
          background: rgba(255, 149, 0, 1);
          opacity: 0.49;
          border-radius: 7.5px;
        }
        .iconDeep {
          width: 15px;
          height: 15px;
          background: rgba(255, 149, 0, 1);
          opacity: 0.7;
          border-radius: 7.5px;
          position: absolute;
          margin-left: 10px;
        }
        .iconShallowViolet {
          width: 15px;
          height: 15px;
          background: rgba(168, 85, 255, 1);
          opacity: 0.49;
          border-radius: 7.5px;
        }
        .iconDeepViolet {
          width: 15px;
          height: 15px;
          background: rgba(168, 85, 255, 1);
          opacity: 0.7;
          border-radius: 7.5px;
          position: absolute;
          margin-left: 10px;
        }
        .classTitleText {
          font-size: 21px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(41, 45, 51, 1);
          line-height: 29.5px;
          margin-left: 16px;
        }
        .more {
          position: absolute;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #828a99;
          line-height: 16.5px;
          right: 15px;
          img {
            width: 6px;
            height: 9px;
          }
        }
      }
    }
    .my-swipe {
      width: 100%;
    }
    .van-swipe-item {
      width: calc(100% - 30px);
      display: flex;
      justify-content: center;
      img {
        height: 100%;
        width: calc(100% - 30px);
        border-radius: 6px;
      }
    }
    /deep/ .van-swipe__indicators {
      bottom: 8px;
      left: unset;
      right: 23px;
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    /deep/ .van-swipe__indicator {
      height: 4px;
      width: 4px;
      border-radius: 1px;
    }
    /deep/ .van-swipe__indicator--active {
      width: 10px;
      border-radius: 1px;
    }
  }
}
</style>
