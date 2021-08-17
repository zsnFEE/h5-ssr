<template>
  <div class="invitationHomePhone">
    <div class="backgroundColor">
      <img src="../../assets/img/bg_share.png" alt="" class="backgroundImg" />
    </div>
    <div class="header">
      <img
        @click="toBack"
        src="../../assets/img/ic_back_white.png"
        class="titleArrow title_arrow"
      />
    </div>
    <div class="recordBox" @click="toProfit">
      <div class="recordTitle">
        <div class="recordText ft16">我的收益</div>
      </div>
      <div class="detailedBox">
        <div class="detailed">
          <div class="detailedNum">{{ recordInfo.total_amount }}</div>
          <div class="detailedText">赏金(元)</div>
        </div>
        <div class="detailed">
          <div class="detailedNum">{{ recordInfo.last_amount }}</div>
          <div class="detailedText">可提现(元)</div>
        </div>
        <div class="detailed">
          <div class="detailedNum">{{ recordInfo.total_orders_num }}</div>
          <div class="detailedText">已邀请(单)</div>
        </div>
      </div>
    </div>
    <div class="shareBox">
      <div class="shareHeader">
        <img src="../../assets/img/ic_arrow_three.png" alt="" class="rotate" />
        <div class="shareTitle">好课不断，优惠多多</div>
        <img src="../../assets/img/ic_arrow_three.png" alt="" />
      </div>
      <div class="shareList">
        <van-list
          v-if="shareList.length > 0"
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          finished-text="没有更多了"
          :immediate-check="false"
          :offset="1"
        >
          <div class="shareCard" v-for="items in shareList" :key="items.id">
            <div class="shareInfo">
              <div class="shareName">{{ items.goods_name }}</div>
              <div class="sharePrice">￥{{ items.goods_price }}</div>
              <div class="sharePrice">
                {{
                  items.start_time
                    .substr(0, 10)
                    .replace("-", "/")
                    .replace("-", "/")
                }}
                至
                {{
                  items.end_time
                    .substr(0, 10)
                    .replace("-", "/")
                    .replace("-", "/")
                }}
              </div>
            </div>
            <div class="shareOperation">
              <div class="moneyReward">
                赏金奖励
                <div class="price">
                  <div class="symbol">¥</div>
                  <div>{{ items.reward.toFixed(2) }}</div>
                </div>
              </div>
              <button
                class="generate"
                @click="toPoster(items)"
                :class="
                  items.active_status == 1 || items.active_status == 3
                    ? 'grey'
                    : ''
                "
              >
                生成海报
              </button>
            </div>
          </div>
        </van-list>
        <div class="nothingShareList" v-else>
          <img src="../../assets/img/img_gift.png" alt="" />
          <div class="tips">好课筹备中请期待</div>
        </div>
      </div>
    </div>
    <van-popup v-model="show">
      <div>{{ popupInfo.title }}</div>
      {{ popupInfo.info }}
      <button @click="noShowPopup">知道了</button>
    </van-popup>
  </div>
</template>

<script>
import { shareActivityList, getIncome } from "../../api/common";
import { List, Popup } from "vant";

export default {
  components: {
    [List.name]: List,
    [Popup.name]: Popup
  },
  data() {
    return {
      show: false,
      recordInfo: {},
      popupInfo: {
        title: "",
        info: ""
      },
      shareList: [],
      page: 1,
      per_page: 10,
      count: 0,
      loading: false,
      finished: false
    };
  },
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    let that = this;
    dsBridge.registerAsyn("goback", function(arg1, arg2, arg3) {
      that.toBack();
    });
    this.getApi();
  },
  methods: {
    noShowPopup() {
      this.show = false;
    },
    onLoad() {
      this.page++;
      setTimeout(() => {
        shareActivityList({
          page: this.page,
          per_page: this.per_page
        }).then(res => {
          if (res.code == 0) {
            for (let i = 0; i < res.data.list.length; i++) {
              this.shareList.push(res.data.list[i]);
            }
            this.loading = false;
            if (this.shareList.length >= res.data.count) {
              this.finished = true;
            }
          } else {
            this.$toast(res.msg || res.message);
          }
        });
      }, 1);
    },
    getApi() {
      getIncome().then(res => {
        if (res.code == 0) {
          this.recordInfo = res.data;
        } else {
          this.$toast(res.msg || res.message);
        }
      });
      shareActivityList({ page: this.page, per_page: this.per_page }).then(
        res => {
          if (res.code == 0) {
            this.shareList = res.data.list;
            if (this.shareList.length >= res.data.count) {
              this.finished = true;
            }
          } else {
            this.$toast(res.msg || res.message);
          }
        }
      );
    },
    toBack() {
      this.$router.push({
        path: "/phone/myInfoPhone",
        query: {}
      });
    },
    toPoster(item) {
      if (item.active_status == 1) {
        this.popupInfo = {
          title: "活动未开始",
          info: "活动时间为" + item.start_time + "至" + item.end_time
        };
        this.show = true;
      } else if (item.active_status == 3) {
        this.popupInfo = {
          title: "活动已结束",
          info: "活动时间为" + item.start_time + "至" + item.end_time
        };
        this.show = true;
      } else {
        this.$router.push({
          path: "/phone/invitationPhone",
          query: {
            id: item.id,
            appFlag: this.$route.query.appFlag,
            appType: this.$route.query.appType,
            appRoute: this.$route.query.appRoute
          }
        });
      }
    },
    toProfit() {
      this.$router.push({
        path: "/phone/invitationProfitPhone",
        query: {
          appFlag: this.$route.query.appFlag,
          appType: this.$route.query.appType,
          appRoute: this.$route.query.appRoute
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .van-popup {
  font-size: 16px;
  padding: 21px 20px;
  border-radius: 6px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
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
.invitationHomePhone {
  padding: 30px 15px;
  position: relative;
  min-height: 100vh;
  .backgroundColor {
    position: absolute;
    background: #0854ce;
  }
  .backgroundImg {
    width: 100%;
    top: 0px;
    left: 0px;
    right: 0px;
    z-index: -1;
  }
  .header {
    img {
      z-index: 10;
      position: fixed;
      top: 15px;
      left: 15px;
      width: 30px;
      height: 30px;
    }
  }
  .recordBox {
    width: 100%;
    padding: 56px 15px 39px;
    margin-top: 170px;
    background: #ffffff;
    border-radius: 13px;
    box-sizing: border-box;
    position: relative;
    .recordTitle {
      position: absolute;
      left: 50%;
      top: -12px;
      width: 185px;
      height: 51px;
      background: url("../../assets/img/img_title_phone.png") no-repeat center
        center / cover;
      transform: translate(-50%, 0);
      display: flex;
      flex-direction: row;
      justify-content: center;
      .recordText {
        font-weight: bold;
        color: #ffffff;
        line-height: 23px;
        margin-top: 6px;
      }
    }
    .detailedBox {
      display: flex;
      flex-direction: row;
      .detailed {
        min-width: 33.33%;
        flex-grow: 1;
        flex-shrink: 1;
        display: flex;
        flex-direction: column;
        justify-self: center;
        .detailedNum {
          text-align: center;
          font-size: 22px;
          font-weight: bold;
          color: #ff5533;
          line-height: 29px;
        }
        .detailedText {
          margin-top: 14px;
          text-align: center;
          font-size: 12px;
          color: #333333;
          line-height: 17px;
        }
      }
      .detailed + .detailed {
        border-left: 1px solid rgba(232, 235, 243, 1);
      }
    }
  }
  .shareBox {
    margin-top: 15px;
    background: #ffffff;
    border-radius: 13px;
    .shareHeader {
      padding: 6px 0;
      border-radius: 13px 13px 0 0;
      background: RGBA(247, 189, 58, 1);
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .shareTitle {
        font-size: 16px;

        font-weight: bold;
        color: #ffffff;
        line-height: 23px;
      }
      img {
        margin: 0px 14px;
        width: 23px;
        height: 14px;
      }
      .rotate {
        transform: rotate(180deg);
      }
    }
    .shareList {
      padding: 0px 15px 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .van-list {
        width: 100%;
      }
      .shareCard {
        padding: 15px 0;
        width: 100%;
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
          .grey {
            color: #fff;
            background: linear-gradient(127deg, #c1c8d3 0%, #f3f5f9 100%);
          }
        }
      }
      .shareCard + .shareCard {
        border-top: 1px solid rgba(222, 230, 238, 1);
      }
    }
    .nothingShareList {
      padding: 60px 0px;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 45px;
        height: 37.5px;
      }
      .tips {
        margin-top: 10px;
        font-size: 14px;
        font-weight: 400;
        color: #999999;
        line-height: 20px;
      }
    }
  }
}
</style>
