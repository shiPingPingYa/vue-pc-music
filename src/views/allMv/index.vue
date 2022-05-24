<template>
  <div class="all-mv">
    <scroll ref="scroll" class="scroll">
      <div class="title">
        这是全部mv
      </div>
      <div class="content">
        <mv-bar></mv-bar>
        <MvList class="mv_item" :mvList="mvList" />
      </div>
      <div class="mv_pagination">
        <el-pagination v-show="mvList.length !== 0" :current-page="page" @current-change="handleCurrentChange" background layout="prev, pager, next" :total="1000" />
      </div>
    </scroll>
  </div>
</template>
<script>
import MvBar from './components/mvBar';
import MvList from '@/components/mvList';
import { _AllMv } from 'api/mv';
export default {
  name: 'AllMv',
  components: { MvBar, MvList },
  data() {
    return {
      limit: 40,
      mvList: [],
      area: '全部',
      type: '全部',
      order: '上升最快',
      page: 1
    };
  },
  mounted() {
    this.initAllMvList();
    this.$refs.scroll.refresh();
  },
  methods: {
    async initAllMvList(area, type, order, flag) {
      if (flag) {
        this.area = area;
        this.type = type;
        this.order = order;
      }
      const params = {
        type: this.type,
        area: this.area,
        order: this.order,
        limit: this.limit,
        offset: this.mvList.length * (this.page - 1) // 偏移位
      };
      this.mvList = [];
      // 调用接口获取数据
      const {
        data: { data }
      } = await _AllMv(params);
      this.mvList = data.map(item => {
        return {
          id: item.id,
          cover: item.cover || item.imgurl || item.picUrl,
          name: item.name,
          artist: item.artistName,
          count: item.playCount
        };
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.$refs.scroll.scrollTo(0, 0, 200);
      this.initAllMvList();
    }
  }
};
</script>
<style lang="less" scoped>
.all-mv {
  padding: 0 20px 60px;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.scroll {
  height: 100%;
}

.mv_item {
  margin-bottom: 20px;
}

.title {
  margin-top: 10px;
  padding: 0 20px;
  font-size: 18px;
  color: #01060a;
  > .title-boder {
    margin-top: 10px;
    width: 100%;
    height: 1px;
    border-bottom: 1px solid #23262c;
  }
}
</style>
<style>
.mv_pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
