<template>
  <div class="set">
    <div class="bgpc"></div>
    <div class="new_header" v-show="flag">
      <div class="back" @click="toBack">
        <img src="../../assets/img/ic_back.png" />
      </div>
      <div class="new_font">帮助中心</div>
    </div>
    <div class="header_pc" v-show="!flag">
      帮助中心
    </div>
    <!--body部分开始-->
    <div class="set_box">
      <div class="attend">
        <p><strong> 1.如何购买课程</strong></p>
        <p>您好，购买课程具体操作步骤如下：</p>
        <p>（1）下载猴猴画App，使用手机号码注册登录。</p>
        <p>（2）点击下方“课程”选择对应的体验课或系统班课程。</p>
        <p>
          （3）点击“立即购买”进入付款界面，选择购买课程阶段并详细填写收件人及地址信息
        </p>
        <p>（4）检查地址填写无误，选择支付方式（微信和支付宝），完成购买。</p>
        <p>
          （5）付款成功后将会收到上课详情短信通知，请根据短信内容添加老师微信，等待上课。
        </p>
      </div>
      <div class="attend">
        <p><strong> 2.画材发货时间</strong></p>
        <p>
          画材礼盒在您购课成功后3-5个工作日寄出，物流信息可在APP中点击“我的”-“我的订单”-“物流信息”查看快递详情
        </p>
      </div>
      <div class="attend">
        <p><strong> 3.支持哪些设备上课</strong></p>
        <p>
          您好，猴猴画APP支持电脑/iPad/手机所有设备安装，您可根据自己的需求使用相应设备
        </p>
      </div>
      <div class="attend">
        <p><strong> 4.如何添加班主任微信</strong></p>
        <p>
          您在购课成功后，会有短信通知您班主任微信号及手机号，您可以根据短信提示进行添加，添加成功后请耐心等待，班主任会在24小时之内通过您的微信申请。
        </p>
      </div>
      <div class="attend">
        <p><strong> 5.退课咨询</strong></p>
        <p>
          APP端无退课通道，具体退课细节可联系班主任沟通解决
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { isMobile } from "../../common/util";
import { apiInfo, updateProfile } from "../../api/common";
export default {
  components: {},
  data() {
    return {
      flag: isMobile()
    };
  },
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.toBack();
    });
  },
  methods: {
    toBack() {
      this.$router.go(-1);
    }
  },
  watch: {}
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
  z-index: 9;
}
.header_pc {
  width: 100%;
  padding: 11px 40px;
  background: #fff;
  box-sizing: border-box;
  font-size: 21px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
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

.set {
  width: 100%;
  height: 100%;
  background: #f3f5f9;
}
.set_box {
  padding: 72px 112px 30px;
  background: #f3f5f9;
  width: 100%;
  box-sizing: border-box;
}

.attend {
  background: #fff;
  border-radius: 12px;
  padding: 12.5px 14px 14px 15px;
  line-height: 25px;
  font-size: 14px;
  margin-bottom: 15px;
  p {
    margin-bottom: 7.5px;
  }
}
</style>
