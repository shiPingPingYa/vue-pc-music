<template>
  <div class="mv">
    <scroll class="mv-scroll" ref="scroll-mv">
      <div class="new-mv">
        <div class="title">
          最新MV
          <div class="right" @click="goAllMvDetail()">
            <span>更多</span>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <mvList :mvList="mvList" />
      </div>
      <div class="rank-list">
        <div class="title">
          MV排行榜
          <div class="right" @click="goAllMvDetail()">
            <span>更多</span>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <mvRankList :topMv="topMv" />
      </div>
    </scroll>
  </div>

</template>
<script>
import { _getNewMV, _getTopMv } from '@/network/mv';
import mvList from '@/components/mvList';
import mvRankList from './components/mvRankList';
export default {
  name: 'discoverMv',
  components: { mvList, mvRankList },
  data() {
    return {
      mvList: [],
      topMv: [],
    };
  },
  created() {
    this.initMvAndMvRank();
  },
  methods: {
    async initMvAndMvRank() {
      // 获取最新mv和mv排行榜
      Promise.all([_getNewMV({ limit: 10 }), _getTopMv({ limit: 10 })]).then(res => {
        this.mvList = res[0].data.data.map(item => {
          return {
            id: item.id,
            cover: item.cover || item.imgurl || item.picUrl,
            name: item.name,
            artist: item.artistName,
            count: item.playCount,
          };
        });
        this.topMv = res[1].data.data.map(item => {
          return {
            id: item.id,
            cover: item.cover || item.imgurl || item.picUrl,
            name: item.name,
            artist: item.artistName,
            count: item.playCount,
          };
        });
      });
    },
    goAllMvDetail() {
      this.$router.push('/allmv');
    },
  },
};
</script>
<style lang="less" scoped>
  .mv {
    width: 100%;
    height: 100%;
  }

  .mv-scroll {
    height: 100%;
    overflow: hidden;
  }

  .title {
    width: 100%;
    padding: 5px 0;
    color: #01060a;
    font-size: 20px;
    border-bottom: 1px solid #818181;
    > .right {
      float: right;
      height: 20px;
      font-size: 13px;
      color: #828385;
      cursor: pointer;
      > span {
        vertical-align: 6px;
      }
      > i {
        vertical-align: 6px;
      }
    }
    > .right:hover {
      color: #59aed3;
    }
  }

  .rank-list {
    margin-top: 20px;
  }
</style>
