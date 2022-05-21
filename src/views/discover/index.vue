<template>
  <div class="discover">
    <navBar ref="nav" />
    <div class="content">
      <keep-alive>
        <transition name="fade-in-linear">
          <router-view></router-view>
        </transition>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import navBar from './components/navBar';
export default {
  name: 'discoverMusic',
  components: { navBar },
};
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
