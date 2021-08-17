<template>
  <div class="Replacephone" :class="flag ? 'pc_box' : ''">
    <Header v-if="flag" :title="''" @toBack="toBack"> </Header>
    <body>
      <div class="bind">已绑定手机号码</div>
      <div class="phone">{{ mphone }}</div>
      <div class="replace_btn" @click="replace_btn">更换手机号码</div>
    </body>
  </div>
</template>
<script>
import Myheader from "../../components/header";
import { isMobile } from "../../common/util";

export default {
  components: {
    Myheader
  },

  data() {
    return {
      flag: isMobile(),
      phone: "",
      mphone: ""
    };
  },
  created() {
    let p = localStorage.getItem("phone");
    this.phone = p;
    this.mphone = p.substr(0, 3) + "****" + p.substr(7);
  },
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.toBack();
    });
  },
  methods: {
    toBack() {
      this.$router.push({
        path: "/pc/Personalpc",
        query: {
          token: this.$route.query.token
        }
      });
    },
    //去原手机号页面
    replace_btn() {
      this.$router.push({
        path: "/pc/Originalphone",
        query: {
          token: this.$route.query.token
        }
      });
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.titleArrow {
  padding: 10px;
}
.Replacephone {
  min-height: calc(100vh - 40px);
  background: #f3f5f9;
  padding: 20px;
  width: calc(100vw - 40px);
  &.pc_box {
    background: #f3f5f9;

    min-height: 100vh;
    width: 100vw;
    padding: 0;
    body {
      min-height: 100vh;
      width: 100vw;
    }
  }
  body {
    border-radius: 8px;
    background: white;
    box-sizing: border-box;
    position: absolute;
    width: calc(100vw - 40px);
    min-height: calc(100vh - 40px);
  }
}
.bind {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #292d33;
  text-align: center;
  margin-top: 156px;
}
.phone {
  font-size: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #000000;
  margin-top: 10px;
  margin-bottom: 69px;
  text-align: center;
}
.replace_btn {
  padding: 10px 0px;
  border-radius: 4px;
  border: 1.5px solid #8a8f99;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #8a8f99;
  text-align: center;
  min-width: 230px;
  width: 230px;
  margin: auto;
  box-sizing: border-box;
  cursor: pointer;
}
</style>
