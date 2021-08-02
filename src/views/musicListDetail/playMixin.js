export const playMinxin = {
  data () {
    return {
      playIndex: 0.6
    }
  },
  created () {
    // 设置下标
    this.$bus.$on('Playing', (path, index) => {
      this.playIndex = index
    })
  }

}
