<template>
  <div class="Institutions">
    <div class="title">机构入驻</div>
    <!-- status  0待审核  1通过  2驳回 -->
    <div class="warn" v-if="list == '' || !orginformation">
      承诺认证信息为真实信息，一经审核通过将不可修改
    </div>
    <div class="warn_g" v-if="orginformation && orginformation.status == 1">
      审核已通过
    </div>
    <div class="warn_r" v-if="orginformation && orginformation.status == 2">
      审核未通过，{{ orginformation.audit_opinion }}
    </div>
    <div class="warn" v-if="orginformation && orginformation.status == 0">
      正在审核中，预计1-2个工作日内反馈审核结果
    </div>
    <div class="content">
      <div class="companyname">公司名称</div>

      <div class="input" v-if="list == '' || !orginformation">
        <input type="text" placeholder="请输入公司名称" v-model="companyname" />
      </div>
      <div
        class="content_name"
        v-else-if="orginformation && orginformation.status != 2"
      >
        {{ orginformation.company_name }}
      </div>
      <div class="input" v-else-if="orginformation.status == 2">
        <input
          type="text"
          placeholder="请输入公司名称"
          v-model="orginformation.company_name"
        />
      </div>
    </div>
    <div class="content">
      <div class="companyname">营业执照代码</div>
      <div class="input" v-if="list == '' || !orginformation">
        <input
          type="text"
          placeholder="组织机构代码证/注册号/社会信用代码"
          v-model="license"
        />
      </div>
      <div
        class="content_name"
        v-else-if="orginformation && orginformation.status != 2"
      >
        {{ orginformation.license_number }}
      </div>

      <div class="input" v-else-if="orginformation.status == 2">
        <input
          type="text"
          placeholder="组织机构代码证/注册号/社会信用代码"
          v-model="orginformation.license_number"
        />
      </div>
    </div>
    <div class="updataimg">
      <div class="companyname">营业执照</div>
      <div class=" cursor" v-if="list == '' || !orginformation">
        <div :class="business == '' ? 'updata' : 'haveupdata'" class="cursor">
          <van-uploader
            class=" cursor"
            v-model="business"
            :after-read="afterbusiness"
            :before-read="beforeRead"
            :max-count="2"
            :preview-image="false"
            :preview-full-image="false"
            :click-preview="isPreview"
          >
            <div v-show="!business_img" class=" cursor">
              <img src="../assets/img/ic_add@2x.png" alt="" />
            </div>
            <img
              v-show="business_img"
              class="img cursor"
              :src="business_img"
              alt=""
            />
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
        v-else-if="orginformation && orginformation.status != 2"
      >
        <img :src="orginformation.license_img" alt="" />
      </div>
      <!--上传营业照片开始-->

      <div class=" cursor" v-else-if="orginformation.status == 2">
        <div :class="business == '' ? 'updata' : 'haveupdata'" class="cursor">
          <van-uploader
            v-model="business"
            :after-read="afterbusiness"
            :before-read="beforeRead"
            :max-count="2"
            :preview-image="false"
            :preview-full-image="false"
            :click-preview="isPreview"
          >
            <div v-show="!business_img">
              <img src="../assets/img/ic_add@2x.png" alt="" />
            </div>
            <img v-show="business_img" class="img" :src="business_img" alt="" />
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

      <!--上传营业照片结束-->
    </div>
    <div class="content">
      <div class="companyname">对公帐号</div>
      <div class="input" v-if="list == '' || !orginformation">
        <input type="text" placeholder="请输入对公帐号" v-model="account" />
      </div>
      <div
        class="content_name"
        v-else-if="orginformation && orginformation.status != 2"
      >
        {{ orginformation.account }}
      </div>

      <div class="input" v-else-if="orginformation.status == 2">
        <input
          type="text"
          placeholder="请输入对公帐号"
          v-model="orginformation.account"
        />
      </div>
    </div>
    <div class="content">
      <div class="companyname">对公帐号开户行</div>
      <div class="input" v-if="list == '' || !orginformation">
        <input
          type="text"
          placeholder="请输入对公帐号开户行全称"
          v-model="opening"
        />
      </div>
      <div
        class="content_name"
        v-else-if="orginformation && orginformation.status != 2"
      >
        {{ orginformation.account_bank }}
      </div>

      <div class="input" v-else-if="orginformation.status == 2">
        <input
          type="text"
          placeholder="请输入对公帐号开户行全称"
          v-model="orginformation.account_bank"
        />
      </div>
    </div>
    <div class="updataimg">
      <div class="companyname">开户证明</div>
      <div v-if="list == '' || !orginformation">
        <div :class="fileList == '' ? 'updata' : 'haveupdata'" class="cursor">
          <van-uploader
            v-model="fileList"
            :after-read="afterRead"
            :before-read="beforeRead"
            :max-count="2"
            :preview-image="false"
            :preview-full-image="false"
            :click-preview="isPreview"
          >
            <div v-show="!fileList_img">
              <img src="../assets/img/ic_add@2x.png" alt="" />
            </div>
            <img v-show="fileList_img" class="img" :src="fileList_img" alt="" />
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
        v-else-if="orginformation && orginformation.status != 2"
      >
        <img :src="orginformation.opening_certificate" alt="" />
      </div>
      <!--上传开户证明开始-->

      <div v-else-if="orginformation.status == 2">
        <div :class="fileList == '' ? 'updata' : 'haveupdata'" class="cursor">
          <van-uploader
            v-model="fileList"
            :after-read="afterRead"
            :before-read="beforeRead"
            :max-count="2"
            :preview-image="false"
            :preview-full-image="false"
            :click-preview="isPreview"
          >
            <div v-show="!fileList_img">
              <img src="../assets/img/ic_add@2x.png" alt="" />
            </div>
            <img v-show="fileList_img" class="img" :src="fileList_img" alt="" />
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

      <!--上传开户证明结束-->
    </div>
    <div class="content">
      <div class="companyname">联系人姓名</div>
      <div class="input" v-if="list == '' || !orginformation">
        <input type="text" placeholder="请输入联系人姓名" v-model="name" />
      </div>
      <div
        class="content_name"
        v-else-if="orginformation && orginformation.status != 2"
      >
        {{ orginformation.name }}
      </div>

      <div class="input" v-else-if="orginformation.status == 2">
        <input
          type="text"
          placeholder="请输入联系人姓名"
          v-model="orginformation.name"
        />
      </div>
    </div>
    <div class="content">
      <div class="companyname">手机号码</div>
      <div class="input" v-if="list == '' || !orginformation">
        <input
          type="text"
          placeholder="请输入联系人手机号"
          maxlength="11"
          v-model="phone"
        />
      </div>
      <div
        class="content_name"
        v-else-if="orginformation && orginformation.status != 2"
      >
        {{ orginformation.phone }}
      </div>

      <div class="input" v-else-if="orginformation.status == 2">
        <input
          type="text"
          placeholder="请输入联系人手机号"
          maxlength="11"
          v-model="orginformation.phone"
        />
      </div>
    </div>
    <div class="content">
      <div class="companyname">邮箱</div>
      <div class="input" v-if="list == '' || !orginformation">
        <input type="text" placeholder="请输入联系邮箱" v-model="email" />
      </div>
      <div
        class="content_name"
        v-else-if="orginformation && orginformation.status != 2"
      >
        {{ orginformation.email }}
      </div>

      <div class="input" v-else-if="orginformation.status == 2">
        <input
          type="text"
          placeholder="请输入联系邮箱"
          v-model="orginformation.email"
        />
      </div>
    </div>
    <!--按钮部分开始 -->
    <div
      class="btn"
      v-if="
        list == '' || perinformation.status == 2 || orginformation.status == 2
      "
    >
      <div class="submit cursor" @click="Add">提交</div>
      <!-- <div class="cancel cursor">取消</div> -->
    </div>
    <!--按钮部分结束 -->
  </div>
</template>
<script>
import OSS from "ali-oss";
import { Uploader } from "vant";
import { getOssSts } from "../api/common";

export default {
  components: {
    [Uploader.name]: Uploader
  },
  name: "Institutions",
  props: ["orginformation", "list", "perinformation"],
  data() {
    return {
      companyname: "", //公司名字
      license: "", //营业执照代码
      account: "", //对公账号
      opening: "", //开户行
      name: "", //名字
      phone: "", //手机号
      email: "", //邮箱
      fileList_img: "",
      imgType: ["png", "jpg", "jpeg", "bmp"],
      fileList: [], //开户证明
      business: [], //营业执照
      business_img: "",
      fileList_name: "",
      business_name: ""
    };
  },
  created() {},
  watch: {},
  mounted() {
    if (this.orginformation != "") {
      this.companyname = this.orginformation.company_name;
      this.license = this.orginformation.license_number;
      this.account = this.orginformation.account;
      this.opening = this.orginformation.account_bank;
      this.name = this.orginformation.name;
      this.phone = this.orginformation.phone;
      this.email = this.orginformation.email;
      this.fileList_name = this.orginformation.opening_certificate; //需要截取字段
      this.business_name = this.orginformation.license_img; //需要截取字段
      this.business[0] = this.orginformation.license_img[0];
      this.business_img = this.business[0];
      this.fileList[0] = this.orginformation.opening_certificate[0];
      this.fileList_img = this.fileList[0];
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
        let fileList_name =
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
        client.multipartUpload(fileList_name, file.file).then(result => {
          //成功
          this.fileList_img = result.res.requestUrls[0].split("?")[0];
          this.fileList = [];
          this.fileList[0] = this.fileList_img;
          this.fileList_name = fileList_name;
        });
      });
    },
    afterbusiness(file) {
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
        let business_name =
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
        client.multipartUpload(business_name, file.file).then(result => {
          //成功
          this.business_img = result.res.requestUrls[0].split("?")[0];
          this.business = [];
          this.business[0] = this.business_img;
          this.business_name = business_name;
        });
      });
    },
    Add() {
      this.$emit("Faterorg");
    }
  }
};
</script>

<style lang="less" scoped>
// 右边部分
.Institutions {
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
    // width: 399px;
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
    width: 399px;
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
/deep/.van-uploader__input-wrapper {
  width: 242px;
  // height: 137px;
  min-height: 135px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
