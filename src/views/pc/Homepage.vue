<template>
  <div class="home_page" :class="!flag ? 'pcContain' : ''">
    <!--轮播图部分开始-->
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      duration="800"
      indicator-color="white"
    >
      <van-swipe-item v-for="item in banners" :key="item.class_id">
        <img class="banner_img" :src="item.src" />
      </van-swipe-item>
    </van-swipe>
    <!--轮播图部分结束-->
    <div class="body">
      <!--上课方式按钮部分开始-->
      <div class="way">
        <div class="way_btn cursor" @click="toAttendclass">
          <div class="mode">
            <img
              class="how_img"
              src="../../assets/img/ic_how_to_class@2x.png"
            />
            <div class="way_font">如何上课</div>
          </div>
        </div>
        <div class="way_btn cursor" @click="toConsult">
          <div class="mode">
            <img class="how_img" src="../../assets/img/ic_ask@2x.png" />
            <div class="way_font">咨询老师</div>
          </div>
        </div>
      </div>
      <!--上课方式按钮部分结束-->
      <!-- 去分销页面开始 -->
      <img
        v-show="flag"
        class="toaward"
        src="../../assets/img/banner-01.png"
        @click="goAward"
      />
      <!-- 去分销页面结束 -->
      <!--课程分类标题部分开始-->
      <div class="classify">
        <div class="title">
          <div class="circle" style="background: rgba(255, 149, 0, 0.5);"></div>
          <div class="circle abs"></div>
          <div class="title_font">体验课</div>
        </div>
        <div class="title">
          <div
            class="circle2"
            style="background: rgba(168, 85, 255, 0.5);"
          ></div>
          <div class="circle2 abs"></div>
          <div class="title_font">系统课</div>
        </div>
      </div>
      <!--课程分类标题部分结束-->
      <!--下方课程部分开始-->
      <div class="Courselist">
        <div class="list" @click="toTrialclass(0)">
          <div class="list_item">
            <div class="item_left">
              <img src="../../assets/img/img_069.png" />
            </div>
            <div class="item_right">
              <div class="item_title">趣味体验课</div>
              <div class="item_detail">新用户专享包邮赠送画材礼包</div>
              <div class="item_price child">
                <span class="punctuation">¥ </span>
                <span class="num">9.90</span>
                <span class="line">¥200.00</span>
              </div>
              <!-- <div class="item_coupon">剩余优惠名额 12名</div> -->
            </div>
          </div>
        </div>
        <!--右边的list-->
        <div class="list" @click="toTrialclass(1)">
          <div class="list_item">
            <div class="item_left">
              <img src="../../assets/img/img_070.png" />
            </div>
            <div class="item_right">
              <div class="item_title">精品直播课</div>
              <div class="item_detail">系统三阶培养体系，技能思维双向提升</div>
              <div class="item_price child">
                <span class="punctuation">¥ </span>
                <span class="num">2880</span>
                <span class="line">¥5760.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--下方课程部分结束-->
    </div>
  </div>
</template>
<script>
import { Swipe, SwipeItem, Toast } from "vant";
import { getAppList } from "../../api/common";
import { isMobile } from "../../common/util";

export default {
  components: {
    [SwipeItem.name]: SwipeItem,
    [Swipe.name]: Swipe
  },
  data() {
    return {
      banners: [
        { src: require("../../assets/img/img_banner_1.png") },
        { src: require("../../assets/img/img_banner_2.jpg") }
      ],
      flag: isMobile()
    };
  },
  mounted() {
    dsBridge.call("showtabbar", "", function(v) {});
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
      // getAppList().then(res => {
      //   that.banners = res.data.banners;
      //   Toast.clear();
      // });
    });
    // getAppList().then(res => {
    //   this.banners = res.data.banners;
    // });
  },
  methods: {
    toTrialclass(type) {
      if (type == 1) {
        // 系统课
        localStorage.setItem("Classtype", 1);
        this.$router.push({
          path: "/pc/Trialclass",
          query: { Classtype: 1, token: this.$route.query.token }
        });
      } else if (type == 0) {
        // 体验课
        localStorage.setItem("Classtype", 0);
        this.$router.push({
          path: "/pc/Trialclass",
          query: { Classtype: 0, token: this.$route.query.token }
        });
      }
    },
    // 去分销页面
    goAward() {
      localStorage.setItem("home", 1);
      this.$router.push({
        path: "/pc/Rule",
        query: { home: 1, token: this.$route.query.token }
      });
    },
    //去开始上课页面
    toAttendclass() {
      this.$router.push({
        path: "/pc/Attendclass",
        query: { token: this.$route.query.token }
      });
    },
    // 去咨询老师页面
    toConsult() {
      this.$router.push({
        path: "/pc/Consult",
        query: { token: this.$route.query.token, title: "咨询老师" }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.home_page {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  padding-top: 60px;
  padding-bottom: 40px;
  box-sizing: border-box;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(243, 245, 249, 1) 100%
  );
  &.pcContain {
    overflow-x: hidden;
  }
}

.body {
  width: 100vw;

  padding: 0px 9% 20px;
  box-sizing: border-box;
}
.banner_img {
  // width: 100%;
  // border-radius: 8px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(243, 245, 249, 1) 100%
  );
}
/deep/ .van-swipe {
  width: 100%;
}

// .my-swipe {
//   width: 100%;
// }
/deep/.van-swipe-item {
  width: 82%;
  display: flex;
  justify-content: center;
  img {
    height: 100%;
    width: 82%;
    border-radius: 6px;
  }
}
/deep/ .van-swipe__indicators {
  bottom: 16px;
  left: unset;
  right: 11%;
  -webkit-transform: translateX(0);
  transform: translateX(0);
}
/deep/ .van-swipe__indicator {
  height: 8px;
  width: 8px;
  border-radius: 2px;
}
/deep/ .van-swipe__indicator--active {
  width: 20px;
  border-radius: 2px;
}
.way {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  margin-bottom: 20px;
}
.way_btn {
  width: 49%;
  height: 56px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
}
.mode {
  display: flex;
  margin: 18px 0px;
  text-align: center;
  justify-content: center;
}
.how_img {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
.wap_btn .way_font {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 20px;
}
.classify {
  display: flex;
  justify-content: space-between;
}
.title {
  display: flex;
  width: 49%;
}
.title_font {
  height: 29px;
  font-size: 21px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
  line-height: 29px;
  margin-left: 7px;
}
.circle {
  width: 15px;
  height: 15px;
  background: rgba(255, 149, 0, 0.7);
  border-radius: 50%;
  margin-top: 6px;
}
.circle2 {
  width: 15px;
  height: 15px;
  background: rgba(168, 85, 255, 0.7);
  border-radius: 50%;
  margin-top: 6px;
}
.abs {
  position: relative;
  left: -5px;
}
.Courselist {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
.list {
  width: 49%;
  cursor: pointer; /*鼠标悬停变小手*/
}
.list_item {
  // height:132px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  position: relative;
}
// 右边的价格定位start
.child {
  position: absolute;
  bottom: 16px;
}
// 右边的价格定位end
.item_left {
  width: 75px;
  height: 100px;
  background: rgba(242, 245, 250, 1);
  border-radius: 4px;
  margin-right: 3%;
}
.item_left img {
  width: 100%;
  object-fit: cover;
  border-radius: 4px;
}
.item_title {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 22px;
}
.item_detail {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(130, 138, 153, 1);
  line-height: 16px;
  margin-top: 4px;
  margin-bottom: 11px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item_price .punctuation {
  font-size: 16px;
  font-family: DINAlternate-Bold, DINAlternate;
  font-weight: bold;
  color: rgba(255, 85, 51, 1);
  line-height: 18px;
}
.item_price .num {
  font-size: 24px;
  font-family: DINAlternate-Bold, DINAlternate;
  font-weight: bold;
  color: rgba(255, 85, 51, 1);
  line-height: 28px;
  margin-right: 6px;
}
.item_price .line {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(130, 138, 153, 1);
  line-height: 16px;
  text-decoration: line-through;
}
.item_coupon {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 85, 51, 1);
  line-height: 16px;
}
.toaward {
  width: 100%;
  margin-bottom: 20px;
}
</style>
