<template>
  <div class="musiclsit-bar" v-if="bar !== null">
    <div class="item" v-for="(item,index) in bar " :key="index" :class="{action:currentIndex == index}" @click="currentIndexClick(index)">
      {{item}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'MusicBar',
  props: {
    bar: {
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
    currentIndexClick (index) {
      this.currentIndex = index
      switch (index) {
        case 0:
          this.$emit('handleTabClick', 'music')
          break
        case 1:
          this.$emit('handleTabClick', 'recommends')
          break
        case 2:
          this.$emit('handleTabClick', 'like')
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .musiclsit-bar {
    padding-top: 10px;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 14px;
    > .item {
      padding: 5px 20px;
      cursor: pointer;
    }
  }

  .action {
    border-bottom: 3px solid #b82525;
  }
</style>>
