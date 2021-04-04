import { request } from './request'

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
export function _getGroupVideo (id) {
  return request({
    url: '/video/group',
    params: {
      id: id
    }
  })
}

// 获取视频播放地址
export function _getVideoUrl (id) {
  return request({
    url: ' /video/url',
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
