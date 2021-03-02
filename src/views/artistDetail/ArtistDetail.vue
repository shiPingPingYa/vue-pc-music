<template>
  <div class="artist-detail">
      <scroll class="artist-swiper">
        <artist-base-info></artist-base-info>
        <artist-bar></artist-bar>
        <router-view></router-view>
      </scroll>
  </div>
</template>
<script>
// 导入歌手默认信息
import ArtistBaseInfo from './childComps/ArtistBarInfo'
// 导入歌手导航条
import ArtistBar from './childComps/ArtistBar'
// 导入Scroll
import Scroll from '../../components/common/scroll/Scroll'
export default {
  name: 'ArtistDetail',
  components: {
    ArtistBaseInfo,
    ArtistBar,
    Scroll
  },
  data () {
    return {
      artist: null
    }
  },
  created () {
    this.artist = this.$route.query.artist.name
    console.log(this.$route.query.artist.name)
  }
}
</script>
<style lang="less" scoped>
.artist-detail{
  width: 100%;
  height: 100%;
  background-color: red;
}

.artist-swiper{
  width: 100%;
  height: calc(100% - 40px);
}
</style>
