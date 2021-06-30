import { request } from './request'

export default {
/**
 * @description 发送删除评论
 * @param  params ：t(1：发送,2：回复)
 * @param type: 0: 歌曲,1: mv,2: 歌单,3: 专辑,4: 电台,5: 视频,6: 动态
 * @param id:对应id
 * @param content:评论内容
 * @param commentId :回复评论id(回复消息必填)
 * @returns
 */
  sendAndRemoveComment (params) {
    return request({
      url: '/comment',
      params: params
    })
  }
}
