<template>
  <div class="car">
    <!-- 导航 -->
    <NavBar class="navbar">
      <div slot="center">购物车({{cartLength}})</div>
    </NavBar>
    <!-- 商品列表 -->
    <CartList></CartList>
    <!-- 汇总 -->
    <CartBottomBar></CartBottomBar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './CartList'
import CartBottomBar from './CartBottomBar'

import {mapGetters} from 'vuex'


export default {
  name:'cart',
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
    ...mapGetters([
      'cartLength',
    ])
  }
}
</script>

<style scoped>
  .car{
    height: 100vh;
  }
  .navbar{
    background: var(--color-tint);
    color: white;
  }
  
</style>
