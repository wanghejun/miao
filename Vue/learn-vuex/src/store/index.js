import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{//数据
    count:100
  },
  mutations:{//方法
    dec(state){
      state.count--
    },
    inc(state){
      state.count++
    }
  },
  actions:{

  },
  getters:{

  },
  modules:{

  }
})

export default store
