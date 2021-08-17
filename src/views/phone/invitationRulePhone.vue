<template>
  <div class="policy" v-title data-title="邀请有礼">
    <div class="backgroundColor"></div>
    <!-- <img
      src="../../assets/img/yqyl.jpg"
      class="imgBackground"
      alt=""
      :class="appFlag ? '' : 'active'"
    /> -->
    <header v-show="appFlag">
      <div class="title title_box">
        <img
          @click="goback"
          src="../../assets/img/ic_back.png"
          class="titleArrow title_arrow"
        />
        <div class="titleText title_text">活动规则</div>
        <div class="titleDv "></div>
      </div>
    </header>
    <body class="topDistance">
      <p class="insetBox" v-html="info.rule">{{ info.rule }}</p>
    </body>
    <!-- <body style="">
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
            <button @click="toInvitation">立即参与</button>
           
          </div>
        </div>
      </div>
    </body> -->
  </div>
</template>
<script>
import { shareActivityDetail } from "../../api/common";

export default {
  data() {
    return {
      appFlag: this.$route.query.appFlag,
      info: {}
    };
  },
  mounted() {
    this.getApi();
    dsBridge.call("hidetabbar", "", function(v) {});
    let that = this;
    dsBridge.registerAsyn("goback", function(arg1, arg2, arg3) {
      that.goback();
    });
  },
  methods: {
    getApi() {
      shareActivityDetail({ id: this.$route.query.id }).then(res => {
        if (res.code == 0) {
          this.info = res.data;
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    },
    goback() {
      this.$router.go(-1);
      // if (this.$route.query.homeFlag) {
      //   this.$router.go(-1);
      // } else {
      //   if (this.$route.query.appFlag == 2) {
      //     this.$router.push({
      //       path: "/phone/findPhone",
      //       query: { token: this.$route.query.token }
      //     });
      //   } else {
      //     this.$router.push({
      //       path: "/phone/myInfoPhone",
      //       query: { token: this.$route.query.token }
      //     });
      //   }
      // }
    },
    toInvitation() {
      this.$router.push({
        path: "/phone/invitationPhone",
        query: {
          token: this.$route.query.token,
          appFlag: this.$route.query.appFlag
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.policy {
  .title {
    .titleDv {
      width: 18px;
    }
  }
  .backgroundColor {
    background: #fff;
  }
  .imgBackground {
    padding-top: 42px;
    width: 100%;
    height: auto;
    z-index: -1;
  }
  .imgBackground.active {
    padding-top: 0px;
  }
  .topDistance {
    padding: 42px 10px 15px;
    @media (min-width: 767px) {
      padding: 42px 10% 15px;
    }
  }
  body {
    // padding-bottom: 122px;
    button {
      width: calc(100% - 72px);
      position: fixed;
      bottom: 36px;
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
    }
    .station {
      height: 42px;
      width: 10px;
    }
    .copoRight {
      text-align: center;
    }
    .container {
      padding: 5px 36px;
      line-height: 2;
      color: white;
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
</style>
