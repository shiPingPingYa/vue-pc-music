<template>
  <div class="swiper" ref="swiper" v-if="banner !== null" >
    <!-- 左右按钮 -->
    <div class="left">
      <div class="pre">
        <img src="../../../assets/img/swiper/prev.svg" alt="">
      </div>
    </div>
    <div class="right">
      <div class="next">
         <img src="../../../assets/img/swiper/next.svg" alt />
      </div>
    </div>
    <!-- 图片区域 -->
    <div class="imgBox">
      <ul>
        <li class="list1">
          <img :src="banner[0].imageUrl" alt="">
        </li>
        <li class="list2">
          <img :src="banner[1].imageUrl" alt="">
        </li>
        <li class="list3">
          <img :src="banner[2].imageUrl" alt="">
        </li>
        <li class="list4">
          <img :src="banner[3].imageUrl" alt="">

        </li>
        <li class="list5">
          <img :src="banner[4].imageUrl" alt="">
        </li>
        <li class="list6">
          <img :src="banner[5].imageUrl" alt="">
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
      type: Array,
      default () {
        return []
      }
    }
  },
  updated () {
    // 把swiper这个dom对象传递函数
    if (this.$refs.swiper !== null) {
      _Swiper(this.$refs.swiper)
    }
  }
}
</script>
<style lang="less" scoped>
.swiper{
  margin: 0 auto;
  position: relative;
  width: 960px;
  height: 214px;
  overflow: hidden;
  cursor: pointer;
  > .imgBox{
    width: 100%;
  }
  > .lineBar{
    position: absolute;
    margin: auto;
    left: 0 ;
    right: 0;
    bottom: 6px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    > span{
      margin: 0 6px;
      width: 20px;
      height: 3px;
      display: inline-block;
      border-radius: 2px;
      background-color: #fff;
      cursor: pointer;
    }
  }
}

.imgBox{
  >ul{
    position: relative;
    list-style-type: none;
    > li{
      position: absolute;
      width: 460px;
      > img{
        width: 100%;
      }
    }
  }
}

.left {
  position: relative;
  float: left;
  width: 250px;
  height: 100%;
  z-index: 1;
}

.right{
  position: relative;
  float: right;
  width: 250px;
  height: 100%;
  z-index: 1;
}

.pre{
  position: absolute;
  margin: auto;
  left: 5px;
  top: 0;
  bottom: 0;
  width: 24px;
  height: 24px;
  display: none;
  z-index: 999;
}

.next{
  position: absolute;
  margin: auto;
  right: 5px;
  top: 0;
  bottom: 0;
  width: 24px;
  height: 24px;
  display: none;
  z-index: 999;
}

.pre img, .next img{
  width: 100%;
}

.lineBar .action {
  background-color: green  !important;
}

.list1 {
  transform: scale(0.9);
  transform-origin: 0% 100%;
  z-index: 0;
  opacity: 0.5;
}

.list2 {
  transform: translateX(250px);
  z-index: 2;
  opacity: 1;
}

.list3 {
  transform: translateX(710px) scale(0.9);
  transform-origin: 0% 100%;
  z-index: 0;
  opacity: 0.9;
}

.list4 {
  transform: translateX(960px) scale(0.9);
  transform-origin: 0% 100%;
  z-index: 0;
  opacity: 0.5;
}

.list5 {
  transform: translateX(1210px) scale(0.9);
  transform-origin: 0% 100%;
  z-index: 0;
  opacity: 0.5;
}

.list6 {
  transform: translateX(1460px) scale(0.9);
  transform-origin: 0% 100%;
  z-index: 0;
  opacity: 0.5;
}
[class*='list']{
   transition: transform .8s;
}
</style>
