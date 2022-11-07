import axios from 'axios'
import { getToken } from '@/utils/storage'
const request = axios.create({
  baseURL: 'http://liufusong.top:8080/',
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  config.headers.authorization = getToken()
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

export default request
