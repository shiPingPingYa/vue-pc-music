<template>
  <div v-if="musicList.length !== 0" class="artist-album">
    <p class="top">热门50首</p>
    <div class="hot50">
      <!-- 左边内容区域 -->
      <div class="left">
        <!-- //专辑图片 -->
        <div class="icon">
          <img v-imgLazy :data-src="musicList[0].pic + '?param=280y260'" alt="" src="" />
        </div>
      </div>
      <!-- 右边内容区域 -->
      <div class="right">
        <!-- 通过下面toggle-fold来动态切换类名fold(flold写死了高320) -->
        <div :class="{ fold: fold }" class="music">
          <div class="music-table">
            <div :class="['music-table-tr', playIndex == index ? 'active-music' : '']" v-for="(item, index) in musicList" :key="index" @dblclick="handleCurrentIndex(index)">
              <div class="music-table-td">
                {{ setSerial(index) }}
                <div class="active-icon" v-show="playIndex == index">
                  <img src="@/assets/img/playmusic/currentplay.svg" alt="" />
                </div>
              </div>
              <div class="music-table-td">
                <img src="@/assets/img/leftmenu/live.svg" alt="" class="live" />
                <img src="@/assets/img/leftmenu/xiazai.svg" alt="" class="download" />
              </div>
              <div class="music-table-td one-over-eclipse">{{ item.name }}</div>
              <div class="music-table-td  one-over-eclipse">{{ item.song }}</div>
              <div class="music-table-td  one-over-eclipse">{{ item.album }}</div>
              <div class="music-table-td">{{ item.time }}</div>
            </div>
          </div>
        </div>
        <div class="toggle-fold" @click="fold = !fold">
          <span v-if="fold">查看全部</span>
          <span v-else>收起</span>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
import { playMinxin } from '@/mixins/mixinsBusOnPlaying';
import { mixinsPlayMusic } from '@/mixins/mixinsPlayMusic';
export default {
  name: 'ArtistHot',
  mixins: [mixinsPlayMusic, playMinxin],
  props: {
    musicList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      fold: true
    };
  },
  methods: {
    setSerial(i) {
      return i + 1 <= 9 ? `0${i + 1}` : i + 1;
    },
    handleCurrentIndex(i) {
      this.playMusic(i);
    }
  }
};
</script>
<style lang="less" scoped>
.artist-album {
  width: 100%;

  > .top {
    display: block;
    padding: 20px 0 8px 26%;
    line-height: 20px;
    color: #0a0a0a;
    font-size: 18px;
  }

  > .hot50 {
    display: flex;
    width: 100%;
    justify-content: flex-start;

    > .left {
      width: 20%;
      > .icon {
        width: 100%;
        > img {
          padding: 0 0 0 20px;
          width: 100%;
          min-height: 100px;
        }
      }
    }

    > .right {
      margin-left: 40px;
      width: 75%;
    }
  }
}

.music-table {
  width: 100%;
  & > .music-table-tr {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 40px;
    cursor: pointer;
    &:hover {
      color: #0a0a0a;
      background-color: #c9c6c6;
    }
    & > div {
      padding: 6px;
      text-align: center;
      line-height: 28px;
    }
    & > .music-table-td:nth-child(1) {
      position: relative;
      width: 10%;
      color: rgb(36, 199, 240);
    }
    & > .music-table-td:nth-child(2) {
      width: 10%;
      & > img {
        width: 20px;
      }
    }
    & > .music-table-td:nth-child(3) {
      width: 26%;
      max-width: 190px;
    }
    & > .music-table-td:nth-child(4) {
      width: 18%;
    }
    & > .music-table-td:nth-child(5) {
      width: 18%;
      max-width: 162px;
    }
    & > .music-table-td:nth-child(6) {
      width: 18%;
    }
  }
  & > .music-table-tr:nth-child(odd) {
    background-color: #eeecec;
  }
  .active-icon {
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 16px;
    height: 16px;
    z-index: 1;
  }
  .active-music {
    background-color: #c9c6c6 !important;
    & > div:nth-child(1) {
      color: transparent !important;
    }
  }
}

.fold {
  height: 320px;
  overflow: hidden;
}

.toggle-fold {
  margin-top: 20px;
  color: #828385;
  cursor: pointer;
}

.toggle-fold:hover {
  color: red;
}
</style>
