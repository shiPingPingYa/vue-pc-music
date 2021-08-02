import { request } from './request'

/**
 * @description 获取首页的搜索内容下的热搜内容
 */
export function _hotSearchDetail () {
  return request({
    url: '/search/hot/detail'
  })
}

/**
 * @description 获取根据搜索的关键字获取搜索的内容
 * @param  keywords 搜索内容
 * @param limit 取出长度
 * @param offset 偏移位置，取当前搜索数组的长度，即偏移当前数组
 * @param type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
 */
export function _Search (params) {
  return request({
    url: '/search',
    params
  })
}

/**
 * @description 搜索建议
 * @param  keywords  搜索的值
 * @param type : 如果传 'mobile' 则返回移动端数据
 */
export function _Suggest (params) {
  return request({
    url: '/search/suggest',
    params
  })
}
