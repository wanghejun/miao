import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastClick from 'fastclick'

Vue.config.productionTip = false
//创建事件总线
Vue.prototype.$bus = new Vue()

fastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
