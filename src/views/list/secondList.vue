<template>
  <div class="temp">
    <header class="titleBox">
      <img
        src="../../assets/img/ic_back.png"
        class="titleBox"
        @click="toBack"
      />
      <div class="titleText">{{ titleName }}</div>
    </header>
    <body class="listBox">
      <Card :list="lessonList" @toCourse="toCourse"></Card>
    </body>
  </div>
</template>

<script>
import Card from "../../components/cardPrice.vue";
import { getSubjectClass } from "../../api/common";

export default {
  components: {
    Card
  },
  data() {
    return {
      titleName: "",
      lessonList: []
    };
  },
  mounted() {
    if (this.$route.query.subject_id) {
      getSubjectClass({ subject_id: this.$route.query.subject_id }).then(
        res => {
          this.titleName = res.data.name;
          this.lessonList = res.data.course;
          this.$nextTick(() => {
            window.scrollTo(0, 1);
            window.scrollTo(0, 0);
          });
        }
      );
    } else {
      getSubjectClass().then(res => {
        this.titleName = res.data.name;
        this.lessonList = res.data.course;
        this.$nextTick(() => {
          window.scrollTo(0, 1);
          window.scrollTo(0, 0);
        });
      });
    }
  },
  methods: {
    toBack() {
      this.$router.push({
        path: "/home",
        query: { token: this.$route.query.token }
      });
    },
    toCourse(item) {
      // console.log(this.$route.query.subject_id);
      this.$router.push({
        path: "/course/playCourse",
        query: {
          id: item.id,
          address: this.$route.query.subject_id,
          token: this.$route.query.token
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.temp {
  width: 100%;
  .titleBox {
    position: fixed;
    height: 42px;
    width: 100%;
    justify-content: space-between;
    background: rgba(255, 255, 255, 1);
    z-index: 1;
    .titleBox {
      height: 18px;
      width: 18px;
      margin-top: 10.5px;
      margin-left: 16px;
    }
    .titleText {
      position: fixed;
      left: 50%;
      transform: translate(-50%, 0%);
      margin-top: 4px;
      font-size: 21px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(42, 46, 51, 1);
      line-height: 29.5px;
    }
  }
  .listBox {
    padding: 42px 15px;
  }
}
</style>
