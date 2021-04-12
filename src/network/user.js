import { Date } from 'core-js'
import { request } from './request'

// 登录状态
export function _getLonginStatus (cookie) {
  return request({
    url: '/login/status',
    params: {
      cookie: cookie,
      withCredentials: true,
      timerstamp: Date.now()
    }
  })
}
// 手机号验证,必选参数 :,phone : 手机号码
export function _VerifyPhone (phone) {
  return request({
    url: '/cellphone/existence/check',
    method: 'POST',
    data: {
      phone: phone
    }
  })
}

// 手机登录,必选参数 :phone: 手机号码,password: 密码
export function _login (phone, password) {
  return request({
    url: '/login/cellphone',
    method: 'POST',
    data: {
      phone: phone,
      password: password
    }
  })
}

// 获取用户歌单,登录后调用此接口 , 传入用户 id, 可以获取用户歌单
export function _getSongList (id) {
  return request({
    url: '/user/playlist',
    params: {
      uid: id
    }
  })
}

// 获取手机号码的验证码
export function _getCaptcha (phone) {
  return request({
    url: '/captcha/sent',
    params: {
      phone: phone
    }
  })
}

// 验证验证码
export function _getVerifyCaptcha (phone, captcha) {
  return request({
    url: '/captcha/verify',
    method: 'POST',
    data: {
      phone: phone,
      captcha: captcha
    }
  })
}

// 用户登录 phone,password,captcha,nickname
export function _registerPhone (params) {
  return request({
    url: '/register/cellphone',
    method: 'POST',
    data: params
  })
}

// 二维码接口生成key,生成时间搓防止缓存
export function _getQrcodeKey () {
  return request({
    url: '/login/qr/key',
    withCredentials: true,
    timerstamp: Date.now()
  })
}

// 调用生成的二维码key,生成二维码图片的base64和二维码信息,qrimg返回base64图片编码
export function _getQrcodeImg (key) {
  return request({
    url: '/login/qr/create',
    params: {
      key: key,
      qrimg: true,
      timerstamp: Date.now()
    },
    withCredentials: true // 跨域
  })
}

// 二维码扫描检测接口 800过期，801等待，802确认，803返回cookie
export function _getCheckQrcode (key) {
  return request({
    url: '/login/qr/check',
    isClose: true,
    params: {
      key: key,
      timerstamp: Date.now()
    },
    withCredentials: true
  })
}
