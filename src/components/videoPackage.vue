<template>
  <div
    class="videoPackage"
    @click="toRecordListPhone"
    :class="true ? 'cursor' : ''"
  >
    <div class="title">
      {{ info.name }}
    </div>
    <div class="history">
      {{ historyText() }}
    </div>
    <div
      class="timeBarText"
      :class="info.lock_type == 2 && info.unlock_course > 0 ? '' : 'timeonly'"
    >
      <div
        class="updateProgress"
        v-if="info.lock_type == 2 && info.unlock_course > 0"
      >
        {{ `已更新至第${info.unlock_course}节 ${info.unlock_course_name}` }}
      </div>
      <div>
        {{ `学习进度：${info.watch_course_num}/${info.video_course}` }}
      </div>
    </div>
    <TimeBar
      :percentage="(info.watch_course_num / info.video_course) * 100"
    ></TimeBar>
  </div>
</template>

<script>
import TimeBar from "../components/timeBar";

export default {
  components: {
    TimeBar
  },
  name: "statistics",
  props: ["info"],
  mounted() {},
  methods: {
    toRecordListPhone() {
      this.$emit("toRecordListPhone", this.info);
    },
    historyText() {
      return this.info.watch_lesson_name == ""
        ? "暂未观看"
        : "上次观看" + this.info.watch_lesson_name;
    }
  }
};
</script>

<style lang="less" scoped>
.videoPackage {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: #ffffff;
  box-sizing: border-box;
  padding: 16px 16px 16px 16px;
  .lastWatch {
    font-size: 14px;
    font-weight: 400;
    color: #666666;
  }
  @media (max-width: 767px) {
    padding: 15px;
    border-radius: 8px;
  }
  .title {
    width: 100%;
    font-size: 16px;
    font-weight: bold;
    color: #333333;
    line-height: 22px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media (max-width: 767px) {
    }
  }
  .history {
    font-size: 12px;
    font-weight: 400;
    color: #666666;
    line-height: 20px;
    margin-top: 10px;
    @media (max-width: 767px) {
      color: #777777;
      font-size: 14px;
      line-height: 16px;
      margin-top: 8px;
    }
  }
  .timeonly {
    justify-content: flex-end !important;
  }
  .timeBarText {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 16px;
    margin-bottom: 11px;
    color: #999;
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    .updateProgress {
      width: 70%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      @media (max-width: 767px) {
        width: 55%;
      }
    }
    @media (max-width: 767px) {
      color: #777;
      margin-top: 20px;
      margin-bottom: 8px;
    }
  }
  .ash {
    color: #999999;
  }
}
</style>
