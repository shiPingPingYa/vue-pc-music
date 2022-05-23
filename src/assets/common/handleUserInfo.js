import { formDate } from '@/assets/common/tool';
const shareTypeMap = {
  13: '分享歌单',
  17: '分享电台节目',
  18: '分享单曲',
  19: '分享专辑',
  21: '分享视频',
  22: '转发',
  24: '分享专栏文章',
  35: '分享歌单',
  39: '发布视频',
  41: '分享视频'
};
/**
 * @description 处理用户发表的动态消息
 */
export class AttentionDynamic {
  constructor(obj) {
    this.userimg = obj.user.avatarUrl;
    this.name = obj.user.nickname;
    this.title = JSON.parse(obj.json).msg || '';
    this.Info = JSON.parse(obj.json);
    this.smallImg = obj.user.avatarDetail !== null ? obj.user.avatarDetail.identityIconUrl : '';
    this.eventTime = obj.eventTime;
    this.pics = obj.pics;
    this.ids = this.getDynamicId(JSON.parse(obj.json));
    this.contentImg = this.getContentImg(JSON.parse(obj.json));
    this.contentTitle = this.getContentTitle(JSON.parse(obj.json));
  }

  // 判断发送的什么内容
  getDynamicId(item) {
    if (item.playlist === undefined && item.song === undefined && item.mv === undefined) {
      return false;
    } else {
      if (item.playlist !== undefined) {
        return { id: item.playlist.id, type: '歌单' };
      } else if (item.song !== undefined) {
        return { id: item.song.id, type: '歌曲' };
      } else if (item.mv !== undefined) {
        return { id: item.mv.id, type: 'mv' };
      }
    }
  }

  // 获取分享的歌曲或者歌单等的图片
  getContentImg(item) {
    // 限制图片高度
    if (item.playlist !== undefined) return `${item.playlist.coverImgUrl}?param=50y50`;
    else if (item.song !== undefined) return `${item.song.album.picUrl}?param=50y50`;
  }

  // 获取分享的歌曲或者歌单等的标题
  getContentTitle(item) {
    if (item.playlist !== undefined) return item.playlist.name;
    else if (item.song !== undefined) return item.song.name;
  }
}

/**
 * @description 处理歌曲
 */
export class DynamicMusic {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.name;
    this.name = obj.artists[0].name;
    this.cover = obj.img80x80;
  }
}

/**
 * @description 处理用户关注
 */
export class Aollows {
  constructor(obj) {
    this.id = obj.userId;
    this.name = obj.nickname;
    this.title = obj.signature !== null ? obj.signature : '';
    this.cvip = obj.vipType;
    this.followeds = obj.followeds;
    this.songList = obj.playlistCount;
    this.icon = obj.avatarDetail !== null ? obj.avatarDetail.identityIconUrl : '';
    this.userImg = obj.avatarUrl;
  }
}

/**
 * @type  转发类型
 * @eventTime 转发时间
 * @pics 转发动态下面的图片
 * @msg 转发内容的标题
 */
export class UserSendEvent {
  constructor(obj) {
    this.type = shareTypeMap[obj.type];
    this.eventTime = formDate(obj.eventTime);
  }
}
