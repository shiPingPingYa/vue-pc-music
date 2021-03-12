<template>
  <div class="musiclist-like" v-if="subs !== null">
    <div class="content">
      <div class="item" v-for="(item,index) in subs " :key="index">
      <img :src="item.avatarUrl" alt="">
      <div>{{item.nickname}}</div>
    </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'MusicListLike',
  props: {
    subs: {
      tyep: Array,
      default () {
        return []
      }
    }
  }
}
</script>
<style lang="less" scoped>
.musiclist-like{
  margin-bottom: 20px;
  width: 100%;
  > .content{
    display: flex;
    flex-wrap: wrap;
  }
}

.item{
      width: 160px;
      padding: 30px;
      text-align: center;
      font-size: 12px;
      cursor: pointer;
      >img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
}
</style>>
