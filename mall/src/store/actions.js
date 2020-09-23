export default {
  addCart(context,payLoad){
    return new Promise((resolve,reject) => {
      let oldProduct = context.state.cartList.find(it => it.iid === payLoad.iid)

      if(oldProduct){
        // oldProduct.count += 1
        context.commit('addCounter',oldProduct)
        resolve('当前商品数量+1')
      }else{
        payLoad.count = 1
        context.commit('addCart',payLoad)
        resolve('添加了新的商品')
      }
    })
  }
}
