<template>
  <div class="statistics">
    <div class="echart">
      <div
        id="myChart"
        :style="{ width: '100%', height: '100%', margin: 'auto' }"
      ></div>
    </div>
    <div class="explain">
      <div class="son" v-for="(item, index) in sonlist" :key="index">
        <div class="num">{{ item.num }}</div>
        <div class="font">{{ item.font }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "@/lib/echarts";
import { answerStatistics } from "../api/common";
export default {
  name: "statistics",
  props: [""],
  data() {
    return {
      sonlist: [
        { num: "", font: "答题用时" },
        { num: "", font: "答题人数" },
        { num: "", font: "正确率" }
      ],
      ok_answer: "",
      statistics: "",
      x_axis: [],
      seconds: "",
      clazz_schedule_id: this.$route.query.schedule_id,
      myChart: {},
      seriesData: [],
      timer: null,
      options: {
        title: { text: "" },
        tooltip: {},
        xAxis: {
          //x轴
          type: "category",
          data: "", //x轴的数据
          splitLine: { show: false }, //去除网格分割线
          // splitArea: {show: true},//保留网格区域
          axisLine: {
            //坐标线
            lineStyle: {
              type: "solid",
              color: "#D8D8D8", //轴线的颜色
              width: "1" //坐标线的宽度
            }
          },
          axisTick: {
            //刻度
            show: false //不显示刻度线
          },
          axisLabel: {
            textStyle: {
              color: "#9B9B9B" //坐标值的具体的颜色
            }
          },
          splitLine: {
            show: false //去掉分割线
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            //线
            show: true,
            lineStyle: {
              type: "solid",
              color: "#D8D8D8", //轴线的颜色
              width: "1" //坐标线的宽度
            }
          },
          axisTick: {
            //刻度
            show: false
          },
          axisLabel: {
            show: false
          },
          minInterval: this.statistics ? Math.max(...this.statistics) + 0.2 : 0, //标值的最小间隔
          splitLine: {
            lineStyle: {
              type: "solid",
              color: "#D8D8D8", //轴线的颜色
              width: "" //坐标线的宽度
            }
          }
        },
        series: [
          {
            name: "",
            type: "bar",
            data: "",
            itemStyle: {
              normal: {
                // color: "#494A4D", //设置柱子颜色
                barBorderRadius: [2, 2, 0, 0], //设置柱子圆角
                label: {
                  show: true, //柱子上显示值
                  position: "top", //值在柱子上方显示
                  textStyle: {
                    color: "#9B9B9B" //值得颜色
                  }
                }
              }
            },
            barWidth: 10 //设置柱子宽度，单位为px
          }
        ]
      }
    };
  },
  mounted() {
    this.apiload();
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.getElementById("myChart"));
    // 绘制图表
    window.onresize = this.myChart.resize;
  },
  methods: {
    apiload() {
      let that = this;
      this.timer = setInterval(() => {
        answerStatistics({ clazz_schedule_id: this.clazz_schedule_id }).then(
          res => {
            if (res.code == 0) {
              this.statistics = res.data.statistics.data;
              this.ok_answer = res.data.statistics.ok_answer;
              this.seriesData = [];
              this.x_axis = res.data.statistics.x_axis;
              this.options.xAxis.data = this.x_axis;
              this.statistics.map((val, index) => {
                let itemStyle = {};
                if (this.ok_answer.split(",").includes(this.x_axis[index])) {
                  itemStyle = {
                    normal: {
                      color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                          {
                            offset: 0,
                            color: "#FFD500" // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: "#FFBF00" // 100% 处的颜色
                          }
                        ],
                        false
                      )
                    }
                  };
                } else {
                  itemStyle = {
                    normal: {
                      color: "#494A4D"
                    }
                  };
                }
                this.seriesData.push({
                  value: this.statistics[index],
                  itemStyle: itemStyle
                });
              });
              this.options.series[0].data = this.seriesData;
              this.myChart.setOption(this.options);
              this.seconds = res.data.time;
              this.sonlist[0].num = this.formateSeconds(res.data.time);
              this.sonlist[1].num = res.data.people;
              this.sonlist[2].num = res.data.accuracy;
            } else {
              this.$toast(res.msg || res.message);
            }
          }
        );
      }, 1000);
      this.$once("hook:beforeDestroy", () => {
        clearInterval(this.timer);
      });
    },
    // Seconds() {
    //   // let sec = this.seconds++;
    //   this.sonlist[0].num = this.formateSeconds(this.seconds);
    // },
    //将秒转化为时分秒
    formateSeconds(endTime) {
      var secondTime = parseInt(endTime); //将传入的秒的值转化为Number
      let min = 0; // 初始化分
      let h = 0; // 初始化小时
      let result = "";
      if (secondTime > 60) {
        //如果秒数大于60，将秒数转换成整数
        min = parseInt(secondTime / 60); //获取分钟，除以60取整数，得到整数分钟
        secondTime = parseInt(secondTime % 60); //获取秒数，秒数取佘，得到整数秒数
        if (min > 60) {
          //如果分钟大于60，将分钟转换成小时
          h = parseInt(min / 60); //获取小时，获取分钟除以60，得到整数小时
          min = parseInt(min % 60); //获取小时后取佘的分，获取分钟除以60取佘的分
        }
      }
      result = `${h.toString().padStart(2, "0")}:${min
        .toString()
        .padStart(2, "0")}:${secondTime.toString().padStart(2, "0")}`;
      return result;
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
    // this.stop();
  }
};
</script>
<style lang="less" scoped>
.echart {
  width: 100%;
  // height: 262px;
  height: calc(100vh - 180px);
}
.explain {
  width: calc(100vw - 104px);
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: auto;
}
.son .num {
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
}
.son .font {
  margin-top: 6px;
  font-size: 12px;
  font-weight: 400;
  color: #9b9b9b;
  text-align: center;
}
// 结束答题按钮
.endbuttton {
  width: 200px;
  height: 32px;
  background: linear-gradient(131deg, #ffd500 0%, #ffbf00 100%);
  border-radius: 4px;
  margin: 44px auto 28px;
  font-size: 12px;
  font-weight: 500;
  color: #292d33;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
