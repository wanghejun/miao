import {request} from './request.js'

//轮播图接口
export function getHomeMultidata() { 
  return request({
    url:'/home/multidata'
  })
}
//商品列表接口
export function getHomeGoods(type,page) { 
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}
