<template>
  <div class="playCourse">
    <header>
      <div class="playContain">
        <div
          class="backImg"
          :style="{
            background:
              'url(' + courseInfo.logo + ')' + 'no-repeat center center / cover'
          }"
        ></div>
        <img @click="play" src="../../assets/img/ic_play.png" alt />
      </div>

      <div class="infoContain">
        <div class="title">
          <span>{{ courseInfo.name }}</span>
        </div>
        <div class="info">
          <span class="teacher">浏览次数：{{ courseInfo.view_count }}</span>
          <span>课时数量：1</span>
        </div>
      </div>
      <img
        class="backButton"
        src="../../assets/img/ic_back_white.png"
        alt
        @click="goBack"
      />
    </header>
    <body>
      <div>
        <span class="relateTitle">相关课程</span>
        <Card :list="lessonList" @toCourse="toCourse"></Card>
      </div>
    </body>
  </div>
</template>
<script>
import Card from "../../components/cardPrice";
import { getCourseInfo } from "../../api/common";
import { getMyInfo, apiInfo } from "../../api/common";
import { Toast } from "vant";

export default {
  components: {
    [Toast.name]: Toast
  },
  data() {
    return {
      lessonList: [],
      courseInfo: {}
    };
  },
  components: { Card },
  mounted() {
    getCourseInfo({ id: this.$route.query.id }).then(res => {
      this.lessonList = res.data.list;
      this.courseInfo = res.data.course_info;
      this.$nextTick(() => {
        window.scrollTo(0, 1);
        window.scrollTo(0, 0);
      });
    });
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
        let model = {
          type: "video", //online/video
          classId: this.courseInfo.id,
          lessonId: "",
          lessonName: "",
          videoUrl: this.courseInfo.resource_url
        };
        // console.log(model, JSON.stringify(model));
        dsBridge.call("RoomSyn", JSON.stringify(model));
      }
    }, 1000);
  },
  methods: {
    play() {
      let model = {
        type: "video", //online/video
        classId: this.courseInfo.id,
        lessonId: "",
        lessonName: "",
        videoUrl: this.courseInfo.resource_url
      };
      // console.log(model, JSON.stringify(model));
      dsBridge.call("RoomSyn", JSON.stringify(model));
    },
    goBack() {
      if (this.$route.query.address == 1) {
        this.$router.push({
          path: "/home",
          query: { token: this.$route.query.token }
        });
      } else if (this.$route.query.address == 2) {
        this.$router.push({
          path: "/my/myInfo",
          query: { token: this.$route.query.token }
        });
      } else {
        this.$router.push({
          path: "/list/secondList",
          query: {
            subject_id: this.$route.query.address,
            token: this.$route.query.token
          }
        });
      }
    },
    toCourse(item) {
      if (item.id == this.$route.query.id) {
        return;
      }
      this.$router.push({
        path: "/course/playCourse",
        query: {
          id: item.id,
          address: this.$route.query.address,
          token: this.$route.query.token
        }
      });
      // this.$router.go(0);
    }
  }
};
</script>
<style lang="less" scoped>
.playCourse {
  // background: rgba(242, 245, 250, 1);
  background: #f2f5fa;
  header {
    background: white;
    margin-bottom: 10px;
    .playContain {
      position: relative;
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40px;
      }
    }
    .backImg {
      width: 100%;
      height: 211px;
    }
    .infoContain {
      padding: 5px 15px;
      display: flex;
      flex-direction: column;
      .title {
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #333333;
        margin-bottom: 6px;
      }
      .info {
        font-size: 14px;
        font-weight: 400;
        color: rgba(130, 138, 153, 1);
        .teacher {
          display: inline-block;
          margin-right: 20px;
        }
      }
    }
    .backButton {
      position: absolute;
      top: 6px;
      left: 12px;
      height: 30px;
      width: 30px;
    }
  }
  body {
    background: white;
    .relateTitle {
      display: inline-block;
      margin-top: 20px;
    }
    padding: 0 15px;
  }
}
</style>
