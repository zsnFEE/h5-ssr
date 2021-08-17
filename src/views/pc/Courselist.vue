<template>
  <div class="orders">
    <div class="bgpc"></div>
    <div class="new_header" v-show="flag">
      <div class="back" @click="toBack">
        <img src="../../assets/img/ic_back.png" />
      </div>
      <div class="new_font">{{ name }}</div>
    </div>
    <div class="header_pc" v-show="!flag">
      {{ name }}
    </div>
    <!-- -->
    <div class="orders_box">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        finished-text="没有更多了"
        :immediate-check="false"
        :offset="1"
      >
        <Lists :list="lessonList"></Lists>
      </van-list>
    </div>
  </div>
</template>
<script>
import { getSaleClass } from "../../api/common";
import { isMobile } from "../../common/util";
import Lists from "../../components/pc/list";
import { List } from "vant";
export default {
  components: {
    Lists,
    [List.name]: List
  },
  data() {
    return {
      lessonList: [],
      flag: isMobile(),
      name: this.$route.query.name,
      page: 1,
      per_page: 20,
      loading: false,
      finished: false
    };
  },
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.toBack();
    });
    getSaleClass({
      page: this.page,
      per_page: this.per_page,
      category_id: this.$route.query.category_id
    }).then(res => {
      if (res.code == 0) {
        this.lessonList = res.data.list;
        if (this.lessonList.length >= res.data.count) {
          this.finished = true;
        }
      } else {
        this.$toast("数据丢失");
      }
    });
  },
  methods: {
    toBack() {
      this.$router.push({
        path: "/pc/Smallclass",
        query: {
          token: this.$route.query.token
        }
      });
    },
    onLoad() {
      this.page++;
      setTimeout(() => {
        getSaleClass({
          page: this.page,
          per_page: this.per_page,
          category_id: this.$route.query.category_id
        }).then(res => {
          if (res.code == 0) {
            res.data.list.map((item, i) => {
              this.lessonList.push(res.data.list[i]);
            });
            // for (let i = 0; i < res.data.list.length; i++) {
            //   this.lessonList.push(res.data.list[i]);
            // }
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
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.orders {
  width: 100%;
  height: 100%;
  background: #f3f5f9;
  padding-top: 62px;
  box-sizing: border-box;
}
.orders_box {
  padding: 20px 112px;
  height: 100%;
  box-sizing: border-box;
  // overflow: auto;
}
.new_header {
  width: 100%;
  padding: 8.5px 0 8.5px 21.05px;
  background: #fff;
  display: flex;
  box-sizing: border-box;
  position: fixed;
  z-index: 9;
  top: 0;
}
.header_pc {
  width: 100%;
  padding: 11px 40px;
  background: #fff;
  box-sizing: border-box;
  position: fixed;
  z-index: 9;
  top: 0;
  font-size: 21px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
}
.back {
  width: 20px;
  height: 20px;
  margin-top: 9px;
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
}
</style>
