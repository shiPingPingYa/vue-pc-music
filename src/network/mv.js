import { request } from './request'

export class MV {
  constructor (id, cover, name, artist, count) {
    this.id = id
    this.cover = cover
    this.name = name
    this.artist = artist
    this.count = count
  }
}

// 最新 mv
// 说明 : 调用此接口 , 可获取最新 mv,取出数量 , 默认为 30
export function _getNewMv (limit) {
  return request({
    url: '/mv/first',
    params: {
      limit: limit
    }
  })
}

// 获取 mv 数据
export function _getMvDetail (id) {
  return request({
    url: '/mv/detail',
    params: {
      mvid: id
    }
  })
}

// 获取Mv地址
export function _getMvUrl (id) {
  return request({
    url: '/mv/url',
    params: {
      id: id
    }
  })
}

// 发送/删除评论
export function _getMvComment (id, limit) {
  return request({
    url: '/comment/mv',
    params: {
      id: id,
      limit: limit
    }
  })
}

// 相似 mv,传入id
export function _getSimiMv (id) {
  return request({
    url: '/simi/mv',
    params: {
      mvid: id
    }
  })
}

// mv 排行
export function _getTopMv (limit = 10) {
  return request({
    url: '/top/mv',
    params: {
      limit: limit
    }
  })
}

// 全部mv
export function _AllMv (area = '全部', type = '全部', order = '最新', limit) {
  return request({
    url: '/mv/all',
    params: {
      area: area,
      type: type,
      order: order,
      limit: limit
    }
  })
}
