<template>
  <div class="courseware">
    <div class="background"></div>
    <div class="header">
      <div class="titleBox">
        <div
          class="titleLaber cursor"
          v-for="item in titleList"
          :key="item.id"
          :class="titleIndex == item.id ? 'select' : ''"
          @click="titleSelect(item)"
        >
          {{ item.laber }}
        </div>
      </div>
    </div>
    <div class="body" ref="body">
      <div
        class="originally"
        :class="scrollFlag ? '' : 'marginStyle'"
        v-if="titleIndex == 0"
      >
        <div class="originallyBox cursor" @click="localVideo">
          <img
            :src="require('../../assets/img/ic_add_new.png')"
            draggable="false"
          />
          <div>打开本地视频文件</div>
        </div>
        <div
          class="originallyBox cursor"
          v-for="(item, index) in originallyList"
          :key="index"
          @click="openCourseware(item)"
        >
          <img
            :src="require(`../../assets/img/` + iconJudgment(item, 0))"
            draggable="false"
          />
          <div>{{ item.ppt_title }}</div>
        </div>
      </div>
      <div class="library" v-else>
        <div v-for="(items, index) in libraryList" :key="index">
          <div
            class="libraryBox first cursor"
            @click="items.open = !items.open"
          >
            <img
              :src="
                items.open
                  ? require('../../assets/img/ic_arrow_down.png')
                  : require('../../assets/img/ic_arrow_right.png')
              "
              draggable="false"
            />
            <span>{{ items.name }}</span>
          </div>
          <div
            v-for="(item, index) in items.courses"
            :key="index"
            v-show="items.open"
          >
            <div
              class="libraryBox second cursor"
              @click="item.open = !item.open"
            >
              <img
                :src="
                  item.open
                    ? require('../../assets/img/ic_arrow_down.png')
                    : require('../../assets/img/ic_arrow_right.png')
                "
                draggable="false"
              /><span>{{ item.name }}</span>
            </div>
            <div
              v-for="(it, index) in item.slides"
              :key="index"
              v-show="item.open"
            >
              <div class="libraryBox third cursor" @click="openCourseware(it)">
                <img
                  :src="require(`../../assets/img/` + iconJudgment(it, 1))"
                  draggable="false"
                />
                <span> {{ it.ppt_title }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sendMessage } from "../../api/client";
import { getScheduleSlides, getCourseAllSlides } from "../../api/common";

export default {
  data() {
    return {
      schedule_id: this.$route.query.schedule_id,
      class_id: this.$route.query.class_id,
      titleIndex: 0,
      titleList: [
        {
          id: 0,
          laber: "本堂课件"
        },
        {
          id: 1,
          laber: "课件库"
        }
      ],
      scrollFlag: false,
      originallyList: [],
      libraryList: []
    };
  },
  mounted() {
    let pcmodel = {
      type: "windowSettings",
      width: 400,
      height: 500,
      closeButton: "show"
    };
    sendMessage(pcmodel);
    window["recvMessage"] = msg => {
      this.recvMessage(msg);
    };
    this.getCourseSlidesLits();
  },
  methods: {
    recvMessage(msg) {
      let data = JSON.parse(msg);
      if (data.operation == "Refresh") {
        this.getCourseSlidesLits();
      }
    },
    localVideo() {
      let item = {
        cdn: "",
        cover: "",
        duration: 0,
        path: "",
        pics: "",
        ppt_id: 0,
        ppt_page_count: 9,
        ppt_title: "打开视频文件",
        ppt_type: 1,
        slide_type: 100,
        status: 2,
        type: "",
        uid: 1
      };
      let pcmodel = {
        type: "openCourseware",
        coursewareData: JSON.stringify(item)
      };
      sendMessage(pcmodel);
    },
    openCourseware(item) {
      let pcmodel = {
        type: "openCourseware",
        coursewareData: JSON.stringify(item)
      };
      sendMessage(pcmodel);
    },
    iconJudgment(item, size = 0) {
      let route = "ic_";

      if (
        item.type == "3gp" ||
        item.type == "avi" ||
        item.type == "flv" ||
        item.type == "mp4" ||
        item.type == "mpg" ||
        item.type == "asf" ||
        item.type == "wmv" ||
        item.type == "mkv" ||
        item.type == "mov" ||
        item.type == "webm" ||
        item.type == "mxf"
      ) {
        route = route + "video";
      } else if (item.type == "pdf") {
        route = route + "pdf";
      } else if (item.type == "ppt" || item.type == "pptx") {
        route = route + "ppt";
      } else {
        route = route + "unknown";
      }

      if (size == 0) {
        route = route + ".png";
      } else if (size == 1) {
        route = route + "_s.png";
      }
      return route;
    },
    getCourseSlidesLits() {
      getScheduleSlides({ schedule_id: this.schedule_id }).then(res => {
        if (res.code == 0) {
          this.originallyList = res.data;
          this.$nextTick(() => {
            this.scrollJudge();
          });
        } else {
          this.$toast(res.msg);
        }
      });

      getCourseAllSlides({ schedule_id: this.schedule_id }).then(res => {
        if (res.code == 0) {
          let list = [res.data];
          for (let i = 0; i < list.length; i++) {
            let flag = false;
            for (let j = 0; j < list[i].courses.length; j++) {
              if (list[i].courses[j].default_lesson) {
                flag = true;
                list[i].courses[j].open = true;
              } else {
                list[i].courses[j].open = false;
              }
            }
            list[i].open = flag;
          }
          this.libraryList = list;
        } else {
          this.$toast(res.msg);
        }
      });
    },
    titleSelect(item) {
      this.titleIndex = item.id;
    },
    scrollJudge() {
      // if (this.$refs["body"].scrollHeight > this.$refs["body"].clientHeight) {
      //   this.scrollFlag = true;
      // } else {
      //   this.scrollFlag = false;
      // }
    }
  }
};
</script>

<style lang="less" scoped>
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background: #494a4d;
  border-radius: 4px;
  position: absolute;
}
::-webkit-scrollbar-track {
  border-radius: 4px;
  background-color: #1e1e1f;
  opacity: 0;
}
::-webkit-scrollbar-thumb {
  background: #494a4d;
  border-radius: 4px;
}
.courseware {
  .background {
    position: fixed;
    background: #1e1e1f;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
  .header {
    background: #1e1e1f;
    height: 50px;
    border-bottom: 1px solid #292d33;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    padding-top: 12px;
    align-items: flex-start;
    .titleBox {
      border-radius: 6px;
      padding: 2px;
      background: #494a4d;
      display: flex;
      flex-direction: row;
      .titleLaber {
        min-width: 78px;
        height: 26px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
        line-height: 17px;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .select {
        background: #ffffff;
        color: #3b3b3d;
      }
    }
  }
  .body {
    // width: calc(100% - 8px);
    width: 100%;
    height: calc(100vh - 50px);
    overflow-y: auto;
    margin: 0 auto;
    // padding: 0 4px;
    box-sizing: border-box;
    .originally {
      display: flex;
      flex-wrap: wrap;
      padding: 10px 16px;
      .originallyBox {
        width: 33.33%;
        display: flex;
        align-items: center;
        flex-direction: column;
        img {
          width: 100px;
          height: 56px;
        }
        div {
          margin-top: 6px;
          width: 106px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          font-size: 12px;
          font-weight: 500;
          color: #ffffff;
          line-height: 17px;

          text-align: center;
        }
      }
    }

    .library {
      background: linear-gradient(#242426 50%, #1e1e1f 50%);
      min-height: 100%;
      background-size: 100% 60px;
      .libraryBox {
        height: 30px;
        width: 100%;
        padding-left: 0;
        padding-right: 15px;
        box-sizing: border-box;
        font-size: 12px;
        font-weight: 500;
        color: #ffffff;
        line-height: 18px;

        display: flex;
        align-items: center;
        img {
          width: 12px;
          height: 12px;
          margin-right: 7px;
        }
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
      .first {
        padding-left: 30px;
      }
      .second {
        padding-left: 48px;
      }
      .third {
        padding-left: 66px;
        img {
          width: 11px;
          height: 14px;
          margin-right: 7px;
        }
      }
    }
  }
}
</style>
