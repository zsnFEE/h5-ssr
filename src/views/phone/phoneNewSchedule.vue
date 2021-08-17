<template>
  <div class="pcNewSchedule">
    <div class="tab">
      <Navigation
        v-if="title"
        :title="title"
        :current="titleIndex"
        @selectTab="selection"
        class="nav"
      ></Navigation>
      <div class="cardparent" v-if="titleIndex == 0">
        <div
          class="curriculumList"
          v-show="classlist.length > 0"
          v-for="item in classlist"
          :key="item.id"
        >
          <NewCard :info="item" @toDetail="toDetail"></NewCard>
        </div>
      </div>
      <div class="cardparent" v-if="titleIndex == 1">
        <div
          v-show="recordingClassList.length > 0"
          class="curriculumList"
          v-for="item in recordingClassList"
          :key="item.id"
        >
          <div class="videoPackageBox">
            <VideoPackage v-if="item" :info="item" @toRecordListPhone="play">
            </VideoPackage>
          </div>
        </div>
      </div>
    </div>
    <!--时间课表下方的直播录播列表结束-->
  </div>
</template>
<script>
import { sendMessage } from "../../api/client";
import { myLiveClassList, myRecordClassList } from "../../api/common";
import { Toast } from "vant";
import { isMobile } from "../../common/util";
import RecordedSchedule from "../../components/recordedSchedule.vue";
import BroadcastSchedule from "../../components/broadcastSchedule.vue";
import Navigation from "../../components/navigation";
import NewCard from "../../components/newCard.vue";
import VideoPackage from "../../components/videoPackage";
import ScheduleDate from "../../components/scheduleDate.vue";
export default {
  components: {
    RecordedSchedule,
    BroadcastSchedule,
    Navigation,
    NewCard,
    VideoPackage,
    ScheduleDate
  },
  data() {
    return {
      title: [
        {
          id: "1",
          name: "直播课"
        },
        {
          id: "2",
          name: "录播课"
        }
      ],
      titleIndex: 0,
      flag: isMobile(),
      item: "",
      recordingClassList: [],
      classlist: []
    };
  },
  created() {
    let titleNum = localStorage.getItem("titleNum");
    if (titleNum == null || titleNum == "") {
      localStorage.setItem("titleNum", 0);
    } else {
      this.titleIndex = titleNum;
    }
    let that = this;
    dsBridge.registerAsyn("RefreshData", function(arg1, arg2, arg3) {
      that.refreshData();
    });
    window["recvMessage"] = msg => {
      this.refreshData();
    };
  },
  mounted() {
    window["recvMessage"] = msg => {
      this.recvMessage(msg);
    };
    myLiveClassList({}).then(res => {
      if (res.code == 0) {
        this.classlist = res.data.list;
      } else {
        this.$toast(res.msg || res.message);
      }
    });
    myRecordClassList({}).then(res => {
      if (res.code == 0) {
        this.recordingClassList = res.data.list;
      } else {
        this.$toast(res.msg || res.message);
      }
    });
  },

  methods: {
    toDetail(item) {
      this.$router.push({
        path: "/pc/pcLiveCourseUnit",
        query: {
          class_id: item.class_id,
          class_name: item.class_name,
          token: this.$route.query.token,
          status: 2 //phone
        }
      });
    },
    play(item) {
      this.$router.push({
        path: "/pc/RecordListpc",
        query: {
          class_id: item.class_id,
          class_name: item.name,
          token: this.$route.query.token,
          status: 2 //phone
        }
      });
    },
    selection(index) {
      this.titleIndex = index;
      localStorage.setItem("titleNum", index);
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.nav {
  position: fixed;
  top: 0px;
  left: 0;
  padding-left: 15px;
  box-sizing: border-box;
  align-items: center;
}
.pcNewSchedule {
  width: 100%;
  box-sizing: border-box;
  background: #f3f5f9;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;

  .cardparent {
    margin-top: 12px;
  }
  .videoPackageBox {
    width: 100%;
  }
  .curriculumList + .curriculumList {
    margin-top: 10px;
  }
  .tab {
    margin-top: 20px;
  }
}
.canfixed {
  width: 100%;
  position: fixed;
  height: 53px;
  top: 0;
  left: 0;
  padding-left: 20px;
  z-index: 999;
  background: #fff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
@media (max-width: 500px) {
  .canfixed {
    width: 100%;
    height: 53px;
    position: fixed;
    top: 0;
    left: 0;
    padding-left: 15px;
    z-index: 999;
    background: #fff;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  .pcNewSchedule {
    width: 100%;
    box-sizing: border-box;
    background: #f3f5f9;
    min-height: 100vh;
    padding: 0 !important;
    padding-top: 35px !important;
    box-sizing: border-box;

    .cardparent {
      margin-top: 12px;
    }
    .videoPackageBox {
      width: 100%;
    }
    .curriculumList + .curriculumList {
      margin-top: 10px;
    }
    .tab {
      margin-top: 0px !important;
      padding: 15px !important;
      box-sizing: border-box !important;
    }
  }
}
</style>
