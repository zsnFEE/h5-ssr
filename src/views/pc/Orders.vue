<template>
  <div class="orders">
    <div class="bgpc"></div>
    <Header v-if="flag" :title="'我的订单'" @toBack="toBack"> </Header>

    <div class="header_pc" v-show="!flag">
      我的订单
    </div>
    <!-- -->
    <div
      class="orders_box"
      id="box"
      :class="
        !flag && scrollBar == true
          ? 'scrollStyle'
          : !flag && scrollBar == false
          ? 'pcBox'
          : ''
      "
    >
      <div class="empty ft14 " v-if="lessonList.length == 0">
        <img
          style="width:264px;height:264px;"
          src="../../assets/img/img-order.png"
        />
        <div class="imgPosition">还没有下任何订单哦</div>
      </div>
      <!--订单列表开始-->
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :finished-text="lessonList.length == 0 ? '' : '没有更多了'"
        :immediate-check="false"
        :offset="1"
      >
        <Card
          :list="lessonList"
          @toCourse="toCourse"
          @toConfirm="toConfirm"
          :type="2"
        ></Card>
        <!-- <div
          class="order_list cursor"
          v-for="(item, index) in lessonList"
          :key="index"
          @click="toDetail(item.id)"
        >
          <div class="order_num">
            <div class="number">
              <span class="before">订单号：</span>
              <span class="after_num">{{ item.border_id }}</span>
            </div>
            <div class="order_suc">{{ item.status_name }}</div>
          </div>

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
              <div class="second">
                {{ item.description }}
              </div>
            </div>
          </div>

          <div
            :class="
              item.status == 7 && item.sign_at > 0
                ? 'order_price'
                : 'priceactive'
            "
          >
            <div v-if="item.goods.length > 1" class="out_of">实付金额</div>
            <div>
              <span class="before_price">￥</span>
              <span>{{ item.price }}</span>
            </div>
          </div>

          <div class="btn_right " v-if="item.status == 7 && item.sign_at > 0">
            <div class="confirm cursor" @click.stop="getOrder(item.id)">
              确认收货
            </div>
          </div>
        </div> -->
      </van-list>

      <!--订单列表结束-->
    </div>
    <!-- 弹出框开始 -->
    <transition name="alert_box">
      <div class="coutoast" v-show="show">
        <div class="coutoast_box">
          <div class="alert">
            <div class="text_title">请确认是否收到货物</div>
            <!-- 确认和取消按钮开始 -->
            <div class="alert_btn">
              <div class="cancel cursor" @click="show = false">取消</div>
              <div class="affirm cursor" @click="confirm">确认</div>
            </div>
            <!-- 确认和取消按钮结束 -->
          </div>
        </div>
      </div>
      <!-- 弹出框结束 -->
    </transition>
  </div>
</template>
<script>
import { getMyOrder, confirmOrder } from "../../api/common";
import { isMobile } from "../../common/util";
import { List } from "vant";
import Card from "../../components/cardOrder";

export default {
  components: {
    [List.name]: List,
    Card
  },
  data() {
    return {
      show: false,
      lessonList: [],
      flag: isMobile(),
      page: 1,
      per_page: 10,
      loading: false,
      finished: false,
      order_id: "",
      scrollBar: false,
      screenHeight: document.body.clientHeight
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
        this.$toast(res.msg || res.message);
      }
    });
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight;
        that.screenHeight = window.screenHeight;
      })();
    };
  },
  updated() {
    this.$nextTick(() => {
      this.scrollBar =
        document.getElementById("box").offsetHeight >
        document.body.offsetHeight;
    });
  },
  methods: {
    toConfirm(index) {
      this.order_id = index;
      this.show = true;
    },
    toCourse(item) {
      this.$router.push({
        path: "/pc/New",
        query: { order_id: item.id, token: this.$route.query.token }
      });
    },
    getOrder(order_id) {
      this.order_id = order_id;
      this.show = !this.show;
    },
    confirm() {
      confirmOrder({ order_id: this.order_id }).then(res => {
        if (res.code == 0) {
          this.$toast("收货成功");
          this.lessonList &&
            this.lessonList.map(item => {
              if (item.id == this.order_id) {
                item.status = 1;
                item.status_name = "已完成";
              }
            });
        } else {
          this.$toast(res.msg || res.message);
        }
      });
      this.show = !this.show;
    },

    toBack() {
      this.$router.push({
        path: "/pc/Me",
        query: { token: this.$route.query.token }
      });
    },
    // toDetail(order) {
    //   this.$router.push({
    //     path: "/pc/New",
    //     query: { order_id: order, token: this.$route.query.token }
    //   });
    // },
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
            this.$toast(res.msg || res.message);
          }
        });
      }, 1);
    }
  },
  watch: {
    screenHeight(val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenHeight = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          location.reload();

          that.timer = false;
        }, 400);
      }
    },
    //监听弹框是否显示,如果显示给body添加溢出隐藏禁止后面列表滚动
    show() {
      if (this.show == true) {
        document
          .querySelector("body")
          .setAttribute("style", "overflow:hidden;");
      } else {
        document.querySelector("body").removeAttribute("style");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.orders {
  width: 100%;
  height: 100%;
  background: #f3f5f9;
  padding-top: 46px;
  box-sizing: border-box;
}

.orders_box {
  padding: 20px 112px;
  &.pcBox {
    padding: 21px 20px;
    padding-top: 28px;
  }
  &.scrollStyle {
    padding: 21px 20px;
    padding-top: 28px;
    padding-right: 12px;
  }
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
  padding: 11px 20px;
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
.order_list {
  background: #ffffff;
  border-radius: 8px;
  padding: 14px 30px 15px 30px;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 15px;
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
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.order_price {
  font-size: 14px;
  font-family: DINAlternate-Bold, DINAlternate;
  font-weight: bold;
  color: rgba(255, 85, 51, 1);
  position: absolute;
  bottom: 81px;
  right: 30px;
}
.priceactive {
  font-size: 14px;
  font-family: DINAlternate-Bold, DINAlternate;
  font-weight: bold;
  color: rgba(255, 85, 51, 1);
  position: absolute;
  bottom: 15px;
  right: 30px;
}
.order_price2 {
  font-size: 14px;
  font-family: DINAlternate-Bold, DINAlternate;
  font-weight: 400;
  color: rgba(41, 45, 51, 1);
  text-align: right;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid rgba(218, 227, 242, 1);
  margin-top: 20px;
}
.before_price {
  font-size: 16px;
  font-family: DINAlternate-Bold, DINAlternate;
  font-weight: bold;
  color: rgba(255, 85, 51, 1);
}
.out_of {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #8a8f99;
}
.btn_right {
  display: flex;
  justify-content: flex-end;
  border-top: 0.5px solid rgba(218, 227, 242, 1);
  margin-top: 20px;
}
.confirm {
  width: 83px;
  height: 28px;
  border-radius: 14px;
  border: 1.5px solid #ff7300;
  font-size: 13px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ff7300;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

// 订单列表结束
.coutoast {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  z-index: 9;
  font-size: 16px;
  .coutoast_box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .alert {
    width: 295px;
    height: 140px;
    background: #fff;
    border-radius: 16px;
    // position: absolute;
    top: 50%;
    left: 50%;

    animation: mymove 0.3s;

    padding: 12.5px 0px 15px;
    box-sizing: border-box;
    .text_title {
      text-align: center;
      padding: 27px 0px;
    }
    .alert_btn {
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-top: 0.5px solid #ebedf0;
      width: 100%;
      .cancel,
      .affirm {
        width: 50%;
        text-align: center;
        padding: 12.5px 0;
      }
      .cancel:active {
        background: #e6e6e6;
        border-bottom-left-radius: 16px;
      }
      .affirm:active {
        background: #e6e6e6;
        border-bottom-right-radius: 16px;
      }
      .cancel {
        border-right: 0.5px solid #ebedf0;
      }
      .affirm {
        color: #ee0a24;
      }
    }
  }
}
.alert_box-enter-active,
.alert_box-leave-active {
  transition: opacity 0.5s;
}
.alert_box-enter,
.alert_box-leave-to {
  opacity: 0;
}

@keyframes mymove {
  0% {
    transform: scale(0); /*开始为原始大小*/
  }
  100% {
    transform: scale(1);
  }
}
.empty {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #666666;
}
</style>
