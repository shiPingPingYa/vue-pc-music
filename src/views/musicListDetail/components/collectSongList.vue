<template>
  <div class="collect-song-list">
    <div class="collect-list" v-if="collectSongList.length !== 0">
      <div class="collect-item" v-for="(item, index) in collectSongList" :key="index">
        <img src="" :data-src="item.avatarUrl + '?param=60y60'" alt="" v-imgLazy />
        <div>{{ item.nickname }}</div>
      </div>
    </div>
    <div class="none-collect-song-list" v-else>
      改歌单暂无收藏者
    </div>
  </div>
</template>
<script>
import { _getSub } from '@/network/detail';
export default {
  name: 'collectSongList',
  props: {
    id: {
      type: [Number, String],
      default: () => 0 || '0'
    }
  },
  data() {
    return {
      collectSongList: []
    };
  },
  created() {
    this.initCollectSongList();
  },
  methods: {
    async initCollectSongList() {
      // 获取歌单收藏者
      const {
        data: { subscribers }
      } = await _getSub(this.id);
      this.collectSongList = subscribers;
    }
  }
};
</script>
<style lang="less" scoped>
.collect-song-list {
  width: 100%;
  margin-bottom: 20px;

  & > .collect-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    & > .collect-item {
      width: 160px;
      padding: 30px;
      text-align: center;
      font-size: 12px;
      cursor: pointer;
      &:hover {
        transform: scale(1.2);
        transition: all 0.6s ease-out;
      }
      & > img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
    }
  }

  & > .none-collect-song-list {
    padding: 10px 0px 10px 30px;
    font-size: 14px;
  }
}
</style>
