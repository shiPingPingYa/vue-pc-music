<template>
  <div class="new-songs">
    <div class="top">最新音乐</div>
    <div class="content" v-if="newMusicList.length">
      <div class="item" v-for="(item, index) in newMusicList" :key="index" @dblclick="handleMusicItemClick(index)">
        <div class="number">{{index+1}} </div>
        <div class="title">
          <img src='' :data-src="item.picUrl + '?param=70y70'" alt="" v-imgLazy>
          <div class="icon">
            <i class="el-icon-video-play"></i>
          </div>
        </div>
        <div class="mess">
          <div>{{item.name}} </div>
          <div class="bottom">
            {{item.song.album.company}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mixinsPlayMusic } from '@/mixins/mixinsPlayMusic';
import { _getSongsDetail } from '@/network/detail';
import { _getNewSong } from '@/network/discover';

import { formDate } from '@/assets/common/tool';
export default {
  name: 'newMusicList',
  data() {
    return {
      musicList: [],
      newMusicList: [],
    };
  },
  mixins: [mixinsPlayMusic],
  created() {
    this.initNewSongList();
  },
  methods: {
    async initNewSongList() {
      const {
        data: { result, code },
      } = await _getNewSong();
      if (code == 200) {
        this.newMusicList = result;
      }
    },
    //播放音乐
    async handleMusicItemClick(index) {
      this.musicList = [];
      // 拼接歌曲id
      const ids = this.newMusicList.map(item => item.id).join(',');
      // 根据歌曲的id获取音乐详细信息
      const {
        data: { songs },
      } = await _getSongsDetail(ids);
      // 处理音乐播放列表(需要音乐id，歌曲名字，专辑名字，歌手名，歌曲背景图片，歌曲时间)
      this.musicList = songs.map(item => {
        return {
          id: item.id,
          name: item.name,
          album: item.al.name,
          song: item.ar[0].name,
          pic: item.al.picUrl,
          time: formDate(new Date(item.dt), 'mm:ss'),
        };
      });
      this.playMusic(index);
    },
  },
};
</script>
<style lang="less" scoped>
  .new-songs {
    margin-top: 20px;
    width: 100%;
    height: 100%;
    > .top {
      line-height: 30px;
      font-size: 16px;
      color: #01060a;
      border-bottom: 1px solid #b8b6b6;
    }
    > .content {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
  }

  .item {
    display: flex;
    margin-top: 10px;
    padding-top: 10px 10px;
    width: 45%;
    height: 70px;
    cursor: pointer;
    > .number {
      width: 40px;
      height: 70px;
      line-height: 70px;
      text-align: center;
      font-size: 13px;
      color: #a7aaa3;
    }
    > .title {
      position: relative;
      height: 100%;
      > img {
        height: 100%;
      }
      > .icon {
        position: absolute;
        margin: auto;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 18px;
        height: 18px;
        font-size: 24px;
        background-color: rgba(0, 0, 0, 0.3);
        color: #ffff;
      }
    }
    > .mess {
      position: relative;
      margin-left: 10px;
      flex: 1;
      font-size: 13px;
      color: #01060a;
      > .bottom {
        position: absolute;
        margin-top: 6px;
      }
    }
  }
</style>
