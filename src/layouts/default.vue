<template>
  <!-- <van-pull-refresh
      v-if="isMobile && !$route.meta.noRefresh"
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <transition name="slide-left" mode="out-in">
        <keep-alive>
          <router-view v-if="$route.meta.keepalive" />
        </keep-alive>
      </transition>
      <transition name="slide-left" mode="out-in">
        <router-view v-if="!$route.meta.keepalive" />
      </transition>
    </van-pull-refresh>
    <template v-else>
      <keep-alive>
        <router-view v-if="$route.meta.keepalive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepalive" />
    </template> -->
  <client-only>
    <div
      id="app"
      :class="[isMobile ? '' : 'pc', $route.meta.bg == 'dark' ? 'dark' : '']"
    >
      <div class="mainLayout">
        <van-pull-refresh
          v-if="isMobile && !$route.meta.noRefresh"
          v-model="isLoading"
          @refresh="onRefresh"
        >
          <Nuxt />
        </van-pull-refresh>
        <Nuxt v-else />
      </div>
    </div>
  </client-only>
</template>
<script>
import { PullRefresh } from "vant";
import { isMobile } from "../common/util";

export default {
  name: "default",
  components: {
    [PullRefresh.name]: PullRefresh
  },
  data() {
    return {
      isLoading: false,
      isMobile: isMobile()
    };
  },
  mounted() {},
  methods: {
    onRefresh() {
      let that = this;
      setTimeout(() => {
        that.isLoading = true;
        that.$router.go(0);
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
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
.mainLayout {
  height: 100%;
  .contain {
    height: 100%;
  }
  .van-pull-refresh {
    ::v-deep .van-pull-refresh__track {
      min-height: 100vh;
    }
  }
}
</style>
