<template>
  <div class="suggest">
    <div class="top">
      搜索
      <span>"{{ keywords }}"</span>相关的结果>
    </div>
    <dl>
      <!-- 搜索歌曲-->
      <dt>
        <div class="icon"><i class="el-icon-user-solid"></i></div>
        <div class="title">单曲</div>
      </dt>
      <dd v-for="(item, index) in this.sugSongs" :key="index + 'song'" @click="goSearchDetail(item.name)">
        {{ item.name }}——{{ item.artists[0].name }}
      </dd>
      <!-- 搜索歌手 -->
      <dt>
        <div class="icon"><i class="el-icon-bell"></i></div>
        <div class="title">歌手</div>
      </dt>
      <dd v-for="(item, index) in sugArtist" :key="index" @click="goArtistDetail(item)">
        {{ item.name }}
      </dd>
    </dl>
  </div>
</template>
<script>
export default {
  name: 'searchContent',
  props: {
    keywords: {
      type: String || Number,
      default: () => '' || 0
    },
    sugSongs: {
      type: Array,
      default: () => []
    },
    sugArtist: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    goSearchDetail (item) {
      this.$emit('goSearchDetail', item)
    },
    goArtistDetail (item) {
      this.$emit('goArtistDetail')
      this.$router.push({ path: '/artist/album', query: { id: item.id } })
    }
  }
}
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

    dl {
      width: 100%;
      font-size: 13px;
    }

    dl dt {
      margin-top: 4px;
      padding: 5px 8px;
      display: flex;
      width: 100%;
      line-height: 20px;
      align-content: center;
      background-color: #303236;
      color: #fff;
    }

    dl dd {
      padding: 5px 31px;
      line-height: 20px;
      cursor: pointer;
    }

    dd:hover {
      background-color: #2a2c30;
    }
  }
</style>
