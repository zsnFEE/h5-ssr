<template>
  <div class="temp">
    <div class="backgroundColor" v-title data-title="选择收货地址"></div>
    <!-- <header>
      <div class="title title_box">
        <img
          @click="toBack"
          src="../../../assets/img/ic_back.png"
          class="titleArrow title_arrow"
        />
        <div class="titleText title_text">选择收货地址</div>
        <div class="titleDv "></div>
      </div>
    </header> -->
    <body>
      <div v-for="(item, index) in addressList" :key="index" class="addressBox">
        <div @click="choice(index)" class="InfoBox">
          <div class="personalInfo">
            <div class="personalNameInfo">{{ item.name }}</div>
            <div>
              {{ item.phone.substr(0, 3) + "****" + item.phone.substr(7, 4) }}
            </div>
          </div>
          <div class="addressInfo">{{ `${item.address}` }}</div>
        </div>
        <!-- <button @click="modify(item.id, index)">
          编辑
        </button> -->
      </div>
      <button class="determine" @click="add">
        添加新地址
      </button>
    </body>
  </div>
</template>

<script>
import { getMyAddress } from "../../../api/common";

export default {
  data() {
    return {
      addressList: []
    };
  },
  created() {
    getMyAddress().then(res => {
      if (res.code == 0) {
        this.addressList = res.data;
      } else {
        this.$toast(res.msg || res.message);
      }
    });
  },
  methods: {
    add() {
      this.$router.push({
        path: "/order/phone/writeAddressPhone",
        query: {
          addressIndex: localStorage.getItem("WebpageId"),
          token: this.$route.query.token
        }
      });
    },
    choice(index) {
      if (localStorage.getItem("WebpageId") == -1) {
        this.$router.push({
          path: "/order/phone/createOrderAddressPhone",
          query: {
            addressIndex: index,
            token: this.$route.query.token,
            classType: localStorage.getItem("classType")
          }
        });
      }
    },
    modify(id, index) {
      this.$router.push({
        path: "/order/phone/writeAddressPhone",
        query: {
          addressIndex: index,
          addressId: id,
          token: this.$route.query.token
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.temp {
  width: 100%;
  min-height: 100%;
  // background: rgba(243, 245, 249, 1);
  .title {
    .titleDv {
      width: 18px;
    }
  }
  body {
    padding: 15px;
    .addressBox {
      width: calc(100% -30px);
      border-radius: 6px;
      padding: 18px 15px;
      background: rgba(255, 255, 255, 1);
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      .InfoBox {
        // width: calc(100% - 80.5px);
        width: 100%;
        .personalInfo {
          font-size: 18px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(41, 45, 51, 1);
          line-height: 25px;
          display: flex;
          .personalNameInfo {
            word-wrap: break-word;
            max-width: 25vw;
            width: 25vw;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-right: 15px;
          }
        }
        .addressInfo {
          margin-top: 6px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(138, 143, 153, 1);
          line-height: 20px;
          word-wrap: break-word;
        }
      }
      button {
        background: rgba(255, 255, 255, 1);
        border: 0px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(138, 143, 153, 1);
        padding: 0px;
        min-width: 40px;
        padding-left: 15px;
        border-left: 0.5px solid #dae3f2;
        margin-left: 33px;
      }
    }
    .determine {
      width: 100%;
      border-radius: 6px;
      padding: 18px 0px;
      background: rgba(255, 255, 255, 1);
      border: 0px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 600;
      color: rgba(255, 85, 51, 1);
    }
  }
}
</style>
