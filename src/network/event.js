import { request } from './request'

/**
 * @description 获取用户转发动态
 * @uid 用户id
 * @limit 数量默认30
 * @lasttime 默认-1，放回上一次请求的lasttime用于获取下一页数据
 * @returns
 */
export function _getUserSendEvent (params) {
  return request({
    url: '/user/event',
    params: params
  })
}

/**
 * @description 登录后获取动态评论
 * @param  params threadId 动态id，在comment(评论)下面获取
 * @param offset  偏移位，偏移当前数组长度，即偏移当前数组
 */
export function _getCommentEvent (params) {
  return request({
    url: '/comment/event',
    params
  })
}
