<template>
  <div class="Smallclass">
    <!-- <Myheader @jump="jump" @search="search"></Myheader> -->
    <!--轮播图部分开始-->
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      duration="500"
      indicator-color="white"
    >
      <van-swipe-item v-for="item in banners" :key="item.class_id">
        <img class="banner_img" :src="item.src" />
      </van-swipe-item>
    </van-swipe>
    <!--轮播图部分结束-->
    <div class="Smallclass_box">
      <!--课程分类标题部分开始-->
      <div v-for="(items, index) in list" :key="index">
        <div class="classify">
          <div class="title">
            <div
              class="circle"
              style="background: rgba(168, 85, 255, 0.5);"
            ></div>
            <div class="circle abs"></div>
            <div class="title_font">{{ items.name }}</div>
          </div>
          <!--更多start-->
          <div class="morelist" @click="tolist(items.id, items.name)">
            <span>更多</span>
            <img src="../../assets/img/btn_arrow.png" alt="" />
          </div>
          <!--更多end-->
        </div>
        <!--课程分类标题部分结束-->
        <!--下方课程部分开始-->
        <div :class="items.classes.length > 2 ? 'Courselists' : 'Courselist'">
          <div
            :class="items.classes.length > 2 ? 'lists' : 'list'"
            v-for="(item, index) in items.classes"
            :key="index"
          >
            <div
              class="list_item"
              @click="toTrial(item.id, items.id, items.name)"
            >
              <div class="item_left">
                <img :src="item.cdn + item.logo" />
              </div>
              <div class="item_right">
                <div class="item_title">{{ item.name }}</div>
                <div class="item_detail">{{ item.description }}</div>
                <div class="item_price child">
                  <span class="punctuation">¥ </span>
                  <span class="num">{{ item.price }}</span>
                  <span class="line" v-if="item.line_price"
                    >¥{{ item.line_price }}</span
                  >
                </div>
                <div class="item_coupon">{{ item.coupon }}</div>
              </div>
            </div>
          </div>
          <!--体验课图片显示开始-->
          <!-- <div class="trial">
            <img src="../../assets/img/img_069.png" />
            <div class="trial_bottom">
              <div class="trial_font">猴猴画少儿美术体验课</div>
            </div>
          </div> -->
          <!--体验课图片显示结束-->
        </div>
        <!--下方课程部分结束-->
      </div>
    </div>
  </div>
</template>
<script>
import { Swipe, SwipeItem } from "vant";
import { getAppList, getSmallClass, getClassCategory } from "../../api/common";
import { Toast } from "vant";
// import Myheader from "../../components/headerweb";

export default {
  components: {
    [SwipeItem.name]: SwipeItem,
    [Swipe.name]: Swipe
    // Myheader
  },
  data() {
    return {
      banners: [
        { src: require("../../assets/img/img_banner_1.jpg") },
        { src: require("../../assets/img/img_banner_2.jpg") }
      ],

      list: []
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
      // getAppList().then(res => {
      //   that.banners = res.data.banners;
      //   Toast.clear();
      // });
    });
    dsBridge.call("showtabbar", "", function(v) {});
    // getAppList().then(res => {
    //   this.banners = res.data.banners;
    // });
    // 小课堂列表数据
    getClassCategory().then(res => {
      if (res.code == 0) {
        this.list = res.data;
      }
    });
  },
  methods: {
    // jump(data) {
    //   this.$router.push({
    //     path: data,
    //     query: { token: this.$route.query.token }
    //   });
    // },
    // search(data) {
    //   console.log(data);
    // },
    tolist(category_id, name) {
      this.$router.push({
        path: "/web/Courselist",
        query: {
          token: this.$route.query.token,
          category_id: category_id,
          name: name
        }
      });
    },
    toTrial(classid, category_id, name) {
      localStorage.setItem("Classtype", 2);
      localStorage.setItem("classid", classid);
      this.$router.push({
        path: "/web/About",
        query: {
          id: classid,

          course: 1,
          token: this.$route.query.token,
          category_id: category_id,
          name: name
        }
      });
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.Smallclass {
  width: 100vw;
  min-height: 100%;
  padding-top: 80px;
  padding-bottom: 40px;
  box-sizing: border-box;
  background: #f3f5f9;
}

.Smallclass_box {
  // width: 1200px;
  width: 1200px;
  // padding: 0px 9% 20px;
  box-sizing: border-box;
  margin: 0 auto;
}
.banner_img {
  height: 100%;
  border-radius: 8px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(243, 245, 249, 1) 100%
  );
}
.my-swipe {
  width: 1200px;
  margin: auto;
}
.van-swipe-item {
  width: 1200px;
  display: flex;
  justify-content: center;
  img {
    height: 100%;
    width: 1200px;
    border-radius: 6px;
  }
}
/deep/ .van-swipe__indicators {
  bottom: 16px;
  left: unset;
  right: 1%;
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
// 课程分类标题部分开始
.classify {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}
.title {
  display: flex;
  width: 49%;
}
.title_font {
  margin-left: 7px;
  font-size: 21px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #000000;
}
.circle {
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
// 下方列表部分
.Courselist {
  display: flex;
  // justify-content: space-between;
  margin-top: 15px;
  flex-wrap: wrap;
}
.Courselists {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  flex-wrap: wrap;
}
.lists {
  width: 386.666px;
  margin-bottom: 20px;
  cursor: pointer;
}

.list {
  width: 386.666px;
  margin-bottom: 20px;
  cursor: pointer;
  margin-right: 20px;
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
  min-width: 75px;
  min-height: 100px;
  border-radius: 4px;
  margin-right: 3%;
}
.item_left img {
  width: 100%;
  height: 100%;
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
.morelist {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #828a99;
  line-height: 45px;
  cursor: pointer;
  img {
    margin-left: 5px;
    width: 6px;
    height: 13px;
    object-fit: cover;
  }
}
// 体验课
.trial {
  width: 228px;
  height: 304px;
  position: relative;
  img {
    width: 228px;
    height: 304px;
    object-fit: cover;
    border-radius: 8px;
  }
  .trial_bottom {
    position: absolute;
    bottom: 0;
    width: 228px;
    height: 120px;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 100%
    );
    border-radius: 0px 0px 8px 8px;
  }
  .trial_font {
    width: 100%;
    position: absolute;
    bottom: 18px;
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    text-align: center;
  }
}
</style>
