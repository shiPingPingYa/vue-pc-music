<template>
  <div class="music-lsit">
  <div class="list-item newday" v-show="isShow" @click="enterDayDetail()">
    <div class="new">
      <p></p>
      <div></div>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  name: 'MusicList',
  props: {
    totalList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    enterDayDetail () {
      this.$router.push('/daymusic')
    }
  }
}
</script>
<style lang="less" scoped>

</style>
