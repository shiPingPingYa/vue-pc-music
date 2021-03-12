<template>
 <div class="rank-item" v-if="musicListDetail !== null">
        <!--卡片区域头部图片 -->
     <div
      class="rank-item-top"
      :style="{background:'linear-gradient(to right,'+bgColor[0]+','+bgColor[1]+')'}"
      @click="enterDetail()"
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
import { _getMusicListDetail, _getSongsDetail, SongDetail } from '../../../network/detail'
// // 格式化日期
import { formDate } from '../../../assets/common/tool'
// // 处理隔行变色
import { tableMixin } from '../../musicListDetail/tableMixin'
export default {
  name: 'RankListItem',
  props: {
    rankId: {
      type: Number,
      default () {
        return 0
      }
    },
    newSongId: {
      type: Number,
      default () {
        return 0
      }
    },
    originalId: {
      type: Number,
      default () {
        return 0
      }
    },
    hotId: {
      type: Number,
      default () {
        return 0
      }
    },
    artistId: {
      type: Number,
      default () {
        return 0
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
  computed: {
    getUpdateTime () {
      var time = this.musicListDetail.playlist.updateTime
      return formDate(new Date(time), 'mm月dd日')
    }
  },
  mounted () {
    if (this.rankId || this.newSongId || this.hotId || this.originalId || this.artistId !== null) {
      _getMusicListDetail(this.rankId || this.newSongId || this.hotId || this.originalId || this.artistId).then(res => {
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
  methods: {
    enterDetail () {
      this.$router.push('/musiclistdetail/' + (this.rankId ||
       this.newSongId || this.artistId || this.hotId || this.originalId) + '/' + new Date().getTime())
    }
  },
  mixins: [tableMixin]

}
</script>
<style lang="less" scoped>
.rank-item {
  margin-right: 15px;
  width: 300px;
  height: 400px;
  color: #fff;
  cursor: pointer;

}
.rank-item-top {
  position: relative;
  width: 100%;
  height: 100px;
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
    color: #575757;
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
  color: #dcdde4;
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
