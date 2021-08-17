<template>
  <div class="classTab">
    <div
      class="titleSelection"
      v-for="(item, index) in title"
      :key="index"
      @click="selection(index)"
      :class="current == index ? 'active' : ''"
    >
      <div class="circle">
        <span></span>
        <span></span>
      </div>
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
  display: flex;
  .titleSelection {
    display: flex;
    flex-direction: column-reverse;
    margin-right: 27px;
    cursor: pointer;
    &.active {
      .titleText {
        color: #000000;
      }
      .circle span {
        background: #fbbe61;
      }
    }
    .titleText {
      // transition: all 0.5s;
      font-size: 17px;
      // font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #828a99;
    }
    .circle {
      display: flex;
      align-content: center;
      justify-content: center;
      position: relative;
      span {
        display: inline-block;
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: #7f8287;
        // transition: all 0.5s;

        &:first-child {
          opacity: 0.7;
        }
        &:last-child {
          transform: translateX(-3px);
        }
      }
    }
  }
  @media (min-width: 500px) {
    .titleSelection {
      display: flex;
      flex-direction: row;
      margin-right: 27px;
      align-items: center;
      &.active {
        .titleText {
          color: #000000;
        }
        .circle span {
          background: #fbbe61;
        }
      }
      .titleText {
        // font-size: 17px;
        font-size: 20px;
        // font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #828a99;
      }
      .circle {
        display: flex;
        align-content: center;
        justify-content: center;
        position: relative;
        span {
          display: inline-block;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: #999;
          &:first-child {
            opacity: 0.6;
          }
          &:last-child {
            transform: translateX(-7px);
          }
        }
      }
    }
  }
}
</style>
