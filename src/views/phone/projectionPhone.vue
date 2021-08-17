<template>
  <div class="temp">
    <header>
      <div class="title title_box">
        <img
          @click="toBack"
          src="../../assets/img/ic_back.png"
          class="titleArrow title_arrow"
        />
        <div class="titleText title_text">课件投屏</div>
        <div class="titleDv"></div>
      </div>
    </header>
    <body class="body">
      <div class="curriculumList" v-for="item in liveClassList" :key="item.id">
        <div class="curriculumInfoBox">
          <div class="curriculumImg cover_size"></div>
          <div class="curriculumInfo">
            <div class="curriculumInfoTitle">{{ item.className }}</div>
            <div class="curriculumInfoName">
              <span>{{ item.name }}</span>
              <img
                src="../../assets/img/ic_live@2x.png"
                v-show="item.flag == 3"
              />
            </div>
          </div>
          <div class="buttonBox">
            <button v-show="item.flag == 3" class="button_color">
              开始上课
              <img src="../../assets/img/ic_get_in@2x.png" />
            </button>
          </div>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
export default {
  methods: {
    toBack() {
      this.$router.push({
        path: "/phone/myInfoPhone",
        query: { token: this.$route.query.token }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.temp {
  background: rgba(243, 245, 249, 1);
  min-height: 100%;
  .title {
    .titleDv {
      width: 18px;
    }
  }
  .body {
    padding: 42px 15px 15px 15px;
  }
}
</style>
