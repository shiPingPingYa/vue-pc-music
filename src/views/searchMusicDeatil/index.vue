<template>
  <div class="search-list">
    <scroll class="search-scroll">
      <div class="title">
        搜索<span>"{{ keywords }}"</span>,找到<span>{{ this.musicList.length }}</span
        >首单曲
      </div>
      <div class="bar">
        <div v-for="(item, index) in tabList" :key="index" :class="{ 'active-tab': currentIndex == index }" class="bar-item" @click="handleTabClick(index)">{{ item }}</div>
      </div>
      <transition-group name="fade-in-linear">
        <MusicItem :key="0" v-show="currentIndex == 0" :musicList="musicList" @musicItemClick="musicItemClick" />
        <ArtistItem :key="1" v-show="currentIndex == 1" :artistsList="artistsList" />
      </transition-group>
    </scroll>
  </div>
</template>
<script>
import { _getSongsDetail } from '@/network/detail';
import { _Search } from '@/network/search';
import { formDate } from '@/assets/common/tool';
import { mixinsPlayMusic } from '@/mixins/mixinsPlayMusic';
import MusicItem from '@/components/musicItem';
import ArtistItem from './components/artistItem';

export default {
  name: 'searchMusicDeatil',
  components: { ArtistItem, MusicItem },
  mixins: [mixinsPlayMusic],
  data() {
    return {
      currentIndex: 0,
      tabList: ['单曲', '歌手'],
      artistsList: [],
      musicList: [],
      key: "",
      newkey: ''
    };
  },
  watch: {
    // 路由都做过缓存处理(在当前页面搜索音乐或者歌手重新跳转页面数据不会再次加载)
    $route(route) {
      this.keywords = route.params.id;
      if ((this.keywords ?? '') !== '') this.initMusicList();
    }
  },
  created() {
    this.keywords = this.$route.params.id;
    if ((this.keywords ?? '') !== '') this.initMusicList();
  },
  methods: {
    async initMusicList() {
      this.musicList = [];
      this.artistsList = [];
      const {
        data: {
          result: { songs }
        }
      } = await _Search({ keywords: this.keywords, limit: 50 });
      this.artistsList = songs;
      let ids = songs.map(v => v.id);
      const {
        data: { songs: result }
      } = await _getSongsDetail(ids.join(','));
      this.musicList = result.map(item => {
        return {
          id: item.id,
          name: item.name,
          album: item.al.name,
          song: item.ar[0].name,
          pic: item.al.picUrl,
          time: formDate(new Date(item.dt), 'mm:ss')
        };
      });
    },
    handleTabClick(index) {
      this.currentIndex = index;
    },
    musicItemClick(index) {
      this.playMusic(index);
    }
  }
};
</script>
<style lang="less" scoped>
.search-list {
  padding: 10px 40px;
  width: 100%;
  height: 100%;
  color: #0a0a0a;
  font-size: 14px;
}

.search-scroll {
  height: 100%;
  overflow: hidden;
}

.search-scroll .title {
  height: 40px;
  line-height: 40px;

  > span {
    padding: 0 10px;
    color: #2e6bb0;
  }
}

.search-scroll .bar {
  margin-bottom: 10px;
  display: flex;
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #dcdcdd;
}

.bar-item {
  padding: 0 20px;
  cursor: pointer;
}

.active-tab {
  color: #b82525;
  border-bottom: 3px solid #b82525;
}
</style>
