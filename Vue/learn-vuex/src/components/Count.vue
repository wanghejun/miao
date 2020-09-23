<template>
  <div>
    <button @click="decAdd">-</button>
      <span>{{$store.state.count}}</span>
    <button @click="incAdd">+</button>
  </div>
</template>

<script>
export default {
  methods:{
    decAdd(){
      this.$store.commit('dec')
    },
    incAdd(){
      this.$store.commit('inc')
    }
  }
}
</script>

<style>

</style>
