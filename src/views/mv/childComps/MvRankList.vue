<template>
  <div>
    这是mv排行榜
    <rank-list></rank-list>
  </div>
</template>
<script>
// 导入mv排行版下面的子组件
import RankList from './RankList'
export default {
  name: 'MvRankListMv',
  components: {
    RankList
  }
}
</script>
<style lang="less" scoped>

</style>
