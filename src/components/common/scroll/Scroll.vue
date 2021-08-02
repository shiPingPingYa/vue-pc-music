<template>
  <div class="swiper" ref="swiper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import Bscroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    // 滚动时是否派发scroll事件
    probeType: {
      type: Number,
      default () {
        return 0
      }
    },
    // 配置下拉功能
    pullUpLoad: {
      type: Boolean,
      default () {
        return false
      }
    },
    pullDownRefresh: {
      type: Boolean,
      default () {
        return false
      }
    },
    // 滚动条
    scrollbar: {
      type: [Boolean, Object],
      dafault () {
        return false
      }
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  methods: {
    // better-scroll内置方法滚动到指定位置
    scrollTo (x, y, timer = 500) {
      this.scroll.scrollTo(x, y, timer) // better-scroll内置方法，回到指定位置
    },
    scrollBy (x, y, timer = 500) {
      this.scroll.scrollBy(x, y, timer)
    },
    // 下拉调用refresh方法，重新获取x，y
    finishPullUp () {
      this.refresh()
      this.scroll.finishPullUp()
    },
    finishPullDown () {
      this.refresh()
      this.scroll.finishPullDown()
    },
    refresh () {
      this.scroll.refresh()
    },
    // 获取y的坐标
    getScrollY () {
      return this.scroll ? this.scroll.y : 0
    },
    // 启用better-scroll
    enable () {
      this.scroll && this.scroll.enable()
    },
    // 停止scroll的动画
    stop () {
      this.scroll.stop()
    },
    // 禁用better-scroll
    disable () {
      this.scroll && this.scroll.disable()
    },
    getMaxScrollY () {
      return this.scroll && this.scroll.maxScrollY
    }
  },
  mounted () {
    // 实例化better-scorll
    this.scroll = new Bscroll(this.$refs.swiper, {
      click: false,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      scrollbar: this.scrollbar,
      pullDownRefresh: this.pullDownRefresh,
      // 设置pc端鼠标事件
      mouseWheel: {
        speed: 20,
        invert: false,
        easeTime: 300
      }
    })
    // 是否派发滚动事件
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position)
    })
    // 是否派发下拉加载事件
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
    // 是否派发上拉加载事件
    this.scroll.on('pullingDown', () => {
      this.$emit('pullingDown')
    })
  }

}
</script>
<style lang="less" scoped>
</style>
