<template>
  <div class="music-like-container">
    <div class="musiclist-like" v-if="subs.length !== 0">
      <div class="content">
        <div class="item" v-for="(item,index) in subs " :key="index">
          <img src="" :data-src="item.avatarUrl + '?param=60y60'" alt="" v-imgLazy>
          <div>{{item.nickname}}</div>
        </div>
      </div>
    </div>
    <div class="none-music-collect" v-else>
      改歌单暂无收藏者
    </div>
  </div>
</template>
<script>
export default {
  name: 'MusicListLike',
  props: {
    subs: {
      tyep: Array,
      default: () => []
    }
  }
}
</script>
<style lang="less" scoped>
  .music-like-container {
    width: 100%;
    margin-bottom: 20px;

    & .musiclist-like {
      width: 100%;
      > .content {
        display: flex;
        flex-wrap: wrap;

        & .item {
          width: 160px;
          padding: 30px;
          text-align: center;
          font-size: 12px;
          cursor: pointer;
          > img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
          }
        }
      }
    }

    & .none-music-collect {
      padding: 10px 0px 10px 30px;
      font-size: 14px;
    }
  }
</style>>
