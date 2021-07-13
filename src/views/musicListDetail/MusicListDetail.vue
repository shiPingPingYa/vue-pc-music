<template>
  <div class="music-list-detail">
    <scroll class="musiclist-detail">
      <!-- 音乐榜单默认信息 -->
      <music-base-info :baseInfo="baseInfo"></music-base-info>
      <!-- 音乐榜单导航条 -->
      <music-bar :bar="bar" @mlBarClick="mlBarClick"></music-bar>
      <!-- 音乐榜单列表 -->
      <music-item
        @musicItemClick="musicItemClick"
        :musicList="musicList"
        v-show="isShow == 'music'"
      ></music-item>
      <!-- 音乐榜单评论信息 -->
      <song-list-recommends
        ref="songList_recommends"
        :recommends="recommends"
        :hotComments="hotComments"
        :id="id"
        :Type="2"
        v-show="isShow == 'recommends'"
        @moreComments="moreComments"
        @getCommends="getCommends"
      ></song-list-recommends>
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
// 导入歌单列表
import MusicItem from './childComps/MusicItem'
// 导入歌单收藏组件
import MusicListLike from './childComps/MusicListLike'
// 导入数据请求
import {
  _getMusicListDetail,
  BaseInfo,
  _getSongsDetail,
  _getRecommends,
  _getSub,
  AllSongDetail
} from '../../network/detail'
// 混入
import { indexMixin } from './indexMixin'
import { Message } from 'element-ui'
// 导入歌单评论组件
const songListRecommends = () => import('./childComps/Recommends.vue')
// 混入
export default {
  name: 'MusicListDetail',
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
      recommends: [],
      // 热门评论内容
      hotComments: [],
      limit: 50,
      subs: null
    }
  },
  // 音乐混入
  mixins: [indexMixin],
  watch: {
    $route: {
      handler (val) {
        if (val.params.id !== undefined) {
          this.id = val.params.id
          this.musicListDetailInit()
        }
      },
      deep: true
    }
  },
  created () {
    this.threadId = this.$route.params.id
    // 获取歌单Id
    if (
      this.$route.params.id !== null &&
      this.$route.params.id !== '' &&
      Number(this.$route.params.id) !== Number
    ) {
      this.id = this.$route.params.id
      // 存储歌单id，心动模式必需
      localStorage.setItem('pid', this.id)
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
      this.musicList = []
      // 获取歌单id，获取歌单数据，commentCount:评论数量，trackIds:歌曲id，playlist:歌曲信息
      const {
        data: {
          playlist,
          playlist: { commentCount, trackIds }
        }
      } = await _getMusicListDetail(this.id)

      // 获取歌单默认信息
      this.baseInfo = new BaseInfo(playlist)
      // 处理评论默认信息
      const str = `评论${commentCount}`
      this.bar = ['歌曲列表', str, '收藏者']

      // 拼接id ,获取歌曲，处理歌曲信息
      const ids = trackIds.map((item) => item.id).join(',')
      _getSongsDetail(ids).then((res) => {
        res.data.songs.forEach((item) =>
          this.musicList.push(new AllSongDetail(item))
        )
      })

      // // 获取评论内容
      _getRecommends(this.id, this.limit, this.recommends.length).then(
        (res) => {
          this.recommends = res.data.comments
          this.hotComments = res.data.hotComments
        }
      )

      // 获取歌单收藏者
      _getSub(this.id).then((res) => {
        this.subs = res.data.subscribers
      })
    },
    // 评论组件的获取更多评论方法
    moreComments () {
      _getRecommends(this.id, this.limit, this.recommends.length).then(
        (res) => {
          if (res.data.comments.length === 0) {
            Message.info('评论已经加载完毕，暂无更多评论')
            // 修改评论组件，的评论提示消息
            this.$refs.songList_recommends.recommendTitle =
              '评论加载完毕，暂无更多.....'
          } else {
            res.data.comments.forEach((item) => this.recommends.push(item))
          }
        }
      )
    },
    // 发送评论后，重新获取评论
    getCommends () {
      // 清除评论数据
      this.recommends = []
      _getRecommends(this.id, this.limit, 0).then((res) => {
        res.data.comments.forEach((item) => this.recommends.push(item))
      })
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
