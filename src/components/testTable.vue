<template>
  <div class="table">
    <el-table
      ref="tstTable"
      :data="tdlist"
      style="width: 100%"
      height="500"
      :border="false"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        v-for="item in theadlist"
        :key="item.id"
        :property="item.id"
        :label="item.name"
        style="background:#1e1e1f;"
        min-width="100"
      >
        <template slot-scope="scope">
          <span v-if="typeof scope.row[scope.column.property] != 'object'">
            {{
              scope.row[scope.column.property]
                ? `${scope.row[scope.column.property]}`
                : "-"
            }}
          </span>
          <span
            v-else
            :class="{
              is_right: scope.row[scope.column.property].is_right == 0
            }"
          >
            {{ scope.row[scope.column.property].answer }}
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { answerstats } from "../api/common";

export default {
  name: "testTable",
  components: {},
  props: ["tdlist", "theadlist", "tid"],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    scrollTable() {
      requestAnimationFrame(() => {
        this.$refs.tstTable.bodyWrapper.scrollTop = this.tid * 47;
      });
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.topic_num) {
        let tid = this.tid * 1 + 1;
        if (row.topic_num == tid) {
          return "success-row";
        } else {
          return "";
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .el-table .el-table__row td:first-child {
  color: #9b9b9b;
}
/deep/ .el-table .el-table__row td {
  color: #fff;
}
/deep/ .el-table .success-row > td {
  background: #494a4d !important;
}
/deep/.el-table td,
/deep/.el-table th.is-leaf {
  border: 0;
  background-color: #1e1e1f;
}

/deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
  background: #1e1e1f;
}
/deep/ .el-table ::-webkit-scrollbar-corner {
  background: rgba(0, 0, 0, 0);
}
/deep/.el-table td.gutter,
/deep/ .el-table th.gutter {
  background-color: #1e1e1f;
  background: #1e1e1f;
}

/deep/.el-table {
  .hover-row {
    background: #494a4d;
  }
  .cell {
    .is_right {
      color: rgba(247, 74, 74, 1);
    }
  }
  .el-table__row {
    border-radius: 4px;
    td {
      border: none;
      outline: none;
    }
    &:hover {
      background: #494a4d;
      border-radius: 6px;
      /deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
        color: #494a4d;
        background-color: #494a4d;
      }
    }
  }
}
/deep/.el-table tr {
  border: 0;
  background: #1e1e1f;
}
/deep/ .el-table--border,
.el-table--group {
  border: 0;
  background: #1e1e1f;
}
/deep/.el-table {
  background: #1e1e1f;
}

/deep/ .el-table__fixed-right::before,
/deep/.el-table__fixed::before {
  background-color: #1e1e1f;
}
/deep/ .el-table::before {
  background-color: #1e1e1f;
}
/deep/.el-table--border::after,
/deep/.el-table--group::after,
/deep/ .el-table::before {
  background-color: #1e1e1f;
}

/deep/ ::-webkit-scrollbar-track {
  background: #1e1e1f;
}
.tidstyle {
  background: #494a4d !important;
}
// /deep/ .el-table th > .cell {
//   text-align: center;
// }
/deep/ .el-table .cell {
  text-align: center;
}
</style>
