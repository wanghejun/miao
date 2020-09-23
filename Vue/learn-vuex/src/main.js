import Vue from 'vue'
import App from './App.vue'
import store from './store'
// import axios from 'axios'
import request from './network/request.js'
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

// axios({
//   url:'http://123.207.32.32:8000/home/multidata'
// }).then(resolve => {
//   console.log(resolve)
// })
request({}).then(resolve => {
  console.log(resolve)
})
