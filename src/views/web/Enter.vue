<template>
  <div class="enter">
    <!-- <Myheader @jump="jump" :date="4" @search="search"></Myheader> -->

    <div class="bgpc"></div>
    <div class="enter_box">
      <!--左边部分开始-->
      <div class="box_left">
        <div
          class="cursor"
          :class="show == 1 ? 'select' : 'active'"
          @click="genre(1)"
        >
          个人入驻
        </div>
        <div
          class="cursor"
          :class="show == 2 ? 'select' : 'active'"
          @click="genre(2)"
        >
          机构入驻
        </div>
      </div>
      <!--左边部分结束-->
      <!--右边部分开始-->
      <div class="long"></div>
      <div class="box_right">
        <Personage
          :list="list"
          v-show="show == 1"
          @Fatersubmit="submit"
          @Fatercode="getcode"
          ref="per"
          v-if="list"
          :orginformation="orginformation"
          :perinformation="perinformation"
          :tel="tel"
        ></Personage>
        <Institutions
          :list="list"
          v-show="show == 2"
          ref="org"
          @Faterorg="Add"
          v-if="list"
          :orginformation="orginformation"
          :perinformation="perinformation"
        ></Institutions>
      </div>
      <!--右边部分结束-->
    </div>
    <!---->
    <div class="paytoast" v-show="paytoast">
      <div class="payment">
        <div class="ment">
          {{ toast }}
        </div>
        <div class="know cursor" @click="know">知道了</div>
      </div>
    </div>
    <!---->
  </div>
</template>
<script>
import Institutions from "../../components/Institutions";
import Personage from "../../components/personage";
import {
  getOssSts,
  presonalAdd,
  getLoginSms,
  orgAdd,
  getApply
} from "../../api/common";
// import Myheader from "../../components/headerweb";

export default {
  components: { Institutions, Personage },
  data() {
    return {
      tel: "",
      list: "",
      show: 1,
      perinformation: "",
      orginformation: "",
      type: "",
      paytoast: false,
      toast: "",
      toasts: {
        0: "您正在申请个人入驻，如需以机构申请入驻，请先撤销个人入驻的审核申请。",
        1: "您已通过个人入驻申请，无法申请机构入驻。",
        2: "您正在申请机构入驻，如需以个人身份申请入驻，请先撤销机构入驻的审核申请。",
        3: "您已通过机构入驻申请，无法申请个人入驻。",
        4: "您已通过个人入驻申请，无法申请机构入驻。",
        5: "您已通过机构入驻申请，无法申请个人入驻。"
      },
      status: ""
    };
  },
  created() {},
  mounted() {
    let member = localStorage.getItem("member")
      ? JSON.parse(localStorage.getItem("member"))
      : "";
    this.tel = member.phone;
    getApply().then(res => {
      if (res.code == 0) {
        this.list = res.data;
        if (res.data.constructor != Array) {
          this.type = res.data.type;
          this.status = res.data.status;
          this.show = res.data.type;
          if (res.data.type == 1) {
            this.perinformation = res.data;
            let mation = this.perinformation.img;
            this.perinformation.img = [];
            this.perinformation.img[0] = mation;
          } else if (res.data.type == 2) {
            this.orginformation = res.data;
            let openlist = this.orginformation.opening_certificate;
            let license = this.orginformation.license_img;
            this.orginformation.opening_certificate = [];
            this.orginformation.opening_certificate[0] = openlist;
            this.orginformation.license_img = [];
            this.orginformation.license_img[0] = license;
          }
        }
      }
    });
  },
  methods: {
    know() {
      this.paytoast = !this.paytoast;
    },
    genre(show) {
      // type==1 个人 type==2机构 type代表已操作过的类型
      // show==1 个人 show==2机构
      // <!-- status  0待审核  1通过  2驳回 -->

      if (this.status != 2 && this.status) {
        if (this.type == 1 && show == 2) {
          this.paytoast = !this.paytoast;
          this.toast = this.toasts[this.status];
          // "您正在申请个人入驻，如需以机构申请入驻，请先撤销个人入驻的审核申请。";
        } else if (this.type == 1 && show == 1) {
          if (this.status == 1) {
            this.paytoast = !this.paytoast;
            this.toast = this.toast = this.toasts[+4];
            return;
          }
          this.show = show;
        } else if (this.type == 2 && show == 2) {
          this.show = show;
        } else if (this.type == 2 && show == 1) {
          if (this.status == 1) {
            this.toast = this.toasts[+3];
            this.paytoast = !this.paytoast;
            // this.show = show;
            return;
          }
          this.paytoast = !this.paytoast;
          this.toast = this.toasts[this.status + 2 - 0];

          // "您正在申请机构入驻，如需以个人身份申请入驻，请先撤销机构入驻的审核申请。";
        }
      } else {
        this.show = show;
      }
    },

    getcode() {
      let childData = this.$refs.per.phone;
      if (
        this.$refs.per.phone &&
        /^1[3456789]\d{9}$/.test(this.$refs.per.phone)
      ) {
        getLoginSms({ use: "common", phone: this.$refs.per.phone }).then(
          res => {
            if (res.code == 0) {
              this.$toast("验证码已发送至手机");
            } else {
              this.$toast(res.msg);
            }
          }
        );
      } else {
        this.$toast("手机号有误");
      }
    },

    submit() {
      if (this.$refs.per.code) {
        if (
          this.$refs.per.phone &&
          this.$refs.per.code &&
          this.$refs.per.name &&
          this.$refs.per.id_card &&
          this.$refs.per.identity[0] &&
          this.$refs.per.phone &&
          /^1[3456789]\d{9}$/.test(this.$refs.per.phone)
        ) {
          if (
            /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
              this.$refs.per.id_card
            )
          ) {
            presonalAdd({
              phone: this.$refs.per.phone, //电话
              code: this.$refs.per.code, //验证码
              name: this.$refs.per.name, //名字
              id_card: this.$refs.per.id_card, //身份证号
              img: this.$refs.per.identity[0] //图片
            }).then(res => {
              if (res.code == 0) {
                this.$toast("提交成功");
                this.show == 1;
                location.reload();
              } else {
                this.$toast(res.msg);
              }
            });
          } else {
            this.$toast("身份证号填写错误");
          }
        } else {
          this.$toast("请检查填写信息是否正确完善");
        }
      } else {
        this.$toast("请填写验证码");
      }
    },
    Add() {
      if (
        this.$refs.org.companyname && //公司名字
        this.$refs.org.license && //营业执照代码
        this.$refs.org.account && //对公账号
        this.$refs.org.opening && //开户行
        this.$refs.org.name && //名字
        this.$refs.org.phone &&
        /^1[3456789]\d{9}$/.test(this.$refs.org.phone) && //手机号
        this.$refs.org.email &&
        /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/.test(
          this.$refs.org.email
        ) && //邮箱
        this.$refs.org.fileList[0] && //开户证明
        this.$refs.org.business[0] //营业执照
      ) {
        orgAdd({
          company_name: this.$refs.org.companyname, //公司名称,
          license_number: this.$refs.org.license, //营业执照代码',
          license_img: this.$refs.org.business[0], //营业执照',
          account: this.$refs.org.account, //对公账号',
          account_bank: this.$refs.org.opening, //'对公账号开户行',
          opening_certificate: this.$refs.org.fileList[0], //'开户证明',
          name: this.$refs.org.name, // '联系人姓名',
          phone: this.$refs.org.phone, // '手机号码',
          email: this.$refs.org.email // '邮箱',
        }).then(res => {
          if (res.code == 0) {
            this.$toast("提交成功");
            location.reload();
            this.show == 2;
          }
        });
      } else {
        this.$toast("请完善信息");
      }
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.enter {
  padding-top: 80px;
}
.enter_box {
  width: 1200px;

  background: #ffffff;
  border-radius: 8px;
  margin: auto;
  display: flex;
}

// 左边部分
.box_left {
  width: 276px;
  padding-left: 77px;
  padding-top: 80px;
  box-sizing: border-box;
  div {
    margin-bottom: 20px;
  }
  // 默认样式
  .active {
    // font-size: 16px;
    // font-family: PingFangSC-Medium, PingFang SC;
    // font-weight: 500;
    color: #333333;
    // margin-top: 12px;
    // margin-left: 20px;
    // margin-bottom: 32px;

    border-radius: 4px 0px 0px 4px;
    padding: 12px 20px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
  }
  // 选中的样式
  .select {
    background: #e6f7ff;
    border-radius: 4px 0px 0px 4px;
    padding: 12px 20px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #52a2ff;
    border-right: 2px solid #52a2ff;
  }
}
// 竖线
.long {
  width: 1px;
  min-height: 726px;
  // max-height: 1100px;
  background: #ebeef5;
}
// 右边部分
.box_right {
  width: 924px;
  height: 100%;
  // max-height: 1150px;
  padding: 40px 40px 37px;
  box-sizing: border-box;
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
  .content {
    width: 399px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 22px;

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
        color: #c0c4cc;
        padding: 13px 15px;
      }
    }
  }
  .companyname {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #606266;
  }
  .updataimg {
    width: 399px;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }
  .updata {
    width: 240px;
    height: 135px;
    background: #fbfcff;
    border-radius: 4px;
    border: 1px dotted #dcdfe6;

    margin-left: 63px;
    display: flex;
    align-items: center;
    justify-content: center;
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
    margin-left: 63px;
  }
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
//弹框部分开始
.paytoast {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.49);
  position: fixed;
  top: 0;
  z-index: 10;
  .payment {
    width: 545px;
    height: 192px;
    background: #ffffff;
    box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: relative;
    padding-top: 52px;
    box-sizing: border-box;
  }
  .ment {
    width: 318px;
    height: 40px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #606266;
    margin: auto;
    text-align: center;
  }
  .know {
    width: 98px;
    height: 40px;
    background: #409eff;
    border-radius: 4px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
    padding: 13px 28px;
    box-sizing: border-box;
    // margin: auto;
    position: absolute;
    bottom: 26px;
    left: 224px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
//弹框部分结束
</style>
