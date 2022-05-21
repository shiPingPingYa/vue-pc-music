<template>
  <div class="category">
    <!-- 热门标签列表 -->
    <div class="w-120">
      <el-select v-model="HighqualityName" placeholder="请选择" size="small" style="width:100%" @change="handleSelectChange">
        <el-option v-for="item in HighqualityOptions" :key="item.id" :label="item.name" :value="item.name">
        </el-option>
      </el-select>
    </div>
    <!-- 热门标签 -->
    <div class="tags">
      <span>热门标签:</span>
      <div class="tag-item" v-for="(item,index) in tags" :key="index" :class="{tagCur:currentIndex == index}" @click="handleTabClick(index)">
        {{item.name}}
      </div>
    </div>
    <scroll ref="scroll" class="song-category" :pull-up-load="true" @pullingUp="getMusicSongSheet(false)">
      <!-- 歌单列表 -->
      <songList :totalList="musicList" />
    </scroll>
  </div>
</template>
<script>
import { _getHighquality, _getMusicListHot, _getHighqualityTags } from '@/network/detail';
import { throttled } from '@/assets/common/tool';
import songList from '@/components/songList';
export default {
  name: 'songListCategory',
  data() {
    return {
      tags: null,
      currentIndex: 0,
      limit: 18,
      page: 1,
      musicList: [],
      HighqualityOptions: '',
      HighqualityName: '',
      more: true, // 加载后，判断有无数据还未加载
    };
  },
  components: { songList },
  mounted() {
    this.initCategoryList();
    this.$refs.scroll.refresh();
  },
  methods: {
    async initCategoryList() {
      const {
        data: { tags },
      } = await _getMusicListHot();
      this.tags = tags;
      const {
        data: { playlists },
      } = await _getHighquality(this.tags[this.currentIndex].name, this.limit * this.page);
      // 获取精品歌单标签
      const {
        data: { tags: otherTags },
      } = await _getHighqualityTags();
      this.HighqualityOptions = otherTags;
      this.musicList = playlists;
    },
    // 获取音乐歌单
    getMusicSongSheet: throttled(async function (flag) {
      if (!this.more) return this.$message.info('暂无更多歌单！！！');
      this.page++;
      let params = {
        limit: this.limit * this.page,
      };
      // flag区分是精品歌单标签还是普通的tabbar
      flag ? (params.cat = this.HighqualityName) : (params.cat = this.tags[this.currentIndex].name);
      const {
        data: { playlists, more },
      } = await _getHighquality(params);
      this.musicList = playlists;
      this.more = more;
      this.$refs.scroll.finishPullUp();
    }, 800),
    // 导航栏的点击事件
    handleTabClick(index) {
      this.musicList = [];
      this.more = true;
      this.currentIndex = index;
      this.page = 1;
      this.$refs.scroll.scrollTo(0, 0, 200);
      this.getMusicSongSheet(false);
    },
    // 下拉列表点击事件
    handleSelectChange() {
      this.musicList = [];
      this.more = true;
      this.currentIndex = -1;
      this.page = 1;
      this.$refs.scroll.scrollTo(0, 0, 200);
      this.getMusicSongSheet(true);
    },
  },
};
</script>
<style lang="less" scoped>
  .category {
    margin: 0 auto 20px auto;
    padding-bottom: 20px;
    width: 98%;
    height: 100%;
    font-size: 14px;
    color: #01060a;
    overflow: hidden;
    > .tags {
      margin-bottom: 20px;
      height: 30px;
      display: flex;
      align-items: center;
    }
  }

  .tags > .tag-item {
    padding: 0 10px;
    color: #828384;
    cursor: pointer;
  }

  .song-category {
    height: calc(100% - 30px);
    overflow: hidden;
  }

  .tagCur {
    color: #4facd1 !important;
  }
</style>
