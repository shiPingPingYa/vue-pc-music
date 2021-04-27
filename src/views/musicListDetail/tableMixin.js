export const tableMixin = {
  methods: {
    // 设置音乐列表的序号
    setSerial (i) {
      return (i + 1) <= 9 ? '0' + (i + 1) : (i + 1)
    },
    // 设置音乐列表的背景
    setBackColor (i) {
      if (i % 2 !== 0) {
        return true
      }
      return false
    },
    // 音乐条目点击事件
    musicItemClick (index) {
      // 播放音乐列表不为空
      if (this.$parent.$parent.$el.className.indexOf('play-music-list') !== -1) {
        // 触发播放方法，传递index，把音乐播放顺序换了
        this.$bus.$emit('playMusicListItem', index)
      }
      // 触发父组件上面的方法，把音乐点击下标换了
      this.$emit('musicItemClick', index)
    }
  }
}
