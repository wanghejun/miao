<template>
      <Tabbar>
      <TabbarItem path='/home' activeColor='deepPink'>
        <img slot="item-icon" src="../assets/img/tabbar/home.svg" alt="">
        <img slot="item-icon-active" src="../assets/img/tabbar/home_active.svg" alt="">
        <div slot="item-text">首页</div>
      </TabbarItem>
      <TabbarItem path='/category' activeColor='blue'>
        <img slot="item-icon" src="../assets/img/tabbar/category.svg" alt="">
        <img slot="item-icon-active" src="../assets/img/tabbar/category_active.svg" alt="">
        <div slot="item-text">分类</div>
      </TabbarItem>
      <TabbarItem path='/cart' activeColor='pink'>
        <img slot="item-icon" src="../assets/img/tabbar/cart.svg" alt="">
        <img slot="item-icon-active" src="../assets/img/tabbar/cart_active.svg" alt="">
        <div slot="item-text">购物车</div>
      </TabbarItem>
      <TabbarItem path='/profile' activeColor='deepPink'>
        <img slot="item-icon" src="../assets/img/tabbar/profile.svg" alt="">
        <img slot="item-icon-active" src="../assets/img/tabbar/profile_active.svg" alt="">
        <div slot="item-text">我的</div>
      </TabbarItem>
    </Tabbar>
</template>

<script>
  import Tabbar from './tabbar/TabBar'
  import TabbarItem from './tabbar/TabBarItem'
  export default {
    components:{
      Tabbar,
      TabbarItem,
    }
  }
</script>

<style>

</style>
