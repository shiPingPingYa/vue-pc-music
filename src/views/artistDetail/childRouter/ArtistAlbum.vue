<template>
  <div class="artist-album" v-if="artist !==null">
  <artist-hot-50 :musicList="musicList"></artist-hot-50>
  <artist-album-list></artist-album-list>
  </div>
</template>
<script>
// 导入热点50首
import ArtistHot50 from '../childComps/ArtistHot50'
// 导入专辑
import ArtistAlbumList from '../childComps/ArtistAlbumList'
// 导入获取歌手热门50首，和歌手专辑请求
import { _getArtistHot50, _getArtistAlbum } from '../../../network/artist'
// 导入获取歌曲详细信息请求
import { _getSongsDetail, SongDetail } from '../../../network/detail'
export default {
  name: 'ArtistAlbum',
  components: {
    ArtistHot50,
    ArtistAlbumList
  },
  data () {
    return {
      musicList: [],
      albumList: [],
      artist: null
    }
  },
  async created () {
    // 通过vuex来获取artist
    this.artist = this.$route.query.artist || this.$store.state.artist
    // 判断artist是否存在
    if (this.artist !== null) {
      // 获取用户的热门50首音乐
      await _getArtistHot50(this.artist.id).then(res => {
        var songs = res.data.songs
        for (var i in songs) {
        // 获取热门50首音乐ID，根据ID获取音乐详细信息
          _getSongsDetail(songs[i].id).then(res => {
            // 通过封装的函数把英语详细信息处理，返回id,name,album,song,time
            var song = new SongDetail(res.data.songs)
            this.musicList.push(song)
          })
        }
      })
      // 获取用户专辑
      await _getArtistAlbum(this.artist.id).then(res => {
        this.albumList = res.data.hotAlbums
      })
    }
  }
}
</script>
<style lang="less" scoped>
.artist-album{
  width: 100%;
}
</style>
