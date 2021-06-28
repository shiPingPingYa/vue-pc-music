<template>
  <div class="rank-list">
    <scroll ref="scroll" class="rank-scroll" v-if="rankList.length !== 0">
    <div class="rank-top">
  <!-- 飙升榜 -->
  <rank-list-item v-for="(item,index) in topRankList"
  :key="item.id" :rankId="item.id"
  :bg-color="backList[index]"
  :titleList="titleList[index]" >
  </rank-list-item>
  </div>
  <h2>全球榜</h2>
  <music-list :totalList="rankList.slice(4)"></music-list>
    </scroll>
  </div>
</template>
<script>
// 滚动条
import Scroll from '../../../components/common/scroll/Scroll'
// 音乐榜单
import RankListItem from '../childComps/RankListItem'
// 音乐条目
import MusicList from '../../musicListDetail/MusicList'
// 网络请求
import { _getRankList } from '../../../network/discover'
export default {
  name: 'MusicListRank',
  components: {
    Scroll,
    MusicList,
    RankListItem
  },
  data () {
    return {
      rankList: [],
      topRankList: [],
      totalList: [],
      titleList: [
        ['飙', '升', '榜'],
        ['新', '歌', '榜'],
        ['原', '创', '榜'],
        ['热', '歌', '榜'],
        ['歌', '手', '榜']
      ],
      backList: [
        ['#56a1e3', '#5a8beb'],
        ['#34aabe', '#56c2cd'],
        ['#d53d6a', '#eb638d'],
        ['#c7523c', '#cc7455'],
        ['#9455ce', '#9946c9']
      ]
    }
  },
  async created () {
    const { data: { list } } = await _getRankList()
    this.rankList = list
    this.topRankList = list.slice(0, 4)
    this.totalList = list.slice(4)
  }

}
</script>
<style lang="less" scoped>
.rank-list{
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.rank-scroll{
  height: 100%;
}

.rank-top{
  display: flex;
  flex-wrap: wrap;
}

h2{
  margin-bottom: 20px;
  font-weight: 300;
  font-size: 21px;
  color: #01060a;
}
</style>
