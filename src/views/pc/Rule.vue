<template>
  <div class="rule">
    <div class="bgpc"></div>
    <header>
      <Myheader @Faterback="toback" v-show="flag">
        <div>活动规则</div>
      </Myheader>
      <div class="header_pc" v-show="!flag">
        活动规则
      </div>
    </header>
    <div class="body">
      <div class="bgimg">
        <img src="../../assets/img/yqyl.png" />
      </div>
      <div class="container" id="container">
        <div class="page list js_show">
          <div class="page__bd">
            <article class="weui-article">
              <section>
                <h1>一、邀请有礼活动规则</h1>
                <section>
                  <h2>
                    1.参与用户：猴猴画注册用户可参与活动，受邀好友须为从未购买过被分享课程的用户。
                  </h2>
                  <h2>
                    2.参与方式：参加邀请有礼活动，领取专属的分享海报。你可以通过将海报发送给微信好友或分享到朋友圈、微信群等方式进行传播，好友通过扫描或识别海报中的二维码进行购买后，你将获得相应金额的奖励，关注猴猴画在线少儿美术服务号可以查看自己的收益，并提现到微信零钱中。
                  </h2>
                </section>
              </section>

              <section>
                <h1>二、奖励规则</h1>
                <section>
                  <h2>
                    1.奖励规则：每邀请一位新用户购买课程可得到相应金额的返现奖励；返现比例视各课程设置而定。
                  </h2>
                  <h2>
                    2.每邀请一个新用户通过所分享的海报购买猴猴画少儿美术体验课，可获得返现奖励5元。
                  </h2>
                  <h2>
                    3.新用户下单成功后收益自动更新，24小时后可进行提现。
                  </h2>
                  <h2>
                    4.当个人收益超过 1
                    元时，可以通过猴猴画在线少儿美术服务号进行提现。发起提现申请之后，猴猴画在线少儿美术服务号会为你发送对应提现金额的微信红包，红包在发出后24小时自动过期，请及时领取。
                  </h2>
                </section>
              </section>

              <section>
                <h1>三、其他规则</h1>
                <section>
                  <h2>
                    1.同一登录账号，同一手机号
                    或其他合理显示为同一用户的情形，均视为同一用户。
                  </h2>
                  <h2>
                    2.课程收入以猴猴画在线少儿美术订单记录为准进行核算，如非通过海报扫描或识别形成的购买不计为奖励收入。
                  </h2>
                  <h2>
                    3.按照《中华人民共和国个人所得税法》规定，因参加本次活动个人获奖后应向税务机关缴纳的偶然所得税将由猴猴画在线少儿美术代扣代缴纳，您最终收到的奖金金额为代扣代缴完毕的税后金额。
                  </h2>
                  <h2>
                    4.活动期间，如出现不可抗力或情势变更的情况（包括但不限于重大灾害事件、黑客攻击、系统故障、活动受政府机关指令需停止举办或调整的），猴猴画在线少儿美术可依相关法律法规的规定主张免责。
                  </h2>
                  <h2>
                    5.对于以任何不正当方式参与活动的用户，包括但不限于侵犯第三人合法权益、作弊、扰乱系统、实施网络攻击、批量注册、用机器注册账户、用机器模拟客户端等，猴猴画在线少儿美术有权取消其参与和获得奖金资格。
                  </h2>
                  <h2>
                    6.活动其他未尽事宜，请于猴猴画在线少儿美术服务号进行留言咨询。
                  </h2>
                </section>
              </section>
            </article>
            <div class="button cursor" @click="toAward">立即参与</div>
          </div>
        </div>
      </div>
    </div>
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
      flag: isMobile()
    };
  },
  created() {},
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.toback();
    });
  },
  methods: {
    toback() {
      let home = localStorage.getItem("home");
      if (this.$route.query.withdraw == 2) {
        this.$router.go(-1);
      } else if (home == 1) {
        this.$router.push({
          path: "/pc/Homepage",
          query: {
            token: this.$route.query.token,
            home: this.$route.query.home
          }
        });
      } else if (home == 3) {
        this.$router.push({
          path: "/pc/Me",
          query: {
            token: this.$route.query.token,
            home: this.$route.query.home
          }
        });
      }
    },
    // 跳转到分销首页
    toAward() {
      this.$router.push({
        path: "/pc/Award",
        query: {
          token: this.$route.query.token,
          home: this.$route.query.home
        }
      });
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.rule {
  width: 100%;
  min-height: 100%;
  background: #f0f4fb;
  .body {
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    padding: 72px 9% 0px;
    .station {
      height: 42px;
      width: 10px;
    }
    .copoRight {
      text-align: center;
    }
    .container {
      padding: 5px 12%;
      line-height: 2;
      color: #fff;
      background: #febe3a;
      padding-bottom: 15%;
      section {
        margin-bottom: 22px;
      }
      p {
        margin: 0 0 12px;
        line-height: 2;
      }
      h1 {
        font-size: 18px;
        line-height: 2;

        font-weight: 400;
        margin-bottom: 0.9em;
      }
      h2 {
        font-weight: 400;
        line-height: 2;

        margin-bottom: 5px;
        font-size: 16px;
      }
      h3 {
        font-size: 15px;
        font-weight: 400;
        line-height: 2;

        margin-bottom: 5px;
      }
    }
  }
}
.bgimg {
  width: 100%;

  img {
    width: 100%;
    display: block;
  }
}
.button {
  width: 62%;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 50px;
  height: 50px;
  background: #6551ea;
  border-radius: 25px;
  border: 0px;
  z-index: 1;
  box-shadow: #6551ea 0 5px 5px -5px;
  text-align: center;
  margin-top: 4%;
  position: fixed;
  z-index: 9;
  left: 19%;
  bottom: 4%;
}
</style>
