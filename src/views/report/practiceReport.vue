<template>
  <div class="practiceReport">
    <div class="bgpc"></div>
    <div class="header">
      <div class="header_ipad" v-if="flag">
        <div class="back" @click="toBack">
          <img src="../../assets/img/ic_back.png" />
        </div>
        <div class="qid">练习报告</div>
        <div></div>
      </div>
      <div class="header_pc" v-show="!flag">
        <div class="qid">练习报告</div>
        <div></div>
      </div>
    </div>
    <div class="main">
      <div class="main_top">
        <div class="circle">
          <div class="pie-right">
            <div
              class="right"
              :style="{ transform: `rotate(${degnum}deg)` }"
            ></div>
          </div>
          <div class="pie-left">
            <div
              class="left"
              :style="{ transform: `rotate(${rightdeg}deg)` }"
            ></div>
          </div>
          <div class="mask">
            <div class="percentage">{{ this.info.accuracy }}%</div>
            <div class="described">正确率</div>
          </div>
        </div>
        <div class="percentage_bottom">
          <div>
            <span class="timedata">{{ this.info.use_time_text }}</span>
            <span class="time">答题用时</span>
          </div>
          <div>
            <span class="timedata">{{ this.info.right_num }}</span>
            <span class="time">回答正确</span>
          </div>
          <div>
            <span class="timedata">{{ this.info.not_right_num }}</span>
            <span class="time">回答错误</span>
          </div>
        </div>
      </div>
      <div class="main_bottom">
        <div class="detail">答题明细</div>
        <div class="th">
          <span style="width:20%">题目</span>
          <span>我的答案</span>
          <span style="width:35%">正确答案</span>
          <span style="width:10%"></span>
        </div>
        <div
          class="td cursor"
          @click="todetail(item, index)"
          v-for="(item, index) in detailsList"
          :key="index"
        >
          <div class="serial">
            <div
              class="grend"
              :class="item.is_right == 1 ? '' : 'active'"
            ></div>
            <div class="serialnum">{{ index + 1 }}</div>
          </div>
          <div class="myanswer">{{ item.member_answer_text }}</div>
          <div class="myanswer">{{ item.answer_text }}</div>
          <div class="rigthimg">
            <img src="../../assets/img/btn_arrow.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { isMobile } from "../../common/util";
import { getMyTopicReport, showMyAnswerList } from "../../api/common";
export default {
  components: {},
  data() {
    return {
      flag: isMobile(),
      degnum: 0,
      rightdeg: 0,
      info: {},
      detailsList: []
    };
  },
  created() {
    this.onload();
  },
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.toBack();
    });
  },

  methods: {
    onload() {
      getMyTopicReport({
        schedule_id: this.$route.query.schedule_id
      }).then(res => {
        if (res.code == 0) {
          this.info = res.data;
          this.showarrow(this.info.accuracy * 1);
        } else {
          this.$toast(res.msg);
        }
      });
      // 明细接口
      showMyAnswerList({ schedule_id: this.$route.query.schedule_id }).then(
        res => {
          if (res.code == 0) {
            this.detailsList = res.data;
          } else {
            this.$toast(res.msg);
          }
        }
      );
    },
    // 去详情页面
    todetail(item, index) {
      this.$router.push({
        path: "/report/homeworkDetail",
        query: {
          type: this.$route.query.type,
          schedule_id: this.$route.query.schedule_id,
          topic_id: item.topic_id,
          index: index
        }
      });
    },
    toBack() {
      console.log(this.$route.query.type);
      if (this.$route.query.type == 2) {
        this.$router.push({
          path: "/pc/Studentschedules",
          query: { type: this.$route.query.type }
        });
      } else if (this.$route.query.type == 1) {
        this.$router.push({
          path: "/phone/standardCurriculumListPhone",
          query: { type: this.$route.query.type }
        });
      }
    },
    showarrow(value) {
      let num = value * 3.6;
      if (num < 180) {
        this.degnum = num;
      } else {
        this.degnum = 180;
        this.rightdeg = num - 180;
      }
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  box-shadow: 0px 2px 2px -2px #ccc;

  .header_ipad {
    display: flex;
    align-items: center;
    background: #ffffff;
    padding: 10px 15px;
    box-sizing: border-box;
    justify-content: space-between;
    .back {
      width: 18px;
      height: 18px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .qid {
      font-size: 18px;
      font-weight: 500;
      color: #292d33;
      line-height: 25px;
    }
  }
  .header_pc {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 2px 2px -2px #ccc;

    .qid {
      font-size: 18px;
      font-weight: 500;
      color: #292d33;
      line-height: 25px;
    }
  }
}
// 主体部分
.main {
  padding: 15px;
  padding-top: 60px;
  box-sizing: border-box;
  .main_top {
    background: linear-gradient(134deg, #70e2b4 0%, #3dc17d 100%);
    border-radius: 5px;
    padding: 20px 10px;
    box-sizing: border-box;
    height: 186px;
    position: relative;
    width: 100%;
    .circle {
      //这个元素可以提供进度条的颜色
      position: absolute;
      left: calc(50% - 50px);
      height: 100px;
      width: 100px;
      border-radius: 50%;
      background: #fff; //注意这是表示当前进度的颜色
    }
    .pie-right,
    .pie-left {
      //这俩元素主要是为了分别生成两个半圆的，所以起作用的地方在于clip裁掉另一半
      position: absolute;
      top: 0;
      left: 0;
      height: 100px;
      width: 100px;
      border-radius: 50%;
    }
    .right,
    .left {
      position: absolute;
      top: 0;
      left: 0;
      height: 100px;
      width: 100px;
      border-radius: 50%;
      background: RGBA(154, 228, 193, 1);
    }
    .pie-right,
    .right {
      //裁掉左边一半
      clip: rect(0, auto, auto, 50px);
    }
    .pie-left,
    .left {
      //裁掉右边一半
      clip: rect(0, 50px, auto, 0);
    }

    .mask {
      //我是遮罩
      position: absolute;
      top: 4px;
      left: 4px;
      height: 92px;
      width: 92px;
      background: linear-gradient(134deg, #70e2b4 0%, #3dc17d 100%);
      border-radius: 50%;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .percentage {
      font-size: 30px;
      font-weight: bold;
      color: #ffffff;
      line-height: 42px;
    }
    .described {
      margin-top: 4px;
      font-size: 12px;
      font-weight: 500;
      color: #ffffff;
      line-height: 17px;
    }
    .percentage_bottom {
      position: absolute;
      bottom: 20px;
      div {
        width: 33.33%;
        text-align: center;
      }
      width: calc(100% - 20px);
      display: flex;
      align-items: center;
      justify-content: space-around;

      .timedata {
        font-size: 20px;
        font-weight: bold;
        color: #ffffff;
        line-height: 24px;
        font-family: DIN;
      }
      .time {
        margin-left: 6px;
        font-size: 12px;
        font-weight: 400;
        color: #ffffff;
        line-height: 17px;
      }
    }
  }
  .main_bottom {
    padding: 15px;
    box-sizing: border-box;
    margin-top: 10px;
    background: #ffffff;
    border-radius: 5px;
    .detail {
      font-size: 17px;
      font-weight: 600;
      color: #333333;
      line-height: 24px;
    }
    .th {
      margin-top: 19px;
      display: flex;
      align-items: center;

      span {
        width: 35%;
        text-align: center;
        font-size: 12px;
        font-weight: 400;
        color: #666666;
        line-height: 17px;
      }
    }
    .td {
      position: relative;
      display: flex;
      align-items: center;
      margin-top: 10px;
      background: #f8f8f9;
      border-radius: 5px;
      padding: 10px;
      box-sizing: border-box;

      .grend {
        position: absolute;
        left: 10px;
        width: 7px;
        height: 7px;
        background: #3dc17d;
        border-radius: 50%;
      }
      .active {
        background: #ff7300;
      }
      .serial {
        width: 20%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-right: 2.5%;
        @media (max-width: 500px) {
          padding-right: 6%;
        }
        box-sizing: border-box;
        .serialnum {
          font-size: 15px;
          // margin-left: 12px;
          font-weight: 400;
          color: #333333;
          line-height: 21px;
        }
      }
      .myanswer {
        width: 35%;
        text-align: center;
        font-size: 15px;
        font-weight: 400;
        color: #333333;
        line-height: 21px;
      }
      .rightanswer {
        width: 30%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        .myanswer {
          font-size: 15px;
          font-weight: 400;
          color: #333333;
          line-height: 21px;
        }
      }
      .rigthimg {
        width: 10%;
        text-align: right;
        img {
          width: 7px;
          height: 12px;
        }
      }
    }
  }
}
</style>
