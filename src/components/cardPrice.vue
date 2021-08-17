<template>
  <div class="card">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="cardContainer"
      @click="tocourse(item)"
    >
      <div class="imgContainer">
        <img class="classImg" :src="`${item.logo}`" alt />
        <img
          class="hot"
          v-show="item.is_hot"
          src="../assets/img/icon_hot.png"
          alt
        />
      </div>
      <div class="infoContainer">
        <span class="className">{{ item.name }}</span>
        <div class="teacherInfo">
          <!-- <div class="priceBox">
						<div class="priceIcon">￥</div>
				9.90 
					</div>  -->
          <!-- <span>{{ item.teacher_name }}</span> -->
          <span>{{ `${item.view_count} 浏览` }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "card",
  props: ["list"],
  data() {
    return {};
  },
  methods: {
    tocourse(item) {
      this.$emit("toCourse", item);
    }
  }
};
</script>
<style lang="less" scoped>
.card {
  .cardContainer {
    display: flex;
    padding: 15px 0;
    border-bottom: 0.5px solid #eaeef2;
    .imgContainer {
      position: relative;
      width: 137px;
      height: 76px;
      margin-right: 15px;
      .hot {
        position: absolute;
        width: 60px;
        height: 20px;
        bottom: 0;
        left: 0;
      }
      .classImg {
        border-radius: 8px;
        width: 137px;
        height: 76px;
      }
    }

    .infoContainer {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .className {
        font-size: 14px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
      }
      .teacherInfo {
        font-size: 12px;
        font-weight: 400;
        color: rgba(130, 138, 153, 1);
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        width: calc(100vw - 182px);
        .priceBox {
          font-size: 18px;
          font-family: DINAlternate-Bold, DINAlternate;
          font-weight: bold;
          color: rgba(255, 85, 51, 1);
          line-height: 21px;
          display: flex;
          align-items: center;
          .priceIcon {
            font-size: 16px;
            font-family: DINAlternate-Bold, DINAlternate;
            font-weight: bold;
            color: rgba(255, 85, 51, 1);
            line-height: 18.5px;
            margin-right: 2px;
          }
        }
      }
    }
  }
}
</style>
