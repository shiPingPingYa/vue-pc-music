import { request } from './request'

/**
 * @description 获取歌手详情
 * @param id 歌手id
 */
export function _getArtistDetail (params) {
  return request({
    url: '/artist/detail',
    params
  })
}

/**
 * @description 获取歌手描述
 * @param  id 歌手id
 */
export function _getArtistDesc (params) {
  return request({
    url: '/artist/desc',
    params
  })
}

/**
 * @description 获取歌手热门50首音乐
 * @param 歌手id
 */
export function _getArtistHot50 (id) {
  return request({
    url: '/artist/top/song',
    params: {
      id: id
    }
  })
}

/**
 * @description 获取歌手专辑
 * @param  id  歌手id
 * @param limit 专辑数量，默认50
 */
export function _getArtistAlbum (id) {
  return request({
    url: '/artist/album',
    params: {
      id: id,
      limit: 50
    }
  })
}

/**
 * @description 获取专辑内容
 * @param  id 专辑id
 * @returns
 */
export function _getAlbum (id) {
  return request({
    url: '/album',
    params: {
      id: id
    }
  })
}

/**
 * @description 获取歌手详细信息
 * @param  id  歌手id
 */
export function _getArtistDescDetail (id) {
  return request({
    url: '/artist/desc',
    params: {
      id: id
    }
  })
}

/**
 * @description 获取相似的歌手
 * @param  id 歌手id
 * @returns
 */
export function _getArtistSimilar (id) {
  return request({
    url: '/simi/artist',
    params: {
      id: id
    }
  })
}

/**
 * @description 获取歌手mv
 * @param  id  歌手id
 */
export function _getArtistMv (id) {
  return request({
    url: '/artist/mv',
    params: {
      id: id
    }
  })
}
