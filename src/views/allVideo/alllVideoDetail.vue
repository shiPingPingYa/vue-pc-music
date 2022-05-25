<template>
  <div class="all-video-detail">
    <div class="video-bar">
      <div class="bar-list">
        <div class="bar-item" v-for="(item, index) in tabBarList" :key="index" :class="{ action: activeBar == index }" @click="handleTabClick(index)">
          {{ item }}
        </div>
      </div>
    </div>
    <div class="content">
      <transition name="opacity">
        <keep-alive>
          <component :is="page" />
        </keep-alive>
      </transition>
    </div>
  </div>
</template>
<script>
import AllVideo from './components/allVideo';
import AllMv from '@/views/allMv/index';
export default {
  name: 'AllVideoDetail',
  components: { AllVideo, AllMv },
  data() {
    return {
      activeBar: 0,
      tabBarList: ['视频', '所有MV'],
      pageMap: { 0: 'AllVideo', 1: 'AllMv' }
    };
  },
  computed: {
    page() {
      return this.pageMap[this.activeBar];
    }
  },
  methods: {
    handleTabClick(i) {
      this.activeBar = i;
    }
  }
};
</script>
<style lang="less" scoped>
.all-video-detail {
  margin: 20px 20px;
  width: 100%;
  height: calc(100% - 30px);
  overflow: hidden;
  & > .video-bar {
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

  & > .content {
    width: 100%;
    height: 100%;
  }
  .action {
    color: #01060a;
    border-bottom: 2px solid #bbbbbd;
  }
  .opacity-enter-active,
  .opacity-leave-active {
    transition: all 0.4s;
  }
  .opacity-enter-to,
  .opacity-leave {
    opacity: 0;
    transform: translateX(-200px);
  }
  .opacity-enter,
  .opacity-leave-to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
