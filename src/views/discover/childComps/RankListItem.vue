<template>
 <div class="rank-item"  v-if="rankId && bgColor !== null" >
        <!--卡片区域头部图片 -->
     <div
      class="rank-item-top"
      :style="{background:'linear-gradient(to right,'+bgColor[0]+','+bgColor[1]+')'}"
      @click="enterDetail()"
    >
      <div class="left"  >
        <div class="left-itemF">
          <i>{{titleList[0]}}</i>
        </div>
        <div class="set">
          <div class="left-item">
            <i>{{titleList[1]}}</i>
          </div>
          <div class="left-item">
            <i>{{titleList[2]}}</i>
          </div>
          <div class="update">{{getUpdateTime}}</div>
        </div>
        <div class="right"  @click="rankItemClick()">
          <img src="../../../assets/img/playmusic/xibofang.svg" alt />
        </div>
      </div>
    </div>
    <!--卡片区域的表格-->
    <div class="center">
      <table cellspacing="0">
        <tr v-for="(item,index) in musicList" :key="index" :class="{backColor:setBackColor(index)}">
          <td>{{setSerial(index)}} </td>
          <td>{{item.name}} </td>
          <td>{{item.song}} </td>
          <td>{{item.time}} </td>
        </tr>
      </table>
    </div>

  </div>
</template>
<script>
// // 导入歌单接口,歌曲详细信息和初始化
import { _getMusicListDetail, _getSongsDetail, AllSongDetail } from '../../../network/detail'
// // 格式化日期
import { formDate } from '../../../assets/common/tool'
// // 处理隔行变色
import { tableMixin } from '../../musicListDetail/tableMixin'
// 音乐混入
import { indexMixin } from '../../musicListDetail/indexMixin'
export default {
  name: 'RankListItem',
  props: {
    // 排行榜单ID
    rankId: {
      type: Number,
      default () {
        return 0
      }
    },
    // 背景颜色
    bgColor: {
      type: Array,
      defaule () {
        return []
      }
    },
    // 标题
    titleList: {
      type: Array,
      defaule () {
        return []
      }
    }
  },
  data () {
    return {
      musicList: [],
      musicListDetail: null,
      // 榜单时间
      updateTime: null
    }
  },
  mixins: [tableMixin, indexMixin],
  created () {
    this.initMusicRankList()
  },
  computed: {
    getUpdateTime () {
      return formDate(new Date(this.updateTime), 'mm月dd日')
    }
  },
  methods: {
    // 获取音乐榜单数据
    async  initMusicRankList () {
      // 根据榜单id获取榜单id和时间
      const { data: { playlist: { updateTime, trackIds } } } = await _getMusicListDetail(this.rankId)
      this.updateTime = updateTime
      // 只获取排行榜前八位歌曲，id可以传入id数组
      // 拼接歌曲id
      const ids = trackIds.slice(0, 8).map(item => { return item.id }).join(',')
      const { data: { songs } } = await _getSongsDetail(ids)
      songs.forEach(item => this.musicList.push(new AllSongDetail(item)))
      // _getSongsDetail(item.id).then(res => this.musicList.push(new SongDetail(res.data.songs)))
    },
    // 跳转到音乐排行榜单详情页面
    enterDetail () {
      this.$router.push('/musiclistdetail/' + this.rankId)
    },
    // 混入音乐
    rankItemClick () {
      this.playMusic()
    }
  }
}
</script>
<style lang="less" scoped>
.rank-item {
  margin-right: 15px;
  width: 300px;
  height: 400px;
  color: #01060a;
  cursor: pointer;

}
.rank-item-top {
  position: relative;
  width: 100%;
  height: 100px;
  color: #fff;
}
.rank-item-top .left {
  padding: 0px 25px;
  padding-top: 10px;
  width: 200px;
  display: flex;
  align-items: center;
}
.left-itemF {
  margin-right: 10px;
  font-size: 54px;
}
.set {
  position: relative;
  display: flex;
}
.update {
  position: absolute;
  left: 5px;
  top: 15px;
  width: 100px;
}
.left-item {
  margin-top: -20px;
  font-size: 26px;
}
.right {
  position: absolute;
  margin: auto;
  right: 20px;
  top: 0px;
  bottom: 0px;
  width: 50px;
  height: 50px;
}
.right img {
  width: 100%;
}

.center{
  width: 100%;
  > table{
    width: 100%;
    font-size: 12px;
    color: #01060a;
     > tr{
    width: 100%;
    height: 30px;
    text-align: left;
  }
  }

}

.center tr:nth-child(1) td:nth-child(1),
.center tr:nth-child(2) td:nth-child(1),
.center tr:nth-child(3) td:nth-child(1) {
  color: #b82525;
}

.center tr td:nth-child(2) {
  color: #909192;
}

.center tr:hover {
  background-color: #2c2e32;
  color: #fff;
}

.center tr td {
  border: none;
  position: relative;
}

</style>
