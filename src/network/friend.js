import { request } from './request'

/**
 * @description 获取用户关注列表
 * @param uid 用户id
 * @param limit 用户数量，默认30
 * @param offset 偏移位，取当前用户关注列表长度，即偏移当前用户关注列表
 * @returns
 */
export function _getUserAttentionList (params) {
  return request({
    url: '/user/follows',
    params
  })
}

/**
 * @description 获取用户粉丝列表
 * @param uid 用户id
 * @param limit 用户数量，默认30
 * @param offset 偏移位，取当前用户关注列表长度，即偏移当前用户关注列表
 * @returns
 */
export function _getUserFons (params) {
  return request({
    url: '/user/followeds',
    params
  })
}

/**
 * @description 获取用户动态
 * @param uid 用户id
 * @param limit 用户数量，默认30
 * @param lasttime 返回数据的lasttime用于获取下一页的数据
 * @returns
 */
export function _getUserDynamic (uid, limit) {
  return request({
    url: '/user/event',
    params: {
      uid: uid,
      limit: limit
    }
  })
}

/**
 * @description 获取动态消息
 * @param pagesize 用户数量，默认20
 * @param lasttime 返回数据的lasttime用于获取下一页的数据
 * @returns
 */
export function _getEvent (params) {
  return request({
    url: '/event',
    params
  })
}
