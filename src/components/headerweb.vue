<template>
  <div class="head">
    <div class="new_header">
      <div class="leftBox">
        <div class="back">
          <img
            src="../assets/img/img_logo2.png"
            @click="jump(titleList.home_list.route)"
            class="cursor"
          />
        </div>
        <div class="new_font">
          <div
            v-for="(item, index) in titleList.title_list"
            :key="index"
            :data="item"
            @click="jump(item.route)"
            class="titleBox"
          >
            <div class="titleText cursor">{{ item.name }}</div>
            <div class="theBase" :class="date == index ? '' : 'active'"></div>
          </div>
        </div>
      </div>
      <div class="rightBox">
        <div class="inputBox">
          <!-- <img src="../assets/img/ic_search@2x.png" alt="" /> -->
          <input
            type="text"
            placeholder="兴趣技能"
            @keyup.enter="onKeyPress"
            v-model="search"
          />
        </div>
        <img :src="user.headimgurl" alt="" class="headimg cursor" />
      </div>
    </div>
  </div>
</template>
<script>
import routeList from "../common/routeList";
import { apiInfo } from "../api/common";

export default {
  name: "Myheader",
  props: ["date"],
  data() {
    return {
      titleList: routeList,
      user: {},
      search: ""
    };
  },
  created() {
    apiInfo().then(res => {
      this.user = res.data;
    });
  },
  methods: {
    jump(route) {
      this.$emit("jump", route);
    },
    onKeyPress() {
      this.$emit("search", this.search);
    }
  }
};
</script>
<style lang="less" scoped>
.head {
  width: 100vw;
  height: 60px;
  background: #ffffff;
  position: fixed;
  z-index: 9;
  top: 0;
  .new_header {
    width: 1200px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    margin: 0 auto;
    height: 100%;
    justify-content: space-between;
  }
  .back {
    width: 120px;

    margin-right: 70px;
  }
  .back img {
    width: 100%;
    height: 100%;
  }
  .new_font {
    text-align: center;
    display: flex;
    flex-direction: row;
    .titleBox {
      margin-right: 40px;
      display: flex;
      align-items: center;
      flex-direction: column;
      .titleText {
        margin-top: 9px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000000;
        line-height: 22px;
      }
      .theBase {
        margin-top: 6px;
        width: 30px;
        height: 3px;
        background: linear-gradient(270deg, #4581e6 0%, #68e9c7 100%);
      }
      .theBase.active {
        background: rgba(250, 250, 250, 0);
      }
    }
  }
  .leftBox {
    display: flex;
    align-items: center;
  }
  .rightBox {
    display: flex;
    align-items: center;
    .inputBox {
      width: 280px;
      height: 30px;
      background: #f3f5f9;
      border-radius: 4px;
      display: flex;
      align-items: center;
      img {
        width: 12px;
        height: 12px;
        margin: 0 7px 0 9px;
      }
      input {
        background: #f3f5f9;
        border: 0px;
        height: calc(100% - 14px);
        width: 240px;
        padding: 7px 0;
        font-size: 11px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;

        line-height: 16px;
      }
      input::-webkit-input-placeholder {
        font-size: 11px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #b8bfcc;
      }
    }
    .headimg {
      width: 30px;
      height: 30;
      border-radius: 50%;
      margin-left: 60px;
    }
  }
}
</style>
