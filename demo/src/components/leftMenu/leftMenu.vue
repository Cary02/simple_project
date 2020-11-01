<template>
  <el-row class="menu_container">
    <el-col>
      <el-menu
        mode="vertical"
        class="el-menu-vertical-demo"
        background-color="#324057"
        text-color="#fff"
        active-text-color="#ffd04b"
        default-active="0"
      >
        <router-link to="/home">
          <el-menu-item index="0">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>

        <router-link to="/userList">
          <el-menu-item index="1">
            <span slot="title">用户信息</span>
          </el-menu-item>
        </router-link>

        <template v-for="item in items">
          <el-submenu v-if="item.children" :index="item.path" :key="item.path">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <router-link
              v-for="(citem, cindex) in item.children"
              :to="citem.path"
              :key="cindex"
            >
              <el-menu-item :index="citem.path">
                <span slot="title">{{ citem.name }}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: "el-icon-bank-card",
          name: "资金管理",
          path: "foundList",
          children: [{ name: "资金流水", path: "foundlist" }],
        },
        {
          icon: "el-icon-postcard",
          name: "信息管理",
          path: "info",
          children: [{ name: "个人信息", path: "info" }],
        },
      ],
    };
  },
  componennts: {},
  methods: {},
};
</script>

<style lang="less" scoped>
.menu_container {
  position: absolute;
  top: -2px;
  // left: 0;
  min-height: 100%;
  width: 200px;
  background-color: #324057;
  .el-menu-vertical-demo {
    height: 100%;
    border: none;
    a {
      text-decoration: none;
    }
  }
}
</style>