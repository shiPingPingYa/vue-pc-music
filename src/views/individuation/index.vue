<template>
  <div class='individuation'>
    <scroll ref='scroll' class='individ-scroll'>
      <!-- 轮播图区域 -->
      <swiper :bannerList='bannerList'></swiper>
      <p>推荐歌单</p>
      <!-- 推荐歌单区域 -->
      <songList :totalList='songList' />
      <!-- 私人派送区域 -->
      <PrivateContentMv />
      <!-- 最新音乐区域 -->
      <newMusicList />
      <!-- 推荐mv区域 -->
      <p class='pri-mv'>推荐MV</p>
      <mvList :mvList='mvList' />
    </scroll>
  </div>
</template>
<script>
import { _getBanner, _getPersonalized, _getPrivateMv } from '@/network/discover';
import { _getSongsDetail } from '@/network/detail';
import Swiper from '@/components/common/swiper/Swiper';
import songList from '@/components/songList';
import mvList from '@/components/mvList';
import PrivateContentMv from './components/PrivateContentMv';
import newMusicList from './components/newMusicList';
export default {
  name: 'individuation',
  data() {
    return {
      bannerList: null,
      songList: null,
      musicList: [],
      mvList: [],
    };
  },
  components: { Swiper, songList, PrivateContentMv, newMusicList, mvList },
  created() {
    this.initBannerList();
    this.initSongList();
    this.initPrivateMvList();
  },
  methods: {
    async initPrivateMvList() {
      const {
        data: { result, code },
      } = await _getPrivateMv();
      if (code == 200) {
        this.mvList = result.map(item => {
          return {
            id: item.id,
            cover: item.cover || item.imgurl || item.picUrl,
            name: item.name,
            artist: item.artistName,
            count: item.playCount,
          };
        });
      }
    },
    //初始化轮播图
    async initBannerList() {
      const {
        data: { banners: bannerList, code },
      } = await _getBanner();
      if (code == 200) {
        this.bannerList = bannerList.slice(0, 6);
      }
    },
    //初始化推荐歌单
    async initSongList() {
      const {
        data: { result: songList, code },
      } = await _getPersonalized({ limit: 10 });
      if (code == 200) {
        this.songList = songList;
      }
    },
  },
};
</script>
<style lang='less' scoped>
  .individuation {
    width: 100%;
    height: 100%;

    p {
      margin: 20px 0 6px 0;
      padding-bottom: 6px;
      line-height: 30px;
      font-size: 16px;
      border-bottom: 1px solid #b8b6b6;
      color: #01060a;
      line-height: 20px;
    }
  }

  .individ-scroll {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
