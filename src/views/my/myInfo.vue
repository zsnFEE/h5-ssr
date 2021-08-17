<template>
  <div class="myInfo">
    <header>
      <img
        @click="toBack"
        class="goback"
        src="../../assets/img/ic_back.png"
        alt=""
      />
      <img @click="toSet" src="../../assets/img/ic_setting.png" alt="" />
    </header>
    <body>
      <div class="middle">
        <div class="imgContainer">
          <img :src="user.headimgurl" alt="" />
          <span class="nickname">{{ user.nickname }}</span>
        </div>
        <div>
          <span class="studyTime">{{ user.study_time }}min</span>
          <div class="studentAll">累计学习</div>
        </div>
      </div>
      <div class="bottomContainer">
        <span class="relateTitle">观看记录</span>
        <Card :list="history" @toCourse="toCourse"></Card>
      </div>
    </body>
  </div>
</template>
<script>
import Card from "../../components/card";
import { getMyInfo, studyLog } from "../../api/common";
export default {
  components: {
    Card
  },
  data() {
    return {
      user: {},
      history: []
    };
  },
  mounted() {
    getMyInfo().then(res => {
      this.user = res.data.user;
      this.history = res.data.history;
      this.$nextTick(() => {
        window.scrollTo(0, 1);
        window.scrollTo(0, 0);
      });
    });
  },
  methods: {
    toBack() {
      this.$router.push({
        path: "/home",
        query: { token: this.$route.query.token }
      });
    },
    toSet() {
      this.$router.push({
        path: "/set/setting",
        query: { token: this.$route.query.token }
      });
    },
    toCourse(item) {
      this.$router.push({
        path: "/course/playCourse",
        query: { id: item.id, address: 2, token: this.$route.query.token }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.myInfo {
  header {
    padding: 5px 15px;
    // width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .goback {
      width: 20px;
      height: 20px;
    }
    img {
      width: 24px;
    }
  }
  body {
    padding: 0 15px;
    .middle {
      padding: 34.5px 0 36.5px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #eaeef2;
      .studyTime {
        font-size: 18px;
        font-weight: 500;
      }
      .imgContainer {
        display: flex;
        margin-right: 5px;

        align-items: center;
        .nickname {
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
        }
      }
      .studentAll {
        font-size: 12px;
        color: white;
        width: 60px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background: linear-gradient(
          129deg,
          rgba(255, 115, 0, 1) 0%,
          rgba(255, 85, 0, 1) 100%
        );
      }
      img {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        margin-right: 15px;
      }
    }
    .bottomContainer {
      padding: 20px 0;
    }
  }
}
</style>
