<template>
  <div class="music-list-detail">
    <div class="musiclist-detail">
      <MusicBaseInfo :baseInfo="baseInfo" @playMusic="playMusic" />
      <div class="musiclsit-bar">
        <div class="item" v-for="(item, index) in bar" :key="index" :class="{ action: tabBarIndex == index }" @click="handleTabClick(index)">
          {{ item }}
        </div>
      </div>
      <keep-alive>
        <transition-group name="fade-in-linear">
          <MusicItem :key="0" v-show="tabBarIndex === 0" :musicList="musicList" @musicItemClick="musicItemClick" />
          <Recommend
            ref="songList_recommends"
            :key="1"
            v-show="tabBarIndex === 1"
            :id="id"
            :Type="2"
            :hotComments="hotComments"
            :recommends="recommends"
            @getCommends="getCommends"
            @moreComments="moreComments"
          />
          <CollectSongList :key="2" v-show="tabBarIndex === 2" :id="id" />
        </transition-group>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import { _getMusicListDetail, _getRecommends, _getSongsDetail, _getSub } from '@/network/detail';
import { mixinsPlayMusic } from '../../mixins/mixinsPlayMusic';
import { formDate } from '@/assets/common/tool';
import MusicBaseInfo from './components/MusicBaseInfo';
import MusicItem from '@/components/musicItem';
import CollectSongList from './components/collectSongList';
import Recommend from '@/components/common/recommend/index';
export default {
  name: 'MusicListDetail',
  mixins: [mixinsPlayMusic],
  components: { MusicBaseInfo, MusicItem, CollectSongList, Recommend },
  data() {
    return {
      id: '',
      bar: [],
      tabBarIndex: 0,
      isClickTab: false,
      baseInfo: null,
      musicList: [],
      recommends: [],
      hotComments: [],
      limit: 50
    };
  },

  watch: {
    '$route.params.id': {
      handler(oldId) {
        if ((oldId ?? '') !== '') {
          this.id = oldId;
          this.tabBarIndex = 0;
          this.initMusicListDetail();
        }
      },
      deep: true
    }
  },
  created() {
    this.id = this.$route.params.id;
    localStorage.setItem('pid', this.id); // 存储歌单id，心动模式必需
    this.initMusicListDetail();
  },
  methods: {
    handleTabClick(i) {
      this.tabBarIndex = i;
      !this.isClickTab && this.initMusicListComments(); //keep-alive做了缓存，判断是否是第二次点击
      this.isClickTab = true;
    },
    // 初始化音乐列表
    async initMusicListDetail() {
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
      const ids = trackIds
        .slice(0, 100)
        .map(item => item.id)
        .join(',');
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
  margin: 2% auto;
  width: 96%;
  height: 94%;
  color: #01060a;
  overflow: hidden;
  .musiclist-detail {
    height: 100%;
    overflow-y: scroll;

    .musiclsit-bar {
      padding-top: 10px;
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      font-size: 14px;
      > .item {
        padding: 5px 20px;
        cursor: pointer;
      }
    }
  }

  .action {
    border-bottom: 3px solid #b82525;
  }
}
</style>
