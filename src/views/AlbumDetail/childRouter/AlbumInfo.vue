<template>
  <div class="album_info" v-if="albumInfo !== null && albumInfo !== 'undefined'">
    <div class="album_image">
      <img :src="albumInfo.avatarUrl + '?param=200y200'" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'ArtistInfo',
  props: {
    albumInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .album_info {
    display: flex;
    width: 100%;
    height: 200px;
    justify-content: flex-start;
    .album_image {
      width: 200px;
      height: 200px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
