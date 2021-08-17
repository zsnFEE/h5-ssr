<template>
  <div class="card">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="cardContainer"
      @click="tocourse(item)"
    >
      <div class="infoBox">
        <div class="imgContainer cover_size">
          <img class="classImg cover_size" :src="item.cdn + item.logo" alt />
          <!-- <img
            class="classImg cover_size"
            src="../assets/img/img_068.png"
            alt
            v-show="item.flag == 2"
          /> -->
        </div>
        <div class="infoContainer ft16">
          <div>
            <span class="className">{{ item.name }}</span>
            <div class="orderState ft12">{{ item.description }}</div>
          </div>
          <div>
            <div class="priceBox price_icon">
              ￥<span class="price_num">{{ item.price }}</span>
              <!-- <s class="discount ft12">{{
                item.money == "" ? "" : `￥${item.money}`
              }}</s> -->
            </div>
            <!-- <div class="tips ft12">
              {{ item.number == 0 ? "" : `剩余优惠名额${item.number}名` }}
            </div> -->
          </div>
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
    flex-direction: column;
    margin-top: 15px;
    padding: 15px 15px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    .infoBox {
      position: relative;
      display: flex;
      flex-direction: row;
      .imgContainer {
        margin-right: 12px;
        .classImg {
          border-radius: 8px;
          object-fit: cover;
        }
      }
      .infoContainer {
        // font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(41, 45, 51, 1);
        line-height: 22.5px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
      }
      .orderState {
        margin-top: 4px;
        // font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(130, 138, 153, 1);
        line-height: 16.5px;
      }
      .priceBox {
        margin-top: 10px;
        .discount {
          margin-left: 6px;
          // font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(130, 138, 153, 1);
          line-height: 16.5px;
        }
      }
      .tips {
        // font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 85, 51, 1);
        line-height: 16.5px;
      }
    }
  }
}
</style>
