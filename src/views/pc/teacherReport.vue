<template>
  <div class="report">
    <div class="bgpc"></div>
    <div class="title">课堂报告</div>
    <div class="box">
      <div class="top">
        <div class="tab">
          {{ classInfo.class_name }} {{ classInfo.chapter_name }}
        </div>
        <div class="lessonname">{{ classInfo.lesson_name }}</div>
        <div class="time">
          <div class="plantime">
            计划时间：{{ classInfo.plan_date }} {{ classInfo.plan_time }}
          </div>
          <div>上课时间：{{ classInfo.date }} {{ classInfo.time }}</div>
        </div>
        <div class="overview">
          <div>
            <span class="spandata">{{ classInfo.lesson_time }}min</span>
            <span class="spantitle">上课时长</span>
          </div>
          <div>
            <span class="spandata">{{ classInfo.awardend_all }}</span>
            <span class="spantitle">点赞数</span>
          </div>
          <div>
            <span class="spandata">{{ classInfo.use_slides_num }}</span>
            <span class="spantitle">使用课件数</span>
          </div>
        </div>
      </div>
      <div class="attendance">
        <div class="caption">学生考勤</div>
        <div class="line">
          <div class="childen">
            <div class="lable" style="color: #1BA109;">
              {{ classInfo.attend_num }}/{{ classInfo.student_num }}
            </div>
            <div class="text">出勤人数</div>
          </div>
          <div class="childen">
            <div class="lable" style="color: #A1A5AB;">
              {{ classInfo.attend_percent }}%
            </div>
            <div class="text">出勤率</div>
          </div>
          <div class="childen">
            <div class="lable" style="color: #F09E22;">
              {{ classInfo.late_num }}/{{ classInfo.student_num }}
            </div>
            <div class="text">迟到人数</div>
          </div>
          <div class="childen">
            <div class="lable" style="color: #A1A5AB;">
              {{ classInfo.late_percent }}%
            </div>
            <div class="text">迟到率</div>
          </div>
        </div>
        <!-- <div class="unfold" v-if="!show">
          <span @click="unfold" class="cursor">展开详细内容</span>
          <img
            @click="unfold"
            class="cursor"
            src="../../assets/img/ic_date.png"
          />
        </div> -->
        <!-- <div class="tableline" v-if="show"></div> -->
        <div class="table" :class="show ? 'active' : ''">
          <div class="tab">
            <span>学生</span>
            <span>考勤</span>
            <span>点赞</span>
            <span>上麦时长</span>
            <span>上课时长</span>
          </div>
          <div
            class="row"
            v-for="(item, index) in classInfo.student_list"
            :key="index"
          >
            <span>{{ item.realname }}</span>
            <span>{{ item.attendance }}</span>
            <span>{{ item.awardend }}</span>
            <span>{{ item.speak_time }} min</span>
            <span>{{ item.member_duration }} min</span>
          </div>
        </div>

        <div class="unfold padd">
          <span @click="unfold" class="cursor">{{
            show ? "收起详细内容" : "展开详细内容"
          }}</span>
          <img
            @click="unfold"
            class="cursor"
            :class="show ? 'rotate' : ''"
            src="../../assets/img/ic_date.png"
          />
        </div>
      </div>

      <div
        class="boxnote"
        v-if="classInfo.snapboard_list && classInfo.snapboard_list.length > 0"
      >
        <div class="head">教师课程笔记</div>
        <div class="content">
          <div
            v-for="(item, index) in classInfo.snapboard_list"
            :key="index"
            class="src cursor"
            @click="preview(item, index)"
          >
            <img :src="item.snapboard_url" />
          </div>
        </div>
      </div>
      <!-- 评价开始 -->
      <div
        class="evaluate"
        v-if="classInfo.student_list && classInfo.student_list.length > 0"
      >
        <div class="evaluate_title">评价</div>
        <div
          class="preson"
          v-for="(item, index) in classInfo.student_list"
          :key="index"
        >
          <div class="info">
            <div class="item_act">
              <img :src="item.head_portrait" />
              <span>{{ item.realname }}</span>
            </div>
            <div class="redact cursor" @click="showDialog(item)">编辑</div>
          </div>
          <div class="start">
            <van-rate
              :gutter="7"
              readonly
              v-model="item.score"
              :size="17"
              color="#F8AD3A"
              void-icon="star"
              void-color="#eee"
              :count="5"
            />
          </div>
          <div
            class="teacher_evaluation"
            style="color: #313233;padding-bottom:32px;"
            v-if="item.evaluate"
          >
            教师评语：{{ item.evaluate }}
          </div>
          <div class="teacher_evaluation" v-else>
            教师评语：未填写评语
          </div>
        </div>
      </div>
      <!-- 评价结束 -->
      <!--评价弹框开始-->
      <!-- <CommentDialog
        ref="cropperComp"
        :commentVisible="commentVisible"
        :commentInfo="commentInfo"
        @cancelComment="cancelComment"
        @saveComment="saveComment"
      /> -->
      <!--评价弹框结束-->
    </div>
  </div>
</template>
<script>
import { getTeacherClassReport } from "../../api/common";
import { Rate } from "vant";
import { sendMessage } from "../../api/client";
import CommentDialog from "../../components/commetDialog";
export default {
  components: { [Rate.name]: Rate, CommentDialog },
  data() {
    return {
      commentInfo: {
        score: 0,
        evaluate: ""
      },
      classInfo: {},
      commentVisible: false,

      score: 4,
      imglist: [],
      show: false
    };
  },
  mounted() {
    window["recvMessage"] = msg => {
      this.recvMessage(msg);
    };

    this.load();
  },
  methods: {
    recvMessage(msg) {
      if (JSON.parse(msg).operation == "Refresh") {
        this.load();
      }
    },
    load() {
      getTeacherClassReport({
        clazz_schedule_id: this.$route.query.lesson_id
      }).then(res => {
        if (res.code == 0) {
          this.classInfo = res.data;
        }
      });
    },
    // 展开详细内容
    unfold() {
      this.show = !this.show;
    },
    // 编辑按钮
    showDialog(item) {
      //       openView
      // {
      // name: 框的name
      // url: 框的url
      // size: true 是否放大缩小
      // modal: true 是否可以点击后面左侧
      // }

      this.commentInfo = {
        img: item.head_portrait,
        name: item.realname,
        score: Number(item.score),
        id: item.id,
        evaluate: item.evaluate
      };
      let model = {
        signal: "openView",
        name: "report",
        url: `${window.location.protocol}//${window.location.host}/report/report?lesson_id=${this.$route.query.lesson_id}&id=${item.id}`,
        size: false,
        modal: true,
        width: 696,
        height: 500
        // closeButton: "hide"
      };
      sendMessage(model);
      this.commentVisible = true;
      // this.$router.push({
      //   path: "/report/report",
      //   query: {
      //     commentInfo: JSON.stringify(this.commentInfo),
      //     lesson_id: this.$route.query.lesson_id,
      //     id: item.id
      //   }
      // });
    },

    // cancelComment() {
    //   this.commentVisible = false;
    // },
    //预览图片
    preview(item, index) {
      let model = {
        signal: "openView",
        name: "teacherPreview",
        url: `${window.location.protocol}//${window.location.host}/report/teacherPreview?lesson_id=${this.$route.query.lesson_id}&type="teach"&index=${index}`,
        size: true,
        modal: true,
        width: 696,
        height: 437
        // closeButton: "hide"
      };
      sendMessage(model);
      // this.$router.push({
      //   path: "/report/teacherPreview",
      //   query: { lesson_id: this.$route.query.lesson_id }
      // });
    }
    // saveComment() {
    //   this.commentVisible = false;
    // }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.report {
  width: 100%;

  background: #f3f5f9;
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
    .top {
      width: 100%;
      background: #ffffff;
      border-radius: 5px;
      box-sizing: border-box;
      padding: 17px;
      .tab {
        font-size: 17px;
        font-weight: 600;
        color: #333333;
        margin-bottom: 11px;
      }
      .lessonname {
        font-size: 15px;
        font-weight: 400;
        color: #5c5f64;
        margin-bottom: 17px;
      }
      .time {
        font-size: 13px;
        font-weight: 400;
        color: #5c5f64;
        .plantime {
          margin-bottom: 9px;
        }
      }
      .overview {
        margin-top: 17px;
        display: flex;
        align-items: center;
        line-height: 1;

        div + div {
          margin-left: 21px;
        }
        .spandata {
          font-size: 19px;
          font-weight: bold;
          color: #4f7768;
          margin-right: 6px;
        }
        .spantitle {
          font-size: 13px;
          font-weight: 400;
          color: #5c5f64;
        }
      }
    }
    .attendance {
      margin-top: 21px;
      margin-bottom: 21px;
      padding: 17px;
      box-sizing: border-box;
      background: #ffffff;
      border-radius: 5px;
      .caption {
        font-size: 18px;
        font-weight: 600;
        color: #333333;
      }

      .line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 17px 84px 17px 78px;
        box-sizing: border-box;

        .childen {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          .lable {
            font-size: 21px;
            font-weight: bold;
            text-align: center;
          }
          .text {
            margin-top: 6px;
            font-size: 13px;
            font-weight: 400;
            color: #a1a5ab;
          }
        }
      }
      .unfold {
        margin-top: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13px;
        font-weight: 400;
        color: #a1a5ab;
        img {
          margin-left: 5px;
          width: 12px;
          height: 7px;
          object-fit: cover;
          transition: all 0.3s ease-in-out;
        }
      }
      .rotate {
        transform: rotate(180deg);
      }

      .active {
        max-height: 500px !important;
        margin-top: 21px;
        padding-top: 21px;
        border-top: 1px solid #d8d8d8 !important;
        overflow-y: auto !important;
      }

      .table {
        max-height: 0;
        overflow: hidden;
        transition: all 0.3s ease-in-out;
        border-top: 1px solid #fff;
        .tab {
          font-size: 13px;
          font-weight: 400;
          color: #292d33;
          display: flex;
          align-items: center;
          span {
            width: 20%;
            text-align: center;
            padding-bottom: 11px;
            box-sizing: border-box;
          }
        }
        .row {
          display: flex;
          align-items: center;
          margin-bottom: 11px;
          border-radius: 4px;
          background: #f8f8f9;
          padding-top: 11px;
          padding-bottom: 9px;
          box-sizing: border-box;
          span {
            width: 20%;
            text-align: center;
            font-size: 13px;
            font-weight: 400;
            color: #292d33;
          }
        }

        .tdfont {
          font-size: 13px;
          font-weight: 400;
          color: #292d33;
        }
      }
      .padd {
        padding-top: 15px;
        padding-bottom: 5px;
        box-sizing: border-box;
      }
    }

    // 评价的样式
    .evaluate {
      margin-top: 21px;
      // padding: 17px;
      // box-sizing: border-box;
      border-radius: 5px;
      background: #ffffff;
      .evaluate_title {
        padding: 17px;
        box-sizing: border-box;
        font-size: 18px;
        font-weight: 600;
        color: #333333;
        // margin-bottom: 9px;
        padding-bottom: 0px;
      }
      .preson + .preson {
        border-top: 1px solid #d8d8d8;
        padding-top: 17px;
      }
      .preson {
        padding: 17px;
        box-sizing: border-box;
        .info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .item_act {
            display: flex;
            align-items: center;
            img {
              width: 42px;
              height: 42px;
              object-fit: cover;
              margin-right: 11px;
              border-radius: 50%;
            }
            span {
              font-size: 17px;
              font-weight: 500;
              color: #333333;
            }
          }
          .redact {
            padding: 5px 27px;
            box-sizing: border-box;
            border-radius: 5px;
            border: 1px solid #638475;
            font-size: 15px;
            font-weight: 400;
            color: #638475;
          }
        }
        .start {
          margin-top: 16px;
        }
        .teacher_evaluation {
          font-size: 15px;
          font-weight: 400;
          color: #989ca1;
          margin-top: 4px;
          padding-bottom: 49px;
        }
      }
    }
  }
  .boxnote {
    background: #ffffff;
    border-radius: 5px;
    padding: 17px;
    box-sizing: border-box;

    .head {
      font-size: 18px;
      font-weight: 600;
      color: #333333;
    }

    .content {
      display: flex;
      align-items: center;
      margin-top: 17px;
      overflow-y: hidden;
      padding-bottom: 10px;
      .src {
        width: 114px;
        height: 93px;
        img {
          width: 114px;
          height: 93px;
          border-radius: 8px;
          object-fit: cover;
          border: 1px solid #4f7768;
        }
      }
      .src + .src {
        margin-left: 13px;
      }
    }
  }
}
</style>
