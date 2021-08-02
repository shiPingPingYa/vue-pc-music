<template>
  <div class="music-lsit">
    <!-- 每日推荐 -->
    <div class="day_music" v-show="isLogin && isDayMusic" @click="enterDayDetail()">
      <div class="day_music_back"></div>
      <div class="day_music_time">
        <div class="day_music_date">{{ getDay }}</div>
        <div class="day_music_day">{{ getDate }}</div>
      </div>
      <div class="day_music_title">每日歌曲推荐</div>
    </div>
    <!-- 歌单列表 -->
    <div
      class="song-item"
      v-for="(item, index) in totalList"
      :key="index"
      @click="enterDetail(index)"
    >
      <!-- 背景图 -->
      <img :src="getImgUrl(item) + '?param=230y230'" alt="" />
      <!-- 标题 -->
      <div class="title">
        {{ item.name }}
      </div>
      <!-- 右上背景 -->
      <div class="count">
        <img src="../../assets/img/content/erji.svg" alt="" />
        {{ item.playCount }}
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MusicList',
  props: {
    totalList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  data () {
    return {
      getDate: '',
      getDay: '',
      isDayMusic: true

    }
  },
  watch: {
    $route: {
      handler (val) {
        if (val.path === '/discover/individ') {
          this.isDayMusic = true
        } else {
          this.isDayMusic = false
        }
      },
      deep: true
    }
  },
  created () {
    const date = new Date()
    this.getDate = date.getDate()
    this.getDay = this.isGetDay(date.getDay())
  },
  methods: {
    // 跳转到推荐详情页
    enterDayDetail () {
      this.$router.push('/daymusic')
    },
    getImgUrl (item) {
      return item.picUrl || item.coverImgUrl
    },
    // 条状到音乐详情页
    enterDetail (index) {
      this.$router.push({ path: '/musiclistdetail/' + this.totalList[index].id, query: { songId: this.totalList[index].id } })
    },
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
    }

  }
}
</script>
<style lang="less" scoped>
  .music-lsit {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .song-item {
    padding-bottom: 10px;
    position: relative;
    width: 24%;
    max-width: 230px;
    font-size: 13px;
    color: #01060a;
    cursor: pointer;
    > img {
      width: 100%;
      max-height: 250px;
      background-size: 100%, 100%;
    }
  }

  .count {
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

  .day_music {
    position: relative;
    width: 230px;
    height: 267px;
    text-align: center;
    &&:hover {
      cursor: pointer;
    }
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
</style>
