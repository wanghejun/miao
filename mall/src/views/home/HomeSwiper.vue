<template>
  <div>
    <Swiper :animDuration='500'>
      <SwiperItem v-for="item in banners" :key='item.link'>
        <a :href="item.link">
          <img :src="item.image" :alt="item.title" @load="imgLoad">
        </a>
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name:'HomeSwiper',
  props:['banners'],
  data(){
    return {
      isLoad:true
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    imgLoad(){
      if(this.isLoad){
        this.$emit('swiperImgLoad')
        this.isLoad = false
      }
    }
  }
}
</script>

<style scoped>

</style>
