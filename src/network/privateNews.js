import {
  request
} from './request'
import {
  formDate
} from '../assets/common/tool'

/**
 * @description 获取私信
 * @param limit 数量，默认30
 * @param offset 偏移位
 */
export function _getPrivateMsg (params) {
  return request({
    url: '/msg/private',
    params
  })
}

/**
 * @description 获取私信评论
 * @param uid 用户id
 * @param before 取上一页最后一个歌单的 updateTime 获取下一页数据
 */
export function _getPrivateComments (params) {
  return request({
    url: '/msg/comments',
    params
  })
}

/**
 * @description 获取@我
 * @param limit 数量，默认30
 * @offset 偏移位
 */
export function _getPrivateMe (params) {
  return request({
    url: '/msg/forwards',
    params
  })
}

/**
 * @description 获取通知数据
 * @param limit 数量默认30
 * @lasttime 上一页最后一条数据的time
 */
export function _getPrivateNotices (params) {
  return request({
    url: '/msg/notices',
    params
  })
}

/**
 * @description 获取私信内容
 * @param uid 用户id
 * @param limit 取出数量默认30
 * @param before : 分页参数,取上一页最后一项的 time 获取下一页数据
 */
export function _getPrivateHistoryNews (params) {
  return request({
    url: '/msg/private/history',
    params
  })
}

export class HandlePrivateMsg {
  constructor (obj) {
    this.lasttime = obj.lastMsgTime
    this.userName = obj.fromUser.nickname
    this.userId = obj.fromUser.userId
    // 对话框里的历史私信
    this.initPrivateMsg(obj)
  }

  initPrivateMsg (obj) {
    this.avatarurl = obj.fromUser.avatarUrl
    this.title = JSON.parse(obj.lastMsg).msg
  }
}

export class HandlePrivateNotices {
  constructor (obj) {
    this.id = obj.id
    this.userId = obj.userId
    this.lasttime = obj.time
    this.initPrivateNotices(JSON.parse(obj.notice))
  }

  initPrivateNotices (obj) {
    // 通过type来判断是什么通知，2：歌单，6:评论
    this.type = obj.type
    if (this.type === 10) {
      this.title = obj.generalNotice.actionDesc
      this.content = obj.generalNotice.content
      this.nickname = obj.user.nickname
      this.avatarUrl = obj.user.avatarUrl
    } else if (this.type === 6) {
      this.content = obj.comment.content
      this.nickname = obj.user.nickname
      this.threadId = obj.comment.threadId
      this.avatarUrl = obj.user.avatarUrl
      this.title = '攒了你的评论'
    } else if (this.type === 2) {
      this.nickname = obj.user.nickname
      this.avatarUrl = obj.user.avatarUrl
      this.content = '[' + obj.playlist.name + ']'
      this.title = '收藏了你的歌单'
      this.threadId = obj.playlist.id
    }
  }
}

export class HandlePrivateComments {
  constructor (obj) {
    this.userId = obj.user.userId
    this.lasttime = obj.time
    this.title = obj.content
    this.content = obj.beRepliedContent
    this.nickname = obj.user.nickname
    this.avatarUrl = obj.user.avatarUrl
  }
}

export class HandlePrivateHistory {
  constructor (obj) {
    this.nickname = obj.fromUser.nickname
    this.avatarUrl = obj.fromUser.avatarUrl
    this.time = obj.time
    this.userId = obj.fromUser.userId
    // 分享动态标题，分享动态图片，标题，内容
    this.handleMsg(JSON.parse(obj.msg))
  }

  handleMsg (obj) {
    // 这里的23是网易的分享的歌手动态，12是活动之类的，1：单曲，7：mv或者视频，2：专辑
    switch (obj.type) {
      case 23:
        this.type = obj.type
        this.shareTitle = obj.msg
        this.title = (obj.generalMsg.noticeMsg || obj.generalMsg.title || '')
        this.userImage = obj.generalMsg.cover
        this.tag = obj.generalMsg.tag
        break
      case 12:
        this.type = obj.type
        this.shareTitle = obj.msg
        this.title = obj.title
        this.userImage = obj.promotionUrl.coverUrl
        break
      case 1:
        this.type = obj.type
        this.shareTitle = obj.msg
        this.text = obj.title
        this.title = obj.song.name
        this.userImage = obj.song.album.blurPicUrl
        this.id = obj.song.id
        break
      case 2:
        this.type = obj.type
        this.shareTitle = obj.msg
        this.title = obj.album.name
        this.userImage = obj.album.blurPicUrl
        this.id = obj.album.id
        break
      case 7:
        this.type = obj.type
        this.shareTitle = obj.msg
        this.userImage = obj.mv.imgurl
        this.text = obj.title
        this.tag = 'mv'
        this.contentTitle = `${obj.mv.name}-${this.nickname}`
        this.playCount = '播放' + Math.round(obj.mv.playCount / 10000) + '万'
        this.duration = formDate(new Date(obj.mv.duration), 'mm:ss')
        this.mvId = obj.mv.id
        break
    }
  }
}
