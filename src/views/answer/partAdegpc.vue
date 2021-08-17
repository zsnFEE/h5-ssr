<template>
  <!--pc的随堂练习页面-->
  <div class="partadegpc " :class="device == 'android' ? 'androidActive' : ''">
    <div class="part_box">
      <div class="part_left">
        <div class="left_title">随堂练习</div>
        <div class="left_list" @scroll="scrollEvent">
          <div v-if="leftlist.length > 0">
            <div
              class="list_item cursor"
              v-for="(item, index) in leftlist"
              :key="index"
              @click="selectitem(index)"
              :class="index == i ? 'list_itembg' : ''"
            >
              <div
                class="being answerButton_select"
                v-if="publish == 1 && (tid || publish_topic) == item.id"
              >
                正在答题
              </div>
              <span>{{ index + 1 }}. {{ item.content }}</span>
            </div>
          </div>
          <div v-else class="noleftlist">暂无题目</div>
        </div>
        <div class="left_button" v-if="leftlist.length > 0">
          <div
            class="explain answerButton_default cursor"
            v-if="publish == 0"
            @click="topicSpeech(false)"
          >
            讲解试卷
          </div>
          <div
            class="results answerButton_select cursor"
            v-if="publish == 0"
            @click="publishAll"
          >
            发布试卷
          </div>
          <div
            class="endanswer answerButton_select"
            v-if="publish == 1"
            @click="endanswer"
          >
            结束答题
          </div>
        </div>
        <div class="scrollMask" v-if="maskShow"></div>
      </div>
      <div class="part_right">
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
        <div class="right_box" v-if="leftlist.length > 0">
          <div
            class="showtopic"
            v-show="select == 0"
            @scroll="scrollEventright"
          >
            <div class="topic" v-if="topic">
              <div class="topic_item">{{ i + 1 }}. {{ topic.content }}</div>
              <div class="topic_img" v-if="topic.cdn && topic.img_url">
                <img :src="topic.cdn + topic.img_url" alt="" />
              </div>
              <div class="option">
                <div
                  class="option_item"
                  v-for="(item, index) in topic.options"
                  :key="index"
                  :class="item.is_right == 1 ? 'option_itemcorrect' : ''"
                >
                  {{ item.option }}. {{ item.content }}
                </div>
              </div>
              <div class="topic_button" v-if="publish == 0">
                <div
                  class="thistopic answerButton_default cursor"
                  @click="topicSpeech(topic.id)"
                >
                  讲解此题
                </div>
                <div
                  class="thistopic answerButton_default cursor"
                  @click="thistopic(topic.id)"
                >
                  发布此题
                </div>
              </div>
            </div>
          </div>
          <!-- 答题情况start -->
          <div class="case" v-show="select == 1">
            <div class="caselist">
              <testTable
                ref="testTable"
                :theadlist="theadlist"
                :tdlist="tdlist"
                :tid="i"
              ></testTable>
            </div>
          </div>
          <!-- 答题情况end -->
          <div class="scrollMaskright" v-if="maskShowright"></div>
        </div>
        <div v-else class="nolist">暂无题目</div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getcoursetopic,
  answerstats,
  collectpaper,
  publishTopic
} from "../../api/common";
import testTable from "../../components/testTable";
import { sendMessage } from "../../api/client";
import { isIos, isDevice } from "../../common/util";

export default {
  components: {
    testTable
  },
  data() {
    return {
      publish: 0,
      i: 0,
      leftlist: [],
      titleList: [{ name: "题目" }, { name: "答题情况" }],
      select: 0,
      topic: {},
      tid: "",
      theadlist: [],
      tdlist: [],
      maskShow: true,
      maskShowright: true,
      schedule_id: this.$route.query.schedule_id,
      titselect: true,
      publish_topic: "",
      timer: null,
      iosFlag: isIos(),
      device: isDevice()
    };
  },

  mounted() {
    window["recvMessage"] = msg => {
      this.recvMessage(msg);
    };

    getcoursetopic({ schedule_id: this.schedule_id }).then(res => {
      if (res.code == 0) {
        this.publish_topic = res.data.publish_topic;
        this.publish = res.data.is_publish;
        let pcmodel = {
          type: "windowSettings",
          width: 1000,
          height: 680,
          closeButton: "show",
          isPublish: this.publish ? true : false
        };
        sendMessage(pcmodel);
        this.leftlist = res.data.topics;
        this.topic = this.leftlist && this.leftlist[0];
      } else {
        let pcmodel = {
          type: "windowSettings",
          width: 1000,
          height: 680,
          closeButton: "show",
          isPublish: false
        };
        sendMessage(pcmodel);
      }
    });
    this.answerstats();
  },
  methods: {
    recvMessage(msg) {
      if (JSON.parse(msg).operation == "FinishExam") {
        this.endanswer();
      }
    },
    answerstats() {
      this.timer = setInterval(() => {
        answerstats({ schedule_id: this.schedule_id }).then(res => {
          if (res.code == 0) {
            this.theadlist = res.data.feilds;
            this.tdlist = res.data.data;
          }
        });
      }, 1000);
      this.$once("hook:beforeDestroy", () => {
        clearInterval(this.timer);
      });
    },
    // 选择题干
    selectitem(index) {
      this.i = index;
      this.topic = this.leftlist[index];
      this.$nextTick(() => {
        this.$refs.testTable.scrollTable();
      });
    },
    // 题目与答题情况按钮切换
    selectTitle(index) {
      this.select = index;
    },
    // 发布此题
    thistopic(tid) {
      this.publish = 1;
      this.tid = tid;
      this.select = 1;
      publishTopic({ schedule_id: this.schedule_id, topic_id: tid }).then(
        res => {
          if (res.code == 0) {
            let pcmodel = {
              type: "problem", //发布此题
              tid: tid //此题的id
            };
            sendMessage(pcmodel);
          }
        }
      );
    },
    // 讲解此题或讲解全部 topicId判断
    topicSpeech(topicId) {
      let arrid = this.leftlist.map(item => {
        return item.id;
      });
      let version = this.leftlist.map(item => {
        return Math.round(new Date(item.update_at));
      });
      let pcmodel = {
        type: "topicAll", //讲解试卷
        topicAll: arrid.join(","), //讲解全部题目的id(571,572,573,574,575,576,577,578)
        topicId: topicId ? topicId : arrid[0], //题目id
        version: version.join(",")
      };
      sendMessage(pcmodel);
    },
    // 发布试卷
    publishAll() {
      let tid = "";
      publishTopic({ schedule_id: this.schedule_id, topic_id: tid }).then(
        res => {
          if (res.code == 0) {
            let pcmodel = {
              type: "problem", //发布试卷
              tid: "ALL" //全部题目的id
            };
            sendMessage(pcmodel);
          }
        }
      );
      this.publish = 1;
      this.titselect = false;
      this.select = 1;
      this.tid = "";
      this.publish_topic = "";
    },
    // 结束答题
    endanswer() {
      this.titselect = true;
      // this.select = 0;
      collectpaper({ schedule_id: this.schedule_id }).then(res => {
        if (res.code == 0) {
          let pcmodel = {
            type: "endanswer" //结束答题
          };
          sendMessage(pcmodel);
          this.publish = 0;
          this.tid = "";
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    },
    // 滚动条
    scrollEvent() {
      this.maskShow = false;
      setTimeout(() => {
        this.maskShow = true;
      }, 1000);
    },
    scrollEventright() {
      this.maskShowright = false;
      setTimeout(() => {
        this.maskShowright = true;
      }, 1000);
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
.partadegpc {
  // width: 1000px;
  // height: 650px;
  background: #1e1e1f;
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
}
.part_box {
  display: flex;
}
.part_left {
  width: 375px;
  padding-top: 30px;
  background: #242426;
  position: relative;
}
.left_title {
  padding-top: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
  margin-bottom: 16px;
  width: 375px;
}
.left_list {
  width: 100%;
  // height: 536px;
  height: calc(100vh - 144px);
  padding: 0 7px 11px 15px;
  overflow: auto;
  box-sizing: border-box;
}
// ::-webkit-scrollbar {
//   display: none;
// }
.list_itembg {
  background: #494a4d !important;
}
.list_item {
  background: #303033;
  border-radius: 12px;
  margin-top: 15px;
  box-sizing: border-box;
  padding: 20px;
  width: 345px;
  span {
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
.left_button {
  border-top: 1px solid #555659;
  padding: 15px;
  background: #242426;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: 375px;
  z-index: 9;
}
// 结束答题按钮
.endanswer {
  width: 100%;
  height: 40px;
  border-radius: 4px;
  border-radius: 6px;
  border: 1px solid #797b80;
  font-size: 14px;
  font-weight: 500;
  color: #292d33;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: DIN;
}
.explain {
  width: 165px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid #797b80;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: DIN;
}
.results {
  width: 165px;
  height: 40px;
  // background: linear-gradient(131deg, #ffd500 0%, #ffbf00 100%);
  box-shadow: 0px -1px 0px 0px rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #292d33;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: DIN;
}
.being {
  width: 72px;
  height: 24px;
  box-shadow: 0px -1px 0px 0px rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: DIN;
  margin-bottom: 6px;
}
// 右边样式开始
.part_right {
  padding-top: 30px;
  margin: 0 auto;
  // width: calc(100% - 375px);
  min-width: 625px;
  // width: 625px;
  position: relative;
  // height: 100vh;
  height: calc(100vh - 30px);
  background: #1e1e1f;
}
.title {
  display: flex;
  width: 162px;
  margin: 0 auto 18px;
}
.right_box {
  width: 625px;
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
.showtopic {
  overflow: auto;
  // height: 602px;
  height: calc(100vh - 127px);
}
.topic {
  margin-top: 15px;
  padding: 0 40px 15px;
}
.topic_item {
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  line-height: 25px;
  margin-bottom: 18px;
}
.topic_img {
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-height: 360px;
    max-width: 100%;
  }
}
.option {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.option_item {
  min-width: 20%;

  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  margin-top: 8px;
}
.option_itemcorrect {
  color: #27bf73;
}
.topic_button {
  margin-top: 60px;
  display: flex;
  padding: 0 120px;
  justify-content: space-between;
  align-items: center;
}
.thistopic {
  width: 145px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid #797b80;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: DIN;
}
// 答题情况
.case {
  margin-top: 37px;
}
.caselist {
  padding: 0px 28px 0px 27px;
  box-sizing: border-box;
  width: 100%;
  overflow: auto;
  background: #1e1e1f;
}
.caselist::-webkit-scrollbar {
  display: none;
}
table {
  width: 100%;
}
td {
  min-width: 31px;
  padding: 0px 10px;
  white-space: nowrap;
  text-align: center;
}
thead > tr > td {
  font-size: 12px;
  font-weight: 400;
  color: #9b9b9b;
}

.nametitle {
  text-align: center;
}
tbody > tr > td:first-child {
  font-size: 12px;
  font-weight: 400;
  color: #9b9b9b;
}
tbody tr td {
  padding-top: 16px;
}
.tdlist td {
  font-size: 12px;
  font-weight: 400;
  color: #ffffff;
}
.spanerr {
  color: #f74a4a;
}
.scrollMask {
  position: absolute;
  z-index: 10;
  width: 12px;
  top: 37px;
  right: 0;
  bottom: 71px;
  background: #242426;
}
::-webkit-scrollbar {
  background: none;
}
::-webkit-scrollbar-track {
  display: none;
  background: #242426;
}
::-webkit-scrollbar-corner {
  background: #242426;
}

::-webkit-scrollbar-thumb {
  width: 8px;
  height: 8px;
  background: #8a8f99;
}
.scrollMaskright {
  position: absolute;
  z-index: 10;
  width: 12px;
  top: 37px;
  right: 0;
  bottom: 0px;
  background: #1e1e1f;
}
.noleftlist {
  color: #9b9b9b;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.nolist {
  color: #9b9b9b;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 127px);
}
.androidActive {
  border-radius: 10px;
}
</style>
