<template>
  <div class="all-mv">
    <scroll ref="scroll" class="scroll" :pull-up-load="true" @pullingUp="pullingUp()">
     <div class="title">
         这是全部mv
     </div>
   <div class="content">
      <mv-bar></mv-bar>
      <mv-item :mvList="mvList"></mv-item>
   </div>
    </scroll>
  </div>
</template>
<script>
// scroll
import Scroll from '../../components/common/scroll/Scroll'
// 导入mv导航条组件
import MvBar from './childComps/MvBar'
// 导入mv条目组件
import MvItem from './childComps/MVItem'
// 导入mv数据请求
import { _AllMv, MV } from '../../network/mv'
export default {
  name: 'AllMv',
  components: {
    MvBar,
    MvItem,
    Scroll
  },
  data () {
    return {
      limit: 24,
      offset: 1,
      mvList: [],
      area: null,
      type: null,
      order: null
    }
  },
  created () {
    this.allMv()
  },
  methods: {
    pullingUp () {
      this.loadMv()
    },
    async loadMv () {
      this.offset++
      var mvList = []
      await _AllMv(this.area, this.type, this.order, this.offset * this.limit).then(res => {
        for (var i of res.data.data) {
          var mv = new MV(i.id, i.cover, i.name, i.artistName, i.playCount)
          mvList.push(mv)
        }
        this.mvList = mvList
        this.$refs.scroll.finishPullUp()
      })
    },
    async allMv (area = '全部', type = '全部', order = '上升最快', limit = this.limit * this.offset) {
      // 值变了，就将mv数组清空
      this.mvList = []
      this.area = area
      this.type = type
      this.order = order

      // 调用接口获取数据
      await _AllMv(area, type, order, limit).then(res => {
        for (var i of res.data.data) {
          var mv = new MV(i.id, i.cover, i.name, i.artistName, i.playCount)
          this.mvList.push(mv)
        }
      }
      )
    }
  }
}
</script>
<style lang="less" scoped>
.all-mv{
  padding: 0 20px;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.scroll{
  height: 100%;
}

.title{
  margin-top: 10px;
  padding: 0 20px;
  font-size: 18px;
  color: #fff;
  > .title-boder{
  margin-top: 10px;
  width: 100%;
  height: 1px;
  border-bottom: 1px solid #23262c;

  }
}

</style>
