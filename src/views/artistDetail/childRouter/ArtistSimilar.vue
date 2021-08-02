<template>
  <div class="similar_artist">
    <el-row type="flex" justify="space-around" style="flex-wrap: wrap; flex-direction: row">
    <el-col :span="5"  v-for="item in similarArtist"  :key="item.id" >
      <img :src="item.img1v1Url" alt="" @click="toArtistDetail(item)">
      <div class="artist_name">{{item.name}}</div>
    </el-col>
  </el-row>
  </div>

</template>
<script>
import { _getArtistSimilar } from '../../../network/artist'
export default {
  name: 'ArtistSimilar',
  data () {
    return {
      similarArtist: ''
    }
  },
  created () {
    const artistId = JSON.parse(localStorage.getItem('artist')).id
    _getArtistSimilar(artistId).then(res => {
      this.similarArtist = res.data.artists
    })
  },
  methods: {
    // 跳转对应歌手信息页面
    toArtistDetail (artist) {
      localStorage.setItem('artist', JSON.stringify(artist))
      this.$router.push('/artist')
    }
  }
}
</script>
<style lang="less" scoped>
.similar_artist{
  img{
    width: 100%;
    height: 260px;
  }
  img:hover{
    cursor: pointer;
  }
  .artist_name{
    text-align: center;
    color: #2e6bbd;
  }
}
</style>
