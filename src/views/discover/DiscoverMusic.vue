<template>
  <div class="discover">
    <nav-bar :list="list" ref="nav"></nav-bar>
    <div class="content">
      <keep-alive>
      <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import NavBar from './childComps/NavBar'
export default {
  name: 'DisoverMusic',
  components: {
    NavBar
  },
  data () {
    return {
      list: [
        { link: '/discover/individ', name: '个性推荐' },
        { link: '/discover/category', name: '歌单' },
        { link: '/discover/ranklist', name: '排行榜' },
        { link: '/discover/artist', name: '歌手' },
        { link: '/discover/newsongs', name: '最新音乐' },
        { link: '/discover/mv', name: 'MV' }
      ]
    }
  },
  created () {
    var that = this
    for (var i in this.list) {
      (function (e) {
        if (that.list[e].link === that.$route.path) {
          setTimeout(() => {
            that.$refs.nav.barClick(e)
          }, 100)
        }
      })(i)
    }
  }
}
</script>
<style lang="less" scoped>
.discover{
  width: 100%;
  height: 100%;
}

.content{
  margin-top: 10px;
  padding: 10px 20px;
  width: 100%;
  height: calc(100% - 49px);
  overflow: hidden;
  > p{
    font-size: 20px;
  }
}
</style>
