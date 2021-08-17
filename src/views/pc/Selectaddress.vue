<template>
  <div class="select">
    <div class="bgpc"></div>
    <Header
      :hideBack="!flag ? true : ''"
      :title="'选择收货地址'"
      @toBack="toBack"
    >
      <div @click="add">添加地址</div>
    </Header>

    <!--body部分开始-->
    <div class="select_box">
      <!--列表部分开始-->
      <div
        class="select_list"
        v-for="(item, index) in addressList"
        :key="index"
      >
        <div class="list_left" @click="choice(index)">
          <div class="address">
            <div class="span">{{ item.name }}</div>
            <div class="number">
              {{ item.phone.substr(0, 3) + "****" + item.phone.substr(7, 4) }}
            </div>
          </div>
          <div class="left_address">
            <span v-if="item.default == 1" class="isDefault">
              默认
            </span>
            {{ item.address }}
          </div>
        </div>
        <img
          class="edit"
          @click="modify(item.id, index)"
          src="../../assets/img/ic_edit_address.png"
          alt=""
        />
      </div>
      <!--列表部分结束-->
    </div>
    <!--body部分结束-->
  </div>
</template>
<script>
import { getMyAddress } from "../../api/common";
import { isMobile } from "../../common/util";
export default {
  data() {
    return {
      addressList: [],
      flag: isMobile()
    };
  },
  created() {
    getMyAddress().then(res => {
      if (res.code == 0) {
        this.addressList = res.data;
      } else {
        this.$toast(res.msg || res.message);
      }
    });
  },
  mounted() {
    dsBridge.call("hidetabbar", "", function(v) {});
    dsBridge.registerAsyn("goback", (arg1, arg2, arg3) => {
      this.toBack();
    });
  },
  methods: {
    add() {
      this.$router.push({
        path: "/pc/Shippingaddress",
        query: {
          token: this.$route.query.token,
          addressIndex: this.addressList.length > 0 ? -1 : -2,
          Classtype: this.$route.query.Classtype
        }
      });
    },
    toBack() {
      if (localStorage.getItem("WebpageId") == -1) {
        this.$router.push({
          path: "/pc/Fillorder",
          query: {
            addressIndex: this.$route.query.addressIndex,
            token: this.$route.query.token,
            type: localStorage.getItem("type"),
            levelId: localStorage.getItem("levelId"),
            levelName: localStorage.getItem("levelName"),
            Classtype: this.$route.query.Classtype
          }
        });
      } else {
        this.$router.push({
          path: "/pc/Personalpc",
          query: {
            token: this.$route.query.token,
            Classtype: this.$route.query.Classtype
          }
        });
      }
    },
    choice(index) {
      if (localStorage.getItem("WebpageId") == -1) {
        this.$router.push({
          path: "/pc/Fillorder",
          query: {
            addressIndex: index,
            token: this.$route.query.token,
            type: localStorage.getItem("type"),
            levelId: localStorage.getItem("levelId"),
            levelName: localStorage.getItem("levelName"),
            Classtype: this.$route.query.Classtype
          }
        });
      }
    },
    modify(id, index) {
      this.$router.push({
        path: "/pc/Shippingaddress",
        query: {
          addressIndex: index,
          addressId: id,
          token: this.$route.query.token,
          Classtype: this.$route.query.Classtype
        }
      });
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.edit {
  height: 23px;
  cursor: pointer;
  width: 23px;
}
.new_header {
  width: 100%;
  padding: 8px 20px 8px 21px;
  background: #fff;
  display: flex;
  box-sizing: border-box;
  position: fixed;
  z-index: 9;
}
.header_pc {
  width: 100%;
  padding: 11px 40px;
  background: #fff;
  box-sizing: border-box;
  position: fixed;
  z-index: 9;
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
.select {
  width: 100%;
  height: 100%;
  background: #f2f5fa;
}
.select_box {
  width: 100%;
  background: #f2f5fa;
  box-sizing: border-box;
  padding: 60px 112px 60px;
}
.select_list {
  padding: 18px 30px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-radius: 8px;
}
.list_left {
  font-size: 18px;
  font-weight: 600;
  color: rgba(41, 45, 51, 1);
  width: 86%;
  .address {
    display: flex;
    align-items: center;
    .span {
      font-size: 16px;

      margin-right: 15px;
      word-wrap: break-word;
      max-width: 25vw;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 1;
    }
    .number {
      line-height: 1;
      font-size: 13px;
      font-weight: 400;
      color: #666666;
    }
  }
}
.left_address {
  font-size: 14px;
  font-weight: 400;
  margin-top: 6px;
  word-wrap: break-word;
  color: #999999;
  width: 100%;
  .isDefault {
    display: inline-block;
    background: #3dc17d;
    border-radius: 4px;
    opacity: 0.6;
    font-size: 12px;
    font-weight: 400;
    color: #ffffff;
    padding: 2px 4px;
  }
}
.right_redact {
  font-size: 14px;
  font-weight: 500;
  color: rgba(138, 143, 153, 1);
  padding: 10px 0px 9px 2.9%;
  // border-left: 1px solid #dae3f2;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.add {
  width: 100%;
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 400;
  color: rgba(255, 115, 0, 1);
  text-align: center;
  display: flex;
  align-items: center;
  background: #fff;
  padding: 18px 0;
  justify-content: center;
  cursor: pointer; /*鼠标悬停变小手*/
  border-radius: 8px;
}
</style>
