<template>
  <div class="set">
    <div class="bgpc"></div>
    <div class="new_header" v-show="flag">
      <div class="back" @click="toBack">
        <img src="../../assets/img/ic_back.png" />
      </div>
      <div class="new_font">设置</div>
    </div>
    <div class="header_blockpc" v-show="!flag">
      设置
    </div>
    <!--body部分开始-->
    <div class="set_box">
      <div class="administration">
        <div class="address_list" @click="score">
          <div class="address_name">为我们评分</div>
          <div class="img_right">
            <img src="../../assets/img/btn_arrow.png" />
          </div>
        </div>
        <div class="address_list" @click="toAboout">
          <div class="address_name">关于猴猴画</div>
          <div class="img_right">
            <img src="../../assets/img/btn_arrow.png" />
          </div>
        </div>
        <div class="set_list" @click="clearCache" v-show="flag">
          <div class="address_name">清理缓存</div>
          <div class="dele">{{ cachesize }}</div>
        </div>
      </div>
    </div>
    <!--body部分结束-->

    <!--生日部分结束-->
  </div>
</template>
<script>
import { isMobile } from "../../common/util";
import { apiInfo, updateProfile } from "../../api/common";
export default {
  components: {},
  data() {
    return {
      cachesize: "",
      flag: isMobile()
    };
  },
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.toBack();
    });
    dsBridge.call("getcachesize", "", function(v) {});
    let that = this;
    dsBridge.registerAsyn("UploadCacheSize", function(arg1, arg2, arg3) {
      that.cachesize = JSON.parse(arg1).size;
    });
  },
  methods: {
    //去关于页面
    toAboout() {
      this.$router.push({
        path: "/pc/Aboutapppc",
        query: { token: this.$route.query.token }
      });
    },
    // 评分的方法开始
    score() {
      dsBridge.call("commenton", " ", function(v) {});
    },
    // 评分的方法结束
    toBack() {
      this.$router.push({
        path: "/pc/Me",
        query: { token: this.$route.query.token }
      });
    },

    clearCache() {
      dsBridge.call("clearcache", "", function(v) {});
      let that = this;
      dsBridge.registerAsyn("UploadCacheSize", function(arg1, arg2, arg3) {
        that.cachesize = JSON.parse(arg1).size;
      });
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.new_header {
  width: 100%;
  padding: 8px 20px 8px 21px;
  background: #fff;
  display: flex;
  box-sizing: border-box;
}
.header_pc {
  width: 100%;
  padding: 11px 40px;
  background: #fff;
  box-sizing: border-box;
  font-size: 21px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
}
.back {
  width: 20px;
  height: 20px;
}
.back img {
  width: 100%;
  height: 100%;
}
.new_font {
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #292d33;
  text-align: center;
  margin: auto;
  font-weight: 500;
}

.set {
  width: 100%;
  height: 100%;
  background: #f3f5f9;
}
.set_box {
  padding: 60px 112px 20px;
  background: #f3f5f9;

  width: 100%;

  box-sizing: border-box;
}
// 地址管理部分
.administration {
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  padding: 0px 30px 0px;
  position: relative;
  margin-bottom: 15px;
}
.address_list {
  width: 100%;
  display: flex;
  border-bottom: 1px solid #f2f5fa;
  padding-bottom: 14px;
  padding-top: 14px;
  position: relative;
  cursor: pointer;
  align-items: center;
}
.set_list {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 14px;
  padding-top: 14px;
}
.address_name {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #292d33;
}
.dele {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(138, 143, 153, 1);
}
.img_right {
  position: absolute;
  right: 1px;
  display: flex;
  align-items: center;
}
.img_right img {
  width: 7px;
  height: 12px;
}
.img_right .header {
  width: 21px;
  height: 21px;
  border-radius: 50%;
  margin-right: 13px;
}
.img_right input {
  border: 0;
  text-align: right;
}
.img_right .mes input::-webkit-input-placeholder {
  color: #8a8f99;
  font-weight: 400;
  font-size: 14px;
}
.img_right .mes {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #8a8f99;
  margin-right: 9px;
}
.img_right .font {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #292d33;
  margin-right: 9px;
}
.img_right .font input::-webkit-input-placeholder {
  color: #292d33;
  font-weight: 400;
  font-size: 14px;
}
/deep/ .van-picker-column {
  font-size: 20px;
}
</style>
