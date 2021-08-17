<template>
  <div class="personage">
    <div class="title">个人入驻</div>
    <!-- status  0待审核  1通过  2驳回 -->
    <div class="warn" v-if="list == '' || !perinformation">
      承诺认证信息为真实信息，一经审核通过将不可修改
    </div>
    <div class="warn_g" v-if="perinformation && perinformation.status == 1">
      审核已通过
    </div>
    <div class="warn_r" v-if="perinformation && perinformation.status == 2">
      审核未通过，{{ perinformation.audit_opinion }}
    </div>
    <div class="warn" v-if="perinformation && perinformation.status == 0">
      正在审核中，预计1-2个工作日内反馈审核结果
    </div>
    <div class="content">
      <div class="companyname">手机号码</div>
      <!-- <div class="input" v-if="list == '' || !perinformation">
        <input
          disabled
          type="text"
          class="activeinoput"
          placeholder="请输入手机号码"
          v-model="phone"
        />
      </div> -->
      <div class="content_name" v-if="list == '' || !perinformation">
        {{ tel }}
      </div>
      <div
        class="content_name"
        v-else-if="perinformation && perinformation.status != 2"
      >
        {{ perinformation.phone }}
      </div>
      <div class="content_name" v-else-if="perinformation.status == 2">
        {{ tel }}
      </div>
      <!-- <div class="input" v-else-if="perinformation.status == 2">
        <input
          disabled
          type="text"
          class="activeinoput"
          placeholder="请输入手机号码"
          v-model="phone"
        />
      </div> -->
    </div>
    <div
      class="content"
      v-if="list == '' || !perinformation || perinformation.status == 2"
    >
      <div class="companyname">手机验证码</div>
      <div class="input">
        <input
          type="text"
          placeholder="请输入请输入手机验证码"
          v-model="code"
        />
        <span class="code cursor" v-show="!count_flag" @click="getcode"
          >获取验证码</span
        >
        <span class="code cursor" v-show="count_flag">{{ count_time }}s</span>
      </div>
    </div>

    <div class="content">
      <div class="companyname">真实姓名</div>
      <div class="input" v-if="list == '' || !perinformation">
        <input type="text" placeholder="请输入真实姓名" v-model="name" />
      </div>
      <div
        class="content_name"
        v-else-if="perinformation && perinformation.status != 2"
      >
        {{ perinformation.name }}
      </div>
      <div class="input" v-else-if="perinformation.status == 2">
        <input
          type="text"
          placeholder="请输入真实姓名"
          v-model="perinformation.name"
        />
      </div>
    </div>
    <div class="content">
      <div class="companyname">身份证号码</div>
      <div class="input" v-if="list == '' || !perinformation">
        <input type="text" placeholder="请输入身份证号码" v-model="id_card" />
      </div>
      <div
        class="content_name"
        v-else-if="perinformation && perinformation.status != 2"
      >
        {{ perinformation.id_card }}
      </div>

      <div class="input" v-else-if="perinformation.status == 2">
        <input
          type="text"
          placeholder="请输入身份证号码"
          v-model="perinformation.id_card"
        />
      </div>
    </div>
    <div class="updataimg">
      <div class="companyname">手持身份证照</div>
      <div v-if="list == '' || !perinformation">
        <div :class="identity == '' ? 'updata' : 'haveupdata'" class="cursor">
          <van-uploader
            v-model="identity"
            :after-read="afterRead"
            :before-read="beforeRead"
            :max-count="2"
            :preview-image="false"
            :preview-full-image="false"
            :click-preview="isPreview"
          >
            <div v-show="!identity_img">
              <img src="../assets/img/ic_add@2x.png" alt="" />
            </div>
            <img v-show="identity_img" class="img" :src="identity_img" alt="" />
          </van-uploader>
        </div>
        <ul>
          <li>
            1.请上传清晰彩色扫描件或照片
          </li>
          <li>
            2.支持jpeg、jpg、png、bmp格式
          </li>
          <li>
            3.图片大小不超过10M
          </li>
        </ul>
      </div>
      <div
        class="imgurl cursor"
        v-else-if="perinformation && perinformation.status != 2"
      >
        <img :src="perinformation.img" alt="" />
      </div>
      <!--上传手持身份证照开始-->

      <div v-else-if="perinformation.status == 2">
        <div :class="identity == '' ? 'updata' : 'haveupdata'" class="cursor">
          <van-uploader
            v-model="identity"
            :after-read="afterRead"
            :before-read="beforeRead"
            :max-count="2"
            :preview-image="false"
            :preview-full-image="false"
            :click-preview="isPreview"
          >
            <div v-show="!identity_img">
              <img src="../assets/img/ic_add@2x.png" alt="" />
            </div>
            <img v-show="identity_img" class="img" :src="identity_img" alt="" />
          </van-uploader>
        </div>
        <ul>
          <li>
            1.请上传清晰彩色扫描件或照片
          </li>
          <li>
            2.支持jpeg、jpg、png、bmp格式
          </li>
          <li>
            3.图片大小不超过10M
          </li>
        </ul>
      </div>

      <!--上传手持身份证照结束-->
    </div>
    <!--按钮部分开始 -->
    <div
      class="btn"
      v-if="
        list == '' || orginformation.status == 2 || perinformation.status == 2
      "
    >
      <div class="submit cursor" @click="submit">提交</div>
      <!-- <div class="cancel cursor">取消</div> -->
    </div>
    <!--按钮部分结束 -->
  </div>
</template>
<script>
import OSS from "ali-oss";
import { Uploader } from "vant";
import { getOssSts, presonalAdd } from "../api/common";
export default {
  components: {
    [Uploader.name]: Uploader
  },
  name: "Personage",
  props: ["perinformation", "list", "orginformation", "tel"],
  data() {
    return {
      timer: null,
      time: 60,
      flag: false,
      count_flag: false,
      count_time: "",
      phone: "", //电话
      code: "", //验证码
      name: "", //名字
      id_card: "", //身份证号
      identity_img: "",
      imgType: ["png", "jpg", "jpeg", "bmp"],
      identity: [],
      pxote_name: ""
    };
  },
  created() {},
  watch: {},

  mounted() {
    this.phone = this.tel;
    if (this.perinformation != "") {
      this.phone = this.perinformation.phone;
      this.name = this.perinformation.name;
      this.id_card = this.perinformation.id_card;
      this.pxote_name = this.perinformation.img[0];
      this.identity[0] = this.perinformation.img[0];
      this.identity_img = this.identity[0];
    }
  },
  methods: {
    isPreview() {},
    beforeRead(file) {
      if (
        !this.imgType.includes(
          file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase()
        )
      ) {
        Toast("文件格式有误");
        return false;
      }
      return true;
    },
    afterRead(file) {
      //oss上传

      // file.status = "uploading";
      // file.message = "上传中...";
      getOssSts().then(res => {
        const client = new OSS({
          endpoint: res.EndPoint,
          accessKeyId: res.AccessKeyId,
          accessKeySecret: res.AccessKeySecret,
          bucket: res.Bucket,
          stsToken: res.SecurityToken
        });

        let d = new Date();
        let ext = file.file.name
          .split(".")
          .pop()
          .toLowerCase();
        let pxote_name =
          "classes/" +
          d.getFullYear() +
          "/" +
          (d.getMonth() + 1) +
          "/" +
          d.getDate() +
          "/" +
          d.getTime() +
          "." +
          ext;
        client.multipartUpload(pxote_name, file.file).then(result => {
          //成功
          this.identity_img = result.res.requestUrls[0].split("?")[0];
          this.identity = [];
          this.identity[0] = this.identity_img;
          this.pxote_name = pxote_name;
        });
      });
    },
    submit() {
      this.$emit("Fatersubmit");
    },
    getcode() {
      this.$emit("Fatercode");
      this.flag = !this.flag;
      this.countDown();
    },
    countDown() {
      var TIME_COUNT = 60;
      if (!this.timer) {
        this.count_time = TIME_COUNT;
        this.count_flag = true;
        this.timer = setInterval(() => {
          if (this.count_time > 0 || this.count < TIME_COUNT + 1) {
            this.count_time--;
          } else {
            clearInterval(this.timer);
            this.timer = null;
            this.count_flag = false;
          }
        }, 1000);
      }
    }
  }
};
</script>

<style lang="less" scoped>
// 右边部分
.personage {
  .title {
    font-size: 21px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #000000;
    margin-bottom: 8px;
  }
  .warn {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #606266;
    margin-bottom: 40px;
  }
  .warn_g {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #3dcca8;
    margin-bottom: 40px;
  }
  .warn_r {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #e62e2e;
    margin-bottom: 40px;
  }
  .content {
    width: 399px;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    margin-bottom: 22px;
    .content_name {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #606266;
    }
    .input {
      position: relative;
      input {
        width: 280px;
        height: 40px;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000;
        padding: 13px 15px;
      }
      ::-webkit-input-placeholder {
        color: #c0c4cc;
      }
      .activeinoput {
        border: 0;
      }
    }
  }
  .companyname {
    width: 119px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #606266;
  }
  .updataimg {
    // width: 399px;
    display: flex;
    // align-items: center;
    margin-bottom: 30px;
    .companyname {
      width: 119px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #606266;
      margin-top: 10px;
    }
  }
  .imgurl {
    img {
      max-width: 200px;
      max-height: 200px;
      // width: 240px;
      // height: 135px;
      object-fit: cover;
    }
  }
  .haveupdata {
    background: #fbfcff;
    border-radius: 4px;
    border: 1px dotted #dcdfe6;

    display: flex;
    align-items: center;
    justify-content: center;
    .img {
      // width: 240px;
      // height: 135px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    img {
      width: 24px;
      height: 24px;
    }
  }
  .updata {
    width: 240px;
    // height: 135px;
    min-height: 135px;

    background: #fbfcff;
    border-radius: 4px;
    border: 1px dotted #dcdfe6;

    // margin-left: 63px;
    display: flex;
    align-items: center;
    justify-content: center;
    .img {
      // width: 240px;
      // height: 135px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    img {
      width: 24px;
      height: 24px;
    }
  }
  ul,
  li {
    list-style-type: none;
  }
  ul {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #c0c4cc;
    margin-top: 8px;
    // margin-left: 63px;
  }

  .btn {
    display: flex;
    width: 216px;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    margin-left: 119px;
    .submit {
      width: 98px;
      height: 40px;
      background: #409eff;
      border-radius: 4px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .cancel {
      width: 98px;
      height: 40px;
      // background: #dcdfe6;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #606266;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.code {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #409eff;
  position: absolute;
  right: 16px;
  top: 10px;
}
/deep/.van-uploader__input-wrapper {
  width: 242px;
  // height: 137px;
  min-height: 135px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
