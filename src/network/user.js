import { request } from './request'

// 手机号验证,必选参数 :,phone : 手机号码
export function _VerifyPhone (phone) {
  return request({
    url: '/cellphone/existence/check',
    params: {
      phone: phone
    }
  })
}

// 手机登录,必选参数 :phone: 手机号码,password: 密码
export function _login (phone, password) {
  return request({
    url: '/login/cellphone',
    params: {
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
    params: {
      phone: phone,
      captcha: captcha
    }
  })
}

// 用户登录 phone,password,captcha,nickname
export function _registerPhone (params) {
  return request({
    url: '/register/cellphone',
    data: params
  }, true)
}
