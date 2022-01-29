import axios from 'axios'
import store from '../store'
import qs from 'qs'
import { Message } from 'element-ui'

// 所有请求允许跨域
axios.defaults.withCredentials = true
const request = axios.create({
  // 请求地址设置为远程ip
  baseURL: process.env.VUE_APP_API,
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
      store.dispatch('_Layout')
    } else {
      Message.error(res.data.msg)
      if (res.data.data.dialog) {
        Message.error(res.data.msg + res.data.data.dialog.title + res.data.data.dialog.subtitle)
      }
    }
  },
  err => {
    if (!err.response) return Message.error('网络错误，请检查网络!!!')
    Message({
      type: 'error',
      message: err.response.data.message || err.message
    })
    return Promise.reject(err)
  }
)

export { request }
