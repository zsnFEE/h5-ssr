<template>
  <div class="evaluate">
    <div class="bgpc" style="background: #f2f5fa;"></div>
    <div class="evaluatebox">
      <!--循环列表部分开始-->
      <div class="standardList" v-for="(item, index) in list" :key="index">
        <div class="infoBox">
          <img class="headimg" :src="item.member.headimgurl" />
          <div class="nameBox">
            <div class="name">{{ item.member.nickname }}1</div>
            <div class="progress">课程进度{{ item.progress }}</div>
          </div>
        </div>
        <div>
          <button
            v-if="item.is_evaluate == 0"
            class="standardBtn cursor"
            @click="toSubmit(item.id)"
          >
            评价
          </button>
          <button
            v-else
            class="standardAmendbtn cursor"
            @click="toSubmit(item.id)"
          >
            修改评价
          </button>
        </div>
      </div>
      <!--循环列表部分结束-->
    </div>
  </div>
</template>
<script>
import { getEvaluatelist } from "../../api/common";

export default {
  data() {
    return {
      list: []
    };
  },
  mounted() {
    getEvaluatelist({
      schedule_id:
        this.$route.query.lesson_id || localStorage.getItem("lesson_id")
    }).then(res => {
      if (res.code == 0) {
        this.list = res.data;
      } else {
        this.$toast(res.msg || res.message);
      }
    });
  },
  methods: {
    //去评价页面
    toSubmit(id) {
      this.$router.push({
        path: "/pc/Submit",
        //传递报告id过去
        query: { report_id: id }
      });
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.evaluate {
  width: 100%;
  height: 100%;
  background: #f2f5fa;
  // padding: 3.8% 2.7% 3.8% 4.5%;
  padding: 10px 10px 40px;
  box-sizing: border-box;
  gap: 20px;

  .standardList {
    padding: 16px;
    width: calc(50% - 20px);
    box-sizing: border-box;
    background: #ffffff;
    display: flex;
    flex-direction: row;
    // justify-content: center;
    align-items: center;
    border-radius: 4px;
    margin: 10px;
    justify-content: space-between;
    .infoBox {
      display: flex;
      flex-direction: row;

      .headimg {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      .nameBox {
        margin-left: 10px;
        .name {
          margin-top: 13px;
          font-size: 16px;
          font-weight: bold;
          color: #333333;
          line-height: 22px;
        }
        .progress {
          font-size: 12px;
          font-weight: 400;
          color: #999999;
          line-height: 17px;
          margin-top: 6px;
          margin-bottom: 0px;
        }
      }
    }
    .standardBtn {
      width: 80px;
      height: 28px;
      background: #3dc17d;
      box-shadow: 0px -1px 0px 0px rgba(255, 255, 255, 0.15);
      border-radius: 4px;
      font-size: 13px;
      font-weight: 500;
      color: #ffffff;
      line-height: 18px;
      border: 0px;
      box-sizing: border-box;
    }
    .standardAmendbtn {
      width: 80px;
      height: 28px;
      box-shadow: 0px -1px 0px 0px rgba(255, 255, 255, 0.15);
      border-radius: 4px;
      border: 1px solid #6a8376;
      font-size: 13px;
      font-weight: 500;
      color: #6a8376;
      line-height: 18px;
      background: unset;
      box-sizing: border-box;
    }
  }

  .list {
    background: #ffffff;
    border-radius: 8px;
    // padding: 2.4% 5.7%;
    // box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 24px;
    margin-bottom: 24px;
    // min-height: 195px;

    .headimg {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-bottom: 6px;
    }

    @media (max-width: 880px) {
      width: 182px;
      height: 182px;
      // padding: 15px 51px;
    }
    @media (min-width: 880px) {
      width: calc(calc(100vw - 56px) * 0.25 - 26px);
      height: calc(calc(100vw - 56px) * 0.25 - 26px);
      // padding: 15px 51px;
    }
    @media (min-width: 1086px) {
      width: calc(calc(100vw - 56px) * 0.2 - 26px);
      height: calc(calc(100vw - 56px) * 0.2 - 26px);
      // padding: 15px 51px;
    }
    @media (min-width: 1292px) {
      width: calc(calc(100vw - 56px) * 0.1666 - 26px);
      height: calc(calc(100vw - 56px) * 0.1666 - 26px);
      // padding: 15px 51px;
    }
    @media (min-width: 1498px) {
      width: calc(calc(100vw - 56px) * 0.1428 - 26px);
      height: calc(calc(100vw - 56px) * 0.1428 - 26px);
      // padding: 15px 51px;
    }
    @media (min-width: 1704px) {
      width: calc(calc(100vw - 56px) * 0.125 - 26px);
      height: calc(calc(100vw - 56px) * 0.125 - 26px);
      // padding: 15px 51px;
    }
  }
  .amendbtn {
    width: 90px;
    border-radius: 20px;
    border: 2px solid #8a8f99;
    font-size: 13px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #8a8f99;
    text-align: center;
    // box-sizing: border-box;
    height: 28px;
    line-height: 28px;
    // display: flex;
    // justify-content: center;
    // align-items: center;
  }
}
.evaluatebox {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
}

.name {
  max-width: 50px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #000000;
  margin-bottom: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 50px;
}
.progress {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #828a99;
  margin-bottom: 18px;
}
.btn {
  width: 80px;
  background: linear-gradient(132deg, #ffd500 0%, #ffbf00 100%);
  box-shadow: 0px -1px 0px 0px rgba(255, 255, 255, 0.15);
  border-radius: 14px;
  font-size: 13px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #292d33;
  text-align: center;
  padding: 5px 26px;
}
</style>
