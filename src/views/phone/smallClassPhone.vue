<template>
  <div class="home">
    <div class="backgroundColor"></div>
    <body>
      <van-swipe class="my-swipe" indicator-color="white" :autoplay="3000">
        <van-swipe-item v-for="(item, index) in banner" :key="index">
          <img :src="item.src" alt />
        </van-swipe-item>
      </van-swipe>
      <div class="classList">
        <div class="classTitleBox">
          <div class="iconShallowViolet"></div>
          <div class="iconDeepViolet"></div>
          <div class="classTitleText ft21">小课堂</div>
        </div>
        <Card :list="courseList" @toCourse="toCourse"></Card>
      </div>
    </body>
  </div>
</template>
<script>
import { getAppList, getSmallClass } from "../../api/common";
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
      a: {},
      banner: [
        { src: require("../../assets/img/img_banner_3.jpg") },
        { src: require("../../assets/img/img_banner_4.jpg") }
      ],
      // courseList: [
      //   {
      //     name: "创意手工课",
      //     money: "299",
      //     price: "399.00",
      //     remarks: "在动手中释放想象力和创造力",
      //     img: require("../../assets/img/img_067.png"),
      //     number: 0
      //   },
      //   {
      //     name: "妙笔丹青课",
      //     money: "399",
      //     price: "499.00",
      //     remarks: "权威、专业、系统的国画课程",
      //     img: require("../../assets/img/img_068.png"),
      //     number: 0
      //   },
      //   {
      //     name: "趣味手抄报",
      //     money: "169",
      //     price: "269.00",
      //     remarks: "满足孩子好奇心的趣味课堂",
      //     img: require("../../assets/img/img_067.png"),
      //     number: 0
      //   }
      // ],
      courseList: []
    };
  },
  mounted() {
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
      getSmallClass().then(res => {
        if (res.code == 0) {
          that.courseList = res.data.list;
          Toast.clear();
        } else {
          that.$toast(res.msg);
        }
      });
    });
    dsBridge.call("showtabbar", "", function(v) {});
    getSmallClass().then(res => {
      if (res.code == 0) {
        this.courseList = res.data.list;
      } else {
        that.$toast(res.msg);
      }
    });
    dsBridge.registerAsyn("goback", function(arg1, arg2, arg3) {
      dsBridge.call("goexit", "", function(v) {});
    });
  },
  methods: {
    toCourse(item) {
      localStorage.setItem("smallClassUrl", item.cdn + item.logo);
      this.$router.push({
        // path: "/phone/courseDetailsPhone",
        // query: { class_id: item.id || item.class_id, token: this.$route.query.token }
        path: "/lp",
        query: { token: this.$route.query.token, gid: item.id }
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
          // font-size: 21px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(41, 45, 51, 1);
          line-height: 29.5px;
          margin-left: 16px;
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
