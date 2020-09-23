<template>
  <div id="detail">
    <DetailNavBar class="detail-nav" @titleClick='titleClick' ref="nav" />
    <Scroll class="content" ref="scroll" @scroll="contentScroll" :probeType='3'>
      <DetailSwiper :topImages='topImages'></DetailSwiper>
      <DetailBaseInfo :goods='goods' />
      <DetailShopInfo :shop='shop'/>
      <DetailGoodsInfo :detail-info='detailInfo'/>
      <DetailParamInfo ref='params' :paramInfo='paramInfo'/>
      <DetailCommentInfo ref="commont" :commentInfo='commentInfo'/>
      <GoodsList ref="recommend" :goods='recommends'/>
    </Scroll>
      <DetailBottomBar @addToCart='addToCart'/>
      <BackTop  @click.native='backClick' v-show="isShowBackTop"/>
      <Toast :message='message' :isShow='isShow'/>
  </div>
</template>

<script>
//数据展示组件
import DetailNavBar from './DetailNavBar'
import DetailSwiper from './DetailSwiper'
import DetailBaseInfo from './DetailBaseInfo'
import DetailShopInfo from './DetailShopInfo'
import DetailGoodsInfo from './DetailGoodsInfo'
import DetailParamInfo from './DetailParamInfo'
import DetailCommentInfo from './DetailCommentInfo'
import DetailBottomBar from './DetailBottomBar'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from  'components/common/backTop/BackTop'
import Toast from  'components/common/toast/Toast'


//格式化数据类
import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail'

import Scroll from  'components/common/scroll/Scroll'


export default {
  name:'Detail',
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      imgFlag:true,
      isShowBackTop:false,
      message:'message',
      isShow:false
    }
  },
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    Toast
  },
  created(){
    this.iid = this.$route.params.iid
    //详情页面的总数据获取
    getDetail(this.iid).then(res => {
      const data = res.result;
      //轮播图数据
      this.topImages = res.result.itemInfo.topImages
      //商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //商家信息
      this.shop = new Shop(data.shopInfo)
      //商品详情数据
      this.detailInfo = data.detailInfo
      //商品参数数据
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
    })
    //推荐数据获取
    getRecommend().then( res => {
      this.recommends = res.data.list
    })
  },
  beforeUpdate(){
    if(this.imgFlag){
        setTimeout( () => {
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
          this.themeTopYs.push(this.$refs.commont.$el.offsetTop - 44)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
          this.imgFlag = false
        },1000)
    }
  },

  methods:{
    titleClick(idx){
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[idx],100)
    },
    contentScroll(position){
      const positionY = -position.y;

      if(positionY >= this.themeTopYs[1]){
        this.$refs.nav.currentIndex = 1
      }
      if(positionY >= this.themeTopYs[2]){
        this.$refs.nav.currentIndex = 2
      }
      if(positionY >= this.themeTopYs[3]){
        this.$refs.nav.currentIndex = 3
      }
    
      this.isShowBackTop = (-position.y) > 1000

    },
    backClick(){//返回顶部事件
      this.$refs.scroll.scrollTo(0,0,500)
    },
    //添加到购物车
    addToCart(){
        // 1.创建对象
        const obj = {}
        // 2.对象信息
        obj.iid = this.iid;
        obj.imgURL = this.topImages[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc;
        obj.newPrice = this.goods.nowPrice;
        obj.checked = false

        // 3.添加到Store中
        this.$store.dispatch('addCart', obj).then(res => {
          console.log(res)
            this.isShow = true
            this.message = res
          setTimeout(() => {
            this.isShow = false
            this.message = ''
          },1000)
        })
    }
  }
}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 999;
    background:#fff;
    height: 100vh;
  }
  .content{
    height: calc(100% - 44px);
  }
  .detail-nav{
    position: relative;
    z-index: 999;
    background: #fff;
  }
</style>
