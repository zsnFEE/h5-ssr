<template>
  <div class="details">
    <div class="detailtitle" :class="detailstyle == 2 ? 'detailtitle2' : ''">
      <table :class="detailstyle == 2 ? 'tablestyle' : ''">
        <tr class="title" :class="detailstyle == 2 ? 'titledetial' : ''">
          <td v-for="item in detailtitle" :key="item.id">
            {{ item.name }}
          </td>
        </tr>
        <tr
          class="studentlist"
          v-for="(item, index) in list"
          :key="index"
          :class="
            index == 0 && detailstyle == 1
              ? 'firststudent'
              : index == 0 && detailstyle == 2
              ? 'secondstudent'
              : ''
          "
        >
          <td
            v-for="items in detailtitle"
            :key="items.id"
            :class="
              item.result === '错误' &&
              (items.id === 'answer' || items.id === 'result')
                ? 'error'
                : ''
            "
          >
            {{ item[items.id] }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: ["detailstyle", "list"],
  data() {
    return {
      detailtitle: [
        { id: "nickname", name: "学生" },
        { id: "time", name: "用时" },
        { id: "answer", name: "选项" },
        { id: "result", name: "结果" }
      ]
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.details {
  // width: calc(100vw - 60px);
  margin: auto;
}
.detailtitle {
  width: 100%;
  margin: 0px auto;
  padding-bottom: 16px;
  // display: flex;
  justify-content: space-around;
  flex-direction: column;
  overflow: auto;
  max-height: calc(100vh - 150px);
}
.detailtitle2 {
  // max-height: 100vh;
  max-height: calc(100vh - 72px);
}
table {
  margin: 20px auto 16px;
  max-height: calc(100vh - 180px);
  overflow: auto;
  background: #1e1e1f;
}
.tablestyle {
  margin: 60px auto 16px;
  // max-height: calc(100vh - 165px);
}
::-webkit-scrollbar {
  display: none;
}
.detailtitle .title {
  font-size: 12px;
  font-weight: 400;
  color: #9b9b9b;
  margin: auto;
  position: fixed;
  top: 60px;
  left: 0px;
  right: 0px;
  background: #1e1e1f;
  padding-top: 20px;
  width: 268px;
}
.detailtitle .titledetial {
  font-size: 12px;
  font-weight: 400;
  color: #9b9b9b;
  margin: auto;
  position: fixed;
  top: 30px;
  left: 0px;
  right: 0px;
  background: #1e1e1f;
  // padding-top: 20px;
  width: 268px;
}
.studentlist {
  font-size: 12px;
  font-weight: 400;
  color: #ffffff;
  margin: auto;
}
.studentlist td {
  padding-top: 16px;
}
.firststudent td {
  padding-top: 54px;
}
.secondstudent td {
  // padding-top: 75px;
  padding-top: 0px;
}
.title td {
  padding-top: 16px;
  background: #1e1e1f;
}
tr td:first-child {
  width: 110px;
}
tr td:nth-child(2) {
  width: 37px;
  text-align: center;
}
tr td:nth-child(3) {
  width: 81px;
  text-align: center;
}
tr td:nth-child(4) {
  width: 30px;
  text-align: center;
}
.error {
  font-size: 12px;
  font-weight: 400;
  color: #f74a4a;
}
</style>
