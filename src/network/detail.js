import { request } from './request';

// 工具函数
import { formDate } from '../assets/common/tool';

/**
 * @description 获取音乐播放地址
 * @param id  音乐id
 */
export function _getMusicUrl(id) {
  return request({
    url: '/song/url',
    params: {
      id: id
    }
  });
}

/**
 * @description 判断音乐是否有版权，swiper轮播图需要
 * @param id 音乐id
 */
// 判断音乐是否有权限
export function _getCheckMusic(id) {
  return request({
    url: '/check/music',
    params: {
      id: id
    }
  });
}

/**
 * @description 获取音乐详细信息
 * @param ids 音乐id，可以传入单个，也可以传入多个以逗号链接如，23，23，232
 * @returns
 */
export const _getSongsDetail = ids => request({ url: '/song/detail', params: { ids } });

/**
 * @description 获取歌单详细信息
 * @param id 歌单id
 * @returns
 */
export function _getMusicListDetail(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id: id
    }
  });
}

/**
 * @description 获取歌单收藏者
 * @param id 歌单id
 * @param limit  收藏者数量，默认20
 */
export function _getSub(id, limit) {
  return request({
    url: '/playlist/subscribers',
    params: {
      id: id,
      limit
    }
  });
}

/**
 * @description 获取歌单评论
 * @param  id 歌单或者歌曲的id
 * @param  limit 请求数量，默认20
 * @param  offset 偏移位，取当前评论数组长度，即偏移当前评论
 * @param  before  分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
 */
// 获取歌单的评论内容
export function _getRecommends(params) {
  return request({
    url: '/comment/playlist',
    params
  });
}

/**
 * @description 获取歌曲评论
 * @param  id 歌曲id
 * @param  limit 评论数量，默认20
 * @param  offset 偏移位，取当前评论数组长度，即偏移当前评论
 * @param  before  分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
 */
export function _musicRecommend(id, limit, offset) {
  return request({
    url: '/comment/music',
    params: {
      id: id,
      limit: limit,
      offset: offset,
      timestamp: Date.now()
    },
    isClose: true
  });
}

/**
 * @description 获取热门播放歌单
 */
export function _getMusicListHot() {
  return request({
    url: '/playlist/hot'
  });
}

// 获取精品歌单cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部"
/**
 * @description 获取精品歌单
 * @param  cat tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags)
 * @param  limit 取出歌单数量 , 默认为 20
 * @param  before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
 */
export function _getHighquality(params) {
  return request({
    url: '/top/playlist/highquality',
    params
  });
}

/**
 * @description 获取精品歌单标签列表
 */
export function _getHighqualityTags() {
  return request({
    url: '/playlist/highquality/tags'
  });
}

/**
 * @description 音乐心动模式
 * @param pid 歌单Id
 * @param id 音乐id
 * @param cid 正在播放音乐id
 */
export function _getIntelligenceList(params) {
  return request({
    url: '/playmode/intelligence/list',
    params: params
  });
}

/**
 * @description 获取专辑信息
 * @param id 专辑id
 * @returns
 */
export function _getAlbumDeatil(params) {
  return request({
    url: '/album',
    params
  });
}

/**
 * @description 获取专辑动态信息(如专辑收餐数量，专辑评论，专辑分享数量等等)
 * @param id 专辑id
 * @returns
 */
export function _getAlbumDynamicDetail(params) {
  return request({
    url: '/album/detail/dynamic',
    params
  });
}

/**
 * @description 获取专辑评论
 * @param 必选参数 : id: 专辑 id
 * @param limit 可选参数 : limit: 取出评论数量 , 默认为 20
 * @param offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * @param before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
 * @returns
 */
export function _getAlbumComments(params) {
  return request({
    url: '/comment/album',
    params
  });
}

// 将获取的歌曲对象进行封装,单个音乐对象
export class SongDetail {
  constructor(songs) {
    this.id = songs[0].id;
    this.name = songs[0].name;
    this.album = songs[0].al.name;
    this.song = songs[0].ar[0].name;
    this.pic = songs[0].al.picUrl;
    this.time = formDate(new Date(songs[0].dt), 'mm:ss');
  }
}

// 多个音乐对象
export class AllSongDetail {
  constructor(songs) {
    this.id = songs.id;
    this.name = songs.name;
    this.album = songs.al.name;
    this.song = songs.ar[0].name;
    this.pic = songs.al.picUrl;
    this.time = formDate(new Date(songs.dt), 'mm:ss');
  }
}

// 获取歌词
// 说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
/**
 * @description 获取歌词
 * @param  id 音乐的id
 */
export function _getLyric(id) {
  return request({
    url: '/lyric',
    params: {
      id: id
    }
  });
}

/**
 * @description 获取每日推荐歌曲(需要登录)
 * @param {*} parmas
 * @returns
 */
export function getDayMusic(parmas) {
  return request({
    url: '/recommend/songs',
    parmas: parmas
  });
}

// 封装歌单对象
export class BaseInfo {
  constructor(playlist) {
    this.img = playlist.coverImgUrl;
    this.title = playlist.description;
    this.name = playlist.name;
    this.shareCount = playlist.shareCount;
    this.subscribedCount = playlist.subscribedCount;
    this.playCount = playlist.playCount;
    this.trackCount = playlist.trackCount;
    this.tags = playlist.tags;
  }
}
