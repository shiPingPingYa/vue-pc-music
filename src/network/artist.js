import { request } from './request'

// 获取歌手详情
export function _getArtistDetail (id) {
  return request({
    url: '/artist/detail',
    params: {
      id: id
    }
  })
}

// 获取歌手描述
// 调用此接口 , 传入歌手 id, 可获得歌手描述
export function _getArtistDesc (id) {
  return request({
    url: '/artist/desc',
    params: {
      id: id
    }
  })
}

// 歌手热门50首歌曲
// 说明 : 调用此接口, 可获取歌手热门50首歌曲
export function _getArtistHot50 (id) {
  return request({
    url: '/artist/top/song',
    params: {
      id: id
    }
  })
}

// 获取歌手专辑
// 说明 : 调用此接口 , 传入歌手 id, 可获得歌手专辑内容,limit数量
export function _getArtistAlbum (id) {
  return request({
    url: '/artist/album',
    params: {
      id: id,
      limit: 50
    }
  })
}

// 获取专辑内容
// 说明 : 调用此接口 , 传入专辑 id, 可获得专辑内容
export function _getAlbum (id) {
  return request({
    url: '/album',
    params: {
      id: id
    }
  })
}

// 获取歌手描述
// 说明 : 调用此接口 , 传入歌手 id, 可获得歌手描述
export function _getArtistDescDetail (id) {
  return request({
    url: '/artist/desc',
    params: {
      id: id
    }
  })
}

// 获取相似歌手
// 说明 : 调用此接口 , 传入歌手 id, 可获得相似歌手
export function _getArtistSimilar (id) {
  return request({
    url: '/simi/artist',
    params: {
      id: id
    }
  })
}

// 获取歌手 mv
// 说明 : 调用此接口 , 传入歌手 id, 可获得歌手 mv 信息 ,
//  具体 mv 播放地址可调 用/mv传入此接口获得的 mvid 来拿到 , 如 : /artist/mv?

export function _getArtistMv (id) {
  return request({
    url: '/artist/mv',
    params: {
      id: id
    }
  })
}
