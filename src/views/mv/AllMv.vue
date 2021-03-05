<template>
  <div>
    这是全部mv
    <mv-bar></mv-bar>
  <mv-item></mv-item>
  </div>
</template>
<script>
// 导入mv导航条组件
import MvBar from './childComps/MvBar'
// 导入mv条目组件
import MvItem from './childComps/MVItem'
export default {
  name: 'AllMv',
  component: {
    MvBar,
    MvItem
  }
}
</script>
<style lang="less" scoped>

</style>
