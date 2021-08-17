<template>
  <!--直播课表组件-->
  <div class="section">
    <div
      class="details"
      v-for="(item, index) in classlist"
      :key="index"
      :class="index == 0 ? 'active' : ''"
    >
      <div
        class="summary"
        :class="
          open(index) && item.course && item.course.length > 0 ? 'active' : ''
        "
        @click="addOpen(item, index)"
      >
        <span>{{ item.chapter_name }}</span>

        <img
          class="icon"
          :class="open(index) ? 'active' : ''"
          src="../assets/img/btn_arrow_down.png"
          alt=""
        />
      </div>
      <ul :class="open(index) ? 'activeUl' : ''">
        <li
          v-for="(items, indexs) in item.course"
          :key="indexs"
          :class="indexs == 0 ? 'active' : ''"
        >
          <div class="classInfo">
            <div class="name">
              <!-- <span class="num">01</span> -->
              <span>{{ items.lesson_info.name }}</span>
              <img
                v-if="
                  ready(items.first_advance_time) && items.schedule_status != 3
                "
                style=" height: 10px;width: 11px;margin-left: 5px;"
                src="../assets/img/ic_live_orange.png"
              />
            </div>
            <div class="time">{{ items.start_and_end_date }}</div>
            <div class="btn" v-if="items.schedule_status != 3">
              <ClassButton
                v-if="
                  ready(items.first_advance_time) && items.schedule_status != 3
                "
                style="background: #3dc17d;border: 2px solid #3abd77;"
                @click="start(items)"
                :text="'开始上课'"
                icon="ic-vd-click2.png"
                :disabled="false"
                :info="info"
              />
              <div class="and_date" v-else-if="items.schedule_id == 0">
                暂未排课
              </div>
              <div class="and_date" v-else>
                {{
                  items.schedule_status == 1
                    ? "待直播"
                    : items.schedule_status == 2
                    ? "直播中"
                    : "已结束"
                }}
              </div>
            </div>
            <div class="btn" v-if="items.schedule_status == 3">
              <ClassButton
                v-if="items.schedule_status == 3"
                @click="toEvaluate(items, index)"
                :text="'查看报告'"
                :icon="items.status == 3 ? 'ic_report.png' : 'ic_report.png'"
                :disabled="items.status == 3 ? false : true"
                :info="info"
              />
              <ClassButton
                v-if="items.schedule_status == 3"
                :text="'课程回顾'"
                :icon="items.play_url ? 'ic-video2.png' : 'ic-video2.png'"
                :disabled="items.play_url ? false : true"
                :info="info"
                @click="playback(items)"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ClassButton from "../components/classButton";
import {
  getMyLiveClassStatus,
  myLiveCourseList,
  myUnitList
} from "../api/common";
import { sendMessage } from "../api/client";
export default {
  props: ["type"],
  components: {
    ClassButton
  },
  computed: {},
  data() {
    return {
      activeNames: [],
      classlist: [],
      lesson: [],
      info: {
        isCanClick: true
      }
    };
  },
  created() {
    this.getChapter();
  },
  mounted() {},
  methods: {
    getChapter() {
      myUnitList({
        page: this.page,
        per_page: this.per_page,
        class_id: this.$route.query.class_id
      }).then(res => {
        if (res.code == 0) {
          this.classlist = res.data;
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    },
    // 展开详细内容
    open(index) {
      let f = false;
      for (let i = 0; i < this.activeNames.length; i++) {
        if (this.activeNames[i] == index) {
          f = true;
        }
      }
      return f;
    },
    addOpen(item, index) {
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
      if (f == false) {
        myLiveCourseList({
          class_id: item.class_id,
          chapter_id: item.chapter_id
        }).then(res => {
          if (res.code == 0) {
            this.lesson = res.data;

            this.classlist.map((j, i) => {
              if (j.chapter_id == item.chapter_id) {
                return this.$set(this.classlist[i], "course", res.data);
              }
            });
          } else {
            this.$toast(res.msg || res.message);
          }
        });
      }
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
    // 开始上课
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
    toEvaluate(item, i) {
      if (item.member_schedule_id) {
        getMyLiveClassStatus({
          member_schedule_id: item.member_schedule_id
        }).then(res => {
          if (res.code == 0) {
            if (res.data.status == 0) {
              this.$toast("课堂报告暂时无法观看");
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
                    status: this.$route.query.status
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
                    class_id: this.$route.query.class_id,
                    class_name: this.$route.query.class_name,
                    status: this.$route.query.status
                  }
                });
              }
            }
          } else {
            this.$toast(res.msg || res.message);
          }
        });
      }
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
    }
  }
};
</script>

<style lang="less" scoped>
.section {
  width: 100%;
  .details {
    background: #ffffff;
    border-radius: 6px;
    margin-top: 10px;
    .summary {
      outline: none;
      padding: 15px 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 14px;
        font-weight: 500;
        color: #000000;
        line-height: 20px;
      }
      .icon {
        width: 12px;
        height: 7px;
        object-fit: cover;
        transition: all 0.3s ease-in-out;
      }
      .icon.active {
        transform: rotate(180deg);
      }
    }
    .summary.active {
      border-bottom: 1px solid #d8d8d8;
    }
    ul {
      max-height: 0;
      overflow: hidden;
      transition: all 0.3s ease-in-out;
      &.activeUl {
        max-height: 100%;
      }
    }
    li {
      margin: 0 20px;
      padding: 20px 0px;
      padding-left: 3px;
      box-sizing: border-box;
      border-top: 1px solid #d8d8d8;
      display: flex;
      min-height: 130px;
      .classInfo {
        line-height: 1;
        .name {
          font-size: 14px;
          font-weight: 400;
          color: #333333;
          line-height: 20px;
          .num {
            margin-right: 2px;
          }
        }
        .time {
          margin-top: 8px;

          font-size: 12px;
          font-weight: 400;
          color: #333;
          line-height: 17px;
        }
        .btn {
          margin-top: 15px;
          display: flex;
          .classButton + .classButton {
            margin-left: 15px;
          }
        }
        .and_date {
          font-size: 14px;
          font-weight: 500;
          color: #333333;
          line-height: 20px;
        }
        // 上次看过的
        .lastseen {
          color: #6a8376 !important;
        }
        // 未解锁的颜色
        .notpass {
          color: #999999 !important;
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
  .tolive {
    margin-top: 20px;
    font-size: 14px;
    font-weight: 500;
    color: #333333;
    line-height: 20px;
  }
}
</style>
