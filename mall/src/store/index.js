import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'
//安装
Vue.use(Vuex)

const state = {
  cartList:[]
}
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})

export default store
