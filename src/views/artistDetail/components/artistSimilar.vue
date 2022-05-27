<template>
  <div class="similar-detail">
    <div class="similar-list">
      <div class="similar-item" v-for="item in similarArtistList" :key="item.id">
        <img src="" :data-src="item.img1v1Url + '?param=260y260'" alt="" @click="goArtistDetail(item)" v-imgLazy />
        <div class="artist_name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { _getArtistSimilar } from '@/network/artist';
export default {
  name: 'ArtistSimilar',
  data() {
    return {
      similarArtistList: ''
    };
  },
  watch: {
    '$route.query.id': {
      handler() {
        this.initSimilarArtist();
      },
      immediate: true
    }
  },
  methods: {
    async initSimilarArtist() {
      const { id } = this.$route.query;
      const {
        data: { artists }
      } = await _getArtistSimilar(id);
      this.similarArtistList = artists;
    },
    goArtistDetail(artist) {
      this.$router.push({ path: '/artist', query: { id: artist.id } });
    }
  }
};
</script>
<style lang="less" scoped>
.similar-detail {
  width: 100%;
  & > .similar-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    & > .similar-item {
      width: 160px;
      padding: 30px;
      text-align: center;
      font-size: 12px;
      cursor: pointer;
      &:hover {
        transform: scale(1.2);
        transition: all 0.6s ease-out;
      }
      & > img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
    }
  }
}
</style>
