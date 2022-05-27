<template>
  <div class="music-lsit">
    <!-- 每日推荐 -->
    <div class="day_music" v-show="isLogin && isDayMusic" @click="goDayMusicListDetail()">
      <div class="day_music_back"></div>
      <div class="day_music_time">
        <div class="day_music_date">{{ dateMap.week }}</div>
        <div class="day_music_day">{{ dateMap.date }}</div>
      </div>
      <div class="day_music_title">每日歌曲推荐</div>
    </div>
    <!-- 歌单列表 -->
    <div class="song-item" v-for="(item, index) in totalList" :key="index" @click="goMusicListDetail(index)">
      <img src="" :data-src="getImgUrl(item) + '?param=230y230'" alt="" v-imgLazy />
      <div class="title">{{ item.name }}</div>
      <div class="count">
        <img src="@/assets/img/content/erji.svg" alt="" />
        {{ item.playCount }}
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'songList',
  props: {
    //歌单数组
    totalList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isDayMusic: true,
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
    ...mapGetters(['isLogin']),
    dateMap() {
      let dateExample = new Date();
      return {
        date: dateExample.getDate(),
        week: this.weekMap[dateExample.getDay()]
      };
    }
  },
  watch: {
    '$route.path': {
      handler(path) {
        path === '/discover/individ' ? (this.isDayMusic = true) : (this.isDayMusic = false);
      },
      deep: true
    }
  },
  methods: {
    // 跳转到推荐详情页
    goDayMusicListDetail() {
      this.$router.push('/daymusic');
    },
    getImgUrl(item) {
      return item.picUrl || item.coverImgUrl;
    },
    // 条状到音乐详情页
    goMusicListDetail(index) {
      this.$router.push({ path: '/musicListDetail', query: { id: this.totalList[index].id } });
    },
    isGetDay(day) {
      return {
        0: '星期天',
        1: '星期一',
        2: '星期二',
        3: '星期三',
        4: '星期四',
        5: '星期五',
        6: '星期六'
      }[day];
    }
  }
};
</script>
<style lang="less" scoped>
.music-lsit {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  padding-bottom: 60px;

  .day_music {
    position: relative;
    width: 230px;
    height: 267px;
    text-align: center;
    cursor: pointer;
    .day_music_back {
      width: 229px;
      height: 229px;
      border: 1px solid #b8b6b6;
    }
    .day_music_time {
      position: absolute;
      top: 20%;
      left: 50%;
      transform: translateX(-50%);
      .day_music_day {
        font-size: 100px;
        color: red;
      }
    }
  }

  .song-item {
    position: relative;
    padding-bottom: 10px;
    width: 24%;
    max-width: 230px;
    font-size: 13px;
    color: #01060a;
    cursor: pointer;
    & > img {
      width: 100%;
      max-height: 250px;
      min-height: 180px;
    }
    & > .count {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 20px;
      line-height: 20px;
      text-align: right;
      color: #fafbf5;
      background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
      > img {
        display: inline-block;
        width: 10px;
        height: 10px;
        background-size: 100%, 100%;
      }
    }
  }
}
</style>
