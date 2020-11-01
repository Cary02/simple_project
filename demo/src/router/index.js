import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Index',
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../views/Index.vue'),
    children:[
      {
        path:"" ,
        name:'home',
        component: ()=>import('../views/Home.vue')
      },
      {
        path:"/home" ,
        name:'home',
        component: ()=>import('../views/Home.vue')
      },
      {
        path:'/info',
        name:'info',
        component: ()=> import('../views/Info.vue')
      },
      {
        path:'/foundList',
        name:'foundList',
        component: ()=>import('../views/FoundList.vue')
      },
      {
        path:'/userList',
        name:'userList',
        component: ()=>import('../views/UserList.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/login/login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/register/register.vue')
  },
  
  {
    path: '/*',
    name: 'notfound',
    component: () => import('../views/404.vue')
  },

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  let isLogin = localStorage.eleToken ? true : false;
  if (to.path == '/login' || to.path == '/register') {
    next();
  } else {
    isLogin ? next() : next('/login')
  }
});

export default router
