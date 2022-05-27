<template>
  <transition name="slide">
    <div class="player" v-if="music !== null && lyric !== null">
      <scroll class="player-scroll" ref="scroll" :pull-up-load="true">
        <div class="player-content">
          <div class="left">
            <div class="play-bar-support">
              <img src="@/assets/img/playmusic/play-bar-support.png" alt />
            </div>
            <div class="play-bar" :class="{ bar: !isPlayer }">
              <img class="play-bar" src="@/assets/img/playmusic/play-bar.png" alt />
            </div>
            <div class="music-pic" :class="{ rotate: isPlayer }">
              <div class="img-wrap">
                <img :src="music.pic" alt="" />
              </div>
            </div>
          </div>
          <div class="right">
            <div class="top">
              <h2>
                <span>歌词</span>
              </h2>
            </div>
            <div class="lyric">
              <lyric ref="playerLyric" :lyric="lyric"></lyric>
            </div>
          </div>
        </div>
        <div class="player-bottom">
          <Recommend ref="music_recommends" @moreComments="moreComments" @getCommends="getCommends" :id="String(music.id)" :Type="0" :recommends="recommends" />
        </div>
      </scroll>
    </div>
  </transition>
</template>
<script>
import Lyric from './Lyric';
import { _musicRecommend } from '@/network/detail';
import Recommend from '@/components/common/recommend/index';
export default {
  name: 'Player',
  components: { Recommend, Lyric },
  props: {
    music: {
      type: Object,
      default() {
        return {};
      }
    },
    lyric: {
      type: String,
      default() {
        return '';
      }
    }
  },
  data() {
    return {
      limit: 40,
      recommends: [],
      isPlayer: false
    };
  },
  watch: {
    lyric() {
      if (this.$refs.playerLyric.$refs.scroll != null) {
        this.$refs.playerLyric.$refs.scroll.scrollTo(0, 0, 0);
        this.$refs.scroll.scrollTo(0, 0, 0);
      }
      _musicRecommend(this.music.id, this.limit).then(res => {
        this.recommends = res.data.comments;
      });
    }
  },
  methods: {
    // 加载更多评论
    async moreComments() {
      const {
        data: { comments }
      } = await _musicRecommend(this.music.id, this.limit, this.recommends.length);
      if (comments.length === 0) {
        this.$message.info('评论已经加载完毕，暂无更多评论');
        this.$refs.songList_recommends.recommendTitle = '评论加载完毕，暂无更多.....';
      } else comments.forEach(item => this.recommends.push(item));
    },
    // 发送评论后，重新获取评论
    async getCommends() {
      this.recommends = [];
      const {
        data: { comments }
      } = await _getRecommends({
        id: this.id,
        limit: this.limit,
        offset: 0,
        timestamp: Date.now()
      });
      this.recommends = comments;
    }
  }
};
</script>
<style lang="less" scoped>
.player {
  position: absolute;
  padding: 20px 10% 0 18%;
  top: calc(54px + 60px - 100vh);
  width: 100%;
  height: calc(100vh - 59px - 54px);
  background: linear-gradient(-45deg, #cfcfd1, #c3c4c6, #f8f8fa);
}

.player-scroll {
  height: 100%;
  overflow: hidden;
}

.player-content {
  position: relative;
  width: 100%;
  height: 405px;
  > .left {
    position: relative;
    float: left;
    width: 50%;
    height: 100%;
    overflow: hidden;
    > .play-bar-support {
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
      > img {
        width: 100%;
      }
    }
    > .play-bar {
      position: absolute;
      width: 80px;
      height: 127px;
      left: calc(50% - 8px);
      top: -8px;
      z-index: 1;
      > img {
        width: 100%;
      }
    }
    > .music-pic {
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
      > .img-wrap {
        border: 4px solid #fff;
        border-radius: 50%;
        > img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
  }
  > .right {
    float: right;
    width: 50%;
    height: 100%;
    > .top {
      color: #000a0d;
      font-weight: 300;
      padding: 10px 0;
      > h2 {
        text-align: center;
      }
    }
    > .lyric {
      padding: 10px 0;
      height: calc(100% - 60px);
      color: #5e6062;
      text-align: center;
      font-size: 14px;
    }
  }
}
.player-bottom {
  padding: 0px 5%;
  width: 100%;
  height: 35%;
}

.bar {
  top: 10px;
  transform-origin: 0 0;
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
  transition: all 0.5s ease-out;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(-100%);
}
.slide-enter-to,
.slide-enter-leave {
  transform: none;
}
</style>
