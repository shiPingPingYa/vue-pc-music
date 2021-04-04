<template>
  <div class="music-list-detail">
 <scroll class="musiclist-detail" >
    <!-- 音乐榜单默认信息 -->
    <music-base-info :baseInfo="baseInfo"></music-base-info>
  <!-- 音乐榜单导航条 -->
    <music-bar :bar="bar" @mlBarClick="mlBarClick"></music-bar>
  <!-- 音乐榜单列表 -->
    <music-item @musicItemClick="musicItemClick" :musicList="musicList" v-show="isShow == 'music'"></music-item>
  <!-- 音乐榜单评论信息 -->
    <recommends :recommends="recommends" v-show="isShow == 'recommends'"></recommends>
  <!-- 音乐榜单收藏者 -->
    <music-list-like :subs="subs" v-show="isShow == 'like'"></music-list-like>
 </scroll>
  </div>
</template>
<script>
import Scroll from '../../components/common/scroll/Scroll'
// 导入歌单默认信息
import MusicBaseInfo from './childComps/MusicBaseInfo'
// 导入歌单导航条
import MusicBar from './childComps/MusicBar'
// 导入歌单评论组件
import Recommends from './childComps/Recommends'
// 导入歌单列表
import MusicItem from './childComps/MusicItem'
// 导入歌单收藏组件
import MusicListLike from './childComps/MusicListLike'
// 导入数据请求
import { _getMusicListDetail, BaseInfo, _getSongsDetail, SongDetail, _getSub, _getRecommends } from '../../network/detail'
// 混入
import { indexMixin } from './indexMixin'
// 混入
export default {
  name: 'MusicListDetail',
  components: {
    MusicBaseInfo,
    MusicBar,
    MusicListLike,
    MusicItem,
    Recommends,
    Scroll
  },
  data () {
    return {
      isShow: 'music',
      // 导航条
      bar: [],
      id: null,
      // 歌单详细信息
      musicListDetail: null,
      // 歌曲列表
      musicList: [],
      baseInfo: null,
      // 歌单收藏者
      // 歌单评论内容
      recommends: null,
      limit: 20,
      subs: null
    }
  },
  // 音乐混入
  mixins: [indexMixin],
  created () {
    // 获取歌单Id
    if (this.$route.params.id !== null && this.$route.params.id !== '') {
      this.id = this.$route.params.id
      this.musicListDetailInit()
    }
  },
  methods: {
    mlBarClick (str) {
      this.isShow = str
    },
    // 子组件上面的歌曲点击事件传递音乐下标
    musicItemClick (index) {
      this.playMusic(index)
    },
    // 初始化音乐列表
    async musicListDetailInit () {
      // 歌曲id清空
      this.musicListDetailInit = null
      // 获取歌单id,获取歌单数据
      await _getMusicListDetail(this.id).then(res => {
        this.musicListDetail = res.data
        // 通过封装的baseinfo方法，获取需要的默认信息
        this.baseInfo = new BaseInfo(this.musicListDetail.playlist)
        var str = '评论(' + this.musicListDetail.playlist.commentCount + ')'
        this.bar = ['歌曲列表', str, '收藏者']

        // 遍历歌单对象里面的id，获取歌曲信息
        for (var i of this.musicListDetail.playlist.trackIds) {
        // 获取歌曲信息
          _getSongsDetail(i.id).then(res => {
          // 通过封装SongDetail方法，获取需要的歌曲信息
            var song = new SongDetail(res.data.songs)
            this.musicList.push(song)
          })
        }

        // 获取评论内容
        _getRecommends(this.id, this.limit).then(res => {
          this.recommends = res.data.comments
          return res.data.comments
        })

        // 获取歌单收藏者
        _getSub(this.id).then(res => {
          this.subs = res.data.subscribers
        })
      })
    // 把歌单评论内容传递给首页评论组件
    }
  }

}
</script>
<style lang="less" scoped>
.music-list-detail{
  margin: 4% auto;
  width: 90%;
  height: 94%;
  color: #fff;
  overflow: hidden;
}

.musiclist-detail{
  height: 100%;
  overflow: hidden;

}
</style>
