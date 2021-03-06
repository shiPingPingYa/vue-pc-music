<template>
  <div class="mv-rank" v-if="topMv.length !==0">
   <div class="rank-item" v-for="index in topMv.length" :key="index">
     <div class="wrap"  v-if="index%2 ==0" >
       <div class="left">
         <div class="number">{{setSerial(index-2)}}</div>
         <div class="mv"><rank-list :item='topMv[index-2]'></rank-list> </div>
       </div>
       <div class="right">
         <div class="number">{{setSerial(index-1)}} </div>
         <div class="mv"><rank-list :item="topMv[index-1]"></rank-list> </div>
       </div>
     </div>
   </div>
  </div>
</template>
<script>
// 导入mv排行版下面的子组件
import RankList from './RankList'
// 导入工具函数处理id
import { tableMixin } from '../../musicListDetail/tableMixin'
export default {
  name: 'MvRankListMv',
  components: {
    RankList
  },
  props: {
    topMv: {
      type: Array,
      default () {
        return []
      }
    }
  },
  mixins: [tableMixin]
}
</script>
<style lang="less" scoped>
.mv-rank{
  margin: 0 90px;
  width: 100%;
  height: 100%;
}

.rank-item{
  margin-top: 10px;
  width: 100%;
  > .wrap{
    display: flex;
    width: 100%;
    align-items: center;
    > .left{
      display: flex;
      flex: 1;
      align-items: center;
    }
    > .right{
      display: flex;
      flex: 1;
      align-items: center;
    }
  }
}

.number{
  width: 30px;
  font-size: 20px;
  color: #828384;
  text-align: center;
}

.mv{
  flex: 1;
}
</style>
