import axios from 'axios'
export function request (config) {
// 设置默认url
  const install = axios.create({
    // 请求地址设置为远程ip
    baseURL: 'http://81.69.232.192:3000',
    timeout: 5000
  })
  // 配置请求头
  install.interceptors.request.use(data => {
    return data
  }, err => {
    return err
  })
  // 配置响应内容
  install.interceptors.response.use(data => {
    return data
  }, err => {
    return err
  })
  return install(config)
}
