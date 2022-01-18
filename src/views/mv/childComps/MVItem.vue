<template>
  <div class="container">
    <div class="mv-list " v-if="Array.isArray(mvList) && mvList.length !== 0 ">
      <div class=" mv-item" v-for="(item,index) in mvList" :key="index" @click="playMv(item.id)">
        <div class="count">
          <img src="../../../assets/img/leftmenu/shiping.svg" alt="">
          <div class="play-count">{{item.count}} </div>
        </div>
        <img :src="item.cover + '?param=321y181'" alt="">
        <div class="desc">
          <p>{{item.name}} </p>
          <span>{{item.artist}} </span>
        </div>
      </div>
    </div>
    <div class="no-mv-list" v-else>
      <h2>歌手暂时还未发布mv，敬请期待!!!</h2>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MvItem',
  props: {
    mvList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    playMv (id) {
      this.$router.push('/playmv/' + id)
    }
  }
}
</script>
<style lang="less" scoped>
  .container {
    padding-right: 20px;
    overflow-y: auto;
  }
  .no-mv-list {
    width: 100%;
    height: 100%;
    > h2 {
      text-indent: 20px;
      line-height: 40px;
      font-size: 16px;
      color: #01060a;
    }
  }

  .mv-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .mv-item {
    position: relative;
    margin-top: 8px;
    width: 24%;
    margin-right: 1%;
    font-size: 14px;
    > img {
      width: 100%;
      background-size: 100%, 100%;
      cursor: pointer;
    }
  }

  .mv-item > .count {
    position: absolute;
    display: flex;
    padding: 3px 5px;
    top: 0;
    right: 0;
    width: 80px;
    height: 30px;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
    color: #fff;
    > img {
      width: 100%;
      height: 100%;
    }
  }

  .desc {
    > p {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      color: #01060a;
    }
    > span {
      font-size: 13px;
      color: #828385;
    }
  }
</style>
