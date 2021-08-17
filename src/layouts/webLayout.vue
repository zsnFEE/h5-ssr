<template>
  <div class="webLayout">
    <div class="head">
      <div class="new_header">
        <div class="leftBox">
          <div class="back">
            <img
              src="../assets/img/img_logo2.png"
              @click="jump(titleList.title_list[0].route, 0)"
              class="cursor"
            />
          </div>
          <div class="new_font">
            <div
              v-for="(item, index) in titleList.title_list"
              :key="index"
              :data="item"
              @click="jump(item.route, index)"
              class="titleBox"
            >
              <div class="titleText cursor">{{ item.name }}</div>
              <div
                class="theBase"
                :class="titleIndex == index ? '' : 'active'"
              ></div>
            </div>
            <!--后台管理-->
            <div class="titleBox" v-if="status == 1">
              <a class="titleText cursor" :href="url" target="_blank"
                >后台管理</a
              >
            </div>
          </div>
        </div>
        <div class="rightBox">
          <!-- <div class="inputBox">
            <img src="../assets/img/ic_search@2x.png" alt="" />
            <input
              type="text"
              placeholder="兴趣技能"
              @keyup.enter="onKeyPress"
              v-model="search"
            />
          </div> -->
          <div @mouseenter="show = true" @mouseleave="show = false">
            <div v-if="token == 1" @click="login" class="login cursor">
              登录
            </div>
            <img v-else :src="user.headimgurl" alt="" class="headimg cursor" />
            <div class="triangle"></div>
            <div class="headList" v-show="show" v-if="token != 1">
              <div class="cursor" @click="toMyClass">我的课程</div>
              <div class="cursor" @click="toOrder">我的订单</div>
              <div class="cursor" @click="logOut">退出登录</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
// import routeList from "../common/routeList";
// import { apiInfo, getApply } from "../../src/common";

export default {
  name: "Myheader",
  // props: ["date"],
  data() {
    return {
      titleList: routeList,
      user: {},
      search: "",
      titleIndex: -1,
      show: false,
      status: "",
      url: "",
      token: ""
    };
  },
  created() {},
  mounted() {
    this.url =
      (process.env.VUE_APP_BACKENDURL
        ? process.env.VUE_APP_BACKENDURL
        : "https://t.stage.beidouclass.cn") + "/#/user/login";
    // 查看审核状态
    if (localStorage.getItem("access_token")) {
      getApply().then(res => {
        if (res.data.constructor != Array) {
          this.status = res.data.status;
        }
      });
    }
    if (localStorage.getItem("access_token")) {
      // 头像
      apiInfo().then(res => {
        this.user = res.data;
      });
    }
    for (var i in this.titleList.title_list) {
      if (this.$route.path == this.titleList.title_list[i].route) {
        this.titleIndex = i;
      }
    }
    if (localStorage.getItem("access_token") == "") {
      this.token = 1;
    }
  },
  methods: {
    GetCookieDomain() {
      var host = location.hostname;
      var ip = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
      if (ip.test(host) === true || host === "localhost") return host;
      var regex = /([^]*).*/;
      var match = host.match(regex);
      if (typeof match !== "undefined" && null !== match) host = match[1];
      if (typeof host !== "undefined" && null !== host) {
        var strAry = host.split(".");
        if (strAry.length > 1) {
          host = strAry[strAry.length - 2] + "." + strAry[strAry.length - 1];
        }
      }
      return "." + host;
    },
    // 登录
    login() {
      this.$router.push({
        path: "/pc/Login"
      });
    },
    // 退出登录
    logOut() {
      // document.cookie = "";
      document.cookie =
        "bd_access_token" +
        "=" +
        " " +
        "; expires_user=" +
        " " +
        "; domain=" +
        this.GetCookieDomain() +
        "; path=/";
      if (this.$route.path == "/web/Home") {
        this.$router.go(0);
      } else {
        this.$router.push({
          path: "/web/Home"
        });
        this.titleIndex = 0;
      }
      localStorage.setItem("access_token", "");
      this.token = 1;
    },
    toMyClass() {
      if (this.$route.path == "/web/myClass") {
        this.$router.go(0);
        return;
      }
      this.$router.push({
        path: "/web/myClass"
      });
      this.titleIndex = -1;
    },
    toOrder() {
      if (this.$route.path == "/web/Orders") {
        this.$router.go(0);

        return;
      }
      this.$router.push({
        path: "/web/Orders",
        query: {}
      });
      this.titleIndex = -1;
    },
    jump(route, i) {
      if (i != this.titleIndex) {
        this.$router.push({
          path: route
        });
        this.titleIndex = i;
      } else {
        // location.reload();
        this.$router.go(0);
      }
    },
    onKeyPress() {
      this.$emit("search", this.search);
    }
  }
};
</script>
<style lang="less" scoped>
.webLayout {
  height: 100%;
}
.head {
  width: 100vw;
  height: 60px;
  background: #ffffff;
  position: fixed;
  z-index: 9;
  top: 0;
  .new_header {
    width: 1200px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    margin: 0 auto;
    height: 100%;
    justify-content: space-between;
  }
  .back {
    width: 120px;

    margin-right: 70px;
  }
  .back img {
    width: 100%;
    height: 100%;
  }
  .new_font {
    text-align: center;
    display: flex;
    flex-direction: row;
    .titleBox {
      margin-right: 40px;
      display: flex;
      align-items: center;
      flex-direction: column;
      .titleText {
        margin-top: 9px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000000;
        line-height: 22px;
      }
      .theBase {
        margin-top: 6px;
        width: 30px;
        height: 3px;
        background: linear-gradient(270deg, #4581e6 0%, #68e9c7 100%);
      }
      .theBase.active {
        background: rgba(250, 250, 250, 0);
      }
    }
  }
  .leftBox {
    display: flex;
    align-items: center;
  }
  .rightBox {
    display: flex;
    align-items: center;
    position: relative;
    .inputBox {
      width: 280px;
      height: 30px;
      background: #f3f5f9;
      border-radius: 4px;
      display: flex;
      align-items: center;
      img {
        width: 12px;
        height: 12px;
        margin: 0 7px 0 9px;
      }
      input {
        background: #f3f5f9;
        border: 0px;
        height: calc(100% - 14px);
        width: 240px;
        padding: 7px 0;
        font-size: 11px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;

        line-height: 16px;
      }
      input::-webkit-input-placeholder {
        font-size: 11px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #b8bfcc;
      }
    }
    .headimg {
      width: 30px;
      height: 30px;
      object-fit: cover;
      border-radius: 50%;
      margin-left: 60px;
    }
    .headList {
      position: absolute;
      top: 40px;
      right: 0;
      width: 110px;
      height: 141px;
      background: #ffffff;
      box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.15);
      transform: translate(35%, 0);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-radius: 5px;
      div {
        width: 90px;
        height: 40px;
        text-align: center;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 42px;
      }
    }
  }
}
.triangle {
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-bottom-color: #fff;
  border-top: none;
  border-left-color: transparent;
  border-right-color: transparent;
  position: absolute;
  right: 5px;
  z-index: 99;
  top: 30px;
}
.login {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #000000;
}
</style>
