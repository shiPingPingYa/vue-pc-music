<template>
  <div class="artist-album" v-if="artist !==null">
  <artist-hot-50 :musicList="musicList"></artist-hot-50>
  <artist-album-list v-for="(item,index) in albumList" :key="index" :album="item"></artist-album-list>
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
import { _getSongsDetail, AllSongDetail } from '../../../network/detail'
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
    this.artist = JSON.parse(localStorage.getItem('artist'))
    // 判断artist是否存在
    if (this.artist !== null) {
      // 获取用户的热门50首音乐
      const { data: { songs } } = await _getArtistHot50(this.artist.id)
      // 拼接音乐id
      const ids = songs.map(item => item.id).join(',')
      _getSongsDetail(ids).then(res => {
        res.data.songs.forEach(item => this.musicList.push(new AllSongDetail(item)))
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
