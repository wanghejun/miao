<template>
  <div class="cartList">
    <Scroll class="content" ref="scroll">
      <!-- <li v-for="it in cartList" :key="it.iid">{{it}}</li> -->
      <CartListItem v-for="(it,idx) in cartList" :key="idx" :itemInfo='it'></CartListItem>
    </Scroll>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Scroll from  'components/common/scroll/Scroll'

import CartListItem from './CartListItem'


export default {
  name:'cartList',
  components:{
    Scroll,
    CartListItem
  },
  computed:{
    ...mapGetters([
      'cartList'
    ])
  },
  activated(){
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  .cartList{
    height: calc(100% - 40px - 49px - 40px);
  }
  .content{
    height: 100%;
    overflow: hidden;
  }
</style>
