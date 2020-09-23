<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key='item' class="tab-control-item" :class="{active:index == currentIndex}" @click='itemClick(index)'>
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabControl',
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      currentIndex:0
    }
  },
  methods:{
    itemClick(idx){
      this.currentIndex = idx
      this.$emit('tabClick',idx)
    }
  }
}
</script>

<style>
.tab-control{
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
}
.tab-control-item > span{
  padding: 5px;
}
.tab-control-item{
  flex: 1;
}
.active{
  color: var(--color-high-text);
}
.active > span{
  border-bottom: 3px solid var(--color-high-text);
}
</style>
