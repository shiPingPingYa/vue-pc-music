<template>
  <div class="artist-album">
    <ArtistHot50 :musicList="musicList" />
    <ArtistAlbumList v-for="(item, index) in albumList" :key="index" :album="item" />
  </div>
</template>
<script>
import { _getArtistAlbum, _getArtistHot50 } from '@/network/artist';
import { _getSongsDetail } from '@/network/detail';
import { formDate } from '@/assets/common/tool';
import ArtistHot50 from './artistHot50';
import ArtistAlbumList from './artistAlbumList';
export default {
  name: 'ArtistAlbum',
  components: { ArtistHot50, ArtistAlbumList },
  data() {
    return {
      musicList: [],
      albumList: []
    };
  },
  watch: {
    '$route.query.id': {
      handler() {
        this.initMusicListAndAlbum();
      },
      immediate: true
    }
  },
  methods: {
    async initMusicListAndAlbum() {
      const { id } = this.$route.query;
      // 获取用户的热门50首音乐id
      const {
        data: { songs }
      } = await _getArtistHot50(id);
      // 拼接音乐id字符串
      const ids = songs.map(item => item.id).join(',');
      const {
        data: { songs: musicList }
      } = await _getSongsDetail(ids); // 获取用户歌曲详细信息
      this.musicList = musicList.map(item => {
        return {
          id: item.id,
          name: item.name,
          album: item.al.name,
          song: item.ar[0].name,
          pic: item.al.picUrl,
          time: formDate(new Date(item.dt), 'mm:ss')
        };
      });

      //  获取用户专辑
      const {
        data: { hotAlbums }
      } = await _getArtistAlbum(id);
      this.albumList = hotAlbums;
    }
  }
};
</script>
<style lang="less" scoped>
.artist-album {
  width: 100%;
}
</style>
