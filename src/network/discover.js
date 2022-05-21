import { request } from './request';

/**
 * @description 获取歌手分类列表
 * @param  area -1:全部 7华语 96欧美 8:日本 16韩国 0:其他
 * @param  type  -1:全部 1:男歌手 2:女歌手 3:乐队
 * @param  limit 歌手数量，默认30
 * @param  offset 偏移位，取当前歌手列表数组长度，即偏离当前歌手列表
 */
export function _getArtist(params) {
  return request({
    url: '/artist/list',
    params
  });
}

/**
 * @description 新歌速递
 * @param  type 地区id 全部:0 华语:7 欧美:96 日本:8 韩国:16
 */
export function _getTopSongs(type) {
  return request({
    url: '/top/song',
    params: {
      type: type
    }
  });
}

/**
 * @description 所有榜单
 */
export function _getRankList() {
  return request({
    url: '/toplist'
  });
}

/**
 * @description 获取轮播图数据
 */
export const _getBanner = () => request({ url: '/banner' });

/**
 * @description 获取推荐歌单
 * @param limit 取出数量，默认30
 */
export const _getPersonalized = params => request({ url: '/personalized', params });

/**
 * @description 获取独家放送(首页需要独家放送入口)
 */
export const _getPrivateContent = () => request({ url: '/personalized/privatecontent' });

/**
 * @description 获取推荐音乐
 */
export const _getNewSong = () => request({ url: '/personalized/newsong' });

/**
 * @description 获取推荐mv
 */
export function _getPrivateMv() {
  return request({
    url: '/personalized/mv'
  });
}
