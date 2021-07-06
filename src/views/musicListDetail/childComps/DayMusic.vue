<template>
  <div class="day_music_detail">
      <div class="day_music_info">
        <div class="info_left">
          <div class="day_music_back"></div>
          <div class="day_music_time">
            <div class="day_music_date">{{getDay}}</div>
            <div class="day_music_day">{{getDate}}</div>
          </div>
        </div>
        <div class="info_right">
          <p>每日歌曲推荐</p>
          <span>根据你的音乐口味生成，每天6:00更新</span>
        </div>
      </div>
      <div class="day_music_play">
       <div style="display:flex">
          <el-button icon="el-icon-video-play" size="small" > 播放全部 </el-button>
        <div class="el_add"><i class="el-icon-plus" ></i></div>
       </div>
       <div>
         <el-button icon="el-icon-folder-add" style="background: #fff;color:black" size="small">收藏全部</el-button>
       </div>
      </div>
      <scroll class="day_music_scroll">
      <div class="day_music_list">
       <music-item :musicList="musicList" @musicItemClick="musicItemClick"></music-item>
      </div>
      </scroll>
  </div>
</template>
<script>
import Scroll from '../../../components/common/scroll/Scroll.vue'
import { getDayMusic, AllSongDetail } from '../../../network/detail'
import { indexMixin } from '../../../views/musicListDetail/indexMixin'
const musicItem = () => import('./MusicItem.vue')
export default {
  name: 'DayMusic',
  data () {
    return {
      musicList: []
    }
  },
  components: { musicItem, Scroll },
  mixins: [indexMixin],
  created () {
    const date = new Date()
    this.getDate = date.getDate()
    this.getDay = this.isGetDay(date.getDay())
    getDayMusic().then(res => {
      res.data.data.dailySongs.forEach(item => this.musicList.push(new AllSongDetail(item)))
    })
  },
  methods: {
    isGetDay (day) {
      switch (day) {
        case 0: return '星期天'
        case 1: return '星期一'
        case 2: return '星期二'
        case 3: return '星期三'
        case 4: return '星期四'
        case 5: return '星期五'
        case 6: return '星期六'
      }
    },
    musicItemClick () {
      // 播放音乐
      this.playMusic()
    }
  }
}
</script>
<style lang="less" scoped>
.day_music_detail{
    margin: 4% auto;
    width: 90%;
    height: 94%;
    .day_music_info{
      display: flex;
      width: 100%;
      height: 200px;
      margin-bottom:20px ;
      justify-content: flex-start;
    }
}

.info_left{
  position: relative;
  width: 200px;
  .day_music_back{
  width: 200px;
  height: 200px;
  background: rgb(9, 168, 231);
}
}

.info_right{
  flex: 1;
}

.day_music_time{
    position: absolute;
    top: 20%;
    left: 50%;
    text-align: center;
    transform: translateX(-50%);
    .day_music_date{
      color: black;
    }
    .day_music_day{
      font-size: 100px;
      color: red;
    }
  }

.info_right{
  padding:20px 0 0   60px;
  p{
    font-size: 26px;
    margin-bottom: 20px;
  }
}

.day_music_play{
  display: flex;
  justify-content: space-between;
  button{
    font-size: 18px;
    color: #fff;
    background: red;
    outline: none;
    border: none;
  }
  .el_add{
    width: 20px;
    height: 42px;
    margin-left: -10px;
    color: #fff;
    background: red;
    line-height: 44px;
    i{
      &:hover{
        cursor: pointer;
      }
    }
  }
}

.day_music_list{
  margin-top: 20px;
}

.day_music_scroll{
  width: 100%;
  height: calc(100% - 200px - 42px);
  overflow: hidden;
}
</style>
