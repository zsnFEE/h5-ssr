import Vue from "vue";
// import echarts from "echarts"; // 引入echarts
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
require("echarts/lib/component/tooltip");
// require("echarts/lib/component/brush");
require("echarts/lib/component/legend");
require("echarts/lib/component/title");
require("echarts/lib/component/radar");
Vue.prototype.$echarts = echarts; // 引入组件（将echarts注册为全局）
