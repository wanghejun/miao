<template>
  <div id="home">
      <NavBar class="home-nav">
          <div slot="center">购物街</div>
      </NavBar>
      <TabControl class="tab-control" :titles="['流行','新款','精选']" @tabClick='tabClick' ref="tabControl1" v-show="isTabFlxed"></TabControl>

      <Scroll class="content" 
              ref="scroll" 
              :probe-type='3' 
              @scroll="contentscroll" 
              :pull-up-load='true'
              @pullingUp='loadMore'>
        <Swiper :banners='banners' @swiperImgLoad="swiperImgLoad"></Swiper>
        <HomeRecommenView :recommends='recommends'></HomeRecommenView>
        <HomeFeatureView></HomeFeatureView>
        <TabControl :titles="['流行','新款','精选']" @tabClick='tabClick' ref="tabControl2"></TabControl>
        <GoodsList :goods="showGoods" />
      </Scroll>

      <BackTop  @click.native='backClick' v-show="isShowBackTop"/>
  </div>
</template>

<script>
//单组件
import Swiper from './HomeSwiper'
import HomeRecommenView from './HomeRecommenView'
import HomeFeatureView from './HomeFeatureView'
//公共组件
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from  'components/common/scroll/Scroll'
import BackTop from  'components/common/backTop/BackTop'
import {deboundce} from 'components/common/utils.js'
//网络请求
import {
  getHomeMultidata,
  getHomeGoods
  } from 'network/home.js'

export default {
  components:{
    NavBar,
    Swiper,
    HomeRecommenView,
    HomeFeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data(){
    return {
      banners : [],
      recommends :[],
      goods:{
        pop:{page:0,list:[]},
        new:{page:0,list:[]},
        sell:{page:0,list:[]},
      },
      currenType:'pop',
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFlxed:false
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currenType].list
    }
  },
  created(){//创建时发送数据请求
    this.getHomeMultidatas(),//轮播图的数据

    this.getHomeGoodss('pop')//流行商品数据
    this.getHomeGoodss('new')//新款商品数据
    this.getHomeGoodss('sell')//精选商品数据
  },
  mounted(){
    //监听图片加载完成
    let refresh = deboundce(this.$refs.scroll.refresh,50)
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })
  },
  methods:{
    //事件相关方法

    tabClick(idx){
      switch(idx) {
        case 0:
          this.currenType = 'pop'
          break
        case 1:
          this.currenType = 'new'
          break
        case 2:
          this.currenType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = idx
      this.$refs.tabControl2.currentIndex = idx
    },
    backClick(){//返回顶部事件
      this.$refs.scroll.scrollTo(0,0,500)
    },
    //顶部返回按钮显示事件
    contentscroll(position){
      //判断返回顶部按钮是否显示
      this.isShowBackTop = (-position.y) > 1000

      //判断tabControl是否吸顶
      this.isTabFlxed = (-position.y) > this.tabOffsetTop
    },
    //加载更多
    loadMore(){
      this.getHomeGoodss(this.currenType)
    },
    swiperImgLoad(){
      //获取tabtop的高度
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    //网络相关方法
    getHomeMultidatas(){
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
      })
    }
    ,
    getHomeGoodss(type){
      let page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          //下拉加载完成，启用下一次加载准备
          this.$refs.scroll.finishPullUp()
        })
    }
  }
}
</script>

<style scoped>
  #home{
    position: relative;
    height: 100vh;
  }
  .home-nav{
    background: var(--color-tint);
    color: white;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top:40px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control{
    position: relative;
    z-index: 2;
    background: white;
  }
</style>
