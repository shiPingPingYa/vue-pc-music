<template>
  <div class="content">
    <left-menu></left-menu>
    <right-main></right-main>
  </div>
</template>
<script>
import LeftMenu from '../LeftMenu'
import RightMain from '../RightMain.vue'
export default {
  name: 'CenterContent.',
  components: {
    LeftMenu,
    RightMain
  }
}
</script>
<style lang="less" scoped>
.content{
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: calc(100% - 54px - 58px);
}
</style>
