export default {
  "strandard-dev": {
    server: {},
    api: {
      NODE_ENV: "production",
      VUE_APP_CURRENTMODE: "standard-dev",
      VUE_APP_APISITE: "apidevse.beidouclass.cn",
      VUE_APP_BASEURL: "https://apidevse.beidouclass.cn"
    }
  },
  strandard: {
    server: {},
    api: {
      NODE_ENV: "production",
      VUE_APP_CURRENTMODE: "standard",
      VUE_APP_APISITE: "apise.beidouclass.cn",
      VUE_APP_BASEURL: "https://apise.beidouclass.cn"
    }
  },
  "standard-online": {
    server: {},
    api: {
      NODE_ENV: "production",
      VUE_APP_CURRENTMODE: "standard-online",
      VUE_APP_APISITE: "api.beidouclass.com",
      VUE_APP_BASEURL: "https://api.beidouclass.com",
      VUE_APP_CDN: "https://bdx-static.beidouclass.com/static/",
      VUE_APP_CUSTOMER: "北斗星在线教育"
    }
  },
  "customer-mingqian": {
    server: {},
    api: {
      NODE_ENV: "production",
      VUE_APP_CURRENTMODE: "customer-mingqian",
      VUE_APP_APISITE: "api.beidou.mingqianedu.com",
      VUE_APP_BASEURL: "https://api.beidou.mingqianedu.com",
      VUE_APP_CDN: "https://static.beidou.mingqianedu.com/static/",
      VUE_APP_CUSTOMER: "明乾教育"
    }
  }
};
