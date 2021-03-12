<template>
  <div class="swiper" ref="swiper" >
    <!-- 左右按钮 -->
    <div class="left">
      <div class="pre">
        <img src="../../../assets/img/swiper/prev.svg" alt="">
      </div>
    </div>
    <div class="right">
      <div class="next">
        <img src="" alt="">
      </div>
    </div>
    <!-- 图片区域 -->
    <div class="imgBox">
      <ul>
        <li class="list1">
          <img src="" alt="">
        </li>
        <li class="list2">
          <img src="" alt="">
        </li>
        <li class="list3">
          <img src="" alt="">
        </li>
        <li class="list4">
          <img src="" alt="">

        </li>
        <li class="list5">
          <img src="" alt="">
        </li>
        <li class="list6">
          <img src="" alt="">
        </li>
      </ul>
    </div>
    <!-- 下面线条 -->
    <div class="lineBar">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>
<script>
// 导入封装的轮播图函数
import { _Swiper } from './indexSwper'
export default {
  name: 'Swiper',
  props: {
    banner: {
      type: Object,
      default () {
        return []
      }
    }
  },
  updated () {
    if (this.$refs.swiper !== null) {
      _Swiper(this.$refs.swiper)
    }
  }
}
</script>
