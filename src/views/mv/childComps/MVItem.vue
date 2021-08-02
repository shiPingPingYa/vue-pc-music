<template>
  <div class="mv-list " v-if="mvList.length !=0">
    <div class="mv-item" v-for="(item,index) in mvList" :key="index" @click="playMv(item.id)">
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
    <div class="no-mv-list" v-if="mvList.length == null">
      <h2>歌手暂时还无专辑</h2>
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
.no-mv-list{
  width: 100%;
  height: 100%;
  > h2{
  text-indent: 20px;
  line-height: 40px;
  font-size: 16px;
  color: #01060a;
  }
}

.mv-list {
    width: 100%;
    padding-right: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    cursor: pointer;
}

.mv-item{
  position: relative;
  margin-top: 8px;
  width:24%;
  font-size: 14px;
  > img{
    width: 100%;
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
  height: 30px;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));;
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
    color: #01060a;
  }
  > span{
    font-size: 13px;
    color: #828385;
  }
}
</style>
