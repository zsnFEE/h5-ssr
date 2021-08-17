<template>
  <div class="newcard" @click="toDetail">
    <div class="title">{{ info.class_name }}</div>
    <div class="hint" v-if="info.lately_lesson_name">
      上次观看：{{ info.lately_lesson_name }}
    </div>
    <div class="hint" v-if="!info.lately_lesson_name">暂未观看直播</div>
  </div>
</template>
<script>
export default {
  name: "newcard",
  props: ["info"],
  data() {
    return {};
  },
  methods: {
    toDetail() {
      this.$emit("toDetail", this.info);
    }
  }
};
</script>
<style lang="less" scoped>
.newcard {
  padding: 15px;
  padding-bottom: 22px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 120px;
  .title {
    font-size: 16px;
    font-weight: 500;
    color: #292d33;
    line-height: 20px;
  }
  .hint {
    font-size: 12px;
    font-weight: 400;
    color: #666666;
    line-height: 17px;
  }
}
</style>
