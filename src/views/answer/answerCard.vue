<template>
  <div class="temp" :class="customerType == 1 ? 'headtop' : ''">
    <div
      class="backgroundColor"
      :class="device == 'android' ? 'androidActive' : ''"
    ></div>
    <div
      class="title ft14"
      :class="[
        iosFlag ? '' : 'weightActive',
        device == 'iphone' || device == 'android' ? 'mobileActive' : ''
      ]"
    >
      <div v-if="customerType == 1" class="tips ft12">
        点击选项，预设正确答案
      </div>
      <div v-if="customerType == 1">答题</div>
      <div v-else>答题卡</div>
    </div>
    <div
      class="optionBox"
      :class="device == 'iphone' || device == 'android' ? 'mobileActive' : ''"
    >
      <div
        v-for="(items, index) in optionList.slice(0, optionLength)"
        :key="index"
        class="option ft14 cursor"
        :class="[
          (index + 1) % 4 == 0 ? 'noMargin' : '',
          items.Select ? 'active' : ''
        ]"
        @click="select(index)"
      >
        <span :class="iosFlag ? '' : 'weightActive'">{{ items.option }}</span>
      </div>
      <div
        class="option cursor"
        @click="optionAdd()"
        v-if="optionLength < maxOption && customerType == 1"
        :class="[(optionLength + 1) % 4 == 0 ? 'noMargin' : '']"
      >
        <img src="../../assets/img/ic_add_white.png" />
      </div>
      <div
        class="option noMargin cursor"
        @click="optionReduce()"
        v-if="optionLength > minOption && customerType == 1"
        :class="[(optionLength + 2) % 4 == 0 ? 'noMargin' : '']"
      >
        <img src="../../assets/img/ic_minus_white.png" />
      </div>
    </div>
    <div class="bottomBox" :class="device == 'android' ? 'androidActive' : ''">
      <div
        v-if="device == 'iphone' || device == 'android' ? 'mobileActive' : ''"
        class="moveButton"
        :class="iosFlag ? '' : 'weightActive'"
      >
        <button class="moveCollect ft12 cursor" @click="pickupTopic">
          收起
        </button>
        <button class="moveSubmit ft12 cursor" @click="pcSubmit(0)">
          提交
        </button>
      </div>
      <button
        class="pcButton ft12 cursor"
        :class="[
          iosFlag ? '' : 'weightActive',
          moveSubmit() == '' && customerType == 1 ? 'nothing' : ''
        ]"
        v-else
        @click="pcSubmit(0)"
      >
        {{ customerType == 1 ? `开始答题` : `提交` }}
      </button>
    </div>
  </div>
</template>

<script>
import { sendMessage } from "../../api/client";
import { isIos, isDevice } from "../../common/util";
import option from "../../common/option";
import {
  setTeacherAnswer,
  getTeacherAnswer,
  setStudentAnswer
} from "../../api/common";

export default {
  data() {
    return {
      scheduleId: this.$route.query.schedule_id,
      iosFlag: isIos(),
      customerType: this.$route.query.role,
      device: isDevice(),
      // device: "ipad",
      optionList: option.optionList,
      optionLength: 4,
      startTime: 0,
      maxOption: 7,
      minOption: 2
    };
  },
  mounted() {
    let pcmodel = {};
    if (this.customerType == 1) {
      pcmodel = {
        type: "windowSettings",
        width: 300,
        height: 300,
        closeButton: "show"
      };
    } else {
      pcmodel = {
        type: "windowSettings",
        width: 300,
        height: 280,
        closeButton: "hide"
      };
    }
    sendMessage(pcmodel);

    window["recvMessage"] = msg => {
      this.pcSubmit(1);
    };
    let that = this;
    dsBridge.registerAsyn("FinishExam", function(arg1, arg2, arg3) {
      that.pcSubmit(1);
    });
    if (this.customerType == 0) {
      getTeacherAnswer({ clazz_schedule_id: this.scheduleId }).then(res => {
        if (res.code == 0) {
          this.optionLength = res.data.option;
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    }
  },
  methods: {
    pickupTopic() {
      dsBridge.call("pickuptopic", "", function(v) {});
    },
    select(index) {
      this.optionList[index].Select = !this.optionList[index].Select;
    },
    optionAdd() {
      this.optionLength++;
    },
    optionReduce() {
      this.optionLength--;
      this.optionList[this.optionLength].Select = false;
    },
    pcSubmit(index) {
      if (this.customerType == 0) {
        let SelectList = this.moveSubmit();
        setStudentAnswer({
          clazz_schedule_id: this.scheduleId,
          answer: SelectList
        }).then(res => {
          let message = "";
          if (res.code == 0) {
            if (res.data.result == 0) {
              message = "很遗憾，继续努力吧";
            } else if (res.data.result == 1) {
              message = "恭喜你，回答正确！";
            } else {
              message = "答题结束了，继续努力吧";
            }
          } else {
            message = res.msg || res.message;
          }

          let model = { message: message };

          if (index == 0) {
            let pcmodel = { type: "studentSubmit", result: message };
            dsBridge.call("submitresult", JSON.stringify(model), function(
              v
            ) {});
            sendMessage(pcmodel);
          } else {
            let pcmodel = { type: "finishAnswer", result: message };
            dsBridge.call("finishAnswer", JSON.stringify(model), function(
              v
            ) {});
            sendMessage(pcmodel);
          }
        });
      } else {
        let SelectList = this.moveSubmit();
        if (SelectList != "") {
          setTeacherAnswer({
            clazz_schedule_id: this.scheduleId,
            option: this.optionLength,
            answer: SelectList
          }).then(res => {
            if (res.code == 0) {
            } else {
              this.$toast(res.msg || res.message);
            }
            let pcmodel = {
              type: "teacherSubmit",
              result: ""
            };
            sendMessage(pcmodel);
          });
        }
      }
    },
    moveSubmit() {
      let SelectList = [];
      for (let i = 0; i < this.optionList.length; i++) {
        if (this.optionList[i].Select) {
          SelectList.push(this.optionList[i].option);
        }
      }
      return SelectList.toString();
    }
  }
};
</script>

<style lang="less" scoped>
::-webkit-scrollbar {
  display: none;
}
.temp {
  padding: 10px 0px 0px;
  width: 100%;
  height: calc(100vh - 10px);
  display: flex;
  align-items: center;
  flex-direction: column;
  .backgroundColor {
    background: #1e1e1f;
  }
  .backgroundColor.androidActive {
    border-radius: 10px;
  }
  .title {
    background: #1e1e1f;
    position: fixed;
    height: 40px;
    font-weight: 500;
    color: #ffffff;
    line-height: 20px;
    // text-align: center;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    width: 198px;
    padding-bottom: 10px;
    .tips {
      font-weight: 400;
      color: #9b9b9b;
      line-height: 17px;
      margin-top: 4px;
    }
  }
  .title.mobileActive {
    width: 196px;
    height: 30px;
    align-items: flex-start;
  }
  .weightActive {
    font-weight: bold;
  }
  .optionBox {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 196px;
    margin-top: 58px;
    margin-bottom: 78px;
    overflow-y: auto;
    .option {
      width: 38px;
      height: 38px;
      border: 1px solid #a5a4a2;
      color: #ffffff;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 12px;
      margin-top: 12px;
      span {
        line-height: 24px;
      }
      img {
        width: 12px;
        height: 12px;
      }
    }
    .noMargin {
      margin-right: 0;
    }
    .active {
      width: 40px;
      height: 40px;
      border: 0px;
      background: linear-gradient(131deg, #ffd500 0%, #ffbf00 100%);
      color: #292d33;
    }
  }
  .optionBox.mobileActive {
    margin-top: 33px;
    margin-bottom: 66px;
  }
  .bottomBox {
    background: #1e1e1f;
    padding-top: 10px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .moveButton {
      width: 196px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      height: 36px;
      font-weight: 500;
      line-height: 22px;
      font-family: DIN, PingFangSC-Medium, PingFang SC;
      .moveCollect {
        width: 92px;
        background: rgba(165, 164, 162, 0);
        color: #fff;
        border: 1px solid #a5a4a2;
        border-radius: 4px;
      }
      .moveSubmit {
        width: 92px;
        background: linear-gradient(131deg, #ffd500 0%, #ffbf00 100%);
        color: #000000;
        border: 0px;
        border-radius: 4px;
      }
    }
    .pcButton {
      width: 200px;
      background: linear-gradient(131deg, #ffd500 0%, #ffbf00 100%);
      border-radius: 4px;
      border: 0;
      font-family: DIN, PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #292d33;
      height: 32px;
      margin-bottom: 36px;
    }
    .weightActive {
      font-weight: bold;
    }
    .nothing {
      background: #676b73;
      color: rgba(255, 255, 255, 0.5);
    }
  }
  .bottomBox.androidActive {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
}
</style>
