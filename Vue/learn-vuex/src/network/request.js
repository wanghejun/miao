import axios from 'axios'

export default function request(config){

  const instant = axios.create({
    baseURL:'http://123.207.32.32:8000/home/multidata',
    timeout:5000
  })
  return instant(config)//这里返回的也是一个promise，所以那边也可以直接then
}
