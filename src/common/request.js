import axios from "axios";
// import $nuxt from "nuxt";
import env from "../config/env";
import router from "../router.js";
import { sendMessage } from "../api/client";
import { isMobile } from "../common/util";

const flag = isMobile();
const AJAX = axios.create({
  baseURL: env.baseUrl,
  timeout: 30000,
  withCredentials: env.credential
});

AJAX.interceptors.request.use(
  function(config) {
    let token;
    // if (router.history.current.query.token) {
    //   config.headers["X-AccessToken"] = router.history.current.query.token;
    // }

    let bd_env = "";
    var name = "bd_env";
    var cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      // 判断这个cookie的参数名是不是我们想要的
      if (cookie.substring(0, name.length + 1) === name + "=") {
        bd_env = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }

    if (document.cookie && bd_env) {
      config.headers["App-Type"] = bd_env;
    }

    // config.headers["App-Type"] = "mac";
    if (localStorage.access_token) {
      // token = localStorage.token
      !config.headers["X-AccessToken"] &&
        (config.headers["X-AccessToken"] = localStorage.access_token);
    } else {
      token = "";
    }
    config.data = {
      ...config.data
    };
    return config;
  },
  function(error) {
    console.log("请求拦截器---", error);
    alert("网络错误，请重试(400)");
    return Promise.reject(error);
  }
);

// 响应拦截器
AJAX.interceptors.response.use(
  function(response) {
    localStorage.setItem("code", response.data.code);
    let model = {
      code: localStorage.code
    };
    if (response.data.code == 900001 || response.data.code == 900002) {
      var browser = {
        versions: (function() {
          var u = navigator.userAgent,
            app = navigator.appVersion;
          return {
            //移动终端浏览器版本信息
            trident: u.indexOf("Trident") > -1, //IE内核
            presto: u.indexOf("Presto") > -1, //opera内核
            webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
            gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或uc浏览器
            iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf("iPad") > -1, //是否iPad
            webApp: u.indexOf("Safari") == -1 //是否web应该程序，没有头部与底部
          };
        })(),
        language: (
          navigator.browserLanguage || navigator.language
        ).toLowerCase()
      };
      let bd_env = "";
      var name = "bd_env";
      var cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        // 判断这个cookie的参数名是不是我们想要的
        if (cookie.substring(0, name.length + 1) === name + "=") {
          bd_env = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }

      let beforQuery = {};
      //  router.app._route.query;
      // if (
      //   router.app._route.path == "/pc/Login" ||
      //   router.app._route.path == "/phone/loginPhone"
      // ) {
      //   return;
      // }

      if (flag) {
        dsBridge.call("RoomSyn", JSON.stringify(model));
        dsBridge.call("tokeninvalid", "", function(v) {});
        if (browser.versions.iPad) {
          router.push({ path: "/pc/Login", query: beforQuery });
        } else if (browser.versions.mobile) {
          router.push({ path: "/phone/loginPhone", query: beforQuery });
        } else {
          router.push({ path: "/pc/Login", query: beforQuery });
        }
      } else {
        sendMessage({ signal: "expireTime", code: localStorage.code });
        router.push({ path: "/pc/Login", query: beforQuery });
      }
    }
    return response.data;
  },
  function(error) {
    if (error && error.response) {
      alert("网络错误，请重试(500)");
    }
    return Promise.reject(error);
  }
);

export default {
  get(url, param, headers = {}) {
    return AJAX.get(url, {
      params: {
        ...param
      },
      headers: {
        ...headers
      }
    });
  },
  post(url, param, headers = {}) {
    return AJAX.post(
      url,
      {
        ...param
      },
      {
        ...headers
      }
    );
  },
  put(url, param = null, headers = {}) {
    return AJAX.put(url, param, {
      headers
    });
  },
  file(url, param = null, headers = {}) {
    return AJAX.post(url, param, {
      headers: Object.assign(
        {
          "Content-Type": "multipart/form-data"
        },
        headers
      )
    });
  },
  delete(url, param = null, headers = {}) {
    return AJAX.delete(url, {
      param,
      headers: Object.assign(
        {
          "Content-Type": "multipart/form-data"
        },
        headers
      )
    });
  }
};
