import { request } from './request';
export class MV {
  constructor(i) {
    this.id = i.id;
    this.cover = i.cover || i.imgurl || i.picUrl;
    this.name = i.name;
    this.artist = i.artistName;
    this.count = i.playCount;
  }
}

/**
 * @description 获取最新mv
 * @param  limit 最新mv数量，默认30
 */
export function _getNewMV(params) {
  return request({
    url: '/mv/first',
    params
  });
}

/**
 * @description 获取mv详细信息
 * @param  mvid mv的id
 * @returns
 */
export function _getMvDetail(params) {
  return request({
    url: '/mv/detail',
    params
  });
}

/**
 * @description 获取mv的播放地址
 * @param id mv的id
 */
export function _getMvUrl(params) {
  return request({
    url: '/mv/url',
    params
  });
}

/**
 * @description 获取mv的评论
 * @param id mv的id
 * @param limit 取出评论的数量，默认20
 * @param offset 偏移位，取当前评论数组的长度，即偏移当前评论数组
 */
export function _getMvComment(params) {
  return request({
    url: '/comment/mv',
    params
  });
}

/**
 * @description 获取相似mv
 * @param id mv的id
 */
export function _getSimiMv(params) {
  return request({
    url: '/simi/mv',
    params
  });
}

/**
 * @description 获取mv的排行榜
 * @param limit 取出数量，默认30
 * @param area: 地区,可选值为内地,港台,欧美,日本,韩国,不填则为全部
 * @param offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
 */
export function _getTopMv(params) {
  return request({
    url: '/top/mv',
    params
  });
}
/**
 * @description 获取全部mv
 * @param area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部 type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
 * @param order: 排序,可选值为上升最快,最热,最新,不填则为上升最快
 * @param limit: 取出数量 , 默认为 30
 * @param offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0(取当前mv数组长度，即偏移当前mv)
 */
export function _AllMv(params) {
  return request({
    url: '/mv/all',
    params
  });
}
