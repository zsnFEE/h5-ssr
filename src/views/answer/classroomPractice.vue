<template>
  <div
    class="temp"
    :class="device == 'iphone' || device == 'android' ? 'mobileActive' : ''"
  >
    <div
      class="backgroundColor"
      :class="device == 'android' ? 'androidActive' : ''"
    ></div>

    <div
      class="topicBox"
      :class="device == 'iphone' || device == 'android' ? 'mobileActive' : ''"
      @scroll="scrollEvent($event)"
    >
      <header
        :class="device == 'iphone' || device == 'android' ? 'mobileActive' : ''"
      >
        <span class="titleText ft18" :class="iosFlag ? '' : 'weightActive'"
          >{{ nowTopic + 1 }}/{{ maxTopic }}</span
        >
      </header>
      <div class="topicDescribe ft14" :class="iosFlag ? '' : 'weightActive'">
        {{ `${nowTopic + 1}. ` }}
        {{ topicInfo[nowTopic] && topicInfo[nowTopic].content }}
      </div>
      <img
        crossorigin="anonymous"
        :src="
          `${topicInfo[nowTopic].cdn}${
            topicInfo[nowTopic].img_url
          }?time=${new Date().getTime()}`
        "
        v-if="topicInfo[nowTopic] && topicInfo[nowTopic].img_url != ''"
        class="topicImg"
        :class="device == 'iphone' || device == 'android' ? 'mobileActive' : ''"
      />
      <div class="optionText ft14">
        <div
          v-for="(items, index) in topicInfo[nowTopic] &&
            topicInfo[nowTopic].options"
          :key="index"
        >
          {{ items.option + ". " + items.content }}
        </div>
      </div>
      <div
        class="scrollMask"
        v-if="maskShow"
        :class="device == 'iphone' || device == 'android' ? 'mobileActive' : ''"
      ></div>
    </div>
    <div
      class="optionBox"
      :class="[
        device == 'iphone' || device == 'android' ? 'mobileActive' : '',
        device == 'android' ? 'androidActive' : ''
      ]"
    >
      <div
        class="optionList"
        :class="device == 'iphone' || device == 'android' ? 'mobileActive' : ''"
      >
        <div
          class="option ft14 cursor"
          @click="select(index)"
          v-for="(items, index) in optionList.slice(
            0,
            topicInfo[nowTopic] && topicInfo[nowTopic].options.length
          )"
          :class="[
            topicInfo[nowTopic] &&
            topicInfo[nowTopic].options.length == index + 1
              ? 'end'
              : '',
            topicInfo[nowTopic] &&
            topicInfo[nowTopic].options.length >= 7 &&
            device != 'iphone' &&
            device != 'android'
              ? 'max'
              : '',
            items.Select ? 'active' : '',
            iosFlag ? '' : 'weightActive',
            device == 'iphone' || device == 'android' ? 'mobileActive' : ''
          ]"
          :key="index"
        >
          <span>{{ items.option }}</span>
        </div>
      </div>
      <div
        class="buttonBox"
        :class="device == 'iphone' || device == 'android' ? 'mobileActive' : ''"
      >
        <button
          class="answerButton_default cursor"
          :class="[
            device == 'iphone' || device == 'android' ? 'mobileActive' : '',
            iosFlag ? '' : 'weightActive',
            nowTopic == 0 ? 'first' : ''
          ]"
          @click="lastQuestion"
        >
          上一题
        </button>
        <button
          class="answerButton_select cursor"
          :class="[
            device == 'iphone' || device == 'android' ? 'mobileActive' : '',
            iosFlag ? '' : 'weightActive'
          ]"
          @click="nextQuestion"
        >
          {{ nowTopic + 1 == maxTopic ? "提交" : "下一题" }}
        </button>
      </div>
    </div>
    <div class="tipsBox" v-if="tipsShow" @touchmove.prevent>
      <transition name="alert_box">
        <div class="popBox">
          <div class="tipsText ft14">你有题目未作答，确定要提交吗？</div>
          <div class="buttonBox">
            <button
              class="answerButton_default cursor"
              @click="tipsShow = false"
              :class="[
                device == 'iphone' || device == 'android' ? 'mobileActive' : '',
                iosFlag ? '' : 'weightActive'
              ]"
            >
              取消</button
            ><button
              class="answerButton_select cursor"
              @click="handIn(0)"
              :class="[
                device == 'iphone' || device == 'android' ? 'mobileActive' : '',
                iosFlag ? '' : 'weightActive'
              ]"
            >
              确定
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { isIos, isDevice } from "../../common/util";
import option from "../../common/option";
import { getcoursetopic, saveAnswer, myAnswers } from "../../api/common";
import { sendMessage } from "../../api/client";

function debounce(func, wait = 300) {
  //可以放入项目中的公共方法中进行调用
  let timeout;
  return function(event) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.call(this, event);
    }, wait);
  };
}

export default {
  data() {
    return {
      iosFlag: isIos(),
      maxTopic: 1,
      nowTopic: 0,
      device: isDevice(),
      // device: "pc",
      // device: "android",
      optionList: option.optionList,
      maskShow: true,
      topicInfo: {},
      scheduleId: this.$route.query.schedule_id,
      topicId: this.$route.query.topic_id,
      myAnswersList: [],
      tipsShow: false
    };
  },
  mounted() {
    let pcmodel = {
      type: "windowSettings",
      width: 345,
      height: 680,
      closeButton: "hide"
    };
    sendMessage(pcmodel);
    let that = this;

    window["recvMessage"] = msg => {
      this.handIn(1);
    };
    dsBridge.registerAsyn("FinishExam", function(arg1, arg2, arg3) {
      that.handIn(1);
    });
    let item = {};
    if (this.topicId != "ALL") {
      item = { schedule_id: this.scheduleId, topic_id: this.topicId };
    } else {
      item = { schedule_id: this.scheduleId };
    }
    getcoursetopic(item).then(res => {
      if (res.code == 0) {
        this.maxTopic = res.data.length;
        this.topicInfo = res.data;
        for (let i = 0; i < this.maxTopic; i++) {
          this.myAnswersList.push({
            answer: [],
            topic_id: this.topicInfo[i].id
          });
        }
        myAnswers(item).then(res => {
          if (res.code == 0) {
            for (let i = 0; i < this.myAnswersList.length; i++) {
              for (let j = 0; j < res.data.length; j++) {
                if (this.myAnswersList[i].topic_id == res.data[j].topic_id) {
                  this.myAnswersList[i].answer = res.data[j].answer;
                }
              }
            }

            this.updateOptionList(0);
          } else {
            this.$toast(res.msg || res.message);
          }
        });
      } else {
        this.$toast(res.msg || res.message);
      }
    });
  },
  methods: {
    updateOptionList(index) {
      for (let i = 0; i < option.optionList.length; i++) {
        option.optionList[i].Select = false;
      }
      for (let i = 0; i < this.myAnswersList[index].answer.length; i++) {
        option.optionList[
          this.myAnswersList[index].answer[i].charCodeAt() - 65
        ].Select = true;
      }
    },
    select(index) {
      this.optionList[index].Select = !this.optionList[index].Select;
    },
    handIn(index) {
      let SelectList = [];
      for (let i = 0; i < this.optionList.length; i++) {
        if (this.optionList[i].Select) {
          SelectList.push(this.optionList[i].option);
        }
      }
      let message = "";
      saveAnswer({
        schedule_id: this.scheduleId,
        topic_id: this.topicInfo[this.nowTopic].id,
        answer: SelectList.toString() == "" ? ["-"] : SelectList,
        is_commit: 1
      }).then(res => {
        if (res.code == 0) {
          this.myAnswersList[this.nowTopic].answer = SelectList;
          this.tipsShow = false;
        } else {
          message = res.msg || res.message;
          this.$toast(res.msg || res.message);
        }
        if (index == 0) {
          if (message == "") {
            dsBridge.call("submitresult", "", function(v) {});
          } else {
            let model = { message: message };
            dsBridge.call("submitresult", JSON.stringify(model), function(
              v
            ) {});
          }

          let pcmodel = { type: "studentSubmit", result: message };
          sendMessage(pcmodel);
        } else {
          if (message == "") {
            dsBridge.call("finishAnswer", "", function(v) {});
          } else {
            let model = { message: message };
            dsBridge.call("finishAnswer", JSON.stringify(model), function(
              v
            ) {});
          }

          let pcmodel = { type: "finishAnswer", result: message };
          sendMessage(pcmodel);
        }
      });
    },
    turnPage(Boole) {
      let SelectList = [];
      for (let i = 0; i < this.optionList.length; i++) {
        if (this.optionList[i].Select) {
          SelectList.push(this.optionList[i].option);
        }
      }

      if (SelectList.toString() == "") {
        saveAnswer({
          schedule_id: this.scheduleId,
          topic_id: this.topicInfo[this.nowTopic].id,
          answer: ["-"],
          is_commit: 0
        }).then(res => {
          if (res.code == 0) {
            this.myAnswersList[this.nowTopic].answer = SelectList;
            if (Boole) {
              this.nowTopic++;
            } else {
              this.nowTopic--;
            }

            this.updateOptionList(this.nowTopic);
          } else {
            this.$toast(res.msg || res.message);
          }
        });
      } else if (
        SelectList.toString() !=
        this.myAnswersList[this.nowTopic].answer.toString()
      ) {
        saveAnswer({
          schedule_id: this.scheduleId,
          topic_id: this.topicInfo[this.nowTopic].id,
          answer: SelectList,
          is_commit: 0
        }).then(res => {
          if (res.code == 0) {
            this.myAnswersList[this.nowTopic].answer = SelectList;
            if (Boole) {
              this.nowTopic++;
            } else {
              this.nowTopic--;
            }

            this.updateOptionList(this.nowTopic);
          } else {
            this.$toast(res.msg || res.message);
          }
        });
      } else {
        if (Boole) {
          this.nowTopic++;
        } else {
          this.nowTopic--;
        }
        this.updateOptionList(this.nowTopic);
      }
    },
    nextQuestion: debounce(function() {
      if (this.nowTopic + 1 < this.maxTopic) {
        this.turnPage(true);
      } else {
        let flag = false;
        for (let i = 0; i < this.maxTopic; i++) {
          if (i == this.maxTopic - 1) {
            let SelectList = [];
            for (let i = 0; i < this.optionList.length; i++) {
              if (this.optionList[i].Select) {
                SelectList.push(this.optionList[i].option);
              }
            }
            if (SelectList == "") {
              flag = true;
            }
          } else if (this.myAnswersList[i].answer.length == 0) {
            flag = true;
            break;
          }
        }
        if (flag) {
          this.tipsShow = true;
        } else {
          this.handIn(0);
        }
      }
    }),
    lastQuestion: debounce(function() {
      if (this.nowTopic > 0) {
        this.turnPage(false);
      }
    }),
    scrollEvent(e) {
      this.maskShow = false;
      setTimeout(() => {
        this.maskShow = true;
      }, 1000);
    }
  }
};
</script>
<style lang="less" scoped>
.temp {
  padding: 0 3px;
  width: calc(100% -6px);
  height: calc(100vh - 140px);
  // padding-top: 59px;
  .backgroundColor {
    background: #1e1e1f;
  }
  .backgroundColor.androidActive {
    border-radius: 7px;
  }

  .topicBox {
    header {
      padding-top: 24px;
      padding-bottom: 10px;
      // position: fixed;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      .titleText {
        font-weight: 500;
        color: #ffffff;
        line-height: 25px;
      }
      .weightActive {
        font-weight: bold;
      }
    }
    header.mobileActive {
      padding-top: 15px;
    }
    height: 100%;
    min-width: calc(100% - 34px);
    padding: 0 9px 0 17px;
    overflow-y: scroll;
    .scrollMask {
      position: fixed;
      z-index: 10;
      width: 12px;
      top: 0px;
      right: 0;
      bottom: 140px;
      background: #1e1e1f;
    }
    .scrollMask.mobileActive {
      bottom: 70px;
      border-top-right-radius: 6px;
    }
    .topicDescribe {
      margin-top: 10px;
      color: #ffffff;
      font-weight: 500;
      color: #ffffff;
      line-height: 25px;
      // display: flex;
      // flex-direction: row;
      word-wrap: break-word;

      span {
        width: 8px;
        height: 1px;
        opacity: 0;
      }
    }
    .weightActive {
      font-weight: bold;
    }
    .topicImg {
      width: 100%;
      margin-top: 30px;
    }
    .topicImg.mobileActive {
      width: 50vw;
      margin-left: calc(calc(100% - 50vw) / 2);
    }
    .optionText {
      margin-top: 8px;
      font-weight: 500;
      color: #ffffff;
      line-height: 25px;
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 10px;
      div {
        margin-top: 12px;
        margin-right: 30px;
        max-width: calc(100%);
        word-wrap: break-word;
      }
    }
    .weightActive {
      font-weight: bold;
    }
  }
  .topicBox.mobileActive {
    width: calc(100% - 44px);
    padding: 0 14px 0 22px;
  }
  .optionBox {
    background: #303033;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 140px;
    display: flex;
    align-items: center;
    flex-direction: column;
    .optionList {
      margin-top: 15px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .option {
        min-width: 40px;
        min-height: 40px;
        border-radius: 20px;
        background: rgba(165, 164, 162, 0);
        color: #fff;
        border: 1px solid #a5a4a2;
        font-weight: 500;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        margin-right: 13px;
      }
      .mobileActive {
        margin-right: 12px;
      }
      .weightActive {
        font-weight: bold;
      }
      .max {
        margin-right: 4px;
      }
      .end {
        margin-right: 0px;
      }
      .active {
        border: 0px;
        background: linear-gradient(131deg, #ffd500 0%, #ffbf00 100%);
        color: #292d33;
      }
    }
    .optionList.mobileActive {
      margin-top: 0px;
    }
    .buttonBox {
      margin-top: 25px;
      width: 305px;
      display: flex;
      justify-content: space-between;
      button {
        width: calc(50% - 8px);
        height: 32px;
      }
      button.mobileActive {
        height: 40px;
      }
      .first {
        opacity: 0;
      }
    }
    .weightActive {
      font-weight: bold;
    }
    .buttonBox.mobileActive {
      width: 155px;
      margin-top: 0px;
    }
  }
  .optionBox.mobileActive {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    padding: 0 25px;
  }
  .androidActive {
    border-bottom-right-radius: 7px;
    border-bottom-left-radius: 7px;
  }
  .tipsBox {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .popBox {
      animation: mymove 0.3s;
      padding: 47px 30px 23px;
      background: #1e1e1f;
      border: 1px solid #494a4d;
      border-radius: 10px;
      .tipsText {
        font-weight: 500;
        color: #ffffff;
        line-height: 20px;
      }
      .buttonBox {
        margin-top: 41px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        button {
          width: calc(50% - 8px);
          height: 32px;
        }
        button.mobileActive {
          height: 40px;
        }
        .first {
          opacity: 0;
        }
      }
      .weightActive {
        font-weight: bold;
      }
    }
  }
  .alert_box-enter-active,
  .alert_box-leave-active {
    transition: opacity 0.5s;
  }
  .alert_box-enter,
  .alert_box-leave-to {
    opacity: 0;
  }
  @keyframes mymove {
    0% {
      transform: scale(0); /*开始为原始大小*/
    }
    100% {
      transform: scale(1);
    }
  }
}
.temp.mobileActive {
  // padding-top: 50px;
  height: calc(100vh - 70px);
}
::-webkit-scrollbar {
  background: none;
}
::-webkit-scrollbar-track {
  display: none;
}
::-webkit-scrollbar-thumb {
  width: 10px;
  background: #8a8f99;
}
</style>
