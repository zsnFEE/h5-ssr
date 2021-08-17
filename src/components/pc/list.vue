<template>
  <div class="list_pc">
    <div class="list" v-for="(item, index) in list" :key="index">
      <div class="list_item" @click="toTrialclass(item.id)">
        <div class="item_left">
          <img :src="item.cdn + item.logo" />
        </div>
        <div class="item_right">
          <div class="item_title">{{ item.name }}</div>
          <div class="item_detail">{{ item.description }}</div>
          <div class="item_price child">
            <span class="punctuation">¥ </span>
            <span class="num">{{ item.price }}</span>
            <span class="line" v-if="item.line_price"
              >¥{{ item.line_price }}</span
            >
          </div>
          <div class="item_coupon">{{ item.coupon }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "lists",
  props: ["list"],
  data() {
    return {};
  },
  methods: {
    toTrialclass(classid) {
      localStorage.setItem("classid", classid);
      this.$router.push({
        path: "/pc/Trialclass",
        query: {
          id: classid,
          Classtype: 2,
          course: 2,
          token: this.$route.query.token,
          category_id: this.$route.query.category_id,
          name: this.$route.query.name
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.list {
  width: 100%;
  margin-bottom: 20px;
}
.list_item {
  // height:132px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  position: relative;
}
// 右边的价格定位start
.child {
  position: absolute;
  bottom: 16px;
}
// 右边的价格定位end
.item_left {
  width: 75px;
  height: 100px;
  border-radius: 4px;
  margin-right: 3%;
}
.item_left img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}
.item_title {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 22px;
}
.item_detail {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(130, 138, 153, 1);
  line-height: 16px;
  margin-top: 4px;
  margin-bottom: 11px;
}

.item_price .punctuation {
  font-size: 16px;
  font-family: DINAlternate-Bold, DINAlternate;
  font-weight: bold;
  color: rgba(255, 85, 51, 1);
  line-height: 18px;
}
.item_price .num {
  font-size: 24px;
  font-family: DINAlternate-Bold, DINAlternate;
  font-weight: bold;
  color: rgba(255, 85, 51, 1);
  line-height: 28px;
  margin-right: 6px;
}
.item_price .line {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(130, 138, 153, 1);
  line-height: 16px;
  text-decoration: line-through;
}
.item_coupon {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 85, 51, 1);
  line-height: 16px;
}
</style>
