<template>
  <div class="search-list">
    <scroll class="search-scroll">
      <div class="title">
        搜索
        <span>"{{key}}"</span>,找到
        <span>{{this.musicList.length}}</span>首单曲
      </div>
      <div class="bar">
        <div class="bar-item"
        :class="{action:currentIndex == index}"
        v-for="(item, index) in list" :key="index"
        @click="barClick(index)">{{item}}</div>
      </div>
      <!-- //歌手条目 -->
      <artist-item :artistsList='artistsList' v-show="isShow == 'artist'"></artist-item>
      <!-- 音乐条目 -->
      <music-item :musicList='musicList' @musicItemClick="musicItemClick" v-show="isShow =='music'"></music-item>
    </scroll>
  </div>
</template>
<script>
// 导入定义好的scorll
import Scroll from '../../components/common/scroll/Scroll'
// 导入歌手条目
import ArtistItem from '../search/childComps/ArtistItem'
// 导入音乐条目
import MusicItem from '../musicListDetail/childComps/MusicItem'
// 导入数据请求，获取根据input输入的内容，拿到的音乐
import { _Search } from '../../network/search'
// 获取根据音乐id获取音乐详细对象,SongDetail处理音乐对象(返回需要的数据id，标题，歌手，专辑名，时间)SongDetail
import { _getSongsDetail, AllSongDetail } from '../../network/detail'
// 导入工具函数，处理相同歌曲标题名
// 导入混入，使能获取音乐列表
import { indexMixin } from '../musicListDetail/indexMixin'
export default {
  name: 'SearchList',
  data () {
    return {
      isShow: 'music',
      list: ['单曲', '歌手'],
      currentIndex: 0,
      // 歌手列表(名字，图片)
      artistsList: [],
      musicList: [],
      // input输入框的值
      key: '',
      newkey: ''
    }
  },
  components: {
    Scroll,
    ArtistItem,
    MusicItem
  },
  mixins: [indexMixin],
  watch: {
    $route (oldkey, newkey) {
      this.key = oldkey.params.id
      this.searchMusic()
    }

  },
  created () {
    // 获取input输入的值key(id的值是在router上面动态绑定的)
    this.key = this.$route.params.id
    // 根据key获取搜索结果
    if (this.key !== null && this.key !== '') {
      this.searchMusic()
    }
  },
  methods: {
    barClick (index) {
      this.currentIndex = index
      switch (index) {
        case 0:
          this.isShow = 'music'
          break
        case 1:
          this.isShow = 'artist'
          break
      }
    },
    // 子组件触发传递下标
    musicItemClick (index) {
      this.playMusic(index)
    },
    // 获取数据
    async searchMusic () {
      this.musicList = []
      this.artistsList = []
      // 将根据关键字搜索的歌曲列表解构出来
      const { data: { result: { songs } } } = await _Search({ keywords: this.key, limit: 50 }).then()
      const ids = songs.map(item => item.id).join(',')
      songs.forEach(item => this.artistsList.push(item.artists[0]))
      _getSongsDetail(ids).then(res => {
        res.data.songs.forEach(item => this.musicList.push(new AllSongDetail(item)))
      })
    }
  }
}
</script>
<style lang="less" scoped>
.search-list{
    padding: 10px 40px;
    width: 100%;
    height: 100%;
    color: #0a0a0a;
    font-size: 14px;
}
.search-scroll{
  height: 100%;
  overflow: hidden;
}

.search-scroll .title{
  height: 40px;
  line-height:40px;
  > span{
  padding: 0 10px;
  color: #2e6bb0;
  }
}

.search-scroll .bar{
  margin-bottom: 10px;
  display: flex;
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #dcdcdd;
}
.bar-item{
  padding: 0 20px;
  cursor: pointer;
}
.action{
  color: #b82525;
  border-bottom: 3px solid #b82525;
}
</style>
