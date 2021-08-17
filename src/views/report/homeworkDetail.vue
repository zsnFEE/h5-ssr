<template>
  <div class="homework">
    <div class="bgpc"></div>
    <div class="header">
      <div class="header_ipad" v-if="flag">
        <div class="back" @click="toBack">
          <img src="../../assets/img/ic_back.png" />
        </div>
        <div class="qid">{{ i * 1 + 1 }} / {{ this.detailsList.length }}</div>
        <div class="submit"></div>
      </div>
      <div class="header_pc" v-show="!flag">
        <div class="qid">{{ i * 1 + 1 }} / {{ this.detailsList.length }}</div>
        <div class="submit"></div>
      </div>
    </div>
    <div class="main">
      <div class="topic">
        <div v-for="(item, index) in detailsList" :key="index">
          <div v-if="index == i">
            <div class="stem">{{ item.content }}</div>
            <div class="img " v-if="item.img_url">
              <img
                :src="item.cdn + item.img_url"
                @click="preview(item.cdn + item.img_url)"
              />
            </div>
            <div class="group">
              <div
                class="radio"
                v-for="(op, opindex) in item.options"
                :key="opindex"
              >
                <span
                  :class="
                    op.is_right == 1
                      ? 'radioactive'
                      : item.member_answer.includes(op.option) &&
                        op.is_right == 0
                      ? 'radiolabe'
                      : ''
                  "
                >
                  {{ op.option }}. {{ op.content }}</span
                >
                <span
                  class="label"
                  v-if="item.member_answer.includes(op.option)"
                  >我的答案</span
                >
                <span class="activelabel" v-if="op.is_right == 1"
                  >正确答案</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="btn active cursor" v-if="i > 0" @click="pre">上一题</div>
      <div class="btn " v-if="i == 0">上一题</div>
      <div
        class="btn active cursor"
        v-if="detailsList.length > 1 && i + 1 != detailsList.length"
        @click="next"
      >
        下一题
      </div>
      <div class="btn " v-if="detailsList.length == i + 1">
        下一题
      </div>
    </div>
    <van-image-preview
      v-if="show"
      v-model="show"
      :images="showImgList"
      @change="onChange"
      ref="imagePreview"
      :start-position="0"
    >
    </van-image-preview>
  </div>
</template>
<script>
import { isMobile } from "../../common/util";
import { ImagePreview } from "vant";
import { showMyAnswerList } from "../../api/common";
import { sendMessage } from "../../api/client";

export default {
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  data() {
    return {
      showImgList: [],
      flag: isMobile(),
      show: false,
      index: this.$route.query.index * 1,
      i: this.$route.query.index * 1,

      radio: "",
      detailsList: []
    };
  },
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.toBack();
    });
    this.onload();
  },

  methods: {
    onload() {
      // 明细接口
      showMyAnswerList({ schedule_id: this.$route.query.schedule_id }).then(
        res => {
          if (res.code == 0) {
            this.detailsList = res.data;
          } else {
            this.$toast(res.msg);
          }
        }
      );
    },
    // 上一题
    pre() {
      this.i--;
    },
    // 下一题
    next() {
      this.i++;
    },
    toBack() {
      this.$router.push({
        path: "/report/practiceReport",
        query: {
          type: this.$route.query.type,
          schedule_id: this.$route.query.schedule_id
        }
      });
    },

    preview(url) {
      if (this.flag) {
        this.showImgList = [url];
        this.show = true;
      } else if (!this.flag) {
        let model = {
          signal: "openView",
          name: "teacherPreview",
          url: `${window.location.protocol}//${
            window.location.host
          }/report/imgPreview?type=${
            this.$route.query.type
          }&imglist=${url}&schedule_id=${
            this.$route.query.schedule_id
          }&index=${0}`,
          size: true,
          modal: true,
          width: 696,
          height: 437
        };
        sendMessage(model);
        // this.$router.push({
        //   path: "/report/imgPreview",
        //   query: {
        //     type: this.$route.query.type,
        //     schedule_id: this.$route.query.schedule_id,
        //     imglist: url
        //   }
        // });
      }
    },
    onChange(index) {
      this.index = index;
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.homework {
  // height: 100%;
  padding-bottom: 57px;
  box-sizing: border-box;
  // overflow-y: scroll;
}
.header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  box-shadow: 0px 2px 2px -2px #ccc;

  .header_ipad {
    display: flex;
    align-items: center;
    background: #ffffff;
    padding: 10px 15px;
    box-sizing: border-box;
    justify-content: space-between;
    .back {
      width: 18px;
      height: 18px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .qid {
      font-size: 18px;
      font-weight: 500;
      color: #292d33;
      line-height: 25px;
    }
    .submit {
      font-size: 18px;
      font-weight: 500;
      color: #3dc17d;
      line-height: 25px;
    }
  }
  .header_pc {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 2px 2px -2px #ccc;

    .qid {
      font-size: 18px;
      font-weight: 500;
      color: #292d33;
      line-height: 25px;
    }
    .submit {
      font-size: 18px;
      font-weight: 500;
      color: #3dc17d;
      line-height: 25px;
    }
  }
}
// 主体部分
.main {
  padding: 15px;
  padding-top: 60px;
  box-sizing: border-box;
  .topic {
    background: #ffffff;
    border-radius: 5px;
    padding: 30px 20px;
    box-sizing: border-box;
    // 题干
    .stem {
      font-size: 14px;
      font-weight: 500;
      color: #292d33;
      line-height: 25px;
    }
    .img {
      max-height: 200px;
      margin-top: 33px;

      img {
        max-width: 100%;
        max-height: 200px;
        object-fit: cover;
        cursor: pointer;
      }
    }
    @media (max-width: 500px) {
      .img {
        max-height: 200px;
        margin-top: 33px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          max-width: 100%;
          max-height: 200px;
          object-fit: cover;
        }
      }
    }

    .group {
      margin-top: 46px;
    }
  }
  .radio + .radio {
    margin-top: 30px;
  }
  .radio {
    font-size: 14px;
    font-weight: 500;
    color: #292d33;
    line-height: 25px;
    width: 100%;
    word-break: break-all;
  }
  .radiolabe {
    color: #ff7300;
  }
  .radioactive {
    color: #3dc17d;
  }
  .label {
    display: inline-block;
    background: #ff7300;
    border-radius: 2px;
    padding: 2px 3px;
    box-sizing: border-box;
    font-size: 12px;
    font-weight: 400;
    color: #ffffff;
    line-height: 17px;
    margin-left: 10px;
  }
  .activelabel {
    display: inline-block;
    border-radius: 2px;
    padding: 2px 3px;
    box-sizing: border-box;
    font-size: 12px;
    font-weight: 400;
    margin-left: 10px;
    line-height: 17px;
    background: #3dc17d;
    color: #ffffff;
  }
}
// 底部按钮
.footer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  padding: 7px 20px;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  bottom: 0;
  .btn {
    border-radius: 5px;

    padding: 10px 50px;
    box-sizing: border-box;
    font-size: 15px;
    font-weight: 500;

    line-height: 21px;
    border: 1px solid #999999;
    color: #999999;
  }
  .active {
    border: 1px solid #3dc17d;
    color: #3dc17d;
  }
  .btn + .btn {
    margin-left: 20px;
  }
  @media (max-width: 500px) {
    .btn + .btn {
      margin-left: 15px;
    }
  }
}
</style>
