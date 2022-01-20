<template>
  <div id="app">
    <keep-alive>
      <tab-bar ref="tabBar"></tab-bar>
    </keep-alive>
    <center-content ref="center_content"></center-content>
    <play-music ref="play_music"></play-music>
    <!-- <home-page-recommends></home-page-recommends> -->
  </div>
</template>

<script>
import TabBar from '../src/components/content/tabbar/TabBar'
import CenterContent from '../src/components/content/conter/CenterContent'
import PlayMusic from '../src/components/content/playmusic/PlayMusic'
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
  methods: {
    ...mapMutations(['showLogin']),
    initUserSongList () {
      // 判断是否有userid有userid，通过userid获取下用户歌单和用户信息
      if (localStorage.getItem('userId')) {
        this.$store.dispatch('_GETUSERINFO', localStorage.getItem('userId'))
      } else {
        this.$message.info('已退出登录,如需获取用户歌单请重新登录')
        this.showLogin(true)
      }
    }
  },
  mounted () {
    this.initUserSongList()
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
