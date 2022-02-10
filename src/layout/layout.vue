<template>
  <div class="layout_app">
    <tab-bar ref="tabBar"></tab-bar>
    <center-content ref="center_content"></center-content>
    <play-music ref="play_music"></play-music>
    <!-- <home-page-recommends></home-page-recommends> -->
  </div>
</template>
<script>
import TabBar from '@/components/content/tabbar/TabBar'
import CenterContent from '@/components/content/conter/CenterContent'
import PlayMusic from '@/components/content/playmusic/PlayMusic'
// import HomePageRecommends from '../src/components/HomePageRecommends'
export default {
  name: 'layout',
  components: {
    TabBar,
    CenterContent,
    PlayMusic
    // HomePageRecommends
  }
}
</script>
<style lang="less" scoped>
.layout_app {
  width: 100%;
  height: 100%;
}
</style>
