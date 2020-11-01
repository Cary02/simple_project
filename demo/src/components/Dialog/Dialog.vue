<template>
  <div class="dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :modal-append-to-body="false"
    >
      <el-form
        ref="form"
        label-width="120px"
        style="margin: 10px; width: auto"
        :rules="form_rules"
        :model="formData"
      >
        <el-form-item label="收支类型:">
          <el-select v-model="formData.type" placeholder="收支类型">
            <el-option
              v-for="(typeItem, index) in type_list"
              :key="index"
              :label="typeItem"
              :value="typeItem"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收支描述:" prop="descript">
          <el-input
            v-model="formData.descript"
            placeholder="请输入收支描述"
          ></el-input>
        </el-form-item>
        <el-form-item label="收入:" prop="income">
          <el-input
            v-model="formData.income"
            placeholder="请输入收入"
          ></el-input>
        </el-form-item>
        <el-form-item label="支出:" prop="expend">
          <el-input
          v-model="formData.expend" placeholder="请输入支出"> </el-input>
        </el-form-item>
        <el-form-item label="账户现金:" prop="cash">
            <el-input v-model="formData.cash" placeholder="请输入账户现金"></el-input>
        </el-form-item>
        <el-form-item label='备注:' prop="remark">
            <el-input v-model="formData.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item class="btn_style">
            <el-button @click="dialog.show = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dialog",
  props: {
    dialog: Object,
    formData: Object
  },
  data() {
    return {
      type_list: ["提现", "充值", "优惠券", "转账", "充值礼券"],
      form_rules: {
        descript: [
          {
            required: true,
            message: "描述不能为空！",
            trigger: "blur",
          },
        ],
        income: [
          {
            required: true,
            message: "收入不能为空！",
            trigger: "blur",
          },
        ],
        expend: [
          {
            required: true,
            message: "支出不能为空！",
            trigger: "blur",
          },
        ],
        cash: [
          {
            required: true,
            message: "账户金额不能为空！",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods:{
      onSubmit(form){
          this.$refs[form].validate(valid=>{
              if(valid) {
                  const url = this.dialog.option == 'add'? 'add' : `edit/${this.formData.id}`
                  this.$axios.post(`/api/${url}`,this.formData).then(res=>{
                      const data = res.data;
                      if(data.resCode == 0) {
                          this.$message({
                              message:data.message,
                              type:'warning'
                          })
                          this.dialog.show = false;
                      }else if(data.resCode == 1) {
                          this.$message({
                              message:data.message,
                              type:'success'
                          })
                          this.dialog.show = false;
                          this.$emit("updateData")
                      }else {
                          this.$message.error(data.msessage);
                          this.dialog.show = false;
                      }
                  })
              }
          })
      }
  }
};
</script>

<style lang="less" scoped>
</style>