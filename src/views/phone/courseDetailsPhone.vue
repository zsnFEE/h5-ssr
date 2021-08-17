<template>
  <div class="temp">
    <header class="titleBox">
      <img
        src="../../assets/img/ic_back.png"
        class="titleBox"
        @click="toBack"
      />
      <div class="titleText">{{ title }}</div>
    </header>
    <body class="bodyclass">
      <div class="topBox">
        <div
          class="img"
          :style="{
            background:
              'url(' + imgUrl + ')' + 'no-repeat center center / cover'
          }"
        ></div>
        <div class="infoBox">
          <div class="title">{{ className }}</div>
          <div class="info">
            <span>主讲老师：{{ teacherName }}</span>
            <span style="margin: 0px">课时数量：{{ classTime }}</span>
          </div>
        </div>
        <div class="choiceBox">
          <div class="oneChoiceBox" @click="selectEvent(0)">
            <span class="choice" :class="index == 0 ? 'active' : ''">详情</span>
            <div class="sign" v-show="index == 0"></div>
          </div>
          <div class="oneChoiceBox" @click="selectEvent(1)">
            <span class="choice" :class="index == 1 ? 'active' : ''">目录</span>
            <div class="sign" v-show="index == 1"></div>
          </div>
        </div>
      </div>
      <div class="middleBox">
        <div class="synopsisBox" v-show="index == 0">
          <p v-html="synopsis">{{ synopsis }}</p>
        </div>
        <div class="catalogBox" v-show="index == 1">
          <div class="section">
            <div
              class="details"
              v-for="(item, index) in classlist"
              :key="index"
              :class="index == 0 ? 'active' : ''"
            >
              <div
                class="summary"
                :class="open(index) ? 'active' : ''"
                @click="addOpen(index)"
              >
                <span>{{ item.name }}</span>
                <div class="icon" :class="open(index) ? 'active' : ''"></div>
              </div>
              <ul v-show="open(index)">
                <li
                  v-for="(items, indexs) in item.courses"
                  :key="indexs"
                  :class="indexs == 0 ? 'active' : ''"
                >
                  <div
                    class="classIng"
                    :style="{
                      background:
                        'url(' +
                        cdn +
                        items.logo +
                        ')' +
                        'no-repeat center center / cover'
                    }"
                  ></div>
                  <div class="classInfo">
                    <span>{{ items.name }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </body>
    <div class="placeOrder">
      <div class="moneyBox">
        <div class="moneyText">￥{{ price }}</div>
        <div class="moneyTips">优惠已减0.00</div>
      </div>
      <button @click="toBuy" class="buttonDv">立即购买</button>
    </div>
  </div>
</template>

<script>
import { getClassInfo } from "../../api/common";

export default {
  data() {
    return {
      index: 0,
      classlist: [],
      activeNames: [],
      title: "",
      imgUrl: "",
      teacherName: "",
      classTime: "5",
      className: "",
      price: "",
      cdn: "",
      synopsis: "",
      needToBuy: false,
      order: "",
      class_id: 17
    };
  },
  mounted() {
    //this.class_id = this.$route.query.class_id
    localStorage.setItem("class_id", this.class_id);
    let model = {
      code: localStorage.code,
      data: {
        type: "hidetabbar",
        videoUrl: ""
      }
    };
    dsBridge.call("FindSyn", JSON.stringify(model));
    getClassInfo({ class_id: this.class_id }).then(res => {
      if (res.code == 0) {
        this.title = res.data.org.name;
        this.className = res.data.class.name;
        this.teacherName = res.data.class.teacher_name;
        this.imgUrl = res.data.class.cdn + res.data.class.logo;
        this.cdn = res.data.class.cdn;
        this.classlist = res.data.chapter_map;
        this.price = res.data.class.price;
        this.synopsis = res.data.class.content;
        if (res.data.need_to_buy == 1) {
          this.needToBuy = true;
        } else {
          this.needToBuy = false;
          this.order = res.data.order_id;
        }
      } else {
        this.$toast(res.msg || res.message);
      }
    });
  },
  methods: {
    open(index) {
      let f = false;
      for (let i = 0; i < this.activeNames.length; i++) {
        if (this.activeNames[i] == index) {
          f = true;
        }
      }
      return f;
    },
    addOpen(index) {
      let f = false;
      for (let i = 0; i < this.activeNames.length; i++) {
        if (this.activeNames[i] == index) {
          this.activeNames.splice(i, 1);
          f = true;
        }
      }
      if (f == false) {
        this.activeNames.push(index);
      }
    },
    selectEvent(e) {
      this.index = e;
    },
    toBack() {
      this.$router.push({
        path: "/phone/findPhone",
        query: { token: this.$route.query.token }
      });
    },
    toBuy() {
      if (this.needToBuy) {
        this.$router.push({
          path: "/phone/createOrderPhone",
          query: {
            class_id: this.class_id,
            token: this.$route.query.token
          }
        });
      } else {
        this.$router.push({
          path: "/phone/wechatAddPhone",
          query: {
            order_id: this.order,
            token: this.$route.query.token
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
::-webkit-details-marker {
  display: none;
}
.temp {
  width: 100%;
  height: 100%;
  .titleBox {
    position: fixed;
    top: 0;
    height: 42px;
    width: 100%;
    justify-content: space-between;
    background: rgba(255, 255, 255, 1);
    z-index: 1;
    .titleBox {
      height: 18px;
      width: 18px;
      margin-top: 10.5px;
      margin-left: 16px;
    }
    .titleText {
      position: fixed;
      left: 50%;
      transform: translate(-50%, 0%);
      margin-top: 4px;
      font-size: 21px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(42, 46, 51, 1);
      line-height: 29.5px;
    }
  }
  .bodyclass {
    background: rgba(242, 245, 250, 1);
    min-height: calc(100% - 117px);
    padding-top: 42px;
    padding-bottom: 75px;
    .topBox {
      padding-top: 10px;
      background: rgba(255, 255, 255, 1);
      .img {
        width: 100%;
        height: 211px;
      }
      .infoBox {
        padding: 7.5px 15px;
        border-bottom: 0.5px solid #d8d8d8;
        .title {
          font-size: 18px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 25px;
          margin-bottom: 6px;
        }
        .info {
          span {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(130, 138, 153, 1);
            line-height: 20px;
            margin-right: 30px;
          }
        }
      }
      .choiceBox {
        display: flex;
        justify-content: space-around;
        padding-top: 10.5px;
        padding-bottom: 4.5px;
        .oneChoiceBox {
          width: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .choice {
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 22.5px;
          }
          .choice.active {
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
          }
          .sign {
            margin-top: 3px;
            width: 20px;
            height: 3px;
            background: rgba(255, 128, 0, 1);
          }
        }
      }
    }
    .middleBox {
      .synopsisBox {
        max-width: calc(100% - 14px);
        padding: 0px 7px;
        p {
          /deep/ img {
            width: 100% !important;
            height: auto;
          }
        }
      }
      .catalogBox {
        padding: 15px;
        .section {
          .details {
            background: rgba(255, 255, 255, 1);
            border-radius: 6px;
            margin-top: 12px;
            .summary {
              outline: none;
              padding: 15px 12px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              span {
                font-size: 14px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: rgba(0, 0, 0, 1);
                line-height: 20px;
              }
              .icon {
                width: 5px;
                height: 10px;
                background: url(../../assets/img/btn_arrow_right.png) no-repeat
                  center center / cover;
              }
              .icon.active {
                width: 10px;
                height: 5px;
                background: url(../../assets/img/btn_arrow_up.png) no-repeat
                  center center / cover;
              }
            }
            .summary.active {
              border-bottom: 0.5px solid #d8d8d8;
            }
            li {
              margin: 0 12px;
              padding: 18px 0px 15px 0px;
              border-top: 0.5px solid #d8d8d8;
              display: flex;
              flex-direction: row;
              .classIng {
                width: 120px;
                height: 67.5px;
                background: cornflowerblue;
                border-radius: 6px;
                margin-right: 15px;
              }
              .classInfo {
                span {
                  font-size: 14px;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: 500;
                  color: rgba(51, 51, 51, 1);
                  line-height: 20px;
                }
              }
            }
            li.active {
              border: 0px;
            }
          }
          .details.active {
            margin-top: 0px;
          }
        }
      }
    }
  }
  .placeOrder {
    position: fixed;
    bottom: 0;
    height: 75px;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px -1px 25px 0px rgba(0, 0, 0, 0.1);
    border-radius: 12px 12px 0px 0px;
    display: flex;
    justify-content: space-between;
    .moneyBox {
      width: 63.34%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .moneyText {
        font-size: 24px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 87, 0, 1);
        line-height: 33.5px;
      }
      .moneyTips {
        margin-left: 6px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(138, 143, 153, 1);
        line-height: 20px;
      }
    }
    .buttonDv {
      height: 100%;
      width: 34.66%;
      background: linear-gradient(
        129deg,
        rgba(255, 115, 0, 1) 0%,
        rgba(255, 85, 0, 1) 100%
      );
      border-radius: 0px 12px 0px 0px;
      border: 0;
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
