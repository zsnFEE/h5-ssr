<template>
  <div class="report">
    <div class="title" v-show="!flag">
      <span>课后评价</span>
      <div class="close cursor" @click="close">
        <img src="../../assets/img/close.png" />
      </div>
    </div>
    <header v-show="flag" class="ipadheader">
      <img
        src="../../assets/img/ic_back.png"
        class="titleArrow"
        @click="toBack"
      />
      <div class="titleText">课后评价</div>
      <div class="titleArrow"></div>
    </header>
    <div class="box" :class="flag ? 'boxipad' : 'boxpc'">
      <div class="content">
        <div v-for="(item, index) in list" :key="index">
          <div class="question" :class="index == 0 ? 'nomarg' : ''">
            {{ index + 1 }}. {{ item.question }}
          </div>
          <van-radio-group
            v-model="radio"
            direction="horizontal"
            v-if="item.type == 0 && index == 0"
          >
            <van-radio
              :name="la.id"
              v-for="(la, i) in item.option"
              :key="i"
              icon-size="15px"
              checked-color="#3DC17D"
              >{{ la.option }}</van-radio
            >
          </van-radio-group>
          <van-radio-group
            v-model="like"
            direction="horizontal"
            v-if="item.type == 0 && index == 1"
          >
            <van-radio
              :name="la.id"
              v-for="(la, i) in item.option"
              :key="i"
              icon-size="15px"
              checked-color="#3DC17D"
              >{{ la.option }}</van-radio
            >
          </van-radio-group>
          <div class="list" v-if="item.type == 1">
            <span
              class="select"
              :class="{ active: checked.includes(la.id) }"
              v-for="(la, i) in item.option"
              :key="i"
              @click="handclick(la, i)"
              >{{ la.option }}</span
            >
          </div>
        </div>

        <div class="remark">此评价为匿名评价</div>
      </div>
      <div class="submit cursor" @click="submit">提交</div>
    </div>
  </div>
</template>
<script>
import { getEvaluationQuestion, addEvaluation } from "../../api/common";
import { RadioGroup, Radio } from "vant";
import { sendMessage } from "../../api/client";
import { isMobile } from "../../common/util";

export default {
  components: {
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio
  },
  data() {
    return {
      flag: isMobile(),
      list: "",
      radio: "",
      like: "",
      checked: [],
      selectList: []
    };
  },
  mounted() {
    let model = {
      signal: "windowSettings",

      width: 370,
      height: 600,
      size: false, //不允许放大缩小
      modal: true, //是否可以拖动
      closeButton: "hide"
    };
    sendMessage(model);

    this.laod();
    console.log("参数", this.$route.query.clazz_schedule_id);
  },
  methods: {
    laod() {
      getEvaluationQuestion({
        clazz_schedule_id: this.$route.query.clazz_schedule_id
      }).then(res => {
        if (res.code == 0) {
          this.list = res.data;
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    },
    handclick(la, i) {
      var index = this.checked.map(item => item).indexOf(la.id);
      if (this.checked.includes(la.id)) {
        this.checked.splice(index, 1);
      } else {
        this.checked.push(la.id);
      }
    },
    submit() {
      addEvaluation({
        clazz_schedule_id: this.$route.query.clazz_schedule_id,
        evaluations: [
          {
            question_id: "1",
            option_id: this.radio
          },
          {
            question_id: "2",
            option_id: this.like
          },
          {
            question_id: "3",
            option_id: this.checked.join(",")
          }
        ]
      }).then(res => {
        if (res.code == 0) {
          this.$toast("提交成功");
          setTimeout(() => {
            let pcmodel = {
              signal: "closeview",
              type: "refresh"
            };
            sendMessage(pcmodel);
            dsBridge.call("closeevaluationafter", "", function(v) {});
          }, 1000);
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    },

    close() {
      addEvaluation({
        clazz_schedule_id: this.$route.query.clazz_schedule_id,
        evaluations: [
          {
            question_id: "1",
            option_id: ""
          },
          {
            question_id: "2",
            option_id: ""
          },
          {
            question_id: "3",
            option_id: ""
          }
        ]
      }).then(res => {
        if (res.code == 0) {
          let pcmodel = {
            signal: "closeview",
            type: "refresh"
          };
          sendMessage(pcmodel);
        }
      });
    },
    // 评分的方法结束
    toBack() {
      addEvaluation({
        clazz_schedule_id: this.$route.query.clazz_schedule_id,
        evaluations: [
          {
            question_id: "1",
            option_id: ""
          },
          {
            question_id: "2",
            option_id: ""
          },
          {
            question_id: "3",
            option_id: ""
          }
        ]
      }).then(res => {
        if (res.code == 0) {
          dsBridge.call("closeevaluationafter", "", function(v) {});
        }
      });
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
@media (min-width: 500px) {
  .report {
    border: 1px solid #f3f5f9;
    box-sizing: border-box;
  }
  .ipadheader {
    padding-top: 30px !important;
  }
}

.report {
  width: 100%;
  height: 100%;

  background: #f3f5f9;
  header {
    position: fixed;
    padding: 19px 0 11px 3%;
    box-sizing: border-box;
    top: 0px;
    left: 0px;

    width: 100%;
    display: flex;
    justify-content: space-between;
    background: rgba(255, 255, 255, 1);
    z-index: 10;
    align-items: center;
    .titleArrow {
      height: 18px;
      width: 18px;
      img {
        height: 18px;
        width: 18px;
        object-fit: cover;
      }
    }
    .titleText {
      font-size: 18px;
      font-weight: 500;
      color: #292d33;
    }
  }
  .title {
    font-size: 19px;
    font-weight: 500;
    color: #333333;
    text-align: center;
    padding: 15px 0 11px;
    box-sizing: border-box;
    position: relative;
    border-bottom: 1px solid #e4e5e6;
    .close {
      position: absolute;
      right: 21px;
      top: 21px;
      width: 13px;
      height: 13px;
      img {
        width: 13px;
        height: 13px;
        object-fit: cover;
      }
    }
  }
  .title {
    top: 0px;
    width: 100%;
    padding: 17px 21px;
    box-sizing: border-box;
    background: #ffffff;
    font-size: 21px;
    font-weight: 600;
    color: #333333;
    position: fixed;
  }
  .box {
    padding: 15px;
    padding-top: 72px;
    box-sizing: border-box;
  }
  .boxpc {
    // margin-top: 65px !important;
    padding-top: 80px !important;
    .question {
      font-size: 14px !important;
    }
    ::v-deep .van-radio__label {
      font-size: 12px !important;
    }
    .select {
      width: 86px !important;
      height: 30px !important;

      font-size: 12px !important;
    }
  }

  .boxipad {
    padding-top: 82px !important;

    padding-left: 120px;
    padding-right: 125px;
    box-sizing: border-box;
  }

  @media (max-width: 767px) {
    .box {
      box-sizing: border-box;
      padding: 15px;
      padding-top: 62px;
    }
    .card_top {
      margin-top: 15px;
    }
  }
  @media (max-width: 500px) {
    .boxipad {
      padding-top: 72px !important;
    }
  }
  .content {
    padding: 15px;
    padding-left: 15px;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 12px;
    .question {
      margin-top: 30px;
      font-size: 15px;
      font-weight: 600;
      color: #676869;
      margin-bottom: 14px;
    }
    ::v-deep .van-radio__label {
      font-size: 14px;
      font-weight: 400;
      color: #6c7176;
    }
    ::v-deep .van-radio-group {
      display: flex;
      // justify-content: space-around;
    }
    ::v-deep .van-radio--horizontal {
      margin-right: 30px;
    }
    .list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
    .select {
      width: 90px;
      height: 33px;
      display: inline-block;
      background: #ebedef;
      border-radius: 5px;
      padding: 7px 17px 6px;
      box-sizing: border-box;
      font-size: 14px;
      font-weight: 400;
      color: #6d7175;
      margin-bottom: 15px;
      margin-right: 11px;
      text-align: center;
    }

    .active {
      background: #3dc17d;
      color: #ffffff;
    }
  }
  .remark {
    margin-top: 5px;
    display: flex;
    justify-content: flex-end;
    font-size: 12px;
    font-weight: 400;
    color: #676869;
  }
  .submit {
    margin-top: 50px;
    background: #3dc17d;
    border-radius: 5px;
    padding: 11px 15px;
    box-sizing: border-box;
    font-size: 17px;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
  }
  .nomarg {
    margin-top: 0px !important;
  }
}
</style>
