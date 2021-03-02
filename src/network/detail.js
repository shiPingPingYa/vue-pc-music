import { request } from './request'

// 工具函数
import { formDate } from '../assets/common/tool'

// 获取歌曲详情，传入ids(可以传入多个id)
export function _getSongsDetail (arr) {
  return request({
    url: '/song/detail',
    params: {
      ids: arr
    }
  })
}

// 将获取的歌曲对象进行封装
export class SongDetail {
  constructor (songs) {
    this.id = songs[0].id
    this.name = songs[0].name
    this.album = songs[0].al.name
    this.song = songs[0].ar[0].name
    this.pic = songs[0].al.picUrl
    this.time = formDate(new Date(songs[0].dt), 'mm:ss')
  }
}
