<template>
  <div class="temp">
    <div class="backgroundColor"></div>
    <!-- <div class="new_header" v-show="flag">
      <div class="back" @click="toback">
        <img src="../../assets/img/ic_back.png" />
      </div>
      <div class="new_font">{{ class_data.name }}</div>
    </div> -->
    <!-- <div class="header_pc" v-show="!flag">{{ class_data.name }}</div> -->
    <!-- <div class="header">
      <div class="header_box">
        <div class="logo">
          <img src="../../assets/img/img_logo2@2x.png" />
        </div>
        <div class="input">
          <input type="text" />
          <div class="search cursor">
            <img src="../../assets/img/ic_search@2x.png" />
          </div>
        </div>
        <div class="headimg ">
          <img src="../../assets/img/banner-01.png" />
        </div>
      </div>
    </div> -->
    <div class="box">
      <div class="orderpc">
        <!--上边部分start-->
        <div class="fixed" :class="!flag ? 'fixed_top' : ''">
          <div>
            <div class="order_top">
              <!-- 左边的图片部分开始 -->
              <div class="left_img">
                <img :src="class_data.cdn + class_data.logo" alt="" />
              </div>
              <!-- 左边的图片部分结束 -->
              <!--右边文字部分开始-->
              <div class="right_font">
                <div class="title">{{ class_data.name }}</div>
                <!-- <div class="score">
            <div class="score_num">5.0</div>
            <div class="line"></div>
            <div>start预留的位置</div>
          </div> -->
                <div class="teacher_flex">
                  <div>
                    <!--老师部分start-->
                    <div class="teacher" v-if="class_type == 1">
                      <span class="teacher_name">{{ teacher_name }}</span>
                      <span>{{ course_count }}课时</span>
                    </div>
                    <!--老师部分end-->
                    <div class="start_time" v-if="class_type == 1">
                      开课时间：{{ time }}
                    </div>
                  </div>
                  <div class="btn" @click="btn">
                    购买课程 ¥{{ goods.price }}
                  </div>
                </div>
              </div>
              <!--右边文字部分结束-->
            </div>
            <!--上边部分end-->
            <!--分类导航部分开始-->
            <div class="bar">
              <div
                v-for="(item, index) in navList"
                :key="index"
                class="nav-bar-item"
                :class="currentTab == index ? 'current' : 'item'"
                :id="item.id"
                @click="clickTab(index)"
              >
                {{ item.name }}
              </div>
            </div>
            <div class="bar_line"></div>
          </div>
        </div>
        <!--分类导航部分结束-->
        <div
          class="bottom_detail"
          :class="flag ? 'detail_top' : ''"
          v-if="currentTab == 0"
          v-html="class_data.content"
        ></div>
        <Catalog
          class="catalogpc"
          v-show="currentTab == 1"
          v-if="chapter_map"
          :chapter_map="chapter_map"
          :cdn="cdn"
        ></Catalog>
      </div>
      <div>
        <div class="hotclass">
          <div class="hot_title">课程热力榜</div>
          <div class="min_title" v-for="(item, index) in list" :key="index">
            {{ item.min }}
          </div>
        </div>
        <!--下方图片 -->
        <div class="hot_img" v-for="(item, index) in arr" :key="index">
          <img :src="item.src" />
          <div class="about">{{ item.about }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Catalog from "../../components/catalog";
import {
  getClssInfomation,
  getSmallClassDetail,
  getCouponList,
  setUserCoupon
} from "../../api/common";

import { isMobile } from "../../common/util";

export default {
  components: {
    Catalog
  },
  data() {
    return {
      list: [
        { min: "2017年高考真题 语文 (北京卷)" },
        { min: "2017年高考真题 理综 (北京卷)" },
        { min: "2017年高考真题 英语 (北京卷)" },
        { min: "2018年高考真题 英语 (北京卷)" },
        { min: "2017年高考真题 语文 (北京卷)" },
        { min: "2017年高考真题 语文 (北京卷)" }
      ],
      arr: [
        {
          src: require("../../assets/img/img_banner_1.jpg"),
          about: "巧读经典英文3天挑巧读经典英文3天挑巧读经典英文3天挑"
        },
        {
          src: require("../../assets/img/img_banner_2.jpg"),
          about: "巧读经典英文3天挑"
        },
        {
          src: require("../../assets/img/img_banner_3.jpg"),
          about: "巧读经典英文3天挑"
        },
        {
          src: require("../../assets/img/img_banner_4.jpg"),
          about: "巧读经典英文3天挑"
        }
      ],
      navList: [
        {
          name: "详情",
          id: "0"
        },
        {
          name: "目录",
          id: "1"
        }
      ],
      time: "", //开课时间
      teacher_name: "",
      course_count: "",
      currentTab: 0, // 顶部切换导航用到的
      class_data: "",
      chapter_map: "",
      cdn: "",
      goods_id: "",
      need_to_buy: "",
      flag: isMobile(),
      class_type: "",
      goods: "",
      is_bought: ""
    };
  },
  created() {},
  watch: {},
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.toback();
    });
    this.getData();
  },
  methods: {
    toback() {
      this.$router.push({
        path: "/web/Home",
        query: {
          token: this.$route.query.token
          // class_id: this.class_id
        }
      });
    },

    /**
     * 导航切换
     */
    clickTab(e) {
      if (this.currentTab === 1 * e) return false;
      this.currentTab = 1 * e;
    },
    // 导航点击切换结束
    btn() {
      // 自动领券开始
      getCouponList().then(res => {
        if (res.code == 0) {
          if (this.is_bought == 0) {
            this.$router.push({
              path: "/web/Pay",
              query: {
                goods_id: this.goods_id,
                token: this.$route.query.token,
                class_data: this.class_data
              }
            });
          } else {
            this.$toast("你已购买过该课程,不可重复购买");
          }
        }
      });
      // 自动领券结束
    },
    getData() {
      let classid = localStorage.getItem("classid");
      getClssInfomation({ id: classid }).then(res => {
        if (res.code == 0) {
          this.class_data = res.data;
          //buy_num是购买数量
          this.buy_num = res.data.buy_num;
          //class_type==1是大班课class_type==2是小班课
          this.class_type = res.data.class_type;
          this.chapter_map = res.data.chapters;
          this.course_count = res.data.course_count; //课时
          this.time = res.data.time; //开课时间
          this.teacher_name = res.data.teacher_name;
          this.goods_id = res.data.goods.goods_id;
          this.goods = res.data.goods;
          this.is_bought = res.data.is_bought;
          localStorage.setItem("cdnlogo", res.data.cdn + res.data.logo);
          localStorage.setItem("goods_id", res.data.goods.id);
          localStorage.setItem("price", res.data.goods.price);
          localStorage.setItem("old_price", res.data.goods.old_price);
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.new_header {
  width: 100%;
  padding: 14px 0 14px 21.05px;
  background: #fff;
  display: flex;
  box-sizing: border-box;
  position: fixed;
  z-index: 9;
}
.header {
  width: 100%;
  // box-sizing: border-box;
  position: fixed;
  z-index: 9;
  height: 64px;
  background: linear-gradient(129deg, #ff7300 0%, #ff5500 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  .header_box {
    width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      img {
        width: 95px;
        height: 30px;
      }
    }
    .input {
      width: 420px;
      height: 36px;
      background: #ffffff;
      border-radius: 5px;
      display: flex;
      align-items: center;
      input {
        width: 80%;
        height: 24px;
        border: 0;
        border-right: 1px solid #d8d8d8;
        padding: 0 20px;
      }
      .search {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 44px;
        img {
          width: 14px;
          height: 14px;
        }
      }
    }
    .headimg {
      img {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
  }
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
.orderpc {
  // padding: 0px 24px;
  // min-width: 918px;
  box-sizing: border-box;
  // background: #f3f5f9;
  width: 880px;
  margin-right: 24px;
  border-radius: 5px;
}
.order_top {
  display: flex;
}
.order_top .left_img {
  width: 277px;
  height: 157px;
  background: rgba(67, 88, 151, 1);
  border-radius: 5px;
  margin-right: 21.6px;
}
.left_img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.order_top .right_font {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.order_top .right_font .title {
  height: 38px;
  font-size: 27px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
  line-height: 38px;
}
.score {
  margin-top: 10.8px;
  margin-bottom: 10.8px;
  display: flex;
}
.score_num {
  width: 47px;
  height: 39px;
  font-size: 32px;
  font-family: Helvetica-Bold, Helvetica;
  font-weight: bold;
  color: rgba(255, 128, 0, 1);
  line-height: 39px;
}
.line {
  width: 1px;
  height: 24px;
  background: rgba(216, 216, 216, 1);
  margin: 6.75px 20.41px 8.1px 21.6px;
}
.teacher_flex {
  display: flex;
  justify-content: space-between;
}
.teacher {
  height: 23px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(130, 138, 153, 1);
  line-height: 23px;
  margin-bottom: 6.4px;
}
.teacher .teacher_name {
  margin-right: 21.6px;
}

.start_time {
  height: 23px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(130, 138, 153, 1);
  line-height: 23px;
  display: flex;
}
.btn {
  //  width:167px;
  // height:35px;
  background: rgba(255, 128, 0, 1);
  border-radius: 5px;
  margin-top: 10.8px;
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 35px;
  text-align: center;
  padding: 7px 16px 5px 18px;
  box-sizing: border-box;
  cursor: pointer;
}
/*分类导航部分开始*/
.bar {
  display: flex;
  margin-top: 28px;
}
/* 分类导航默认样式开始 */
.bar .nav-bar-item {
  position: relative;
  word-break: keep-all;
  margin-right: 64.8px;
  // width:39px;
  height: 27px;
  font-size: 19px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  line-height: 27px;
  cursor: pointer;
}
.item {
  color: rgba(130, 138, 153, 1);
}
.current {
  color: rgba(255, 128, 0, 1);
}
.bar .current.nav-bar-item::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 34px;
  height: 3px;
  width: 38px;
  background: linear-gradient(90deg, #ff4936 0%, #ff6e3c 100%);
  box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(255, 89, 0, 0.25);
  border-radius: 24rpx;
}
.bar_line {
  // width:853px;
  height: 1px;
  background: rgba(242, 245, 250, 1);
  margin-top: 9.46px;
  margin-bottom: 28px;
}
//  分类导航选中的样式end
.bottom_detail {
  // margin-top: 232px;
  padding: 0 24px;
  background: #fff;
  /deep/ img {
    width: 100% !important;
    height: auto;
    display: block;
  }
}
.detail_top {
  margin-top: 286px !important;
}
.fixed {
  // position: fixed;
  padding: 24px;
  // box-sizing: border-box;
  // z-index: 9;
  background: #fff;
  // left: 50%;
  width: 832px;
  // top: 0px;
  // transform: translate(-50%, 0px);
  margin: auto;
}
// .fixed_top {
//   top: 53 !important;
// }
.catalogpc {
  background: #fff;
  padding: 0 24px;
}
// .catalogipad {
//   margin-top: 280px;
// }
.box {
  width: 1200px;
  margin: auto;
  display: flex;
  padding-top: 104px;
}
.hotclass {
  width: 300px;
  // height: 400px;
  background: #ffffff;
  border-radius: 5px;
  padding: 24px 16px 8px;
  box-sizing: border-box;
  margin-bottom: 20px;
}
.hot_title {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  margin-bottom: 26px;
}
.min_title {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #666666;
  margin-bottom: 20px;
}
.hot_img {
  width: 300px;
  height: 210px;
  background: #ffffff;
  border-radius: 4px;
  padding: 16px 16px 8px;
  box-sizing: border-box;
  margin-bottom: 20px;
  img {
    width: 268px;
    height: 152px;
    background: #435897;
    border-radius: 4px;
    object-fit: cover;
  }
  .about {
    width: 228px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #828a99;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.temp {
  width: 100vw;
}
</style>
