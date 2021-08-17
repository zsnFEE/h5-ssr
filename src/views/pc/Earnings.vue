<template>
  <div class="earn">
    <header>
      <Myheader @Faterback="toback" v-show="flag">
        <div>我的收益</div>
      </Myheader>
      <div class="header_pc" v-show="!flag">
        我的收益
      </div>
    </header>
    <body>
      <div class="bg_top">
        <div class="top">
          <div class="price">{{ total_amount }}</div>
          <div>
            <!-- <div class="btn" @click="toWithdraw">提现</div> -->
            <div class="btn cursor" @click="toast = !toast">提现</div>
          </div>
        </div>
        <div class="mybounty">我的赏金（元）</div>
        <!-- 未购买课程时出现的状态开始 -->
        <!-- <div>
          <div class="remind">
            购买课程后，将课程分享给好友，每一位
            购买此课程的好友都可以为你带来赏金奖励哦！
          </div>
          <div class="look">
            <div>查看活动规则</div>
            <img src="../../assets/img/btn_arrow_white.png" />
          </div>
        </div> -->
        <!-- 未购买课程时出现的状态结束 -->
        <!--购买了课程后的状态开始-->
        <div class="detail">
          <div v-for="(item, index) in arr" :key="index">
            <div class="number">{{ item.number }}</div>
            <div class="font">{{ item.font }}</div>
          </div>
        </div>
        <!--购买了课程后的状态结束-->
      </div>
      <!--未购买列表部分开始-->
      <!-- <div class="list">
        <div class="left_img">
          <img src="" />
        </div>
        <div class="right_text">
          <div class="title">巧读经典英文3天挑战千词</div>
          <div class="teacher">主讲老师：杨亮</div>
          <div class="bonus">赏金奖励 ¥4.00</div>
        </div>
      </div> -->
      <!--未购买列表部分结束-->
      <!--购买了课程后列表状态开始-->
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        finished-text="没有更多了"
        :immediate-check="false"
        :offset="1"
      >
        <div class="lesson" v-for="(item, index) in List" :key="index">
          <div class="lesson_top">
            <div class="act">
              <img
                v-if="item.member.headimgurl"
                :src="item.member.headimgurl"
              />
              <img v-else src="../../assets/img/Group 3.png" />
              <div class="span">{{ item.member.nickname }}</div>
            </div>
            <div class="time">{{ item.date }}</div>
          </div>
          <div class="lesson_bottom">
            <div class="course">
              <div v-for="(i, index) in item.goods" :key="index">
                {{ i.name }}
              </div>
            </div>
            <div class="addmoney">
              {{ item.act == 0 ? "+" : "-" }}{{ item.amount }}
            </div>
          </div>
        </div>
      </van-list>
      <!--购买了课程后列表状态结束-->
      <!--弹出框开始-->
      <van-popup v-model="toast"
        >请到微信中「猴猴画在线少儿美术」公众号，选择 我的收益 进行提现
        <div class="button cursor" @click="toast = !toast">知道了</div>
      </van-popup>
      <!--弹出框结束-->
    </body>
  </div>
</template>
<script>
import { getIncome } from "../../api/common";
import { List, Popup } from "vant";
import Myheader from "../../components/header";
import { isMobile } from "../../common/util";

export default {
  components: {
    [List.name]: List,
    [Popup.name]: Popup,
    Myheader
  },

  data() {
    return {
      arr: [
        { number: "", font: "可提现金额" },
        { number: "", font: "今日收益" },
        { number: "", font: "今日订单" }
      ],
      total_amount: "",
      List: [],
      page: 1,
      per_page: 10,
      loading: false,
      finished: false,
      toast: false,
      flag: isMobile()
    };
  },
  created() {
    getIncome({ page: this.page, per_page: this.per_page }).then(res => {
      if (res.code == 0) {
        this.arr[0].number = res.data.card.last_amount;
        this.arr[1].number = res.data.card.today_income;
        this.arr[2].number = res.data.card.today_orders_num;
        this.total_amount = res.data.card.total_amount;
        this.List = res.data.purchase_list.items;
        if (this.List.length >= res.data.purchase_list.count) {
          this.finished = true;
        }
      } else {
        this.$toast("数据丢失");
      }
    });
  },
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.toback();
    });
  },
  methods: {
    onLoad() {
      this.page++;
      setTimeout(() => {
        getIncome({ page: this.page, per_page: this.per_page }).then(res => {
          if (res.code == 0) {
            res.data.purchase_list.items.map((item, i) => {
              this.List.push(res.data.purchase_list.items[i]);
            });

            this.loading = false;
            if (this.List.length >= res.data.purchase_list.count) {
              this.finished = true;
            }
          } else {
            this.$toast(res.msg || res.message);
          }
        });
      }, 1);
    },
    // 去提现页面
    toWithdraw() {
      if (this.arr[0].number == 0) {
        this.$toast("您现在无可提现金额");
      } else {
        this.$router.push({
          path: "/pc/Withdraw",
          query: {
            token: this.$route.query.token,
            last_amount: this.arr[0].number,
            home: this.$route.query.home
          }
        });
      }
    },
    // 返回上一页
    toback() {
      this.$router.push({
        path: "/pc/Award",
        query: {
          token: this.$route.query.token,
          home: this.$route.query.home
        }
      });
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.earn {
  width: 100%;
  min-height: 100%;
  background: #f0f4fb;
  body {
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    padding: 72px 9% 15px;
  }
}
.bg_top {
  height: 223px;
  background: url("../../assets/img/img_wallet2.png") no-repeat center
    center/cover;
  padding: 30px 120px 20px;
  box-sizing: border-box;
  margin-bottom: 15px;
  border-radius: 6px;
}
.top {
  display: flex;
  justify-content: space-between;
  .price {
    font-size: 40px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
  }
  // 提现按钮
  .btn {
    padding: 5px 26px;
    border-radius: 3px;
    border: 1.5px solid #ffffff;
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;

    margin-top: 22.5px;
  }
}
.mybounty {
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
.detail {
  display: flex;
  justify-content: space-between;
  margin-top: 51px;
  text-align: center;
  padding-left: 7px;
  padding-right: 7px;
  box-sizing: border-box;
  .number {
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
  }
  .font {
    margin-top: 5px;
    font-size: 12px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
  }
}
// 文字提醒部分开始
.remind {
  margin-top: 39px;
  padding-left: 16px;
  padding-right: 13px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;

  margin-bottom: 12px;
}
// 文字提醒部分结束
.look {
  font-size: 32px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 16px;
    height: 30px;
    margin-left: 20px;
  }
}
.list {
  background: #ffffff;
  border-radius: 6px;
  padding: 12px 10px;
  display: flex;
  margin-bottom: 15px;
  .left_img {
    width: 135px;
    height: 81px;
    background: #435897;
    border-radius: 6px;
    margin-right: 10px;
  }
  .right_text {
    .title {
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333333;
    }
    .teacher {
      margin-top: 8px;
      margin-bottom: 8px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #828a99;
    }
    .bonus {
      font-size: 12px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ff5533;
    }
  }
}
//购买了课程后的列表页面
.lesson {
  background: #ffffff;
  border-radius: 6px;
  padding: 15px 12px;
  margin-bottom: 15px;
  .lesson_top {
    display: flex;
    justify-content: space-between;
    .act {
      display: flex;
    }
    .act img {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      margin-right: 5px;
    }
    .act .span {
      font-size: 12px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #828a99;

      align-items: center;
      margin-top: 4.5px;
    }
    .time {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #828a99;
    }
  }
  .lesson_bottom {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    position: relative;
    .course {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
    }
    .addmoney {
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ff5533;
      position: absolute;
      right: 0px;
      bottom: 0px;
    }
  }
}

/deep/ .van-popup  {
  max-width: 270px;
  font-size: 16px;
  padding: 54px 20px 21px;
  border-radius: 6px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 400;
  text-align: center;
  .button  {
    height: 50px;
    border-radius: 25px;
    width: 270px;
    margin-top: 27px;
    background: #6252e2;
    color: white;
    border: 0px;
    text-align: center;
    line-height: 50px;
  }
}
</style>
