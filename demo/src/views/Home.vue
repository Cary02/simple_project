<template>
  <div class="home">
      <div class="container">
          <h1 class="title">simple后台管理系统</h1>
          <p class="detail">构成我们学习的最大障碍是已知的东西，而不是未知的东西。加油吧，少年！！！！</p>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            msg:"欢迎来到我的首页！！！"
        }
    },
    components:{
    },
    methods: {
      
    }
};
</script>

<style lang="less" scoped>
   .home {
       width: 100%;
       height: 100%;
       background: url(../assets/home.png) no-repeat center center;
       background-size: 100% 100%;
       .container {
           box-sizing: border-box;
           width: 100%;
           height: 100%;
           background-color: rgba(0, 0, 0, 0.7);
           text-align: center;
           color: #fff;
           padding-top: 200px;
           .title {
               font-size: 30px;
           }
           .detail {
               font-size: 22px;
               margin-top: 50px;
           }
       }
   } 
</style>