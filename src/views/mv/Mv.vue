<template>
 <div class="mv">
    <scroll class="mv-scroll" ref="scroll">
      <!-- 最新Mv区域 -->
      <div class="new-mv">
        <div class="title">
          最新MV
          <div class="right" @click="allMv()">
            <span>更多</span>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <!-- mv视频列表 -->
    <mv-item></mv-item>
      </div>
      <!-- mv排行版区域 -->
    <div class="rank-list">
      <!-- mv排行榜视频列表 -->
      <div class="title">
        MV排行榜
        <div class="right" @click="allMv()">
          <span>更多</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <mv-rank-list></mv-rank-list>
    </div>
  </scroll>
 </div>

</template>
<script>
// 导入scroll滚动适配
import Scroll from '../../components/common/scroll/Scroll'
// 导入mv条目
import MvItem from './childComps/MVItem'
// 导入mv排行版组件
import MvRankList from './childComps/MvRankList'
export default {
  name: 'Mv',
  components: {
    MvItem,
    MvRankList,
    Scroll
  },
  created () {

  },
  methods: {
    allMv () {
      this.$router.push('/allmv')
    }
  }
}
</script>
<style lang="less" scoped>

</style>
