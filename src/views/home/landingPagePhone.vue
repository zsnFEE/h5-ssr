<template>
  <div class="smallClassD">
    <div class="backgroundColor"></div>
    <!-- <header> -->
    <div
      class="title title_box"
      :style="{ background: 'rgba(255, 255, 255,' + backgroundColor + '' }"
    >
      <!-- <img
        @click="toBack"
        src="../../assets/img/ic_back.png"
        class="titleArrow title_arrow"
      /> -->
      <div class="titleBottom">
        <div
          class="titleText title_text"
          @click="toCommodity(0)"
          :style="
            stepsIndex == 0
              ? { color: 'rgba(255,115,0,' + backgroundColor }
              : { color: 'rgba(41,45,51,' + backgroundColor }
          "
        >
          商品
        </div>
        <div
          class="titleText title_text"
          @click="toCommodity(1)"
          :style="
            stepsIndex == 1
              ? { color: 'rgba(255,115,0,' + backgroundColor }
              : { color: 'rgba(41,45,51,' + backgroundColor }
          "
        >
          详情
        </div>
        <div
          class="titleText title_text"
          @click="toCommodity(2)"
          :style="
            stepsIndex == 2
              ? { color: 'rgba(255,115,0,' + backgroundColor }
              : { color: 'rgba(41,45,51,' + backgroundColor }
          "
        >
          目录
        </div>
      </div>
      <div class="titleDv "></div>
    </div>
    <!-- </header> -->
    <!-- <div class="landingpageBox">
      <p v-html="smallClassDetail.content">{{ smallClassDetail.content }}</p>
    </div> -->
    <body class="bodyclass">
      <div class="topBox" id="d_jump" index="0">
        <img :src="imgUrl" alt="" class="img" />
        <div class="classInfoBox">
          <div class="classInfoPrice ft16">
            ￥<span class="ft27">{{ goods.price }}</span
            ><s>￥{{ goods.old_price }}</s>
          </div>
          <div class="classInfoName ft18">
            {{ className }}
          </div>
          <div class="classInfoNum ft14">{{ buyNum }}人已报名</div>
        </div>
        <!-- <div class="titleInfoBox ft14" v-if="classType == 1">
          <div class="info">
            <div>教师</div>
            <span>{{ teacherName }}</span>
          </div>
          <div class="info">
            <div>时间</div>
            <span>{{ time + " 共" + courseCount + "课时" }}</span>
          </div>
        </div> -->
      </div>
      <div class="middleBox">
        <div class="synopsisBox" id="d_jump" index="1">
          <div class="catalogTitle ft18">课程详情</div>
          <p class="insetBox" v-html="synopsis">{{ synopsis }}</p>
        </div>
        <div class="catalogBox" id="d_jump" index="2">
          <div class="catalogTitle ft18">课程目录</div>
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
                <p class="icon" :class="open(index) ? 'active' : ''"></p>
              </div>
              <ul :class="open(index) ? 'activeUl' : ''">
                <!-- v-show="open(index)" -->
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
      <!-- <div class="moneyBox">
        <div class="moneyText ft24">￥{{ goods.price }}</div>
        <div class="moneyTips ft14"></div>
      </div> -->
      <button @click="showAction" class="buttonDv button_color ft18">
        立即报名￥{{ goods.price }}
      </button>
      <div v-if="isNotchScreen" class="screenBox"></div>
    </div>
    <van-popup v-model="popupShow">
      通过自己分享的海报购买，无法获得分享奖励
      <button @click="noShowPopup">知道了</button>
    </van-popup>
  </div>
</template>
<script>
import {
  getSmallClassDetail,
  getClassInfo,
  getClssInfomation,
  getCouponList,
  isMineShare,
  setUserCoupon
} from "../../api/common";
import { isMobile } from "../../common/util";
import { Popup } from "vant";

export default {
  components: {
    [Popup.name]: Popup
  },
  data() {
    return {
      popupShow: false,
      pcFlag: isMobile(),
      browser: {
        versions: (function() {
          var u = navigator.userAgent,
            app = navigator.appVersion;
          return {
            //移动终端浏览器版本信息
            trident: u.indexOf("Trident") > -1, //IE内核
            presto: u.indexOf("Presto") > -1, //opera内核
            webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
            gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或uc浏览器
            iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf("iPad") > -1, //是否iPad
            webApp: u.indexOf("Safari") == -1 //是否web应该程序，没有头部与底部
          };
        })(),
        language: (
          navigator.browserLanguage || navigator.language
        ).toLowerCase()
      },
      goods: [],
      index: 0,
      classlist: [],
      activeNames: [],
      imgUrl: "",
      teacherName: "",
      className: "",
      cdn: "",
      synopsis: "",
      needToBuy: false,
      order: "",
      gid: "",
      isNotchScreen: false,
      backgroundColor: 0,
      stepsIndex: 0,
      monitor: true,
      buyNum: 0,
      oldPrice: 0,
      time: "",
      courseCount: 0,
      classType: "",
      isBought: 0
    };
  },
  created() {
    if (this.$route.query.s) {
      localStorage.setItem("secretKey", this.$route.query.s);
    } else {
      localStorage.setItem("secretKey", "");
    }

    dsBridge.call("hidetabbar", "", function(v) {});
    this.gid = this.$route.query.gid
      ? this.$route.query.gid
      : localStorage.getItem("smallClass");
    localStorage.setItem("smallClass", this.gid);
    getClssInfomation({ id: this.gid }).then(res => {
      if (res.code == 0) {
        this.className = res.data.name;
        document.title = this.className;
        this.teacherName = res.data.teacher_name;
        this.imgUrl = res.data.goods.cdn + res.data.goods.logo;
        this.cdn = res.data.cdn;
        this.classlist = res.data.chapters;
        this.oldPrice = res.data.old_price;
        this.synopsis = res.data.goods.content;
        this.classType = res.data.class_type;
        this.buyNum = res.data.buy_num;
        this.goods = res.data.goods;
        this.time = res.data.time;
        this.courseCount = res.data.course_count;
        this.isBought = res.data.is_bought;
      } else {
        this.$toast(res.msg);
      }
    });
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    let that = this;
    dsBridge.registerAsyn("goback", function(arg1, arg2, arg3) {
      that.toBack();
    });
    dsBridge.call("getnotchscreen", "", function(v) {});
    dsBridge.registerAsyn("Uploadnotchscreen", function(arg1, arg2, arg3) {
      that.isNotchScreen = JSON.parse(arg1).isNotchScreen == 1 ? true : false;
    });
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    noShowPopup() {
      this.popupShow = false;
      if (this.isBought == 0) {
        if (this.pcFlag) {
          if (this.browser.versions.iPad) {
            this.$router.push({
              path: "/pc/Fillorder",
              query: {
                classType: 2
              }
            });
          } else if (this.browser.versions.mobile) {
            this.$router.push({
              path: "/phone/createOrderAddressPhone",
              query: {
                gid: this.$route.query.gid
                  ? this.$route.query.gid
                  : localStorage.smallClass,
                s: this.$route.query.s
                  ? this.$route.query.s
                  : localStorage.secretKey,
                token: this.$route.query.token,
                classType: 2
              }
            });
          } else {
            this.$router.push({
              path: "/pc/Fillorder",
              query: {
                classType: 2
              }
            });
          }
        } else {
          this.$router.push({
            path: "/pc/Fillorder",
            query: {
              classType: 2
            }
          });
        }
      } else {
        this.$toast("您已购买过该课程，不可重复购买");
      }
    },
    toCommodity(index) {
      // document.querySelector(".synopsisBox").scrollIntoView(true);
      if (this.backgroundColor) {
        this.monitor = false;
        this.stepsIndex = index;
        let jump = document.querySelectorAll("#d_jump");
        let total = jump[index].offsetTop - 42;
        let distance =
          document.documentElement.scrollTop || document.body.scrollTop;
        let step = total / 10;
        if (total > distance) {
          smoothDown();
        } else {
          let newTotal = distance - total;
          step = newTotal / 10;
          smoothUp();
        }
        let that = this;
        function smoothDown() {
          if (distance < total) {
            distance += step;
            document.body.scrollTop = distance;
            document.documentElement.scrollTop = distance;
            setTimeout(smoothDown, 10);
          } else {
            document.body.scrollTop = total;
            document.documentElement.scrollTop = total;
            setTimeout(() => {
              that.monitor = true;
            }, 1);
          }
        }
        function smoothUp() {
          if (distance > total) {
            distance -= step;
            document.body.scrollTop = distance;
            document.documentElement.scrollTop = distance;
            setTimeout(smoothUp, 10);
          } else {
            document.body.scrollTop = total;
            document.documentElement.scrollTop = total;
            setTimeout(() => {
              that.monitor = true;
            }, 1);
          }
        }
      }
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let offsetTop = document.querySelector(".bodyclass").offsetTop;
      let jump = document.querySelectorAll("#d_jump");
      let total_1 = jump[1].offsetTop - 42;
      let total_2 = jump[2].offsetTop - 42;
      if (scrollTop >= 240) {
        this.backgroundColor = 1;
      } else if (scrollTop != 0) {
        this.backgroundColor = scrollTop / (scrollTop + 15);
      } else if (scrollTop == 0) {
        this.backgroundColor = 0;
      }

      if (this.monitor) {
        if (scrollTop >= total_2) {
          this.stepsIndex = 2;
        } else if (scrollTop < total_2 && scrollTop >= total_1) {
          this.stepsIndex = 1;
        } else {
          this.stepsIndex = 0;
        }
      }
      // console.log(offsetTop);
    },
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
      if (localStorage.getItem("morePage") == -1) {
        this.$router.push({
          path: "/phone/homePagePhone",
          query: {
            token: this.$route.query.token
          }
        });
      } else {
        this.$router.push({
          path: "/phone/morePhone",
          query: {
            token: this.$route.query.token,
            titleName: localStorage.getItem("moreTitle"),
            categoryId: localStorage.getItem("morePage")
          }
        });
      }
    },

    showAction() {
      // localStorage.setItem("smallClassName", this.className);
      // localStorage.setItem("smallClassId", this.goods.id);
      // localStorage.setItem("smallClassPrice", this.goods.price);
      // localStorage.setItem("smallClassOldPrice", this.goods.old_price);
      // localStorage.setItem("imgUrl", this.imgUrl);
      // localStorage.setItem("smallClass", this.smallClassDetail.id);
      getCouponList().then(res => {});
      localStorage.setItem("Classtype", 2);
      isMineShare({
        secret_key: this.$route.query.s
          ? this.$route.query.s
          : localStorage.secretKey
      }).then(res => {
        if (res.code == 0) {
          if (res.data == 1) {
            this.popupShow = true;
          } else {
            if (this.isBought == 0) {
              if (this.pcFlag) {
                if (this.browser.versions.iPad) {
                  this.$router.push({
                    path: "/pc/Fillorder",
                    query: {
                      classType: 2
                    }
                  });
                } else if (this.browser.versions.mobile) {
                  this.$router.push({
                    path: "/phone/createOrderAddressPhone",
                    query: {
                      gid: this.$route.query.gid
                        ? this.$route.query.gid
                        : localStorage.smallClass,
                      s: this.$route.query.s
                        ? this.$route.query.s
                        : localStorage.secretKey,
                      token: this.$route.query.token,
                      classType: 2
                    }
                  });
                } else {
                  this.$router.push({
                    path: "/pc/Fillorder",
                    query: {
                      classType: 2
                    }
                  });
                }
              } else {
                this.$router.push({
                  path: "/pc/Fillorder",
                  query: {
                    classType: 2
                  }
                });
              }
            } else {
              this.$toast("您已购买过该课程，不可重复购买");
            }
          }
        } else {
          this.$toast(res.msg);
        }
      });
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
.title_box {
  justify-content: center;
}
::-webkit-details-marker {
  display: none;
}
.smallClassD {
  margin: 0 auto;
  max-width: 550px;
  min-height: 100vh;
  background: #f2f5fa;
  .backgroundColor {
    background: white;
  }
  .title {
    max-width: 518px;
    .titleBottom {
      display: flex;
      flex-direction: row;
      .titleText {
        padding: 0 10px;
        font-size: 16px;
      }
    }
    .titleDv {
      width: 18px;
    }
  }
  .van-action-sheet__description::after {
    border: none;
  }
  .bodyclass {
    background: rgba(242, 245, 250, 1);
    min-height: calc(100% - 75px);
    // padding-top: 42px;
    padding-bottom: 75px;
    .topBox {
      // padding-top: 10px;
      .img {
        width: 100%;
        height: auto;
      }
      .classInfoBox {
        background: #ffffff;
        padding: 15px;
        .classInfoPrice {
          font-family: DINAlternate-Bold, DINAlternate;
          font-weight: bold;
          color: #ff5533;
          line-height: 37px;
          s {
            margin-left: 10px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #acb3bf;
          }
        }
        .classInfoName {
          margin-top: 10px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #333333;
          line-height: 25px;
        }
        .classInfoNum {
          margin-top: 10px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #acb3bf;
          line-height: 20px;
        }
      }
      .titleInfoBox {
        margin-top: 8px;
        padding: 15px 15px 0px;
        background: #ffffff;
        .info {
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 20px;
          display: flex;
          flex-direction: row;
          div {
            font-weight: 500;
            margin-bottom: 15px;
            margin-right: 15px;
          }
          span {
            font-weight: 400;
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
        padding: 20px 7px;
        background: #ffffff;
        margin-top: 8px;
        .catalogTitle {
          margin-bottom: 15px;
          padding: 0px 8px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 600;
          color: #000000;
          line-height: 25px;
        }
        p {
          /deep/ p {
            img {
              width: 100% !important;
              height: auto;
              display: block;
            }
          }
        }
      }
      .insetBox {
        padding: 0 8px;
      }
      .catalogBox {
        padding: 30px 15px;
        .catalogTitle {
          margin-bottom: 24px;

          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #000000;
          line-height: 25px;
        }
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
              flex-direction: row;
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
                transition: all 0.5s;
              }
              .icon.active {
                transform: rotate(90deg);
              }
            }
            .summary.active {
              border-bottom: 0.5px solid #d8d8d8;
            }
            ul {
              max-height: 0;
              overflow: hidden;
              transition: all 0.5s;
              &.activeUl {
                max-height: 500px;
              }
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
  .landingpageBox {
    p {
      margin: 0px;
      /deep/ p {
        margin: 0px;
        img {
          display: block;
        }
      }
    }
    // height: calc(100vh - 103px);
    // overflow: auto;
    padding-top: 42px;
    padding-bottom: 60px;
    display: flex;
    flex-direction: column;
    .landingpageImg {
      width: 100%;
    }
  }
  .placeOrder {
    box-sizing: border-box;
    position: fixed;
    max-width: 550px;
    // top: calc(100% - 75px);
    bottom: 0;
    width: calc(100%);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px -1px 25px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 10px 15px 25px;
    border-top: 1px solid #d8d8d8;
    .screenBox {
      height: 22px;
      width: 10px;
    }
    .moneyBox {
      width: 63.34%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .moneyText {
        // font-size: 24px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        line-height: 33.5px;
        color: #ff5700;
      }
      .moneyTips {
        width: 102px;
        margin-left: 6px;
        // font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(138, 143, 153, 1);
        line-height: 20px;
      }
    }
    .buttonDv {
      height: 40px;
      width: 100%;
      border-radius: 5px;
      border: 0;
      // font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
    }
  }
  .buttonContainer {
    width: calc(100% - 30px);
    background: white;
    padding: 10px 15px;
    position: fixed;
    bottom: 0;
    div {
      width: 100%;
      height: 40px;
      background: linear-gradient(
        129deg,
        rgba(255, 115, 0, 1) 0%,
        rgba(255, 85, 0, 1) 100%
      );
      border-radius: 5px;
      text-align: center;
      line-height: 40px;
      color: white;
    }
  }
  .van-action-sheet__description {
    padding: 0 22.5px;
    text-align: center;
    // font-size: 14px;
    font-size: 3.7333vw;
    margin-bottom: 24.5px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(138, 143, 153, 1);
  }
  .popupBox {
    padding: 40.5px 22.5px 25.5px 22.5px;
    width: calc(100% - 45px);
    .popupTitle {
      font-size: 21px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(42, 46, 51, 1);
      line-height: 29.5px;
      text-align: center;
      margin-bottom: 6px;
      display: flex;
      justify-content: space-between;
      img {
        height: 18px;
        width: 18px;
      }
      .popupTitleDv {
        width: 18px;
      }
    }
    .popupTips {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(138, 143, 153, 1);
      line-height: 20px;
      margin-bottom: 24.5px;
      text-align: center;
    }
    .contentBox {
      margin-bottom: 12px;
      width: 100%;
      .iconS1 {
        position: absolute;
        width: 87.5px;
        height: 80px;
        border-radius: 6px 0px 50px 6px;
        background: rgba(255, 115, 0, 1);
        font-size: 35px;
        // font-family: PingFangSC-Semibold, PingFang SC;
        color: rgba(255, 255, 255, 1);
        line-height: 80px;
        text-align: center;
        z-index: 1;
      }
      .iconS2 {
        position: absolute;
        width: 87.5px;
        height: 80px;
        border-radius: 6px 0px 50px 6px;
        background: rgba(101, 81, 234, 1);
        font-size: 35px;
        // font-family: PingFangSC-Semibold, PingFang SC;
        color: rgba(255, 255, 255, 1);
        line-height: 80px;
        text-align: center;
        // z-index: 1;
      }
      .iconS3 {
        position: absolute;
        width: 87.5px;
        height: 80px;
        border-radius: 6px 0px 50px 6px;
        background: rgba(255, 90, 0, 1);
        font-size: 35px;
        // font-family: PingFangSC-Semibold, PingFang SC;
        color: rgba(255, 255, 255, 1);
        line-height: 80px;
        text-align: center;
        // z-index: 1;
      }
      .broder {
        // width: calc(100% - 3px);
        height: 47px;
        border-radius: 6px;
        border: 1.5px solid rgba(242, 245, 250, 1);
        display: flex;
        flex-direction: column;
        padding: 15px 0px 15px 104.5px;
      }
      .broder.S1 {
        // width: calc(100% - 3px);
        height: 47px;
        border-radius: 6px;
        border: 1.5px solid rgba(255, 115, 0, 1);
        display: flex;
        flex-direction: column;
        padding: 15px 0px 15px 104.5px;
      }
      .broder.S2 {
        // width: calc(100% - 3px);
        height: 47px;
        border-radius: 6px;
        border: 1.5px solid rgba(101, 81, 234, 1);
        display: flex;
        flex-direction: column;
        padding: 15px 0px 15px 104.5px;
      }
      .broder.S3 {
        // width: calc(100% - 3px);
        height: 47px;
        border-radius: 6px;
        border: 1.5px solid rgba(255, 90, 0, 1);
        display: flex;
        flex-direction: column;
        padding: 15px 0px 15px 104.5px;
      }
      .itemTitle {
        font-size: 23px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(87, 92, 102, 1);
        line-height: 32.5px;
      }
      .itemTips {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(138, 143, 153, 1);
        line-height: 20px;
      }
    }
    .levelListBox {
      padding-top: 15px;
      .levelBox {
        margin-top: 9px;
        padding: 17.5px 15px;
        width: calc(100% -36px);
        border-radius: 6px;
        border: 1.5px solid rgba(242, 245, 250, 1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        .levelInfo {
          display: flex;
          align-items: center;
          .levelText {
            font-size: 18px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(87, 92, 102, 1);
            line-height: 25px;
            margin-right: 12px;
          }
          .levelText.active {
            color: rgba(255, 255, 255, 1);
          }
          .levelRemarks {
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(138, 143, 153, 1);
            line-height: 20px;
          }
          .levelRemarks.active {
            color: rgba(255, 255, 255, 1);
          }
        }
        .levelIcon {
          width: 24px;
          height: 24px;
          background: url("../../assets/img/ic_nor.png") no-repeat center center /
            cover;
        }
        .levelIcon.active {
          background: url("../../assets/img/ic_selected_white.png") no-repeat
            center center / cover;
        }
      }
      .levelBox.active {
        background: rgba(255, 115, 0, 1);
        border: 1.5px solid rgba(255, 115, 0, 1);
      }
    }
    .buttonBox {
      position: relative;
      width: 100%;
      margin-top: 39px;
      display: flex;
      justify-content: center;
      .mask {
        position: fixed;
        bottom: 0;
        height: 77px;
        width: 100%;
        background: white;
        z-index: 2;
        opacity: 0;
      }
      button {
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 50px;
        width: 320px;
        height: 50px;
        background: rgba(255, 115, 0, 1);
        border-radius: 25px;
        border: 0px;
        z-index: 1;
      }
      button.active {
        background: #d7deeb;
      }
      .video {
        position: absolute;
        top: 12.5px;
        width: 294px;
        height: 46px;
        background: linear-gradient(
          129deg,
          rgba(255, 115, 0, 1) 0%,
          rgba(255, 85, 0, 1) 100%
        );
        border-radius: 6px;
        opacity: 0.41;
        filter: blur(10px);
      }
      .video.active {
        background: #d7deeb;
      }
    }
  }
  .van-popup--bottom {
    bottom: var(--window-bottom, 0);
  }

  // .content {
  //   padding: 0 22.5px;
  //   margin-bottom: 10px;
  //   img {
  //     // height: 80px;
  //     width: 100%;
  //   }
  // }
}
</style>
