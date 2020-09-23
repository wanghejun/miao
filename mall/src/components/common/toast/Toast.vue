<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name:'Toast',
  props:{
    isShow:{
      default : false
    },
    message:{
      default:'message'
    }
  },

  methods:{
    show(message,duration){
      console.log(message)
      this.isShow = true
      this.message = message
      setTimeout(() => {
        this.isShow = false
        this.message = ''
      },duration)
      console.log(this)
    }
  }
}
</script>

<style scoped>
  .toast{
    position: fixed;
    top:50%;
    left: 50%;
    color: white;
    padding: 8px 10px;
    background: rgba(0,0,0,.75);
    transform: translate(-50%,-50%);
    z-index: 999;
  }
</style>
