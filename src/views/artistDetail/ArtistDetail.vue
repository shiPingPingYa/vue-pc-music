<template>
  <div class="artist-detail">
      <scroll class="artist-swiper">
        <artist-base-info :desc="artistDesc" :baseInfo="getArtist"></artist-base-info>
        <artist-bar :barList="barList" ref="artistBar"></artist-bar>
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
  created () {
    this.artist = this.$store.state.artist
  },
  watch: {
    // 监听用户信息，如果发生变化，就重新获取用户详细信息
    async artist  (to, from) {
      // 触发artist-bar里面的currentClick点击方法(默认点击专辑)
      this.$refs.artistBar.currentClick(0)
      // 判断用户信息是否存在
      if (typeof (to.id) !== 'undefined') {
        await _getArtistDesc(to.id).then(res => {
          this.artistDesc = res.data.briefDesc
        })
      }
    }
  },
  computed: {
    getArtist () {
      return this.$store.state.artist
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
