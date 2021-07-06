// 处理用户关注动态
export class AttentionDynamic {
  constructor (obj) {
    this.userimg = obj.user.avatarUrl
    this.name = obj.user.nickname
    this.title = (JSON.parse(obj.json).msg || '')
    this.Info = JSON.parse(obj.json)
    this.smallImg = (obj.user.avatarDetail !== null ? obj.user.avatarDetail.identityIconUrl : '')
    this.eventTime = obj.eventTime
    this.pics = obj.pics
    this.ids = this.getDynamicId(JSON.parse(obj.json))
    this.contentImg = this.getContentImg(JSON.parse(obj.json))
    this.contentTitle = this.getContentTitle(JSON.parse(obj.json))
  }

  // 判断发送的什么内容
  getDynamicId (item) {
    if (item.playlist === undefined && item.song === undefined && item.mv === undefined) {
      return false
    } else {
      if (item.playlist !== undefined) {
        return { id: item.playlist.id, type: '歌单' }
      } else if (item.song !== undefined) {
        return { id: item.song.id, type: '歌曲' }
      } else if (item.mv !== undefined) {
        return { id: item.mv.id, type: 'mv' }
      }
    }
  }

  // 获取分享的歌曲或者歌单等的图片
  getContentImg (item) {
    if (item.playlist !== undefined) {
      return item.playlist.coverImgUrl + '?param=50y50' // 限制图片高度
    } else if (item.song !== undefined) {
      return item.song.album.picUrl + '?param=50y50'
    }
  }

  // 获取分享的歌曲或者歌单等的标题
  getContentTitle (item) {
    if (item.playlist !== undefined) {
      return item.playlist.name
    } else if (item.song !== undefined) {
      return item.song.name
    }
  }
}

// 处理歌曲
export class DynamicMusic {
  constructor (obj) {
    this.id = obj.id
    this.title = obj.name
    this.name = obj.artists[0].name
    this.cover = obj.img80x80
  }
}

// 处理转发内容
// export class TransmitContent(){
//   constructor(obj){

//   }
// }

// 处理用户关注
export class Aollows {
  constructor (obj) {
    this.id = obj.userId
    this.name = obj.nickname
    this.title = (obj.signature !== null ? obj.signature : '')
    this.cvip = obj.vipType
    this.followeds = obj.followeds
    this.songList = obj.playlistCount
    this.icon = (obj.avatarDetail !== null ? obj.avatarDetail.identityIconUrl : '')
    this.userImg = obj.avatarUrl
  }
}
