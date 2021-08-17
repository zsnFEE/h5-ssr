<template>
  <div class="temp">
    <div class="backgroundColor"></div>
    <header>
      <div class="title title_box">
        <img
          @click="toBack"
          src="../../assets/img/ic_back.png"
          class="titleArrow title_arrow"
        />
        <div class="titleText title_text">{{ titleName }}</div>
        <div class="titleDv "></div>
      </div>
    </header>
    <body class="listBox">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        finished-text="没有更多了"
        :immediate-check="false"
        :offset="1"
      >
        <Card :list="lessonList" @toCourse="toCourse"></Card>
      </van-list>
    </body>
  </div>
</template>

<script>
import Card from "../../components/cardPhone";
import { getSaleClass } from "../../api/common";
import { List } from "vant";

export default {
  components: {
    [List.name]: List,
    Card
  },
  data() {
    return {
      titleName: "",
      lessonList: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20
    };
  },
  mounted() {
    this.titleName = this.$route.query.titleName;
    dsBridge.call("hidetabbar", "", function(v) {});
    getSaleClass({
      page: this.page,
      per_page: this.per_page,
      category_id: this.$route.query.categoryId
    }).then(res => {
      if (res.code == 0) {
        this.lessonList = res.data.list;
        if (this.lessonList.length >= res.data.count) {
          this.finished = true;
        }
      } else {
      }
    });
  },
  methods: {
    toBack() {
      this.$router.push({
        path: "/phone/homePagePhone",
        query: { token: this.$route.query.token }
      });
    },
    toCourse(item) {
      localStorage.setItem("morePage", this.$route.query.categoryId);
      localStorage.setItem("moreTitle", this.$route.query.titleName);
      localStorage.setItem("smallClass", item.id);

      this.$router.push({
        path: "/lp",
        query: { token: this.$route.query.token, gid: item.id }
      });
    },

    onLoad() {
      this.page++;
      setTimeout(() => {
        getSaleClass({
          page: this.page,
          per_page: this.per_page,
          category_id: this.$route.query.categoryId
        }).then(res => {
          if (res.code == 0) {
            for (let i = 0; i < res.data.list.length; i++) {
              this.lessonList.push(res.data.list[i]);
            }
            this.loading = false;
            if (this.lessonList.length >= res.data.count) {
              this.finished = true;
            }
          } else {
            this.$toast(res.msg);
          }
        });
      }, 1);
    }
  }
};
</script>

<style lang="less" scoped>
.temp {
  width: 100%;
  height: 100%;
  .title {
    .titleDv {
      width: 18px;
    }
  }
  .listBox {
    min-height: calc(100% - 57px);
    // background: rgba(243, 245, 249, 1);
    padding: 42px 15px 15px 15px;
  }
}
</style>
