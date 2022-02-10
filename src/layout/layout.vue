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
  },
  mounted () {
    const app = document.getElementById('app')
    const handleImgAndMessageClick = () => {
      this.$store.commit('setAsyncShareImag', false) // 隐藏朋友圈图片
      this.$refs.tabBar._data.isPrivate = false // 隐藏消息通知
      this.$refs.tabBar._data.isisHistoryNewsPrivate = false
      this.$bus.$emit('handleMenuMouseLeave') // 收起左侧路由导航栏
    }
    const stopMusic = e => e.keyCode === 32 && this.$refs.play_music.toggle()
    window.addEventListener('keyup', stopMusic) // 监听键盘输入事件，空格停止音乐播放
    app.addEventListener('click', handleImgAndMessageClick)
  }
}
</script>
<style lang="less" scoped>
.layout_app {
  width: 100%;
  height: 100%;
}
</style>
