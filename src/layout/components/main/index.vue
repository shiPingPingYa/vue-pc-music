<template>
  <div class="app-main">
    <left-menu ref="left_menu"></left-menu>
    <right-main ref="right_menu"></right-main>
  </div>
</template>
<script>
import LeftMenu from './components/LeftMenu';
import RightMain from './components/RightMain';
export default {
  name: 'appMain',
  components: { LeftMenu, RightMain },
};
</script>
<style lang="less" scoped>
  .app-main {
    position: relative;
    width: 100%;
    height: calc(100% - 54px - 58px);
    display: flex;
    justify-content: flex-start;
  }
</style>
