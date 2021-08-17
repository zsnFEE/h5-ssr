<template>
  <div class="dateTimeTab">
    <div class="curriculumTimeBox">
      <div
        class="curriculumSign button_color"
        :class="item.status == 3 ? 'active' : ''"
      ></div>
      <!-- <div class="curriculumSign button_color"></div> -->
      <div class="curriculumTime ft14" v-if="item.role_id == 0">
        <span> {{ item.start.split(" ")[0] }}</span>
        <span> {{ item.start.split(" ")[2] }}</span>
        <span> {{ item.start_and_end_time }}</span>
      </div>
      <div class="curriculumTime ft14" v-else>
        {{ item.start_and_end_time }}
      </div>
      <!-- <img src="../assets/img/ic_live_orange.png" v-show="item.status == 2" /> -->
    </div>
    <div class="leaveBox" v-show="item.schedule_status == 3">
      <div class="leaveBackground"></div>
      已请假
    </div>
  </div>
</template>

<script>
export default {
  name: "dateTimeTab",
  props: ["item"],
  computed: {},
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.dateTimeTab {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .curriculumTimeBox {
    display: flex;
    align-items: center;
    .curriculumSign {
      width: 8px;
      height: 8px;
      box-shadow: 0px -1px 0px 0px rgba(255, 255, 255, 0.15);
      border-radius: 4px;
      margin-right: 8px;
    }
    .curriculumSign.active {
      background: rgba(184, 191, 204, 1);
    }
    .curriculumTime {
      // font-size: 14px;
      // font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(130, 138, 153, 1);
      line-height: 20px;
      white-space: nowrap;
      span + span {
        margin-left: 5px;
      }
    }
  }
  img {
    height: 10px;
    width: 11px;
    margin-left: 10px;
  }
  .leaveBox {
    padding: 2px 3px;
    margin-right: 10px;
    position: relative;
    font-size: 12px;
    font-weight: 500;
    color: #3dc17d;
    line-height: 16px;
    .leaveBackground {
      background: rgba(61, 193, 125, 1);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      border-radius: 4px;
      opacity: 0.1;
    }
  }
}
@media (min-width: 768px) {
}
</style>
