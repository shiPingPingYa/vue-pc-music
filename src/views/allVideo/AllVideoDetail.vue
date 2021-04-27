<template>
  <div class="all-video-detail">
    <video-bar ref="video_bar" :videoBar="videoBar"></video-bar>
    <div class="content">
      <keep-alive>
      <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import VideoBar from './childComps/VideoBar'
export default {
  name: 'AllVideoDetail',
  components: {
    VideoBar
  },
  data () {
    return {
      videoBar: ['视频', '所有MV'],
      videoLink: ['/video/allvideo', '/video/allmv']
    }
  }
}
</script>
<style lang="less" scoped>
.all-video-detail{
  margin: 20px 20px ;
  width: 100%;
  height: calc(100% - 30px);
  overflow: hidden;
  > .content{
    width: 100%;
    height: 100%;
  }
}
</style>
