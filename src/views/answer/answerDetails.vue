<template>
  <!--答题明细页面-->
  <div
    class="answerdetails"
    :class="device == 'android' ? 'androidActive' : ''"
  >
    <img
      src="../../assets/img/btn-home-close.png"
      alt=""
      class="closeImg"
      @click="close"
      v-if="device == 'iphone' || device == 'android' || device == 'ipad' "
    />
    <div style="padding-top:30px">
      <div
        class="detailstitle"
        :class="device == 'android' ? 'androidActive' : ''"
      >
        答题明细
      </div>
    </div>
    <Details :detailstyle="2" :list="studentlist"></Details>
  </div>
</template>
<script>
import Details from "../../components/details";
import { answerStudentDetailed } from "../../api/common";
import { sendMessage } from "../../api/client";
import { isIos, isDevice } from "../../common/util";
export default {
  components: {
    Details
  },
  data() {
    return {
      clazz_schedule_id: this.$route.query.schedule_id,
      studentlist: "",
      timer: null,
      iosFlag: isIos(),
      device: isDevice()
    };
  },

  mounted() {
    let pcmodel = {
      type: "windowSettings",
      width: 300,
      height: 420,
      closeButton: "show"
    };
    sendMessage(pcmodel);
    this.timer = setInterval(() => {
      answerStudentDetailed({ clazz_schedule_id: this.clazz_schedule_id }).then(
        res => {
          if (res.code == 0) {
            this.studentlist = res.data;
          } else {
            this.$toast(res.msg || res.message);
          }
        }
      );
    }, 1000);
  },
  methods: {
    close() {
      dsBridge.call("closeQuestion", "", function(v) {});
    }
  },
  watch: {},
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>
<style lang="less" scoped>
.closeImg {
  position: absolute;
  z-index: 100;
  width: 30px;
  height: 30px;
  top: 10px;
  right: 10px;
}
.answerdetails {
  width: 100vw;
  min-height: 100%;
  background: #1e1e1f;
}
.androidDetails {
  width: 100vw;
  min-height: 100%;
  background: #1e1e1f;
  border-radius: 10px;
  box-sizing: border-box;
  padding-top: 130px;
}
.detailstitle {
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  margin: 0px auto 0px;
  text-align: center;
  padding-top: 30px;
  position: fixed;
  z-index: 99;
  left: 0;
  right: 0;
  top: 0px;
  background: #1e1e1f;
}
.androidActive {
  border-radius: 10px;
}
</style>
