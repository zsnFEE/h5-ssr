<template>
  <div class="platform">
    <div class="header">
      <div class="title">我的课程</div>
      <!-- <div>{{ aa }}</div> -->
      <div class="box">
        <img
          src="../../assets/img/btn_previous.png"
          id="leftArrow"
          @click="getLeft"
        />
        <div class="calendar">
          <div
            class="dateColumn"
            v-for="(items, index) in date"
            :key="index"
            v-show="items.id > forStart - 1 && items.id < forEnd - 1"
          >
            <div class="week">{{ items.week }}</div>
            <div :id="course(items.id)" class="day" @click="setnum(items)">
              {{ items.day }}
            </div>
            <div
              class="sign"
              :class="items.signFlag ? 'active' : ''"
              v-show="items.showFlag"
            ></div>
          </div>
        </div>
        <img
          src="../../assets/img/btn_next.png"
          id="rightArrow"
          @click="getRight"
        />
      </div>
    </div>
    <div class="plate">
      <div class="notLiveBroadcast" v-show="!classFlag">
        {{ `${today ? "今日暂无课程安排" : "此日暂无课程安排"}` }}
      </div>
      <div
        class="liveBroadcast"
        v-for="(item, index) in temp"
        :key="index"
        :class="{ noMargin: (index + 1) % wepflag == 0 }"
        v-show="classFlag"
      >
        <div class="liveTop">
          <img :src="item.class.logo" class="imageDv" />
          <div class="liveTitle">
            <div class="liveTitleName">{{ item.class.name }}</div>
            <div class="liveTitleTeacher">
              {{ `主讲老师:${item.teacher_name}` }}
            </div>
            <div class="liveTitleTeacher">{{ `班级:${item.clazz_name}` }}</div>
          </div>
        </div>
        <div class="liveBottom">
          <div class="bottomLeft">
            <img
              src="../../assets/img/ic_live.png"
              class="liveIcon"
              v-show="item.clazz_status == 3"
            />
            <span class="liveText">{{ item.lesson_name }}</span>
          </div>
          <div class="bottomRight">
            <div
              v-show="item.clazz_status == 1 && !item.startClass_flag"
              class="liveRemind"
            >
              已结束
            </div>
            <!-- v-show="item.startClass_flag" -->

            <button @click="start(item)" class="liveButton">
              开始上课<img
                src="../../assets/img/ic_get_in.png"
                class="ButtonIcon"
              />
            </button>
            <span
              class="liveRemind"
              v-show="item.clazz_status == 2 && !item.startClass_flag"
              >{{ item.start }} 开始</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sendMessage } from "../../api/client";

import { getMyClass, getMonth } from "../../api/common";

export default {
  data() {
    return {
      temp: [],
      aa: "",
      xplateWidth: document.documentElement.clientWidth,
      forStart: 10,
      forEnd: 21,
      index: 10,
      flag: 15,
      wepflag: 2,
      leftShow: true,
      rightShow: true,
      date: [],
      classFlag: "",
      monthData: [],
      today: true
    };
  },
  created() {
    // sendMessage({ signal: "start" });

    getMyClass().then(res => {
      this.aa = res;
      if (res.data.length > 0) {
        this.temp = res.data;
        for (let i = 0; i < this.temp.length; i++) {
          let newTime = Math.round(new Date() / 1000);
          if (
            (this.temp[i].start_time > newTime &&
              this.temp[i].start_time <= newTime + 900) ||
            (this.temp[i].end_time > newTime &&
              this.temp[i].start_time < newTime) ||
            this.temp[i].clazz_status == 3
          ) {
            this.$set(this.temp[i], "startClass_flag", true);
          } else {
            this.$set(this.temp[i], "startClass_flag", false);
          }
        }
        this.classFlag = true;
      } else {
        this.classFlag = false;
      }
    });
    var xdata = [];
    var xweek = ["一", "二", "三", "四", "五", "六", "日"];
    var d = new Date();
    var newweek = d.getDay() - 1;

    for (var i = -15; i < 16; i++) {
      var signFlag = "";
      var showFlag = false;
      var f = (newweek - i) % 7;
      var xday = "";
      if (f < 0) {
        f = f + 7;
      }
      if (this.getDay(-i).substring(8) === "01") {
        xday =
          this.getDay(-i)
            .substr(5, 2)
            .split("0")
            .join("") + "月";
      } else {
        xday = this.getDay(-i).substr(8, 2);
      }
      if (i == 0) {
        xday = "今";
      }
      if (i < 1) {
        signFlag = false;
      } else {
        signFlag = true;
      }
      xdata[15 - i] = {
        id: 15 - i,
        day: xday,
        week: xweek[f % 7],
        data: this.getDay(-i),
        signFlag: signFlag,
        showFlag: showFlag
      };
    }
    this.date = xdata;
  },
  watch: {
    xplateWidth(val, old) {
      if (val > 1300) {
        this.wepflag = 3;
      } else {
        this.wepflag = 2;
      }
    }
  },
  mounted() {
    window.setInterval(() => {
      for (var i = 0; i < this.temp.length; i++) {
        this.temp[i].start_time;
        let newTime = Math.round(new Date() / 1000);
        if (
          (this.temp[i].start_time > newTime &&
            this.temp[i].start_time <= newTime + 900) ||
          (this.temp[i].end_time > newTime &&
            this.temp[i].start_time < newTime) ||
          this.temp[i].clazz_status == 3
        ) {
          this.temp[i].startClass_flag = true;
        } else {
          this.temp[i].startClass_flag = false;
        }
      }
    }, 1000);
    getMonth().then(res => {
      this.monthData = res.data;
      for (let i = 0; i < this.date.length; i++) {
        for (let j = 0; j < this.monthData.length; j++) {
          if (this.date[i].data == this.monthData[j]) {
            this.date[i].showFlag = true;
          }
        }
      }
    });
    const that = this;
    window.onresize = () => {
      return (() => {
        window.xplateWidth = document.documentElement.clientWidth;
        that.xplateWidth = window.xplateWidth;
      })();
    };
    if (this.xplateWidth > 1300) {
      this.wepflag = 3;
    } else {
      this.wepflag = 2;
    }
    document.getElementById("dayId" + this.flag).style.background = "#FFD400";
    this.setHtmlFontSize();
    if (window.addEventListener) {
      window.addEventListener(
        "resize",
        () => {
          this.setHtmlFontSize();
        },
        false
      );
    }
  },
  methods: {
    start(item) {
      // console.log(item);
      let model = {
        roleId: item.role_id,
        courseId: item.course_id,
        name: item.lesson_name,
        cover: item.class.logo,
        lessonId: item.lesson_id,
        clazzId: item.clazz_id
      };
      sendMessage(model);
    },
    totranslate() {
      // sendMessage({ signal: "start" });
    },
    getDay(day) {
      var today = new Date();
      var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
      today.setTime(targetday_milliseconds);
      var tYear = today.getFullYear();
      var tMonth = today.getMonth();
      var tDate = today.getDate();
      tMonth = this.doHandleMonth(tMonth + 1);
      tDate = this.doHandleMonth(tDate);
      return tYear + "-" + tMonth + "-" + tDate;
    },
    doHandleMonth(month) {
      var m = month;
      if (month.toString().length === 1) {
        m = "0" + month;
      }
      return m;
    },
    course(index) {
      return "dayId" + index;
    },
    getLeft() {
      if (this.leftShow === true) {
        this.forStart = this.forStart - this.index;
        this.forEnd = this.forEnd - this.index;
        if (this.forStart <= 0) {
          this.forStart = 0;
          this.forEnd = this.index + 1;
          this.leftShow = false;
          document.getElementById("leftArrow").style.opacity = "0.5";
        }
        if (this.rightShow === false) {
          this.rightShow = true;
          document.getElementById("rightArrow").style.opacity = "1";
        }
      }
    },
    getRight() {
      if (this.rightShow === true) {
        this.forStart = this.forStart + this.index;
        this.forEnd = this.forEnd + this.index;
        if (this.forEnd >= this.date.length + 1) {
          this.forStart = this.date.length - this.index;
          this.forEnd = this.date.length + 1;
          this.rightShow = false;
          document.getElementById("rightArrow").style.opacity = "0.5";
        }
        if (this.leftShow === false) {
          this.leftShow = true;
          document.getElementById("leftArrow").style.opacity = "1";
        }
      }
    },
    setnum(e) {
      document.getElementById(this.course(this.flag)).style.background = "#fff";
      document.getElementById(this.course(e.id)).style.background = "#FFD400";
      this.flag = e.id;
      if (e.day == "今") {
        this.today = true;
      } else {
        this.today = false;
      }
      this.classFlag = e.showFlag;
      if (this.classFlag) {
        getMyClass({ date: e.data }).then(res => {
          this.temp = res.data;
        });
      }
    },
    setHtmlFontSize() {
      // 1920是设计稿的宽度
      const deviceWidth = document.documentElement.clientWidth;
      document.getElementsByTagName("html")[0].style.cssText =
        "font-size:" + deviceWidth / 8.8 + "px !important";
    }
  }
};
</script>

<style lang="less" scoped>
::-webkit-scrollbar {
  display: none;
}
.platform {
  // background:rgba(242,245,250,1);
  overflow: hidden;
  height: 100%;
  .header {
    background: rgba(255, 255, 255, 1);
    height: 130px;
    @media (max-width: 880px) {
      width: 880px;
    }
    @media (min-width: 881px) {
      width: 100%;
    }
    .title {
      width: 96px;
      height: 38px;
      font-size: 24px;
      font-family: OPPOSans-B, OPPOSans;
      font-weight: normal;
      color: rgba(41, 45, 51, 1);
      line-height: 38px;
      text-align: center;
      margin-top: 10px;
      margin-left: 40px;
    }
    .box {
      margin-top: 16px;
      margin-left: 40px;
      display: flex;
      justify-content: space-between;
      .calendar {
        display: flex;
        // flex-direction: row ;
        justify-content: space-around;
        @media (max-width: 880px) {
          width: 710px;
        }
        @media (min-width: 881px) {
          width: calc(100% - 170px);
        }
        .dateColumn {
          height: 100%;
          width: 71px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .week {
            width: 12px;
            height: 17px;
            font-size: 12px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(138, 143, 153, 1);
            line-height: 17px;
            text-align: center;
            line-height: 17px;
          }
          .day {
            width: 48px;
            height: 28px;
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            border-radius: 14px;
            line-height: 22px;
            margin-top: 7px;
            text-align: center;
            line-height: 28px;
            cursor: pointer;
          }
          .sign {
            width: 4px;
            height: 4px;
            border-radius: 2px;
            background: linear-gradient(
              131deg,
              rgba(255, 213, 0, 1) 0%,
              rgba(255, 191, 0, 1) 100%
            );
          }
          .sign.active {
            background: rgba(184, 192, 205, 1);
          }
        }
      }
      #leftArrow {
        margin-top: 14px;
        height: 28px;
        width: 28px;
        cursor: pointer;
        border-radius: 14px;
        opacity: 1;
      }
      #rightArrow {
        margin-top: 14px;
        margin-right: 40px;
        height: 28px;
        width: 28px;
        cursor: pointer;
        border-radius: 14px;
        opacity: 1;
      }
    }
  }
  .plate {
    padding: 30px 40px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
    background: rgba(242, 245, 250, 1);
    overflow-y: auto;
    .notLiveBroadcast {
      width: 100%;
      text-align: center;
      margin-top: 15%;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(184, 192, 205, 1);
      line-height: 20px;
    }
    .liveBroadcast {
      background: rgba(255, 255, 255, 1);
      border-radius: 4px;
      margin-bottom: 20px;
      margin-right: 20px;
      @media (max-width: 880px) {
        width: 390px;
      }
      @media (min-width: 881px) {
        width: calc(50% - 10px);
      }
      @media (min-width: 1301px) {
        width: calc(33% - 10px);
      }
      &.noMargin {
        margin-right: 0;
      }
      .liveTop {
        margin-top: 15px;
        margin-left: 15px;
        display: flex;
        flex-direction: row;
        .imageDv {
          border-radius: 4px;
          object-fit: cover;
          @media (max-width: 880px) {
            width: 120px;
            height: 68px;
          }
          @media (min-width: 881px) {
            width: 1.2rem;
            height: 0.68rem;
          }
        }
        .liveTitle {
          width: 232px;
          margin-left: 8px;
          margin-right: 15px;
          .liveTitleName {
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(0, 0, 0, 1);
            line-height: 20px;
          }
          .liveTitleTeacher {
            margin-top: 4px;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(130, 138, 153, 1);
            line-height: 17px;
          }
        }
      }
      .liveBottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        margin-top: 18px;
        margin-left: 15px;
        margin-bottom: 19px;
        height: 28px;
        line-height: 28px;
        @media (max-width: 880px) {
          width: 360px;
        }
        @media (min-width: 881px) {
          width: calc(100% - 30px);
        }
        .bottomLeft {
          display: flex;
          .liveIcon {
            height: 10px;
            width: 11px;
            margin-top: 5px;
            margin-right: 8px;
          }
          .liveText {
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(130, 138, 153, 1);
            line-height: 20px;
          }
        }
        .bottomRight {
          .liveButton {
            outline: none;
            width: 95px;
            height: 28px;
            background: linear-gradient(
              131deg,
              rgba(255, 213, 0, 1) 0%,
              rgba(255, 191, 0, 1) 100%
            );
            box-shadow: 0px -1px 0px 0px rgba(255, 255, 255, 0.15);
            border-radius: 4px;
            border: 0px;
            cursor: pointer;
          }
          .ButtonIcon {
            margin-left: 8px;
            height: 12px;
            width: 12px;
          }
          .liveRemind {
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(130, 138, 153, 1);
            line-height: 20px;
          }
        }
      }
    }
    @media (max-width: 880px) {
      width: 800px;
      height: 480px;
    }
    @media (min-width: 881px) {
      width: calc(100% - 80px);
      height: calc(100% - 200px);
    }
  }
  @media (max-width: 880px) {
    width: 880px;
    height: 100%;
  }
  @media (min-width: 881px) {
    width: 100%;
    height: 100%;
  }
}
</style>
