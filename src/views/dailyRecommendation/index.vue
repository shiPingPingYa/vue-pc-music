<template>
  <div class="day_music_detail">
    <div class="day_music_info">
      <div class="info_left">
        <div class="day_music_back"></div>
        <div class="day_music_time">
          <div class="day_music_date">{{ dateMap.week }}</div>
          <div class="day_music_day">{{ dateMap.date }}</div>
        </div>
      </div>
      <div class="info_right">
        <p>每日歌曲推荐</p>
        <span>根据你的音乐口味生成，每天6:00更新</span>
      </div>
    </div>
    <div class="day_music_play">
      <div class="play"><i class="el-icon-video-play" />播放全部</div>
      <div><i class="el-icon-folder-add" />收藏全部</div>
    </div>
    <scroll class="day_music_scroll">
      <div class="day_music_list">
        <musicItem :musicList="musicList" @musicItemClick="handleMusicClick" />
      </div>
    </scroll>
  </div>
</template>
<script>
import { getDayMusic } from '@/network/detail';
import { mixinsPlayMusic } from '@/mixins/mixinsPlayMusic';
import { formDate } from '@/assets/common/tool';
import musicItem from '@/components/musicItem';
export default {
  name: 'dailyRecommendation',
  mixins: [mixinsPlayMusic],
  components: { musicItem },
  data() {
    return {
      musicList: [],
      weekMap: {
        0: '星期天',
        1: '星期一',
        2: '星期二',
        3: '星期三',
        4: '星期四',
        5: '星期五',
        6: '星期六'
      }
    };
  },
  computed: {
    dateMap() {
      let dateExample = new Date();
      return {
        date: dateExample.getDate(),
        week: this.weekMap[dateExample.getDay()]
      };
    }
  },
  created() {
    this.initDayMusicList();
  },
  methods: {
    async initDayMusicList() {
      const {
        data: {
          data: { dailySongs }
        }
      } = await getDayMusic();
      this.musicList = dailySongs.map(item => {
        return {
          id: item.id,
          name: item.name,
          album: item.al.name,
          song: item.ar[0].name,
          pic: item.al.picUrl,
          time: formDate(new Date(item.dt), 'mm:ss')
        };
      });
    },
    handleMusicClick(i) {
      this.playMusic(i);
    }
  }
};
</script>
<style lang="less" scoped>
.day_music_detail {
  margin: 4% auto;
  width: 90%;
  height: 94%;

  .day_music_info {
    display: flex;
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
    justify-content: flex-start;
  }
}

.info_left {
  position: relative;
  width: 200px;

  .day_music_back {
    width: 200px;
    height: 200px;
    background: rgb(9, 168, 231);
  }
}

.info_right {
  flex: 1;
}

.day_music_time {
  position: absolute;
  top: 20%;
  left: 50%;
  text-align: center;
  transform: translateX(-50%);

  .day_music_date {
    color: black;
  }

  .day_music_day {
    font-size: 100px;
    color: red;
  }
}

.info_right {
  padding: 20px 0 0 60px;

  p {
    font-size: 26px;
    margin-bottom: 20px;
  }
}

.day_music_play {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  & div {
    margin-right: 10px;
    padding: 5px 10px;
    width: 100px;
    height: 30px;
    text-align: center;
    background-color: #fff;
    border-radius: 10px;
    font-size: 14px;
    cursor: pointer;
  }

  & .play {
    background-color: #cd2929;
  }
}

.day_music_list {
  margin-top: 20px;
}

.day_music_scroll {
  width: 100%;
  height: calc(100% - 200px - 42px);
  overflow: hidden;
}
</style>
