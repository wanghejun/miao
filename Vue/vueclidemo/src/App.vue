<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about" replace tag="button">About</router-link> |
      <router-link to="/link" replace tag="button">link</router-link> |
      <router-link to="/shop" replace tag="button">shop</router-link> |
      <router-link :to="'/user/'+userId" replace tag="button">user</router-link> 
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        userId:'zhangsan'
      }
    }

  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.active{
  color: violet !important;
}
</style>
