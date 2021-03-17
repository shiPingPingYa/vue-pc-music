import { request } from './request'

// 工具函数
import { formDate } from '../assets/common/tool'

// 获取音乐URL
export function _getMusicUrl (id) {
  return request({
    url: '/song/url',
    params: {
      id: id
    }
  })
}
// 获取歌曲详情，传入ids(可以传入多个id)
export function _getSongsDetail (arr) {
  return request({
    url: '/song/detail',
    params: {
      ids: arr
    }
  })
}

// 获取歌单详情
export function _getMusicListDetail (id) {
  return request({
    url: '/playlist/detail',
    params: {
      id: id
    }
  })
}

// 歌单收藏者
export function _getSub (id, limit) {
  return request({
    url: '/playlist/subscribers',
    params: {
      id: id,
      limit
    }
  })
}

// 获取歌单的评论内容
export function _getRecommends (id, limit) {
  return request({
    url: '/comment/playlist',
    params: {
      id: id,
      limit: limit
    }
  })
}

// 音乐评论内容
export function _musicRecommend (id, limit) {
  return request({
    url: '/comment/music',
    params: {
      id: id,
      limit: limit
    }
  })
}

// 热门歌单分类
export function _getMusicListHot () {
  return request({
    url: '/playlist/hot'
  })
}

// 获取精品歌单cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部"
export function _getHighquality (cat, limit) {
  return request({
    url: '/top/playlist/highquality',
    params: {
      cat: cat,
      limit: limit,
      time: new Date().getTime()
    }
  })
}

// 将获取的歌曲对象进行封装
export class SongDetail {
  constructor (songs) {
    this.id = songs[0].id
    this.name = songs[0].name
    this.album = songs[0].al.name
    this.song = songs[0].ar[0].name
    this.pic = songs[0].al.picUrl
    this.time = formDate(new Date(songs[0].dt), 'mm:ss')
  }
}

// 获取歌词
// 说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
export function _getLyric (id) {
  return request({
    url: '/lyric',
    params: {
      id: id
    }
  })
}
// 封装歌单对象
export class BaseInfo {
  constructor (playlist) {
    this.img = playlist.coverImgUrl
    this.title = playlist.description
    this.name = playlist.name
    this.shareCount = playlist.shareCount
    this.subscribedCount = playlist.subscribedCount
    this.playCount = playlist.playCount
    this.trackCount = playlist.trackCount
    this.tags = playlist.tags[0]
  }
}
