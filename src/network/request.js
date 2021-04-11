import axios from 'axios'
import { Loading } from 'element-ui'
var loadingStance = null
export function request (config, post) {
  // 设置默认url
  const install = axios.create({
    // 请求地址设置为远程ip
    baseURL: 'http://81.69.232.192:3000',
    timeout: 7000
  })

  // 配置请求头
  install.interceptors.request.use(data => {
    if (config.isClose !== true) {
      loadingStance = Loading.service({ fullscreen: true, background: 'rgba(0,0,0,0.1)' })
    }
    return data
  }, err => {
    return new Promise((resolve, reject) => reject(err))
  })
  // 配置响应内容
  install.interceptors.response.use(data => {
    setTimeout(() => {
      loadingStance.close()
    }, 1000)
    return data
  }, err => {
    setTimeout(() => {
      loadingStance.close()
    }, 1000)
    return new Promise((resolve, reject) => reject(err))
  })
  // 判断是否是post请求
  if (post === true) return install.post(config)
  return install(config)
}
