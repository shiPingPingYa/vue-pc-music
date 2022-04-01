<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'App',
  methods: {
    ...mapMutations(['showLogin', 'setIslogin']),
    initUserSongList () {
      // 判断是否有userid有userid，通过userid获取下用户歌单和用户信息
      if (localStorage.getItem('userId')) {
        this.$store.dispatch('_GETUSERINFO', localStorage.getItem('userId'))
      } else {
        this.$message.info('已退出登录,如需获取用户歌单请重新登录')
        this.setIslogin(false)
        this.showLogin(true)
      }
    }
  },
  mounted () {
    this.initUserSongList()
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
