<template>
  <div class="roster">
    <div class="background"></div>
    <div class="header">
      <span>
        花名册
      </span>
      <div class="headRight" ref="headRight">
        <div class="headerSearch">
          <i class="el-icon-search"></i>
          <input type="text" placeholder="请输入用户名" v-model="keyword" />
        </div>
        <img
          src="../../assets/img/ic_re.png"
          alt=""
          @click="refresh"
          class="cursor"
        />
        <img
          src="../../assets/img/ic_close.png"
          alt=""
          @click="closeview"
          class="cursor"
        />
      </div>
    </div>
    <div class="body">
      <table>
        <tr>
          <th
            v-for="items in rosterTitle"
            :key="items.key"
            :class="
              items.key == 'online_status' || items.key == 'attend_status'
                ? 'narrow'
                : items.key == 'forbidden' || items.key == 'microphone'
                ? 'center'
                : ''
            "
          >
            {{ items.laber }}
          </th>
        </tr>
        <tr v-for="(item, index) in rosterTalbe" :key="index">
          <td
            v-for="items in rosterTitle"
            :key="items.key"
            :class="
              items.key == 'online_status' || items.key == 'attend_status'
                ? 'narrow'
                : items.key == 'forbidden' || items.key == 'microphone'
                ? 'center'
                : ''
            "
          >
            <button
              v-if="items.key == 'forbidden'"
              class="forbiddenButton"
              @click="forbiddenSpeech(item.id, item[items.key])"
              :class="item[items.key] + '' == '' ? 'prohibit' : 'cursor'"
            >
              {{
                !item[items.key] || item[items.key] + "" == ""
                  ? "禁言"
                  : "解除禁言"
              }}
            </button>
            <button
              v-else-if="items.key == 'microphone'"
              class="microphoneButton"
              @click="microphoneSpeech(item.id, item[items.key])"
              :class="
                item[items.key] + '' == ''
                  ? 'prohibit'
                  : item[items.key]
                  ? 'cursor remindYellow'
                  : 'cursor'
              "
            >
              {{
                item[items.key] || item[items.key] + "" == "" ? "下麦" : "上麦"
              }}
            </button>
            <div v-else>
              <img
                draggable="false"
                :src="item.headimgurl"
                alt=""
                v-if="items.key == 'nickname'"
              />
              <!-- :title="item[items.key]" -->
              <span :class="stateJudgment(item, items.key) ? 'red' : ''">{{
                item[items.key]
              }}</span>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div class="bottom">
      <button class="cursor" @click="forbiddenSpeech('all', allForbidden)">
        {{ !allForbidden ? "全体禁言" : "解除全体禁言" }}
      </button>
      <button class="cursor" @click="microphoneSpeech('all', allMicrophone)">
        全体下麦
      </button>
    </div>
  </div>
</template>

<script>
import { sendMessage } from "../../api/client";
import { getScheduleRoster } from "../../api/common";
import { notImmediatelyDebounce } from "../../common/util";

export default {
  data() {
    return {
      schedule_id: this.$route.query.schedule_id,
      allForbidden: false,
      allMicrophone: false,
      rosterTitle: [
        { key: "nickname", laber: "用户" },
        // { key: "wechat_nickname", laber: "" },
        { key: "online_status", laber: "在线状态" },
        { key: "attend_status", laber: "考勤状态" },
        { key: "microphone", laber: "上下麦" },
        { key: "forbidden", laber: "禁言" }
      ],
      rosterTalbe: [],
      rosterPcTalbe: {},
      keyword: ""
    };
  },
  watch: {
    keyword(val) {
      this.searchGetScheduleRosterList();
    }
  },

  mounted() {
    let pcmodel = {
      type: "windowSettings",
      width: 600,
      height: 502,
      barHeight: 50,
      barWidth: this.$refs["headRight"].offsetWidth,
      closeButton: "hide"
    };
    sendMessage(pcmodel);
    window["recvMessage"] = msg => {
      this.recvMessage(msg);
    };

    this.getScheduleRosterList();
    this.delayGetScheduleRosterList();
  },
  methods: {
    refresh() {
      let pcmodel = {
        type: "loginSucc"
      };
      sendMessage(pcmodel);
    },
    closeview() {
      let pcmodel = {
        type: "closeview"
      };
      sendMessage(pcmodel);
    },
    recvMessage(msg) {
      let data = JSON.parse(msg);

      if (data.type) {
        if (data.type == "forbiddenState") {
          console.log("收到聊天");
          console.log(data);
          let object = data.forbiddenData;
          if (object.id == "all") {
            this.allForbidden = object.state;
          } else {
            if (this.rosterPcTalbe[object.id]) {
              this.rosterPcTalbe[object.id].forbidden = object.state;
            } else {
              this.rosterPcTalbe[object.id] = {
                forbidden: object.state,
                onLine: "",
                microphone: ""
              };
            }
          }
        } else if (data.type == "microphoneState") {
          console.log("收到麦克风");
          console.log(data);
          let object = data.microphoneData;
          if (object.id == "all") {
            this.allmicrophone = object.state;
          } else {
            if (this.rosterPcTalbe[object.id]) {
              this.rosterPcTalbe[object.id].microphone =
                object.state == "" ? false : object.state;
            } else {
              this.rosterPcTalbe[object.id] = {
                microphone: object.state == "" ? false : object.state,
                onLine: "",
                forbidden: ""
              };
            }
          }
        } else if (data.type == "onLineState") {
          console.log("收到在线状态");
          console.log(data);
          let object = data.onLineData;
          if (object.state == "0") {
            object.state = "不在线";
          } else if (object.state == "1") {
            object.state = "在线";
          }
          if (this.rosterPcTalbe[object.id]) {
            this.rosterPcTalbe[object.id].onLine = object.state;
            if (data.forbiddenData) {
              let forbiddenObject = data.forbiddenData;
              this.rosterPcTalbe[object.id].forbidden = forbiddenObject.state;
            }
            if (
              object.state == "在线" &&
              this.rosterPcTalbe[object.id].microphone == ""
            ) {
              this.rosterPcTalbe[object.id].microphone = false;
            } else if (object.state == "不在线") {
              this.rosterPcTalbe[object.id].microphone = "";
            }
          } else {
            this.rosterPcTalbe[object.id] = {
              forbidden: "",
              microphone: "",
              onLine: object.state
            };
            if (data.forbiddenData) {
              let forbiddenObject = data.forbiddenData;
              this.rosterPcTalbe[object.id].forbidden = forbiddenObject.state;
            }
            if (
              object.state == "在线" &&
              this.rosterPcTalbe[object.id].microphone == ""
            ) {
              this.rosterPcTalbe[object.id].microphone = false;
            } else if (object.state == "不在线") {
              this.rosterPcTalbe[object.id].microphone = "";
            }
          }
        }
        console.log("储存的消息");
        console.log(this.rosterPcTalbe);
        this.getScheduleRosterList();
        this.delayGetScheduleRosterList();
      } else if (data.operation) {
        if (data.operation == "Refresh") {
          this.getScheduleRosterList();
        }
      }
    },
    delayGetScheduleRosterList: notImmediatelyDebounce(function() {
      this.getScheduleRosterList();
    }, 3000),
    searchGetScheduleRosterList: notImmediatelyDebounce(function() {
      this.getScheduleRosterList();
    }, 500),
    stateJudgment(item, key) {
      if (key == "attend_status") {
        if (item[key] == "缺勤") {
          return true;
        } else {
          return false;
        }
      } else if (key == "online_status") {
        if (item[key] == "在线") {
          return false;
        } else {
          return true;
        }
      }
    },
    forbiddenSpeech(id, state) {
      if (state + "" != "") {
        let forbiddenData = { id: id, state: !state };
        let pcmodel = {
          type: "forbiddenState",
          forbiddenData: JSON.stringify(forbiddenData)
        };
        console.log("发送聊天");
        console.log(pcmodel);
        sendMessage(pcmodel);
      }
    },
    microphoneSpeech(id, state) {
      if (state + "" != "") {
        let microphoneData = { id: id, state: !state };
        let pcmodel = {
          type: "microphoneState",
          microphoneData: JSON.stringify(microphoneData)
        };
        console.log("发送麦克风");
        console.log(pcmodel);
        sendMessage(pcmodel);
      }
    },
    getScheduleRosterList() {
      getScheduleRoster({
        schedule_id: this.schedule_id,
        keyword: this.keyword
      }).then(res => {
        if (res.code == 0) {
          let list = res.data;

          for (let i = 0; i < list.length; i++) {
            if (this.rosterPcTalbe[list[i].id]) {
              if (this.rosterPcTalbe[list[i].id].onLine != "") {
                list[i].online_status = this.rosterPcTalbe[list[i].id].onLine;
              }
              list[i].microphone = this.rosterPcTalbe[list[i].id].microphone;
              list[i].forbidden = this.rosterPcTalbe[list[i].id].forbidden;
            } else {
              list[i].microphone = "";
              list[i].forbidden = "";
            }
          }
          this.rosterTalbe = list;
        } else {
          this.$toast(res.msg);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background: #494a4d;
  border-radius: 4px;
  position: absolute;
}
::-webkit-scrollbar-track {
  border-radius: 4px;
  background-color: #1e1e1f;
  opacity: 0;
}
::-webkit-scrollbar-thumb {
  background: #494a4d;
  border-radius: 4px;
}

.roster {
  .background {
    position: fixed;
    background: #1e1e1f;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }

  .header {
    background: #1e1e1f;
    height: 50px;
    border-bottom: 1px solid #292d33;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    // padding-top: 24px;
    align-items: center;
    position: relative;
    span {
      font-size: 12px;
      font-weight: 500;
      color: #ffffff;
      line-height: 17px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .headRight {
      display: flex;
      justify-content: flex-end;
      flex-direction: row;
      align-items: center;
      margin-right: 10px;
      img {
        height: 16px;
        width: 16px;
        margin-left: 15px;
        padding: 5px;
      }
      img + img {
        margin-left: 5px;
      }
    }
    .headerSearch {
      width: 162px;
      height: 30px;
      border-radius: 2px;
      border: 1px solid #494a4d;
      // padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      color: #909399;

      position: relative;
      i {
        position: absolute;
        left: 10px;
      }

      input {
        background: #1e1e1f;
        border: 0px;
        width: 100%;
        box-sizing: border-box;
        padding: 0px 10px 0px 32px;
        height: 100%;
        line-height: 28px;
        font-size: 12px;
        font-weight: 400;
        color: #8a8f99;
      }
    }
  }
  .body {
    height: calc(100vh - 120px);
    width: 100%;
    overflow-y: auto;
    padding: 0px 24px;
    box-sizing: border-box;

    table {
      width: 100%;
      tr {
        th {
          font-size: 12px;
          font-weight: 400;
          color: #8a8f99;
          line-height: 17px;
          width: 100px;
          height: 48px;
          padding-right: 5px;
          text-align: left;
        }
        td {
          height: 48px;
          width: 100px;
          font-size: 12px;
          font-weight: 500;
          color: #ffffff;
          line-height: 18px;
          padding-right: 5px;

          // box-sizing: border-box;
          // span {
          //   overflow: hidden;
          //   text-overflow: ellipsis;
          //   display: -webkit-box;
          //   -webkit-line-clamp: 1;
          //   -webkit-box-orient: vertical;
          // }
          .red {
            color: rgba(255, 97, 87, 1);
          }
          button {
            height: 30px;
            border-radius: 2px;
            border: 1px solid #494a4d;
            background: unset;
            font-size: 12px;
            font-weight: 500;
            color: #ffffff;
            line-height: 18px;
          }
          .forbiddenButton {
            width: 80px;
          }
          .microphoneButton {
            width: 60px;
          }
          .prohibit {
            opacity: 0.3;
          }
          .remindYellow {
            color: #ffcc00;
          }
          div {
            display: flex;
            align-items: center;
          }
          img {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            margin-right: 10px;
          }
        }
        .narrow {
          width: calc(100% / 6);
        }
        .center {
          width: calc(100% / 6);

          text-align: center;
        }
      }
    }
  }
  .bottom {
    height: 70px;
    background: #1e1e1f;
    border-top: 1px solid #292d33;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      margin: 0 10px;
      width: 160px;
      height: 30px;
      border-radius: 2px;
      border: 1px solid #494a4d;
      background: unset;
      font-size: 12px;
      font-weight: 500;
      color: #ffffff;
      line-height: 18px;
    }
  }
}
</style>
