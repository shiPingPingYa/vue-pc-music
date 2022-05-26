<template>
  <div class="artist_album_detail">
    <scroll class="artist_album_scroll">
      <album-info :albumInfo="albumInfo"></album-info>
      <div class="album_bar">
        <div class="album_bar_item" :class="{ isAlbum_item: currentIndex === index }" v-for="(item, index) in tabBarList" :key="index" @click="albumClick(index)">
          {{ item }}
        </div>
      </div>
      <transition name="fade-in-linear">
        <keep-alive>
          <MusicItem v-if="currentIndex == 0" :musicList="musicList" @musicItemClick="musicItemClick" />
          <Recommend
            v-else-if="currentIndex == 1"
            :id="id"
            ref="artist_album_detail"
            :Type="3"
            :hotComments="hotComments"
            :recommends="recommends"
            @getCommends="getCommends"
            @moreComments="moreComments"
          />
          <AlbumDetail v-else :albumDescription="albumDescription" />
        </keep-alive>
      </transition>
    </scroll>
  </div>
</template>
<script>
import { _getAlbumComments, _getAlbumDeatil, _getAlbumDynamicDetail } from '@/network/detail';
import { mixinsPlayMusic } from '@/mixins/mixinsPlayMusic';
import { formDate } from '@/assets/common/tool';
import AlbumInfo from './components/AlbumInfo';
import AlbumDetail from './components/AlbumDetail';
import Recommend from '@/components/common/recommend/index';
import MusicItem from '@/components/musicItem';

export default {
  name: 'ArtistAlbumDetail',
  components: { AlbumInfo, MusicItem, Recommend, AlbumDetail },
  data() {
    return {
      id: '',
      currentIndex: 0,
      tabBarList: ['歌曲列表', '评论', '专辑详情'],
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
    };
  },
  mixins: [mixinsPlayMusic],
  created() {
    this.id = this.$route.params.id;
    this.initPage();
  },
  methods: {
    async initPage() {
      let { currentIndex } = this;
      if (currentIndex == 0) this.getAlbumDetail();
      else if (currentIndex == 1) this.getRecommend();
      else this.getAlbumDynamicDetail();
    },
    async getAlbumDetail() {
      const { data } = await _getAlbumDeatil({ id: this.id });
      if (data.code == 200) {
        this.musicList = data.songs.map(v => {
          return {
            id: v.id,
            name: v.name,
            album: v.al.name,
            song: v.ar[0].name,
            pic: v.al.picUrl,
            time: formDate(new Date(v.dt), 'mm:ss')
          };
        });
        this.albumDescription = data.album.description;
        Object.assign(this.albumInfo, {
          nickName: data.album.artist.name,
          avatarUrl: data.album.picUrl,
          albumName: data.album.name,
          albumPublishTime: data.album.publishTime
        });
      }
    },
    async getAlbumDynamicDetail() {
      const { data } = await _getAlbumDynamicDetail({ id: this.id });
      if (data.code == 200) {
        Object.assign(this.albumInfo, { subCount: data.subCount, shareCount: data.shareCount });
      }
    },
    async getRecommend() {
      // 评论
      const { data } = await _getAlbumComments({ id: this.id });
      if (data.code == 200) {
        this.tabBarList.splice(1, 1, `评论(${data.total})`);
        this.recommends = data.comments;
        this.hotComments = data.hotComments;
        this.commentMore = data.more;
        this.commentTime = this.recommends[this.recommends.length - 1].time;
      }
    },
    albumClick(i) {
      this.currentIndex = i;
      this.initPage();
    },
    musicItemClick(index) {
      this.playMusic(index);
    },
    async moreComments() {
      if (!this.commentMore) {
        this.$refs.artist_album_detail.recommendTitle = '评论加载完毕，暂无更多.....';
        return this.$message.info('评论已经加载完毕，暂无更多评论');
      }
      const { data } = await _getAlbumComments({
        id: this.id,
        limit: this.limit,
        before: this.commentTime
      });
      if (data.code == 200) {
        this.commentMore = data.more;
        data.comments.forEach(v => this.recommends.push(v));
      }
    },
    // 发送评论后，重新获取评论
    async getCommends() {
      this.recommends = [];
      const { data } = await _getAlbumComments({ id: this.id, limit: this.limit });
      if (data.code == 200) data.comments.forEach(v => this.recommends.push(v));
    }
  }
};
</script>
<style lang="less" scoped>
.artist_album_detail {
  width: 100%;
  height: 100%;
  padding: 40px 50px;

  .artist_album_scroll {
    height: 100%;
    overflow: hidden;

    .album_bar {
      display: flex;
      justify-content: flex-start;
      margin: 40px 0 8px 0;
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      .album_bar_item {
        padding: 0 40px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .isAlbum_item {
      color: red;
      border-bottom: 2px solid red;
    }
  }
}
</style>
