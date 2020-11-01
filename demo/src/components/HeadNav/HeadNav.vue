<template>
  <div class="nav_container">
    <el-row>
      <el-col :span="12" class="logo_container">
        <img src="../../assets/logo.png" alt="logo图标" class="logo" />
        <span class="title">simple后台管理系统</span>
      </el-col>
      <el-col :span="12">
        <div class="userInfo">
          <!-- <i class="el-icon-user-solid iconImg"></i> -->
          <el-avatar
            :size="50"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            class="avatar"
          ></el-avatar>
          <span>欢迎</span>
          <span style="color:blue">{{ userinfo.username }}</span>
          <template>
            <el-dropdown @command="handelCommand" trigger="click">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right iconColor"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出登陆</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userinfo: {},
    };
  },
  components: {},
  created() {
    this.getuserinfo();
  },
  methods: {
    getuserinfo() {
      let user = JSON.parse(localStorage.getItem("userinfo"));
      this.userinfo = user;
    },
    handelCommand(command) {
      if (!command) {
        this.$message("菜单选择缺少commamd属性");
        return;
      }
      switch (command) {
        case "info":
          this.showInfo();
          break;

        case "logout":
          this.logout();
          break;
      }
    },
    showInfo() {
      this.$router.push("/info");
    },
    logout() {
      localStorage.removeItem("eleToken");
      localStorage.removeItem("userinfo");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less" scoped>
.nav_container {
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  padding-left: 20px;
  background-color: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
  .logo_container {
    line-height: 60px;
    min-width: 400px;
    .logo {
      width: 50px;
      height: 50px;
      display: inline-block;
      vertical-align: middle;
    }
    .title {
      vertical-align: middle;
      margin-left: 20px;
      font-size: 24px;
    }
  }
  .userInfo {
    box-sizing: border-box;
    text-align: right;
    line-height: 60px;
    font-size: 16px;
    padding-right: 25px;
    span {
      vertical-align: middle;
    }
    span:nth-of-type(2) {
      padding: 0 10px;
    }
    .iconColor {
      color: #fff;
    }
  }
}
</style>