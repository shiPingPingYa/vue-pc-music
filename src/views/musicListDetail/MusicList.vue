<template>
  <div class="music-lsit">
    <!-- 每日推荐 -->
  <div class="list-item newday" v-if="isShow" v-show="isShow" @click="enterDayDetail()">
    <div class="new">
      <p>{{getDate}}</p>
      <div>{{time}} </div>
    </div>
  </div>
  <!-- 歌单列表 -->
  <div class="song-item" v-for="(item,index) in totalList" :key="index"
  @click="enterDetail(index)">
    <!-- 背景图 -->
    <img :src="getImgUrl(item) + '?param=230y230'" alt="">
     <!-- 标题 -->
    <div class="title">
      {{item.name}}
    </div>
    <!-- 右上背景 -->
    <div class="count">
      <img src="../../assets/img/content/erji.svg" alt="">
      {{item.playCount}}
    </div>

  </div>
  </div>
</template>
<script>
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
  data () {
    return {
      isShow: false
    }
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
    }

  }
}
</script>
<style lang="less" scoped>
.music-lsit{
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.song-item{
    padding-bottom: 10px;
    position: relative;
    width: 24%;
    max-width: 230px;
    font-size: 13px;
    color: #01060a;
    cursor: pointer;
    > img{
      width: 100%;
      max-height: 250px;
      background-size: 100%,100%;
    }
  }

.count{
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: right;
  color: #fafbf5;
  background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
  > img{
    display: inline-block;
    width: 10px;
    height: 10px;
    background-size: 100%,100%;
  }
}

</style>
