<template>
  <div class="similar_artist">
    <el-row type="flex" justify="space-around" style="flex-wrap: wrap; flex-direction: row">
      <el-col :span="5" v-for="item in similarArtistList" :key="item.id">
        <img src="" :data-src="item.img1v1Url + '?param=260y260'" alt="" @click="goArtistDetail(item)" v-imgLazy>
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
      similarArtistList: ''
    }
  },
  created () {
    this.initSimilarArtist()
  },
  methods: {
    async initSimilarArtist () {
      const { id } = this.$route.query
      const {
        data: { artists }
      } = await _getArtistSimilar(id)
      this.similarArtistList = artists
    },
    goArtistDetail (artist) {
      this.$router.push({ path: '/artist', query: { id: artist.id } })
    }
  }
}
</script>
<style lang="less" scoped>
  .similar_artist {
    .artist_name {
      text-align: center;
      color: #2e6bbd;
    }

    img {
      width: 100%;
      height: 260px;
      cursor: pointer;
    }
  }
</style>
