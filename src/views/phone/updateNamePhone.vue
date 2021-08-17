<template>
  <div class="temp">
    <div class="backgroundColor"></div>
    <Header :title="'修改昵称'" @toBack="toBack">
      <div @click="toUpdate" class="titleDv ft14">保存</div>
    </Header>

    <body class="listBox">
      <input
        type="text"
        v-model="name"
        placeholder="请输入昵称"
        class="ft16"
        @keyup.down="asd()"
      />
    </body>
  </div>
</template>

<script>
import { updateProfile } from "../../api/common";

export default {
  data() {
    return {
      name: ""
    };
  },

  watch: {
    name(val, old) {
      val = val.substr(0, this.getByteLen(val) + 1);
      val = val.replace(/\s+/g, "");
      this.name = val;
    }
  },
  mounted() {
    this.name = this.$route.query.name;
    let that = this;
    dsBridge.registerAsyn("goback", function(arg1, arg2, arg3) {
      that.toBack();
    });
  },
  methods: {
    asd() {
      console.log(1);
    },
    getByteLen(val) {
      var len = 0;
      let index = -1;
      for (var i = 0; i < val.length; i++) {
        if (val[i].match(/[^\x00-\xff]/gi) != null) len += 2;
        else len += 1;
        if (len > 16) {
          this.$toast("内容太长，最多支持8个中文或16个英文，请修改后再试");
          break;
        }
        index = i;
      }
      return index;
    },
    toBack() {
      this.$router.push({
        path: "/phone/settingPhone",
        query: { token: this.$route.query.token }
      });
    },
    toUpdate() {
      if (this.name) {
        updateProfile({ nickname: this.name }).then(res => {
          if (res.code == 0) {
            this.$toast("修改成功");
            this.$router.push({
              path: "/phone/settingPhone",
              query: { token: this.$route.query.token }
            });
          } else {
            this.$toast(res.msg || res.message);
          }
        });
      } else {
        this.$toast("请输入昵称");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.temp {
  width: 100%;
  height: 100%;
  .title {
    .titleArrow {
      margin-right: 52px;
    }
    .titleDv {
      display: flex;
      flex-direction: row-reverse;
      width: 70px;
      margin-top: 12px;
      // font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: black;
      line-height: 20px;
    }
  }
  .listBox {
    padding: 42px 12px 12px;
    input {
      margin-top: 10px;
      width: calc(100% - 24px);
      border: 1px;
      height: 50px;
      padding: 0px 12px;
      line-height: 50px;
      // font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      border-radius: 8px;
    }
    input::-webkit-input-placeholder {
      font-size: 16px;
      // font-size: 4.2667vw;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(184, 191, 204, 1);
    }
  }
}
</style>
