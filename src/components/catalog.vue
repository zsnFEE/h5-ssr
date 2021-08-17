<template>
  <div class="catalog">
    <!--折叠部分开始-->
    <div v-for="(items, index) in chapter_map" :key="index">
      <div class="fold" @click="show_fold(index)">
        <div class="fold_font">{{ items.name }}</div>
        <div class="btn_arrow">
          <img
            v-if="activeindex != index"
            src="../assets/img/btn_arrow_right@2x.png"
          />
          <img
            v-if="activeindex == index"
            src="../assets/img/btn_arrow_up@2x.png"
          />
        </div>
      </div>
      <!--需要折叠隐藏的部分开始-->
      <div
        class="hide_fold"
        v-show="activeindex == index"
        v-for="(list, i) in items.courses"
        :key="i"
      >
        <div class="left_img">
          <img :src="list.cdn + list.logo" />
        </div>
        <div class="right_font">
          <div class="hide_title">{{ list.name }}</div>
          <div class="hide_time">时长：{{ list.duration }}</div>
          <!-- <div class="label">已学完</div> -->
        </div>
      </div>
    </div>
    <!--需要折叠隐藏的部分结束-->
    <!--折叠部分结束-->
  </div>
</template>
<script>
export default {
  name: "catalog",
  props: ["chapter_map", "cdn"],
  data() {
    return {
      list: [],
      show: true,
      activeindex: -1,
      btn_arrow: require("@/assets/img/btn_arrow_right@2x.png"),
      btn_up: require("@/assets/img/btn_arrow_up@2x.png")
    };
  },
  created() {},
  watch: {},
  mounted() {},
  methods: {
    show_fold(index) {
      if (this.activeindex == index) return (this.activeindex = -1);
      this.activeindex = index;
    }
  }
};
</script>

<style lang="less" scoped>
.catalog {
  // padding: 22px 32px 34px 32px;
  overflow: auto;
  // height: 100%;
}
.catalog::-webkit-scrollbar {
  display: none;
}
// 折叠部分开始
.fold {
  // width: 853px;
  height: 76px;
  border-bottom: 1px solid #f2f5fa;
  padding: 24px 0;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}
.fold_font {
  height: 27px;
  font-size: 19px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 27px;
}
.btn_arrow {
  width: 22px;
  height: 22px;
  padding-top: 7px;
  padding-bottom: 6px;
  cursor: pointer;
}
.btn_arrow img {
  width: 100%;
  height: 100%;
}
// 折叠部分结束
// 需要折叠隐藏的部分开始
.hide_fold {
  height: 140px;
  box-sizing: border-box;
  padding-top: 24px;
  padding-bottom: 24px;
  display: flex;
  border-bottom: 1px solid rgba(242, 245, 250, 1);
}
.hide_fold .left_img {
  width: 162px;
  height: 92px;
  margin-right: 11px;
  background: chartreuse;
}
.left_img img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.hide_fold .hide_title {
  height: 24px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
}
.hide_time {
  margin-top: 8px;
  margin-bottom: 15px;
  height: 23px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(130, 138, 153, 1);
  line-height: 23px;
}
.label {
  width: 54px;
  height: 22px;
  background: rgba(130, 138, 153, 1);
  border-radius: 2px;
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 22px;
  text-align: center;
}
// 需要折叠隐藏的部分结束
</style>
