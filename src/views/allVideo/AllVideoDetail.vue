<template>
  <div class="all-video-detail">
    <video-bar :videoBar="videoBar"></video-bar>
    <div class="content">
      <router-view></router-view>
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
      videoBar: ['视频', '所有MV']
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
