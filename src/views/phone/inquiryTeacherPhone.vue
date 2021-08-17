<template>
  <div class="temp">
    <header>
      <div class="title title_box">
        <img
          @click="toBack"
          src="../../assets/img/ic_back.png"
          class="titleArrow title_arrow"
        />
        <div class="titleText title_text">
          {{ title == 1 ? "咨询老师" : "在线客服" }}
        </div>
        <div class="titleDv "></div>
      </div>
    </header>
    <body>
      <img src="../../assets/img/img_inquiry.jpg" class="infoImg" />
    </body>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: this.$route.query.title
    };
  },
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    let that = this;
    dsBridge.registerAsyn("goback", function(arg1, arg2, arg3) {
      that.toBack();
    });
  },
  methods: {
    toBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.temp {
  width: 100%;
  height: 100%;
  .title {
    .titleDv {
      width: 18px;
    }
  }
  body {
    display: flex;
    align-items: center;
    .infoImg {
      padding-top: 42px;
      width: 100%;
      object-fit: cover;
    }
  }
}
</style>
