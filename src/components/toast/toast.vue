<template>
  <transition name="fade">
    <div v-show="visible" :class="{ isAddress: judge }">{{ message }}</div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      message: "",
      judge: ""
    };
  }
};
</script>

<style scoped lang="less">
div {
  font-size: 16px !important;
  padding: 15px 30px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  z-index: 999;
  &.isAddress {
    top: 15%;
  }
}
/* vue动画过渡效果设置 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
