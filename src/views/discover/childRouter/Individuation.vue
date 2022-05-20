<template>
  <div class='individuation'>
    <scroll ref='scroll' class='individ-scroll'>
      <!-- 轮播图区域 -->
      <swiper :banner='banner'></swiper>
      <p>推荐歌单</p>
      <!-- 推荐歌单区域 -->
      <music-list :totalList='totalList'></music-list>
      <!-- 私人派送区域 -->
      <private-content :privateContent='privateContent'></private-content>
      <!-- 最新音乐区域 -->
      <new-songs :songList='songList' @playMusic='playNewsong()'></new-songs>
      <!-- 推荐mv区域 -->
      <p class='pri-mv'>推荐MV</p>
      <mv-item :mvList='mvList'></mv-item>
    </scroll>
  </div>
</template>
<script>
import Swiper from 'common/swiper/Swiper'
import MusicList from '../../musicListDetail/MusicList'
import PrivateContent from '../childComps/PrivateContent'
import NewSongs from '../childComps/NewSongs'
import MvItem from '../../mv/childComps/MVItem'
import { _getBanner, _getNewSong, _getPersonalized, _getPrivateContent, _getPrivateMv } from 'api/discover'
import { _getSongsDetail } from 'api/detail'
import { mixinsPlayMusic } from '../../../mixins/mixinsPlayMusic'
import { formDate } from 'js/tool'

export default {
  name: 'Individuation',
  data() {
    return {
      banner: null,
      limit: 10,
      totalList: null,
      songList: null,
      musicList: [],
      privateContent: null,
      mvList: [],
      notMvList: null
    }
  },
  components: { Swiper, MusicList, PrivateContent, NewSongs, MvItem },
  mixins: [mixinsPlayMusic],
  created() {
    this.initIndividuation()
  },
  methods: {
    async initIndividuation() {
      // 获取首页轮播图,最新音乐，最新歌单，最新mv等等数据
      const [
        {
          data: { banners }
        },
        {
          data: { result: totalList }
        },
        { data: privateContent },
        {
          data: { result: songList }
        },
        {
          data: { result: notMvList }
        }
      ] = await Promise.all([
        _getBanner(),
        _getPersonalized(this.limit),
        _getPrivateContent(),
        _getNewSong(),
        _getPrivateMv()
      ]).then()
      this.banner = banners.slice(0, 6)
      this.totalList = totalList
      this.privateContent = privateContent
      this.songList = songList
      // 处理mv获取需要的参数
      this.mvList = notMvList.map(item => {
        return {
          id: item.id,
          cover: item.cover || item.imgurl || item.picUrl,
          name: item.name,
          artist: item.artistName,
          count: item.playCount
        }
      })
    },
    // 播放最新音乐
    async playNewsong(index) {
      this.musicList = []
      // 拼接歌曲id
      const ids = this.songList.map(item => item.id).join(',')
      // 根据歌曲的id获取音乐详细信息
      const {
        data: { songs }
      } = await _getSongsDetail(ids)
      // 处理音乐播放列表(需要音乐id，歌曲名字，专辑名字，歌手名，歌曲背景图片，歌曲时间)
      this.musicList = songs.map(item => {
        return {
          id: item.id,
          name: item.name,
          album: item.al.name,
          song: item.ar[0].name,
          pic: item.al.picUrl,
          time: formDate(new Date(item.dt), 'mm:ss')
        }
      })
      this.playMusic(index)
    }
  }
}
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
