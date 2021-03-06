/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * credential: 跨域
 *
 */

const dev = {
  baseUrl: process.env.VUE_APP_BASEURL
    ? process.env.VUE_APP_BASEURL
    : // "https://api.test.beidouclass.cn",
      // "https://apidevse.beidouclass.cn",
      "https://apise.beidouclass.cn",
  // "https://apidevse.beidouclass.cn",
  // "https://api.stage.beidouclass.cn",
  credential: true
};

export default dev;
