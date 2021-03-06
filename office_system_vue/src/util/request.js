import axios from 'axios' //引入 axios
import baseUrl from '../api/baseUrl' //使用环境变量 + 模式的方式定义基础URL
axios.defaults.withCredentials = true  //允许跨域携带cookie

//允许跨域请求
axios.defaults.withCredentials = true
// 创建 axios 实例
const service = axios.create({
  baseURL: baseUrl, // api 的 base_url
  timeout: 30000, // 请求超时时间
})

export default service
