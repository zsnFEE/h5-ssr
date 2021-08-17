<template>
  <div class="commentDialog">
    <div v-if="commentVisible">
      <div class="title">
        <span>学生评分</span>
        <div class="close" @click="cancelComment('form')">
          <img src="../assets/img/close.png" />
        </div>
      </div>

      <div class="item_act">
        <img :src="commentInfo.head_portrait" />
        <span>{{ commentInfo.realname }}</span>
      </div>

      <el-form ref="form" :model="commentInfo" :rules="rules" class="middle">
        <el-form-item prop="score" class="stars">
          <van-rate
            :gutter="7"
            v-model.number="commentInfo.score"
            :size="20"
            color="#F8AD3A"
            void-icon="star"
            void-color="#eee"
            :count="5"
          />
        </el-form-item>
        <el-form-item prop="evaluate">
          <el-input
            maxlength="300"
            show-word-limit
            class="text"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 22 }"
            resize="none"
            placeholder="说说你对学生的课堂表现…"
            v-model.trim="commentInfo.evaluate"
          >
          </el-input>
        </el-form-item>
      </el-form>

      <div class="footer">
        <div class="submit cursor" @click="submitForm('form')">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Rate } from "vant";

export default {
  components: { [Rate.name]: Rate },
  props: ["commentVisible", "commentInfo", "notSave"],
  data() {
    var checkScore = (rule, value, callback) => {
      if (!Number.isInteger(value)) {
        return callback(new Error("请填入评分"));
      } else {
        if (value <= 0) {
          return callback(new Error("评分应该大于0"));
        } else {
          callback();
        }
      }
    };
    return {
      rules: {
        score: [{ validator: checkScore, trigger: "blur" }],
        evaluate: [
          { required: true, message: "请输入学生课堂表现", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveComment();
        } else {
          return false;
        }
      });
    },
    saveComment() {
      this.$emit("saveComment", this.commentInfo);
    },
    cancelComment(formName) {
      this.$refs[formName].resetFields();
      this.$emit("cancelComment");
    }
  }
};
</script>
<style lang="less" scoped>
.commentDialog {
  background: #ffffff;
  border-radius: 8px;

  ::v-deep .el-textarea .el-input__count {
    bottom: -40px;
  }
  ::v-deep .el-textarea__inner {
    background: #f3f5f9;
    border-radius: 4px;
    font-size: 15px;
    font-weight: 400;
    color: #313233;
    border: 0;
    padding: 17px;
    box-sizing: border-box;
    height: 210px !important;
  }

  .title {
    font-size: 19px;
    font-weight: 500;
    color: #333333;
    text-align: center;
    padding: 15px 0 11px;
    box-sizing: border-box;
    position: relative;
    border-bottom: 1px solid #e4e5e6;
    .close {
      position: absolute;
      right: 21px;
      // top: 21px;
      top: 28%;
      width: 13px;
      height: 13px;
      img {
        width: 13px;
        height: 13px;
        object-fit: cover;
      }
    }
  }
  .middle {
    padding: 0 32px 32px;
    box-sizing: border-box;
    .stars {
      /deep/.el-form-item__error {
        top: unset;
        bottom: -3px;
      }
    }
  }
  .item_act {
    display: flex;
    align-items: center;
    padding: 21px 32px 21px;
    box-sizing: border-box;
    img {
      width: 42px;
      height: 42px;
      object-fit: cover;
      margin-right: 15px;
      border-radius: 50%;
    }
    span {
      font-size: 17px;
      font-weight: 500;
      color: #333333;
    }
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .disInput {
    ::v-deep textarea {
      background: unset;
      color: #333;
    }
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    padding: 0px 32px 17px 32px;
    box-sizing: border-box;
    .submit {
      padding: 6px 27px;
      background: #3dc17d;
      border-radius: 5px;
      font-size: 15px;
      font-weight: 400;
      color: #ffffff;
      line-height: 21px;
    }
  }

  ::v-deep.el-rate {
    height: 25px;

    .el-rate__icon:hover {
      transform: none;
    }
    .el-rate__icon.hover {
      transform: none;
    }
  }
}
</style>
