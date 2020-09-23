<template>
  <div>
    <h2>我是shop组件</h2>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit sapiente corporis soluta illo possimus, nemo odit nesciunt, quas deserunt repellat cupiditate expedita ut laborum ratione necessitatibus quisquam eveniet dolorum. Officiis?</p>
    <router-link to="/shop/new">new</router-link>|
    <router-link to="/shop/message">message</router-link>

    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
export default {
  data(){
    return {
      path:'/shop/new'
    }
  },
  methods:{
    
  },
  // activated(){
  //     console.log(this.$router)
  //     this.$router.push(this.path)
  // },

  // beforeRouteLeave(to,from,next){
  //   console.log(this.$router.path)
  //   this.path = this.$router.path
  //   next()
  // }
}
</script>

<style>

</style>
