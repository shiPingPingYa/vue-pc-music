<template>
  <div class="video-bar">
    <div class="bar-list">
      <div class="bar-item" v-for="(item,index) in tabBarList" :key="index" :class="{'action':currentIndex == index}" @click="handleTabClick(index)">
        {{item}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VideoBar',
  data () {
    return {
      currentIndex: 0,
      tabBarList: ['视频', '所有MV']
    }
  },
  methods: {
    handleTabClick (i) {
      this.currentIndex = i
      switch (i) {
        case 0:
          this.$router.push('/video/allvideo')
          break
        case 1:
          this.$router.push('/video/allmv')
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .video-bar {
    width: 94%;
    height: 36px;
    padding: 0;
    border-bottom: 1px solid #c4c6c9;
    > .bar-list {
      margin: auto;
      width: 40%;
      height: 100%;
      display: flex;
      text-align: center;
      line-height: 30px;
      color: #828385;
      font-size: 14px;
      > .bar-item {
        margin-right: 20px;
        width: 60px;
        height: 100%;
        cursor: pointer;
      }
    }
  }

  .action {
    color: #01060a;
    border-bottom: 2px solid #bbbbbd;
  }
</style>
