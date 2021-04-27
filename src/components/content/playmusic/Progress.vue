<template>
  <div class="progress" @click="proClick($event)" ref="progress">
    <!-- 小线条 -->
    <div class="progress-line" :style="{width:proLine +'px'}"></div>
    <!-- 小圆点 -->
    <div class="progress-dot" ref="load" :style="{transform:'translateX('+proLoad + 'px)'}"></div>
  </div>
</template>
<script>
export default {
  name: 'Progress',
  data () {
    return {
      //
      proLine: 0,
      proLoad: 0,
      width: 0,
      offsetLeft: 0,
      scale: 0
    }
  },
  methods: {
    // 获取鼠标与进度条的比例
    proClick (e) {
      // 获取鼠标点击位置,e.offsetx是相对div的位置来定义
      this.setProgress(e.offsetX)
      // 获取鼠标点击后的比例
      this.scale = parseFloat((this.proLine / this.$refs.progress.offsetWidth).toFixed(2))
      // 触发父组件监听的方法,将比例传递出去
      this.$emit('childClickScale', this.scale)
    },
    // 根据audio的播放比例,重新设置小圆点和de线条的位置
    setAudioProgress (scale) {
      this.proLine = scale * this.$refs.progress.offsetWidth
      this.proLoad = scale * this.$refs.progress.offsetWidth
    },
    // 设置播放进度条的前进
    setProgress (width) {
      this.proLine = width
      this.proLoad = width
    }

  }
}
</script>
<style lang="less" scoped>
.progress{
  position: relative;
  width: 100%;
  height: 3px;
  border-radius: 2px;
  background: #dbdbdb;
  cursor: pointer;
  > .progress-line{
    width: 50px;
    height: 100%;
    background-color: rgb(103, 197, 235);
  }
  > .progress-dot{
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fff;
    transform: translateX(50px);
  }
}
</style>
