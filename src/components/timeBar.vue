<template>
  <div class="timeBar">
    <span :style="wd"></span>
  </div>
</template>

<script>
export default {
  props: ["percentage"],
  computed: {
    wd() {
      return {
        width: this.percentage + "%"
      };
    }
  },
  data() {
    return {};
  },
  mounted() {
    // var style = document.styleSheets[0];
    // console.log(document.styleSheets[0].rules[0]);
    // if (style) {
    //   // document.styleSheets[0].rules[0].name == "mover"
    //   //   ? ""
    //   //   :
    //   style.insertRule(`@keyframes mover { 0% {
    //     width: 0%;
    //   }
    //   100% {
    //     width: ${this.wd};
    //   }`);
    // }
  }
};
</script>

<style lang="less" scoped>
.timeBar {
  width: 100%;
  height: 5px;
  background: rgba(61, 193, 125, 0.2);
  border-radius: 2px;
  position: relative;
  span {
    max-width: 100%;
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 0;
    height: 5px;
    border-radius: 2px;
    background: linear-gradient(90deg, #94f2e2 0%, #20cf97 100%);
    animation: mover 1.5s ease-in;
  }
}
@keyframes mover {
  0% {
    width: 0%;
  }
  100% {
    // width: ${this.wd};
  }
}
@media (min-width: 500px) {
  .timeBar {
    height: 6px;
    border-radius: 3px;
    span {
      height: 6px;
      border-radius: 3px;
    }
  }
}
</style>
