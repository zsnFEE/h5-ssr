<template>
  <!-- 教师笔记 -->
  <div class="teacherNotes">
    <div class="box">
      <div class="head">教师课程笔记</div>
      <!-- 学生的学习报告 -->
      <div class="phonecontent">
        <div
          v-for="(item, index) in imglist"
          :key="index"
          class="src"
          @click="preview(index)"
        >
          <img :src="item.snapboard_url" />
        </div>
      </div>
    </div>
    <van-image-preview
      v-show="show"
      v-model="show"
      :images="showImgList"
      @change="onChange"
      ref="imagePreview"
      :start-position="index"
    >
    </van-image-preview>
  </div>
</template>
<script>
import { ImagePreview, Toast } from "vant";
export default {
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  name: "StudentNotes",
  props: ["imglist", "type"],
  data() {
    return {
      show: false,
      index: 10
    };
  },
  mounted() {},
  computed: {
    showImgList() {
      let list =
        this.imglist &&
        this.imglist.map(res => {
          return res.snapboard_url;
        });
      return list;
    }
  },
  methods: {
    preview(i) {
      if (this.check) {
        this.show = true;
        this.index = i;
      } else {
        this.show = true;
        this.index = i;
      }
    },
    onChange(index) {
      this.index = index;
    }
  }
};
</script>
<style lang="less" scoped>
.teacherNotes {
  .box {
    background: #ffffff;
    border-radius: 5px;
    padding: 17px;
    box-sizing: border-box;

    .head {
      font-size: 18px;
      font-weight: 600;
      color: #333333;
    }

    .phonecontent {
      display: flex;
      align-items: center;
      margin-top: 17px;
      overflow-y: hidden;
      overflow-x: scroll;

      &::-webkit-scrollbar {
        display: none;
      }
      ::v-deep.van-image .van-image-preview__image {
        padding: 5px !important;
      }
      .src {
        width: 105px;
        height: 88px;

        img {
          width: 105px;
          height: 88px;
          border-radius: 8px;
          object-fit: cover;
        }
      }
      .src + .src {
        margin-left: 15px;
      }
    }
    @media (max-width: 767px) {
      .phonecontent {
        display: flex;
        align-items: center;
        margin-top: 12px;
        overflow-y: hidden;
        overflow-x: scroll;

        &::-webkit-scrollbar {
          display: none;
        }
        .src {
          width: 105px;
          height: 88px;

          img {
            width: 105px;
            height: 88px;
            border-radius: 8px;
            object-fit: cover;
          }
        }
        .src + .src {
          margin-left: 12px;
        }
      }
    }
  }
}
</style>
