<template>
  <div class="standardMyInfoPhone">
    <div class="header">
      <img @click="toBack" src="../assets/img/ic_back.png" />
    </div>
    <div class="body">
      <div>
        <div class="infoBox" @click="toSet">
          <div class="infoLeft">
            <img :src="myInfo.headimgurl" alt="" class="head" />
            <div class="info">
              <div class="infoName">
                <div>
                  {{ myInfo.nickname }}
                </div>
                <img src="../assets/img/btn_arrow_right.png" />
              </div>
              <div class="infoIntegral">
                {{ myInfo.integral }}
                <span>积分</span>
              </div>
            </div>
          </div>
          <div class="infoRight">
            <!-- <img src="../assets/img/btn_arrow_right.png" /> -->
          </div>
        </div>
        <div class="functionBox">
          <button @click="toMyOrder">
            <div class="functionLeft">
              <img src="../assets/img/ic_order_green.png" />
              <span>我的订单</span>
            </div>
            <div class="functionRight">
              <div class="number"></div>
              <img src="../assets/img/btn_arrow_right.png" />
            </div>
          </button>
          <button @click="toMyCoupon">
            <div class="functionLeft">
              <img src="../assets/img/ic_coupon_green.png" />
              <span>优惠券</span>
            </div>
            <div class="functionRight">
              <img src="../assets/img/btn_arrow_right.png" />
            </div>
          </button>
          <button
            @click="commenton"
            v-show="isDevice == 'ipad' || isDevice == 'iphone'"
          >
            <div class="functionLeft">
              <img src="../assets/img/ic_score_green.png" />
              <span>为我们评分</span>
            </div>
            <div class="functionRight">
              <img src="../assets/img/btn_arrow_right.png" />
            </div>
          </button>
          <button @click="toAboutApp">
            <div class="functionLeft">
              <img src="../assets/img/ic_about_green.png" />
              <span>关于Dipper</span>
            </div>
            <div class="functionRight">
              <img src="../assets/img/btn_arrow_right.png" />
            </div>
          </button>
          <button @click="clearCache">
            <div class="functionLeft">
              <img src="../assets/img/ic_clear_green.png" />
              <span>清理缓存</span>
            </div>
            <div class="functionRight">
              <img src="../assets/img/btn_arrow_right.png" />
            </div>
          </button>
        </div>
      </div>
      <div class="signOut" @click="quit">
        <span>退出登录</span>
      </div>
    </div>
  </div>
</template>

<script>
import { isDevice } from "../common/util";

export default {
  name: "standardMyInfoPhone",
  props: ["myInfo"],
  data() {
    return {
      isDevice: isDevice()
    };
  },
  mounted() {},
  methods: {
    toBack() {
      this.$emit("toBack");
    },
    toMyOrder() {
      this.$emit("toMyOrder");
    },
    toMyCoupon() {
      this.$emit("toMyCoupon");
    },
    toAboutApp() {
      this.$emit("toAboutApp");
    },
    toSet() {
      this.$emit("toSet");
    },
    commenton() {
      dsBridge.call("commenton", "", function(v) {});
    },
    clearCache() {
      dsBridge.call("clearcache", "", function(v) {});
    },
    quit() {
      dsBridge.call("logout", "", function(v) {});
    }
  }
};
</script>

<style lang="less" scoped>
.standardMyInfoPhone {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  .header {
    padding: 12px 15px;
    img {
      height: 20px;
      width: 20px;
    }
  }
  .body {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 20px 20px 20px;
    .infoBox {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      margin-right: 5px;
      .infoLeft {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 90%;
        flex-grow: 1;

        img {
          height: 50px;
          width: 50px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 15px;
        }
        .info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 40%;
          flex-grow: 1;
          .infoName {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            font-size: 18px;
            font-weight: bold;
            color: #292d33;
            line-height: 25px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            div {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            img {
              margin-right: 0px;
              border-radius: 0%;
              width: 7px;
              height: 14px;
            }
          }
          .infoIntegral {
            margin-top: 2px;
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: 16px;
            font-weight: bold;
            // color: #707682;
            color: rgba(7, 48, 27, 0.5);
            line-height: 18px;
            span {
              font-size: 12px;
              font-weight: 500;
              // color: #707682;
              color: rgba(7, 48, 27, 0.5);
              line-height: 16px;
              margin-left: 4px;
            }
          }
        }
      }
      .infoRight {
        img {
          width: 7px;
          height: 12px;
        }
      }
    }
    .functionBox {
      margin-right: 5px;
      button {
        width: 100%;
        padding: 15px 0px;
        background: unset;
        border: 0px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .functionLeft {
          display: flex;
          flex-direction: row;
          align-items: center;
          img {
            width: 24px;
            height: 24px;
          }
          span {
            margin-left: 8px;
            // margin-top: 2px;
            font-size: 14px;
            font-weight: bold;
            color: #292d33;
            line-height: 14px;
          }
        }
        .functionRight {
          display: flex;
          flex-direction: row;
          align-items: center;
          .number {
            font-size: 14px;
            font-weight: 400;
            color: #292d33;
            line-height: 17px;
          }
          img {
            margin-left: 8px;
            // margin-right: 8px;
            width: 7px;
            height: 14px;
          }
        }
      }
    }
    .signOut {
      margin: 0 auto;
      margin-bottom: 150px;
      box-sizing: border-box;
      width: 225px;
      height: 45px;
      border-radius: 5px;
      border: 1px solid #6a8376;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        font-size: 15px;
        font-weight: bold;
        color: #6a8376;
        line-height: 21px;
      }
    }
  }
}
</style>
