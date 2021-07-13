<template>
 <div class="mv">
    <scroll class="mv-scroll" ref="scroll-mv">
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
        <mv-item :mvList="mvList"></mv-item>
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
      <!-- mv排行榜 -->
      <mv-rank-list :topMv="topMv"></mv-rank-list>
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
// 导入mv数据请求
import { MV, _getNewMV, _getTopMv } from '../../network/mv'
export default {
  name: 'Mv',
  components: {
    MvItem,
    MvRankList,
    Scroll
  },
  data () {
    return {
      mvList: [],
      topMv: []
    }
  },
  async created () {
    // 获取最新mv和mv排行榜
    Promise.all([_getNewMV({ limit: 10 }), _getTopMv({ limit: 10 })]).then(res => {
      res[0].data.data.forEach(item => this.mvList.push(new MV(item)))
      res[1].data.data.forEach(item => this.topMv.push(new MV(item)))
    })
  },
  methods: {
    allMv () {
      this.$router.push('/allmv')
    }
  }
}
</script>
<style lang="less" scoped>
.mv{
  width: 100%;
  height: 100%;
}

.mv-scroll{
  height: 100%;
  overflow: hidden;
}

.title{
  width: 100%;
  padding: 5px 0;
  color: #01060a;
  font-size: 20px;
  border-bottom:  1px solid #818181 ;
  > .right{
    float: right;
    height: 20px;
    font-size: 13px;
    color: #828385;
    cursor: pointer;
    > span{
      vertical-align: 6px;
    }
    > i{
      vertical-align: 6px;
    }
  }
  > .right:hover{
    color: #59aed3;
  }
}

.rank-list{
  margin-top: 20px;
}
</style>
