<template>
  <div class="alert_image">
    <div class="alert_container" @mouseenter="hoverBtnDisplay = 'block'" @mouseleave="hoverBtnDisplay = 'none'">
      <img :src="list[index] + '?param=600y600'" alt="" />
      <div class="perImage" :style="{ display: hoverBtnDisplay }" @click.stop="perImage">
        <img src="@/assets/img/perImage.svg" alt="" />
      </div>
      <div class="nextImage" :style="{ display: hoverBtnDisplay }" @click.stop="nextImage">
        <img src="@/assets/img/nextImage.svg" alt="" />
      </div>
    </div>
    <div class="line">
      <span v-for="(item, i) in list" :key="i" :class="{ showLine: index === i }" @click.stop="index = i"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'alertImage',
  props: {
    imgIndex: {
      type: Number,
      default: () => 0
    },
    imgList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      hoverBtnDisplay: 'none',
      index: 0,
      list: ['']
    };
  },
  created() {
    this.index = this.imgIndex;
    this.list = this.imgList;
  },
  methods: {
    perImage() {
      if (this.list.length === 1) return this.$message.info('到顶啦！！');
      else if (--this.index < 0) this.index = this.list.length - 1;
    },
    nextImage() {
      if (this.list.length === 1) return this.$message.info('到底啦！！');
      else if (++this.index > this.list.length - 1) this.index = 0;
    }
  }
};
</script>
<style lang="less" scoped>
.alert_image {
  position: fixed;
  width: 600px;
  top: 50%;
  left: 50%;
  z-index: 1000;
  transform: translate(-50%, -50%);

  .alert_container {
    position: relative;
    width: 100%;
    height: 600px;
    background: black;
    img {
      width: 100%;
      height: 600px;
    }
  }

  .perImage,
  .nextImage {
    display: none;
    position: absolute;
    width: 60px;
    height: 60px;
    top: 270px;
    z-index: 10;
    img {
      width: 60px;
      height: 60px;
      color: #fff;
    }
    &:hover {
      cursor: pointer;
    }
  }

  .nextImage {
    right: 0 !important;
  }

  .line {
    position: absolute;
    display: flex;
    justify-content: flex-start;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    span {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 20px;
      border-radius: 100%;
      background-color: rgb(7, 239, 247);
      &:hover {
        cursor: pointer;
      }
    }
  }
}

.showLine {
  background-color: orange !important;
}
</style>
