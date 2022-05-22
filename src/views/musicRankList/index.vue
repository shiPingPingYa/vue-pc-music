<template>
  <div class="rank-list">
    <scroll ref="scroll" class="rank-scroll" v-if="topRankList.length !== 0">
      <!-- 飙升榜 -->
      <div class="rank-top">
        <songRank v-for="(item,index) in topRankList" :key="item.id" :rankId="item.id" :bg-color="backList[index]" :titleList="titleList[index]" />
      </div>
      <h2>全球榜</h2>
      <songList :totalList="totalList" />
    </scroll>
  </div>
</template>
<script>
import { _getRankList } from '@/network/discover';
import songRank from './components/songRank';
import songList from '@/components/songList';
export default {
  name: 'musicRankList',
  components: { songList, songRank },
  data() {
    return {
      topRankList: [],
      totalList: [],
      titleList: [
        ['飙', '升', '榜'],
        ['新', '歌', '榜'],
        ['原', '创', '榜'],
        ['热', '歌', '榜'],
        ['歌', '手', '榜'],
      ],
      backList: [
        ['#56a1e3', '#5a8beb'],
        ['#34aabe', '#56c2cd'],
        ['#d53d6a', '#eb638d'],
        ['#c7523c', '#cc7455'],
        ['#9455ce', '#9946c9'],
      ],
    };
  },
  created() {
    this.initMusicRankList();
  },
  methods: {
    async initMusicRankList() {
      const {
        data: { list },
      } = await _getRankList();
      this.topRankList = list.slice(0, 4);
      this.totalList = list.slice(4);
    },
  },
};
</script>
<style lang="less" scoped>
  .rank-list {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .rank-scroll {
    height: 100%;
  }

  .rank-top {
    display: flex;
    flex-wrap: wrap;
  }

  h2 {
    margin-bottom: 20px;
    font-weight: 300;
    font-size: 21px;
    color: #01060a;
  }
</style>
