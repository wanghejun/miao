import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,//挂载router
  render: h => h(App)
}).$mount('#app')
