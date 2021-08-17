<template>
  <div class="platform">
    <div class="header">
      <div class="title">
        <div class="dataTitle">
          <span class="date">{{
            currentDate &&
              currentDate
                .split("-")
                .join(".")
                .substring(0, 7)
          }}</span>
          <el-date-picker
            align="right"
            @focus="getFocus"
            @blur="getBlur"
            @change="dateChanged"
            value-format="yyyy-MM-dd"
            popper-class="dateTime"
            class="el-Date"
            :class="isFocus ? 'focused' : ''"
            v-model="currentDate"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </div>
        <p @click="todayChanged">
          <img src="../../assets/img/ic_switch.png" alt="" />
          <span>今天</span>
        </p>
      </div>
      <div class="box">
        <img
          src="../../assets/img/btn_previous.png"
          id="leftArrow"
          @click="getLeft"
        />
        <div class="calendar">
          <div class="dateColumn" v-for="(items, index) in date" :key="index">
            <div class="week">{{ items.text }}</div>
            <div
              class="day"
              @click="setnum(items)"
              :class="items.date == nowDate ? 'active' : ''"
            >
              {{ items.content }}
            </div>
            <div
              class="sign"
              :class="
                new Date(items.date).getTime() >= new Date(today).getTime()
                  ? 'active'
                  : ''
              "
              v-show="monthData.includes(items.date)"
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
      <div class="notLiveBroadcast" v-if="!temp.length">
        {{ `${nowDate == today ? "今日暂无课程安排" : "此日暂无课程安排"}` }}
      </div>
      <TodayCard v-else :list="temp" />
    </div>
  </div>
</template>
<script>
import { sendMessage } from "../../api/client";
import { getMyClass, getMonth } from "../../api/common";
import TodayCard from "../../components/todayCard";

export default {
  components: { TodayCard },
  data() {
    return {
      isFocus: false,
      today: "",
      currentDate: "",
      temp: [],
      xplateWidth: document.documentElement.clientWidth,
      index: 10,
      wepflag: 2,
      date: [],
      monthData: [],
      currentWeek: 0,
      nowDate: "",
      bd_access_token: ""
    };
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
    this.today = this.getFormatDate(new Date())
      .split("-")
      .map(val => {
        return val < 10 ? (val = `0${val}`) : val;
      })
      .join("-");

    dsBridge.call("hidetabbar", "", function(v) {});
    window.setInterval(() => {
      for (var i = 0; i < this.temp.length; i++) {
        let newTime = Math.round(new Date() / 1000);
        if (
          (this.temp[i].start_time > newTime &&
            this.temp[i].start_time <=
              newTime + this.temp[i].first_advance_sec &&
            this.temp[i].status == 1) ||
          (this.temp[i].end_time > newTime &&
            this.temp[i].start_time < newTime &&
            this.temp[i].status == 1) ||
          this.temp[i].status == 2
        ) {
          this.temp[i].startClass_flag = true;
        } else {
          this.temp[i].startClass_flag = false;
        }
      }
    }, 1000);
    this.getTodayDate();
    this.getDates(this.nowDate);
    this.changeDate(this.nowDate);
    window["recvMessage"] = msg => {
      this.changeDate(this.nowDate);
    };
    this.currentDate = this.today;
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

    // this.setHtmlFontSize();
    // if (window.addEventListener) {
    //   window.addEventListener(
    //     "resize",
    //     () => {
    //       this.setHtmlFontSize();
    //     },
    //     false
    //   );
    // }
  },
  methods: {
    getBlur() {
      this.isFocus = false;
    },
    getFocus() {
      this.isFocus = true;
    },
    getFormatDate(date) {
      let str = date;
      var str2 =
        str.getFullYear() + "-" + (str.getMonth() + 1) + "-" + str.getDate();
      return str2;
    },
    getTodayDate() {
      this.nowDate = this.getFormatDate(new Date())
        .split("-")
        .map(val => {
          return val < 10 ? (val = `0${val}`) : val;
        })
        .join("-");
    },
    getDates(time) {
      console.log(time);
      var new_Date = time ? new Date(time) : new Date();
      var timesStamp = new_Date.getTime();
      var currenDay = new_Date.getDay();
      var dates = [];
      for (var i = 0; i < 7; i++) {
        let arr = this.getFormatDate(
          new Date(
            timesStamp +
              24 * 60 * 60 * 1000 * (i - ((currenDay + 6) % 7)) +
              this.currentWeek * 60 * 1000 * 60 * 24 * 7
          )
        ).split("-");
        var xweek = ["一", "二", "三", "四", "五", "六", "日"];
        dates.push({
          content:
            arr.join("-") == this.getFormatDate(new Date())
              ? "今"
              : arr.map(val => {
                  return val < 10 ? (val = `0${val}`) : val;
                })[2] == "01"
              ? `${
                  arr
                    .map(val => {
                      return val < 10 ? (val = `0${val}`) : val;
                    })[1]
                    .split("")[1]
                }月`
              : arr.map(val => {
                  return val < 10 ? (val = `0${val}`) : val;
                })[2],
          text:
            xweek[
              new Date(
                timesStamp +
                  24 * 60 * 60 * 1000 * (i - ((currenDay + 6) % 7)) +
                  this.currentWeek * 60 * 1000 * 60 * 24 * 7
              ).getDay() == 0
                ? 6
                : new Date(
                    timesStamp +
                      24 * 60 * 60 * 1000 * (i - ((currenDay + 6) % 7)) +
                      this.currentWeek * 60 * 1000 * 60 * 24 * 7
                  ).getDay() - 1
            ],
          date: arr
            .map(val => {
              return val < 10 ? (val = `0${val}`) : val;
            })
            .join("-")
        });
      }
      this.date = dates;
      getMonth({
        start: this.date[0].date,
        end: this.date[6].date
      }).then(res => {
        this.monthData = res.data;
      });
    },
    todayChanged() {
      this.getTodayDate();
      this.currentWeek = 0;
      this.nowDate = this.today;
      this.currentDate = this.today;
      this.getDates(this.today);
      this.changeDate(this.today);
    },
    checkDiffWeeks(current, compared) {
      let weeks = Math.floor(
        (new Date(current).getTime() - new Date(compared).getTime()) /
          1000 /
          60 /
          60 /
          24 /
          7
      );
      return weeks;
    },
    dateChanged() {
      this.currentWeek =
        this.currentWeek +
        this.checkDiffWeeks(this.currentDate, this.date[0].date);
      this.nowDate = this.currentDate;
      this.getDates();
      this.changeDate(this.nowDate);
    },
    changeDate(date) {
      getMyClass({
        date: date
      }).then(res => {
        if (res.code == 0) {
          this.temp = res.data;
        } else {
          this.$toast(res.msg);
        }
      });
    },
    //去评价页面
    toEvaluatelist(i) {
      this.$router.push({
        path: "/pc/Evaluatelist",
        query: {
          lesson_id: this.temp[i].lesson_id,
          token: this.$route.query.token
        }
      });
    },
    start(item) {
      let model = {
        roleId: item.role_id,
        courseId: item.course_id,
        name: item.lesson_name,
        cover: item.class.logo,
        lessonId: item.id,
        clazzId: item.clazz_id,
        class_type: item.class.class_type
      };
      sendMessage(model);
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
      this.currentWeek--;
      this.getDates();
    },
    getRight() {
      this.currentWeek++;
      this.getDates();
    },
    setnum(item) {
      this.nowDate = item.date;
      this.currentDate = item.date;
      this.changeDate(item.date);
    }
    // setHtmlFontSize() {
    //   // 1920是设计稿的宽度
    //   const deviceWidth = document.documentElement.clientWidth;
    //   document.getElementsByTagName("html")[0].style.cssText =
    //     "font-size:" + deviceWidth / 8.8 + "px !important";
    // }
  }
};
</script>

<style lang="less" scoped>
// ::-webkit-scrollbar {
//   display: none;
// }
.platform {
  padding: 20px;
  background: #f3f5f9;
  height: calc(100vh - 40px);

  overflow-x: hidden;
  overflow-y: scroll;

  .header {
    background: rgba(255, 255, 255, 1);
    padding: 12px 15px 17px 15px;
    height: 130px;
    border-radius: 4px;
    .title {
      font-size: 24px;
      font-weight: 600;
      color: #292d33;
      line-height: 38px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .dataTitle {
        display: flex;
        align-items: center;
      }
      .date {
        display: inline-block;
        margin-right: 10px;
      }
      .el-Date {
        background: url("../../assets/img/ic_date.png") no-repeat center center;
        background-size: cover;
        transition: all 0.3s;
        width: 20px;
        height: 20px;
        display: flex;
        &.focused {
          transform: rotate(180deg);
        }
        ::v-deep .el-input__inner {
          height: 100%;
          padding: 0;
          color: grey;
          opacity: 0;
          cursor: pointer;
        }
        ::v-deep .el-input__icon {
          display: none;
        }
      }
      .date {
        font-size: 30px;
        // font-family: DINPro-Black, DINPro;
        // font-weight: 900;
        font-weight: bold;
        color: #292d33;
        line-height: 44px;
        font-family: OPPOSans;
      }
      p {
        background: white;
        border-radius: 8px;
        padding: 4px 5px 5px 5px;
        display: flex;
        align-items: center;
        cursor: pointer;
        border: 1px solid #333333;
        img {
          width: 20px;
          height: 20px;
          margin-right: 3px;
        }
        span {
          line-height: 1;
          font-size: 14px;
          font-weight: 500;
          color: #333333;
        }
      }
    }
    .box {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      .calendar {
        display: flex;
        // flex-direction: row ;
        justify-content: space-around;
        @media (max-width: 880px) {
          // width: 710px;
          width: calc(100% - 100px);
        }
        @media (min-width: 881px) {
          width: calc(100% - 100px);
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
            color: #8a8f99;
            margin-bottom: 7px;
          }
          .day {
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            border-radius: 14px;
            margin-top: 7px;
            text-align: center;
            cursor: pointer;
            width: 48px;
            height: 28px;
            line-height: 28px;
            border-radius: 4px;
            color: #8a8f99;
            &.active {
              color: white;
              background: linear-gradient(328deg, #39bd76 0%, #8bf1c8 100%);
            }
          }
          .sign {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: #c5c7cc;
            margin-top: 3px;
          }
          .sign.active {
            background: #67d69c;
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
        // margin-right: 40px;
        height: 28px;
        width: 28px;
        cursor: pointer;
        border-radius: 14px;
        opacity: 1;
      }
    }
  }
  .plate {
    padding: 20px 0 0 0;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
    background: rgba(242, 245, 250, 1);
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
  }
}
</style>
<style lang="less">
.popper__arrow {
  left: 150.531px !important;
}
.el-picker-panel {
  margin-left: 20px !important;
}
.dateTime {
  .el-date-picker__header-label.active,
  .el-date-picker__header-label:hover {
    color: #3dc17d;
  }
  .el-month-table td.current:not(.disabled) .cell {
    color: #3dc17d;
  }

  .el-picker-panel__icon-btn:hover {
    color: #3dc17d;
  }
  .el-date-picker__header-label {
    font-size: 16px;
    font-weight: 500;
    padding: 0 5px;
    line-height: 22px;
    text-align: center;
    cursor: pointer;
    color: #606266;
    float: left;
    margin-left: 50px;
    margin-top: 8px;
    line-height: 1;
  }
  .el-year-table td .cell:hover,
  .el-year-table td.current:not(.disabled) .cell {
    color: #3dc17d;
  }
  .el-month-table td .cell:hover {
    color: #3dc17d;
  }

  .el-date-picker__header {
    margin: 12px;
    text-align: center;
    height: 30px;
    margin-bottom: 0;
  }

  .el-date-picker__header-label + .el-date-picker__header-label {
    margin-left: 0;
  }

  .el-date-table td.current:not(.disabled) span {
    color: #fff;
    background: #3dc17d;
    opacity: 0.6;
  }

  .el-date-table td.available:hover {
    color: #3dc17d;
  }
  .el-date-table td.today span {
    color: #3dc17d;
    font-weight: 700;
  }
}
</style>
