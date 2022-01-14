<template>
  <div class="play-music-list" v-if="musicList.length !== 0">
    <!-- 头部区域 -->
    <div class="top">
      <div class="title">音乐播放列表</div>
      <div class="cancel" @click="cancel()">
        <img src="../../../assets/img/content/x.svg" alt />
      </div>
      <!-- 清除浮动 -->
      <div class="clear"></div>
    </div>
    <!-- 音乐列表区域 -->
    <scroll ref="play_music_scroll" class="play-music-list-scroll">
      <div class="list">
        <music-item @musicItemClick="musicItemClick" :musicList="musicList"></music-item>
      </div>
    </scroll>
  </div>
</template>
<script>
import Scroll from '../../common/scroll/Scroll'
// 导入音乐条目
import MusicItem from '../../../views/musicListDetail/childComps/MusicItem'
export default {
  name: 'PlayMusicList',
  props: {
    musicList: {
      type: Array,
      default: () => []
    }
  },
  components: { Scroll, MusicItem },
  methods: {
    cancel () {
      this.$parent.isMusicList = false
    },
    // 音乐列表的点击事件传递了一个下标
    musicItemClick (index) {
      this.$bus.$emit('playMusicListItem', index)
    }
  }
}
</script>
<style lang="less" scoped>
  .play-music-list {
    width: 50%;
    height: 600px;
    box-shadow: -1px -1px 6px rgb(49, 166, 245);
    color: #0a0a0a;
    background: #f5f5f7;
    > .top {
      width: 100%;
      font-size: 14px;
      background-color: #a3b2b8 !important;
      > .title {
        float: left;
        width: calc(100% - 30px);
        text-align: center;
      }
      > .cancel {
        float: right;
        margin: 2px 10px 0 0;
        width: 20px;
        height: 20px;
        cursor: pointer;
        > img {
          width: 100%;
          height: 100%;
          background-size: 100%, 100%;
        }
      }
      > .clear {
        clear: both;
      }
    }
  }

  .play-music-list-scroll {
    height: calc(100% - 24px);
    overflow: hidden;
  }

  .list {
    width: 100%;
    height: 100%;
  }
</style>
