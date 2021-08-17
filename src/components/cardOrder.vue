<template>
  <div class="card">
    <div
      v-for="(item, indexs) in list"
      :key="indexs"
      class="cardContainer"
      :class="type == 1 ? 'phone' : 'cursor'"
      @click="tocourse(item)"
    >
      <div class="topBox ft12">
        <span>{{ names(item.goods) }}</span>
        <span class="borderName">{{ item.status_name }}</span>
      </div>
      <div class="infoBox" v-for="(items, index) in item.goods" :key="index">
        <!-- <div class="imgContainer cover_size">
          <img class="classImg cover_size" :src="items.cdn + items.logo" alt />
        </div> -->
        <div class="classInfoBox">
          <!-- <div class="infoContainer ft16">
            <span class="className">{{ items.name }}</span>
            <div class="orderState ft12">
              {{ items.description }}
            </div>
          </div> -->
          <div class="money">
            <span>金额</span>
            <span class="num">￥{{ items.real_price }}</span>
          </div>
          <div class="priceBox price_icon" v-show="item.goods.length == 1">
            <span class="price_num">￥{{ item.price }}</span>
            <!-- <span class="icon">￥</span> -->
            <span class="font">实付：</span>
          </div>
        </div>
      </div>
      <div class="priceBox price_icon" v-show="item.goods.length > 1">
        <span class="price_num">￥{{ item.price }}</span>
        <!-- <span class="icon">￥</span> -->
        <span class="font">实付：</span>
      </div>
      <div class="receiving ft13" v-if="item.status == 7 && item.sign_at > 0">
        <button @click.stop="toConfirm(item)">确认收货</button>
      </div>
      <div class="dialog" v-if="item.status == 7 && item.sign_at > 0">
        <div class="triangle"></div>
        <div class="box">
          <span>运输中 </span>
          <span>圆通快递：</span>
          <span>山西省大同市大同县大同镇山西省大同市大同县大同镇大</span>
        </div>
      </div>
      <!-- <div class="topay">
        <div class="font">订单在14:32之后失效</div>
        <div class="button">去支付</div>
      </div> -->
    </div>
    <!--  -->
  </div>
</template>
<script>
export default {
  name: "card",
  props: ["list", "type"],
  data() {
    return {};
  },
  methods: {
    names(info) {
      return info.map(item => item.name).join(" ");
    },
    toConfirm(item) {
      this.$emit("toConfirm", item.id);
    },
    tocourse(item) {
      this.$emit("toCourse", item);
    }
  }
};
</script>
<style lang="less" scoped>
.money {
  font-size: 13px;
  font-weight: 400;
  color: #828a99;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .num {
    font-size: 15px;
    font-weight: bold;
    color: #828a99;
  }
}
.card {
  .phone {
    margin-bottom: 15px !important;
  }
  .cardContainer {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    padding: 15px 15px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    .topBox {
      display: flex;
      justify-content: space-between;

      font-size: 16px;
      // font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #292d33;

      margin-bottom: 8px;
      .borderName {
        color: rgba(130, 138, 153, 1);
      }
    }
    .infoBox {
      position: relative;
      display: flex;
      flex-direction: row;
      // margin-top: 10px;
      .imgContainer {
        position: relative;
        margin-right: 12px;
        .classImg {
          border-radius: 8px;
          object-fit: cover;
        }
      }
      .classInfoBox {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .infoContainer {
        // font-size: 16px;
        // font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(41, 45, 51, 1);
        line-height: 22.5px;
      }
      .orderState {
        margin-top: 4px;
        // font-size: 12px;
        // font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(130, 138, 153, 1);
        line-height: 20px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .receiving {
      // margin-top: 20px;
      // padding-top: 20px;
      display: flex;
      flex-direction: row-reverse;
      align-items: flex-end;
      padding-bottom: 5px;
      // border-top: #dae3f2 1px solid;
      button {
        height: 28px;
        width: 82px;
        border: 2px solid #ff7300;
        padding: 0;
        // font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ff7300;
        background: #ffffff;
        border-radius: 14px;
        line-height: 24px;
      }
    }

    .priceBox {
      display: flex;
      flex-direction: row-reverse;
      margin-top: 19px;
      // margin-bottom: 15px;
      align-items: center;
      .icon {
        height: 28px;
        line-height: 32px;
      }
      .font {
        font-size: 16px;
        font-weight: 500;
        color: #828a99;
      }
      .price_num {
        font-size: 17px;
        // font-family: DINAlternate-Bold, DINAlternate;
        font-weight: bold;
        color: #292d33;
      }
    }
    .dialog {
      margin-top: 8px;
      width: 100%;
      position: relative;
      .box {
        width: auto;
        padding: 6px 4px 6px 12px;
        background: #ecebeb;
        border-radius: 4px;
        font-size: 13px;
        // font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #626364;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .triangle {
        position: absolute;
        bottom: 30px;
        right: 30px;
        width: 0;
        height: 0;
        border-left: 16px solid transparent;
        border-right: 16px solid transparent;
        border-bottom: 9px solid #ecebeb;
      }
    }
    .topay {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .font {
        font-size: 13px;
        font-weight: 400;
        color: #fd9620;
      }
      .button {
        box-sizing: border-box;
        padding: 4px 13px;
        background: #fd9620;
        border-radius: 4px;
        font-size: 15px;
        font-weight: 500;
        color: #ffffff;
        line-height: 21px;
      }
    }
  }
}
</style>
