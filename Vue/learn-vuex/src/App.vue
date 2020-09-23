<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Count/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Count from './components/Count'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Count
  }
}
</script>

<style>

</style>
