import { request } from './request'
// 热搜内容
export function _hotSearchDetail () {
  return request({
    url: '/search/hot/detail'
  })
}

// 输入的搜索内容
export function _Search (key) {
  return request({
    url: '/search',
    params: {
      keywords: key,
      limit: 50
    }
  })
}

// input输入框的搜索内容
export function _Suggest (keywords) {
  return request({
    url: '/search/suggest',
    params: {
      keywords: keywords
    }
  })
}
