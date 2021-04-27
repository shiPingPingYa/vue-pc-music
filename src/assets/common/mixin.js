export const detailMixin = {
  data () {
    return {
      time: null,
      date: null
    }
  },
  created () {
    // 获取月和日
    this.time = new Date().getDate()
    this.date = new Date().getDay()
  },
  computed: {
    getdate () {
      switch (this.date) {
        case 0:
          return '星期日'
        case 1:
          return '星期一'
        case 2:
          return '星期二'
        case 3:
          return '星期三'
        case 4:
          return '星期四'
        case 5:
          return '星期五'
        case 6:
          return '星期六'
      }
    }
  }
}

export const imgLoad = {
  data () {
    return {
      imgCount: 1
    }
  }
}
