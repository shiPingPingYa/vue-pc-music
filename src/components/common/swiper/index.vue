<template>
  <div v-if='bannerList !== null' ref='swiper' class='swiper'>
    <!-- 左右按钮 -->
    <div class='left'>
      <div class='pre'><i class='el-icon-arrow-left'></i></div>
    </div>
    <div class='right'>
      <div class='next'><i class='el-icon-arrow-right'></i></div>
    </div>
    <!-- 图片区域 -->
    <div class='imgBox'>
      <ul>
        <li v-for='(item,index) in bannerList ' :key='index' :class="[`list${++index}`]" @dblclick='handleBannerMusicClick(item)'>
          <img :src='item.imageUrl' alt=''>
        </li>
      </ul>
    </div>
    <!-- 下面线条 -->
    <div class='lineBar'><span></span><span></span><span></span><span></span><span></span><span></span>
    </div>
  </div>
</template>
<script>
import { _getCheckMusic, _getSongsDetail, SongDetail } from '@/network/detail'; //
import { _Swiper } from './initSwiper';
import { mixinsPlayMusic } from '@/mixins/mixinsPlayMusic';
export default {
  name: 'swiper',
  props: {
    bannerList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      musicList: [],
    };
  },
  // 混入音乐播放方法
  mixins: [mixinsPlayMusic],
  mounted() {
    this.$refs.swiper && _Swiper(this.$refs.swiper);
  },
  methods: {
    async handleBannerMusicClick(item) {
      // 清空音乐列表
      this.musicList = [];
      // 判断音乐有无版权再做处理
      try {
        const {
          data: { success },
        } = await _getCheckMusic(item.targetId);
        if (success) {
          const {
            data: { songs },
          } = await _getSongsDetail(item.targetId);
          this.musicList.push(new SongDetail(songs));
          // 播放音乐
          this.playMusic();
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style lang='less' scoped>
  .swiper {
    margin: 0 auto;
    position: relative;
    width: 100%;
    height: 214px;
    overflow: hidden;
    cursor: pointer;

    > .imgBox {
      width: 100%;
    }

    > .lineBar {
      position: absolute;
      margin: auto;
      left: 0;
      right: 0;
      bottom: 6px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2;

      > span {
        margin: 0 6px;
        width: 20px;
        height: 3px;
        display: inline-block;
        border-radius: 2px;
        background-color: rgb(182, 179, 179);
        cursor: pointer;
      }
    }
  }

  .imgBox {
    > ul {
      position: relative;
      list-style-type: none;

      > li {
        position: absolute;
        width: 50%;

        > img {
          width: 100%;
        }
      }
    }
  }

  .left {
    position: relative;
    float: left;
    width: 25%;
    height: 100%;
    z-index: 1;
    color: #01060a;
  }

  .right {
    position: relative;
    float: right;
    width: 25%;
    height: 100%;
    z-index: 1;
    color: #01060a;
  }

  .pre {
    position: absolute;
    margin: auto;
    left: 5px;
    top: 0;
    bottom: 0;
    width: 24px;
    height: 24px;
    display: none;
    font-size: 24px;
    z-index: 999;
  }

  .next {
    position: absolute;
    margin: auto;
    right: 5px;
    top: 0;
    bottom: 0;
    width: 24px;
    height: 24px;
    display: none;
    font-size: 24px;
    z-index: 999;
  }

  .lineBar .action {
    background-color: red !important;
  }

  .list1 {
    transform: scale(0.9);
    transform-origin: 0% 100%;
    z-index: 0;
    opacity: 0.5;
  }

  .list2 {
    transform: translateX(50%);
    z-index: 2;
    opacity: 1;
  }

  .list3 {
    transform: translateX(150%) scale(0.9);
    transform-origin: 0% 100%;
    z-index: 0;
    opacity: 0.9;
  }

  .list4 {
    transform: translateX(220%) scale(0.9);
    transform-origin: 0% 100%;
    z-index: 0;
    opacity: 0.5;
  }

  .list5 {
    transform: translateX(250%) scale(0.9);
    transform-origin: 0% 100%;
    z-index: 0;
    opacity: 0.5;
  }

  .list6 {
    transform: translateX(300%) scale(0.9);
    transform-origin: 0% 100%;
    z-index: 0;
    opacity: 0.5;
  }

  [class*='list'] {
    transition: transform 0.8s;
  }
</style>
