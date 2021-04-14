// 处理用户关注动态
export class AttentionDynamic {
  constructor (obj) {
    this.userimg = obj.user.avatarUrl
    this.name = obj.user.nickname
    this.title = (JSON.parse(obj.json).msg || '')
    this.Info = JSON.parse(obj.json)
    this.smallImg = (obj.user.avatarDetail !== null ? obj.user.avatarDetail.identityIconUrl : '')
    this.eventTime = obj.eventTime
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
