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
    }
  }
}
