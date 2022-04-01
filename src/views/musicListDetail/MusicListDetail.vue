<template>
  <div class="music-list-detail">
    <scroll ref="musiclist_detail" class="musiclist-detail">
      <!-- 音乐榜单默认信息 -->
      <music-base-info :baseInfo="baseInfo"></music-base-info>
      <!-- 音乐榜单导航条 -->
      <music-bar ref="tab_bar" :bar="bar" @handleTabClick="handleTabClick"></music-bar>

      <transition name="fade-in-linear">
        <!-- 音乐榜单列表 -->
        <music-item @musicItemClick="musicItemClick" :musicList="musicList" v-show="tabBarIndex == 0"></music-item>
      </transition>

      <transition name="fade-in-linear">
        <!-- 音乐榜单评论信息 -->
        <song-list-recommends ref="songList_recommends" :recommends="recommends" :hotComments="hotComments" :id="id" :Type="2" v-show="tabBarIndex == 1"
          @moreComments="moreComments" @getCommends="getCommends"></song-list-recommends>
      </transition>

      <transition name="fade-in-linear">
        <!-- 音乐榜单收藏者 -->
        <music-list-like :subs="subs" v-show="tabBarIndex == 2"></music-list-like>
      </transition>
    </scroll>
  </div>
</template>
<script>
import Scroll from 'common/scroll/Scroll'
// 导入歌单默认信息
import MusicBaseInfo from './childComps/MusicBaseInfo'
// 导入歌单导航条
import MusicBar from './childComps/MusicBar'
// 导入歌单列表
import MusicItem from './childComps/MusicItem'
// 导入歌单收藏组件
import MusicListLike from './childComps/MusicListLike'
// 导入数据请求
import { _getMusicListDetail, _getSongsDetail, _getRecommends, _getSub } from 'api/detail'
// 混入
import { indexMixin } from './indexMixin'
import { formDate } from 'js/tool'
// 导入歌单评论组件
const songListRecommends = () => import('./childComps/Recommends.vue')
// 混入
export default {
  name: 'MusicListDetail',
  // 音乐混入
  mixins: [indexMixin],
  components: {
    MusicBaseInfo,
    MusicBar,
    MusicListLike,
    MusicItem,
    songListRecommends,
    Scroll
  },
  data () {
    return {
      id: '',
      tabBarIndex: 0,
      bar: [], // 导航条
      musicList: [], // 歌曲列表
      baseInfo: null,
      recommends: [],
      hotComments: [], // 热门评论内容
      limit: 50,
      subs: []
    }
  },

  watch: {
    '$route.params.id': {
      handler (oldId) {
        if ((oldId ?? '') !== '') {
          this.id = oldId
          this.tabBarIndex = 0
          this.$refs.tab_bar._data.currentIndex = 0
          this.initMusicListAndTabbar()
        }
      },
      deep: true
    }
  },
  created () {
    this.id = this.$route.params.id
    localStorage.setItem('pid', this.id) // 存储歌单id，心动模式必需
    this.initMusicListAndTabbar()
  },
  methods: {
    handleTabClick (str) {
      this.tabBarIndex = str
      if (str === 1) this.initMusicListComments()
      else {
        this.initMusicListLike()
      }
    },
    // 初始化音乐列表
    async initMusicListAndTabbar () {
      this.musicList = []
      // 获取歌单id，获取歌单数据，commentCount:评论数量，trackIds:歌曲id，playlist:歌曲信息
      const {
        data: {
          playlist,
          playlist: { commentCount, trackIds }
        }
      } = await _getMusicListDetail(this.id)

      // 获取歌单默认信息
      this.baseInfo = {
        img: playlist.coverImgUrl,
        title: playlist.description,
        name: playlist.name,
        shareCount: playlist.shareCount,
        subscribedCount: playlist.subscribedCount,
        playCount: playlist.playCount,
        trackCount: playlist.trackCount,
        tags: playlist.tags
      }
      // 处理评论默认信息
      this.bar = ['歌曲列表', `评论${commentCount}`, '收藏者']

      // 拼接id ,获取歌曲，处理歌曲信息
      const ids = trackIds.map(item => item.id).join(',')
      const {
        data: { songs }
      } = await _getSongsDetail(ids)

      songs.forEach(item =>
        this.musicList.push({
          id: item.id,
          name: item.name,
          album: item.al.name,
          song: item.ar[0].name,
          pic: item.al.picUrl,
          time: formDate(new Date(item.dt), 'mm:ss')
        })
      )
    },
    // 获取歌单评论内容
    async initMusicListComments () {
      const {
        data: { comments, hotComments }
      } = await _getRecommends({
        id: this.id,
        limit: this.limit,
        offset: this.recommends.length,
        timestamp: Date.now()
      })
      this.recommends = comments
      this.hotComments = hotComments
    },
    async initMusicListLike () {
      // 获取歌单收藏者
      const {
        data: { subscribers }
      } = await _getSub(this.id)
      this.subs = subscribers
    },
    // 获取更多评论
    async moreComments () {
      const {
        data: { comments }
      } = await _getRecommends({
        id: this.id,
        limit: this.limit,
        offset: this.recommends.length,
        timestamp: Date.now()
      })
      if (comments.length === 0) {
        this.$message.info('评论已经加载完毕，暂无更多评论')
        // 修改评论组件，的评论提示消息
        this.$refs.songList_recommends.recommendTitle = '评论加载完毕，暂无更多.....'
      } else comments.forEach(item => this.recommends.push(item))
    },
    // 发送评论后，重新获取评论
    async getCommends () {
      // 清除评论数据
      this.recommends = []
      const {
        data: { comments }
      } = await _getRecommends({
        id: this.id,
        limit: this.limit,
        offset: 0,
        timestamp: Date.now()
      })
      this.recommends = comments
    },
    // 子组件上面的歌曲点击事件传递音乐下标
    musicItemClick (index) {
      this.playMusic(index)
    }
  }
}
</script>
<style lang="less" scoped>
  .music-list-detail {
    margin: 4% auto;
    width: 90%;
    height: 94%;
    color: #01060a;
    overflow: hidden;
  }

  .musiclist-detail {
    height: 100%;
    overflow: hidden;
  }
</style>
