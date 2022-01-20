<template>
  <div class="me-song-list-container">
    <scroll class="me-song-list-scroll">
      <div class="music-list" v-show="isTable === 0">
        <div class="musicCategary" v-for="(item, index) in songList" :key="index">
          <img :src="item.coverImgUrl" @click="goMusicListDetail(item.id)" @mouseenter.stop="isMusicPlayIcon = index" @mouseout="isMusicPlayIcon = -1" />
          <div class="musicCategary_playCount">
            <img src="../../../../assets/img/content/erji.svg" alt="" />
            {{ item.playCount }}
          </div>
          <div>
            <div class="one_line_over">{{ item.name }}</div>
            <div style="color: #828385; line-height: 20px">
              {{ item.trackCount }}
            </div>
          </div>
          <div class="music_play_icon" v-show="isMusicPlayIcon === index" @mouseenter.stop="isMusicPlayIcon = index" @click="getMusicList(item.id)">
            <i class="el-icon-video-play"></i>
          </div>
        </div>
      </div>
      <el-row>
        <el-table :data="songList" v-show="isTable === 1" :show-header="isTableHeader">
          <el-table-column max-height="40px">
            <template slot-scope="scope">
              <div class="table-02-image">
                <img :src="scope.row.coverImgUrl + '?param=60y60'" @click="goMusicListDetail(scope.row.id)" />
                <i class="el-icon-video-play" @click="getMusicList(scope.row.id)"></i>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name"></el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              歌曲:{{ scope.row.trackCount }}首
            </template>
          </el-table-column>
          <el-table-column prop="creator.nickname"> </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <i class="i-b-rp-4 el-icon-folder-add"></i>{{ scope.row.adType }}
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <i class="i-b-rp-4 el-icon-video-play"></i>{{ scope.row.playCount }}
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row v-show="isTable === 2">
        <el-row v-for="item in songList" :key="item.id">
          <el-col :span="8">
            <img :src="item.coverImgUrl + '?param=200y200'" />
          </el-col>
          <el-col :span="14" :offset="2">
            <div class="table_03_header">
              <div>{{ item.name }}</div>
              <div class="table_03_icon">
                <i class="el-icon-folder-add"></i>
                <i class="el-icon-video-play" @click="getMusicList(item.id)"></i>
              </div>
            </div>
            <el-table v-if="typeof allMusicList[item.id] == 'object'" :data="allMusicList[item.id].slice(0, 5)" :show-header="isTableHeader">
              <el-table-column type="index" :index="indexMethod"></el-table-column>
              <el-table-column>
                <template>
                  <i class="el-icon-video-play i-f-r"></i>
                </template>
              </el-table-column>
              <el-table-column prop="name"></el-table-column>
            </el-table>
            <p class="p-f14-c" @click="goMusicListDetail(item.id)" v-if="typeof allMusicList[item.id] == 'object'">
              查看全部{{ allMusicList[item.id].length }}首
            </p>
          </el-col>
        </el-row>
      </el-row>
    </scroll>
  </div>
</template>
<script>
import { _getMusicListDetail, _getSongsDetail } from 'api/detail'
import Scroll from 'common/scroll/Scroll.vue'
import { formDate } from 'js/tool'
import { indexMixin } from '@/views/musicListDetail/indexMixin'
export default {
  components: { Scroll },
  name: 'MeSongList',
  props: {
    songList: {
      type: Array,
      default () {
        return []
      }
    },
    isTable: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  mixins: [indexMixin],
  data () {
    return {
      isMusicItemPlay: -1,
      isMusicPlayIcon: -1,
      isMusicPlayIcon2: -1,
      allMusicList: {},
      musicList: [],
      isTableHeader: false
    }
  },
  created () {
    this.initAllMusicList()
  },
  methods: {
    // 初始化所有歌单的音乐
    async initAllMusicList () {
      this.songList.forEach(async item => {
        const {
          data: {
            playlist: { trackIds }
          }
        } = await _getMusicListDetail(item.id)
        const ids = trackIds.map(item => item.id).join(',')
        const {
          data: { songs }
        } = await _getSongsDetail(ids)
        this.allMusicList[item.id] = songs.map(item => {
          return {
            id: item.id,
            name: item.name,
            album: item.al.name,
            song: item.ar[0].name,
            pic: item.al.picUrl,
            time: formDate(new Date(item.dt), 'mm:ss')
          }
        })
      })
    },
    goMusicListDetail (id) {
      this.$router.push('/musiclistdetail/' + id)
    },
    // 获取音乐列表
    getMusicList (id) {
      for (const key in this.allMusicList) {
        if (String(id) === key) {
          this.musicList = this.allMusicList[key]
          return this.playMusic()
        }
      }
    },
    indexMethod (i) {
      return i < 9 ? `0${i + 1}` : i + 1
    }
  }
}
</script>
<style lang="less" scoped>
  .me-song-list-container {
    width: 100%;
  }
  .me-song-list-scroll {
    width: 100%;
    height: 50vh;
    overflow: hidden;
  }
  .music-list {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding-bottom: 40px;
    .musicCategary {
      position: relative;
      width: 200px;
      height: 200px;
      margin-top: 40px;
      margin-bottom: 40px;
      margin-left: 40px;
      img {
        width: 100%;
        height: 100%;
      }
      &:hover {
        cursor: pointer;
      }
    }
    .musicCategary_playCount {
      position: absolute;
      width: 100%;
      height: 20px;
      top: 0;
      right: 0;
      line-height: 20px;
      text-align: right;
      color: #fff;
      background: linear-gradient(to right, #fff, rgb(143, 139, 139));
      opacity: 0.8;
      img {
        width: 14px;
        height: 14px;
      }
    }
  }

  .music_play_icon {
    position: absolute;
    bottom: 4px;
    right: 4px;
    font-size: 16px;
    i {
      font-size: 26px;
      color: #fff;
    }
  }
  .i-b-rp-4 {
    display: inline-block;
    padding-right: 4px;
  }

  .table-02-image {
    position: relative;
    width: 60px;
    height: 60px;
    i {
      display: none;
      position: absolute;
      top: 50%;
      left: 50%;
      color: #fff;
      font-size: 26px;
      transform: translate(-50%, -50%);
    }
    img {
      cursor: pointer;
    }
    &:hover {
      i {
        display: inline-block;
        cursor: pointer;
      }
    }
  }

  .table_03_header {
    display: flex;
    justify-content: space-between;
  }

  .table_03_icon {
    i {
      display: inline-block;
      font-size: 18px;
      margin-right: 10px;
      &:hover {
        cursor: pointer;
      }
    }
  }

  .i-f-r {
    font-size: 16px;
    color: red;
  }

  .p-f14-c {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #828385;
    opacity: 0.8;
    &:hover {
      cursor: pointer;
      opacity: 1;
    }
  }

  .one_line_over {
    width: 100%;
    height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>
