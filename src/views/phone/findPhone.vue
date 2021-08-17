<template>
  <div class="home">
    <!-- <div>
        {{ `${$route.query.token}/${$route.name}` }}
    </div>
    <header>
      <div>发现课程</div>
      <img @click="toMy" :src="user.headimgurl" alt />
    </header> -->
    <div class="backgroundColor"></div>
    <body>
      <div class="titleName ft21">北斗星在线教育</div>
      <van-swipe class="my-swipe" indicator-color="white" :autoplay="3000">
        <van-swipe-item v-for="(item, index) in banner" :key="index">
          <img :src="item.src" alt />
        </van-swipe-item>
      </van-swipe>
      <div class="inquiryBox">
        <div @click="toTeach">
          <img src="../../assets/img/ic_how_to_class.png" class="icon" />
          <span class="ft16">如何上课</span>
        </div>
        <div class="line"></div>
        <div @click="toInquiry">
          <img src="../../assets/img/ic_ask.png" class="icon" />
          <span class="ft16">咨询老师</span>
        </div>
      </div>
      <img
        src="../../assets/img/banner-01.png"
        class="invitationImg"
        @click="toInvitation"
      />
      <div class="classList">
        <div class="classTitleBox">
          <div class="iconShallow"></div>
          <div class="iconDeep"></div>
          <div class="classTitleText ft21">体验课</div>
        </div>
        <Card :list="courseList" @toCourse="toExperience"></Card>
      </div>
      <div class="classList">
        <div class="classTitleBox">
          <div class="iconShallowViolet"></div>
          <div class="iconDeepViolet"></div>
          <div class="classTitleText ft21">系统课</div>
        </div>
        <Card :list="courselist" @toCourse="toCourse"></Card>
      </div>
    </body>
  </div>
</template>
<script>
import { getAppList } from "../../api/common";
import { Swipe, SwipeItem, Toast } from "vant";
import Card from "../../components/cardDemoPhone";

export default {
  components: {
    [SwipeItem.name]: SwipeItem,
    [Swipe.name]: Swipe,
    [Toast.name]: Toast,
    Card
  },
  data() {
    return {
      todayClass: [],
      user: {},
      banner: [
        // { src: require("../../assets/img/img_banner_1.jpg") },
        // { src: require("../../assets/img/img_banner_2.jpg") }
        { src: require("../../assets/img/img_banner_3.jpg") },
        { src: require("../../assets/img/img_banner_4.jpg") }
      ],
      courseList: [
        {
          name: "趣味体验课",
          remarks: "新用户专享包邮赠送画材礼包",
          money: "9.90",
          price: "200.00",
          img: require("../../assets/img/img_069.png"),
          number: 0
        }
      ],
      courselist: [
        {
          name: "精品直播课",
          remarks: "系统三阶培养体系，技能思维双向提升",
          money: "2880",
          price: "5760.00",
          img: require("../../assets/img/img_070.png"),
          number: 0
        }
      ],
      subjects: []
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
      let second = 1;
      const timer = setInterval(() => {
        second--;
        if (second) {
        } else {
          clearInterval(timer);
          Toast.clear();
        }
      }, 250);
    });
    dsBridge.call("showtabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", function(arg1, arg2, arg3) {
      dsBridge.call("goexit", "", function(v) {});
    });
  },
  methods: {
    toInvitation() {
      this.$router.push({
        path: "/phone/invitationRulePhone",
        query: {
          token: this.$route.query.token,
          appFlag: 2
        }
      });
    },
    toTeach() {
      this.$router.push({
        path: "/phone/toTeachPhone",
        query: { token: this.$route.query.token, title: 1 }
      });
    },
    toInquiry() {
      this.$router.push({
        path: "/phone/inquiryTeacherPhone",
        query: { token: this.$route.query.token, title: 1 }
      });
    },
    toMy() {
      this.$router.push({
        path: "/phone/myInfoPhone",
        query: { token: this.$route.query.token }
      });
    },
    toCourse(item) {
      this.$router.push({
        path: "/phone/classDetailsPhone",
        query: { token: this.$route.query.token, classType: 1 }
      });
    },
    toExperience(item) {
      this.$router.push({
        path: "/phone/classDetailsPhone",
        query: { token: this.$route.query.token, classType: 0 }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  min-height: 100%;
  border: 0px solid rgba(74, 74, 74, 1);
  header {
    padding: 5px 15px;
    display: flex;
    justify-content: space-between;
    // padding: 5px 15px;
    // display: flex;
    img {
      height: 30px;
      width: 30px;
      border-radius: 50%;
    }
    div {
      font-size: 21px;
      font-weight: 500;
    }
  }
  body {
    padding: 16px 0px;
    .titleName {
      // font-size: 21px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #292d33;
      line-height: 29.5px;
      padding: 0 15px;
      margin-bottom: 10px;
    }
    .inquiryBox {
      margin: 0 15px;
      margin-top: 20px;
      margin-bottom: 25px;
      padding: 12px 0px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.02);
      display: flex;
      justify-content: center;
      border-radius: 8px;
      .line {
        width: 1px;
        background: rgba(216, 216, 216, 1);
      }
      div {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 23px;
          height: 23px;
          margin-right: 7px;
        }
        span {
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(41, 45, 51, 1);
          line-height: 22.5px;
        }
      }
    }
    .invitationImg {
      margin: 0 16px;
      width: calc(100% - 32px);
    }
    .classList {
      margin: 0px 15px;
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
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(41, 45, 51, 1);
          line-height: 29.5px;
          margin-left: 16px;
        }
      }
    }
    .todayContainer {
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 0 12px 0;
        .recommand {
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
        }
        img {
          width: 5.5px;
          height: 9px;
        }
        .more {
          display: inline-block;
          margin-right: 4px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #828a99;
        }
      }
      .imgContainer {
        display: flex;
        // overflow: scroll;
        justify-content: space-between;
        .imgAndText {
          display: flex;
          flex-direction: column;
          img {
            margin-bottom: 6px;
            width: 110px;
            height: 110px;
            object-fit: cover;
          }
          // margin-right: 7.5px;
          span {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
          }
        }
      }
    }
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 0 12px 0;
    }
    .specialContainer {
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 0 12px 0;
        .recommand {
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
        }
        img {
          width: 5.5px;
          height: 9px;
        }
        .more {
          display: inline-block;
          margin-right: 4px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #828a99;
        }
      }
      .imgContainer {
        display: flex;
        overflow: scroll;
        .imgAndText {
          img {
            width: 277.5px;
            height: 128px;
          }
          margin-right: 7.5px;
          span {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
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
