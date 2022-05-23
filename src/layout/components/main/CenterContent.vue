<template>
  <div class="content">
    <left-menu ref="left_menu"></left-menu>
    <right-main ref="right_menu"></right-main>
  </div>
</template>
<script>
import LeftMenu from './components/LeftMenu';
import RightMain from './components/RightMain';
export default {
  name: 'CenterContent.',
  components: { LeftMenu, RightMain },
};
</script>
<style lang="less" scoped>
  .content {
    position: relative;
    width: 100%;
    height: calc(100% - 54px - 58px);
    display: flex;
    justify-content: flex-start;
  }
</style>
