<template>
  <div class="report">
    <div class="box">
      <!--评价弹框开始-->
      <CommentDialog
        v-if="commentInfo"
        ref="cropperComp"
        :commentVisible="commentVisible"
        :commentInfo="commentInfo"
        @cancelComment="cancelComment"
        @saveComment="saveComment"
      />
      <!--评价弹框结束-->
    </div>
  </div>
</template>
<script>
import { saveEvaluate, getTeacherClassReport } from "../../api/common";
import { Rate } from "vant";
import { sendMessage } from "../../api/client";
import CommentDialog from "../../components/commetDialog";
export default {
  components: { [Rate.name]: Rate, CommentDialog },
  data() {
    return {
      commentInfo: "",
      commentVisible: true
    };
  },
  mounted() {
    getTeacherClassReport({
      clazz_schedule_id: this.$route.query.lesson_id
    }).then(res => {
      if (res.code == 0) {
        this.commentInfo = res.data.student_list.filter(item => {
          if (item.id == this.$route.query.id) {
            return item;
          }
        })[0];
        console.log(this.commentInfo);
      }
    });
    let pcmodel = {
      signal: "windowSettings",
      // width: 696,
      // height: 413,
      closeButton: "hide"
    };
    sendMessage(pcmodel);
  },
  methods: {
    cancelComment() {
      this.commentVisible = false;
      let pcmodel = {
        signal: "closeview"
      };
      sendMessage(pcmodel);
      // this.$router.push({
      //   path: "/pc/teacherReport",
      //   query: { lesson_id: this.$route.query.lesson_id }
      // });
    },

    saveComment(item) {
      console.log(item);
      saveEvaluate({
        id: item.id,
        evaluate: item.evaluate,
        score: item.score
      }).then(res => {
        if (res.code == 0) {
          this.$toast("提交成功");
          let pcmodel = {
            signal: "closeview",
            type: "refresh"
          };
          sendMessage(pcmodel);
          this.commentVisible = false;
          // this.$router.push({
          //   path: "/pc/teacherReport",
          //   query: { lesson_id: this.$route.query.lesson_id }
          // });
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.report {
  width: 100%;

  background: #fff;
}
</style>
