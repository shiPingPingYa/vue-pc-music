<template>
  <div class="content">
    <left-menu></left-menu>
    <right-main></right-main>
  </div>
</template>
<script>
import LeftMenu from '../LeftMenu'
import RightMain from '../RightMain'
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
  position: relative;
  width: 100%;
  height: calc(100% - 54px - 58px);
  display: flex;
  justify-content: flex-start;

}
</style>
