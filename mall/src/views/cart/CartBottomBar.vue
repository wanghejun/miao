<template>
  <div class="buttomBar">
    <div class="check-content">
      <CheckButton class="check-button" :value='isSelectAll' @checkBtnClick='checkBtnClick'/>
      <span>全选</span>
    </div>
    <div class="totalPrice">合计{{totalPrice}}</div>
    <div class="calculate" @click="calculateClick">去结算:({{checkedLength}})</div>
  </div>
</template>

<script>
import CheckButton from './CheckButton'

export default {
  name:'CartBottomBar',
  components:{
    CheckButton
  },
  computed:{
    totalPrice(){
      return '￥' + this.$store.state.cartList.filter(it => {
        return it.checked
      }).reduce( (prev,it) => {
        return prev + it.newPrice * it.count
      },0)
    },
    checkedLength(){
      return this.$store.state.cartList.filter(it => it.checked).length
    },
    isSelectAll(){
      if(this.$store.state.cartList.length == 0) return false
      return this.$store.state.cartList.every( it => it.checked)
    }
  },
  methods:{
    checkBtnClick(){
      if(this.isSelectAll){
        this.$store.state.cartList.forEach(it => it.checked = false)
      }else{
        this.$store.state.cartList.forEach(it => it.checked = true)
      }
    },
    calculateClick(){
      this.$toast.show('请选择购买的商品',2000)
    }
  }
}
</script>

<style scoped>
  .buttomBar{
    display: flex;
    position: relative;
    height: 40px;
    line-height: 40px;
    background: #eeeeee;
    justify-content: space-around;
  }
  .check-content{
    display: flex;
    width: 90px;
    align-items: center;
    margin-left: 10px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .totalPrice{
    flex: 1;
    text-align: center;
  }
  .calculate{
    width: 90px;
    text-align: center;
    background: #FF8198;
  }
</style>
