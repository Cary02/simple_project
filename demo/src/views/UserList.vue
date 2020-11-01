<template>
  <div class="userList">
    <el-table :data="tableData" style="width: 100%" border max-height="393">
      <el-table-column label="序号" type="index" width="180"> </el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="email" label="email"></el-table-column>
      <el-table-column prop="identity" label="身份信息" width="325"></el-table-column>
    </el-table>
    <div class="pagination">
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
  </div>
</template>
<script>
export default {
  name: "userList",
  data() {
    return {
      tableData: [],
      allTableData: [],
      paginations:{
          page_size:5,
          page_index:1,
          total:0,
          page_sizes:[5,10,15,20],
          layout:'total,sizes,prev,pager,next,jumper'
      }
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.$axios.get("/api/getUserAll").then((res) => {
        let data = res.data;
        this.tableData = data;
        this.allTableData = data;
        this.setPagination();
      });
    },
    setPagination(){
        this.paginations.total = this.allTableData.length;
        this.paginations.page_index= 1;
        this.paginations.page_size = 5;
        this.tableData= this.allTableData.filter((item,index)=>{
            return index<this.paginations.page_size;
        })
    },
    handleSizeChange(page_size){
        this.paginations.page_size = page_size;
        this.paginations.page_index = 1;
        this.tableData = this.allTableData.filter((item,index)=>{
            return index < page_size;
        })
    },
    handleCurrentChange(page_index){
        let beforeNum = this.paginations.page_size *(page_index -1);
        let table = this.allTableData.filter((item,index)=>{
            return index>=beforeNum;
        })
        this.tableData = table.filter((item,index)=>{
            return index<this.paginations.page_size;   
        })
    }
  },
};
</script>
<style lang="less" scoped>
.userList {
  padding: 20px;
  .pagination {
      margin-top: 20px;
      text-align:center;
  }
}
</style>
<style>
.el-table--border::after, .el-table--group::after {
    width :0;
}
</style>
