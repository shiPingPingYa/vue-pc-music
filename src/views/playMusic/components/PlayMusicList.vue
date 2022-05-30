<template>
  <div class="play-music-list">
    <div class="header">
      <div class="title">
        <div class="list">播放列表</div>
      </div>
      <div class="cancel" @click="cancel"><img src="@/assets/img/content/x.svg" alt /></div>
    </div>
    <div class="play-music-list-scroll">
      <MusicItem @musicItemClick="musicItemClick" :musicList="musicList" v-if="musicList.length !== 0" />
      <div class="no-music-list" v-else>暂无数据</div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import MusicItem from '@/components/musicItem';
export default {
  name: 'PlayMusicList',
  components: { MusicItem },
  computed: {
    ...mapState(['musicList'])
  },
  methods: {
    cancel() {
      this.$parent.isMusicList = false;
    },
    musicItemClick(index) {
      this.$store.commit('setPlayMusicIndex', index);
    }
  }
};
</script>
<style lang="less" scoped>
.play-music-list {
  width: 50%;
  min-width: 600px;
  height: 600px;
  color: #0a0a0a;
  background: #f5f5f7;
  box-shadow: -1px -1px 6px rgb(49, 166, 245);
  & > .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
    background-color: #a3b2b8 !important;
    font-size: 14px;
    > .title {
      flex: 1;
      text-align: center;
      & > .list {
        display: inline-block;
        width: 90px;
        padding: 4px;
        color: #fff;
        background: #4b4a4a;
        border-radius: 2px;
        cursor: pointer;
      }
    }
    > .cancel {
      width: 26px;
      padding-right: 6px;
      text-align: right;
      cursor: pointer;
      > img {
        width: 20px;
        height: 20px;
        vertical-align: -8px;
      }
    }
  }
  & > .play-music-list-scroll {
    height: calc(100% - 40px);
    padding: 6px;
    overflow-y: scroll;
  }
}
</style>
