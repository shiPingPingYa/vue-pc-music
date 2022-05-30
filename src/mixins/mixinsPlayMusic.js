import store from '@/store';
import { _getMusicUrl } from '@/network/detail'; // 获取音乐播放地址
export const mixinsPlayMusic = {
  methods: {
    async playMusic(index = 0) {
      // 创建路由，音乐列表(显示列表需要)，播放音乐列表
      let musicList = [];
      let playMusicList;
      // 音乐只显示100条
      musicList = this.musicList.length >= 200 ? this.musicList.slice(0, 100) : this.musicList;
      // 拼接歌曲id，获取音乐播放地址
      const ids = musicList.map(item => item.id).join(',');
      const {
        data: { data }
      } = await _getMusicUrl(ids);
      // 获取的音乐地址并不是按照音乐的顺序返回的，所以当歌曲id和音乐地址id一致时，再把其信息添加到播放音乐列表，免得播放时信息对不上歌曲信息
      let temp;
      playMusicList = musicList.map((item, index) => {
        for (let i in data) {
          if (data[i].id == item.id) {
            temp = {
              index: index,
              title: item.name,
              artist: item.song,
              pic: item.pic,
              id: item.id,
              src: data[i].url
            };
            delete data[i]; //删除已经获取了的音乐播放地址数据，以便减少下次循环次数，for in 会自动跳过数组空位
            break;
          }
        }
        return temp;
      });
      // 排序(升序)
      playMusicList.sort((a, b) => a.index - b.index);
      store.commit('setSongListPath', location.hash);
      store.commit('setPlayMusicIndex', index);
      store.commit('addMusicListAndPlayList', [musicList, playMusicList]);
    }
  }
};
