
import { _getMusicUrl } from '../../network/detail' // 获取音乐播放地址
export const indexMixin = {
  methods: {
    async  playMusic (index = 0) {
      // 创建路由，音乐列表，播放音乐列表
      let musicList = []
      const path = this.$route.path
      const playList = []

      // 音乐只显示100条
      if (this.musicList.length >= 200) {
        musicList = this.musicList.slice(0, 100)
      } else { musicList = this.musicList }

      // 拼接歌曲id，获取音乐播放地址
      const ids = musicList.map(item => item.id).join(',')
      const { data: { data } } = await _getMusicUrl(ids)
      musicList.forEach((item, index) => {
        // 获取的音乐地址并不是按照音乐的顺序返回的，所以当歌曲id和音乐地址id，一致时再把其地址添加到播放音乐列表，免得播放地址对不上
        data.some(item2 => {
          if (item2.id === item.id) {
            playList.push({ index: index, title: item.name, artist: item.song, pic: item.pic, id: item.id, src: item2.url })
            return true
          }
        })
      })
      // 排序(升序)
      playList.sort((a, b) => a.index - b.index)
      this.$bus.$emit('PlayMusic', index, path, musicList, playList) // 触发播放音乐方法
    }
  }
}
