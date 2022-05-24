<template>
  <div class="artist-container">
    <div class="artist-tr" v-for="(item, index) in artistsList" :key="index" @click="goArtistDetail(index)">
      <div class="artist-td">
        <img :src="item.artists[0].img1v1Url" alt="" />
      </div>
      <div class="artist">{{ item.artists[0].name }}</div>
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
.artist-container {
  width: 100%;
  & > .artist-tr {
    display: flex;
    margin-bottom: 20px;
    height: 50px;
    line-height: 50px;
    & > .artist-td:nth-child(1) {
      margin-right: 20px;
      width: 50;
      height: 50px;
      padding: 5px;
      & > img {
        width: 40px;
        height: 40px;
      }
    }
    & > .artist-td:nth-child(2) {
      flex: 1;
    }
  }
  & > .artist-tr:nth-child(odd) {
    background-color: #dededf;
  }
}
</style>
