<template>
  <div class="detail-bar" v-if="barList.length !== 0">
    <div class="bar-item"
    v-for="(item, index) in barList" :key="index"
    :class="{action:currentIndex == index}"
    @click="currentClick(index)">
    {{item}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'ArtistBar',
  props: {
    barList: {
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
    currentClick (i) {
      this.currentIndex = i
      switch (i) {
        case 0:this.$router.push('/artist/album')
          break
        case 1:this.$router.push('/artist/artistmv')
          break
        case 2:this.$router.push('/artist/desc')
          break
        case 3:this.$router.push('/artist/similar')
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
.detail-bar{
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  font-size: 14px;
  color: #0a0a0a;
  border-bottom: 1px solid #ededee;
}

.detail-bar .bar-item{
  padding: 14px 40px;
  cursor: pointer;
}

.action{
  border-bottom: 3px solid #b82525;
}
</style>
