<template>
  <div
    id="app"
    :class="[flag ? '' : 'pc', $route.meta.bg == 'dark' ? 'dark' : '']"
  >
    <router-view :key="$route.query.id" />
  </div>
</template>

<script>
import { isMobile } from "./common/util";
export default {
  data() {
    return {
      flag: isMobile()
    };
  },
  mounted() {}
};
</script>
<style lang="less">
@import "./assets/css/public.less";
@import url("~@/assets/css/font.css");
* {
  -webkit-user-select: none; /*禁用手机浏览器的用户选择功能 */
  -moz-user-select: none;
  -webkit-touch-callout: none;
  -ms-user-select: none; /*IE10*/
  user-select: none;
  outline: none;
}
input,
textarea {
  -webkit-user-select: auto; /*webkit浏览器*/
  outline: none;
}
#app {
  height: 100vh;
  &.dark {
    background: #1e1e1f;
  }
}
.pc {
  overflow-x: hidden;
  // height: auto !important;
}
</style>
