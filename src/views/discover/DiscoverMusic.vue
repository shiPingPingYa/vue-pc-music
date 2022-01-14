<template>
  <div class="discover">
    <nav-bar ref="nav"></nav-bar>
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
  }
}
</script>
<style lang="less" scoped>
  .discover {
    width: 100%;
    height: 100%;
  }

  .content {
    margin-top: 10px;
    padding: 10px 20px;
    width: 100%;
    height: calc(100% - 49px);
    overflow: hidden;
    > p {
      font-size: 20px;
    }
  }
</style>
