<template>
  <div class="home">
    <el-row>
      <HeadNav></HeadNav>
    </el-row>
    <el-row>
      <div class="container">
        <LeftMenu></LeftMenu>
        <div class="rightContainer">
          <router-view></router-view>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import HeadNav from "../components/HeadNav/HeadNav";
import LeftMenu from "../components/leftMenu/leftMenu";
export default {
  data() {
    return {
      
    };
  },
  components: {
    HeadNav,
    LeftMenu,
  },
  methods: {
    
  },
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}
.container {
  height: calc(100vh - 62px);
}
.home .rightContainer {
  position: relative;
  top: -2px;
  left: 200px;
  width: calc(100% - 200px);
  height: calc(100vh - 62px);
  overflow: hidden;
}
</style>