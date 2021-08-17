<template>
  <div class="evaluate">
    <div class="bgpc" style="background: #f2f5fa;"></div>
    <div class="box">
      <!--左边部分开始-->
      <div class="left_detail">
        <div class="detail_box">
          <div class="headerimg">
            <img :src="member.headimgurl" alt="" />
          </div>
          <div class="name">{{ member.nickname }}</div>
          <div class="expression">
            <div v-for="(item, index) in arr" :key="index">
              <div class="yellow">{{ item.yellow }}</div>
              <div class="font">{{ item.font }}</div>
            </div>
          </div>
          <div class="progress">
            <div class="myslider">
              <div class="slider">色彩感知</div>
              <van-slider
                :min="min"
                :max="max"
                :step="step"
                v-model="before"
                bar-height="8px"
                active-color="#ee0a24"
                @change="onBefore"
              >
                <template #button>
                  <div class="custom-button"></div>
                </template>
              </van-slider>
              <div class="score" v-if="(before / 10) % 1 === 0">
                {{ before / 10 }}.0
              </div>
              <div class="score" v-else>
                {{ before / 10 }}
              </div>
            </div>
            <div class="myslider">
              <div class="slider">造型能力</div>
              <van-slider
                :min="min"
                :max="max"
                :step="step"
                v-model="express"
                bar-height="8px"
                active-color="#ee0a24"
                @change="onExpress"
              >
                <template #button>
                  <div class="custom-button"></div>
                </template>
              </van-slider>
              <div class="score" v-if="(express / 10) % 1 === 0">
                {{ express / 10 }}.0
              </div>
              <div class="score" v-else>{{ express / 10 }}</div>
            </div>
            <div class="myslider">
              <div class="slider">工具使用</div>
              <van-slider
                :min="min"
                :max="max"
                :step="step"
                v-model="comprehend"
                bar-height="8px"
                active-color="#ee0a24"
                @change="onComprehend"
              >
                <template #button>
                  <div class="custom-button"></div>
                </template>
              </van-slider>
              <div class="score" v-if="(comprehend / 10) % 1 === 0">
                {{ comprehend / 10 }}.0
              </div>
              <div class="score" v-else>{{ comprehend / 10 }}</div>
            </div>
            <div class="myslider">
              <div class="slider">创造能力</div>
              <van-slider
                :min="min"
                :max="max"
                :step="step"
                v-model="positivity"
                bar-height="8px"
                active-color="#ee0a24"
                @change="onPositivity"
              >
                <template #button>
                  <div class="custom-button"></div>
                </template>
              </van-slider>
              <div class="score" v-if="(positivity / 10) % 1 === 0">
                {{ positivity / 10 }}.0
              </div>
              <div class="score" v-else>{{ positivity / 10 }}</div>
            </div>
            <div class="myslider">
              <div class="slider">赏析表达</div>
              <van-slider
                :min="min"
                :max="max"
                :step="step"
                v-model="thought"
                bar-height="8px"
                active-color="#ee0a24"
                @change="onThought"
              >
                <template #button>
                  <div class="custom-button"></div>
                </template>
              </van-slider>
              <div class="score" v-if="(thought / 10) % 1 === 0">
                {{ thought / 10 }}.0
              </div>
              <div class="score" v-else>{{ thought / 10 }}</div>
            </div>
          </div>
        </div>
      </div>
      <!--左边部分结束-->
      <!--右边部分开始-->
      <div class="right_detail">
        <div class="top_img" v-show="imgurl.length > 0">
          <div class="work">绘画作业</div>
          <div class="work_img" id="work_img">
            <van-image
              width="100"
              height="100"
              fit="cover"
              radius="8"
              class="img cursor"
              v-for="(item, index) in imgurl.slice(
                0,
                imgurl.length == i ? i : i - 1
              )"
              :key="index"
              :src="item.works"
              @click="exhibition(index)"
            >
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
            <!-- <div
              class="img cursor"
              v-for="(item, index) in imgurl.slice(
                0,
                imgurl.length == i ? i : i - 1
              )"
              :key="index"
            >
              <img :src="item" alt="" @click="exhibition(index)" />
            </div> -->
            <div
              class="noimg cursor"
              v-if="imgurl.length - i > 0"
              @click="exhibition(i - 1)"
            >
              <div class="addfont">+{{ imgurl.length - i + 1 }}</div>
            </div>
          </div>
        </div>
        <div class="bottom_remark">
          <div class="teacher">教师评语</div>
          <div class="textarea">
            <textarea
              name=""
              @focus="focus = true"
              @blur="focus = false"
              id="textarea"
              placeholder="请输入评语......"
              v-model="comment"
            ></textarea>
          </div>
          <div class="submit_btn cursor" @click="Submitevaluate">提交评价</div>
        </div>
      </div>
      <!--右边部分结束-->
    </div>
  </div>
</template>
<script>
import { Image as VanImage } from "vant";
import { sendMessage } from "../../api/client";
import { Slider, Dialog, ImagePreview, Lazyload, Loading } from "vant";
import { getReportinfo, Submitevaluate } from "../../api/common";
export default {
  components: {
    [Slider.name]: Slider,
    [Lazyload.name]: Lazyload,
    [VanImage.name]: VanImage,
    [Loading.name]: Loading,
    [Dialog.Component.name]: Dialog.Component,
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  data() {
    return {
      xplateWidth: 0,
      min: 0,
      max: 50,
      step: 1, //步长
      before: 0, //色彩感知
      express: 0, //造型能力
      comprehend: 0, //工具使用
      positivity: 0, //创造能力
      thought: 0, //赏析表达
      comment: "", //评价
      member: "", //学生个人信息
      // data_info:"",//报告详情
      arr: [
        { yellow: "", font: "课程进度" },
        { yellow: "", font: "回答问题" },
        { yellow: "", font: "获得点赞" }
      ],
      i: 0,
      imgurl: [],
      focus: false
    };
  },
  watch: {
    xplateWidth(val) {
      this.i = Math.floor(val / 116);
    },
    comment(v) {
      if (this.focus && v.length > 500) {
        this.$toast("教师评语最多输入500个字");
        this.comment = v.substr(0, 500);
      }
    }
  },
  created() {},

  mounted() {
    //获取报告详情
    getReportinfo({
      id: this.$route.query.report_id //报告id
    }).then(res => {
      if (res.code == 0) {
        this.imgurl = res.data.works;
        this.before = parseFloat(res.data.preview * 10); //色彩感知
        this.positivity = parseFloat(res.data.positive * 10); //创造能力
        this.express = parseFloat(res.data.expression * 10); //造型能力
        this.thought = parseFloat(res.data.think * 10); //赏析表达
        this.comprehend = parseFloat(res.data.understand * 10); //工具使用
        this.arr[0].yellow = res.data.progress; //课程进度
        this.arr[1].yellow = res.data.answer; //回答问题
        this.arr[2].yellow = res.data.like; //获得点赞
        this.comment = res.data.comment; //老师的评价
        this.member = res.data.member; //学生个人信息

        if (res.data.works) {
          this.$nextTick(() => {
            this.clientWidth(res.data.works);
          });
        }
      }
    });
  },
  methods: {
    clientWidth(works) {
      let that = this;
      this.xplateWidth = document.getElementById("work_img").clientWidth + 16;

      window.onresize = () => {
        return (() => {
          window.xplateWidth = document.getElementById("work_img").clientWidth;
          that.xplateWidth = window.xplateWidth + 16;
        })();
      };
    },

    exhibition(index) {
      let img = this.imgurl.map((item, i) => {
        return item.works;
      });
      ImagePreview({
        images: img,
        startPosition: index
      });
    },
    //色彩感知
    onBefore(before) {
      this.before = before;
    },
    //造型能力
    onExpress(express) {
      this.express = express;
    },
    //工具使用
    onComprehend(comprehend) {
      this.comprehend = comprehend;
    },
    //创造能力
    onPositivity(positivity) {
      this.positivity = positivity;
    },
    // 赏析表达
    onThought(thought) {
      this.thought = thought;
    },
    // 提交评价
    Submitevaluate() {
      if (
        (this.before == 0 ||
          this.positivity == 0 ||
          this.express == 0 ||
          this.thought == 0 ||
          this.comprehend == 0) &&
        this.comment == ""
      ) {
        this.$toast("请完善评价");
      } else {
        Submitevaluate({
          id: this.$route.query.report_id, //报告id
          comment: this.comment, //评价
          preview: (this.before / 10).toFixed(1), //色彩感知
          positive: (this.positivity / 10).toFixed(1), //创造能力
          expression: (this.express / 10).toFixed(1), //造型能力
          think: (this.thought / 10).toFixed(1), //赏析表达
          understand: (this.comprehend / 10).toFixed(1) //工具使用
        }).then(res => {
          if (res.code == 0) {
            // this.$router.push({
            //   path: "/pc/Evaluatelist",
            //   query: {}
            // });
            this.$router.go(-1);
          } else {
            this.$toast(res.msg || res.message);
          }
        });
      }
    }
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>
<style lang="less" scoped>
.evaluate {
  width: 100%;

  background: #f2f5fa;
  padding: 3.8% 4.5% 9%;
  box-sizing: border-box;
}
.box {
  width: 100%;
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
}
// 左边部分开始
.left_detail {
  width: 50%;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  align-items: center;
  background: #ffffff;
  border-radius: 8px;
  padding: 61px 3.75% 0px 3.4%;
  margin-right: 20px;
  box-sizing: border-box;
  text-align: center;
  .detail_box {
    width: 100%;
  }
  .headerimg {
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    margin-bottom: 6px;
  }
  .name {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #000000;
    margin-bottom: 16px;
  }
  .expression {
    margin-bottom: 59px;
    box-sizing: border-box;
    width: 100%;
    padding-left: 14px;
    padding-right: 14px;
    display: flex;
    justify-content: space-around;
    .yellow {
      font-size: 24px;
      font-family: DINAlternate-Bold, DINAlternate;
      font-weight: bold;
      color: #ffc900;
      margin-bottom: 5px;
    }
    .font {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #828a99;
    }
  }
  .progress {
    width: 100%;
    box-sizing: border-box;
    .myslider {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin-bottom: 28px;
    }
    .slider {
      width: 49px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #000000;
      text-align: left;
      margin-right: 23px;
    }
    .score {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
      line-height: 20px;
      margin-left: 23px;
      width: 20px;
    }
  }
}
.custom-button {
  width: 12px;
  height: 14px;
  background: #ffffff;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
}
/deep/ .van-slider__bar {
  background: linear-gradient(132deg, #ffd500 0%, #ffbf00 100%) !important;
}
/deep/ .van-slider {
  width: 60%;
}
// 右边部分开始
.right_detail {
  width: 50%;

  .top_img {
    padding: 3.22% 1.7% 3.7% 3.4%;
    background: #ffffff;
    border-radius: 8px;
    margin-bottom: 20px;
    .work {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
    }
    .work_img {
      margin-top: 15px;
      display: flex;

      align-items: center;
      .img {
        display: flex;
        img {
          width: 100px;
          height: 100px;
          margin-right: 15px;
          border-radius: 8px;
          object-fit: cover;
        }
      }
      .noimg {
        width: 100px;
        height: 100px;
        background: #f2f5fa;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        .addfont {
          font-size: 20px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #828a99;
        }
      }
    }
  }
  .bottom_remark {
    position: relative;
    background: #ffffff;
    border-radius: 8px;
    padding: 3.22% 3.4% 6.45%;

    .teacher {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
      margin-bottom: 18px;
    }
  }
  .textarea {
    width: 100%;
    #textarea {
      width: 100% !important;

      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #e7eefc;
      overflow-x: hidden;
      overflow-y: auto;
      resize: none;
      height: 23vw;
      min-height: 400px;
      border: 0;
      margin-bottom: 116px;
    }
  }
  .submit_btn {
    position: absolute;
    bottom: 40px;
    right: 30px;
    width: 90px;
    background: #3dc17d;
    // box-shadow: 0px -1px 0px 0px rgba(255, 255, 255, 0.15);
    border-radius: 4px;
    padding: 5px 18px;
    font-size: 13px;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
    box-sizing: border-box;
  }
  /deep/.van-image {
    margin-right: 15px;
  }
}
</style>
