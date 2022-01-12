<template>
  <div id="app">
    <keep-alive>
      <tab-bar ref="tabBar"></tab-bar>
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
import { mapMutations } from 'vuex'
export default {
  name: 'App',
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
        if (this.$refs.play_music.isPlayerShow) this.$refs.play_music.isPlayerShow = false
      }
    }
  },
  created () {
    // 获取localstorage里面的用户id
    if (localStorage.getItem('userId')) {
      this.$store.dispatch('_GETUSERINFO', localStorage.getItem('userId'))
    } else {
      this.$message.info('已退出登录')
      this.showLogin()
    }
  },
  methods: {
    ...mapMutations(['showLogin'])
  },
  mounted () {
    const app = document.getElementById('app')
    const handleImgAndMessageClick = () => {
      this.$store.commit('setAsyncShareImag', false)
      this.$refs.tabBar._data.isPrivate = false
      this.$refs.tabBar._data.isisHistoryNewsPrivate = false
    }
    const stopMusic = (e) => e.keyCode === 32 && this.$refs.play_music.toggle()
    window.addEventListener('keyup', stopMusic) // 监听键盘输入事件，空格停止音乐播放
    app.addEventListener('click', handleImgAndMessageClick) // 点击页面隐藏朋友圈图片和消息通知
  }
}
</script>

<style>
  ul li {
    list-style: none;
  }
  #app {
    position: relative;
    margin: 0 10% 0 10%;
    width: 80%;
    height: 100%;
    opacity: 0.9;
  }

  .w-120 {
    width: 120px;
    margin-top: 10px;
  }
</style>
