<template>
  <div class="tab">
    <div class="title">
      <img src="../../assets/img/logo_dipper.png" alt="" />
    </div>
    <div class="menus">
      <div
        class="menu"
        v-for="(item, index) in menus"
        :key="index"
        :class="index == current ? 'active' : ''"
      >
        <span @click="change(item, index)">
          <img
            :src="
              index == current
                ? require(`../../assets/img/ic_${item.icon}_active.png`)
                : require(`../../assets/img/ic_${item.icon}.png`)
            "
            alt=""
          />
          <p>{{ item.menu_name }}</p>
        </span>
      </div>
    </div>
    <div class="bottom" v-if="userInfo">
      <img @click="toUserInfo" :src="userInfo.headimgurl" alt="" />
      <span>{{ userInfo.nickname }}</span>
      <p @click="quit">退出</p>
    </div>
  </div>
</template>

<script>
import { sendMessage } from "../../api/client";
import { getAppMenu } from "../../api/common";

export default {
  data() {
    return {
      front_domain: "",
      userInfo: {},
      current: 0,
      menus: []
    };
  },
  methods: {
    toUserInfo() {
      this.current = -1;
      // 详情页面
      let model = {
        signal: "changeView",
        path: this.front_domain + "/pc/me",
        center: this.front_domain + "/pc/me",
        urls: this.menus
          .map(val => {
            return val.path;
          })
          .join(",")
      };
      dsBridge.call("changeView", JSON.stringify(model), function(v) {});

      sendMessage(model);
    },
    quit() {
      dsBridge.call("logout", "", function(v) {});
      //pc退出登陆
      sendMessage({ signal: "logout" });
    },
    change(item, index) {
      let model = {
        signal: "changeView",
        index: index,
        path: item.path,
        center: this.front_domain + "/pc/me",
        urls: this.menus
          .map(val => {
            return val.path;
          })
          .join(",")
      };
      console.log(model);
      dsBridge.call("changeView", JSON.stringify(model), function(v) {});
      sendMessage(model);
      this.current = index;
    }
  },
  created() {
    let that = this;
    window["recvMessage"] = msg => {
      // 更新头像
      if (JSON.parse(msg).operation == "setHeadImg") {
        this.userInfo.headimgurl = JSON.parse(msg).url;
      } else if (JSON.parse(msg).operation == "setName") {
        //修改名称
        this.userInfo.nickname = JSON.parse(msg).name;
      }
    };
    dsBridge.registerAsyn("UploadImage", function(arg1) {
      //获取native返回的图片地址
      that.userInfo.headimgurl = JSON.parse(arg1).absolutely;
    });
    dsBridge.registerAsyn("SetName", function(arg1) {
      //获取native返回的图片地址
      that.userInfo.nickname = JSON.parse(arg1).name;
    });
    let model = {
      signal: "windowSettings",
      width: 200,
      closeButton: "hide"
    };
    sendMessage(model);
    // dsBridge.call("windowSettings", JSON.stringify(model));

    getAppMenu().then(res => {
      this.front_domain = res.data.front_domain;
      res.data.menu_list.map(val => {
        if (val.menu_name == "教学课表") {
          val.icon = "teacher";
        } else {
          val.icon = "schedule";
        }
      });

      this.menus = res.data.menu_list;
      this.userInfo = res.data.member;

      let view = {
        signal: "changeView",
        index: this.current,
        path: this.menus[this.current].path,
        center: this.front_domain + "/pc/me",
        urls: this.menus
          .map(val => {
            return val.path;
          })
          .join(",")
      };
      sendMessage(view);
      dsBridge.call("changeView", JSON.stringify(view), function(v) {});
    });
  }
};
</script>

<style lang="less" scoped>
.tab {
  position: relative;
  box-sizing: border-box;
  padding: 40px 0;
  padding-top: 60px;
  height: 100vh;
  border-right: 1px solid #f0f0f0;
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    padding: 0 35px;
    img {
      width: 100%;
      height: auto;
    }
    span {
      display: inline-block;
      margin-left: 7px;
      font-size: 26px;
      font-family: DIN-BlackItalic, DIN;
      font-weight: normal;
      color: #333333;
    }
  }
  .menus {
    padding-left: 25px;
    max-height: calc(100vh - 290px);
    overflow: auto;
    padding: 0 21px 0 37px;
    .menu {
      margin-bottom: 10px;
      span {
        transition: all 0.3s;
        border-radius: 4px;
        box-sizing: border-box;
        display: inline-block;
        width: 100%;
        height: 36px;
        font-size: 13px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #8a8f99;
        position: relative;
        background: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        p {
          margin-left: 4px;
        }
        img {
          margin-left: 15px;
          width: 20px;
          height: auto;
        }
      }
      &.active {
        span {
          color: white;
          background: linear-gradient(135deg, #58dda8 0%, #37bb73 100%);
          &::before {
            position: absolute;
            left: -13px;
            top: 18px;
            content: "";
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: #3dc17d;
          }
        }
      }
    }
  }
  .bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translate(-50%);
    img {
      cursor: pointer;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 10px;
    }
    span {
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #07301b;
      display: inline-block;
      margin-bottom: 15px;
    }
    p {
      cursor: pointer;
      width: 120px;
      height: 28px;
      border-radius: 6px;
      border: 1px solid #638475;
      box-sizing: border-box;
      font-size: 12px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #638475;
      line-height: 28px;
      text-align: center;
    }
  }
}
</style>
