<template>
  <!-- 教师笔记 -->
  <div class="teacherNotes">
    <div class="boxnote">
      <div class="head">教师课程笔记</div>
      <div class="content">
        <div
          v-for="(item, index) in imglist"
          :key="index"
          class="src"
          @click="preview(item, index)"
        >
          <img :src="item.snapboard_url" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ImagePreview, Toast } from "vant";
import { sendMessage } from "../api/client";

export default {
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  name: "teacherNotes",
  props: ["imglist", "type"],
  data() {
    return {};
  },

  methods: {
    //预览图片
    preview(item, index) {
      let model = {
        signal: "openView",
        name: "teacherPreview",
        url: `${window.location.protocol}//${window.location.host}/report/teacherPreview?lesson_id=${this.$route.query.lesson_id}&type="pc"&index=${index}`,
        size: true,
        modal: true,
        width: 696,
        height: 437
      };
      sendMessage(model);
      // this.$router.push({
      //   path: "/report/teacherPreview",
      //   query: {
      //     clazz_schedule_id: this.$route.query.clazz_schedule_id,
      //     type: "pc"
      //   }
      // });
    }
  }
};
</script>
<style lang="less" scoped>
.teacherNotes {
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
