<template>
  <!-- 教师评语组件 -->
  <div class="teacherComments">
    <div class="title">教师评语</div>
    <div class="text" v-if="info.evaluate">{{ info.evaluate }}</div>
    <div class="img" v-else>
      <img src="../../assets/img/eit@2x.png" />
      <div class="img_text">暂无评语</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "teacherComments",
  props: ["info", "type"],
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.teacherComments {
  background: #ffffff;
  border-radius: 5px;
  padding: 17px;
  box-sizing: border-box;
  .title {
    font-size: 18px;
    font-weight: 600;
    color: #333333;
  }
  .text {
    margin-top: 17px;
    font-size: 15px;
    font-weight: 400;
    color: #313233;
  }
  .img {
    padding: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 35px;
      height: 28px;
    }
    .img_text {
      margin-top: 16px;
      font-size: 15px;
      font-weight: 400;
      color: #b9bcbc;
    }
  }
}
</style>
