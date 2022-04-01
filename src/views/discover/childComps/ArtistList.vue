<template>
  <div class="music-list">
    <div class="music-item" v-for="(item,index) in artistList" :key="index" @click="goArtistDetail(item)">
      <img src="" :data-src="item.picUrl +'?param=326y286'" v-imgLazy>
      <div class="name">{{item.name}} </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ArtistList',
  props: {
    artistList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    goArtistDetail (artist) {
      this.$router.push({
        path: '/artist',
        query: {
          id: artist.id
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .music-list {
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    > .music-item {
      position: relative;
      margin: 5px 6px;
      width: 30%;
      padding-bottom: 20px;
      font-size: 14px;
      color: #01060a;
      cursor: pointer;
      > img {
        width: 100%;
        height: 100%;
        min-height: 100px;
        background-size: 100%, 100%;
      }
    }
  }
</style>
