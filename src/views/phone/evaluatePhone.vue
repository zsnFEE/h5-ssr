<template>
  <div class="temp">
    <div class="backgroundColor"></div>
    <header>
      <div class="title title_box">
        <img
          @click="toBack"
          src="../../assets/img/ic_back.png"
          class="titleArrow title_arrow"
        />
        <div class="titleText title_text">{{ titleName }}</div>
        <div class="titleDv "></div>
      </div>
    </header>
    <body>
      <div class="topBox">
        <div class="infoBox">
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
        </div>
        <div class="lineBox"></div>
        <div class="radarBox">
          <div id="echart" class="radar" style="width:100%;height:100%"></div>
        </div>
      </div>

      <div class="bottomBox">
        <div class="titleStyle">
          <span class="titleBox ft18">
            绘画作业
            <!-- <div class="backgroundClass"></div> -->
          </span>
          <!-- <div class="tips">{{ imgList.length }}/6</div> -->
        </div>
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
          v-for="(item, index) in imgList"
          :key="index"
          class="worksBox"
          v-else
        >
          <img :src="item.works" @click="exhibition(index)" />
          <img
            src="../../assets/img/ic- close.png"
            class="icon"
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
      <div class="middleBox" v-if="myInfo.comment">
        <span class="titleBox ft18">
          教师评语
          <!-- <div class="backgroundClass"></div> -->
        </span>
        <div class="comment ft12">
          {{ myInfo.comment }}
        </div>
      </div>
    </body>
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
    <!-- <div class="buttonBox">
      <button class="ft18" @click="addImg">
        上传绘画作业
      </button>
    </div> -->
  </div>
</template>

<script>
// import "echarts/lib/chart/radar";
// import "echarts/lib/chart/radar";
// import echarts from "@/lib/echarts";
import { getReportinfo, saveWorks, removeWorks } from "../../api/common";
import { Dialog, ImagePreview } from "vant";

export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  data() {
    return {
      myInfo: {},
      member: {},
      titleName: this.$route.query.class_name,
      scheduleId: this.$route.query.schedule_id,
      show: false,
      index: -1,
      imgIndex: 1,
      imgList: [],
      imgShow: false,
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
  mounted() {
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
  watch: {},
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
      // if (this.imgList.length >= 6) {
      if (this.imgList.length >= 1) {
        this.$toast("最多仅支持1张作品");
      } else {
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
      }
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
    },

    toBack() {
      this.$router.push({
        path: "/phone/standardCurriculumListPhone",
        query: { token: this.$route.query.token }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.temp {
  width: 100%;
  height: 100%;
  header {
    .title {
      z-index: 3;
      .titleDv {
        width: 18px;
      }
    }
  }

  body {
    padding: 57px 15px 112px;

    .topBox {
      .infoBox {
        padding: 20px 0px 22px;
        .nameBox {
          margin: 0 20px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .evaluateTitle {
            font-size: 18px;
            font-weight: bold;
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
            padding: 0 25px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .fraction {
              font-family: DINAlternate-Bold, DINAlternate;
              font-weight: bold;
              color: #ffc900;
              line-height: 28px;
              margin-bottom: 5px;
              white-space: nowrap;
            }
            .title {
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #292d33;
              line-height: 16.5px;
            }
          }
        }
      }
      .lineBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: calc(100%);
        height: 6px;
        background: url(../../assets/img/img_line.png) no-repeat center center /
          cover;
      }
      background: #ffffff;
      border-radius: 12px;
      .radarBox {
        height: 260px;
      }
    }
    .middleBox {
      margin-top: 15px;
      padding: 20px 20px 35px;
      background: #ffffff;
      border-radius: 12px;
      .titleBox {
        position: relative;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #292d33;
        line-height: 25px;
        text-align: center;
        z-index: 2;
        .backgroundClass {
          z-index: -1;
          position: absolute;
          width: 100%;
          height: 10px;
          bottom: 2.5px;
          left: 0;
          right: 0;
          background: linear-gradient(131deg, #ffd500 0%, #ffbf00 100%);
          box-shadow: 0px -1px 0px 0px rgba(255, 255, 255, 0.15);
        }
      }
      .comment {
        margin-top: 12px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #828a99;
        line-height: 22px;
        word-wrap: break-word;
      }
    }
    .bottomBox {
      margin-top: 15px;
      padding: 20px 20px 35px;
      background: #ffffff;
      border-radius: 12px;
      .titleStyle {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .titleBox {
          position: relative;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #292d33;
          line-height: 25px;
          text-align: center;
          z-index: 2;
          .backgroundClass {
            z-index: -1;
            position: absolute;
            width: 100%;
            height: 10px;
            bottom: 2.5px;
            left: 0;
            right: 0;
            background: linear-gradient(131deg, #ffd500 0%, #ffbf00 100%);
            box-shadow: 0px -1px 0px 0px rgba(255, 255, 255, 0.15);
          }
        }
        .tips {
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;

          color: rgba(130, 138, 153, 1);
        }
      }
      .noPicture {
        margin-top: 10px;
        width: 100%;
        height: 235px;
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

      .worksBox {
        position: relative;
        margin-top: 12px;
        display: flex;
        align-items: center;
        img {
          width: 100%;
        }
        .icon {
          top: 5px;
          right: 5px;
          width: 20px;
          height: 20px;
          position: absolute;
          z-index: 1;
        }
        .addImgIcon {
          width: 35px;
          height: 35px;
          position: absolute;
          right: 10px;
          bottom: 10px;
        }
      }
    }
  }
  .buttonBox {
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 31px;
    z-index: 2;
    button {
      // font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 50px;
      width: 280px;
      height: 50px;
      background: rgba(255, 115, 0, 1);
      border-radius: 25px;
      border: 0px;
      z-index: 1;
      box-shadow: rgba(255, 115, 0, 1) 0 5px 5px -5px;
    }
  }
}
</style>
