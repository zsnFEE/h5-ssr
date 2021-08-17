<template>
  <div class="report">
    <div class="title" v-show="!flag">学习报告</div>
    <header v-show="flag">
      <img
        src="../../assets/img/ic_back.png"
        class="titleArrow"
        @click="toBack"
      />
      <div class="titleText">学习报告</div>
      <div class="titleArrow"></div>
    </header>
    <div class="box" :class="flag ? 'boxipad' : ''">
      <StudentPim :info="info"></StudentPim>
      <!-- 桌面端的教师笔记 -->
      <div v-if="info.note_list && info.note_list.length > 0">
        <TeacherNotes
          :imglist="info.note_list"
          v-if="!flag"
          class="card_top"
        ></TeacherNotes>
        <!-- 移动端的教师笔记 -->
        <StudentNotes
          :imglist="info.note_list"
          v-if="flag"
          class="card_top"
        ></StudentNotes>
      </div>

      <!-- 教师评语 -->
      <TeacherComments
        v-if="info"
        :info="info"
        class="card_top"
      ></TeacherComments>
    </div>
  </div>
</template>
<script>
import { getLearningReport } from "../../api/common";
import StudentPim from "../../components/report/studentPim.vue";
import TeacherComments from "../../components/report/teacherComments.vue";
import { isMobile } from "../../common/util";
import StudentNotes from "../../components/studentNotes.vue";
import TeacherNotes from "../../components/teacherNotes.vue";

export default {
  components: { TeacherNotes, StudentNotes, StudentPim, TeacherComments },
  data() {
    return {
      flag: isMobile(),
      info: {}
    };
  },
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    this.load();
  },
  methods: {
    load() {
      getLearningReport({
        clazz_schedule_id: this.$route.query.clazz_schedule_id
      }).then(res => {
        if (res.code == 0) {
          this.info = res.data;
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    },

    toBack() {
      if (this.$route.query.module == 1) {
        if (this.$route.query.type == 1) {
          this.$router.push({
            path: "/phone/standardCurriculumListPhone",
            query: { status: this.$route.query.status }
          });
        } else {
          this.$router.push({
            path: "/pc/Studentschedules",
            query: {
              class_id: this.$route.query.class_id,
              class_name: this.$route.query.class_name,
              status: this.$route.query.status
            }
          });
        }
      } else {
        if (this.$route.query.type == 1) {
          this.$router.push({
            path: "/phone/standardCurriculumListPhone",
            query: {
              status: this.$route.query.status
            }
          });
        } else {
          this.$router.push({
            path: "/pc/pcLiveCourseUnit",
            query: {
              class_id: this.$route.query.class_id,
              class_name: this.$route.query.class_name,
              status: this.$route.query.status
            }
          });
        }
      }
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.report {
  width: 100%;
  min-height: 100%;
  background: #f3f5f9;
  header {
    position: fixed;
    padding: 9px 0 11px 3%;
    box-sizing: border-box;
    top: 0px;
    left: 0px;
    box-shadow: 0px 2px 2px -2px #ccc;
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: rgba(255, 255, 255, 1);
    z-index: 10;
    align-items: center;
    .titleArrow {
      height: 18px;
      width: 18px;
      img {
        height: 18px;
        width: 18px;
        object-fit: cover;
      }
    }
    .titleText {
      font-size: 18px;
      font-weight: 500;
      color: #292d33;
    }
  }

  .title {
    top: 0px;
    width: 100%;
    padding: 17px 21px;
    box-sizing: border-box;
    background: #ffffff;
    font-size: 21px;
    font-weight: 600;
    color: #333333;
    position: fixed;
    z-index: 10;
    box-shadow: 0px 2px 2px -2px #ccc;
  }
  .box {
    box-sizing: border-box;
    padding: 21px;
    padding-top: 86px;
    // height: 100vh;
  }
  .card_top {
    margin-top: 21px;
  }
  .boxipad {
    padding-top: 68px !important;

    padding-left: 120px;
    padding-right: 125px;
    box-sizing: border-box;
  }
  .boxpc {
    padding-top: 47px !important;
  }
  @media (max-width: 767px) {
    .box {
      box-sizing: border-box;
      padding: 15px;
      padding-top: 74px;
    }
    .card_top {
      margin-top: 15px;
    }
  }
}
</style>
