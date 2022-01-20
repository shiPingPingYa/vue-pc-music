<template>
  <div class="artist_album_detail">
    <scroll class="artist_album_scroll">
      <album-info :albumInfo="albumInfo"></album-info>
      <album-bar :tabBarList="tabBarList" @albumClick="albumClick"></album-bar>
      <music-item v-show="isShow === '歌曲列表'" :musicList="musicList" @musicItemClick="musicItemClick"></music-item>
      <recommends ref="artist_album_detail" v-show="isShow === tabBarList[1]" :recommends="recommends" :hotComments="hotComments" :id="id" :Type="3" @moreComments="moreComments" @getCommends="getCommends"></recommends>
      <album-detail v-show="isShow === '专辑详情'" :albumDescription="albumDescription"></album-detail>
    </scroll>
  </div>
</template>
<script>
import {
  _getAlbumDeatil,
  _getAlbumDynamicDetail,
  AllSongDetail,
  _getAlbumComments
} from '../../network/detail'
import { indexMixin } from '../musicListDetail/indexMixin'
import AlbumBar from './childRouter/AlbumBar.vue'
import AlbumInfo from './childRouter/AlbumInfo.vue'
import MusicItem from '../musicListDetail/childComps/MusicItem.vue'
import AlbumDetail from './childRouter/AlbumDetail.vue'
import Scroll from '../../components/common/scroll/Scroll.vue'
const Recommends = () => import('../musicListDetail/childComps/Recommends.vue')
export default {
  name: 'ArtistAlbumDetail',
  components: {
    AlbumBar,
    AlbumInfo,
    MusicItem,
    Recommends,
    AlbumDetail,
    Scroll
  },
  data () {
    return {
      id: '',
      tabBarList: [],
      isShow: '歌曲列表',
      musicList: [],
      albumInfo: {
        nickName: '',
        avatarUrl: '',
        albumName: '',
        albumPublishTime: '',
        subCount: '',
        shareCount: ''
      },
      albumDescription: '',
      recommends: [],
      hotComments: [],
      commentMore: false,
      commentTime: ''
    }
  },
  mixins: [indexMixin],
  created () {
    this.id = this.$route.params.id
    this.initPage()
  },
  methods: {
    async initPage () {
      // 专辑详细信息，不包括动态消息(如收藏，分享等等)
      _getAlbumDeatil({ id: this.id }).then(res => {
        res.data.songs.forEach(item =>
          this.musicList.push(new AllSongDetail(item))
        )
        this.albumDescription = res.data.album.description
        this.albumInfo.nickName = res.data.album.artist.name
        this.albumInfo.avatarUrl = res.data.album.picUrl
        this.albumInfo.albumName = res.data.album.name
        this.albumInfo.albumPublishTime = res.data.album.publishTime
      })
      _getAlbumDynamicDetail({ id: this.id }).then(res => {
        this.$nextTick(() => {
          this.tabBarList = [
            '歌曲列表',
            `评论(${res.data.commentCount})`,
            '专辑详情'
          ]
        })
        this.albumInfo.subCount = `(${res.data.subCount})`
        this.albumInfo.shareCount = `(${res.data.shareCount})`
      })
      // 评论
      _getAlbumComments({ id: this.id }).then(res => {
        this.recommends = res.data.comments
        this.hotComments = res.data.hotComments
        this.commentMore = res.data.more
        this.commentTime = this.recommends[this.recommends.length - 1].time
      })
    },
    albumClick (str) {
      this.isShow = str
    },
    musicItemClick (index) {
      this.playMusic(index)
    },
    moreComments () {
      if (!this.commentMore) {
        this.$message.info('评论已经加载完毕，暂无更多评论')
        // 修改评论组件，的评论提示消息
        this.$refs.artist_album_detail.recommendTitle =
          '评论加载完毕，暂无更多.....'
      }
      _getAlbumComments({
        id: this.id,
        limit: this.limit,
        before: this.commentTime
      }).then(res => {
        res.data.comments.forEach(item => this.recommends.push(item))
      })
    },
    // 发送评论后，重新获取评论
    getCommends () {
      // 清除评论数据
      this.recommends = []
      _getAlbumComments({ id: this.id, limit: this.limit }).then(res => {
        res.data.comments.forEach(item => this.recommends.push(item))
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .artist_album_detail {
    width: 100%;
    height: 100%;
    padding: 40px 50px;
    .artist_album_scroll {
      height: 100%;
      overflow: hidden;
    }
  }
</style>
