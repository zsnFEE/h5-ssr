<template>
  <div class="trialclass" :style="{ overflow: hidd }">
    <div class="bgpc"></div>
    <!-- <div class="new_header" v-show="flag">
      <div class="back" @click="toback">
        <img src="../../../assets/img/ic_back.png" />
      </div>
      <div class="new_font" v-if="!toast">{{ data.name }}</div>
      <div class="new_font" v-if="toast">猴猴画美术体验课</div>
    </div> -->
    <!-- <div class="header_pc" v-show="!flag" v-if="!toast">{{ data.name }}</div>
    <div class="header_pc" v-show="!flag" v-if="toast">猴猴画美术体验课</div> -->
    <div class="trialclass_box">
      <div class="bg_box ">
        <div class="content" v-if="data != ''" v-html="data.content">
          <!-- <img src="../../assets/img/img_a.png" /> -->
        </div>
        <div class="content" v-if="data == ''">
          <img src="../../../assets/img/img_a.png" />
        </div>
        <!--固定的部分开始-->
        <div class="bottom_btn ">
          <div class="describe">
            <div class="price" v-if="goods.price">¥ {{ goods.price }}</div>
            <div class="price" v-else>¥ 9.90</div>
            <div class="font" v-if="toast">优惠已减326.00</div>
          </div>
          <div class="btn button_color" v-if="toast" @click="btn_choice">
            立即抢购
          </div>
          <div class="btn button_color" v-if="!toast" @click="gofillorder">
            立即抢购
          </div>
        </div>
        <!--固定的部分结束-->
      </div>
    </div>
    <!--弹出框1开始-->
    <div class="choice" v-if="toast" v-show="choice" @click.self="btn_choice">
      <div class="choice_bottom">
        <div class="bottom_body">
          <div class="body_title">选择阶段</div>
          <div class="account">请选择孩子的实际年龄，以获得更好的教学效果</div>
          <div class="select_img">
            <div class="select_s" @click.stop="select(1)">
              <div class="s_title s1">S1</div>
              <div class="select_font" :class="[active == 1 ? 'active_a' : '']">
                <div class="age">3-5周岁</div>
                <div class="years">2015年7月-2017年6月底出生</div>
              </div>
            </div>
            <div class="select_s" @click.stop="select(2)">
              <div class="s_title s2">S2</div>
              <div class="select_font" :class="[active == 2 ? 'active_b' : '']">
                <div class="age">5-7周岁</div>
                <div class="years">2013年7月-2015年6月底出生</div>
              </div>
            </div>
            <div class="select_s" @click.stop="select(3)">
              <div class="s_title s3">S3</div>
              <div class="select_font" :class="[active == 3 ? 'active_c' : '']">
                <div class="age">7-9周岁</div>
                <div class="years">2010年7月-2013年6月底出生</div>
              </div>
            </div>
          </div>
          <!--完后按钮开始-->
          <div
            v-if="active"
            class="select_button button_color"
            @click.stop="course_select"
          >
            确定
          </div>
          <div
            v-else
            class="select_button  active_color"
            @click.stop="course_select"
          >
            确定
          </div>
          <!--完后按钮结束-->
        </div>
      </div>
    </div>
    <!--弹出框1结束-->
    <!--弹出框2开始-->
    <div
      class="choice"
      v-if="toast"
      v-show="course"
      @click.self="course_select"
    >
      <div class="choice_bottom">
        <div class="bottom_body">
          <div class="title_img" @click="course_select">
            <img src="../../../assets/img/ic_back.png" />
          </div>
          <div class="body_title">{{ phase }}</div>
          <div class="account">请选择孩子的实际年龄，以获得更好的教学效果</div>
          <div class="toast_content">
            <div class="course">
              <div
                :class="index == i ? 'courseA' : 'courseB'"
                v-for="(item, index) in list"
                :key="index"
                @click.stop="i = index"
              >
                <div class="course_flex">
                  <div :class="index == i ? 'active_name' : 'course_name'">
                    {{ item.listId }}
                  </div>
                  <div :class="index == i ? 'active_after' : 'name_after'">
                    {{ item.listName }}
                  </div>
                </div>
                <div class="course_img">
                  <img :src="i == index ? selected : nor" />
                </div>
              </div>
            </div>
          </div>
          <!--完后按钮开始-->
          <div
            class="select_btn "
            :class="i == -1 ? 'active_color' : 'button_color'"
            @click.stop="fillorder"
          >
            确定
          </div>
          <!--完后按钮结束-->
        </div>
      </div>
    </div>
    <!--弹出框2结束-->
  </div>
</template>
<script>
import { isMobile } from "../../../common/util";
import { getSmallClassDetail } from "../../../api/common";
export default {
  data() {
    return {
      choice: false,
      course: false,
      active: "",
      list: "",
      phase: "",
      i: -1,
      selected: require("../../../assets/img/ic_selected_white.png"),
      nor: require("../../../assets/img/ic_nor.png"),
      hidd: "",
      flag: isMobile(),
      data: "",
      goods: "",
      toast: true, //控制是否有弹框
      lessons: ["A", "B", "C", "D"]
    };
  },
  mounted() {
    // console.log(this.$route.query.Classtype);
    if (this.$route.query.Classtype == 2) {
      this.toast = false;
      // 小课堂的详情数据
      let classid = localStorage.getItem("classid");
      getSmallClassDetail({ id: classid }).then(res => {
        // console.log(classid);
        // console.log(res);
        if (res.code == 0) {
          this.data = res.data;
          this.goods = res.data.goods;
          localStorage.setItem("goods_id", res.data.goods.id);
          localStorage.setItem("price", res.data.goods.price);
          localStorage.setItem("fillname", res.data.name);
          localStorage.setItem("old_price", res.data.old_price);
          localStorage.setItem("cdnlogo", res.data.cdn + res.data.logo);
        } else {
          this.$toast(res.msg || res.message);
        }
      });
    }
    dsBridge.call("hidetabbar", "", function(v) {});
  },

  methods: {
    btn_choice() {
      this.choice = !this.choice;
      if (this.choice == true) {
        this.hidd = "hidden";
      } else if (this.choice == false) {
        this.hidd = "";
      }
    },
    select(s) {
      this.active = s;
      if (s == 1) {
        this.list = [
          { listId: "课程A", listName: "适合 3 - 3.5 岁宝贝学习" },
          { listId: "课程B", listName: "适合 3.5 - 4 岁宝贝学习" },
          { listId: "课程C", listName: "适合 4 - 4.5 岁宝贝学习" },
          { listId: "课程D", listName: "适合 4.5 - 5 岁宝贝学习" }
        ];
        this.phase = "S1阶段";
      } else if (s == 2) {
        this.list = [
          { listId: "课程A", listName: "适合 5 - 5.5 岁宝贝学习" },
          { listId: "课程B", listName: "适合 5.5 - 6 岁宝贝学习" },
          { listId: "课程C", listName: "适合 6 - 6.5 岁宝贝学习" },
          { listId: "课程D", listName: "适合 7.5 - 7 岁宝贝学习" }
        ];
        this.phase = "S2阶段";
      } else {
        this.list = [
          { listId: "课程A", listName: "适合 7 - 7.5 岁宝贝学习" },
          { listId: "课程B", listName: "适合 7.5 - 8 岁宝贝学习" },
          { listId: "课程C", listName: "适合 8 - 8.5 岁宝贝学习" },
          { listId: "课程D", listName: "适合 8.5 - 9 岁宝贝学习" }
        ];
        this.phase = "S3阶段";
      }
    },
    course_select() {
      if (this.$route.query.Classtype == 0) {
        this.tofillorder();
      } else {
        if (this.active) {
          this.choice = !this.choice;
          this.course = !this.course;
        } else {
          this.$toast("请选择年龄段或点击空白处退回");
        }
      }
    },
    // 体验课跳转到支付页面
    tofillorder() {
      let s = "";
      this.active == 1
        ? (s = "S1")
        : this.active == 2
        ? (s = "S2")
        : (s = "S3");
      if (s) {
        localStorage.setItem("type", s);
        let access_token = localStorage.getItem("access_token");
        if (access_token) {
          this.$router.push({
            path: "../ipad/Fillorder",
            query: {
              Classtype: this.$route.query.Classtype, //系统课页面跳转过去的
              token: this.$route.query.token
            }
          });
        } else {
          this.$router.push({
            path: "../ipad/loginIpad",
            query: {
              Classtype: this.$route.query.Classtype, //系统课页面跳转过去的
              token: this.$route.query.token
            }
          });
        }
      } else {
        this.$toast("请选择阶段");
      }
    },
    // 系统课跳转到支付页面
    fillorder() {
      let lesson = this.lessons[this.i];
      let s = "";
      this.active == 1
        ? (s = "S1")
        : this.active == 2
        ? (s = "S2")
        : (s = "S3");
      if (lesson && s) {
        localStorage.setItem("type", s);
        localStorage.setItem("levelId", lesson);
        let access_token = localStorage.getItem("access_token");
        if (access_token) {
          this.$router.push({
            path: "../ipad/Fillorder",
            query: {
              Classtype: this.$route.query.Classtype, //系统课页面跳转过去的
              token: this.$route.query.token
            }
          });
        } else {
          this.$router.push({
            path: "../ipad/loginIpad",
            query: {
              Classtype: this.$route.query.Classtype, //系统课页面跳转过去的
              token: this.$route.query.token
            }
          });
        }
      } else {
        this.$toast("请选择课程");
      }
    },
    // 从小课堂页面进来需要跳转到支付页面的方法
    gofillorder() {
      let access_token = localStorage.getItem("access_token");
      if (access_token) {
        this.$router.push({
          path: "../ipad/Fillorder",
          query: {
            Classtype: this.$route.query.Classtype, //系统课页面跳转过去的
            token: this.$route.query.token
          }
        });
      } else {
        this.$router.push({
          path: "../ipad/loginIpad",
          query: {
            Classtype: this.$route.query.Classtype, //系统课页面跳转过去的
            token: this.$route.query.token
          }
        });
      }
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.trialclass {
  width: 100vw;
  height: 100%;
}
.trialclass_box {
  background: rgba(255, 255, 255, 1);
  padding: 60px 9% 74px;
}
.bg_box {
  width: 100%;
  // height: 100%;
  // padding-bottom: 10%;
  box-sizing: border-box;
}
/deep/ .content > * {
  width: 100%;
  padding: 0;
  margin: 0 auto;
  img {
    width: 100%;
    display: block;
  }
}

// 中间图片部分start
.content {
  width: 100%;
  margin: auto;
}
.content img {
  width: 100%;
  // height: 100%;
}
// 中间图片部分end

.new_header {
  width: 100%;
  padding: 8.5px 0 8.5px 21.05px;
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
  margin-top: 9px;
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
}
// 固定在底部的btn
.bottom_btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px -1px 25px 0px rgba(0, 0, 0, 0.1);
  border-radius: 12px 12px 0px 0px;
  position: fixed;
  bottom: 0px;
  left: 0px;
}
.describe {
  padding: 21px 0 20px 112px;
  display: flex;
  .price {
    font-size: 24px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 87, 0, 1);
  }
  .font {
    margin-left: 6px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(138, 143, 153, 1);
    margin-top: 8px;
  }
}
.btn {
  width: 29%;
  text-align: center;
  padding: 25px 0px;
  box-sizing: border-box;
  // background: rgba(255, 115, 0, 1);
  border-radius: 0px 12px 0px 0px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  cursor: pointer; /*鼠标悬停变小手*/
}
// 弹框部分开始
.choice {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.49);
  position: fixed;
  top: 0;
  z-index: 99;
  .choice_bottom {
    background: rgba(255, 255, 255, 1);
    border-radius: 20px 20px 0px 0px;
    position: fixed;
    bottom: 0;
    padding: 30px 9% 44px;
    box-sizing: border-box;
    width: 100%;
    .bottom_body {
      .title_img {
        width: 18px;
        height: 18px;
        position: absolute;
        top: 34px;
        cursor: pointer; /*鼠标悬停变小手*/
        img {
          width: 100%;
          height: 100%;
        }
      }
      .body_title {
        font-size: 21px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(42, 46, 51, 1);
        margin-bottom: 6px;
        text-align: center;
      }
      .account {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(138, 143, 153, 1);
        margin-bottom: 25px;
        text-align: center;
      }
      .select_img {
        display: flex;
        justify-content: space-around;
        width: 100%;
        .select_s {
          width: 31%;
          border-radius: 6px;
          cursor: pointer; /*鼠标悬停变小手*/
          // border: 1px solid #f2f5fa;
          .s_title {
            border-radius: 6px 6px 0px 0px;
            // padding: 15px 106px 16px;
            padding: 15px 0px 16px;
            text-align: center;
            font-size: 35px;
            font-family: PingFangSC-Semibold, PingFang SC;
            color: rgba(255, 255, 255, 1);
          }
          .s1 {
            background: rgba(255, 115, 0, 1);
          }

          .s2 {
            background: rgba(101, 81, 234, 1);
          }
          .s3 {
            background: rgba(255, 90, 0, 1);
          }
        }
        .select_font {
          padding: 12px 34px 20px;
          text-align: center;
          // border: ;
          border-left: 1px solid rgba(242, 245, 250, 1);
          border-right: 1px solid rgba(242, 245, 250, 1);
          border-bottom: 1px solid rgba(242, 245, 250, 1);
          border-radius: 0px 0px 6px 6px;

          .age {
            font-size: 23px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(87, 92, 102, 1);
            line-height: 32px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .years {
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(138, 143, 153, 1);
            line-height: 20px;
          }
        }
      }
    }
  }
}
.select_btn {
  // background: rgba(255, 115, 0, 1);
  border-radius: 25px;
  padding: 12px 41px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  width: 320px;
  margin: 25px auto 0;
  cursor: pointer; /*鼠标悬停变小手*/
}
.select_button {
  // background: rgba(255, 115, 0, 1);
  border-radius: 25px;
  padding: 12px 41px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  width: 320px;
  margin: 31px auto 0;
  cursor: pointer; /*鼠标悬停变小手*/
}
.active_a {
  // border: 1px solid rgba(255, 115, 0, 1) !important;
  border-left: 1px solid rgba(255, 115, 0, 1) !important;
  border-right: 1px solid rgba(255, 115, 0, 1) !important;
  border-bottom: 1px solid rgba(255, 115, 0, 1) !important;
  border-radius: 0 0 6px 6px !important;
}
.active_b {
  // border: 1px solid rgba(101, 81, 234, 1) !important;
  border-left: 1px solid rgba(101, 81, 234, 1) !important;
  border-right: 1px solid rgba(101, 81, 234, 1) !important;
  border-bottom: 1px solid rgba(101, 81, 234, 1) !important;
  border-radius: 0 0 6px 6px !important;
}
.active_c {
  border-left: 1px solid rgba(255, 90, 0, 1) !important;
  border-right: 1px solid rgba(255, 90, 0, 1) !important;
  border-bottom: 1px solid rgba(255, 90, 0, 1) !important;

  border-radius: 0 0 6px 6px !important;
}
// 弹框1部分结束

//弹框2中间部分开始
.course {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.courseA {
  background: rgba(255, 115, 0, 1);
  border-radius: 6px;
  padding: 22px 20px;
  box-sizing: border-box;
  display: flex;
  margin-bottom: 15px;
  position: relative;
  width: 39vw;
  cursor: pointer; /*鼠标悬停变小手*/
}

.course_name {
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  // color: rgba(255, 255, 255, 1);
  margin-right: 12px;
  color: rgba(87, 92, 102, 1);
}
.active_name {
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  margin-right: 12px;
}
.name_after {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  // color: rgba(255, 255, 255, 1);
  color: #8a8f99;
  margin-top: 2px;
}
.active_after {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  margin-top: 2px;
}
.course_flex {
  display: flex;
}
.course_img {
  width: 24px;
  height: 24px;
  // margin-left: 101px;
  position: absolute;
  right: 20px;
}
.course_img img {
  width: 100%;
  height: 100%;
}
.courseB {
  border: 1px solid rgba(242, 245, 250, 1);
  border-radius: 6px;
  padding: 22px 20px;
  box-sizing: border-box;
  display: flex;
  margin-bottom: 15px;
  position: relative;
  width: 39vw;
  cursor: pointer; /*鼠标悬停变小手*/
}
//弹框2中间部分结束
</style>
