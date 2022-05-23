<template>
  <div class="app-footer play-music" v-if="playList !== null">
    <!-- 播放条上面的内容区域 -->
    <div class="top">
      <!-- 播放内容图片 -->
      <div class="music-top-icon" v-if="playList[currentIndex] !== null" @mouseenter="isShade = true" @mouseleave="isShade = false" @click="playerShow()">
        <img :src="playList[currentIndex].pic" alt="" />
        <div class="music-max" v-show="isShade">
          <img src="@/assets/img/playmusic/max.svg" alt="" />
        </div>
      </div>
      <!-- 播放内容 -->
      <div class="music-top-center" v-if="playList[currentIndex] !== null">
        <div class="music-title">{{ playList[currentIndex].title }}</div>
        <div class="music-artist">{{ playList[currentIndex].artist }}</div>
      </div>
    </div>
    <!-- 播放内容区域 -->
    <player v-show="isPlayerShow" ref="player" :music="playList[currentIndex]" :lyric="lyric"></player>
    <!-- 播放条左边区域 -->
    <div class="play-music-left">
      <!-- 开始按钮 -->
      <div class="play" @click="toggle()">
        <i :class="!isPlayer ? 'el-icon-video-play' : 'el-icon-video-pause'"></i>
      </div>
      <!-- 下一首按钮 -->
      <div class="next" @click="nextMusic()">
        <i class="el-icon-caret-right"></i>
      </div>
    </div>
    <!-- 播放条右边区域 -->
    <div class="play-music-right" v-if="playList[currentIndex] !== null">
      <!-- audio音频标签 -->
      <audio
        :src="playList[currentIndex].src"
        autoplay
        ref="audio"
        @timeupdate="audioTimeUpdate()"
        @pause="musicPause()"
        @play="playLoad()"
        @ended="musicEnded()"
        @playing="musicPlaying()"
        @error="musicErr()"
      ></audio>
      <!-- 进度条 -->
      <div class="music-progress">
        <music-progress ref="music_pro" class="music-progress-children" @childClickScale="setMusicProgress"></music-progress>
        <div class="music-currtTime">{{ currentTime }}/{{ duration }}</div>
      </div>
      <!-- 音量 -->
      <div class="volumn">
        <div class="volumb-icon" @click="toggleVolumn">
          <img :src="!isVolumn ? volumnIcon : noVolumnIcon" alt="" />
        </div>
        <music-progress ref="music_volumn" @childClickScale="setVolumn"></music-progress>
      </div>
      <!-- 歌词,歌曲列表,播放顺序 -->
      <div class="music-icon">
        <!-- 播放顺序按钮 -->
        <div class="schema" @click="schemaIndex >= 3 ? (schemaIndex = 0) : schemaIndex++">
          <a href="#" :title="currentPlayImg.title">
            <img :src="currentPlayImg.img" />
          </a>
        </div>
        <!-- 歌词按钮 -->
        <div class="music-lyric" @click="isLyric = !isLyric">
          <a href="javascript:;" title="歌词">
            <img :src="!isLyric ? lyricIcon : cLyricIcon" />
          </a>
        </div>
        <!-- 音乐列表按钮 -->
        <div class="music-list" @click="toggleMusicList()">
          <a href="javascript:;" title="歌单">
            <img src="@/assets/img/playmusic/list.svg" alt />
          </a>
        </div>
      </div>
    </div>
    <!-- 播放音乐列表 -->
    <play-music-list class="play-music-list" v-show="isMusicList" :musicList="musicList"></play-music-list>
    <!-- 首页歌词 -->
    <Lyric ref="lyric" class="play-music-lyric" :lyric="lyric" v-show="isLyric"></Lyric>
  </div>
</template>
<script>
import { _getLyric, _getIntelligenceList, _getSongsDetail, AllSongDetail, _getMusicUrl } from '@/network/detail';
import { formDate } from '@/assets/common/tool';
import { PlayList } from './components/playList';
import Player from './components/Player';
import MusicProgress from './components/Progress';
import Lyric from './components/Lyric.vue';
import PlayMusicList from './components/PlayMusicList';
export default {
  name: 'playMusic',
  components: {
    Player,
    MusicProgress,
    Lyric,
    PlayMusicList
  },
  data() {
    return {
      // 歌曲图片是否显示
      isShade: false,
      // 歌曲歌词组件是否显示
      isPlayerShow: false,
      isPlayer: false,
      // 音量小图标是否显示
      isVolumn: false,
      // 是否显示歌词
      isLyric: false,
      // 是否显示音乐列表
      isMusicList: false,
      schemaIndex: 0,
      currentIndex: 0,
      // 剩余播放时间
      currentTime: '00:00',
      // 总时长
      duration: '00:00',
      path: '',
      // 歌词
      lyric: '',
      // 处理好的歌曲信息
      musicList: [],
      lyricIcon: require('assets/img/playmusic/lyric.svg'),
      cLyricIcon: require('assets/img/playmusic/lyric-click.svg'),
      volumnIcon: require('assets/img/playmusic/volumn.svg'),
      noVolumnIcon: require('assets/img/playmusic/novolumn.svg'),
      playIcon: require('assets/img/playmusic/sunxubofang.svg'),
      playIcon1: require('assets/img/playmusic/suijibofang.svg'),
      playIcon2: require('assets/img/playmusic/danquxunhuan.svg'),
      playIcon3: require('assets/img/heart.svg'),
      playList: [
        {
          title: '南 海 花 痴（PLUS版） ',
          artist: 'UmzBeatz',
          index: 0,
          id: 1430989428,
          src: '',
          pic: 'https://p2.music.126.net/VLgHixU0mvXYvnL8hi_l0A==/109951164804177794.jpg'
        }
      ]
    };
  },
  computed: {
    currentPlayImg() {
      if (this.schemaIndex === 0) {
        return { img: this.playIcon, title: '顺序播放' };
      } else if (this.schemaIndex === 1) {
        return { img: this.playIcon1, title: '随机播放' };
      } else if (this.schemaIndex === 2) {
        return { img: this.playIcon2, title: '单曲循环' };
      } else return { img: this.playIcon3, title: '心动模式' };
    }
  },
  mounted() {
    // 音乐数据
    this.$bus.$on('PlayMusic', (index, path, musicList, playList) => {
      // 存储歌单路由
      this.$store.commit('addSongListPath', path);
      if (this.playList.length !== 0) this.playList = [];
      this.path = path;
      this.musicList = musicList;
      this.playList = playList;
      // 设置index
      this.setCurrentIndex(index);
      this.$refs.music_volumn.setAudioProgress(0.8);
    });
    // 监听歌曲列表的点击,设置index,修改播放音乐
    this.$bus.$on('playMusicListItem', index => {
      this.setCurrentIndex(index);
    });
    // 播放视频的时候，停止音乐播放
    this.$bus.$on('stopMusic', flag => {
      this.stopMusic(flag);
    });
    this.initHomeMusic();
  },
  methods: {
    // 修改首页默认播放音乐的url地址(但是不能自动播放了，因为现在浏览器都是禁止了自动播放音乐，必须要用户主动触发)
    async initHomeMusic() {
      const {
        data: {
          data: [data]
        }
      } = await _getMusicUrl(this.playList[0].id);
      this.playList[0].src = data.url;
    },
    // 改变currentindex,重新设置播放音乐
    setCurrentIndex(index) {
      this.playList.some((item, i) => {
        if (item.index === index) {
          return (this.currentIndex = i);
        }
      });
    },
    // 显示歌词组件
    playerShow() {
      this.isPlayerShow = !this.isPlayerShow;
    },
    // 播放音乐
    toggle() {
      // 设置音量进度条
      this.$refs.music_volumn.setAudioProgress(0.8);
      // 替换图片
      this.isPlayer = !this.isPlayer;
      // 判断当前音乐的状态
      if (this.isPlayer && this.$refs.audio.readyState === 4) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
    // 播放视频的时候停止播放音乐
    stopMusic(flag) {
      // 音乐处于播放状态
      if (this.isPlayer && this.$refs.audio.readyState === 4) {
        // 切换播放值和图片
        this.isPlayer = flag;
        // 停止播放音乐
        this.$refs.audio.pause();
      }
    },
    // 播放音乐的位置
    audioTimeUpdate() {
      if (this.$refs.audio !== null) {
        // 获取当前正在播放的时间
        this.currentTime = formDate(new Date(this.$refs.audio.currentTime * 1000), 'mm:ss');
        // 获取总时长
        this.duration = formDate(new Date(this.$refs.audio.duration * 1000), 'mm:ss');
        // 获取比例
        var scale = this.$refs.audio.currentTime / this.$refs.audio.duration;
        // 设置比例
        this.$refs.music_pro.setAudioProgress(scale);

        // 滚动歌词,播放时间不能为空
        if (this.$refs.audio.currentTime !== null) {
          // 首页歌词
          this.$refs.lyric.scrollLyric(this.$refs.audio.currentTime);
          // 播放页面歌词
          this.$refs.player.$refs.playerLyric.maxScroll(this.$refs.audio.currentTime);
        }
      }
    },
    // 音乐停止了
    musicPause() {
      this.isPlayer = false;
      // 切换歌词组件的isPlayer,滚动图片
      if (this.$refs.player !== null) this.$refs.player.isPlayer = false;
    },
    // 音乐因缓存停止,或停止后已就绪时触发。
    musicPlaying() {
      this.isPlayer = true;
      // 触发播放方法，把下标传递过去
      this.$bus.$emit('Playing', this.path, this.playList[this.currentIndex].index);
      // 触发评论内容方法
      // this.$bus.$emit('changeRecommends', this.playList[this.currentIndex].id)
      if (this.$refs.player !== null) this.$refs.player.isPlayer = true;
    },
    // 音乐播放完毕
    musicEnded() {
      // 判断播放音乐是否存在
      if (this.currentIndex >= this.playList.length - 1) {
        this.currentIndex = 0;
      } else {
        switch (this.schemaIndex) {
          case 0:
            this.currentIndex++;
            break;
          case 1:
            this.currentIndex = Math.floor(Math.random() * this.playList.length);
            break;
          case 2:
            break;
          case 3:
            this.playModeIntellgence();
            break;
        }
        this.$refs.audio.src = this.playList[this.currentIndex].src;
      }
    },
    // 加载播放音频
    async playLoad() {
      // 设置音量进度条
      this.$refs.music_volumn.setAudioProgress(0.8);
      // 获取歌词
      await _getLyric(this.playList[this.currentIndex].id).then(res => {
        try {
          this.lyric = res.data.lrc.lyric;
        } catch (e) {
          this.lyric = '暂无歌词';
          console.log(e);
        }
      });
    },
    // 音乐获取失败
    musicErr() {
      this.$message.error('当前音频不可用');
      // this.currentIndex++
    },
    // 是否在首页显示音乐列表
    toggleMusicList() {
      this.isMusicList = !this.isMusicList;
    },
    // 设置歌曲播放的声音
    setVolumn(scale) {
      this.$refs.audio.volume = scale;
    },
    // 设置进度条的点击，歌曲时间对应跳转
    setMusicProgress(scale) {
      this.$refs.audio.currentTime = scale * this.$refs.audio.duration;
    },
    // 设置音乐音量
    toggleVolumn() {
      this.isVolumn = !this.isVolumn;
      // 音量 == 0
      if (this.isVolumn) {
        this.$refs.audio.volume = 0.0;
        this.$refs.music_volumn && this.$refs.music_volumn.setAudioProgress(0.0);
      } else {
        // 音量不为 == 0
        this.$refs.audio.volume = 0.8;
        this.$refs.music_volumn && this.$refs.music_volumn.setAudioProgress(0.8);
      }
    },
    // 切换下一首音乐
    nextMusic() {
      // 判断播放音乐是否存在
      if (this.currentIndex >= this.playList.length - 1) {
        this.currentIndex = 0;
      } else {
        switch (this.schemaIndex) {
          case 0:
            this.currentIndex++;
            break;
          case 1:
            this.currentIndex = Math.floor(Math.random() * this.playList.length);
            break;
          case 2:
            break;
          case 3:
            this.playModeIntellgence();
            break;
        }
        this.$refs.audio.src = this.playList[this.currentIndex].src;
      }
    },
    // 心动模式
    async playModeIntellgence() {
      const params = {
        pid: localStorage.getItem('pid'),
        id: this.playList[this.currentIndex].id
      };
      const {
        data: { data }
      } = await _getIntelligenceList(params);
      // 音乐id
      const ids = data
        .slice(0, 60)
        .map(item => item.id)
        .join(',');
      const mulistItem = this.musicList[this.currentIndex];
      const playListItem = this.playList[this.currentIndex];
      this.musicList = [];
      this.playList = [];
      this.playList.push(playListItem);
      this.musicList.push(mulistItem);
      try {
        const {
          data: { data: musicUrlList }
        } = await _getMusicUrl(ids);
        const {
          data: { songs }
        } = await _getSongsDetail(ids);
        songs.forEach(item => this.musicList.push(new AllSongDetail(item)));
        if (songs.length === this.musicList.length) {
          this.musicList.forEach((item, index) => {
            if (Number(index) >= 1) {
              this.playList.push(new PlayList(index + 1, item, musicUrlList[index].url, item.id));
            }
          });
        }
      } catch (e) {
        console.log(e);
      }
      this.currentIndex = 1;
      this.schemaIndex = 0;
    }
  }
};
</script>
<style lang="less" scoped>
.play-music {
  position: relative;
  width: 100%;
  height: 58px;
  background-color: #a3b2b8;
  z-index: 3;
  bottom: 0;
  user-select: none;
  > .top {
    position: absolute;
    left: 0;
    bottom: 58px;
    width: 18%;
    height: 100%;
    display: flex;
    color: #000a0d;
    background: #f0f0f8;
    z-index: 1;
  }
  > .play-music-left {
    float: left;
    width: 15%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: rgb(103, 197, 235);
    > div {
      font-size: 46px;
      cursor: pointer;
    }
    > .play {
      width: 50px;
      height: 50px;
      font-size: 38px !important;
    }
  }
  > .play-music-right {
    float: right;
    width: 85%;
    height: 100%;
    > .music-progress {
      float: left;
      width: 70%;
      height: 100%;
      display: flex;
      align-items: center;
      text-align: center;
      > .music-currtTime {
        width: 100px;
        color: #fff;
      }
      > .music-progress-children {
        flex: 1;
      }
    }
    > .volumn {
      float: left;
      width: 10%;
      height: 100%;
      display: flex;
      align-items: center;
      user-select: none;
    }
    > .music-icon {
      float: left;
      padding: 0 20px;
      margin-left: 1%;
      width: 19%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
  > .play-music-lyric {
    position: absolute;
    margin: auto;
    bottom: 60px;
    left: 50%;
    right: 50%;
    width: 460px;
    height: 30px;
    z-index: 100;
  }
  > .play-music-list {
    position: absolute;
    bottom: 60px;
    right: 2px;
  }
}

.volumb-icon {
  cursor: pointer;
  > img {
    margin-right: 10px;
    width: 16px;
  }
}

.schema {
  width: 30px;
  img {
    width: 20px;
    height: 20px;
  }
}

.music-lyric {
  width: 20px;
  img {
    width: 20px;
    height: 20px;
    background-size: 100%, 100%;
  }
}

.music-list {
  width: 20px;
  img {
    width: 20px;
    height: 20px;
    background-size: 100%, 100%;
  }
}

.music-top-icon {
  height: 100%;
  cursor: pointer;
  img {
    height: 100%;
  }
  > .music-max {
    position: relative;
    bottom: 61px;
    width: 58px;
    height: 100%;
    z-index: 4;
    background: rgba(0, 0, 0, 0.4);
  }
}

.music-top-center {
  position: relative;
  left: 5px;
  width: 120px;
  font-size: 12px;
  color: #000a0d;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  > .music-title {
    position: absolute;
    top: 0;
  }
  > .music-artist {
    position: absolute;
    bottom: 0;
  }
}
</style>
