<template>
  <div class="new-songs">
    <div class="top">最新音乐</div>
    <div class="content">
      <div class="item" v-for="(item, index) in songList" :key="index"  @dblclick="playMusic(index)">
        <div class="number">{{index+1}} </div>
      <div class="title">
        <img :src="item.picUrl + '?param=70y70'" alt="">
        <div class="icon">
          <i class="el-icon-video-play"></i>
        </div>
      </div>
      <div class="mess">
        <div>{{item.name}} </div>
        <div class="bottom">
          {{item.song.album.company}}
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NewSongs',
  props: {
    songList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    // 触发父组件上面的方法，传递播放的音乐
    playMusic (index) {
      this.$emit('playMusic', index)
    }
  }
}
</script>
<style lang="less" scoped>
.new-songs{
  margin-top: 20px;
  width: 100%;
  height: 100%;
  >.top{
    line-height: 30px;
    font-size: 16px;
    color: #01060a;
    border-bottom: 1px solid #b8b6b6;
  }
  > .content{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
}

.item{
  display: flex;
  margin-top: 10px;
  padding-top: 10px 10px;
  width: 45%;
  height: 70px;
  cursor: pointer;
  > .number{
    width: 40px;
    height: 70px;
    line-height: 70px;
    text-align: center;
    font-size: 13px;
    color: #a7aaa3;
  }
  > .title{
    position: relative;
    height: 100%;
    > img{
      height: 100%;
    }
    > .icon{
      position: absolute;
      margin: auto;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 18px;
      height: 18px;
      font-size: 24px;
      background-color: rgba(0, 0, 0, 0.3);
      color: #ffff;
    }
  }
  > .mess{
    position: relative;
    margin-left: 10px;
    flex: 1;
    font-size: 13px;
    color: #01060a;
    > .bottom{
      position: absolute;
      margin-top: 6px;
    }
  }
}

</style>
