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
