export  default{
  addCounter(state,payLoad){
    payLoad.count++
  },
  addCart(state,payLoad){
    state.cartList.push(payLoad)
    console.log(state.cartList)
  }
}
