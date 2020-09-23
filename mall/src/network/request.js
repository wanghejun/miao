import axios from 'axios'

export function request(config){

  const instant = axios.create({
    // baseURL:'http://123.207.32.32:8000',//报废api
    baseURL:'http://152.136.185.210:8000/api/z8',
    timeout:10000
  })

  //请求拦截器
  instant.interceptors.request.use( config => {
    return config
  },err => {
    console.log(err)
  })

  //响应拦截器
  instant.interceptors.response.use(res => {
    return res.data  
  },err => {
    console.log(err)
  })

  return instant(config)//这里返回的也是一个promise，所以那边也可以直接then
}
