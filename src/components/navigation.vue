<template>
  <div class="classTab">
    <div
      class="titleSelection"
      v-for="(item, index) in title"
      :key="index"
      @click="selection(index)"
      :class="current == index ? 'active' : ''"
    >
      <div class="titleText ">
        {{ item.name }}
      </div>
      <div class="titleSign" v-if="current == index"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["current"],
  data() {
    return {
      title: [
        {
          id: "1",
          name: "直播课"
        },
        {
          id: "2",
          name: "录播课"
        }
        // {
        //   id: "3",
        //   name: "AI课"
        // }
      ]
    };
  },
  methods: {
    selection(index) {
      this.$emit("selectTab", index);
    }
  }
};
</script>

<style lang="less" scoped>
.classTab {
  width: 100%;
  display: flex;
  height: 50px;
  background: #fff;
  .titleSelection {
    display: flex;
    flex-direction: column-reverse;
    margin-right: 15px;
    cursor: pointer;
    &.active {
      .titleText {
        font-size: 17px;
        font-weight: 600;
        color: #292d33;
        line-height: 24px;
      }
    }
    .titleText {
      font-size: 14px;
      font-weight: 400;
      color: #666666;
      line-height: 24px;
    }
  }
  // pc和ipad端
  @media (min-width: 500px) {
    .titleSelection {
      display: flex;
      flex-direction: row;
      margin-right: 15px;
      align-items: center;
      &.active {
        .titleText {
          font-size: 17px;
          font-weight: 600;
          color: #292d33;
          line-height: 24px;
        }
      }
      .titleText {
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        line-height: 24px;
      }
    }
  }
}
</style>
