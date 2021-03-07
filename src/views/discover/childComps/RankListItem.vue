<template>
  <div class="rank-item" v-if="musicListDetail !== null">
        <!--卡片区域头部图片 -->
     <div
      class="rank-item-top"
      :style="{background:'linear-gradient(to right,'+bgColor[0]+','+bgColor[1]+')'}"
    >
      <div class="left">
        <div class="left-itemF">
          <i>{{title[0]}}</i>
        </div>
        <div class="set">
          <div class="left-item">
            <i>{{title[1]}}</i>
          </div>
          <div class="left-item">
            <i>{{title[2]}}</i>
          </div>
          <div class="update">{{getUpdateTime}}</div>
        </div>
        <div class="right">
          <img src="../../../assets/img/playmusic/xibofang.svg" alt />
        </div>
      </div>
    </div>
    <!--卡片区域的表格-->
    <div class="center">
      <table>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>

  </div>
</template>
<script>
// 导入数据接口
import { _getMusicListDetail, _getSongsDetail, SongDetail } from '../../../network/detail'
// 格式化日期
import { formDate } from '../../../assets/common/tool'
// 处理隔行变色
// import { setBackColor, setSerial } from '../../musicListDetail/tableMixin'
export default {
  name: 'RankListItem',
  props: {
    rankId: {
      type: Object,
      default () {
        return {}
      }
    },
    newSongId: {
      type: Object,
      default () {
        return {}
      }
    },
    originalId: {
      type: Object,
      default () {
        return {}
      }
    },
    hotId: {
      type: Object,
      default () {
        return {}
      }
    },
    artistId: {
      type: Object,
      default () {
        return {}
      }
    },
    bgColor: {
      type: Array,
      defaule () {
        return []
      }
    },
    title: {
      type: Array,
      defaule () {
        return []
      }
    }
  },
  data () {
    return {
      musicList: [],
      musicListDetail: null
    }
  },
  async mounted () {
    if (this.rankId.id !== null) {
      await _getMusicListDetail(this.rankId.id).then(res => {
        this.musicListDetail = res.data
        for (var i of this.musicListDetail.playlist.trackIds.slice(0, 8)) {
          _getSongsDetail(i.id).then(res => {
            var song = new SongDetail(res.data.songs)
            this.musicList.push(song)
          })
        }
      })
    }
  },
  computed: {
    getUpdateTime () {
      var time = this.musicListDetail.playlist.updateTime
      return formDate(new Date(time), 'mm月dd日')
    }
  }
}
</script>
<style lang="less" scoped>
.rank-item {
  cursor: pointer;
  width: 300px;
  height: 400px;
  margin-right: 15px;
}
.rank-item-top {
  width: 100%;
  height: 100px;
  position: relative;
}
.rank-item-top .left {
  width: 200px;
  padding: 0px 25px;
  display: flex;
  align-items: center;
  padding-top: 10px;
}
.left-itemF {
  font-size: 54px;
  margin-right: 10px;
}
.set {
  display: flex;
  position: relative;
}
.update {
  width: 100px;
  position: absolute;
  left: 5px;
  top: 15px;
}
.left-item {
  font-size: 26px;
  margin-top: -20px;
}
.right {
  width: 50px;
  height: 50px;
  position: absolute;
  right: 20px;
  top: 0px;
  bottom: 0px;
  margin: auto;
}
.right img {
  width: 100%;
}
</style>
