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
