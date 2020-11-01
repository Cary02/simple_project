<template>
  <div class="foundList">
    <div class="top_container">
      <el-form :inline="true" :model="serach_date" :ref="serach_date">
        <el-form-item label="按时间筛选:">
          <el-date-picker
            v-model="serach_date.startTime"
            type="date"
            placeholder="选择开始时间"
          >
          </el-date-picker
          >--
          <el-date-picker
            v-model="serach_date.endTime"
            type="date"
            placeholder="选择结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onScreenTime"
            >筛选</el-button
          >
        </el-form-item>
        <el-form-item class="add_btn">
          <el-button type="primary" size="small" @click="handelDialog"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="main_container">
      <el-table :data="tableData" border style="width: 100%" max-height="327">
        <el-table-column type="index" label="序号" width="60" align="center">
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建时间"
          width="245"
          align="center"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="收支类型"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="descript"
          label="收支描述"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="income" label="收入" width="173" align="center">
          <template slot-scope="scope">
            <span style="color: #00d053">{{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expend" label="支出" width="170" align="center">
          <template slot-scope="scope">
            <span style="color: #f56767">{{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="cash"
          label="账户现金"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="180" align="center">
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作"
          width="188"
          align="center"
          ><template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="24">
          <div class="pagination_container">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="paginations.page_index"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total"
            >
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 弹框界面 -->
    <Dialog
      :dialog="dialog"
      :formData="formData"
      @updateData="getProfile"
    ></Dialog>
  </div>
</template>

<script>
import Dialog from "../components/Dialog/Dialog.vue";
export default {
  data() {
    return {
      paginations: {
        page_index: 1,
        total: 0,
        page_size: 5,
        page_sizes: [5, 10, 15, 20],
        layout: "total,sizes,prev,pager,next,jumper",
      },

      serach_date: {
        startTime: "",
        endTime: "",
      },
      tableData: [], //页面显示的数据
      allTableData: [], //所有数据
      filterTableData: [], //按时间筛选的数据
      formData: {
        type: "",
        descript: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: "",
      },
      dialog: {
        show: false,
        title: "添加信息",
        option: "edit",
      },
    };
  },
  created() {
    this.getProfile();
  },
  components: {
    Dialog,
  },
  methods: {
    // 获取proFile表格列表
    getProfile() {
      this.$axios.get("/api/searchAll").then((res) => {
        if (res.status == 200) {
          this.allTableData = res.data;
          this.filterTableData = res.data;
          //设置分页数据
          this.setPagination();
        }
      });
    },
    setPagination() {
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      this.paginations.total = this.allTableData.length;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    // 一页显示的条数改变,需要重新设置tableData的数据，当前页还是第一页
    handleSizeChange(page_size) {
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    // 当前页的下标改变
    handleCurrentChange(page) {
      // befornum当前页之前的页面显示的数据数量
      let befornum = this.paginations.page_size * (page - 1);
      let table = this.allTableData.filter((item, index) => {
        return index >= befornum;
      });
      // 再设置当前页面显示的数据
      this.tableData = table.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    // 按时间筛选
    onScreenTime() {
      // 判断有没有选择时间就筛选
      if (!this.serach_date.startTime || !this.serach_date.endTime) {
        this.$message({
          type: "warning",
          message: "请选择时间",
        });
        // 如果没选择时间直接请求所有
        this.getProfile();
        return;
      }
      let sTime = this.serach_date.startTime.getTime();
      let eTime = this.serach_date.endTime.getTime();
      this.allTableData = this.filterTableData.filter((item, index) => {
        const date = new Date(item.date);
        const dTime = date.getTime();
        return dTime >= sTime && dTime <= eTime;
      });
    //   调用分页数据
    this.setPagination();
    },
    // 添加profile
    handelDialog() {
      this.dialog = {
        show: true,
        title: "添加信息",
        option: "add",
      };
      this.formData = {
        type: "",
        descript: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: "",
      };
    },
    // 编辑
    handleEdit(index, row) {
      this.formData = {
        type: row.type,
        descript: row.descript,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row.id,
      };
      this.dialog = {
        show: true,
        title: "编辑信息",
        option: "edit",
      };
    },
    handleDelete(index, row) {
      this.$axios.post(`/api/delProfile/${row.id}`).then((res) => {
        const data = res.data;
        if (data.resCode == 1) {
          this.$message({
            message: data.message,
            type: "success",
          });
          this.getProfile();
        } else if (data.resCode == 0) {
          this.$message({
            message: data.message,
            type: "warning",
          });
        } else {
          this.$message.error(data.message);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.foundList {
  height: 100%;
  padding: 20px 20px 0 20px;
  .top_container {
    .add_btn {
      float: right;
    }
  }
  .pagination_container {
    text-align: right;
    margin-top: 15px;
  }
}
</style>
<style>
.el-table--border::after,
.el-table--group::after {
  width: 0;
}
.el-table::before {
  width: 0;
}
</style>