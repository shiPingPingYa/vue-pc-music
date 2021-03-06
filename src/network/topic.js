import { request } from './request'
/**
 * @description 获取热门话题
 * @param limit 评论数量默认30
 * @param offset 偏移位
 */
export function _getHotTopic (params) {
  return request({
    url: '/hot/topic',
    params: params
  })
}

/**
 *
 * @description 获取话题详情
 * @param actid 话题id
 */
export function _getTopicDetail (params) {
  return request({
    url: '/topic/detail',
    params
  })
}

/**
 * @description 获取热门话题动态评论
 * @param actid 话题id 76352260 76352260 76352260
 */
export function _getTopicEvent (params) {
  return request({
    url: '/topic/detail/event/hot',
    params
  })
}
