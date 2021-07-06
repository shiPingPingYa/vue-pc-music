<template>
  <div class="alert_image">
    <div class="alert_header">
    </div>
    <div class="alert_container" @mouseenter="showPerAndNext = 'block'" @mouseleave="showPerAndNext = 'none' ">
       <img :src="urlListPc[urlIndex] + '?param=1120y1120'" alt="">
       <div class="perImage" :style="{'display':showPerAndNext} " @click.stop="perImage">
         <img src="../../../../assets/img/perImage.svg" alt="">
       </div>
       <div class="nextImage" :style="{'display':showPerAndNext} " @click.stop="nextImage" >
         <img src="../../../../assets/img/nextImage.svg" alt="">
       </div>
    </div>
     <div class="line">
         <span v-for="(item,index ) in urlListPc" :key="index" :class="{'showLine':(index === urlIndex) }" @click.stop="urlIndex = index"></span>
       </div>
  </div>
</template>
<script>
export default {
  name: 'AlertImage',
  props: {
    index: {
      type: Number,
      default () {
        return 0
      }
    },
    urlList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      showPerAndNext: 'none',
      urlIndex: '',
      urlListPc: []
    }
  },
  created () {
    this.urlIndex = this.index
    this.urlListPc = this.urlList
  },
  methods: {
    perImage () {
      if (this.urlListPc.length === 1) return this.$message.info('到底啦！！')
      if (--this.urlIndex < 0) {
        this.urlIndex = this.urlListPc.length - 1
      }
    },
    nextImage () {
      if (this.urlListPc.length === 1) return this.$message.info('到底啦！！')
      if (++this.urlIndex > this.urlListPc.length - 1) {
        this.urlIndex = 0
      }
    }
  }
}
</script>
<style lang="less" scoped>
.alert_image{
  position: absolute;
  width: 70%;
  top: 10%;
  margin-left: 2%;
  .alert_container{
    width: 100%;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .perImage, .nextImage{
    display: none;
    position: absolute;
    width: 60px;
    height: 60px;
    top: 50%;
    z-index: 10;
    img{
      background-size: 100%,100%;
      color: #fff;
    }
    &:hover{
      cursor: pointer;
    }
  }
   .nextImage{
     right: 0 !important;
   }
   .line{
  position: absolute;
  display: flex;
  justify-content: flex-start;
  width: 50%;
  bottom: 10px;
  left: 25%;
  z-index: 100;
  span{
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 20px;
    border-radius: 100%;
    background-color: rgb(7, 239, 247) ;
    &:hover{
      cursor: pointer;
    }
  }
   }
}

.showLine{
  background-color: orange !important;
}
</style>
