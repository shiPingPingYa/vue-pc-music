<template>
  <div class="play-music" v-if="playList !== null" >
    <!-- 播放条上面的内容区域 -->
    <div class="top" >
      <!-- 播放内容图片 -->
      <div class="music-top-icon"
      v-if="playList[currentIndex] !== null"
      @mouseenter="isShade = true"
      @mouseleave="isShade = false"
      @click="playerShow()">
      <img :src="playList[currentIndex].pic" alt="">
      <div class="music-max" v-show="isShade">
        <img src="../../../assets/img/playmusic/max.svg" alt="">
      </div>
      </div>
      <!-- 播放内容 -->
      <div class="music-top-center"  v-if="playList[currentIndex] !== null">
        <div class="music-title">{{playList[currentIndex].title}} </div>
        <div class="music-artist">{{playList[currentIndex].artist}}</div>
      </div>
    </div>
    <!-- 播放内容区域 -->
    <player v-show="isPlayerShow" ref="player" :music="playList[currentIndex]" :lyric="lyric"></player>
    <!-- 播放条左边区域 -->
    <div class="play-music-left">
      <!-- 开始按钮 -->
      <div class="play" @click="toggle()">
         <img src="../../../assets/img/playmusic/play.png" alt v-show="!isPlayer" />
        <img src="../../../assets/img/playmusic/play2.png" alt v-show="isPlayer" />
      </div>
      <!-- 下一首按钮 -->
      <div class="next" @click="nextMusic()">
         <img src="../../../assets/img/playmusic/next.png" alt />
      </div>
    </div>
    <!-- 播放条右边区域 -->
    <div class="play-music-right" v-if="playList[currentIndex] !== null" >
      <!-- audio音频标签 -->
      <audio :src="playList[currentIndex].src"
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
        <div class="music-currtTime">{{currentTime}}/{{duration}} </div>
      </div>
      <!-- 音量 -->
      <div class="volumn">
        <div class="volumb-icon" @click="toggleVolumn">
          <img src="../../../assets/img/playmusic/volumn.svg" alt="" v-show="!isVolumn">
          <img src="../../../assets/img/playmusic/novolumn.svg" alt="" v-show="isVolumn">
        </div>
        <music-progress ref="music_volumn" @childClickScale="setVolumn"></music-progress>
      </div>
      <!-- 歌词,歌曲列表,播放顺序 -->
      <div class="music-icon">
        <!-- 播放顺序按钮 -->
        <div class="schema" @click="toggleSchema()">
          <a href="#" title="顺序播放" v-show="schemaIndex==0">
            <img src="../../../assets/img/playmusic/sunxubofang.svg" />
          </a>
          <a href="#" title="随机播放" v-show="schemaIndex==1">
            <img src="../../../assets/img/playmusic/suijibofang.svg" />
          </a>
          <a href="#" title="单曲循环" v-show="schemaIndex==2">
            <img src="../../../assets/img/playmusic/danquxunhuan.svg" />
          </a>
        </div>
        <!-- 歌词按钮 -->
        <div class="music-lyric" @click="toggleLyric()">
          <a href="#" title="歌词">
            <img src="../../../assets/img/playmusic/lyric.svg" v-show="!isLyric" />
          </a>
          <a href="#" title="歌词">
            <img src="../../../assets/img/playmusic/lyric-click.svg" v-show="isLyric" />
          </a>
        </div>
        <!-- 音乐列表按钮 -->
        <div class="music-list" @click="toggleMusicList()">
           <a href="#" title="歌单">
            <img src="../../../assets/img/playmusic/list.svg" alt />
          </a>
        </div>
      </div>
    </div>
    <!-- 播放音乐列表 -->
    <play-music-list class="play-music-list" v-show="isMusicList" :musicList="musicList"></play-music-list>
    <!-- 首页歌词 -->
    <Lyric class="play-music-lyric" :lyric="lyric" v-show="isLyric"></Lyric>
  </div>
</template>
<script>
// 导入歌曲的歌词组件
import Player from './Player'
// 导入封装的处理时间函数
import { formDate } from '../../../assets/common/tool'
// 导入歌曲网络请求
import { _getLyric } from '../../../network/detail'
// 导入进度条
import MusicProgress from './Progress'
// 导入歌词组件
import Lyric from './Lyric.vue'
// 导入播放音乐列表
import PlayMusicList from './PlayMusicList'
export default {
  name: 'PlayMusic',
  components: {
    Player,
    MusicProgress,
    Lyric,
    PlayMusicList
  },
  data () {
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
      playList: [
        {
          title: '说散就散(抖音完整版)',
          artist: 'yasenjan',
          index: '0',
          id: 1818690420,
          lrc: '',
          src:
            'http://m701.music.126.net/20210317152808/61a9701a820d92611241b8c55c207108/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/7354163734/999a/1cdf/5b29/77e0ceef7990395739432c4d77e3edf7.mp3',
          pic:
            'https://p1.music.126.net/J94zxjSMe5IjNABnpdOPew==/109951165670275788.jpg'
        }
      ]
    }
  },
  methods: {
    // 显示歌词组件
    playerShow () {
      this.isPlayerShow = !this.isPlayerShow
    },
    // 播放音乐
    toggle () {
      // 设置音量进度条
      this.$refs.music_volumn.setAudioProgress(0.8)
      // 替换图片
      this.isPlayer = !this.isPlayer
      // 判断当前音乐的状态
      if (this.isPlayer && this.$refs.audio.readyState === 4) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    // 播放音乐的位置
    audioTimeUpdate () {
      if (this.$refs.audio !== null) {
        // 获取当前正在播放的时间
        this.currentTime = formDate(new Date(this.$refs.audio.currentTime * 1000), 'mm:ss')
        // 获取总时长
        this.duration = formDate(new Date(this.$refs.audio.duration * 1000), 'mm:ss')
        // 获取比例
        var scale = this.$refs.audio.currentTime / this.$refs.audio.duration
        // 设置比例
        this.$refs.music_pro.setAudioProgress(scale)
        // 判断歌曲是否正在播放
      }
    },
    // 音乐停止了
    musicPause () {
      this.isPlayer = false
      // 切换歌词组件的isPlayer,滚动图片
      if (this.$refs.player !== null) this.$refs.player.isPlayer = false
    },
    // 音乐因缓存停止,或停止后已就绪时触发。
    musicPlaying () {
      this.isPlayer = true
      this.$bus.$emit(
        'Playing',
        this.playList[this.currentIndex].index,
        this.path
      )
      if (this.$refs.player !== null) this.$refs.player.isPlayer = true
    },
    // 音乐播放完毕
    musicEnded () {
      switch (this.schemaIndex) {
        case 0:
          this.currentIndex = (this.currentIndex >= this.playList.length - 1 ? 0 : this.currentIndex++)
          break
        case 1:
          this.currentIndex = Math.floor(Math.random() * this.playList.length)
          break
        case 3:
          break
      }
    },
    // 加载播放音频
    async playLoad () {
    // 获取歌词
      await _getLyric(this.playList[this.currentIndex].id).then(res => {
        this.lyric = res.data.lrc.lyric
      })
    },
    // 音乐获取失败
    musicErr () {
      this.$message.error('当前音频不可用')
      // this.currentIndex++
    },
    // 通过改变schema的值来实现音乐播放顺序设置
    toggleSchema () {
      if (this.schemaIndex >= 2) this.schemaIndex = 0
      else { this.schemaIndex++ }
    },
    // 是否在首页显示歌词
    toggleLyric () {
      this.isLyric = !this.isLyric
    },
    // 是否在首页显示音乐列表
    toggleMusicList () {
      this.isMusicList = !this.isMusicList
    },
    // 设置歌曲播放的声音
    setVolumn (scale) {
      this.$refs.audio.volumn = scale
    },
    // 设置进度条的点击，歌曲时间对应跳转
    setMusicProgress (scale) {
      this.$refs.audio.currentTime = scale * this.$refs.audio.duration
      console.log(this.$refs.audio.currentTime + '----' + scale)
    },
    // 设置音乐音量
    toggleVolumn () {
      this.isVolumn = !this.isVolumn
      // 音量 == 0
      if (this.isVolumn) {
        this.$refs.audio.volume = 0.0
        this.$refs.music_volumn && this.$refs.music_volumn.setAudioProgress(0.0)
      } else {
        // 音量不为 == 0
        this.$refs.audio.volume = 0.8
        this.$refs.music_volumn && this.$refs.music_volumn.setAudioProgress(0.8)
      }
    },
    // 切换下一首音乐
    nextMusic () {
      // 判断播放音乐是否存在
      if (this.currentIndex >= this.playList.length - 1) this.currentIndex = 0
      else this.currentIndex++
      this.$refs.audio.src = this.playList[this.currentIndex].src
    }
  }

}
</script>
<style lang="less" scoped>
.play-music{
  position: relative;
  width: 100%;
  height: 58px;
  background-color: #212124;
  z-index: 3;
  bottom: 0;
  >  .top{
    position: absolute;
    left: 0;
    bottom: 58px;
    width: 18%;
    height: 100%;
    display: flex;
    background: #191b1f;
    z-index: 1;
  }
  > .play-music-left{
    float: left;
    width: 15%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    > div{
      cursor: pointer;
    }
    > .play{
      width: 50px;
      height: 50px;
      > img{
        width: 100%;
        height: 100%;
      }
    }
  }
  > .play-music-right{
    float: right;
    width: 85%;
    height: 100%;
    > .music-progress{
    float: left;;
    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;
    text-align: center;
    > .music-currtTime{
      width: 100px;
      color: #fff;
    }
    > .music-progress-children{
      flex: 1;
    }
    }
    > .volumn{
      float: left;
      width: 10%;
      height: 100%;
      display: flex;
      align-items: center;
      user-select: none;
    }
    > .music-icon{
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
  > .play-music-lyric{
    position: absolute;
    margin: auto;
    bottom: 60px;
    left: 50%;
    right: 50%;
    width: 460px;
    height: 30px;
    z-index: 100;

  }
  > .play-music-list{
    position: absolute;
    bottom: 58px;
    right: 0;
  }
}

.volumb-icon{
  cursor: pointer;
  > img{
  margin-right: 10px;
  width: 16px;
  }
}

.schema{
  width: 30px;
  img{
   width: 20px;
   height: 20px;
  }
}

.music-lyric{
  width: 20px;
  img{
    width: 20px;
    height: 20px;
    background-size: 100%,100%;
  }
}

.music-list{
  width: 20px;
  img{
    width: 20px;
    height: 20px;
    background-size: 100%,100%;
  }
}

.music-top-icon{
  height: 100%;
  cursor: pointer;
  img{
    height: 100%;
  }
  > .music-max{
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
  color: #fff;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  > .music-title{
    position: absolute;
    top: 0;
  }
  > .music-artist{
    position: absolute;
    bottom: 0;
  }
}
</style>
