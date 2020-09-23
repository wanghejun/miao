import * as animal from './js/test'
const fruit = require('./js/test2')

for(let key in animal){
  console.log(animal[key])
}

console.log(fruit)
require("./css/normal.css")
require("./css/special.scss")

import Vue from 'vue'
import App from './vue/app.vue'

new Vue({
  el:"#app",
  template:`<App/>`,
  components:{
    App,
  }
})
