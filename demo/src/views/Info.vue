<template>
  <div class="info">
    <el-row class="row-bg" type="flex" justify="center">
      <el-col :span="9">
        <div class="left_container">
          <img src="../assets/logo.png" alt="" class="avatarImg" />
        </div>
      </el-col>
      <el-col :span="15">
        <div class="right_container">
          <div class="user_item">
            <i class="el-icon-user-solid"></i>
            <span>{{ userinfo.username }}</span>
          </div>

          <div class="user_item">
            <i class="el-icon-s-promotion"></i>
            <span>{{ userinfo.email }}</span>
          </div>
          <div class="user_item">
            <i class="el-icon-s-tools"></i>
            <span>{{ userinfo.identity }}</span>
          </div>
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
  },
};
</script>
<style lang="less" scoped>
.info {
  width: 100%;
  height: 100%;
  .row-bg {
    width: 100%;
    height: 100%;
    .left_container {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .avatarImg {
        width: 200px;
      }
    }
    .right_container {
      box-sizing: border-box;
      height: 100%;
      padding-top: 35%;
      padding-left: 20px;
      font-size: 24px;
      background-color: #eee;
      .user_item {
        height: 50px;
        span {
          padding-left: 20px;
        }
      }
    }
  }
}
</style>