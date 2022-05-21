<template>
  <div class='individuation'>
    <scroll ref='scroll' class='individ-scroll'>
      <!-- 轮播图区域 -->
      <swiper :bannerList='bannerList'></swiper>
      <p>推荐歌单</p>
      <!-- 推荐歌单区域 -->
      <music-list :totalList='songList'></music-list>
      <!-- 私人派送区域 -->
      <private-content></private-content>
      <!-- 最新音乐区域 -->
      <new-songs></new-songs>
      <!-- 推荐mv区域 -->
      <p class='pri-mv'>推荐MV</p>
      <mv-item :mvList='mvList'></mv-item>
    </scroll>
  </div>
</template>
<script>
import Swiper from '@/components/common/swiper/Swiper';
import MusicList from '../../musicListDetail/MusicList';
import PrivateContent from '../childComps/PrivateContent';
import NewSongs from '../childComps/NewSongs';
import MvItem from '../../mv/childComps/MVItem';
import { _getBanner, _getPersonalized, _getPrivateMv } from '@/network/discover';
import { _getSongsDetail } from '@/network/detail';
export default {
  name: 'Individuation',
  data() {
    return {
      bannerList: null,
      songList: null,
      musicList: [],
      mvList: [],
    };
  },
  components: { Swiper, MusicList, PrivateContent, NewSongs, MvItem },
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
