<template>
  <div class="dateBar">
    <!-- <client-only> -->
    <div class="header">
      <div class="title">
        <div class="dataTitle">
          <div class="date" @click="selectDate">
            <span
              >{{
                selectDay.split("-")[0] +
                  "年" +
                  selectDay.split("-")[1] +
                  "月" +
                  selectDay.split("-")[2] +
                  "日"
              }}
            </span>
            <img
              :class="popup == true ? 'rotate' : ''"
              src="../assets/img/btn_arrow_down.png"
            />
          </div>
        </div>
        <p @click="todayChanged">
          <img src="../assets/img/ic_schedule.png" alt="" />
          <span>今天</span>
        </p>
      </div>
      <div
        id="testBox"
        @touchstart.stop="touchstart"
        @touchmove.stop.prevent="touchmove"
        @touchend="touchend"
      >
        <div
          class="testBoxWrapper"
          :style="
            `transform: translate3d(${wrapperDateCount *
              100}%, 0px, 0px);height:100%;`
          "
        >
          <ul
            v-for="index in 3"
            :key="index"
            :style="
              `transform: translate3d(${(index == 1
                ? count - 1
                : index == 2
                ? count
                : count + 1) * 100}%, 0px, 0px)`
            "
          >
            <li
              v-for="(item, i) in index == 1
                ? firstDateList
                : index == 2
                ? middleDateList
                : lastDateList"
              :key="i"
            >
              <div
                class="dateWrapper"
                @click="setnum(item)"
                :class="[selectDay == item.date ? 'active' : '']"
              >
                <div class="week">{{ item.text }}</div>
                <div class="day">{{ item.content }}</div>
                <div
                  v-show="item.have_schedule == 1"
                  class="sign"
                  :class="[
                    selectDay == item.date ? 'activeSign' : '',
                    new Date(item.date).getTime() > new Date(today).getTime()
                      ? 'futureSchedule'
                      : ''
                  ]"
                ></div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="plate" v-show="courselist.length == 0">
        <div class="notLiveBroadcast">
          <img
            style="width:150px;height:150px;"
            src="../assets/img/img-curriculum@2x.png"
          />
          <div class="imghint">
            {{
              getmondate == formatDate(new Date(), "yyyy-MM").substr(0, 10) &&
              selectDay == today
                ? "今日暂无课程安排"
                : getmondate ==
                    formatDate(new Date(), "yyyy-MM").substr(0, 10) &&
                  selectDay > today
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
          <div class="line" v-show="courselist.length > 1"></div>
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
              <span class="leave_text" v-show="item.leave_text">
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
              <div class="btn" v-show="item.schedule_status != 3">
                <div
                  class="divButton "
                  v-show="item.is_in_schedule == 1 && !item.leave_text"
                  @click="start(item)"
                >
                  开始上课
                </div>
              </div>
              <div class="btn" v-show="item.schedule_status == 3">
                <div
                  class="afterButton"
                  v-show="item.schedule_status == 3"
                  @click="toEvaluate(item, index)"
                >
                  查看报告
                </div>
                <div
                  class="afterButton"
                  v-show="item.schedule_status == 3"
                  @click="playback(item)"
                >
                  课程回顾
                </div>
                <div
                  class="afterButton markparent"
                  v-show="item.schedule_status == 3 && item.is_end_topic == 1"
                  @click="tohomework(item)"
                >
                  课后练习
                  <img
                    class="mark"
                    v-show="item.is_end_topic_stats == 1"
                    src="../assets/img/img-wancheng.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--开始-->
    <van-popup v-model="popup" position="bottom" round>
      <van-datetime-picker
        type="date"
        v-model="currentDate"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @cancel="popup = false"
        @confirm="onAddrConfirm"
        @change="dateChanged"
      />
    </van-popup>
    <!--结束-->
    <!-- </client-only> -->
  </div>
</template>
<script>
import { DatetimePicker, Popup, Picker } from "vant";
import { sendMessage } from "../api/client";
import {
  getScheduleCalendar,
  studentPlanSchedule,
  getMyLiveClassStatus,
  getMyTopicReport
} from "../api/common";
import ClassButton from "../components/classButton";
import { isMobile } from "../common/util";

export default {
  props: ["scheduleDate", "type"],
  computed: {},
  components: {
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    ClassButton
  },
  data() {
    return {
      startX: "",
      count: 0,
      startPointX: "",
      movePointX: 0,
      endTime: 0,
      endPointX: 0,
      wrapperDateCount: 0,
      touchTime: "",
      dates: [],
      fullDates: [],
      info: {
        isCanClick: true
      },
      flag: isMobile(),
      currentDate: "",
      date: [],
      maxDate: null,
      minDate: new Date(2020, 12, 1),
      popup: false, //日期弹出框，
      mondate: this.formatDate(new Date(), "yyyy年MM月").substr(0, 10), //显示的日期格式
      getmondate: this.formatDate(new Date(), "yyyy-MM").substr(0, 10), //传过去的的日期格式
      today: "",
      selectDay: "",
      divWidth: "",
      courselist: [],
      showmore: false,
      subtract: "",
      left: "",
      timeout: new Date().getTime()
    };
  },
  computed: {
    firstDateList() {
      return this.dates.filter((item, index) => {
        return index >= 0 && index <= 6;
      });
    },
    middleDateList() {
      return this.dates.filter((item, index) => {
        return index >= 7 && index <= 13;
      });
    },
    lastDateList() {
      return this.dates.filter((item, index) => {
        return index > 13;
      });
    }
  },
  watch: {
    selectDay(val, old) {
      this.currentDate = new Date(val);
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
    this.gettoday();
    this.getDates();
    this.maxDate = new Date(
      this.today.split("-")[0],
      this.today.split("-")[1] - 1 + 7,
      0
    );
    this.todayChanged();
  },
  methods: {
    refresh() {
      this.setnum({
        date: this.selectDay
      });
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

    touchmove(e) {
      let currentX = e.changedTouches[0].clientX;
      if (
        new Date(this.dates[7].date).getTime() <=
          new Date(this.minDate).getTime() &&
        currentX >= this.startX
      ) {
        e.preventDefault();
        return;
      } else if (
        new Date(this.dates[13].date).getTime() >=
          new Date(this.formatDate(this.maxDate, "yyyy-MM-dd")).getTime() &&
        currentX <= this.startX
      ) {
        e.preventDefault();
        return;
      }
      this.count =
        this.count +
        (e.changedTouches[0].clientX - this.startPointX) /
          document.getElementById("testBox").getBoundingClientRect().width;
      this.startPointX = e.changedTouches[0].clientX;
    },
    touchend(e) {
      let moveX = this.startX - e.changedTouches[0].clientX;
      let speed = moveX / (new Date().getTime() - this.touchTime);
      let lengthMovePercent =
        moveX /
        document.getElementById("testBox").getBoundingClientRect().width;
      if (Math.abs(speed) >= 0.1 || Math.abs(lengthMovePercent) > 0.1) {
        this.count = moveX > 0 ? Math.floor(this.count) : Math.ceil(this.count);
      } else {
        this.count = moveX > 0 ? Math.ceil(this.count) : Math.floor(this.count);
      }
      this.wrapperDateCount = -this.count;
      Math.abs(speed) < 0.1 ? "" : this.getDates();
      //处理数据与接口
    },
    touchstart(e) {
      this.startPointX = e.changedTouches[0].clientX;
      this.touchTime = new Date().getTime();
      this.startX = e.changedTouches[0].clientX;
    },
    getDates(time) {
      var new_Date = time ? new Date(time) : new Date();
      var timesStamp = new_Date.getTime();
      var currenDay = new_Date.getDay();
      var dates = [];
      for (let j = -1; j < 2; j++) {
        for (var i = 0; i < 7; i++) {
          let arr = this.getFormatDate(
            new Date(
              timesStamp +
                24 * 60 * 60 * 1000 * (i - ((currenDay + 6) % 7)) +
                (-this.count + j) * 60 * 1000 * 60 * 24 * 7
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
                ? "01"
                : // `${
                  //     arr
                  //       .map(val => {
                  //         return val < 10 ? (val = `0${val}`) : val;
                  //       })[1]
                  //       .split("")[1]
                  //   }月`
                  arr.map(val => {
                    return val < 10 ? (val = `0${val}`) : val;
                  })[2],
            text:
              xweek[
                new Date(
                  timesStamp +
                    24 * 60 * 60 * 1000 * (i - ((currenDay + 6) % 7)) +
                    (-this.count + j) * 60 * 1000 * 60 * 24 * 7
                ).getDay() == 0
                  ? 6
                  : new Date(
                      timesStamp +
                        24 * 60 * 60 * 1000 * (i - ((currenDay + 6) % 7)) +
                        (-this.count + j) * 60 * 1000 * 60 * 24 * 7
                    ).getDay() - 1
              ],
            date: arr
              .map(val => {
                return val < 10 ? (val = `0${val}`) : val;
              })
              .join("-"),
            have_schedule: 0
          });
        }
      }
      this.dates = dates;
      getScheduleCalendar({
        start_date: this.dates[0].date,
        end_date: this.dates[this.dates.length - 1].date
      }).then(res => {
        if (res.code == 0) {
          this.dates.map(item => {
            res.data.includes(item.date) ? (item.have_schedule = 1) : "";
          });
        }
      });
    },
    getFormatDate(date) {
      let str = date;
      var str2 =
        str.getFullYear() + "-" + (str.getMonth() + 1) + "-" + str.getDate();
      return str2;
    },

    checkMonth(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
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
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      }
      return val;
    },
    gettoday() {
      this.today = this.formatDate(new Date(), "yyyy-MM-dd");
    },
    getDay(date) {
      let day = "";
      switch (new Date(date).getDay()) {
        case 1:
          day = "一";
          break;
        case 2:
          day = "二";
          break;
        case 3:
          day = "三";
          break;
        case 4:
          day = "四";
          break;
        case 5:
          day = "五";
          break;
        case 6:
          day = "六";
          break;
        case 0:
          day = "日";
          break;
      }
      return day;
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

    getDaysInMonth(year, month) {
      const daysOfMonth = [];
      month = parseInt(month, 10);
      const lastDayOfMonth = new Date(year, month, 0).getDate();
      for (let i = 1; i <= lastDayOfMonth; i++) {
        let monthChange = month < 10 ? "0" + month : String(month);
        let day = i < 10 ? "0" + i : String(i);
        daysOfMonth.push({
          week: this.getDay(year + "-" + monthChange + "-" + day),
          month: monthChange,
          year: year,
          day: day,
          fullDate: year + "-" + monthChange + "-" + day
        });
      }
      return daysOfMonth;
    },
    getDay(date) {
      let day = "";
      switch (new Date(date).getDay()) {
        case 1:
          day = "一";
          break;
        case 2:
          day = "二";
          break;
        case 3:
          day = "三";
          break;
        case 4:
          day = "四";
          break;
        case 5:
          day = "五";
          break;
        case 6:
          day = "六";
          break;
        case 0:
          day = "日";
          break;
      }
      return day;
    },
    getCurrentDate() {
      var now = new Date();
      var day = now.getDay(); //得到周几
      var arr_week = new Array("0", "1", "2", "3", "4", "5", "6");
      this.week = arr_week[day];
    },
    getclassList() {
      getScheduleCalendar({ date: this.getmondate }).then(res => {
        if (res.code == 0) {
          this.date = res.data;
          this.date.map((item, index) => {
            this.$set(item, "month", this.getmondate.split("-")[1]);
            this.$set(item, "year", this.getmondate.split("-")[0]);
            this.$set(item, "fullDate", this.getmondate + "-" + item.day);
          });
          this.date.map((val, index) => {
            if (
              val.day == this.fullDates[index].day &&
              val.year == this.fullDates[index].year &&
              val.month == this.fullDates[index].month
            ) {
              this.$set(
                this.fullDates[index],
                "have_schedule",
                val.have_schedule
              );
            }
          });
        } else {
          this.$toast(res.msg);
        }
      });
    },

    // 点击今天
    todayChanged() {
      this.showmore = false;
      this.selectDay = this.today;
      // this.mondate = this.formatDate(new Date(), "yyyy年MM月").substr(0, 10);
      this.count =
        this.count - this.checkDiffWeeks(this.today, this.dates[7].date);
      this.wrapperDateCount = -this.count;
      this.getDates();
      let time = this.formatDate(new Date(), "yyyy-MM")
        .substr(0, 10)
        .split("-");
      this.getmondate = `${time[0]}-${time[1]}`;
      this.getStudentPlanSchedule();
    },

    getStudentPlanSchedule() {
      studentPlanSchedule({
        date: `${this.selectDay}`
      }).then(res => {
        if (res.code == 0) {
          this.courselist = res.data;
        } else {
          this.$toast(res.msg);
        }
      });
    },
    // 选择日期
    selectDate() {
      this.showmore = false;
      this.popup = !this.popup;
    },
    dateChanged(val) {
      // console.log(123);
    },
    onAddrConfirm(val, isClose) {
      this.selectDay = this.formatDate(val, "yyyy-MM-dd");
      this.count =
        this.count - this.checkDiffWeeks(this.selectDay, this.dates[7].date);
      this.wrapperDateCount = -this.count;
      this.getDates();
      isClose ? "" : (this.popup = false);
      this.getStudentPlanSchedule();
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
    // 选择日期的方法结束

    setnum(item) {
      this.showmore = false;
      this.selectDay = item.date;
      this.getStudentPlanSchedule();
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
                  type: 1,
                  module: 1
                }
              });
            } else {
              this.$router.push({
                path: "/report/learningReport",
                query: {
                  lesson_id: item.lesson_id,
                  token: this.$route.query.token,
                  clazz_schedule_id: item.schedule_id,
                  type: 2,
                  module: 1
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
#testBox {
  transform: translate3d(0%, 0px, 0px);
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 75px;

  overflow: hidden;
  // width: 90%;
  .testBoxWrapper {
    ul {
      display: flex;
      // justify-content: space-around;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      will-change: transform;
      transition-duration: 0.3s;
      li {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 14.2857%;
        color: #3dc17d;
        .dateWrapper {
          height: 75px;
          padding: 5px 16px 10px;
          box-sizing: border-box;
          border-radius: 9px;
          position: relative;
          .week {
            width: 14px;
            height: 20px;
            font-size: 14px;
            margin: 0 auto;
            margin-bottom: 7px;
            font-weight: 600;
            color: #7c7d7f;
            line-height: 20px;
          }
          .day {
            height: 20px;
            font-size: 17px;
            font-family: DIN;
            font-weight: bold;
            color: #333333;
            line-height: 20px;
            margin-bottom: 7px;
          }
          .sign {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            position: absolute;
            bottom: 12px;
            left: calc(50% - 2px);
            background: #9ba298;
            &.futureSchedule {
              background: #3dc17d;
            }
          }
          &.active {
            background: #3dc17d;
            .day {
              color: white;
            }
            .week {
              color: white;
            }
            .sign {
              background: white !important;
            }
          }
        }
      }
    }
  }
}

.dateBar {
  width: 100%;
  background: #ffffff;
  border-radius: 5px;
  .header {
    background: rgba(255, 255, 255, 1);
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
      margin-bottom: 30px;
      .dataTitle {
        display: flex;
        align-items: center;
      }

      .date {
        font-size: 18px;
        font-weight: 600;
        color: #333333;
        line-height: 25px;
        display: flex;
        align-items: center;
        img {
          margin-left: 8px;
          width: 11px;
          height: 7px;
          transition: all 0.3s ease-in-out;
        }
      }
      .rotate {
        transform: rotate(180deg);
      }
      p {
        background: white;
        border-radius: 13px;
        padding: 4px 8px 4px 7px;
        display: flex;
        align-items: center;
        cursor: pointer;
        border: 1px solid #979797;
        img {
          width: 17px;
          height: 17px;
          margin-right: 2px;
        }
        span {
          font-size: 12px;
          font-weight: 400;
          color: #828a99;
          line-height: 1;
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
      #person::-webkit-scrollbar {
        display: none;
      }

      #person ::-webkit-scrollbar {
        width: 0px !important;
        height: 0px !important;
      }
      #person {
        display: flex;
        width: 90%;
        overflow-x: scroll;
        margin: auto;
        -webkit-overflow-scrolling: auto;

        .active {
          color: white !important;

          background: #3dc17d;
          border-radius: 9px;
        }

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
            width: 17px;
            height: 20px;
            font-size: 17px;
            font-family: DIN;
            font-weight: bold;
            color: #333333;
            line-height: 20px;
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
            background: #fff;
          }
          .active {
            color: #ffffff;
          }
        }
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

@media (max-width: 500px) {
  .dateBar .header .box #person {
    width: 95% !important;
  }
  .dateBar .header {
    background: #ffffff;
    padding: 15px 15px 50px 15px;
    box-sizing: border-box;
    border-radius: 4px;
    // height: 100vh;
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
      margin-top: 100px !important;
      .imghint {
        position: absolute;
        bottom: 17px;
        text-align: center;
      }
    }
  }
}
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
          font-weight: 500;
          color: #ff8022;
          line-height: 20px;
        }
        .btn {
          display: flex;
        }
      }
    }
  }
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
  &.disabled {
    border: 1px solid #638475;
    background: unset;
    cursor: not-allowed;
    color: #6a8376;
  }
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
