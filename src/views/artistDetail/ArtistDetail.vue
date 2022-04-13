<template>
  <div class="artist-detail">
    <scroll class="artist-swiper">
      <artist-base-info></artist-base-info>
      <artist-bar ref="artistBar"></artist-bar>
      <transition name="fade-in-linear">
        <router-view></router-view>
      </transition>
    </scroll>
  </div>
</template>
<script>
import ArtistBaseInfo from './childComps/ArtistBaseInfo'
import ArtistBar from './childComps/ArtistBar'
export default {
  name: 'ArtistDetail',
  components: { ArtistBaseInfo, ArtistBar }
}
</script>

<style lang="less" scoped>
  .artist-detail {
    width: 100%;
    height: 100%;
    overflow: hidden;

    & .artist-swiper {
      width: 100%;
      height: calc(100% - 40px);
    }
  }
</style>
