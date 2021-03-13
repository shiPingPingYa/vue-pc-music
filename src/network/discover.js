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

// 说明 : 调用此接口 , 可获取 banner( 轮播图 ) 数据
export function _getBanner () {
  return request({
    url: '/banner'
  })
}

// 推荐歌单
export function _getPersonalized (config) {
  return request({
    url: '/personalized',
    params: {
      limit: config
    }
  })
}

// 独家放送(入口列表)
export function _getPrivateContent () {
  return request({
    url: '/personalized/privatecontent'
  })
}

// 推荐新音乐
export function _getNewSong () {
  return request({
    url: '/personalized/newsong'
  })
}

// 推荐 mv
export function _getPrivateMv () {
  return request({
    url: '/personalized/mv'
  })
}
