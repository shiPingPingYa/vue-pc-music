<template>
  <transition name="slide">
     <div class="player" v-if="music !==null && lyric !== null">
      <scroll class="player-scroll" ref="scroll" :pull-up-load="true" @pullingUp="pullingUp()">
        <!-- 上面内容区域 -->
        <div class="player-content">
          <!-- 左边图标区域 -->
          <div class="left">
            <div class="play-bar-support">
          <img src="../../../assets/img/playmusic/play-bar-support.png" alt />
            </div>
            <div class="play-bar" :class="{bar:!isPlayer}">
            <img class="play-bar"  src="../../../assets/img/playmusic/play-bar.png" alt />
            </div>
            <div class="music-pic" :class="{rotate:isPlayer}">
              <div class="img-wrap">
                <img src="../../../assets/img/userimg.png" alt="">
              </div>
            </div>
          </div>
        <!--右边歌词区域  -->
          <div class="right">
            <div class="top">
              <h2>
                <span>Promise</span>
                </h2>
            </div>
            <!-- recommends 歌词 -->
            <div class="lyric">
              <lyric ref="playerLyric" :lyric="lyric"></lyric>
            </div>
          </div>
        </div>

        <!-- 下面评论组件 -->
        <div class="player-bottom">
          <recommends :recommends="recommends"></recommends>
        </div>
    </scroll>
      </div>

  </transition>
</template>
<script>
import Scroll from '../../common/scroll/Scroll'
// 评论组件
import Recommends from '../../../views/musicListDetail/childComps/Recommends'
// 歌词组件
import Lyric from './Lyric'
// 导入歌曲评论请求和歌词请求
import { _musicRecommend } from '../../../network/detail'
export default {
  name: 'Player',
  components: {
    Scroll,
    Recommends,
    Lyric
  },
  props: {
    music: {
      type: Object,
      default () {
        return {}
      }
    },
    lyric: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      page: 1,
      limit: 40,
      recommends: [],
      isPlayer: false
    }
  },
  watch: {
    lyric () {
      if (this.$refs.playerLyric.$refs.scroll != null) {
        this.$refs.playerLyric.$refs.scroll.scrollTo(0, 0, 0)
      }
      _musicRecommend(this.music.id, this.limit).then(res => {
        this.recommends = res.data.comments
      })
    }
  },
  created () {
    _musicRecommend(this.music.id, this.limit).then(res => {
      this.recommends = res.data.comments
    })
  },
  methods: {
    pullingUp () {
      this.musicRecommends()
    },
    musicRecommends () {
      this.page++
      _musicRecommend(this.music.id, this.limit * this.page).then(res => {
        this.recommends = res.data.commentsthis
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>
<style lang="less" scoped>
.player{
  position: absolute;
  padding: 20px 10% 0 18%;
  top: calc(54px + 60px - 100vh);
  width: 100%;
  height: calc(100vh - 59px - 54px);
  background: linear-gradient(-45deg, #333540, #070708, #333540);
}

.player-scroll{
  height: 100%;
  overflow: hidden;
}

.player-content{
  position: relative;
  width: 100%;
  height: 405px;
  > .left{
   position: relative;
   float: left;
   width: 50%;
   height: 100%;
   overflow: hidden;
   > .play-bar-support{
     position: absolute;
     margin: auto;
     left: 0;
     right: 0;
     top: -10px;
     width: 20px;
     height: 20px;
     z-index: 2;
     border-radius: 50%;
     box-shadow: 0 0 3px #fff;
     > img{
       width: 100%;
     }
   }
   > .play-bar{
     position: absolute;
     width: 80px;
     height: 127px;
     left: calc(50% - 8px);
     top: -8px;
     z-index: 1;
     > img{
       width: 100%;
     }
   }
   > .music-pic{
     position: absolute;
     margin: auto;
     left: 0;
     right: 0;
     top: 70px;
     width: 270px;
     height: 270px;
     border: 40px solid #0e0e11;
     border-radius: 50%;
     box-shadow: 0 0 10px #fff;
     > .img-wrap{
       border: 4px solid #fff;
       border-radius: 50%;
       > img{
         width: 100%;
         height: 100%;
         border-radius: 50%;
       }
     }
   }
 }
 > .right{
   float: right;
   width: 50%;
   height: 100%;
   > .top{
     color: #d5d5d5;
     font-weight: 300;
     padding: 10px 0;
     > h2{
       text-align: center;
     }
   }
   > .lyric{
     padding: 10px 0;
     height: calc(100% - 60px);
     color: #5e6062;
     text-align: center;
     font-size: 14px;
   }
 }
}
.player-bottom{
  padding: 0px 5%;
  width: 100%;
  height: 35%;
}

.bar {
  top: 10px;
  transform-origin: 0 0 ;
  transform: rotate(-25deg);
  transition: all 0.1s;
}

.rotate {
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(1turn);
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
  transform: none;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(-100%);
}
</style>
