<template>
      <div class="content">
    <left-menu ref="left_menu"></left-menu>
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
  },
  // 监听路由地址
  watch: {
    $route (oldkey) {
      this.emitCheckClick(oldkey.path)
    }
  },
  methods: {
    // 遍历路由对象
    emitCheckClick (path) {
      var that = this
      for (var i in that.$refs.left_menu.list) {
        (function (e) {
          if (that.$refs.left_menu.list[e].link === path) {
            setTimeout(() => {
              that.$refs.left_menu.checkClick(e)
            }, 100)
          }
        })(i)
      }
    }
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
