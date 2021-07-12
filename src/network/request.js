import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'

// 所有请求允许跨域
axios.defaults.withCredentials = true
export function request (config) {
  // 设置默认url
  const install = axios.create({
    // 请求地址设置为远程ip
    baseURL: 'http://localhost:3000',
    timeout: 7000,
    paramsSerializer: (params) => qs.stringify(params, { indices: false }) // 序列化get请求参数数组
  })

  // 配置请求头
  install.interceptors.request.use(data => {
    return data
  }, err => {
    return Promise.reject(err)
  })

  // 配置响应内容
  install.interceptors.response.use(res => {
    const { status } = res
    if (status === 200 && res !== null) {
      return res
    } else if (status !== 200) {
      Message.error(res.code)
      return Promise.reject(new Error(res.message || 'Error'))
    } else if (res.data.code === 301) {
      Message.error(res.data.msg)
    } else if (res.data.code === 404) {
      Message.error('cookie，失效请重新登录')
    }
  }, err => {
    Message({
      type: 'error',
      message: err.message,
      center: true
    })
    return Promise.reject(err)
  })
  return install(config)
}
