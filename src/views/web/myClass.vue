<template>
  <div class="orders">
    <div class="bgpc"></div>

    <div class="orders_box">
      <!--订单列表开始-->
      <div class="myclass">我的课程</div>
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        finished-text="没有更多了"
        :offset="1"
      >
        <div class="listStyle">
          <div
            class="order_list cursor"
            v-for="(item, index) in lessonList"
            :key="index"
          >
            <!--图片开始-->
            <div
              class="orders_info"
              v-for="(item, index) in item.goods"
              :key="index"
            >
              <div class="info_img">
                <img :src="item.cdn + item.logo" />
              </div>
              <div class="info_font">
                <div class="first">{{ item.name }}</div>
                <div class="second">美术体验课 2 节 + 配套礼包 1 盒</div>
              </div>
            </div>
            <!--图片结束-->
            <!-- 价格部分开始 -->

            <!-- 价格部分结束 -->
          </div>
        </div>
      </van-list>

      <!--订单列表结束-->
    </div>
  </div>
</template>
<script>
import { getMyOrder } from "../../api/common";
import { isMobile } from "../../common/util";
import { List } from "vant";
export default {
  components: {
    [List.name]: List
  },
  data() {
    return {
      lessonList: [],
      flag: isMobile(),
      page: 1,
      per_page: 20,
      loading: false,
      finished: false
    };
  },
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.toback();
    });
    getMyOrder({ page: this.page, per_page: this.per_page }).then(res => {
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
    // toBack() {
    //   this.$router.push({
    //     path: "/pc/Me",
    //     query: { token: this.$route.query.token }
    //   });
    // },
    toDetail(order) {
      const { href } = this.$router.resolve({
        path: "/web/About",
        query: { id: classid, token: this.$route.query.token }
      });
      window.open(href, "_blank");
    },
    onLoad() {
      this.page++;
      setTimeout(() => {
        getMyOrder({ page: this.page, per_page: this.per_page }).then(res => {
          if (res.code == 0) {
            res.data.list.map((item, i) => {
              this.lessonList.push(res.data.list[i]);
            });

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
  padding: 10px calc(calc(100vw - 1220px) / 2);
  width: 1220px;
  height: 100%;

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
// 订单列表开始
.listStyle {
  display: flex;
  flex-wrap: wrap;
}
.order_list {
  background: #ffffff;
  border-radius: 8px;
  padding: 14px 30px 15px 30px;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 15px;
  width: 386.666666666666px;
  margin: 10px;
}

.order_num {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #292d33;
  display: flex;
  justify-content: space-between;
}
.after_num {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #828a99;
}
.order_suc {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #292d33;
}
.orders_info {
  display: flex;
  margin-top: 15px;
}
.info_img {
  width: 75px;
  height: 100px;
  min-width: 75px;
}
.info_img img {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  object-fit: cover;
}
.info_font {
  margin-left: 12px;
}
.info_font .first {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(41, 45, 51, 1);
}
.second {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(130, 138, 153, 1);
  margin-top: 4px;
  margin-bottom: 27px;
}
.order_price {
  font-size: 24px;
  font-family: DINAlternate-Bold, DINAlternate;
  font-weight: bold;
  color: rgba(255, 85, 51, 1);
  position: absolute;
  bottom: 15px;
  right: 30px;
}
.order_price2 {
  font-size: 24px;
  font-family: DINAlternate-Bold, DINAlternate;
  font-weight: bold;
  color: rgba(255, 85, 51, 1);
  text-align: right;
}
.before_price {
  font-size: 16px;
  font-family: DINAlternate-Bold, DINAlternate;
  font-weight: bold;
  color: rgba(255, 85, 51, 1);
}
// 订单列表结束
.myclass {
  font-size: 26px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #000000;
  margin-left: 10px;
  margin-bottom: 6px;
}
</style>
