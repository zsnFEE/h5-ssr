<template>
  <div class="videoClassCard" @click="play(info)" :class="true ? 'cursor' : ''">
    <div class="tips" v-show="info.lately_show_lesson">
      <span>上次观看</span>
    </div>
    <div class="title" :class="info.is_video_locked == 0 ? '' : 'ash'">
      {{ info.name }}
    </div>
    <div
      class="history"
      v-if="info.is_plan_time == 0"
      :class="info.is_video_locked == 0 ? '' : 'ash'"
    >
      未解锁
    </div>
    <div class="history" :class="info.is_video_locked == 0 ? '' : 'ash'" v-else>
      {{
        info.is_video_locked == 1 && info.lock_type == 2
          ? `${info.nulock_time} 可观看`
          : `视频观看${info.watch_percent}%`
      }}
    </div>
  </div>
</template>

<script>
import { sendMessage } from "../api/client";

export default {
  name: "videoClassCard",
  props: ["info"],
  mounted() {},
  methods: {
    play(item) {
      // this.$emit("play", this.info);
      if (item.is_video_locked == 0) {
        let model = {
          videoid: item.course_id,
          videoplay: item.play_url,
          videorate: item.watch_percent
        };
        dsBridge.call("video", JSON.stringify(model), function(v) {});
        let pcmodel = {
          videoid: item.course_id, //id
          videoplay: item.play_url, //播放地址
          videorate: item.watch_percent, //进度条
          videoname: item.name //课程名字
        };
        sendMessage(pcmodel);
      } else {
        if (item.lock_type == 2) {
          this.$toast("还未到可观看时间");
        } else if (item.lock_type == 3 || item.lock_type == 1) {
          this.$toast("请按照目录顺序观看");
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.videoClassCard {
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 8px;
  padding: 16px;
  box-sizing: border-box;
  position: relative;
  @media (max-width: 767px) {
    padding: 15px;
    border-radius: 4px;
  }
  .tips {
    top: 0;
    right: 0;
    display: flex;
    position: absolute;
    padding: 2px 4px;
    border-radius: 0px 4px 0px 4px;
    background: linear-gradient(127deg, #fdbf83 0%, #fd9620 100%);
    @media (max-width: 767px) {
      padding: 4px;
      border-radius: 0px 5px 0px 5px;
    }
    span {
      font-size: 14px;
      font-weight: 400;
      color: #ffffff;
      line-height: 20px;
      @media (max-width: 767px) {
        font-size: 12px;
        font-weight: 400;
        line-height: 14px;
        transform: scale(0.8333);
      }
    }
  }

  .title {
    font-size: 16px;
    font-weight: bold;
    color: #333333;
    line-height: 23px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media (max-width: 767px) {
      color: #3d3d3d;
    }
  }
  .history {
    font-size: 12px;
    font-weight: 400;
    color: #666666;
    line-height: 20px;
    margin-top: 15px;
    @media (max-width: 767px) {
      margin-top: 8px;
      font-size: 12px;
      font-weight: 400;
      color: #777777;
      line-height: 16px;
    }
  }
  .ash {
    color: #999999;
  }
}
</style>
