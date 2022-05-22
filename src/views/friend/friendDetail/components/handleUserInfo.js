import { formDate } from '@/assets/common/tool';
// 处理用户关注动态
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
    if (item.playlist !== undefined) {
      return item.playlist.coverImgUrl + '?param=50y50'; // 限制图片高度
    } else if (item.song !== undefined) {
      return item.song.album.picUrl + '?param=50y50';
    }
  }

  // 获取分享的歌曲或者歌单等的标题
  getContentTitle(item) {
    if (item.playlist !== undefined) {
      return item.playlist.name;
    } else if (item.song !== undefined) {
      return item.song.name;
    }
  }
}

// 处理歌曲
export class DynamicMusic {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.name;
    this.name = obj.artists[0].name;
    this.cover = obj.img80x80;
  }
}

// 处理转发内容
// export class TransmitContent(){
//   constructor(obj){

//   }
// }

// 处理用户关注
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

// 处理用户发送动态
// 18 分享单曲
// 19 分享专辑
// 17、28 分享电台节目
// 22 转发
// 39 发布视频
// 35、13 分享歌单
// 24 分享专栏文章
// 41、21 分享视频

/**
 * @type  转发类型
 * @eventTime 转发时间
 * @pics 转发动态下面的图片
 * @msg 转发内容的标题
 */
export class UserSendEvent {
  constructor(obj) {
    this.type = this.setShareType(obj.type);
    this.eventTime = formDate(obj.eventTime);
    // this.pics =
    this.msg = this.filterEvent(obj);
  }

  setShareType(type) {
    switch (type) {
      case 18:
        return '分享单曲';
      case 19:
        return '分享专辑';
      case 17 && 18:
        return '分享电台节目';
      case 22:
        return '转发';
      case 39:
        return '发布视频';
      case 35 && 13:
        return '分享歌单';
      case 24:
        return '分享专栏文章';
      case 41 && 21:
        return '分享视频';
    }
  }

  // 过滤用户动态，动态有很多层
  filterEvent(obj) {
    if (obj.json !== undefined) {
      console.log(obj);
    }
  }
}
