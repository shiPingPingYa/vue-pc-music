<template>
  <div class="all-mv">
    <scroll ref="scroll" class="scroll">
     <div class="title">
         这是全部mv
     </div>
   <div class="content">
      <mv-bar></mv-bar>
      <mv-item class="mv_item" :mvList="mvList"></mv-item>
   </div>
     <div class="mv_pagination">
     <el-pagination
     v-show="mvList.length === 40"
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="1000">
  </el-pagination>
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
      limit: 40,
      offset: 40,
      mvList: [],
      area: null,
      type: null,
      order: null,
      page: 0
    }
  },
  created () {
    this.allMv()
  },
  methods: {
    async allMv (area = '全部', type = '全部', order = '上升最快') {
      // 值变了，就将mv数组清空
      this.mvList = []
      this.area = area
      this.type = type
      this.order = order

      // 调用接口获取数据
      const { data: { data } } = await _AllMv(this.area, this.type, this.order, this.limit, this.page * this.limit)
      data.forEach(item => this.mvList.push(new MV(item)))
    },
    async handleCurrentChange (val) {
      this.mvList = []
      const { data: { data } } = await _AllMv(this.area, this.type, this.order, this.limit, (val - 1) * this.limit)
      data.forEach(item => this.mvList.push(new MV(item)))
      this.$refs.scroll.scrollTo(0, 0, 0)
    }
  }
}
</script>
<style lang="less" scoped>
.all-mv{
  padding: 0 20px 20px;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.scroll{
  height:100%;
}

.mv_pagination{
  display: flex;
  justify-content: flex-end;
}

.mv_item{
  margin-bottom: 20px;
}

.title{
  margin-top: 10px;
  padding: 0 20px;
  font-size: 18px;
  color: #01060a;
  > .title-boder{
  margin-top: 10px;
  width: 100%;
  height: 1px;
  border-bottom: 1px solid #23262c;

  }
}

</style>
