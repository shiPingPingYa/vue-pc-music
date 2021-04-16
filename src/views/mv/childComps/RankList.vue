<template>
  <div class="simi" v-if="item!== null">
    <div class="simi-item" @click="playMv(item.id)">
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
          {{item.name}} </div>
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
      default () {
        return {}
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
.simi{
  margin-bottom: 10px;
  width: 100%;
}

.simi-item{
  margin-top: 10px;
  display: flex;
  width: 100%;
  color: #01060a;
  font-size: 13px;
  cursor: pointer;
  > .left{
    position: relative;
    width: 150px;
    > img{
      width: 100%;
    }
    > .count{
      position: absolute;
      padding: 3px 5px;
      top: 0;
      right: 0;
      width: 90px;
      height: 20px;
      display: flex;
      align-items: center;
      > img{
        width: 20px;
        height: 20px;
        background-size: 100%,100%;
      }
      > .play-count{
        margin-left: 6px;
        color: #fff;
      }
    }
  }
  > .right{
    flex: 1;
    padding-left: 8px;
    > .name{
      > span{
        color: red;
        border: 1px solid red;
      }
    }
    > .artist{
      margin-top: 10px;
      color: #828384;
    }
  }
}
</style>
