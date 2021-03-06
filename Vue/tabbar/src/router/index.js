import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [{
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:() => import('../views/home/Home')
  },
  {
    path:'/cart',
    component:() => import('../views/cart/Cart')

  },
  {
    path:'/category',
    component:() => import('../views/category/CateGory')

  },{
    path:'/profile',
    component:() => import('../views/profile/ProFile')

  },
]

const router =  new VueRouter({
  routes,
  mode:'history'
})

export default router
