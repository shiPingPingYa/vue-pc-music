<template>
  <div class="new-songs">
    <!-- 头部导航栏 -->
    <div class="area">
      <div class="area-item" v-for="(item,index) in area" :key="index"
      @click="areaClick(index)" :class="{action:areaIndex == index}">
      {{item.name}}
      </div>
    </div>
    <scroll ref="scroll" class="new-scroll" :pull-up-load="true" @pullingUp='pullingUp'>
      <div class="content">
        <!-- 播放按钮 -->
        <div class="play"  @click="playAllMusic()">
          <img src="../../../assets/img/playmusic/rebofang.svg" alt="">
          播放全部
        </div>
        <div class="music">
          <table>
            <tbody>
              <tr v-for="(item,index) in musicList" :key="index"
              :class="{backColor:setBackColor(index)}"
              @click="newSongItem(index)">
                <td>{{setSerial(index)}}</td>
                <td>
                  <div class="backMask">
                    <img :src="item.pic" alt="">
                  <div class="icon">
                       <img src="../../../assets/img/playmusic/bofang.svg" alt="" >
                  </div>
                  </div>
                </td>
                <td>{{item.name}}</td>
                <td>{{item.album}} </td>
                <td>{{item.time}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
import Scroll from '../../../components/common/scroll/Scroll'
import { SongDetail, _getSongsDetail } from '../../../network/detail'
// 导入新歌速递接口，type: 地区类型 id
import { _getTopSongs } from '../../../network/discover'
import { tableMixin } from '../../musicListDetail/tableMixin'
// 混入
import { indexMixin } from '../../musicListDetail/indexMixin'
export default {
  name: 'NewSongs',
  components: {
    Scroll
  },
  data () {
    return {
      imgCurrent: 0,
      areaIndex: 0,
      area: [
        { value: 0, name: '全部' },
        { value: 7, name: '华语' },
        { value: 96, name: '欧美' },
        { value: 16, name: '韩国' },
        { value: 8, name: '日本' }
      ],
      page: 0,
      list: [],
      musicList: []
    }
  },
  mixins: [tableMixin, indexMixin],
  created () {
    this.getTopSongs()
  },
  methods: {
    // 头部导航条点击
    areaClick (index) {
      this.areaIndex = index
      this.page = 0
      this.getTopSongs(true)
    },
    // scroll的下拉 事件
    pullingUp () {
      this.getTopSongs()
    },
    async  getTopSongs (clear = false) {
      // 判断是否清空音乐数组
      if (clear) this.musicList = []
      this.page++
      await _getTopSongs(this.area[this.areaIndex].value).then(res => {
        this.list = res.data.data.slice(0, this.page * 10)
      })
      for (var i of this.list) {
        _getSongsDetail(i.id).then(res => {
          var song = new SongDetail(res.data.songs)
          this.musicList.push(song)
        })
      }
      this.$refs.scroll.finishPullUp()
    },
    // 播放全部音乐
    playAllMusic () {
      this.playMusic()
    },
    // 播放选中音乐
    newSongItem (index) {
      this.$bus.$emit('playMusicListItem', index)
    }
  }
}
</script>
<style lang="less" scoped>
.new-songs{
  padding:0 98px ;
  margin-bottom: 20px;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.new-scroll{
 height: calc(100% - 45px);
 overflow: hidden;
}

.area{
  display: flex;
  border-bottom: 1px solid #25272b;
  color: #828384;
  font-size: 14px;
  > .area-item{
    padding: 10px 10px;
    cursor: pointer;
  }
}

.content{
  margin-top: 8px;
  > .play{
    padding: 10px 0;
    width: 100%;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
    > img{
      width: 24px;
      height: 24px;
      vertical-align: -6px;
      background-size: 100%,100%;
    }
  }
}

.music > table{
      width: 100%;
      border: 1px solid #2c2e32;
      border-spacing: 0;
      > tbody{
        font-size: 13px;
        color: #575757;
    }
  }

.music  tr {
    height: 50px;
    text-align: left;
    cursor: pointer;
}

.music  tr:hover{
  background-color: #2c2e32;
  color: #fff  !important;
}

.music > tr > td{
  position: relative;
  border: 1px solid #23262c;
}

.music tr td:nth-child(1) {
  width: 10%;
  text-align: center;
}
.music tr td:nth-child(2) {
  width: 14%;
  > img{
    width: 100%;
  }
}

.music tbody tr td:nth-child(3) {
  width: 34%;
   color: #dcdde4;
}

.backMask{
    position: relative;
    width: 50px;
    height: 50px;
    > img{
      width: 100%;
      height: 100%;
      background-size: 100%,100%;
    }
    > .icon{
      position: absolute;
      margin: auto;
      width: 24px;
      height: 24px;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      > img{
        width: 100%;
        height: 100%;
        background-size: 100%,100%;
      }
    }
}

.music  > tr > td:nth-child(4){
  width: 34%;
}
.music  > tr > td:nth-child(5){
  width: 8%;
}

.backColor {
  background: #1a1c20;
}

.action{
  color: #fff;
  border-bottom: 2px solid #828384;
}
</style>
