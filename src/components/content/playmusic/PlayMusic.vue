<template>
  <div class="play-music" v-if="playList !== null">
    <!-- 播放条上面的内容区域 -->
    <div class="top">
      <!-- 播放内容图片 -->
      <div class="music-top-icon" v-if="playList[currentIndex] != null"
      @mouseenter="isShade = true"
      @mouseleave="isShade = false"
      @click="playerShow()">
      <img :src="playList[currentIndex].pic" alt="">
      <div class="music-max" v-show="isShade">
        <img src="../../../assets/img/playmusic/max.svg" alt="">
      </div>
      </div>
      <!-- 播放内容 -->
      <div class="music-top-center" v-if="playList[currentIndex] !=null">
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
    <div class="play-music-right" v-if="playList[currentIndex] !=null">
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
      <div class="music-progress"></div>
      <!-- 音量 -->
      <div class="volumn"></div>
      <!-- 歌词,歌曲列表,播放顺序 -->
      <div class="music-icon"></div>
    </div>
    <!-- 播放音乐列表 -->
  </div>
</template>
<script>
// 导入歌曲的歌词组件
import Player from './Player'
// 导入封装的处理时间函数
import { formDate } from '../../../assets/common/tool'
// 导入歌曲网络请求
import { _getLyric } from '../../../network/detail'
export default {
  name: 'PlayMusic',
  components: {
    Player
  },
  data () {
    return {
      // 歌曲图片是否显示
      isShade: false,
      // 歌曲歌词组件是否显示
      isPlayerShow: false,
      isPlayer: false,
      schemaIndex: 0,
      currentIndex: 0,
      // 剩余播放时间
      currentTime: '00:00',
      // 总时长
      duration: '00:00',
      path: '',
      // 歌词
      lyric: '',
      musicList: [],
      playList: [
        {
          title: '说散就散(抖音完整版)',
          artist: 'yasenjan',
          index: '0',
          id: 1818690420,
          lrc: '',
          src:
            'http://m701.music.126.net/20210316010850/57847cd6cb0f758b1bf7769b3c257e00/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/7354163734/999a/1cdf/5b29/77e0ceef7990395739432c4d77e3edf7.mp3',
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
        // var scale = this.$refs.audio.currentTime / this.$refs.audio.duration
        // 设置比例
        // this.$refs.music_pro.setProgress(scale)
        // 判断歌曲是否正在播放
      }
      console.log(this.currentTime + '------' + this.duration)
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
          this.currentIndex = this.currentIndex >= this.playList.length - 1 ? 0 : this.currentIndex++
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
      console.log(this.lyric)
    },
    // 音乐获取失败
    musicErr () {
      console.log('error')
      this.$message.error('当前音频不可用')
      this.currentIndex++
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
  width: 100px;
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
