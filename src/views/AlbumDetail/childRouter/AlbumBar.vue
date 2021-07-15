<template>
  <div class="album_bar" v-if="this.tabBarList.length !== 0">
    <div
      class="album_bar_item"
      :class="{'isAlbum_item':currentIndex === index}"
      v-for="(item, index) in tabBarList"
      :key="index"
      @click="albumClick(index)"
    >
      {{ item }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'ArtistBar',
  props: {
    tabBarList: {
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
    albumClick (i) {
      this.currentIndex = i
      this.$emit('albumClick', this.tabBarList[i])
    }
  }
}
</script>
<style lang="less" scoped>
  .album_bar {
    display: flex;
    width: 100%;
    height: 60px;
    margin-top: 40px;
    justify-content: flex-start;
    text-align: center;
    line-height: 60px;
    border-bottom: 1px solid rgb(182, 181, 181);
    .album_bar_item {
      padding: 0 40px;
      &:hover{
        cursor: pointer;
      }
    }
  }
  .isAlbum_item{
    color: red;
    border-bottom: 6px solid red;
  }
</style>
