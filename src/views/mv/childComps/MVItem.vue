<template>
  <div class="mv-list " v-if="mvList.length !=0">
    <div class="mv-item" v-for="(item,index) in mvList" :key="index" @click="playMv(item.id)">
      <div class="count">
        <img src="../../../assets/img/leftmenu/shiping.svg" alt="">
        <div class="play-count">{{item.count}} </div>
      </div>
      <img :src="item.cover" alt="">
      <div class="desc">
        <p>{{item.name}} </p>
        <span>{{item.artist}} </span>
      </div>
    </div>
    <div class="no-mv-list" v-if="mvList.length == null">
      <h2>歌手暂时还无专辑</h2>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MVItem',
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
.no-mv-list{
  width: 100%;
  height: 100%;
  > h2{
  text-indent: 20px;
  line-height: 40px;
  font-size: 16px;
  color: #fff;
  }
}

.mv-list {
    margin-left: 10%;
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    cursor: pointer;
}

.mv-item{
  position: relative;
  margin-top: 4px;
  width: 230px;
  > img{
    width: 230px;
    background-size: 100%,100%;
  }
}

.mv-item > .count{
  display: flex;
  position: absolute;
  padding: 3px 5px;
  top: 0;
  right: 0;
  width: 80px;
  height: 20px;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, alpha)0.25;
  color: #fff;

  > img{
    width: 100%;
    height: 100%;
  }
}

.desc{
  > p{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #dcdde4;
  }
  > span{
    font-size: 13px;
    color: #828385;
  }
}
</style>
