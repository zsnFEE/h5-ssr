<template>
  <div
    class="classButton"
    @click="emit"
    :class="leave ? 'leave' : disabled ? 'disabled' : ''"
  >
    <img :src="require(`../assets/img/${icon}`)" alt="" />
    <span :class="text == '开始上课' ? 'colorStyle' : ''">{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: ["text", "icon", "disabled", "info", "leave"],
  methods: {
    emit() {
      this.$emit("click", this.info);
    }
  }
};
</script>

<style lang="less" scoped>
.classButton {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  padding: 4px 8px;
  width: 70px;
  cursor: pointer;
  // background: #3dc17d;
  // border: 2px solid #3abd77;
  border: 1px solid #638475;
  background: unset;

  img {
    height: 20px;
    width: 20px;
  }
  span {
    font-size: 12px;
    // font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    // color: white;
    color: #6a8376;
  }
  &.leave {
    border: 0px;
    padding: 5px 9px;
    background: rgba(153, 153, 153, 0.3);
    cursor: not-allowed;
    span {
      color: white;
    }
  }
  &.disabled {
    border: 1px solid #638475;
    background: unset;
    // cursor: not-allowed;
    span {
      color: #6a8376;
    }
  }
}
.classButton + .classButton {
  margin-left: 8px;
}
@media (min-width: 500px) {
  .classButton + .classButton {
    margin-left: 16px;
  }
}
.colorStyle {
  color: white !important;
}
</style>
