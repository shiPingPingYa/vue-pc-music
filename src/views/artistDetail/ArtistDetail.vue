<template>
  <div class="artist-detail">
      <scroll class="artist-swiper">
        <artist-base-info :desc="artistDesc" :baseInfo="getArtist()"></artist-base-info>
        <artist-bar  ref="artistBar" :barList="barList"></artist-bar>
        <router-view></router-view>
      </scroll>
  </div>
</template>
<script>
// 导入歌手默认信息
import ArtistBaseInfo from './childComps/ArtistBaseInfo'
// 导入歌手导航条
import ArtistBar from './childComps/ArtistBar'
// 导入Scroll
import Scroll from '../../components/common/scroll/Scroll'
// 导入获取歌手详情请求
import { _getArtistDesc } from '../../network/artist'
export default {
  name: 'ArtistDetail',
  data () {
    return {
      // 用户信息
      artist: null,
      // 用户详细信息
      artistDesc: null,
      barList: ['专辑', 'MV', '歌手详情', '相似歌手']
    }
  },
  components: {
    ArtistBaseInfo,
    ArtistBar,
    Scroll
  },
  watch: {
    // 修改歌手默认信息
    $route: {
      handler (val) {
        if (val.path === '/artist/album') {
          this.getArtist()
          this.getArtistDesc()
        }
      }
    }
  },
  created () {
    this.getArtistDesc()
  },
  methods: {
    getArtistDesc () {
      this.artist = JSON.parse(localStorage.getItem('artist'))
      _getArtistDesc(this.artist.id).then(res => {
        this.artistDesc = res.data.briefDesc
      })
    },
    getArtist () {
      return JSON.parse(localStorage.getItem('artist'))
    }
  }
}

</script>

<style lang="less" scoped>
.artist-detail{
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.artist-swiper{
  width: 100%;
  height: calc(100% - 40px);
}
</style>
