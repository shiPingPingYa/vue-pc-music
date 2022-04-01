<template>
  <div class="new-songs">
    <!-- 头部导航栏 -->
    <div class="area">
      <div class="area-item" v-for="(item,index) in tabList" :key="index" @click="handleTabClick(index)" :class="{'action':areaIndex == index}">
        {{item.name}}
      </div>
    </div>
    <scroll ref="scroll" class="new-scroll" :pull-up-load="true">
      <div class="content">
        <!-- 播放按钮 -->
        <div class="play" @click="playMusic()">
          <i class="el-icon-video-play"></i>
          <span> 播放全部</span>
        </div>
        <div class="music">
          <table>
            <tbody>
              <tr v-for="(item,index) in musicList" :key="index" :class="{'backColor':setMusicItemBack(index)}" @click="playMusicItem(index)">
                <td>{{setMusicItemIndex(index)}}</td>
                <td>
                  <div class="backMask">
                    <img src='' :data-src="item.pic + '?param=50y50'" alt="" v-imgLazy>
                    <div class="icon">
                      <i class="el-icon-video-play"></i>
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
import Scroll from 'common/scroll/Scroll'
import { _getTopSongs } from 'api/discover'
import { _getSongsDetail } from 'api/detail'
import { formDate } from 'js/tool'
import { indexMixin } from '../../musicListDetail/indexMixin' // 播放音乐方法混入
export default {
  name: 'NewSongs',
  components: {
    Scroll
  },
  data () {
    return {
      imgCurrent: 0,
      areaIndex: 0,
      tabList: [
        { value: 0, name: '全部' },
        { value: 7, name: '华语' },
        { value: 96, name: '欧美' },
        { value: 16, name: '韩国' },
        { value: 8, name: '日本' }
      ],
      limit: 30,
      list: [],
      musicList: []
    }
  },
  mixins: [indexMixin],
  created () {
    this.initNewMusicList()
  },
  watch: {
    // 监听标签改变，重置
    areaIndex () {
      this.page = 0
    }
  },
  methods: {
    // 头部导航条点击
    handleTabClick (index) {
      this.areaIndex = index
      this.page = 0
      this.initNewMusicList()
    },
    async initNewMusicList () {
      this.musicList = []
      this.page++
      const {
        data: { data }
      } = await _getTopSongs(this.tabList[this.areaIndex].value)
      const ids = data
        .slice(0, this.limit)
        .map(item => item.id)
        .join(',')
      const {
        data: { songs }
      } = await _getSongsDetail(ids)
      this.musicList = songs.map(item => {
        return {
          id: item.id,
          name: item.name,
          album: item.al.name,
          song: item.ar[0].name,
          pic: item.al.picUrl,
          time: formDate(new Date(item.dt), 'mm:ss')
        }
      })
    },
    // 播放选中音乐
    playMusicItem (index) {
      this.$bus.$emit('playMusicListItem', index)
    },
    setMusicItemBack (i) {
      return i % 2 !== 0
    },
    setMusicItemIndex (i) {
      return i + 1 <= 9 ? `0${i + 1}` : i + 1
    }
  }
}
</script>
<style lang="less" scoped>
  .new-songs {
    padding: 0 98px;
    margin-bottom: 20px;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .new-scroll {
    height: calc(100% - 45px);
    overflow: hidden;
  }

  .area {
    display: flex;
    border-bottom: 1px solid #d3d4d6;
    color: #01060a;
    font-size: 14px;
    > .area-item {
      padding: 10px 10px;
      cursor: pointer;
    }
  }

  .content {
    margin-top: 8px;
    > .play {
      padding: 10px 0;
      width: 100%;
      font-size: 24px;
      cursor: pointer;
      > span {
        font-size: 14px !important;
      }
      > i {
        vertical-align: -4px;
        color: red;
      }
    }
  }

  .music > table {
    width: 100%;
    border: 1px solid #e0e0e0;
    border-spacing: 0;
    > tbody {
      font-size: 13px;
    }
  }

  .music tr {
    height: 50px;
    text-align: left;
    cursor: pointer;
  }

  .music tr:hover {
    background-color: #b6b6b6;
  }

  .music > tr > td {
    position: relative;
    border: 1px solid #23262c;
  }

  .music tr td:nth-child(1) {
    width: 10%;
    text-align: center;
  }
  .music tr td:nth-child(2) {
    width: 14%;
    > img {
      width: 100%;
    }
  }

  .music tbody tr td:nth-child(3) {
    width: 34%;
    color: #01060a;
  }

  .backMask {
    position: relative;
    width: 50px;
    height: 50px;
    > img {
      width: 100%;
      height: 100%;
      background-size: 100%, 100%;
    }
    > .icon {
      position: absolute;
      margin: auto;
      width: 24px;
      height: 24px;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      > i {
        font-size: 24px;
        color: #fff;
        opacity: 0.8;
      }
    }
  }

  .music > tr > td:nth-child(4) {
    width: 34%;
  }
  .music > tr > td:nth-child(5) {
    width: 8%;
  }

  .backColor {
    background: #eeecec;
  }

  .action {
    color: #01060a;
    border-bottom: 2px solid #828384;
  }
</style>
