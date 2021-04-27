import { request } from './request'

// 将视频对象结构
export class Video {
  constructor (obj) {
    this.id = obj.vid
    this.cover = obj.coverUrl
    this.title = obj.title
    this.count = obj.playTime
    this.user = obj.creator
  }
}

// 获取视频分类列表
export function _getVideoCategory () {
  return request({
    url: '/video/category/list'
  })
}

// 获取视频标签列表
export function _getGroupList () {
  return request({
    url: '/video/group/list'
  })
}

// 获取视频标签/分类下的视频
export function _getGroupVideo (id, cookie, page) {
  return request({
    url: '/video/group',
    params: {
      id: id,
      cookie: cookie,
      page: page
    }
  })
}

// 获取视频播放地址
export function _getVideoUrl (id) {
  return request({
    url: '/video/url',
    params: {
      id: id
    }
  })
}

// 获取视频详情页面
export function _getVideoDetail (id) {
  return request({
    url: '/video/detail',
    params: {
      id: id
    }
  })
}

// 获取视频评论
export function _getVideoComment (id, limit) {
  return request({
    url: '/comment/video',
    params: {
      id: id,
      limit: limit
    }
  })
}

// 获取相似视频
export function _getRelatedVideo (id) {
  return request({
    url: '/related/allvideo',
    params: {
      id: id
    }
  })
}
