
<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">simple后台管理系统</span>
      </div>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="rules"
        label-width="80px"
        class="loginForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="loginForm.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="submit_btn"
            @click="submitForm('loginForm')"
            >登录</el-button
          >
          <el-button @click="toRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
export default {
  
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 6, message: "长度在3~6个字符", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          this.$axios.post("/api/login", this.loginForm).then((res) => {
            // console.log("res:", res);
            if (res.status == 200) {
              // 存储token到localstorage中
              const { token } = res.data;
              let userinfo = jwt_decode(token);
              localStorage.setItem("userinfo",JSON.stringify(userinfo));
              localStorage.setItem("eleToken", token);
              this.$router.push("/index");
            }
          });
        } else {
          console.log("error submit!!");
          sessionStorage.setItem("isLogin", false);
          return false;
        }
      });
    },
    toRegister() {
      this.$router.push({
        path: "/register",
      });
    },
    // handelClick() {
    //   this.$store.commit('handelAge');
    // }
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: url(../../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
  .form_container {
    width: 400px;
    height: 210px;
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
    .loginFrom {
      margin-top: 20px;
      background-color: #fff;
      padding: 20px 40px 20px 20px;
      border-radius: 5px;
      box-shadow: 0px 5px 10px #ccc;
    }
  }
}
</style>