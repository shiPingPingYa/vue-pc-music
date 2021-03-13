<template>
  <div class="video-bar">
    <div class="bar-list">
        <div class="bar-item" v-for="(item,index) in videoBar" :key="index"
        :class="{action:currentIndex == index}" @click="barClick(index)">
          {{item}}
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VideoBar',
  props: {
    videoBar: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    barClick (i) {
      this.currentIndex = i
      switch (i) {
        case 0:this.$router.push('/video/allvideo')
          break
        case 1:this.$router.push('/video/allmv')
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
.video-bar{
  width: 94%;
  height: 30px;
  border-bottom: 1px solid #8d8e8f;
  > .bar-list{
    margin: auto;
    width: 40%;
    height: 100%;
    display: flex;
    text-align: center;
    line-height: 30px;
    color: #828385;
    font-size: 14px;
    > .bar-item{
      margin-right: 20px;
      width: 60px;
      height: 100%;
      cursor: pointer;
    }
  }
}

.action{
    color: #fff;
    border-bottom: 2px solid #bbbbbd;
}
</style>
