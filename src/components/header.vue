<template>
  <div class="head">
    <div class="new_header" :class="!isMobile ? 'pc_box' : ''">
      <div v-show="!hideBack" class="back" @click="toBack">
        <img src="../assets/img/ic_back.png" />
      </div>
      <div class="left"></div>
      <div class="middle">
        {{ title }}
      </div>
      <div class="right">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
import { isMobile } from "../common/util";

export default {
  name: "Header",
  props: ["title", "hideBack"],
  data() {
    return { isMobile: isMobile() };
  },
  methods: {
    toBack() {
      this.$emit("toBack");
    }
  }
};
</script>
<style lang="less" scoped>
.head {
  position: fixed;
  top: 0;
  height: 44px;
  box-sizing: border-box;
  background: #fff;
  width: 100%;
  z-index: 10;

  .new_header {
    display: flex;
    justify-content: center;
    z-index: 9;
    height: 100%;
    // border-bottom: 1px solid #f0f0f0;
    &.pc_box {
      border-bottom: 1px solid #f0f0f0;
    }
  }
  .middle {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
  }
  .right {
    cursor: pointer;
    position: absolute;
    right: 15px;
    top: 12px;
  }
  .back {
    cursor: pointer;
    width: 20px;
    height: 20px;
    position: absolute;
    left: 15px;
    top: 12px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
