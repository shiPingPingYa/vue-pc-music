<template>
  <div id="app">
    <tab-bar></tab-bar>
    <center-content></center-content>
    <play-music></play-music>
  </div>
</template>

<script>
// 头部导航栏区域
import TabBar from '../src/components/content/tabbar/TabBar'
// 中间内容区域(包含左边菜单和右边内容)
import CenterContent from '../src/components/content/conter/CenterContent'
// 底部区域
import PlayMusic from '../src/components/content/playmusic/PlayMusic'
export default {
  name: 'app',
  components: {
    TabBar,
    CenterContent,
    PlayMusic
  }
}
</script>

<style>
#app {
  margin: 0 4% 0 16%;
  width: 80%;
  height: 100%;
}
</style>
