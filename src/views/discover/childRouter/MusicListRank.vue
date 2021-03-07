<template>
  <div class="rank-list">
    <scroll ref="scroll" class="rank-scroll" v-if="rankList !== 0">
    <div class="rank-top">
  <!-- 飙升榜 -->
    <rank-list-item
     :title="['飙','升','榜']" :rankId="rankList[0]"
     :bg-color="['#56a1e3','#5a8beb']" ></rank-list-item>
  <!-- 新歌榜 -->
       <rank-list-item
        :title="['新','歌','榜']" :newSongId="rankList[1]"
        :bg-color="['#34aabe','#56c2cd'].id"></rank-list-item>
  <!-- 原创榜单 -->
       <rank-list-item
        :title="['原','创','榜']" :originalId="rankList[2]"
        :bg-color="['#d53d6a','#eb638d'].id"></rank-list-item>
  <!-- 热歌榜 -->
       <rank-list-item
          :title="['热','歌','榜']" :hotId="rankList[3]"
          :bg-color="['#c7523c','#cc7455']"></rank-list-item>
  <!-- 歌手榜 -->
       <rank-list-item
        :title="['歌','手','榜']" :artistId="rankList[4]"
          :bg-color="['#9455ce','#9946c9']"></rank-list-item>
  </div>

  <h2>全球榜</h2>
  <music-list :totalList="rankList.slice(4)"></music-list>
    </scroll>
  </div>
</template>
<script>
// 滚动条
import Scroll from '../../../components/common/scroll/Scroll'
import { _getRankList } from '../../../network/discover'
// 音乐条目
import MusicList from '../../musicListDetail/MusicList'
// 飙升榜
import RankListItem from '../childComps/RankListItem'

export default {
  name: 'MusicListRank',
  components: {
    Scroll,
    MusicList,
    RankListItem
  },
  data () {
    return {
      rankList: []
    }
  },
  async created () {
    await _getRankList().then(res => {
      this.rankList = res.data.list
    })
  }
}
</script>
<style lang="less" scoped>
.rank-list{
  width: 100%;
  height: 100%;
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
  color: #fff;
}
</style>
