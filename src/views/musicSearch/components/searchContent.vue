<template>
  <div class="suggest">
    <div class="top">
      搜索<span>"{{ keywords }}"</span>相关的结果>
    </div>
    <div class="search-container">
      <div class="search-title">
        <div class="icon"><i class="el-icon-user-solid"></i></div>
        <div class="title">单曲</div>
      </div>
      <div class="search-music" v-for="(item, index) in searchMusic" :key="index + 'song'" @click="goSearchDetail(item.name)">{{ item.name }}——{{ item.artists[0].name }}</div>
      <div class="search-title">
        <div class="icon"><i class="el-icon-bell"></i></div>
        <div class="title">歌手</div>
      </div>
      <div class="search-artist" v-for="(item, index) in searchArtist" :key="index" @click="goArtistDetail(item)">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script>
import { oLocalStorage } from './observeLocalStorage';

export default {
  name: 'searchContent',
  props: {
    keywords: {
      type: String || Number,
      default: () => '' || 0
    },
    searchMusic: {
      type: Array,
      default: () => []
    },
    searchArtist: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    goSearchDetail(v) {
      let searchList = (oLocalStorage.get('searchList') && JSON.parse(oLocalStorage.get('searchList'))) || [];
      searchList.push(v);
      oLocalStorage.set('searchList', JSON.stringify(searchList));
      this.$router.push('/search/' + v);
      this.$emit('inputBlur');
    },
    goArtistDetail(item) {
      this.$router.push({ path: '/artist/album', query: { id: item.id } });
      this.$emit('inputBlur');
    }
  }
};
</script>
<style lang="less" scoped>
.suggest {
  position: absolute;
  padding: 10px;
  top: 54px;
  width: 400px;
  color: #828385;
  z-index: 10;
  background-color: #2d2f33;

  & > .top {
    line-height: 20px;
    font-size: 13px;
    > span {
      color: #2e6bb0;
    }
  }

  & > .search-container {
    width: 100%;
    font-size: 13px;
    & > .search-title {
      display: flex;
      justify-content: flex-start;
      align-content: center;
      margin-top: 4px;
      width: 100%;
      padding: 5px 8px;
      color: #fff;
      background-color: #303236;
      line-height: 20px;
      & > .icon {
        width: 34px;
      }
    }
    & > .search-music,
    .search-artist {
      padding: 5px 31px;
      line-height: 20px;
      cursor: pointer;
      &:hover {
        background-color: #2a2c30;
      }
    }
  }
}
</style>
