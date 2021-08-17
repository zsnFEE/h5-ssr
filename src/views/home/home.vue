<template>
  <div class="home">
    <!-- <div>
      {{ `${$route.query.token}/${$route.name}` }}
  </div>-->
    <header>
      <div>发现课程</div>
      <img @click="toMy" :src="user.headimgurl" alt />
    </header>
    <body>
      <van-swipe class="my-swipe" indicator-color="white" :autoplay="3000">
        <van-swipe-item
          v-for="(item, index) in banner"
          :key="index"
          @click="toCourse(item)"
        >
          <img :src="item.src" alt />
        </van-swipe-item>
      </van-swipe>
      <div class="todayContainer">
        <div class="title">
          <span class="recommand">今日推荐</span>
          <div class>
            <span class="more" @click="toMore">更多</span>
            <img src="../../assets/img/btn_arrow.png" alt />
          </div>
        </div>
        <div class="imgContainer">
          <div
            class="imgAndText"
            @click="toCourse(item)"
            v-for="(item, index) in todayClass"
            :key="index"
            v-show="index < 3"
          >
            <img :src="item.logo" alt />
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
      <div class="specialContainer">
        <div class="title">
          <span class="recommand">专题探索</span>
        </div>
        <div class="imgContainer">
          <div
            class="imgAndText"
            @click="toMore(item)"
            v-for="(item, index) in subjects"
            :key="index"
          >
            <img :src="item.logo" alt />
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
      <div class="title">
        <span class="recommand">大家都在看</span>
      </div>
      <Card :list="courseList" @toCourse="toCourse"></Card>
    </body>
  </div>
</template>
<script>
import { getAppList } from "../../api/common";
import { Swipe, SwipeItem } from "vant";
import Card from "../../components/cardPrice";

export default {
  components: {
    [SwipeItem.name]: SwipeItem,
    [Swipe.name]: Swipe,
    Card
  },
  data() {
    return {
      a: {},
      todayClass: [],
      user: {},
      banner: [],
      courseList: [],
      subjects: [],
      list: [{ id: "1", name: "新虹艺小孩子大艺术01-剪纸的线条" }]
    };
  },
  mounted() {
    // this.a = document.cookie;
    // console.log(1);
    getAppList().then(res => {
      this.todayClass = res.data.today_class;
      this.subjects = res.data.subjects;
      this.user = res.data.user;
      this.banner = res.data.banners;
      this.courseList = res.data.course;
      this.$nextTick(() => {
        window.scrollTo(0, 1);
        window.scrollTo(0, 0);
      });
    });
    // console.log(area);
  },
  methods: {
    toMore(item) {
      if (item) {
        this.$router.push({
          path: "/list/secondList",
          query: { subject_id: item.id, token: this.$route.query.token }
        });
      } else {
        this.$router.push({
          path: "/list/secondList",
          query: { token: this.$route.query.token }
        });
      }
    },
    toMy() {
      this.$router.push({
        path: "/my/myInfo",
        query: { token: this.$route.query.token }
      });
    },
    toCourse(item) {
      // console.log(item);
      this.$router.push({
        path: "/course/playCourse",
        query: {
          id: item.id || item.class_id,
          address: 1,
          token: this.$route.query.token
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.home {
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
    padding: 5px 15px;
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
      border-radius: 6px;
    }
    .van-swipe-item {
      height: 140px;
      width: 345px;
      background: wheat;
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
