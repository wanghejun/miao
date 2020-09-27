<template>
  <div class="goods-item" @click='itemClick'>
    <img v-lazy="showImage" alt="" @load="imgLoad">
    <div class="info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="cfav">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    showImage(){
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods:{
    //图片加载完成就发射事件总线
    imgLoad(){
      this.$bus.$emit('itemImageLoad')
    },
    //详情页跳转
    itemClick(){
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
.goods-item{
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goods-item  img {
  width: 100%;
  border-radius: 5px;
}
.info{
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.info > p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.info > .price{
  color: red;
  margin-right: 20px;
}
.info > .cfav {
  position: relative;
}

.info > .cfav::before{
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background-image: url('~assets/img/common/collect.svg');
  background-position: 0 0;
  background-size: 14px 14px;
}

</style>
