<template>
  <div id="app">
    <keep-alive>
    <tab-bar></tab-bar>
    </keep-alive>
    <center-content></center-content>
    <play-music ref="play_music"></play-music>
    <!-- <home-page-recommends></home-page-recommends> -->
  </div>
</template>

<script>
// 头部导航栏区域
import TabBar from '../src/components/content/tabbar/TabBar'
// 中间内容区域(包含左边菜单和右边内容)
import CenterContent from '../src/components/content/conter/CenterContent'
// 底部区域
import PlayMusic from '../src/components/content/playmusic/PlayMusic'
// 导入首页评论组件
// import HomePageRecommends from '../src/components/HomePageRecommends'
export default {
  name: 'app',
  components: {
    TabBar,
    CenterContent,
    PlayMusic
    // HomePageRecommends
  },
  watch: {
    // 路由发生改变时，判断播放组件是不是处于隐藏状态
    $route: {
      handler () {
        if (this.$refs.play_music.isPlayerShow) {
          this.$refs.play_music.isPlayerShow = false
        }
      }
    }
  },
  created () {
    // 获取localstorage里面的obj对象
    if (window.localStorage.getItem('obj')) {
      var obj = window.localStorage.getItem('obj')
      obj = JSON.parse(obj)
      this.$store.commit('addUser', obj)
    }
  },
  mounted () {
    // 监听键盘事件，停止播放音乐
    document.onkeyup = (e) => {
      // 触发子组件里面的方法，停止播放音乐
      if (e.keyCode === 32) {
        this.$refs.play_music.toggle()
      }
    }
  }
}
</script>

<style>
#app {
  margin: 0 10% 0 10%;
  width: 80%;
  height: 100%;
  opacity: 0.9;
}

.w-120{
  width: 120px;
  margin-top: 10px;
}
</style>
