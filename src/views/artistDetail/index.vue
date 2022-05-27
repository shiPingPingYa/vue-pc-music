<template>
  <div class="artist-detail">
    <scroll class="artist-swiper">
      <ArtistBaseInfo />
      <div class="detail-bar">
        <div class="bar-item" v-for="(item, index) in tabList" :key="index" :class="{ action: currentIndex == index }" @click="handelTabsClick(index)">
          {{ item }}
        </div>
      </div>
      <transition name="fade-in-linear">
        <keep-alive>
          <component :is="page" />
        </keep-alive>
      </transition>
    </scroll>
  </div>
</template>
<script>
import ArtistBaseInfo from './components/artistBaseInfo';
import ArtistAlbum from './components/artistAlbum';
import ArtistDescDetail from './components/artistDescDetail';
import ArtistMv from './components/artistMv';
import ArtistSimilar from './components/artistSimilar';
export default {
  name: 'ArtistDetail',
  components: { ArtistBaseInfo, ArtistAlbum, ArtistDescDetail, ArtistMv, ArtistSimilar },
  data() {
    return {
      currentIndex: 0,
      tabList: ['专辑', 'MV', '歌手详情', '相似歌手'],
      pageMap: {
        0: 'ArtistAlbum',
        1: 'ArtistMv',
        2: 'ArtistDescDetail',
        3: 'ArtistSimilar'
      }
    };
  },
  computed: {
    page() {
      return this.pageMap[this.currentIndex];
    }
  },
  methods: {
    handelTabsClick(i) {
      this.currentIndex = i;
    }
  }
};
</script>

<style lang="less" scoped>
.artist-detail {
  width: 100%;
  height: 100%;
  overflow: hidden;

  & > .artist-swiper {
    width: 100%;
    height: calc(100% - 40px);
    .detail-bar {
      display: flex;
      width: 100%;
      height: 50px;
      align-items: center;
      font-size: 14px;
      color: #0a0a0a;
      border-bottom: 1px solid #ededee;
    }

    .detail-bar .bar-item {
      padding: 14px 40px;
      cursor: pointer;
    }

    .action {
      border-bottom: 3px solid #b82525;
    }
  }
}
</style>
