<template>
  <div>
    <h2>{{message}}</h2>
    <button @click="dec">-</button>
    <span>{{count}}</span>
    <button @click="inc">+</button>
    <Cpn></Cpn>
  </div>
</template>

<script>
import Cpn from './cpn'
export default {
  name:'App',
  data(){//组件里面的data必须是一个函数，再返回一个对象
    return{
      message:'Vue webpack',
      count:0,
    }
  },
  methods:{
    dec(){
      this.count--
    },
    inc(){
      this.count++
    }
  },
  components:{
    Cpn,
  }
}
</script>

<style lang="sass" scoped>

</style>
