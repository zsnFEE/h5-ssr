<template>
  <div class="Nickname">
    <Header v-if="flag" :title="'修改昵称'" @toBack="toBack">
      <div class="delete" @click="save">保存</div>
    </Header>

    <div class="header_pc" v-else>
      <div>修改昵称</div>
      <div class="delete" @click="save">保存</div>
    </div>
    <body :class="!flag ? 'pcContain' : ''">
      <div class="nickname">
        <input type="text" v-model="nickname" />
      </div>
    </body>
  </div>
</template>
<script>
import Myheader from "../../components/header";
import { isMobile } from "../../common/util";
import { updateProfile } from "../../api/common";
import { sendMessage } from "../../api/client";

export default {
  components: {
    Myheader
  },

  data() {
    return {
      flag: isMobile(),
      nickname: this.$route.query.nickname
    };
  },
  created() {},
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.toBack();
    });
  },
  methods: {
    toBack() {
      this.$router.go(-1);
    },
    save() {
      if (this.nickname) {
        updateProfile({
          // sex: this.sexFlag,
          // headimgurl: this.imgUrl,
          nickname: this.nickname
          // born: this.birthday
        }).then(res => {
          if (res.code == 0) {
            let model = {
              changetype: "1", //修改昵称
              nickname: this.nickname //昵称
            };
            sendMessage(model);
            dsBridge.call("SetName", JSON.stringify(model), function(v) {});
            // console.log(res);
            this.$router.push({
              path: "/pc/Personalpc",
              query: {
                token: this.$route.query.token,
                nickname: this.nickname
              }
            });
            this.nickname = "";
            this.$toast("修改成功");
          }
        });
      } else {
        this.$toast("请输入昵称");
      }
    }
  },
  watch: {
    nickname() {
      var len = 0;
      let index = -1;
      for (var i = 0; i < this.nickname.length; i++) {
        if (this.nickname[i].match(/[^\x00-\xff]/gi) != null) len += 2;
        else len += 1;
        if (len > 16) {
          this.$toast("内容太长，最多支持8个中文或16个英文，请修改后再试");
          break;
        }
        index = i;
      }
      this.nickname = this.nickname.substr(0, index + 1);
      this.nickname = this.nickname.replace(/\s+/g, "");
    }
  }
};
</script>
<style lang="less" scoped>
.new_header {
  width: 100%;
  padding: 8px 20px 8px 21px;
  background: #fff;
  display: flex;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  z-index: 9;
}
.header_pc {
  width: 100%;
  padding: 11px 20px;
  background: #fff;
  display: flex;
  box-sizing: border-box;
  position: fixed;
  z-index: 9;
  font-size: 21px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
  justify-content: space-between;
  align-items: center;
}
.back {
  width: 20px;
  height: 20px;
}
.back img {
  width: 100%;
  height: 100%;
}
.new_font {
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #292d33;
  text-align: center;
  margin: auto;
  font-weight: 500;
}
.delete {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(138, 143, 153, 1);
  cursor: pointer;
}
.Nickname {
  width: 100%;
  min-height: 100%;
  background: #f3f5f9;

  body {
    width: 100%;
    box-sizing: border-box;
    height: 100vh;
    padding: 72px 9% 15px;
    &.pcContain {
      padding: 72px 20px 15px;
    }
    .nickname {
      background: #fff;
      width: 100%;
      overflow: hidden;
      border-radius: 8px;

      input {
        border: 0;
        width: 100%;
        padding: 2%;
        font-size: 16px;
        box-sizing: border-box;
      }
    }
  }
}
.bind {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #292d33;
  text-align: center;
  margin-top: 83px;
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
  padding: 12.5px 44px;
  border-radius: 35px;
  border: 1.5px solid #8a8f99;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #8a8f99;
  text-align: center;
  width: 200px;
  margin: auto;
  box-sizing: border-box;
}
</style>
