<template>
  <div class="whiteBoard">
    <aside>
      <div
        :class="`test${index}`"
        v-for="(item, index) in showList"
        :key="item.id"
      >
        <span class="title">
          <label>{{ `${index + 1}.` }}</label
          >{{ item.content }}</span
        >
        <img
          @load="trans(item, index)"
          v-if="item.img_url"
          :src="`${item.logo}?time=${new Date().getTime()}`"
          crossorigin="anonymous"
        />
        <span class="options" v-for="it in item.options" :key="it.id">
          <label>{{ `${it.option}.` }}</label>
          {{ `${it.content}` }}
        </span>
      </div>
    </aside>
  </div>
</template>
<script>
import { sendMessage } from "../../api/client";
import { getcoursetopic, getOssSts } from "../../api/common";
import { imageUrl2Base64, dataURLtoBlob } from "../../common/util";
import html2canvas from "html2canvas";
import OSS from "ali-oss";

export default {
  name: "whiteBoard",
  data() {
    return {
      topic_id:
        this.$route.query.topic_id.split(",").length > 1
          ? this.$route.query.topic_id.split(",")[0]
          : this.$route.query.topic_id,
      testInfo: [],
      current: 1,
      testMap: []
    };
  },
  computed: {
    showList() {
      let middle = this.testInfo.filter((val, index) => {
        return index + 1 == this.current;
      });
      return middle;
    }
  },
  mounted() {
    window["recvMessage"] = msg => {
      if (JSON.parse(msg).operation == "downloadImg") {
        this.screenShot();
      } else {
        this.recvMessage(msg);
      }
    };
    this.apiLoad();
  },
  methods: {
    trans(item, index) {
      let pcModel = {
        signal: "imgLoadReady"
      };
      sendMessage(pcModel);
    },
    screenShot() {
      html2canvas(document.getElementsByClassName(`test0`)[0], {
        allowTaint: true,
        useCORS: true,
        taintTest: false,
        scale: window.devicePixelRatio * 2
      }).then(canvas => {
        let dataURL = canvas.toDataURL("image/jpg");
        this.imgUrl = dataURL;
        let fileOfBlob = new File(
          [dataURLtoBlob(this.imgUrl)],
          new Date().getTime() + ".jpg"
        );
        getOssSts().then(res => {
          const client = new OSS({
            endpoint: res.EndPoint,
            accessKeyId: res.AccessKeyId,
            accessKeySecret: res.AccessKeySecret,
            bucket: res.Bucket,
            stsToken: res.SecurityToken
          });
          let d = new Date();
          let ext = "jpg";
          let remote_name =
            `${this.$route.query.user_id}/${this.$route.query.class_id}/${this.$route.query.schedule_id}/${this.topic_id}` +
            "." +
            ext;
          client.multipartUpload(remote_name, fileOfBlob).then(res => {
            let model = {
              index: this.topic_id,
              url: res.res.requestUrls[0].split("?")[0]
            };
            this.$set(this.testMap, this.current - 1, model);
            sendMessage(model);
          });
        });
      });
    },
    recvMessage(msg) {
      this.testInfo.map((val, index) => {
        if (val.id == JSON.parse(msg).topic_id) {
          this.current = index + 1;
        }
      });
      if (!this.testInfo[this.current - 1].img_url) {
        this.$nextTick(() => {
          this.trans("", 0);
        });
      }
    },
    apiLoad() {
      getcoursetopic({ schedule_id: this.$route.query.schedule_id }).then(
        res => {
          if (res.code == 0) {
            this.testInfo = res.data.topics;
            this.testInfo.map((val, index) => {
              if (val.id == this.topic_id) {
                this.current = index + 1;
              }
            });

            if (!this.testInfo[this.current - 1].img_url) {
              this.$nextTick(() => {
                this.trans("", 0);
              });
            }
          } else {
            this.$toast(res.msg);
          }
        }
      );
    }
  }
};
</script>
<style lang="less" scoped>
.whiteBoard {
  height: 100%;
  aside {
    // font-family: DIN;
    padding: 47px 0px;
    box-sizing: border-box;
    width: 480px;
    height: 100vh;
    overflow: auto;
    border-right: 1px solid #d8d8d8;
    div {
      padding: 10px 40px;
      .title {
        display: block;
      }
      span {
        font-weight: 500;
        color: #292d33;
        // line-height: 38px;
        line-height: 1;
        display: inline-block;
        margin-bottom: 34px;
      }
      .options {
        min-width: 50%;
        // line-height: 25px;
        line-height: 1;
        label {
          margin-right: 10px;
        }
      }
      img {
        margin-bottom: 40px;
        width: 100%;
      }
    }
  }
}
</style>
