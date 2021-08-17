<template>
  <div class="temp">
    <div
      class="backgroundColor"
      :class="device == 'android' ? 'androidActive' : ''"
    ></div>
    <header>
      <img
        src="../../assets/img/btn-home-close.png"
        alt=""
        @click="close"
        v-if="device == 'iphone' || device == 'android' || device == 'ipad'"
      />
      <div>
        <span class="title ft12" :class="iosFlag ? '' : 'weightActive'"
          >答题用时</span
        >
        <span class="content ft18">{{ useTime }}</span>
      </div>
      <div>
        <span class="title ft12" :class="iosFlag ? '' : 'weightActive'"
          >正确率</span
        >
        <span class="content ft18">{{ accuracy }}</span>
      </div>
    </header>
    <div class="body">
      <div
        v-for="(items, index) in answersList"
        :key="index"
        class="optionBox"
        :class="(index + 1) % 5 == 0 ? 'noMargin' : ''"
      >
        <span class="number ft12">{{ index + 1 }}</span>
        <span
          class="option ft12"
          :class="[
            items.is_right == 0 ? 'error' : '',
            iosFlag ? '' : 'weightActive'
          ]"
        >
          {{ answerStandard(items) }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { myAnswerStats } from "../../api/common";
import { isIos, isDevice } from "../../common/util";
import { sendMessage } from "../../api/client";

export default {
  data() {
    return {
      scheduleId: this.$route.query.schedule_id,
      answersList: [],
      useTime: "00:00",
      accuracy: "0%",
      device: isDevice(),
      iosFlag: isIos(),
      topicId: this.$route.query.topic_id ? this.$route.query.topic_id : ""
    };
  },
  mounted() {
    let pcmodel = {
      type: "windowSettings",
      width: 300,
      height: 280,
      closeButton: "show"
    };
    sendMessage(pcmodel);
    let item = {};
    if (this.topicId != "") {
      item = { schedule_id: this.scheduleId, topic_id: this.topicId };
    } else {
      item = { schedule_id: this.scheduleId };
    }
    myAnswerStats(item).then(res => {
      if (res.code == 0) {
        this.useTime = res.data.use_time;
        this.accuracy = res.data.accuracy;
        this.answersList = res.data.answers;
      } else {
      }
    });
  },
  methods: {
    close() {
      dsBridge.call("closeQuestion", "", function(v) {});
    },
    answerStandard(items) {
      return items.answer.toString();
    }
  }
};
</script>

<style lang="less" scoped>
::-webkit-scrollbar {
  width: 0;
}

.temp {
  width: 100%;
  height: 100%;
  z-index: -1;
  .backgroundColor {
    background: #1e1e1f;
  }
  .backgroundColor.androidActive {
    border-radius: 10px;
  }
  header {
    position: relative;
    width: 240px;
    padding: 50px calc(calc(100% - 240px) / 2) 23px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      position: absolute;
      width: 30px;
      height: 30px;
      top: 10px;
      right: 10px;
    }
    div {
      display: flex;
      align-items: center;
      flex-direction: row;
      .title {
        font-weight: 500;
        color: #ffffff;
        line-height: 16px;
      }
      .weightActive {
        font-weight: bold;
      }
      .content {
        margin-left: 8px;
        font-family: DINAlternate-Bold, DINAlternate;
        font-weight: bold;
        color: #ffc900;
        line-height: 21px;
      }
    }
  }
  .body {
    padding: 0 calc(calc(100% - 240px) / 2) 10px;
    height: calc(100% - 104px);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
    overflow-y: auto;
    .optionBox {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
      width: 9px;
      height: 40px;
      margin-right: 48px;
      margin-top: 20px;
      .number {
        font-weight: 400;
        color: #9b9b9b;
        line-height: 16px;
      }
      .option {
        font-weight: 500;
        color: #ffffff;
        line-height: 16px;
      }
      .weightActive {
        font-weight: bold;
      }
      .error {
        color: #f74a4a;
      }
    }
    .noMargin {
      margin-right: 0px;
    }
  }
}
</style>
