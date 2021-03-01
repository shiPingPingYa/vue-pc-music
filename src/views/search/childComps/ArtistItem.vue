<template>
  <div class="artist-list">
    <div class="artist-item"
    v-for="(item, index) in artistsList" :key="index"
    :class="{backColor:setBackColor(index)}"
    @click="enterArtistDetail(index)"
    >
    <!-- 图片 -->
    <div class="artist-img">
      <img :src="item.img1v1Url" alt="">
    </div>
    <!-- 歌手名 -->
    <div class="artist">
      {{item.name}}
    </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ArtistItem',
  props: {
    artistsList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  created () {
    this.setBackColor()
  },
  methods: {
    setBackColor (i) {
      if (i % 2 !== 0) {
        return true
      }
      return false
    },
    enterArtistDetail (i) {
      console.log(this.artistsList[i].name)
    }
  }
}
</script>
<style lang="less" scoped>
.artist-list{
  width: 100%;
}

.artist-item{
  display: flex;
  height: 50px;
  line-height: 50px;
}

.artist{
  cursor: pointer;
}

.artist-img{
  margin: 0 20px 0 0;
  width: 50px;
  height: 50px;
  cursor: pointer;
  > img{
    width: 100%;
    height: 100%;
    background-size: 100%,100%;
  }
}

.backColor{
  background-color: #333333;
}
</style>
