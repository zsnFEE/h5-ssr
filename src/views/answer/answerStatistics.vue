<template>
  <!--答题统计与答题明细页面-->
  <div
    class="answerStatistics headtop"
    :class="device == 'android' ? 'androidActive' : ''"
  >
    <div class="title">
      <div class="titlelist">
        <div
          class="cursor"
          :class="select == index ? 'selecttitle' : 'activetitle'"
          v-for="(item, index) in titleList"
          :key="index"
          @click="selectTitle(index)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <Statistics
      class="statistics"
      v-show="select == 0"
      ref="Statistics"
    ></Statistics>
    <Details
      v-show="select == 1"
      :detailstyle="1"
      :list="tearcherlist"
    ></Details>
    <!-- 结束答题按钮-->
    <div
      class="endbuttton answerButton_select cursor"
      @click="endTeacherAnswer"
      v-if="againshow == false"
    >
      结束答题
    </div>
    <div class="button" :class="issuebtn == false ? 'issuebtn' : ''">
      <div
        class="issue answerButton_default cursor"
        @click="issue"
        v-if="againshow == true && issuebtn == true"
      >
        发布成绩
      </div>
      <div
        class="again answerButton_select cursor"
        @click="again"
        v-if="againshow == true"
      >
        再来一题
      </div>
    </div>
  </div>
</template>
<script>
import Statistics from "../../components/statistics";
import Details from "../../components/details";
import { isIos, isDevice } from "../../common/util";

import {
  endTeacherAnswer,
  againAnswer,
  answerTeacherDetailed
} from "../../api/common";
import { sendMessage } from "../../api/client";

export default {
  components: {
    Statistics,
    Details
  },
  data() {
    return {
      titleList: [{ name: "答题统计" }, { name: "答题明细" }],
      select: 0,
      clazz_schedule_id: this.$route.query.schedule_id,
      tearcherlist: "",
      againshow: false,
      timer: null,
      issuebtn: true,
      iosFlag: isIos(),
      device: isDevice()
    };
  },

  mounted() {
    let pcmodel = {
      type: "windowSettings",
      width: 300,
      height: 420,
      closeButton: "show",
      isPublish: true
    };
    sendMessage(pcmodel);
    this.timer = setInterval(() => {
      answerTeacherDetailed({ clazz_schedule_id: this.clazz_schedule_id }).then(
        res => {
          if (res.code == 0) {
            this.tearcherlist = res.data;
          } else {
            this.$toast(res.msg || res.message);
          }
        }
      );
    }, 1000);
    window["recvMessage"] = msg => {
      this.recvMessage(msg);
    };
    this.$once("hook:beforeDestroy", () => {
      clearInterval(this.timer);
    });
  },
  methods: {
    recvMessage(msg) {
      if (JSON.parse(msg).operation == "FinishExam") {
        this.endTeacherAnswer();
      }
    },
    selectTitle(index) {
      this.select = index;
    },
    // 发布成绩
    issue() {
      let pcmodel = {
        type: "publishedResults" // 发布成绩
      };
      sendMessage(pcmodel);
      this.issuebtn = false;
    },
    // 再来一题
    again() {
      againAnswer({ clazz_schedule_id: this.clazz_schedule_id }).then(res => {
        if (res.code == 0) {
          let pcmodel = {
            type: "testAgain" // 再来一题
          };
          sendMessage(pcmodel);
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    },
    // 结束答题
    endTeacherAnswer() {
      endTeacherAnswer({ clazz_schedule_id: this.clazz_schedule_id }).then(
        res => {
          if (res.code == 0) {
            this.againshow = true;
            let pcmodel = {
              type: "endTest" // 结束答题
            };
            sendMessage(pcmodel);
          } else {
            this.$toast(res.msg || res.message);
            this.againshow = true;
            let pcmodel = {
              type: "endTest" // 结束答题
            };
            sendMessage(pcmodel);
          }
        }
      );
    }
  },
  watch: {},
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>
<style lang="less" scoped>
.answerStatistics {
  width: 100vw;
  min-height: 100%;
  background: #1e1e1f;
}
.title {
  display: flex;
  width: calc(100vw - 138px);
  margin: auto;
}
.titlelist {
  width: 100%;
  height: 30px;
  background: #494a4d;
  border-radius: 6px;
  display: flex;
  align-items: center;
}
.selecttitle {
  width: 50%;
  height: 26px;
  background: #ffffff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: #3b3b3d;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  font-family: DIN;
}
.activetitle {
  width: 50%;
  height: 26px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: #fff;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  font-family: DIN;
}
// 再来一题和发布成绩按钮
.issuebtn {
  justify-content: center !important;
}
.button {
  width: 240px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 28px;
  left: 0px;
  right: 0px;
  margin: 30px auto 0px;
}
.issue {
  width: 110px;
  height: 32px;
  border-radius: 4px;

  font-size: 12px;
  font-weight: 500;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: DIN;
}
.again {
  width: 110px;
  height: 32px;

  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: #292d33;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: DIN;
}
// 结束答题按钮
.endbuttton {
  width: 200px;
  height: 32px;
  border-radius: 4px;
  margin: 44px auto 0px;
  font-size: 12px;
  font-weight: 500;
  color: #292d33;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 28px;
  left: 0px;
  right: 0px;
  font-family: DIN;
}
.androidActive {
  border-radius: 10px;
}
</style>
