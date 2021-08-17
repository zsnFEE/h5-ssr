<template>
  <div class="logistics">
    <div class="first">
      <div class="left">
        <img src="../assets/img/ic-address.png" />
      </div>
      <div class="midde">
        <div class="status">
          <span class="status_font">{{ orderInfo.receiver_name }}</span>
          <span class="status_font">{{
            orderInfo.phone &&
              orderInfo.phone.substr(0, 3) +
                "****" +
                orderInfo.phone.substr(7, 4)
          }}</span>
        </div>
        <div class="detail">
          {{ orderInfo.address }}
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="content" v-show="orderInfo.status != 3">
      <div class="title">物流信息</div>

      <div class="carriage" v-for="(item, index) in list" :key="index">
        <div
          class="travel"
          v-if="index == 0 || item.Action != list[index - 1].Action"
          :class="index == 0 ? 'color' : ''"
        >
          {{ actions[item.Action] }}
        </div>
        <div class="place" :class="index == 0 ? 'color' : ''">
          {{ item.AcceptStation }}
        </div>

        <div class="timenode" :class="index == 0 ? 'color' : ''">
          {{ item.AcceptTime }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "logistics",
  props: ["orderInfo", "list"],
  data() {
    return {
      actions: {
        0: "暂无轨迹信息",
        1: "已揽收",
        2: "运输中",
        202: "派送中",
        211: "已放入快递柜或驿站",
        301: "已签收",
        302: "派件异常后最终签收",
        304: "代收签收",
        311: "快递柜或驿站签收",
        4: "问题件",
        401: "发货无信息",
        402: "超时未签收",
        403: "超时未更新",
        404: "拒收(退件)",
        405: "派件异常",
        406: "退货签收",
        407: "退货未签收",
        412: "快递柜或驿站超时未取",
        7: "已发货"
      }
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.logistics {
  width: 100%;
  .first {
    padding: 15px;
    margin-bottom: 10px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 5px;
    display: flex;
    width: 100%;
    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 9px;
      img {
        width: 23px;
        height: 23px;
        object-fit: cover;
      }
    }
    .midde {
      .status {
        margin-bottom: 9px;
        .status_font {
          font-size: 16px;
          font-weight: 600;
          color: #242216;
          margin-right: 10px;
        }
        .time {
          font-size: 12px;
          font-weight: 600;
          color: #999999;
        }
      }
      .detail {
        font-size: 14px;
        font-weight: 400;
        color: #8a8f99;
      }
    }
    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 9px;
      img {
        width: 5px;
        height: 10px;
        object-fit: cover;
      }
    }
  }
  .content {
    padding: 18px 20px;
    background: #ffffff;
    border-radius: 5px;
    .title {
      font-size: 18px;
      font-weight: 600;
      color: #292d33;
      margin-bottom: 14px;
    }
    .travel {
      font-size: 14px;
      font-weight: 500;
      color: #292d33;
      margin-bottom: 6px;
    }
    .color {
      color: #292d33;
    }
    .carriage {
      color: #8a8f99;
    }
    .place {
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 3px;
    }
    .timenode {
      font-size: 12px;
      font-weight: 400;
      margin-bottom: 20px;
    }
  }
}
</style>
