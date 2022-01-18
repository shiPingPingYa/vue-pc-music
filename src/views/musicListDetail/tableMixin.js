export const tableMixin = {
  methods: {
    // 设置音乐列表的序号
    setSerial (i) {
      return (i + 1) <= 9 ? '0' + (i + 1) : (i + 1)
    },
    // 设置音乐列表的背景
    setBackColor (i) {
      return i % 2 !== 0
    },
    // 音乐条目点击事件
    musicItemClick (index) {
      // 判断是否在同一歌单下面，是则不再请求音乐数据，而是切换播放音乐下标
      if (this.$route.path === this.$store.getters.getSongListPath) {
        // 触发播放方法，传递index，把播放音乐小标换了
        this.$bus.$emit('playMusicListItem', index)
      } else {
        // 触发父组件上面的方法，重新获取音乐
        this.$emit('musicItemClick', index)
      }
    }
  }
}
