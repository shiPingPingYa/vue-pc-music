<template>
  <div class="music-list">
    <div class="music-item" v-for="(item,index) in artistList" :key="index"
    @click="enterArtistDetail(item)">
      <img :src="setImgUrl(item)" alt="" @load="artistImgLoad">
      <div class="name">{{item.name}} </div>
    </div>
  </div>
</template>
<script>
import { imgLoad } from '../../../assets/common/mixin'
export default {
  name: 'ArtistList',
  props: {
    artistList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  mixins: [imgLoad],
  methods: {
    // 设置背景图片url
    setImgUrl (item) {
      return item.picUrl || item.coverImgUrl
    },
    enterArtistDetail (artist) {
      this.$router.push({
        path: '/artist',
        query: {
          artist: artist
        }
      })
      this.$store.commit('addArtist', artist)
    },
    artistImgLoad () {
      if (this.count === this.artistList.length) this.$emit('artistImgLoad')
      this.count++
    }
  }
}
</script>
<style lang="less" scoped>
.music-list{
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  > .music-item{
    position: relative;
    margin: 5px 6px;
    width: 30%;
    padding-bottom: 20px;
    font-size: 14px;
    color: #01060a;
    cursor: pointer;
    > img{
    width: 100%;
    height: 100%;
    background-size: 100%,100%;
  }

  }

}
</style>
