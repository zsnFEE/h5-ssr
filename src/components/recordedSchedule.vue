<template>
  <!--录播课表组件-->
  <div class="section">
    <div
      class="details"
      v-for="(item, index) in classlist"
      :key="item.index"
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
          @click="play(items)"
          v-for="(items, indexs) in item.course"
          :key="items.indexs"
          :class="indexs == 0 ? 'active' : ''"
        >
          <div class="classInfo">
            <div class="name">
              <span>{{ items.name }}</span>
            </div>
            <div class="time">视频观看{{ items.watch_percent }}%</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { sendMessage } from "../api/client";

import { getMyClassCourse } from "../api/common";
import { myUnitList } from "../api/common";
export default {
  props: [""],
  computed: {},
  data() {
    return {
      activeNames: [],
      lesson: [],
      showindex: "",
      classlist: []
    };
  },
  created() {
    this.getChapter();
  },
  mounted() {
    // this.getChapter();
  },
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
      console.log("dd", item);
      this.showindex = index;
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
        getMyClassCourse({
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
    play(item) {
      if (item.is_video_locked == 0) {
        let model = {
          videoid: item.course_id,
          videoplay: item.play_url,
          videorate: item.watch_percent
        };
        dsBridge.call("video", JSON.stringify(model), function(v) {});
        let pcmodel = {
          videoid: item.course_id, //id
          videoplay: item.play_url, //播放地址
          videorate: item.watch_percent, //进度条
          videoname: item.name //课程名字
        };
        sendMessage(pcmodel);
      } else {
        if (item.lock_type == 2) {
          this.$toast("还未到可观看时间");
        } else if (item.lock_type == 3 || item.lock_type == 1) {
          this.$toast("请按照目录顺序观看");
        }
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
      min-height: 85px;

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
          color: #666666;
          line-height: 17px;
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
}
</style>
