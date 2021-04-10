<template>
   <div class="video-list " v-if="videoList.length !=0">
    <div class="video-item" v-for="(item,index) in videoList" :key="index" @click="playVideo(item.id)">
      <div class="count">
        <img src="../../../assets/img/leftmenu/shiping.svg" alt="">
        <div class="play-count">{{item.count}} </div>
      </div>
      <img :src="item.cover" alt="">
      <div class="desc">
        <p>{{item.title}} </p>
      </div>
    </div>
    <div class="no-video-list" v-if="videoList.length == null">
      <h2>歌手暂时还无专辑</h2>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VideoItem',
  props: {
    videoList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    playVideo (id) {
      this.$router.push('/playvideo/' + id)
    }
  }
}
</script>
<style lang="less" scoped>
.no-video-list{
  width: 100%;
  height: 100%;
  > h2{
  text-indent: 20px;
  line-height: 40px;
  font-size: 16px;
  color: #fff;
  }
}

.video-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    cursor: pointer;
}

.video-item{
  position: relative;
  margin-top: 8px;
  width: 230px;
  font-size: 14px;
  > img{
    width: 230px;
    height: 130px;
    background-size: 100%,100%;
  }
}

.video-item > .count{
  display: flex;
  position: absolute;
  padding: 3px 5px;
  top: 0;
  right: 0;
  width: 80px;
  height: 30px;
  align-items: center;
  justify-content: center;
  background-color: rgba(160, 60, 60, 0.25);
  color: #fff;
  > img{
    width: 100%;
    height: 100%;
  }
}

.desc{
  > p{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #dcdde4;
  }
  > span{
    font-size: 13px;
    color: #828385;
  }
}
</style>
