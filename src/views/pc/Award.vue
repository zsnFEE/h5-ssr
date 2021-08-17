<template>
  <div class="award">
    <header>
      <Myheader @Faterback="toback" v-show="flag">
        <div>邀请有礼</div>
      </Myheader>
      <div class="header_pc" v-show="!flag">
        邀请有礼
      </div>
    </header>
    <body>
      <canvas
        id="myCanvas"
        width="781.5"
        height="1390"
        ref="myCanvas"
        v-show="false"
      ></canvas>
      <img :src="imageUrl" alt="" />
    </body>
    <!--底部的三个图片部分开始-->
    <div class="footer">
      <div
        class="sudoku cursor"
        v-for="(i, index) in sudoku"
        :key="index"
        @click="to(index)"
      >
        <img :src="i.img" />
        <div>{{ i.font }}</div>
      </div>
    </div>
    <!--底部的三个图片部分结束-->
  </div>
</template>
<script>
import Myheader from "../../components/header";
import env from "../../config/env";
import { getMemberCode } from "../../api/common";
import html2canvas from "html2canvas";
import { isMobile } from "../../common/util";
import { Toast } from "vant";
const URL = env.baseUrl;

export default {
  components: {
    Myheader,
    [Toast.name]: Toast
  },

  data() {
    return {
      sudoku: [
        { img: require("../../assets/img/ic_wallet.png"), font: "我的收益" },
        { img: require("../../assets/img/ic_rule.png"), font: "活动规则" },
        { img: require("../../assets/img/ic_download.png"), font: "保存图片" }
      ],
      imgUrl: `${URL}/api/member/get_member_code`,
      canvasImg: "",
      isCanvas: true,
      qeCode: "",
      imageUrl: "",
      flag: isMobile(),
      member: ""
    };
  },
  created() {},
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.toback();
    });
    let that = this;
    getMemberCode().then(res => {
      this.imgUrl = res.data.url;
      this.member = res.data.member;
      this.$nextTick(() => {
        window.scrollTo(0, 1);
        window.scrollTo(0, 0);
        this.drowCanvas();
      });
    });
  },
  methods: {
    drowCanvas() {
      let myCanvas = this.$refs.myCanvas;
      let Cwidth = 781.5;
      let CHeight = 1390;
      var ctx = myCanvas.getContext("2d");
      ctx.fillStyle = "#fff";
      // ctx.fillRect(0, 0, Cwidth, CHeight);
      new Promise((resolve, reject) => {
        let imgObj = new Image();
        imgObj.setAttribute("crossOrigin", "Anonymous");
        imgObj.onload = function() {
          ctx.drawImage(imgObj, 0, 0, 781.5, 1390);
          resolve();
        };
        imgObj.src = require("../../assets/img/bg_qrcode_1.png");
      })
        .then(() => {
          return new Promise((resolve, reject) => {
            ctx.fillStyle = "#fff";
            ctx.font = "22px PingFangSC-Regular";
            ctx.fillText(this.member.nickname, 150, 65);
            ctx.fillText("这里的课程超棒，推荐给你哦！", 150, 105);
            var headimgurl = new Image();
            headimgurl.setAttribute("crossOrigin", "Anonymous");
            headimgurl.onload = function() {
              ctx.save();
              var cx = 60 + 35;
              var cy = 40 + 35;
              ctx.arc(cx, cy, 35, 0, 2 * Math.PI);
              ctx.clip();
              ctx.drawImage(this, 60, 40, 70, 70);
              ctx.restore();
              resolve();
            };
            headimgurl.src =
              this.member.headimgurl + "?tamp=" + new Date().valueOf();
          });
        })
        .then(() => {
          return new Promise((resolve, reject) => {
            var imgobj = new Image();
            imgobj.setAttribute("crossOrigin", "Anonymous");
            imgobj.onload = function() {
              ctx.drawImage(this, 544, 1137, 135, 135);
              resolve();
            };
            imgobj.src = this.imgUrl + "?tamp=" + new Date().valueOf();
          });
        })
        .then(() => {
          this.$nextTick(() => {
            this.imageUrl = myCanvas.toDataURL("image/png");
          });
        });
    },
    // 跳转到不同的功能页面
    to(i) {
      if (i == 0) {
        this.$router.push({
          path: "/pc/Earnings",
          query: {
            token: this.$route.query.token,
            home: this.$route.query.home
          }
        });
      } else if (i == 1) {
        this.$router.push({
          path: "/pc/Rule",
          query: {
            token: this.$route.query.token,
            home: this.$route.query.home
          }
        });
      } else if (i == 2) {
        Toast.loading({
          message: "保存中...",
          forbidClick: true,
          duration: 1000
        });
        let model = {
          type: this.imageUrl.split(",")[0],
          image: this.imageUrl.split(",")[1]
        };
        dsBridge.call("saveimage", JSON.stringify(model), function(v) {});
        // 以后pc或许会用到的保存海报的方法
        // let imageUrl = myCanvas.toDataURL("image/png", 0.5);
        // this.downloadFile(imageUrl, "邀请有礼海报.png");
      }
    },
    // 以后pc或许会用到的保存海报的方法
    // downloadFile(data, filename) {
    //   var save_link = document.createElement("a");
    //   save_link.href = data;
    //   var event = new MouseEvent("click");
    //   save_link.download = filename;
    //   save_link.dispatchEvent(event);
    // },
    // 根据不同的home参数返回不同的页面
    toback() {
      this.$router.push({
        path: "/pc/Rule",
        query: { token: this.$route.query.token, home: this.$route.query.home }
      });
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.header_pc {
  width: 100%;
  padding: 11px 40px;
  background: #fff;
  box-sizing: border-box;
  position: fixed;
  z-index: 9;
  top: 0;
  font-size: 21px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
}
.award {
  width: 100%;
  min-height: 100%;
  background: #f0f4fb;
  body {
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    padding: 72px 9% 150px;
    display: flex;
    justify-content: center;
    img {
      height: 66vh;
      border-radius: 4px;
      box-shadow: #d88200 0 14px 35px -20px;
    }
  }
}
.footer {
  display: flex;
  justify-content: space-around;
  padding: 0 28%;
  bottom: 52.5px;
  position: fixed;
  width: 100%;
  box-sizing: border-box;

  .sudoku {
    width: 80px;
    height: 80px;
    position: relative;

    display: flex;
    justify-content: center;
    img {
      width: 100%;
      height: 100%;
    }
    div {
      font-size: 12px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      position: absolute;
      bottom: 0;
    }
  }
}
</style>
