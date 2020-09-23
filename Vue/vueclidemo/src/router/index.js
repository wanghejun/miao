import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/link',
    name: 'link',
    component:() => import(/* webpackChunkName: "about" */ '../views/Links.vue')
  },
  {
    path: '/shop',
    name: 'shop',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Shop.vue'),
    children:[
    //   {
    //   path:'',
    //   redirect:'new'
    // },
    {
      path:'new',
      component:() => import('../views/Home-new.vue')
    },{
      path:'message',
      component:() => import('../views/Home-message.vue')
    }]
  },
  {
    path: '/user/:id',
    name: 'user',
    component:() => import(/* webpackChunkName: "about" */ '../views/User.vue')
  },
]

const router = new VueRouter({
  routes,//必须传入routes配置对象
  mode:'history',//默认使用的#hash模式，这里可以设置为history的pushState模式
  linkActiveClass:'active'//活跃组件的类名
})

router.beforeEach((to,from,next) => {
  document.title = to.matched[0].name
  next()//必须调用下一步
})

export default router
