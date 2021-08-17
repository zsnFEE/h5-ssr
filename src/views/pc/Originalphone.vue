<template>
  <div class="Originalphone">
    <Header
      :hideBack="!flag ? true : ''"
      :title="`${approve ? '输入原手机号' : '输入新手机号'}`"
      @toBack="approve ? toBack() : toApprove()"
    >
    </Header>

    <div v-if="approve">
      <body>
        <div class="phone">
          <input
            type="text"
            placeholder="请输入手机号"
            v-model="Originalphone"
            maxlength="11"
          />
        </div>
        <div class="replace_btn" @click="Original">下一步</div>
      </body>
    </div>
    <div v-else>
      <body>
        <div>
          <div class="phone">
            <input
              type="text"
              placeholder="请输入手机号"
              maxlength="11"
              v-model="newphone"
            />
          </div>
          <div class="replace_btn" @click="next">下一步</div>
        </div>
      </body>
    </div>
  </div>
</template>
<script>
import Myheader from "../../components/header";
import { isMobile } from "../../common/util";
import { updateProfile, checkPhone, getLoginSms } from "../../api/common";

export default {
  components: {
    Myheader
  },

  data() {
    return {
      flag: isMobile(),
      Originalphone: "", //原来的手机号
      newphone: "", //新手机号
      approve: true
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
    Original() {
      if (this.Originalphone && /^1[3456789]\d{9}$/.test(this.Originalphone)) {
        checkPhone({
          phone: this.Originalphone
        }).then(res => {
          if (res.code == 0) {
            // console.log(res);
            this.Originalphone = "";
            this.approve = !this.approve;
            this.$toast("验证成功");
          } else {
            this.$toast(res.msg || res.message);
          }
        });
      } else {
        this.$toast("电话号码不符合规范");
      }
    },
    toApprove() {
      this.newphone = "";
      this.approve = !this.approve;
    },
    next() {
      if (this.Originalphone && /^1[3456789]\d{9}$/.test(this.Originalphone)) {
        localStorage.setItem("phone", this.newphone);
        getLoginSms({ use: "reset_phone", phone: this.newphone }).then(res => {
          if (res.code == 0) {
            this.$router.push({
              path: "/pc/Codephone",
              query: {
                token: this.$route.query.token,
                phone: this.newphone
              }
            });
          } else {
            this.$toast(res.msg || res.message);
          }
        });
      } else {
        this.$toast("电话号码不符合规范");
      }
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.Originalphone {
  width: 100%;
  min-height: 100%;
  background: #ffffff;
  body {
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    padding: 72px 9% 15px;
  }
}
.bind {
  font-size: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #000000;
  margin-top: 2%;
  margin-bottom: 10%;
  text-align: center;
}
.phone {
  margin: auto;
  width: 320px;
  box-sizing: border-box;
  margin-top: 115px;
}
.phone input {
  padding: 13.99px 24px 13.5px;
  background: #f2f5fa;
  border-radius: 5px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  width: 100%;
  border: 0;
  box-sizing: border-box;
}
.phone input::-webkit-input-placeholder {
  color: #b8bfcc;
}
.replace_btn {
  background: rgba(61, 193, 125, 1);
  box-shadow: rgba(61, 193, 125, 0.7) 0 7px 15px -5px;
  border-radius: 5px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  padding: 12.5px 132.5px;
  text-align: center;
  width: 320px;
  box-sizing: border-box;
  margin: 2.9% auto 0;
  cursor: pointer;
}
</style>
