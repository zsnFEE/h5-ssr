<template>
  <!-- 学生个人信息 -->
  <div class="teacherPim">
    <div class="header">
      <div class="left_info">
        <div class="photo">
          <img
            :src="
              info.head_portrait
                ? info.head_portrait
                : require('../../assets/img/IMG_man.png')
            "
          />
        </div>
        <div class="right_pre">
          <div class="realname">{{ info.realname }}</div>
          <div class="start">
            <van-rate
              readonly
              v-model="info.score"
              :size="20"
              color="#F8AD3A"
              void-icon="star"
              void-color="#eee"
              :count="5"
            />
          </div>
        </div>
      </div>
      <div
        class="status"
        :class="
          info.att_status == 0
            ? 'orange'
            : info.att_status == 1
            ? 'yellow'
            : 'green'
        "
      >
        {{
          info.att_status == 0 ? "缺勤" : info.att_status == 1 ? "迟到" : "出勤"
        }}
      </div>
    </div>
    <div class="classname">{{ info.lesson_name }}</div>
    <div class=" lessons">{{ info.class_name }}</div>
    <div class="time">上课时间：{{ info.date }} {{ info.time }}</div>
    <div class="overview">
      <div>
        <span class="spandata">{{ info.in_zlazz_time }}min</span>
        <span class="spantitle">上课时长</span>
      </div>
      <div>
        <span class="spandata">{{ info.speak_time }}min</span>
        <span class="spantitle">上麦时长</span>
      </div>
      <div>
        <span class="spandata">{{ info.awardend }}</span>
        <span class="spantitle">点赞数</span>
      </div>
    </div>
  </div>
</template>
<script>
import { Rate } from "vant";

export default {
  components: { [Rate.name]: Rate },
  name: "teacherPim",
  props: ["info", "type"],
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.teacherPim {
  background: #ffffff;
  border-radius: 5px;
  padding: 18px 17px 15px 17px;
  box-sizing: border-box;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left_info {
      display: flex;
      align-items: center;
      .photo {
        width: 53px;
        height: 53px;
        margin-right: 6px;
        img {
          width: 53px;
          height: 53px;
          object-fit: cover;
          border-radius: 50%;
        }
      }
    }
    .right_pre {
      .realname {
        font-size: 17px;
        font-weight: 600;
        color: #333333;
        line-height: 1;
        margin-top: 3px;
      }
      .start {
        margin-top: 7px;
        line-height: 1;
      }
    }
    .status {
      font-size: 17px;
      font-weight: 500;
    }
    .green {
      color: #3dc17d;
    }
    .orange {
      color: #f06a22;
    }
    .yellow {
      color: #f09e22;
    }
  }
  .classname {
    margin-top: 32px;
    font-size: 17px;
    font-weight: 600;
    color: #333333;
  }
  .lessons {
    margin-top: 11px;
    font-size: 15px;
    font-weight: 400;
    color: #5c5f64;
  }
  .time {
    margin-top: 17px;
    font-size: 13px;
    font-weight: 400;
    color: #5c5f64;
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
  @media (max-width: 767px) {
    .overview {
      margin-top: 10px;
      display: flex;
      align-items: center;
      line-height: 1;
      div + div {
        margin-left: 15px;
      }
      .spandata {
        font-size: 15px;
        font-weight: bold;
        color: #4f7768;
        margin-right: 4px;
      }
      .spantitle {
        font-size: 11px;
        font-weight: 400;
        color: #5c5f64;
      }
    }
  }
}
</style>
