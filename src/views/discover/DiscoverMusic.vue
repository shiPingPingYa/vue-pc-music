<template>
  <div class="discover">
    <nav-bar :list="list" ref="nav"></nav-bar>
    <div class="content"></div>
  </div>
</template>
<script>
import NavBar from './childComps/NavBar'
export default {
  name: 'DisoverMusic',
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
  components: {
    NavBar
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
  padding: 10px 155px;
  width: 100%;
  height: calc(100% -49px);
  overflow: hidden;
  > p{
    font-size: 20px;
  }
}
</style>
