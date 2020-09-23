<template>
  <div>
    <NavBar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,idx) in titles"
          :key="item" class="title-item"
          :class="{active:idx == currentIndex}"
          @click='titleClick(idx)'>
          {{item}}
        </div>
      </div>
    </NavBar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  data(){
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  components:{
    NavBar,
  },
  methods:{
    titleClick(idx){
      this.currentIndex = idx
      this.$emit('titleClick',idx)
    },
    backClick(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .title{
    display: flex;
    font-size: 12px;
  }
  .title-item{
    flex:1
  }
  .active{
    clear: var(--color-high-text);
  }
  .back img {
    margin-top: 8px;
  }
</style>
