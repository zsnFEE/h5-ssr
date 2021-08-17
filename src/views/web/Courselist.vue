<template>
  <div class="orders" v-title :data-title="name">
    <div class="bgpc"></div>
    <!-- <div class="new_header" v-show="flag">
      <div class="back" @click="toBack">
        <img src="../../assets/img/ic_back.png" />
      </div>
      <div class="new_font">{{ name }}</div>
    </div>
    <div class="header_pc" v-show="!flag">
      {{ name }}
    </div> -->
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
        <!-- <Lists :list="lessonList"></Lists> -->
        <div class="Courselist">
          <div class="list" v-for="(item, index) in lessonList" :key="index">
            <div class="list_item" @click="toTrialclass(item.id)">
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
        </div>
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
    toTrialclass(classid) {
      localStorage.setItem("classid", classid);
      this.$router.push({
        path: "/web/About",
        query: {
          id: classid,

          course: 2,
          token: this.$route.query.token,
          category_id: this.$route.query.category_id,
          name: this.$route.query.name
        }
      });
    },
    toBack() {
      this.$router.push({
        path: "/web/Home",
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
  // padding: 20px 112px;
  height: 100%;
  box-sizing: border-box;
  // overflow: auto;
  width: 1220px;
  margin: auto;
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
.Courselist {
  display: flex;
  // justify-content: space-between;
  margin-top: 15px;
  flex-wrap: wrap;
}
.list {
  width: 386.666px;
  margin-bottom: 20px;
  cursor: pointer;
  margin-right: 10px;
  margin-left: 10px;
  cursor: pointer;
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
</style>
