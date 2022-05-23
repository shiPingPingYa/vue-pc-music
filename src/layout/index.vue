<template>
  <div class="layout_app">
    <tab-bar ref="tabBar" />
    <appMain ref="center_content" />
    <playMusic ref="play_music" />
    <!-- <home-page-recommends></home-page-recommends> -->
  </div>
</template>
<script>
import { mapState } from 'vuex';
import TabBar from './components/tabbar/TabBar';
import appMain from './components/main/index';
import playMusic from '@/views/playMusic/index';
// import HomePageRecommends from '../src/components/HomePageRecommends'
export default {
  name: 'layout',
  computed: {
    ...mapState(['asyncShareImag'])
  },
  components: { TabBar, appMain, playMusic },
  mounted() {
    const handleImgMessageMenuHide = () => {
      this.$store.commit('setAsyncShareImag', false); // 隐藏朋友圈图片
      this.$refs.tabBar.isPrivate = false; // 隐藏消息通知
      this.$refs.tabBar.isisHistoryNewsPrivate = false;
      this.$bus.$emit('handleMenuMouseLeave'); // 收起左侧路由导航栏
    };
    const stopMusic = e => e.keyCode === 32 && this.$refs.play_music.toggle();
    window.addEventListener('keyup', stopMusic); // 监听键盘输入事件，空格停止音乐播放
    document.getElementById('app').addEventListener('click', () => handleImgMessageMenuHide());
  }
};
</script>
<style lang="less" scoped>
.layout_app {
  width: 100%;
  height: 100%;
}
</style>
