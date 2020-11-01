
<template>
  <div class="register">
    <div class="form_container">
      <div class="manage_tip">
        <span class="title">simple后台管理系统</span>
      </div>
      <!-- <p>{{this.$store.state.name}}</p>
      <p>{{this.$store.state.age}}</p>
      <button @click="handelClick">点击</button> -->
      <el-form
        ref="registerFrom"
        :model="registerFrom"
        :rules="rules"
        label-width="80px"
        class="registerForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="registerFrom.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="registerFrom.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="email" prop="email">
          <el-input
            placeholder="请输入邮箱"
            v-model="registerFrom.email"
          ></el-input>
        </el-form-item>
        <el-form-item label="选择身份">
          <el-select v-model="registerFrom.identity" placeholder="请选择身份">
            <el-option label="管理员" value="manager"></el-option>
            <el-option label="员工" value="employee"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('registerFrom')"
            >注册</el-button
          >
          <el-button @click="toLogin">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerFrom: {
        username: "",
        password: "",
        email: "",
        identity: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 6, message: "长度在3~6个字符", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(registerFrom) {
      this.$refs[registerFrom].validate((valid) => {
        if (valid) {
          this.$axios.post("/api/register", this.registerFrom).then((res) => {
            if (res.data.flag == 1) {
              this.$message({
                message: "账号注册成功",
                type: "success",
              });
              this.$router.push("/login");
            } else {
              this.$message({
                message: "用户已经存在，请直接登录！",
                type: "warning",
              });
              this.$router.push("/login");
            }
          });
        } else {
          console.log("error submit!!");
          sessionStorage.setItem("isLogin", false);
          return false;
        }
      });
    },
    toLogin() {
      this.$router.push({
        path: "/login",
      });
    },
    // handelClick() {
    //   this.$store.commit('handelAge');
    // }
  },
};
</script>

<style lang="less" scoped>
.register {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: url(../../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
  .form_container {
    width: 400px;
    height: 315px;
    position: absolute;
    left: 34%;
    top: 20%;
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    .manage_tip {
      margin-bottom: 50px;
      margin-left: 55px;
      .title {
        font-size: 26px;
        font-weight: bold;
        color: #fff;
      }
    }
    .el-select {
      width: 100%;
    }
  }
}
</style>