// 盗取url和歌词请求
import { _getMusicUrl } from '../../network/detail'
// 封装好的处理歌曲函数
import { PlayList } from '../../components/content/playmusic/playList'
export const indexMixin = {
  methods: {
    async  playMusic (index = 0) {
      // 创建路由，音乐列表，播放音乐列表
      const path = this.$route.path
      let musicList
      let url = null
      const playList = []

      // 音乐只显示100条
      if (this.musicList.length >= 200) {
        musicList = this.musicList.slice(0, 100)
      } else { musicList = this.musicList }

      // 拼接歌曲id，获取音乐播放地址
      const ids = musicList.map(item => item.id)
      const { data: { data } } = await _getMusicUrl(ids)
      musicList.forEach((item, index) => {
        url = data[index].url
        playList.push(new PlayList(index, item, url, item.id))
      })
      // 触发方法播放音乐
      if (musicList.length === playList.length) this.$bus.$emit('PlayMusic', index, path, musicList, playList)
    },
    play (index) {
      console.log(this.musicList)
      console.log(index)
    }
  }
}
