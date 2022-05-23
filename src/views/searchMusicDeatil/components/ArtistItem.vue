<template>
  <div class="artist-list">
    <div class="artist-item" v-for="(item, index) in artistsList" :key="index" :class="{ backColor: setItemBackColor(index) }" @click="goArtistDetail(index)">
      <!-- 图片 -->
      <div class="artist-img">
        <img :src="item.artists[0].img1v1Url" alt="" />
      </div>
      <!-- 歌手名 -->
      <div class="artist">
        {{ item.artists[0].name }}
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
      default() {
        return [];
      }
    }
  },
  created() {
    this.setItemBackColor();
  },
  methods: {
    setItemBackColor(i) {
      return i % 2 !== 0;
    },
    goArtistDetail(i) {
      this.$router.push({
        path: '/artist',
        query: { id: this.artistsList[i].artists[0].id }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.artist-list {
  width: 100%;
}

.artist-item {
  display: flex;
  height: 50px;
  line-height: 50px;
  margin-bottom: 20px;
}

.artist {
  cursor: pointer;
}

.artist-img {
  margin: 0 20px 0 0;
  width: 50px;
  height: 50px;
  cursor: pointer;
  > img {
    width: 100%;
    height: 100%;
    background-size: 100%, 100%;
  }
}

.backColor {
  background-color: #dededf;
}
</style>
