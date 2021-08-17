<template>
  <div class="temp" v-title data-title="我的收益">
    <div class="backgroundColor"></div>
    <header v-show="appFlag">
      <div class="title title_box">
        <img
          @click="toBack"
          src="../../assets/img/ic_back.png"
          class="titleArrow title_arrow"
        />
        <div class="titleText title_text">我的收益</div>
        <div class="titleDv "></div>
      </div>
    </header>
    <body>
      <div class="station" v-show="appFlag"></div>
      <div class="cardBox">
        <div class="topBox">
          <div class="moneyBox">
            <span>我的收益（元）</span>
            <div class="moneyStyle">
              <div>{{ cardInfo.total_amount }}</div>
              <button @click="toDrawing">提现</button>
            </div>
          </div>
        </div>
        <div class="bottomBox">
          <div class="purchase" v-if="qualifications">
            <div class="infoBox">
              <div class="text">可提现金额</div>
              <div class="num">{{ cardInfo.last_amount }}</div>
            </div>
            <div class="infoBox">
              <div class="text">今日收益</div>
              <div class="num">{{ cardInfo.today_income }}</div>
            </div>
            <div class="infoBox">
              <div class="text">今日订单</div>
              <div class="num">{{ cardInfo.today_orders_num }}</div>
            </div>
          </div>
          <div class="noPurchase" v-else>
            <div>
              购买课程后，将课程分享给好友，每一位购买此课程的好友都可以为你带来赏金奖励哦！
            </div>
            <button>
              查看活动规则
              <img src="../../assets/img/btn_arrow_white.png" alt="" />
            </button>
          </div>
        </div>
      </div>
      <div class="detailedBox">
        <div class="detailedTitleBox">
          <div
            @click="detailedIndex = 0"
            class="detailedTitle"
            :class="detailedIndex == 0 ? 'select' : ''"
          >
            收益明细
          </div>
          <div
            @click="detailedIndex = 1"
            class="detailedTitle"
            :class="detailedIndex == 1 ? 'select' : ''"
          >
            提现明细
          </div>
        </div>
        <div v-if="detailedIndex == 0" class="rewardList">
          <div v-if="rewardList.length <= 0" class="noData">
            <img src="../../assets/img/ic_detailed.png" alt="" />
            <div>暂无收益明细</div>
          </div>
          <van-list
            v-else
            v-model="rewardLoading"
            :finished="rewardFinished"
            @load="rewardOnLoad"
            finished-text="没有更多了"
            :immediate-check="false"
            :offset="1"
          >
            <div class="rewardBox" v-for="item in rewardList" :key="item.id">
              <div class="myInfo">
                <img
                  :src="
                    item.member.headimgurl
                      ? item.member.headimgurl
                      : require('../../assets/img/IMG_man.png')
                  "
                  alt=""
                  class="head"
                />
                <div class="name">{{ item.member.nickname }}</div>
                <div class="money">
                  <span>+</span>
                  <div>{{ item.amount }}</div>
                </div>
              </div>
              <div class="classInfo">{{ item.goods[0].name }}</div>
              <div class="rewardDate">{{ item.created_at }}</div>
            </div>
          </van-list>
        </div>
        <div v-else class="extractList">
          <div v-if="extractList.length <= 0" class="noData">
            <img src="../../assets/img/ic_detailed.png" alt="" />
            <div>暂无提现明细</div>
          </div>
          <van-list
            v-else
            v-model="extractLoading"
            :finished="extractFinished"
            @load="extractOnLoad"
            finished-text="没有更多了"
            :immediate-check="false"
            :offset="1"
          >
            <div class="extractBox" v-for="item in extractList" :key="item.id">
              <div class="extractDate">
                <div class="extractDay">{{ item.date }}</div>
                <div class="extractTime">{{ item.time }}</div>
              </div>
              <div class="extractInfo">
                <div class="route">{{ item.method }}</div>
                <div class="money">{{ item.amount }}</div>
              </div>
            </div>
          </van-list>
        </div>
      </div>

      <!-- <div class="purchaseList" v-if="qualifications">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          finished-text="没有更多了"
          :immediate-check="false"
          :offset="1"
        >
          <div
            class="purchaseBox"
            v-for="(items, index) in purchaseList"
            :key="index"
          >
            <div class="topBox">
              <div class="userInfo">
                <div class="imgBox">
                  <img
                    :src="
                      items.member.headimgurl
                        ? items.member.headimgurl
                        : require('../../assets/img/Group 3.png')
                    "
                  />
                </div>
                <span>{{ items.member.nickname }}</span>
              </div>
              <div class="dateInfo">
                {{ items.date }}
              </div>
            </div>
            <div class="bottomBox">
              <div
                class="goodTitle"
                v-for="(item, index) in items.goods"
                :key="index"
              >
                {{ item.name }}
              </div>
              <div class="amount">
                {{ items.act == 0 ? `+${items.amount}` : `-${items.amount}` }}
              </div>
            </div>
          </div>
        </van-list>
      </div>
      <div class="noPurchaseList" v-else>
        <div class="noPurchaseBox">
          <div class="imgBox"></div>
          <div class="classInfo">
            <div class="classTitle">巧读经典英文3天挑战千词</div>
            <div class="classTeacher">主讲老师：杨亮</div>
            <div class="classMoney">赏金奖励 ¥4.00</div>
          </div>
        </div>
      </div> -->
    </body>
    <van-popup v-model="show"
      >{{ `请到微信中「${cardInfo.wx_name}」公众号，选择 我的收益 进行提现` }}
      <button @click="noShowPopup">知道了</button>
    </van-popup>
  </div>
</template>

<script>
import { getIncome, incomeLog, withdrawLog } from "../../api/common";
import { List, Popup } from "vant";

export default {
  components: {
    [List.name]: List,
    [Popup.name]: Popup
  },
  data() {
    return {
      detailedIndex: 0,
      qualifications: true,
      cardInfo: {},
      purchaseList: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10,
      appFlag: this.$route.query.appFlag,
      show: false,
      extractList: [],
      extractPage: 1,
      extractPerPage: 20,
      extractLoading: false,
      extractFinished: false,
      rewardList: [],
      rewardPage: 1,
      rewardPerPage: 10,
      rewardLoading: false,
      rewardFinished: false
    };
  },
  mounted() {
    let that = this;
    dsBridge.call("hidetabbar", "", function(v) {});

    dsBridge.registerAsyn("goback", function(arg1, arg2, arg3) {
      that.toBack();
    });
    this.getApi();
  },
  methods: {
    getApi() {
      getIncome({}).then(res => {
        if (res.code == 0) {
          this.cardInfo = res.data;
        } else {
          this.$toast(res.msg || res.message);
        }
      });
      withdrawLog({
        page: this.extractPage,
        per_page: this.extractPerPage
      }).then(res => {
        if (res.code == 0) {
          this.extractList = res.data.list;
          if (this.extractList.length >= res.data.count) {
            this.extractFinished = true;
          }
        } else {
          this.$toast(res.msg || res.message);
        }
      });
      incomeLog({
        page: this.rewardPage,
        per_page: this.rewardPerPage
      }).then(res => {
        if (res.code == 0) {
          this.rewardList = res.data.list;
          if (this.rewardList.length >= res.data.count) {
            this.rewardFinished = true;
          }
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    },
    extractOnLoad() {
      this.extractPage++;
      setTimeout(() => {
        withdrawLog({
          page: this.extractPage,
          per_page: this.extractPerPage
        }).then(res => {
          if (res.code == 0) {
            for (let i = 0; i < res.data.list.length; i++) {
              this.extractList.push(res.data.list[i]);
            }
            this.extractLoading = false;
            if (this.extractList.length >= res.data.count) {
              this.extractFinished = true;
            }
          } else {
            this.$toast(res.msg || res.message);
          }
        });
      }, 1);
    },
    rewardOnLoad() {
      this.rewardPage++;
      setTimeout(() => {
        incomeLog({
          page: this.rewardPage,
          per_page: this.rewardPerPage
        }).then(res => {
          if (res.code == 0) {
            for (let i = 0; i < res.data.list.length; i++) {
              this.rewardList.push(res.data.list[i]);
            }
            this.rewardLoading = false;
            if (this.rewardList.length >= res.data.count) {
              this.rewardFinished = true;
            }
          } else {
            this.$toast(res.msg || res.message);
          }
        });
      }, 1);
    },

    toPoster() {
      this.$router.push({
        path: "/phone/invitationPhone",
        query: {}
      });
    },
    onLoad() {
      this.page++;
      setTimeout(() => {
        getIncome({}).then(res => {
          if (res.code == 0) {
            for (let i = 0; i < res.data.purchase_list.items.length; i++) {
              this.purchaseList.push(res.data.purchase_list.items[i]);
            }
            this.loading = false;
            if (this.purchaseList.length >= res.data.purchase_list.count) {
              this.finished = true;
            }
          } else {
            this.$toast(res.msg || res.message);
          }
        });
      }, 1);
    },
    toBack() {
      if (this.$route.query.appType == 0) {
        if (this.$route.query.appRoute == 0) {
          this.$router.push({
            path: "/pc/invitationHomePad",
            query: {
              appFlag: this.$route.query.appFlag,
              appType: this.$route.query.appType,
              appRoute: this.$route.query.appRoute
            }
          });
        } else {
          this.$router.push({
            path: "/pc/me",
            query: {
              appFlag: this.$route.query.appFlag,
              appType: this.$route.query.appType,
              appRoute: this.$route.query.appRoute
            }
          });
        }
      } else {
        if (this.$route.query.appRoute == 0) {
          this.$router.push({
            path: "/phone/invitationHomePhone",
            query: {
              appFlag: this.$route.query.appFlag,
              appType: this.$route.query.appType,
              appRoute: this.$route.query.appRoute
            }
          });
        } else {
          this.$router.push({
            path: "/phone/myInfoPhone",
            query: {
              appFlag: this.$route.query.appFlag,
              appType: this.$route.query.appType,
              appRoute: this.$route.query.appRoute
            }
          });
        }
      }
    },
    noShowPopup() {
      this.show = false;
    },
    toDrawing() {
      if (this.appFlag == 1) {
        this.show = true;
        // alert("请到猴猴画微信公众号进行提现");
      } else if (this.cardInfo.last_amount == 0) {
        this.$toast("您现在无可提现金额");
      } else {
        this.$router.push({
          path: "/phone/invitationDrawingPhone",
          query: {
            last_amount: this.cardInfo.last_amount,
            appFlag: this.$route.query.appFlag,
            appType: this.$route.query.appType,
            appRoute: this.$route.query.appRoute
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .van-popup {
  font-size: 16px;
  padding: 54px 20px 21px;
  border-radius: 6px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    height: 40px;
    border-radius: 5px;
    width: 270px;
    margin-top: 27px;
    background: rgba(61, 193, 125, 1);
    color: white;
    border: 0px;
  }
}
.temp {
  width: 100%;
  height: 100%;
  .noData {
    padding: 16% 0 18%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 42px;
      height: 44px;
    }
    div {
      margin-top: 10px;
      font-size: 14px;

      color: #999999;
      line-height: 20px;
    }
  }
  .title {
    .titleDv {
      width: 18px;
    }
  }
  body {
    padding: 15px;
    @media (min-width: 767px) {
      padding: 15px 10%;
    }
    .station {
      height: 42px;
      width: 10px;
    }
    .cardBox {
      border-radius: 6px;
      // height: 182.5px;
      background: rgba(61, 193, 125, 1);
      padding: 15px 15px 10px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      @media (min-width: 767px) {
        padding: 15px 25px 10px;
      }
      .topBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding-bottom: 20px;
        border-bottom: 1px solid rgba(238, 240, 245, 1);
        .moneyBox {
          width: 100%;

          div {
            margin-top: 8px;
            font-size: 30px;
            font-weight: bold;
            color: #ffffff;
            line-height: 35px;
          }
          span {
            font-size: 15px;
            font-weight: 500;
            color: #ffffff;
            line-height: 21px;
          }
          .moneyStyle {
            display: flex;
            width: 100%;
            justify-content: space-between;
            flex-direction: row;
            align-items: center;
            button {
              width: 80px;
              height: 30px;
              border-radius: 3px;
              border: 1.5px solid #ffffff;
              background-color: rgba(220, 38, 38, 0);
              font-size: 14px;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: #ffffff;
              padding: 0;
              line-height: 30px;
            }
          }
        }
      }
      .bottomBox {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 20px;
        .purchase {
          display: flex;
          justify-content: space-between;
          flex-direction: row;
          .infoBox {
            display: flex;
            align-items: center;
            flex-direction: column;
            padding: 15px 14px 0;
            .num {
              margin-top: 5px;
              font-size: 22px;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: bold;
              color: #ffffff;
              line-height: 25px;
            }
            .text {
              // margin-top: 10px;
              font-size: 15px;
              // font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 400;
              color: #ffffff;
              line-height: 21px;
            }
          }
        }
        .noPurchase {
          display: flex;
          align-items: center;
          flex-direction: column;
          text-align: center;
          button {
            width: 90px;
            height: 16.5px;
            padding: 0px;
            margin-top: 12px;
            border: 0;
            background-color: rgba(220, 38, 38, 0);
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
            line-height: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            img {
              width: 6px;
              height: 11px;
            }
          }
        }
      }
    }
    .detailedBox {
      margin-top: 10px;
      background: #ffffff;
      border-radius: 8px;
      padding-bottom: 10px;
      .detailedTitleBox {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid rgba(238, 239, 240, 1);
        .detailedTitle {
          padding: 15px 25px 10px;
          font-size: 15px;
          font-weight: 400;

          color: rgba(92, 100, 107, 1);
          line-height: 21px;
        }
        .detailedTitle.select {
          font-weight: bold;
          color: rgba(18, 19, 20, 1);
        }
      }
      .rewardList {
        display: flex;
        flex-direction: column;
        align-content: center;
        .rewardBox {
          padding: 16px 15px 10px 58px;
          display: flex;
          flex-direction: column;
          align-content: center;
          @media (min-width: 767px) {
            padding: 16px 25px 10px 68px;
          }
          .myInfo {
            position: relative;
            display: flex;
            flex-direction: row;
            align-content: center;
            justify-content: space-between;
            .head {
              position: absolute;
              border-radius: 50%;
              width: 35px;
              height: 35px;
              left: -8px;
              top: 50%;
              transform: translate(-100%, -50%);
            }
            .name {
              font-size: 15px;
              font-weight: 400;
              color: #121314;
              line-height: 21px;
            }
            .money {
              display: flex;
              flex-direction: row;
              align-content: center;
              font-size: 21px;
              // font-family: DINAlternate-Bold, DINAlternate;
              font-weight: bold;
              color: #cf3a45;
              line-height: 24px;
              div {
                margin-left: 4px;
              }
            }
          }
          .classInfo {
            margin-top: 3px;
            font-size: 13px;
            // font-weight: 400;
            color: #4b4c4d;
            line-height: 18px;
          }
          .rewardDate {
            font-size: 13px;
            // font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #969798;
            line-height: 18px;
            margin-top: 5px;
          }
        }
        .rewardBox + .rewardBox {
          border-top: 1px solid rgba(238, 239, 240, 1);
        }
      }
      .extractList {
        padding: 5px 15px 10px;

        display: flex;
        flex-direction: column;
        align-content: center;
        @media (min-width: 767px) {
          padding: 5px 25px 10px;
        }
        .extractBox {
          padding: 5px 0px;
          display: flex;
          flex-direction: row;
          align-content: center;
          .extractDate {
            display: flex;
            flex-direction: column;
            align-content: center;
            justify-content: center;
            .extractDay {
              font-size: 13px;
              // font-family: PingFangSC-Medium, PingFang SC;
              font-weight: bold;
              color: #121314;
              line-height: 19px;
            }
            .extractTime {
              margin: 1px;
              font-size: 12px;
              // font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #8b8c8d;
              line-height: 16px;
            }
          }
          .extractInfo {
            display: flex;
            flex-direction: row;
            align-content: center;
            justify-content: space-between;
            margin-left: 9px;
            padding: 12px 30px 12px 13px;
            background: #eff0f1;
            border-radius: 4px;
            flex-grow: 2;
            .route {
              font-size: 14px;
              // font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #2c2216;
              line-height: 20px;
            }
            .money {
              font-size: 14px;
              // font-family: PingFangSC-Medium, PingFang SC;
              font-weight: bold;
              color: #191102;
              line-height: 20px;
            }
          }
        }
      }
    }
    .recommendList {
      .shareCard {
        margin-top: 10px;
        background: #ffffff;
        border-radius: 13px;
        padding: 15px;
        width: 100%;
        @media (min-width: 767px) {
          padding: 15px 25px;
        }
        box-sizing: border-box;
        .shareInfo {
          display: flex;
          flex-direction: column;
          .shareName {
            font-size: 14px;
            font-weight: bold;
            color: #333333;
            line-height: 20px;
          }
          .sharePrice {
            margin-top: 8px;
            font-size: 15px;
            font-weight: bold;
            color: #828a99;
            line-height: 18px;
          }
        }
        .shareOperation {
          margin-top: 8px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          .moneyReward {
            font-size: 14px;

            font-weight: bold;
            color: #ff5533;
            line-height: 20px;
            display: flex;
            flex-direction: row;
            align-items: center;
            .price {
              margin-left: 8px;
              font-size: 20px;
              display: flex;
              flex-direction: row;
              align-items: flex-end;
              .symbol {
                font-size: 15px;
                line-height: 20px;
                margin-right: 3px;
              }
              line-height: 23px;
            }
          }
          .generate {
            border: 0px;
            padding: 5px 15px;
            border-radius: 18px;
            font-size: 14px;

            font-weight: bold;
            color: #f9fce0;
            line-height: 20px;
            background: linear-gradient(
              121deg,
              #ff5b2f 0%,
              #ff6232 15%,
              #ff6d36 28%,
              #ff793c 39%,
              #ff8641 49%,
              #ff9247 58%,
              #ff9d4b 67%,
              #ffa64f 77%,
              #ffad52 87%,
              #ffb154 100%
            );
          }
        }
      }
    }
    .purchaseList {
      .purchaseBox {
        margin-top: 15px;
        padding: 15px 12px;
        background: #ffffff;
        border-radius: 6px;

        .topBox {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          .userInfo {
            display: flex;
            flex-direction: row;
            align-items: center;
            span {
              font-size: 12px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #828a99;
              line-height: 16.5px;
              margin-left: 5px;
            }
            .imgBox {
              width: 25px;
              height: 25px;
              min-width: 25px;
              min-height: 25px;
              img {
                height: 100%;
                width: 100%;
                border-radius: 50%;
              }
            }
          }
          .dateInfo {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #828a99;
            line-height: 16.5px;
          }
        }
        .bottomBox {
          margin-top: 9px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          .goodTitle {
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
            line-height: 20px;
            margin-top: 3px;
            margin-bottom: 2px;
          }
          .amount {
            font-size: 18px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #ff5533;
            line-height: 25px;
          }
        }
      }
    }
    .noPurchaseList {
      .noPurchaseBox {
        margin-top: 15px;
        padding: 12px 10px;
        background: #ffffff;
        border-radius: 6px;
        display: flex;
        flex-direction: row;
        .imgBox {
          min-width: 135px;
          min-height: 81px;
          width: 135px;
          height: 81px;
          background: #435897;
          border-radius: 6px;
        }
        .classInfo {
          margin-left: 10px;
          .classTitle {
            font-size: 14px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #333333;
            line-height: 20px;
          }
          .classTeacher {
            margin-top: 8px;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #828a99;
            line-height: 16.5px;
          }
          .classMoney {
            margin-top: 8px;
            font-size: 12px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #ff5533;
            line-height: 16.5px;
          }
        }
      }
    }
  }
}
</style>
