import { request } from './request'

// 歌手分类列表
export function _getArtist (area, type, limit) {
  return request({
    url: '/artist/list',
    params: {
      area: area,
      type: type,
      limit: limit
    }
  })
}

// 新歌速递
export function _getTopSongs (type) {
  return request({
    url: '/top/song',
    params: {
      type: type
    }
  })
}

// 所有榜单
// 说明 : 调用此接口,可获取所有榜单 接口地址 : /toplist
export function _getRankList () {
  return request({
    url: '/toplist'
  })
}
