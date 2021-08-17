<template>
  <div class="temp">
    <div class="backgroundColor"></div>
    <div class="buttonBox">
      <button @click="toExperience">体验课</button>
      <button @click="toSystem">系统课</button>
      <button>录播课</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: ""
    };
  },
  mounted() {
    //分销者id:s
    localStorage.setItem("s", this.$route.query.s);
    this.flag = navigator.userAgent.match(
      /(phone|pod|iPhone|iPod|ios|Android|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    console.log(this.flag);
  },
  methods: {
    toExperience() {
      if (this.flag) {
        localStorage.setItem("classType", 0);
        this.$router.push({
          path: "/order/phone/classDetailsPhone",
          query: {
            token: this.$route.query.token
          }
        });
      } else {
        localStorage.setItem("Classtype", 0);
        this.$router.push({
          path: "/order/ipad/Trialclass",
          query: {
            token: this.$route.query.token,
            Classtype: 0
          }
        });
      }
    },
    // 去系统课
    toSystem() {
      if (this.flag) {
        localStorage.setItem("classType", 1);
        this.$router.push({
          path: "/order/phone/classDetailsPhone",
          query: {
            token: this.$route.query.token
          }
        });
      } else {
        localStorage.setItem("Classtype", 1);
        this.$router.push({
          path: "/order/ipad/Trialclass",
          query: {
            token: this.$route.query.token,
            Classtype: 1
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.temp {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .backgroundColor {
    background: #ffffff;
  }
  .buttonBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    width: 82%;
    button {
      margin: 25px;
      width: 100%;
      height: 50px;
      border-radius: 25px;
      background-color: rgba(220, 38, 38, 0);
      border: 1.5px solid #ff7300;
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ff7300;
      line-height: 25px;
    }
  }
}
</style>
