<template>
  <div class="detail-bar">
    <div class="bar-item" v-for="(item, index) in tabList" :key="index" :class="{'action':currentIndex == index}" @click="handelTabsClick(index)">
      {{item}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'ArtistBar',
  data() {
    return {
      id: '',
      currentIndex: 0,
      tabList: ['专辑', 'MV', '歌手详情', '相似歌手']
    }
  },
  watch: {
    '$route.query.id': {
      handler(oldId) {
        this.currentIndex = 0
        this.id = oldId
        this.initTabCurrentIndex()
      }
    }
  },
  mounted() {
    this.currentIndex = 0 // 右侧基本上所有路由都是缓存的，所以tabbar的index是不会重置的，手动刷新下
    this.id = this.$route.query.id
    this.initTabCurrentIndex()
  },
  methods: {
    handelTabsClick(i) {
      this.currentIndex = i
      switch (i) {
        case 0:
          this.$router.push({ path: '/artist/album', query: { id: this.id } })
          break
        case 1:
          this.$router.push({
            path: '/artist/artistmv',
            query: { id: this.id }
          })
          break
        case 2:
          this.$router.push({ path: '/artist/desc', query: { id: this.id } })
          break
        case 3:
          this.$router.push({ path: '/artist/similar', query: { id: this.id } })
          break
      }
    },
    initTabCurrentIndex() {
      const path = this.$route.path.split('?')[0]
      const tabList = ['/artist/album', '/artist/artistmv', '/artist/desc', '/artist/similar']
      tabList.some((item, index) => {
        if (item === path) {
          return (this.currentIndex = index)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .detail-bar {
    display: flex;
    width: 100%;
    height: 50px;
    align-items: center;
    font-size: 14px;
    color: #0a0a0a;
    border-bottom: 1px solid #ededee;
  }

  .detail-bar .bar-item {
    padding: 14px 40px;
    cursor: pointer;
  }

  .action {
    border-bottom: 3px solid #b82525;
  }
</style>
