// 盗取url和歌词请求
import { _getMusicUrl } from '../../network/detail'
// 封装好的处理歌曲函数
import { PlayList } from '../../components/content/playmusic/playList'
export const indexMixin = {
  methods: {
    playMusic (index = 0) {
      // 创建路由，音乐列表，播放音乐列表
      var path = this.$route.path
      var musicList
      var url = null
      var playList = []
      // 音乐只显示50条
      if (this.musicList.length >= 200) {
        musicList = this.musicList.slice(0, 100)
      } else { musicList = this.musicList }

      // 遍历音乐对象
      for (let i = 0, length = musicList.length; i < length; i++) {
        // 获取音乐播放的地址
        _getMusicUrl(musicList[i].id).then(res => {
          url = res.data.data[0].url
          var song = new PlayList(i, musicList[i], url, musicList[i].id)
          playList.push(song)
          // musiclist音乐列表数据处理完毕
          if (Number(i) === musicList.length - 1) {
            this.$bus.$emit('PlayMusic', index, path, musicList, playList)
          }
        })
      }
    },
    play () {
      console.log(this.musicList)
    }
  }
}
