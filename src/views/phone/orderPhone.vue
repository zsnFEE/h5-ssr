<template>
  <div class="temp" v-title data-title="我的订单">
    <div class="backgroundColor"></div>
    <Header v-if="appFlag" :title="'订单列表'" @toBack="toBack"> </Header>

    <body class="listBox" :class="appFlag ? '' : 'active'">
      <div class="empty ft14 " v-if="lessonList.length == 0">
        <img
          style="width:264px;height:264px;"
          src="../../assets/img/img-order.png"
        />
        <div class="imgPosition">还没有下任何订单哦</div>
      </div>
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
          :type="1"
        ></Card>
      </van-list>
      <van-dialog
        v-model="show"
        title="请确认是否收到货"
        show-cancel-button
        @confirm="receiving"
      >
      </van-dialog>
    </body>
  </div>
</template>

<script>
import Card from "../../components/cardOrder";
import { getMyOrder, confirmOrder } from "../../api/common";
import { List, Dialog } from "vant";

export default {
  components: {
    [List.name]: List,
    [Dialog.Component.name]: Dialog.Component,
    Card
  },
  data() {
    return {
      titleName: "",
      lessonList: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10,
      appFlag: this.$route.query.appFlag,
      show: false,
      orderId: ""
    };
  },
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    let that = this;
    dsBridge.registerAsyn("goback", function(arg1, arg2, arg3) {
      if (that.show) {
        that.show = false;
      } else {
        that.toBack();
      }
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
  },
  methods: {
    toConfirm(index) {
      this.orderId = index;
      this.show = true;
    },
    receiving() {
      confirmOrder({ order_id: this.orderId }).then(res => {
        if (res.code == 0) {
          this.$toast("收货成功");
          this.lessonList &&
            this.lessonList.map(item => {
              if (item.id == this.orderId) {
                item.status = 1;
                item.status_name = "已完成";
              }
            });
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    },

    onLoad() {
      this.page++;
      setTimeout(() => {
        getMyOrder({
          page: this.page,
          per_page: this.per_page
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
            this.$toast(res.msg || res.message);
          }
        });
      }, 1);
    },

    toBack() {
      this.$router.push({
        path: "/phone/myInfoPhone",
        query: { token: this.$route.query.token }
      });
    },
    toCourse(item) {
      this.$router.push({
        path: "/phone/orderDetailsPhone",
        query: {
          order_id: item.id,
          token: this.$route.query.token,
          appFlag: this.appFlag
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.van-overlay {
  background-color: rgba(0, 0, 0, 0.5);
}
/deep/ .van-dialog {
  width: 260px;
}

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
    padding: 57px 15px 15px 15px;
  }
  .listBox.active {
    min-height: calc(100% - 30px);
    // background: rgba(243, 245, 249, 1);
    padding: 15px 15px 15px 15px;
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
