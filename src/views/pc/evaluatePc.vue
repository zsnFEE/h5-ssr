<template>
  <div class="evaluate">
    <div class="bgpc" style="background: #f2f5fa;"></div>
    <div class="new_header" v-show="flag">
      <div class="back" @click="toBack">
        <img src="../../assets/img/ic_back.png" />
      </div>
      <div class="new_font">{{ titleName }}</div>
    </div>
    <div class="header_pc" v-show="!flag">
      {{ titleName }}
    </div>
    <div class="box">
      <!--左边部分开始-->
      <div class="left_detail">
        <!--头像部分开始-->
        <div class="top">
          <div class="nameBox">
            <div class="evaluateTitle">
              我的评分
              <!-- <img :src="member.headimgurl" alt="" />
              <div class="ft14">{{ member.nickname }}</div> -->
            </div>
            <div>
              <!-- <div class="fraction ft24" v-if="myInfo.score != 0">
                {{ myInfo.score }}
                <div class="fractionText ft14">分</div>
              </div>
              <div class="fractions ft14" v-else>
                暂无评分
              </div> -->
            </div>
          </div>
          <div class="fractionList">
            <div class="fractionBox">
              <div class="fraction ft24">
                {{ myInfo.score == 0 ? "暂无评分" : myInfo.score }}
              </div>
              <div class="title ft12">课堂评分</div>
            </div>
            <div class="fractionBox">
              <div class="fraction ft24">{{ myInfo.answer }}</div>
              <div class="title ft12">回答问题</div>
            </div>
            <div class="fractionBox">
              <div class="fraction ft24">{{ myInfo.like }}</div>
              <div class="title ft12">获得点赞</div>
            </div>
          </div>
          <!-- <div class="headerimg">
            <img :src="member.headimgurl" />
            <div class="name">{{ member.nickname }}</div>
          </div>
          <div class="score" v-if="myInfo.score != 0">
            {{ myInfo.score }}
            <span>分</span>
          </div>
          <div class="noscore" v-else>暂无评价</div> -->
        </div>
        <!--头像部分结束-->
        <div class="echart">
          <div class="radarBox">
            <div id="echart" class="radar" style="width:100%;height:100%"></div>
          </div>
        </div>
        <!-- <div class="work">
          <div class="job">绘画作业</div>
          <div class="num_node">{{ imgList.length }}/6</div>
        </div>
        <div class="works_img">
          <div class="img_item" v-for="(item, index) in imgList" :key="index">
            <img :src="item.works" @click="exhibition(index)" class="cursor" />
            <img
              src="../../assets/img/ic_del.png"
              class="icon cursor"
              @click="onShow(index)"
            />
          </div>
          <div class="addimg  cursor" @click="addImg" v-if="imgList.length < 6">
            <div class="add">
              <img src="../../assets/img/ic_add@2x.png" alt="" />
            </div>
            <div class="addfont">上传作业</div>
          </div>
        </div> -->
      </div>
      <!--左边部分结束-->
      <!--右边部分开始-->
      <div class="right_detail">
        <div class="card">
          <div class="teacher">绘画作业</div>
          <div v-if="imgList.length <= 0" class="noPicture">
            <div class="mask"></div>
            <div class="noPictureIcon">
              <img src="../../assets/img/img-noPicture.png" alt="" />
              <div>暂未上传</div>
            </div>
            <img
              src="../../assets/img/ic-camera.png"
              alt=""
              @click="addImg"
              class="addImgIcon"
            />
          </div>
          <div
            v-else
            class="task"
            v-for="(item, index) in imgList"
            :key="index"
          >
            <div class="mask"></div>
            <img
              :src="item.works"
              @click="exhibition(index)"
              class="cursor taskImg"
            />
            <img
              src="../../assets/img/ic- close.png"
              class="taskIcon cursor"
              @click="onShow(index)"
            />
            <img
              src="../../assets/img/ic-camera.png"
              alt=""
              @click="addImg"
              class="addImgIcon"
            />
          </div>
        </div>
        <!--教师评语开始-->
        <div class="card" style="margin-top: 20px;">
          <div class="teacher">教师评语</div>
          <div class="nofont" v-if="!myInfo.comment">教师暂未填写评语</div>
          <div class="textarea" v-else>
            <textarea
              name=""
              readonly="readonly"
              @focus="focus = true"
              @blur="focus = false"
              id="textarea"
              v-model="myInfo.comment"
            ></textarea>
          </div>
        </div>
        <!--教师评语结束-->
      </div>
      <!--右边部分结束-->
    </div>
    <van-image-preview
      v-model="imgShow"
      :images="showImgList()"
      @change="onChange"
      :start-position="imgIndex - 1"
    >
      <template v-slot:index>{{ `${imgIndex}/${imgList.length}` }}</template>
    </van-image-preview>
    <van-dialog
      v-model="show"
      title="是否删除作品"
      show-cancel-button
      @confirm="imgDelete"
    >
    </van-dialog>
  </div>
</template>
<script>
import "echarts/lib/chart/radar";
import echarts from "@/lib/echarts";
import { sendMessage } from "../../api/client";
import { getReportinfo, saveWorks, removeWorks } from "../../api/common";
import { Dialog, ImagePreview } from "vant";
import { isMobile } from "../../common/util";
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  data() {
    return {
      flag: isMobile(),
      myInfo: {},
      member: {},
      titleName: this.$route.query.class_name,
      scheduleId: this.$route.query.schedule_id,
      show: false,
      index: -1,
      imgIndex: 1,
      imgList: [],
      imgShow: false,
      focus: false,
      rate: [
        {
          name: "色彩感知",
          star: 0.0
        },
        {
          name: "赏析表达",
          star: 0.0
        },
        {
          name: "创造能力",
          star: 0.0
        },
        {
          name: "工具使用",
          star: 0.0
        },
        {
          name: "造型能力",
          star: 0.0
        }
      ]
    };
  },
  watch: {},
  created() {},

  mounted() {
    window["recvMessage"] = msg => {
      this.recvMessage(msg);
    };
    dsBridge.call("hidetabbar", "", function(v) {});
    let that = this;
    dsBridge.registerAsyn("goback", function(arg1, arg2, arg3) {
      if (that.imgShow || that.show) {
        that.imgShow = false;
        that.show = false;
      } else {
        that.toBack();
      }
    });
    getReportinfo({ id: this.scheduleId }).then(res => {
      // getReportinfo({ id: 6 }).then(res => {
      if (res.code == 0) {
        this.myInfo = res.data;
        this.member = res.data.member;
        this.imgList = res.data.works;
        this.rate = [
          {
            name: "色彩感知",
            star: res.data.preview
          },
          {
            name: "赏析表达",
            star: res.data.think
          },
          {
            name: "创造能力",
            star: res.data.positive
          },
          {
            name: "工具使用",
            star: res.data.understand
          },
          {
            name: "造型能力",
            star: res.data.expression
          }
        ];
        this.drawChart(this.rate);
      } else {
        this.$toast(res.msg || res.message);
      }
    });
  },
  methods: {
    onShow(index) {
      this.show = true;
      this.index = index;
    },
    onChange(index) {
      this.imgIndex = index + 1;
    },
    exhibition(index) {
      this.imgIndex = index + 1;
      this.imgShow = true;
    },
    showImgList() {
      return this.imgList.map(val => {
        return val.works;
      });
    },
    imgDelete() {
      removeWorks({ id: this.imgList[this.index].id }).then(res => {
        if (res.code == 0) {
          this.imgList.splice(this.index, 1);
          this.$toast("删除成功");
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    },
    addImg() {
      dsBridge.call("uploadopus", "", function(v) {});
      let that = this;
      dsBridge.registerAsyn("UploadOpus", function(arg1, arg2, arg3) {
        let imgurl = JSON.parse(arg1).opus;
        saveWorks({ id: that.scheduleId, works: imgurl }).then(res => {
          if (res.code == 0) {
            let List = { id: res.data.id, works: imgurl };
            that.imgList.push(List);
            that.$toast("上传成功");
          } else {
            that.$toast(res.msg);
          }
        });
      });
      this.getImg();
    },
    getImg() {
      sendMessage({
        signal: "getImgList"
      });
    },
    recvMessage(msg) {
      // console.log("试试这个:", msg, JSON.parse(msg).imgList);
      let imgurl = JSON.parse(msg).imgList[0].url;
      saveWorks({ id: this.scheduleId, works: imgurl }).then(res => {
        if (res.code == 0) {
          let List = { id: res.data.id, works: imgurl };
          this.imgList.push(List);
          this.$toast("上传成功");
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    },
    drawChart(item) {
      let result = item.map(val => {
        return val.star;
      });
      let option = {
        radar: [
          {
            splitNumber: 5,
            indicator: (function() {
              let res = [];
              for (let i = 0; i < item.length; i++) {
                res.push({ text: `${item[i].name} ${item[i].star}`, max: 5 });
              }
              return res;
            })(),
            name: {
              textStyle: {
                color: "rgba(130, 138, 153, 1)",
                fontWeight: "500"
              }
            },
            axisLine: {
              lineStyle: {
                color: "rgba(218, 227, 242, 1)"
              }
            },
            splitLine: {
              lineStyle: {
                color: "rgba(218, 227, 242, 1)"
              }
            },

            splitArea: {
              show: false,
              areaStyle: {
                color: "rgba(255,0,0,0)" // 图表背景的颜色
              }
            },
            center: ["50%", "50%"],
            radius: 80
          }
        ],
        series: [
          {
            type: "radar",
            symbolSize: 0, // 拐点的大小

            tooltip: {
              trigger: "item"
            },
            areaStyle: {
              normal: {
                width: 3,
                opacity: 0.1
              }
            },
            data: [
              {
                itemStyle: {
                  normal: {
                    // color: "rgba(255,225,0,.3)",
                    color: "rgba(255, 192, 0, 1)",
                    lineStyle: {
                      color: "white"
                    }
                  }
                },
                value: result
              }
            ]
          }
        ]
      };
      let echart = echarts.init(document.getElementById("echart"), null, {
        devicePixelRatio: 2.5
      });
      echart.setOption(option, true);
      window.onresize = function() {
        echart.resize();
      };
    },

    toBack() {
      this.$router.push({
        path: "/pc/Studentschedules",
        query: { token: this.$route.query.token }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.new_header {
  width: 100%;
  padding: 8.5px 0 8.5px 21.05px;
  background: #fff;
  display: flex;
  box-sizing: border-box;
  position: fixed;
  z-index: 9;
  left: 0;
  top: 0;
}
.header_pc {
  width: 100%;
  padding: 11px 40px;
  background: #fff;
  box-sizing: border-box;
  position: fixed;
  font-size: 21px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
  z-index: 9;
  left: 0;
}
.back {
  width: 20px;
  height: 20px;
  margin-top: 9px;
}
.back img {
  width: 100%;
  height: 100%;
}
.new_font {
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #292d33;
  text-align: center;
  margin: auto;
}
.evaluate {
  width: 100%;
  background: #f2f5fa;
  padding: 70px 9% 25px;
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
  align-items: center;
  background: #ffffff;
  border-radius: 8px;
  padding: 20px;
  margin-right: 20px;
  box-sizing: border-box;
  text-align: center;
  .top {
    display: flex;
    // align-items: center;
    justify-content: space-between;
    flex-direction: column;
    .nameBox {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .evaluateTitle {
        font-size: 18px;
        font-weight: 500;
        color: #292d33;
        line-height: 25px;
      }
      img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
        border-radius: 50%;
      }
      div {
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #292d33;
        line-height: 30px;
        display: flex;
        flex-direction: row;
      }
      .fraction {
        font-family: DINAlternate-Bold, DINAlternate;
        font-weight: bold;
        color: #ffc900;
        line-height: 30px;
        display: flex;
        flex-direction: row;
        align-items: baseline;
        .fractionText {
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffc900;
          line-height: 22px;
        }
      }
      .fractions {
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        line-height: 30px;
        color: rgba(130, 138, 153, 1);
      }
    }
    .fractionList {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .fractionBox {
        margin-top: 33px;

        display: flex;
        flex-direction: column;
        align-items: center;
        .fraction {
          font-family: DINAlternate-Bold, DINAlternate;
          font-weight: 500;
          color: #ffc900;
          line-height: 28px;
          margin-bottom: 5px;
        }
        .title {
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #292d33;
          line-height: 16.5px;
        }
      }
    }

    .headerimg {
      display: flex;
      align-items: center;
      img {
        width: 60px;
        height: 61px;
        margin-right: 8px;
        border-radius: 50%;
      }
    }
    .name {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
    }
    .score {
      font-size: 24px;
      font-family: DINAlternate-Bold, DINAlternate;
      font-weight: bold;
      color: #ffc900;
      margin-right: 15px;
      span {
        font-size: 12px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffc900;
      }
    }
    .noscore {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #828a99;
    }
  }
  .echart {
    width: 100%;
    flex-grow: 1;
  }
  .radarBox {
    height: 280px;
    width: 100%;
  }
  .work {
    margin-top: 71px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #828a99;
    .job {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
      text-align: left;
    }
    .num_node {
      margin-right: 15px;
    }
  }
  .works_img {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .img_item {
      position: relative;
      margin-right: 15px;
      margin-bottom: 16px;
    }
    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 8px;
    }
    .icon {
      position: absolute;
      width: 24px;
      height: 24px;
      top: -12px;
      right: -12px;
    }
  }
  .addimg {
    width: 100px;
    height: 100px;
    background: #f2f5fa;
    border-radius: 8px;
    text-align: center;
    .add {
      margin-top: 31px;
      img {
        width: 24px;
        height: 24px;
      }
    }
    .addfont {
      font-size: 12px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #828a99;
      text-align: center;
    }
  }
}
// 右边部分开始
.right_detail {
  // width: calc(50% - 10px);
  width: 50%;
  box-sizing: border-box;
  .card {
    border-radius: 8px;
    background: #ffffff;
    padding: 20px;
    .noPicture {
      margin-top: 10px;
      width: 100%;
      min-height: calc(33.79vw / calc(730 / 562));
      height: calc(33.79vw / calc(730 / 562));
      max-height: calc(33.79vw / calc(730 / 562));
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      border: 1px solid #dcdcdc;
      .mask {
        border-radius: 5px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: absolute;
        background: #3dc17d;
        opacity: 0.1;
      }
      .noPictureIcon {
        padding-top: 16px;
        img {
          width: 45px;
          height: 40px;
        }
        div {
          // margin-top: 10px;
          font-size: 12px;
          font-weight: 500;
          color: #999999;
          line-height: 16px;
        }
      }

      .addImgIcon {
        width: 35px;
        height: 35px;
        position: absolute;
        right: 10px;
        bottom: 10px;
      }
    }
    .task {
      margin-top: 10px;
      width: 100%;
      min-height: calc(33.79vw / calc(730 / 562));
      height: calc(33.79vw / calc(730 / 562));
      max-height: calc(33.79vw / calc(730 / 562));
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      border: 1px solid #dcdcdc;
      .mask {
        border-radius: 5px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: absolute;
        background: #3dc17d;
        opacity: 0.1;
        z-index: 0;
      }
      .taskImg {
        width: 100%;
        height: 100%;
        object-fit: contain;
        z-index: 1;
      }
      .taskIcon {
        width: 21px;
        height: 21px;
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 2;
      }
      .addImgIcon {
        width: 35px;
        height: 35px;
        position: absolute;
        right: 10px;
        bottom: 10px;
        z-index: 2;
      }
    }
  }
  // padding: 42px 30px;
  // background: #ffffff;
  // border-radius: 8px;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // flex-direction: column;

  .teacher {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #000000;
  }
  .nofont {
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #828a99;
    text-align: center;
    width: 100%;
    margin-top: 19px;
    margin-bottom: 19px;
  }
}
.textarea {
  width: 100%;
  margin-top: 18px;
  #textarea {
    width: 100% !important;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #828a99;
    overflow-x: hidden;
    overflow-y: auto;
    resize: none;
    height: calc(100vh - 524px);

    border: 0;
  }
}
</style>
