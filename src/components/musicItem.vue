<template>
  <div class="music-container" v-if="musicList != null">
    <div class="music-table">
      <div class="music-table-tr">
        <div class="music-table-td">#</div>
        <div class="music-table-td">操作</div>
        <div class="music-table-td one-over-eclipse">音乐标题</div>
        <div class="music-table-td  one-over-eclipse">歌手</div>
        <div class="music-table-td  one-over-eclipse">专辑</div>
        <div class="music-table-td">时长</div>
      </div>
      <div
        :class="['music-table-tr', activeMusic && currentIndex == index ? 'active-music' : '']"
        v-for="(item, index) in musicList"
        :key="index"
        @dblclick="musicItemClick(index)"
      >
        <div class="music-table-td">
          {{ setSerial(index) }}
          <div class="active-icon" v-show="activeMusic && currentIndex == index">
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
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'musicItem',
  props: {
    musicList: {
      type: Array,
      default() {
        return [];
      }
    }
    //判断是否存储hash地址(hash用于判断是那个音乐列表播放的音乐),首页播放音乐列表不需要修改hash
    // isHashStorage: {
    //   type: Boolean,
    //   default: () => true
    // }
  },
  computed: {
    ...mapState(['songListPath', 'currentIndex']),
    activeMusic() {
      return this.songListPath == location.hash;
    }
  },

  methods: {
    setSerial(i) {
      return i + 1 <= 9 ? '0' + (i + 1) : i + 1;
    },
    // 判断是否在同一歌单下面，是则不重新获取音乐数据，而是修改音乐播放列表序号
    musicItemClick(index) {
      if (location.hash === this.songListPath) this.$store.commit('setPlayMusicIndex', index);
      else this.$emit('musicItemClick', index);
    }
  }
};
</script>
<style lang="less" scoped>
.music-container {
  width: 100%;
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
}
</style>
