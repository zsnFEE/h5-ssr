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
import Card from "../../components/cardIpad";
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
        }
      );
    } else {
      getSubjectClass().then(res => {
        this.titleName = res.data.name;
        this.lessonList = res.data.course;
      });
    }
  },
  methods: {
    toBack() {
      this.$router.push({
        path: "/ipad/homeIpad",
        query: { token: this.$route.query.token }
      });
    },
    toCourse(item) {
      this.$router.push({
        path: "/ipad/playCourseIpad",
        query: { id: item.id, token: this.$route.query.token }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.temp {
  width: 100%;
  height: 100%;
  background: #f0f2f5;
  .titleBox {
    position: fixed;
    height: 114.5px;
    width: 100%;
    justify-content: space-between;
    background: #f0f2f5;
    z-index: 1;
    .titleBox {
      height: 18px;
      width: 18px;
      margin-top: 56px;
      margin-left: 32px;
    }
    .titleText {
      position: fixed;
      left: 50%;
      transform: translate(-50%, 0%);
      margin-top: 50px;
      font-size: 21px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(42, 46, 51, 1);
      line-height: 29.5px;
    }
  }
  .listBox {
    padding: 114.5px 31px 10px 31px;
  }
}
</style>
