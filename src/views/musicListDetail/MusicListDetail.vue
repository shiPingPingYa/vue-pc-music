<template>
  <div class="music-list-detail">
    <scroll ref="musiclist_detail" class="musiclist-detail">
      <music-base-info :baseInfo="baseInfo"></music-base-info>
      <music-bar ref="tab_bar" :bar="bar" @handleTabClick="handleTabClick"></music-bar>
      <transition-group name="fade-in-linear">
        <MusicItem :key="0" v-show="tabBarIndex === 0" :musicList="musicList" @musicItemClick="musicItemClick" />
        <song-list-recommends
          :key="1"
          v-show="tabBarIndex === 1"
          :id="id"
          ref="songList_recommends"
          :Type="2"
          :hotComments="hotComments"
          :recommends="recommends"
          @getCommends="getCommends"
          @moreComments="moreComments"
        ></song-list-recommends>
        <CollectSongList :key="2" v-show="tabBarIndex === 2" :subs="subs" />
      </transition-group>
    </scroll>
  </div>
</template>
<script>
import { _getMusicListDetail, _getRecommends, _getSongsDetail, _getSub } from '@/network/detail';
import { mixinsPlayMusic } from '../../mixins/mixinsPlayMusic';
import { formDate } from '@/assets/common/tool';
import MusicBaseInfo from './childComps/MusicBaseInfo';
import MusicBar from './childComps/MusicBar';
import MusicItem from '@/components/musicItem';
import CollectSongList from './components/collectSongList';
const songListRecommends = () => import('./childComps/Recommends.vue');
export default {
  name: 'MusicListDetail',
  mixins: [mixinsPlayMusic],
  components: { MusicBaseInfo, MusicBar, MusicItem, CollectSongList, songListRecommends },
  data() {
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
    };
  },

  watch: {
    '$route.params.id': {
      handler(oldId) {
        if ((oldId ?? '') !== '') {
          this.id = oldId;
          this.tabBarIndex = 0;
          this.$refs.tab_bar._data.currentIndex = 0;
          this.initMusicListAndTabbar();
        }
      },
      deep: true
    }
  },
  created() {
    this.id = this.$route.params.id;
    localStorage.setItem('pid', this.id); // 存储歌单id，心动模式必需
    this.initMusicListAndTabbar();
  },
  methods: {
    handleTabClick(str) {
      this.tabBarIndex = str;
      if (str === 1) this.initMusicListComments();
      else {
        this.initMusicListLike();
      }
    },
    // 初始化音乐列表
    async initMusicListAndTabbar() {
      this.musicList = [];
      // 获取歌单id，获取歌单数据，commentCount:评论数量，trackIds:歌曲id，playlist:歌曲信息
      const {
        data: {
          playlist,
          playlist: { commentCount, trackIds }
        }
      } = await _getMusicListDetail(this.id);

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
      };
      // 处理评论默认信息
      this.bar = ['歌曲列表', `评论${commentCount}`, '收藏者'];

      // 拼接id ,获取歌曲，处理歌曲信息
      const ids = trackIds.map(item => item.id).join(',');
      const {
        data: { songs }
      } = await _getSongsDetail(ids);

      songs.forEach(item =>
        this.musicList.push({
          id: item.id,
          name: item.name,
          album: item.al.name,
          song: item.ar[0].name,
          pic: item.al.picUrl,
          time: formDate(new Date(item.dt), 'mm:ss')
        })
      );
    },
    // 获取歌单评论内容
    async initMusicListComments() {
      const {
        data: { comments, hotComments }
      } = await _getRecommends({
        id: this.id,
        limit: this.limit,
        offset: this.recommends.length,
        timestamp: Date.now()
      });
      this.recommends = comments;
      this.hotComments = hotComments;
    },
    async initMusicListLike() {
      // 获取歌单收藏者
      const {
        data: { subscribers }
      } = await _getSub(this.id);
      this.subs = subscribers;
    },
    // 获取更多评论
    async moreComments() {
      const {
        data: { comments }
      } = await _getRecommends({
        id: this.id,
        limit: this.limit,
        offset: this.recommends.length,
        timestamp: Date.now()
      });
      if (comments.length === 0) {
        this.$message.info('评论已经加载完毕，暂无更多评论');
        // 修改评论组件，的评论提示消息
        this.$refs.songList_recommends.recommendTitle = '评论加载完毕，暂无更多.....';
      } else comments.forEach(item => this.recommends.push(item));
    },
    // 发送评论后，重新获取评论
    async getCommends() {
      // 清除评论数据
      this.recommends = [];
      const {
        data: { comments }
      } = await _getRecommends({
        id: this.id,
        limit: this.limit,
        offset: 0,
        timestamp: Date.now()
      });
      this.recommends = comments;
    },
    // 子组件上面的歌曲点击事件传递音乐下标
    musicItemClick(index) {
      this.playMusic(index);
    }
  }
};
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
