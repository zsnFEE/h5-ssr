<template>
  <div class="homework">
    <div class="bgpc"></div>
    <div class="header">
      <div class="header_ipad" v-if="flag">
        <div class="back" @click="toBack">
          <img src="../../assets/img/ic_back.png" />
        </div>
        <div class="qid">{{ i + 1 }} / {{ topic.length }}</div>
        <div class="submit " @click="submit">提交</div>
      </div>
      <div class="header_pc" v-show="!flag">
        <div class="qid">{{ i + 1 }} / {{ topic.length }}</div>
        <div class="submit" @click="submit">提交</div>
      </div>
    </div>
    <div class="main" :class="flag ? 'ipadmain' : ''">
      <div class="topic">
        <div v-for="(item, index) in topic" :key="index">
          <div v-if="index == i">
            <div class="stem">{{ item.content }}</div>
            <div class="img" v-if="item.img_url">
              <img
                :src="item.cdn + item.img_url"
                @click="preview(item.cdn + item.img_url)"
              />
            </div>
            <!-- 单选 -->
            <van-radio-group
              v-model="radioList[index]"
              class="group "
              v-if="item.answer.length == 1"
            >
              <van-radio
                :name="op.option"
                checked-color="#3DC17D"
                class="radio cursor"
                v-for="(op, opindex) in item.options"
                :key="opindex"
                @click="hangleClick(op.option)"
              >
                {{ op.option }}. {{ op.content }}
              </van-radio>
            </van-radio-group>
            <!-- 多选 -->
            <van-checkbox-group
              v-model="result"
              class="group"
              v-if="item.answer.length > 1"
            >
              <van-checkbox
                :name="op.option"
                v-for="(op, opindex) in item.options"
                :key="opindex"
                class="radio cursor"
                @click="clickChecked(op.option)"
                checked-color="#3DC17D"
              >
                {{ op.option }}. {{ op.content }}</van-checkbox
              >
            </van-checkbox-group>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="btn active cursor" v-if="i > 0" @click="pre">上一题</div>
      <div class="btn " v-if="i == 0">上一题</div>
      <div
        class="btn active cursor"
        v-if="topic.length > 1 && i + 1 != topic.length"
        @click="next"
      >
        下一题
      </div>
      <div class="btn " v-if="topic.length == i + 1">
        下一题
      </div>
    </div>
    <van-image-preview
      v-if="show"
      v-model="show"
      :images="showImgList"
      @change="onChange"
      ref="imagePreview"
      :start-position="0"
    >
    </van-image-preview>
    <transition name="alert_box">
      <div class="coutoast" v-show="showalert == true" @touchmove.stop.prevent>
        <div class="coutoast_box">
          <div class="alert">
            <div class="alert_body">
              <div class="text_title">提示</div>
              <div class="text_d">
                还有{{ notAnswer }}道题未作答，提交后未作答将判断为回答错误
              </div>
            </div>
            <div class="text_footer">
              <div class="btn" @click="showalert = false">取消</div>
              <div class="btn borderLeft" @click="affirmSubmit">确定提交</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { isMobile } from "../../common/util";
import { RadioGroup, Radio, ImagePreview, Checkbox, CheckboxGroup } from "vant";
import {
  studentEndTopicList,
  submitTopicAnswerList,
  startAnswer,
  getMyTopicReport
} from "../../api/common";
import { sendMessage } from "../../api/client";
export default {
  components: {
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox,
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  data() {
    return {
      showImgList: [],
      flag: isMobile(),
      show: false,
      index: 0,
      radio: "",
      showalert: false,
      topic: [],
      i: 0,
      radioList: [],
      answer_list: [],
      result: [],
      notAnswer: 0
    };
  },
  created() {},
  mounted() {
    this.onload();
    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.toBack();
    });
  },

  methods: {
    // 单选框
    hangleClick(val) {
      console.log(val);
      this.radioList[this.i] = val;
    },
    // 复选框

    clickChecked(val) {
      this.radioList[this.i] = this.result;
    },
    // 确认提交
    affirmSubmit() {
      submitTopicAnswerList({
        schedule_id: this.$route.query.schedule_id,
        answer_list: this.answer_list
      }).then(res => {
        if (res.code == 0) {
          this.$toast("提交成功");
          this.goPracticeReport();
        } else {
          this.$toast(res.msg);
        }
      });

      this.showalert = !this.showalert;
    },
    // 去下一页
    goPracticeReport() {
      this.$router.replace({
        path: "/report/practiceReport",
        query: {
          schedule_id: this.$route.query.schedule_id,
          type: this.$route.query.type
        }
      });
    },
    // 上一题
    pre() {
      this.i--;
      this.result = this.radioList[this.i];
    },
    // 下一题
    next() {
      this.i++;
      this.result = this.radioList[this.i];
      console.log("kanakn ", this.radioList);
    },
    submit() {
      if (this.topic.length != this.answer_list.length) {
        this.topic.map((item, index) => {
          this.answer_list.push({ topic_id: item.topic_id, answer: "" });
        });
      }
      this.answer_list.map((item, i) => {
        if (this.radioList[i]) {
          this.answer_list[i].answer = [this.radioList[i]].flat(Infinity);
        } else {
          this.answer_list[i].answer = [];
        }
      });

      let count = 0;
      this.radioList.map((item, i) => {
        count++;
      });
      console.log("已答题数量", count);
      // 未作答题目数量
      this.notAnswer = this.radioList.length - count;
      if (count == this.radioList.length) {
        submitTopicAnswerList({
          schedule_id: this.$route.query.schedule_id,
          answer_list: this.answer_list
        }).then(res => {
          if (res.code == 0) {
            this.$toast("提交成功");
            this.goPracticeReport();
          } else {
            this.$toast(res.msg);
          }
        });
      } else {
        this.showalert = !this.showalert;
      }
    },
    onload() {
      studentEndTopicList({
        schedule_id: this.$route.query.schedule_id
      }).then(res => {
        if (res.code == 0) {
          this.topic = res.data;
          this.radioList.length = this.topic.length;
          this.$nextTick(() => {
            startAnswer({
              schedule_id: this.$route.query.schedule_id
            }).then(res => {
              if (res.code == 0) {
              } else {
                this.$toast(res.msg);
              }
            });
          });
        } else {
          this.$toast(res.msg);
        }
      });
    },
    toBack() {
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
    // preview(url) {
    //   this.showImgList = [url];
    //   this.show = true;
    // },
    preview(url) {
      if (this.flag) {
        this.showImgList = [url];
        this.show = true;
      } else if (!this.flag) {
        let model = {
          signal: "openView",
          name: "teacherPreview",
          url: `${window.location.protocol}//${
            window.location.host
          }/report/imgPreview?type=${
            this.$route.query.type
          }&imglist=${url}&schedule_id=${
            this.$route.query.schedule_id
          }&index=${0}`,
          size: true,
          modal: true,
          width: 696,
          height: 437
        };
        sendMessage(model);
        // this.$router.push({
        //   path: "/report/imgPreview",
        //   query: {
        //     type: this.$route.query.type,
        //     schedule_id: this.$route.query.schedule_id,
        //     imglist: url
        //   }
        // });
      }
    },
    onChange(index) {
      this.index = index;
      // this.show = true;
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.homework {
  // height: 100%;
  padding-bottom: 57px;
  box-sizing: border-box;
  // overflow-y: scroll;
}
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
    padding: 30px 15px 10px;
    box-sizing: border-box;
    justify-content: space-between;
    @media (max-width: 500px) {
      padding: 10px 15px;
    }
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
    .submit {
      font-size: 18px;
      font-weight: 500;
      color: #3dc17d;
      line-height: 25px;
      cursor: pointer;
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
    .submit {
      font-size: 18px;
      font-weight: 500;
      color: #3dc17d;
      line-height: 25px;
      cursor: pointer;
    }
  }
}
// 主体部分
.ipadmain {
  padding-top: 80px !important;
}
.main {
  padding: 15px;
  padding-top: 60px;
  box-sizing: border-box;
  @media (max-width: 500px) {
    padding-top: 60px !important;
  }
  .topic {
    background: #ffffff;
    border-radius: 5px;
    padding: 30px 20px;
    box-sizing: border-box;
    // 题干
    .stem {
      font-size: 14px;
      font-weight: 500;
      color: #292d33;
      line-height: 25px;
    }
    .img {
      max-height: 200px;
      margin-top: 33px;

      img {
        max-width: 100%;
        max-height: 200px;
        object-fit: cover;
        cursor: pointer;
      }
    }
    @media (max-width: 500px) {
      .img {
        max-height: 200px;
        margin-top: 33px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          max-width: 100%;
          max-height: 200px;
          object-fit: cover;
        }
      }
    }
  }
  .group {
    margin-top: 46px;
  }
  .radio + .radio {
    margin-top: 30px;
  }
  .radio {
    font-size: 14px;
    font-weight: 500;
    color: #292d33;
    line-height: 25px;
    max-width: 100%;
    width: fit-content;
    word-break: break-all;
  }
  ::v-deep.van-radio__icon .van-icon {
    border: 2px solid #3dc17d;
  }

  ::v-deep.van-checkbox__icon .van-icon {
    border: 2px solid #3dc17d;
  }
}
// 底部按钮
.footer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  padding: 7px 20px;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  bottom: 0;
  .btn {
    border-radius: 5px;

    padding: 10px 50px;
    box-sizing: border-box;
    font-size: 15px;
    font-weight: 500;

    line-height: 21px;
    border: 1px solid #999999;
    color: #999999;
  }
  .active {
    border: 1px solid #3dc17d;
    color: #3dc17d;
  }
  .btn + .btn {
    margin-left: 20px;
  }
  @media (max-width: 500px) {
    .btn + .btn {
      margin-left: 15px;
    }
  }
}
.coutoast {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  z-index: 9;
  font-size: 16px;
  .coutoast_box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .alert {
    width: 278px;
    height: 154px;
    background: #fff;
    border-radius: 12px;
    top: 50%;
    left: 50%;
    animation: mymove 0.3s;
    box-sizing: border-box;
    .alert_body {
      padding: 15px 20px 21px;
      box-sizing: border-box;
      .text_title {
        font-size: 18px;
        font-weight: 500;
        color: #333333;
        line-height: 25px;
        text-align: center;
      }
      .text_d {
        margin-top: 10px;
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        line-height: 20px;
        text-align: center;
      }
    }
    .text_footer {
      display: flex;
      border-top: 1px solid #dae3f2;
      .btn {
        width: calc(50% - 0.5px);
        height: 42px;
        // padding: 10px 57px;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: 500;
        color: #333333;
        line-height: 23px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .borderLeft {
        border-left: 1px solid #dae3f2;
      }
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
</style>
