<template>
    <div class="tabbar-items" @click='itemClick'>
      <div v-if="!isActive"><slot name='item-icon'></slot></div>
      <div v-else><slot name='item-icon-active'></slot></div>
      <div :style="activeStyle"><slot name='item-text'></slot></div>
    </div>
</template>

<script>
export default {
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  data(){
    return {

    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods:{
    itemClick(){
      if(this.$route.path.indexOf(this.path) == -1){
        this.$router.push(this.path)
      }
      // console.log(this.$router)
      // console.log(this.path)
    }
  }
}
</script>

<style>
  .tabbar-items{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tabbar-items img{
    width: 24px;
    margin-top: 3px;
    vertical-align:middle;
    margin-bottom: 2px;
  }
  .active{
    color: red;
  }
</style>
