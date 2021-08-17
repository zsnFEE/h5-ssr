<template>
  <div class="dateBar">
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
            :class="isShow ? 'focused' : ''"
            v-model="currentDate"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </div>
        <p @click="todayChanged" class="cursor">
          <img src="../../assets/img/ic_switch.png" alt="" />
          <span>今天</span>
        </p>
      </div>
      <div class="box">
        <img
          src="../../assets/img/btn_previous.png"
          id="leftArrow"
          class="cursor"
          @click="getLeft"
        />
        <div class="calendar" id="person">
          <div
            class="dateColumn cursor"
            @click="setnum(items)"
            v-for="(items, index) in date"
            :key="index"
            :class="items.date == nowDate ? 'active' : ''"
          >
            <div class="week" :class="items.date == nowDate ? 'active' : ''">
              {{ items.text }}
            </div>
            <div class="day" :class="items.date == nowDate ? 'active' : ''">
              {{ items.content }}
            </div>
            <div
              class="sign"
              :class="
                nowDate == items.date
                  ? 'selactive'
                  : new Date(items.date).getTime() > new Date(today).getTime()
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
      <div class="plate" v-if="courselist.length == 0">
        <div class="notLiveBroadcast">
          <img
            style="width:150px;height:150px;"
            src="../../assets/img/img-curriculum@2x.png"
          />
          <div class="imghint">
            {{
              getmondate == formatDate(new Date(), "yyyy-MM").substr(0, 10) &&
              nowDate == today
                ? "今日暂无课程安排"
                : getmondate ==
                    formatDate(new Date(), "yyyy-MM").substr(0, 10) &&
                  nowDate > today
                ? "当日暂无课程安排"
                : "当日无课程安排"
            }}
          </div>
        </div>
      </div>
      <div class="courselist" v-for="(item, index) in courselist" :key="index">
        <div class="left_line">
          <div
            class="round"
            :class="
              item.is_in_schedule == 1
                ? 'roundstay'
                : item.schedule_status == 3
                ? 'roundend'
                : ''
            "
          ></div>
          <div class="line" v-if="courselist.length > 1"></div>
        </div>
        <div
          class="rightcard"
          :class="index == courselist.length - 1 ? 'nobottom' : ''"
        >
          <div class="hint">
            <div>
              <span class="time"
                >{{ item.start_date }}-{{ item.end_date }}</span
              >
              <span
                class="hintfont"
                :class="
                  item.is_in_schedule == 1
                    ? 'stay'
                    : item.schedule_status == 3
                    ? 'end'
                    : ''
                "
              >
                {{ item.schedule_status_text }}</span
              >
            </div>
            <div>
              <span class="leave_text" v-if="item.leave_text">
                {{ item.leave_text }}
              </span>
            </div>
          </div>
          <div class="caedbottom">
            <div class="lessonname">
              {{ item.lesson_info.name }}
            </div>
            <div class="coursename">课程：{{ item.class_info.name }}</div>
            <div class="teacher">
              <span class="teachername"
                >教师：{{ item.teacher_info.realname }}</span
              >
            </div>
            <div class="footer">
              <div class="attend">
                {{ item.is_in_schedule != 1 ? item.and_date : "" }}
              </div>
              <div class="btn" v-if="item.schedule_status != 3">
                <div
                  class="divButton"
                  v-if="item.is_in_schedule == 1 && !item.leave_text"
                  @click="start(item)"
                >
                  开始上课
                </div>
              </div>
              <div class="btn" v-if="item.schedule_status == 3">
                <div
                  class="afterButton"
                  v-if="item.schedule_status == 3"
                  @click="toEvaluate(item, index)"
                >
                  查看报告
                </div>
                <div
                  class="afterButton"
                  v-if="item.schedule_status == 3"
                  @click="playback(item)"
                >
                  课程回顾
                </div>
                <div
                  class="afterButton markparent"
                  v-if="item.schedule_status == 3 && item.is_end_topic == 1"
                  @click="tohomework(item)"
                >
                  课后练习
                  <img
                    class="mark"
                    v-if="item.is_end_topic_stats == 1"
                    src="../../assets/img/img-wancheng.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getScheduleCalendar,
  studentPlanSchedule,
  getMyLiveClassStatus,
  getMyClass,
  getMonth,
  getStudentMonthSchedule,
  getMyTopicReport
} from "../../api/common";
import ClassButton from "../../components/classButton";
import { isMobile } from "../../common/util";
import { sendMessage } from "../../api/client";
export default {
  props: ["scheduleDate"],
  computed: {},
  components: {
    ClassButton
  },
  data() {
    return {
      nowDate: "",
      monthData: [],
      currentWeek: 0,
      xplateWidth: 0,
      index: 10,
      isShow: false,
      info: {
        isCanClick: true
      },
      flag: isMobile(),
      currentDate: "",
      date: [],
      currentWeek: 0,

      popup: false, //日期弹出框，
      mondate: this.formatDate(new Date(), "yyyy年MM月").substr(0, 10), //显示的日期格式
      getmondate: this.formatDate(new Date(), "yyyy-MM").substr(0, 10), //传过去的的日期格式
      selectMonth: "",
      today: "",
      selectDay: "",
      divWidth: "",
      courselist: [],
      showmore: false,
      subtract: ""
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
  created() {
    if (process.browser) {
      let that = this;
      dsBridge.registerAsyn("RefreshData", function(arg1, arg2, arg3) {
        that.refresh();
      });
      window["recvMessage"] = msg => {
        this.refresh();
      };
    }
  },
  mounted() {
    if (process.browser) {
      this.xplateWidth = document.documentElement.clientWidth;
      this.isShow = false;
      this.today = this.getFormatDate(new Date())
        .split("-")
        .map(val => {
          return val < 10 ? (val = `0${val}`) : val;
        })
        .join("-");
      dsBridge.call("hidetabbar", "", function(v) {});
      window.setInterval(() => {
        for (var i = 0; i < this.temp && this.temp.length; i++) {
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
      this.currentDate = this.today;
      this.getStudentPlanSchedule();
    }
  },
  methods: {
    refresh() {
      this.changeDate(this.nowDate);
      this.getStudentPlanSchedule();
    },
    // 去课后作业
    tohomework(item) {
      // 判断是否答过题了
      getMyTopicReport({
        schedule_id: item.schedule_id
      }).then(res => {
        if (res.code == 0) {
          if (!Array.isArray(res.data)) {
            this.$router.push({
              path: "/report/practiceReport",
              query: {
                schedule_id: item.schedule_id,
                type: this.type
              }
            });
          } else {
            this.$router.push({
              path: "/report/homework",
              query: { type: this.type, schedule_id: item.schedule_id }
            });
          }
        } else {
          this.$toast(res.msg);
        }
      });
    },
    ready(item) {
      if (item.status == 1) {
        let index = item.start_time - Math.round(new Date() / 1000);
        let endIndex = item.end_time - Math.round(new Date() / 1000);
        if ((index > 0 && index <= 900) || (index < 0 && endIndex >= 0)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    start(item) {
      if (item.status == 2 || this.ready(item)) {
        let model = {
          roleId: item.role_id,
          classId: item.clazz_id,
          lessonId: item.schedule_id,
          lessonName: item.lesson_info.name,
          clazzId: item.clazz_id,
          micMaxNum: item.max_micro_num,
          micApplyNum: item.max_micro_apply_num,
          autoOnMic: item.is_auto_on_micro == 1 ? true : false,
          allowStuOffMic: item.is_allow_off_micro == 1 ? true : false,
          studentNum: item.max_student_num
        };

        if (item.class_type == 1) {
          dsBridge.call("largeclassbegin", JSON.stringify(model), function(
            v
          ) {});
        } else if (item.class_type == 2) {
          dsBridge.call("classbegin", JSON.stringify(model), function(v) {});
        } else if (item.class_type == 3) {
          dsBridge.call("classbegin", JSON.stringify(model), function(v) {});
        } else if (item.class_type == 4) {
          dsBridge.call("classbegin", JSON.stringify(model), function(v) {});
        }

        let pcModel = {
          gui_type: 3,
          roleId: item.role_id,
          courseId: item.course_id,
          name: item.lesson_info.name,
          //讲台封面
          cover: item.class_info.rostrum_cover,
          lessonId: item.schedule_id,
          clazzId: item.clazz_id,
          class_type: item.class_type,
          micMaxNum: item.max_micro_num,
          micApplyNum: item.max_micro_apply_num,
          autoOnMic: item.is_auto_on_micro == 1 ? true : false,
          allowStuOffMic: item.is_allow_off_micro == 1 ? true : false,
          studentNum: item.max_student_num
        };

        sendMessage(pcModel);
      } else {
        this.$toast("课程还未开始");
      }
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
      // getStudentMonthSchedule({
      //   start: this.date[0].date,
      //   end: this.date[6].date
      // }).then(res => {
      //   this.monthData = res.data;
      // });

      let mon = this.date[0].date.split("-");
      let date = `${mon[0]}-${mon[1]}`;
      this.getclassList(this.dates);
    },
    getclassList(date) {
      getScheduleCalendar({
        start_date: this.date[0].date,
        end_date: this.date[6].date
      }).then(res => {
        if (res.code == 0) {
          // let arr = [];
          this.monthData = res.data;
          // this.monthData.map(item => {
          //   if (item.have_schedule == 1) {
          //     arr.push(`${date}-${item.day}`);
          //   }
          // });
          // this.monthData = arr;
        } else {
          this.$toast(res.msg);
        }
      });
    },
    todayChanged() {
      this.currentWeek = 0;
      this.nowDate = this.today;
      this.currentDate = this.today;
      this.getDates(this.today);
      this.changeDate(this.today);
      this.getStudentPlanSchedule();
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
      this.getStudentPlanSchedule();
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
    getBlur() {
      this.isShow = false;
    },
    getFocus() {
      this.isShow = true;
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
      this.getStudentPlanSchedule();
    },
    getFormatDate(date) {
      let str = date;
      var str2 =
        str.getFullYear() + "-" + (str.getMonth() + 1) + "-" + str.getDate();
      return str2;
    },
    getStudentPlanSchedule() {
      studentPlanSchedule({
        date: this.currentDate
      }).then(res => {
        if (res.code == 0) {
          this.courselist = res.data;
        } else {
          this.$toast(res.msg);
        }
      });
    },

    formatDate(date, fmt) {
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      let o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds()
      };
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + "";
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : this.padLeftZero(str)
          );
        }
      }
      return fmt;
    },
    padLeftZero(str) {
      return ("00" + str).substr(str.length);
    },

    toEvaluate(item, i) {
      getMyLiveClassStatus({
        member_schedule_id: item.id
      }).then(res => {
        if (res.code == 0) {
          if (res.data.status == 0) {
            this.$toast("课程已过期无学习报告");
          } else if (res.data.status == 1) {
            this.$toast("课堂报告准备中");
          } else {
            if (this.type == 1) {
              this.$router.push({
                path: "/report/learningReport",
                query: {
                  lesson_id: item.lesson_id,
                  token: this.$route.query.token,
                  clazz_schedule_id: item.schedule_id,
                  type: 1
                }
              });
            } else {
              this.$router.push({
                path: "/report/learningReport",
                query: {
                  lesson_id: item.lesson_id,
                  token: this.$route.query.token,
                  clazz_schedule_id: item.schedule_id,
                  type: 2
                }
              });
            }
          }
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    },
    playback(item) {
      if (item.play_url) {
        let model = {
          videoid: 0,
          videoplay: item.cdn + item.play_url,
          videorate: 0
        };
        dsBridge.call("video", JSON.stringify(model), function(v) {});
        let pcmodel = {
          videoid: 0, //id
          videoplay: item.cdn + item.play_url, //播放地址
          videorate: 0 //进度条
        };
        sendMessage(pcmodel);
      } else {
        this.$toast("回放资源准备中");
      }
    },
    openmore() {
      this.showmore = !this.showmore;
    }
  }
};
</script>

<style lang="less" scoped>
.dateBar {
  width: 100%;
  background: #ffffff;
  border-radius: 5px;
  .header {
    background: rgba(255, 255, 255, 1);
    // padding: 15px 20px 15px 20px;
    padding: 15px 20px 30px 20px;
    box-sizing: border-box;

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
      margin-top: 30px;

      .calendar::-webkit-scrollbar {
        display: none;
      }
      .pcContain {
        width: 90% !important;
      }
      #person {
        display: flex;
        width: 90%;
        overflow-x: scroll;
        margin: auto;
        justify-content: space-around;
        .active {
          color: white !important;

          background: #3dc17d;
          border-radius: 9px;
        }
        // .dateColumn + .dateColumn {
        //   margin-left: 83px;
        // }
        .dateColumn {
          width: 45px;
          height: 75px;
          padding: 5px 16px 10px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          .week {
            width: 14px;
            height: 20px;
            font-size: 14px;
            margin-bottom: 10px;
            font-weight: 600;
            color: #7c7d7f;
            line-height: 20px;
          }
          .day {
            width: 32px;
            height: 20px;
            font-size: 17px;
            font-family: DIN;
            font-weight: bold;
            color: #333333;
            line-height: 20px;
            text-align: center;
          }

          .sign {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: #9ba298;
            margin-top: 7px;
          }
          .sign.active {
            background: #6cc944;
          }
          .selactive {
            background: #fff !important;
          }
          .active {
            color: #ffffff;
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
    width: 100%;
    padding: 40px 0 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .notLiveBroadcast {
      width: 100%;
      font-size: 14px;
      font-weight: 400;
      color: #999999;
      line-height: 20px;
      text-align: center;

      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      .imghint {
        position: absolute;
        bottom: 17px;
        text-align: center;
      }
    }
  }
}
.courselist + .courselist {
  margin-top: 0px !important;
}

// @media (max-width: 500px) {
//   .dateBar .header .box #person .dateColumn + .dateColumn {
//     margin-left: 5px;
//   }
//   .dateBar .header .box #person {
//     width: 95% !important;
//   }
//   .dateBar .header {
//     background: #ffffff;
//     padding: 15px 15px 15px 15px;
//     box-sizing: border-box;
//     border-radius: 4px;
//   }
//   .courselist {
//     .right {
//       margin-left: 15px !important;
//       padding: 12px !important;

//       .btn {
//         display: flex;
//         position: absolute;
//         bottom: 12px !important;
//         right: 12px !important;
//       }
//     }
//     .left .canborder {
//       padding-right: 13px !important;
//     }
//   }
// }
// 课程列表

.courselist {
  margin-top: 25px;
  display: flex;
  transition: all 0.3s ease-in-out;
  .left_line {
    padding-top: 8px;
    .round {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #ff8022;
    }
    .roundstay {
      background: #3dc17d !important;
    }
    .roundend {
      background: #b8bfcc !important;
    }
    .line {
      width: 2px;
      height: 100%;
      border-right: 1px dashed #d8d8d8;
    }
  }
  .nobottom {
    margin-bottom: 0px !important;
  }
  .rightcard {
    width: calc(100% - 6px);
    margin-left: 9px;
    margin-bottom: 15px;
    .hint {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .time {
        font-size: 18px;
        font-weight: bold;
        color: #333333;
        line-height: 21px;
      }
      .hintfont {
        font-size: 13px;
        font-weight: bold;
        color: #292d33;
        line-height: 19px;
        margin-left: 10px;
      }
      .stay {
        color: #3dc17d !important;
      }
      .end {
        color: #b8c0cd !important;
      }
      .leave_text {
        margin-top: 12px;
        background: rgba(61, 193, 125, 0.1);
        border-radius: 2px;

        padding: 2px 3px;
        box-sizing: border-box;
        font-size: 12px;
        font-weight: 500;
        color: #3dc17d;
        line-height: 17px;
      }
    }

    .caedbottom {
      margin-top: 8px;
      padding: 12px;
      box-sizing: border-box;
      background: #f9f9f9;
      border-radius: 8px;

      .lessonname {
        font-size: 14px;
        font-weight: bold;
        color: #292d33;
        line-height: 21px;
        margin-bottom: 10px;
      }
      .coursename {
        font-size: 12px;
        font-weight: 400;
        color: #666666;
        line-height: 17px;
        margin-bottom: 8px;
      }
      .teacher {
        display: flex;
        align-items: center;
        img {
          width: 23px;
          height: 23px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 4px;
        }
        .teachername {
          font-size: 12px;
          font-weight: 400;
          color: #666666;
        }
      }
      .footer {
        margin-top: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .attend {
          font-size: 14px;
          font-weight: bold;
          color: #ff8022;
          line-height: 20px;
        }
        .btn {
          display: flex;
        }
      }
    }
  }
  // .left {
  //   display: flex;
  //   position: relative;
  //   .canborder {
  //     padding-right: 15px;
  //     border-right: 1px dashed #d8d8d8;
  //     box-sizing: border-box;
  //   }

  //   .stay {
  //     color: #ff8022 !important;
  //   }
  //   .end {
  //     color: #b8c0cd !important;
  //   }
  //   // margin-left: 15px;
  //   .round {
  //     width: 6px;
  //     height: 6px;
  //     border-radius: 50%;
  //     background: #ff8022;
  //     position: absolute;
  //     right: -2.49px;
  //     top: 0px;
  //   }

  //   .starttime {
  //     font-size: 18px;
  //     font-family: DIN;
  //     font-weight: bold;
  //     color: #333333;
  //     line-height: 21px;
  //   }
  //   .status {
  //     margin-top: 1px;
  //     font-size: 13px;
  //     font-weight: 500;
  //     color: #292d33;
  //     line-height: 19px;
  //   }
  //   .leave_text {
  //     margin-top: 12px;
  //     background: rgba(61, 193, 125, 0.1);
  //     border-radius: 2px;

  //     padding: 2px 1.5px;
  //     box-sizing: border-box;
  //     font-size: 12px;
  //     font-weight: 500;
  //     color: #3dc17d;
  //     line-height: 17px;
  //   }
  // }
  // .nobottom {
  //   margin-bottom: 0px !important;
  // }
  // .right {
  //   width: calc(100% - 73px);
  //   margin-left: 18px;
  //   padding: 15px 20px;
  //   box-sizing: border-box;
  //   height: 133px;
  //   background: #f9f9f9;
  //   border-radius: 8px;
  //   position: relative;
  //   margin-bottom: 20px;
  //   .lesson {
  //     font-size: 14px;
  //     font-weight: 500;
  //     color: #292d33;
  //     line-height: 21px;
  //   }
  //   .coursename {
  //     margin-top: 8px;
  //     font-size: 12px;
  //     font-weight: 400;
  //     color: #666666;
  //     line-height: 17px;
  //   }
  //   .btn {
  //     position: absolute;
  //     bottom: 15px;
  //     right: 20px;
  //     display: flex;
  //   }
  //   .and_date {
  //     font-size: 14px;
  //     font-weight: 500;
  //     color: #333333;
  //     line-height: 20px;
  //   }
  // }
}
.seemore {
  margin-top: 20px;
  font-size: 12px;
  font-weight: 400;
  color: #a1a5ab;
  line-height: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 12px;
    height: 6px;
    margin-left: 8px;
    transform: rotate(180deg);
    transition: all 0.3s ease-in-out;
  }
  .rotate {
    transform: rotate(0deg);
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
.noright {
  border-right: 0px !important;
}
.divButton {
  background: #3dc17d;
  border-radius: 4px;
  padding: 5px 16px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  line-height: 20px;
  cursor: pointer;
}
.afterButton {
  border-radius: 4px;
  border: 1px solid #638475;
  padding: 5px 16px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 500;
  color: #6a8376;
  line-height: 20px;
  cursor: pointer;
}
.afterButton + .afterButton {
  margin-left: 10px;
}
.markparent {
  position: relative;
}
.mark {
  position: absolute;
  bottom: -0.5px;
  right: -0.5px;
  width: 16px;
  height: 16px;
}
</style>
