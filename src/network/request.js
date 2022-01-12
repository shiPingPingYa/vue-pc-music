import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'

// 所有请求允许跨域
axios.defaults.withCredentials = true
const request = axios.create({
  // 请求地址设置为远程ip
  baseURL: 'http://localhost:3000',
  timeout: 1000 * 30,
  paramsSerializer: params =>
    qs.stringify(params, {
      indices: false
    }) // 序列化get请求参数数组
})

// 配置请求头
request.interceptors.request.use(
  data => {
    return data
  },
  err => {
    return Promise.reject(err)
  }
)

// 配置响应内容
request.interceptors.response.use(
  res => {
    if (res.status === 200 && res !== null) {
      return res
    } else if (res.data.code === 301) {
      Message.error(res.data.msg)
    } else if (res.data.code === 404) {
      Message.error('cookie，失效请重新登录')
    }
  },
  err => {
    if (!err.response) return Message.error('网络错误，请检查网络!!!')
    const { code } = err.response.data
    if (code === 301) {
      Message({
        type: 'error',
        message: err.response.data.msg
      })
    } else {
      Message({
        type: 'error',
        message: err.message,
        center: true
      })
    }
    return Promise.reject(err)
  }
)

export { request }
