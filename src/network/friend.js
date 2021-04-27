import { request } from './request'

// 获取用户关注列表,传入用户id
export function _getUserAttentionList (uid, limit, offset) {
  return request({
    url: '/user/follows',
    params: {
      uid: uid,
      limit: limit,
      offset: offset
    }
  })
}

// 获取用户粉丝
export function _getUserFons (uid, limit) {
  return request({
    url: '/user/followeds',
    params: {
      uid: uid,
      limit: limit
    }
  })
}

// 获取用户动态
export function _getUserDynamic (uid, limit) {
  return request({
    url: '/user/event',
    params: {
      uid: uid,
      limit: limit
    }
  })
}

// 获取动态消息
export function _getEvent (pagesize, cookie, lasttime) {
  return request({
    url: '/event',
    method: 'POST',
    data: {
      pagesize: pagesize,
      cookie: cookie,
      lasttime: lasttime
    }
  })
}
