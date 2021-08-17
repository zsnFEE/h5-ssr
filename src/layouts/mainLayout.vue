<template>
  <div class="mainLayout">
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
    <van-pull-refresh
      v-if="isMobile && !$route.meta.noRefresh"
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <keep-alive>
        <Nuxt v-if="$route.meta.keepalive" />
      </keep-alive>
      <Nuxt v-if="!$route.meta.keepalive" />
    </van-pull-refresh>
    <template v-else>
      <keep-alive>
        <Nuxt v-if="$route.meta.keepalive" />
      </keep-alive>
      <Nuxt v-if="!$route.meta.keepalive" />
    </template>
  </div>
</template>
<script>
import { PullRefresh } from "vant";
import { isMobile } from "../../src/common/util";

export default {
  components: {
    [PullRefresh.name]: PullRefresh
  },
  data() {
    return {
      isLoading: false,
      isMobile: isMobile()
    };
  },
  created() {},
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
