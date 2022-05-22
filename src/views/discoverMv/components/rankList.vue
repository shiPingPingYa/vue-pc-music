<template>
  <div class="simi">
    <div class="simi-item" @click="goPlayMvDetail(item.id)">
      <div class="left">
        <img src="" :data-src="item.cover + '?param=150y85'" alt="" v-imgLazy>
        <div class="count">
          <img src="@/assets/img/leftmenu/shiping.svg" alt="">
          <div class="play-count">{{item.count}} </div>
        </div>
      </div>
      <div class="right">
        <div class="name">
          <span>MV</span>
          {{item.name}}
        </div>
        <div class="artist">{{item.artist}} </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'RankList',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    goPlayMvDetail(id) {
      this.$router.push({ path: '/playmv/', query: { id } });
    },
  },
};
</script>
<style lang="less" scoped>
  .simi {
    margin-bottom: 10px;
    width: 100%;
  }

  .simi-item {
    display: flex;
    width: 100%;
    margin-top: 10px;
    font-size: 13px;
    color: #01060a;
    cursor: pointer;
    > .left {
      position: relative;
      width: 150px;
      > img {
        width: 100%;
        min-height: 60px;
      }
      > .count {
        position: absolute;
        padding: 3px 5px;
        top: 0;
        right: 0;
        width: 90px;
        height: 20px;
        display: flex;
        align-items: center;
        > img {
          width: 20px;
          height: 20px;
          background-size: 100%, 100%;
        }
        > .play-count {
          margin-left: 6px;
          color: #fff;
        }
      }
    }
    > .right {
      flex: 1;
      padding-left: 8px;
      > .name {
        > span {
          color: red;
          border: 1px solid red;
        }
      }
      > .artist {
        margin-top: 10px;
        color: #828384;
      }
    }
  }
</style>
