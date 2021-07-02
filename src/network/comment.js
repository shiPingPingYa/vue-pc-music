import { request } from './request'

/**
 * @description 发送删除评论
 * @param  params ：t(1：发送,2：回复)
 * @param type: 0: 歌曲,1: mv,2: 歌单,3: 专辑,4: 电台,5: 视频,6: 动态
 * @param id:对应id
 * @param content:评论内容
 * @param commentId :回复评论id(回复消息必填)
 * @returns
 */
export function sendAndRemoveComment (params) {
  return request({
    url: '/comment',
    params: params,
    timestamp: Date.now()
  })
}

/**
 * @description 获取楼层评论
 * @param type: 0: 歌曲,1: mv,2: 歌单,3: 专辑,4: 电台,5: 视频,6: 动态
 * @param id:对应id
 * @param parentCommendId:楼层ID
 * @param limit :评论数量，默认20
 * @returns
 */
export function _getFloorComment (params) {
  return request({
    url: '/comment/floor',
    params: params
  })
}
