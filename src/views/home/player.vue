<template>
  <div class="player">
    <!-- <button @click="toStart">点击</button> -->
    <canvas id="video1" ref="video1" class="player_container"></canvas>
  </div>
</template>
<script>
import { getPlayUrl } from "../../api/common";
export default {
  methods: {
    // toStart() {
    //   this.player.start(this.url);
    //   console.log(this.player.start);
    // },
    refresh() {
      let url;
      getPlayUrl({
        lesson_id: this.$route.query.lesson_id
      }).then(res => {
        url = res.data.hdl.ultra;
        // var player;
        // console.log("first");
        let that = this;
        // NodePlayer.load(() => {
        // console.log("???");
        this.player = new NodePlayer();
        // console.log("!!", this.player);
        this.player.setView("video1");
        // this.player.setBufferTime(1000);
        // console.log("second");
        // console.log("url", url);
        this.player.start(url);
        this.playerContainerResize();
        this.player.on("videoInfo", (w, h) => {
          this.r = w / h;
          this.playerContainerResize();
        });
        this.player.on("error", err => {
          ++this.errormount;
          // console.log("error", err);
          if (this.errormount >= 3) {
            this.refresh();
          }
        });
        // });
      });
    },
    playerContainerResize() {
      var playerContainer = this.$refs.video1;

      var ww = window.innerWidth;
      var wh = window.innerHeight;
      var wr = ww / wh;
      // console.log(this.r);

      if (wr > this.r) {
        // 宽高比大于 16/9  主高
        var w = wh * this.r;
        this.player.resizeView(w, wh);
      } else {
        // 宽高小于 16/9  主宽
        var h = ww / this.r;
        this.player.resizeView(ww, h);
      }
    }
  },
  data() {
    return {
      url: "",
      r: 16 / 9,
      errormount: 0,
      player: ""
      // npStyle: { width: "", height: "" }
    };
  },
  mounted() {
    // console.log(this.$route.query.lesson_id);
    // this.$toast(this.$route.query.lesson_id);
    if (window.addEventListener) {
      window.addEventListener(
        "resize",
        () => {
          this.playerContainerResize();
        },
        false
      );
    }
    this.refresh();
    // 2422
  }
};
</script>
<style lang="less" scoped>
.player {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(23, 23, 23, 255);
}
</style>
