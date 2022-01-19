<template>
  <div class="simi">
    <div class="simi-item" v-for="(item,index) in videoList" :key="index" @click="goPlayMvDetail(item.id)">
      <div class="left">
        <img :src="item.cover" alt="">
        <div class="count">
          <img src="../../../assets/img/leftmenu/shiping.svg" alt="">
          <div class="play-count">{{item.count}} </div>
        </div>
      </div>
      <div class="right">
        <div class="name">
          <span>MV</span>
          {{item.title}}
        </div>
        <div class="artist">by:{{item.user[0].userName}} </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SiMiVideoItem',
  props: {
    videoList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    goPlayMvDetail (id) {
      this.$router.push('/playvideo/' + id)
    }
  }
}
</script>
<style lang="less" scoped>
  .simi {
    width: 100%;
    > .simi-item {
      display: flex;
      margin-top: 10px;
      width: 100%;
      cursor: pointer;
      > .left {
        position: relative;
        width: 150px;
        > img {
          width: 100%;
        }
        > .count {
          position: absolute;
          display: flex;
          padding-right: 6px;
          top: 0;
          right: 0;
          width: 80px;
          height: 20px;
          align-items: center;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.25);
          > img {
            width: 100%;
            height: 100%;
          }
        }
      }
      > .right {
        width: calc(100% - 80px);
        flex: 1;
        padding-left: 10px;
        color: #01060a;
        > .name {
          width: 100%;
          max-height: 52px;
          padding-top: 2px;
          font-size: 13px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          > span {
            padding: 1px;
            color: red;
            font-size: 13px;
            border: 1px solid red;
          }
        }
        > .artist {
          margin-top: 10px;
          font-size: 13px;
          color: #7b7d81;
        }
      }
    }
  }
</style>
