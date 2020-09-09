import * as animal from './js/test'
const fruit = require('./js/test2')

for(let key in animal){
  console.log(animal[key])
}

console.log(fruit)
require("./css/normal.css")
require("./css/special.scss")

import Vue from 'vue'
new Vue({
  el:"#app",
  template:`
    <div>
      <button @click="dec">-</button>
      <span>{{count}}</span>
      <button @click="inc">+</button>
    </div>
  `,
  data:{
    message:'Vue webpack',
    count:0,
  },
  methods:{
    dec(){
      this.count--
    },
    inc(){
      this.count++
    }
  }
})
