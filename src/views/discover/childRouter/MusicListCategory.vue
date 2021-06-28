<template>
  <div class="category">
    <!-- 热门标签 -->
    <div class="tags" >
      <span>热门标签:</span>
      <div class="tag-item" v-for="(item,index) in tags" :key="index" :class="{tagCur:currentIndex == index}"
      @click="tagClick(index)">
        {{item.name}}
      </div>
    </div>
    <scroll ref="scroll" class="song-category" :pull-up-load="true" @pullingUp="pullingUp">
  <!-- 歌单列表 -->
  <music-list :totalList="musicList" ></music-list>
</scroll>
  </div>
</template>
<script>
import Scroll from '../../../components/common/scroll/Scroll'
// 导入歌单列表
import MusicList from '../../musicListDetail/MusicList'
// 导入数据接口，获取热门标签，获取热门标签歌单列表
import { _getHighquality, _getMusicListHot } from '../../../network/detail'
// 歌单节流
import { throttled } from '../../../assets/common/tool'
export default {
  name: 'MusicListCategory',
  data () {
    return {
      tags: null,
      currentIndex: 0,
      limit: 18,
      page: 1,
      musicList: []
    }
  },
  components: {
    Scroll,
    MusicList
  },
  async  created () {
    const { data: { tags } } = await _getMusicListHot().then()
    this.tags = tags
    const { data: { playlists } } = await _getHighquality(this.tags[this.currentIndex].name, this.limit * this.page).then()
    this.$refs.scroll.finishPullUp()
    this.musicList = playlists
  },
  methods: {
    // scroll下拉调用的方法
    pullingUp () {
      this.getHighquality()
    },
    // 获取热门标签下面的精品歌单
    getHighquality: throttled(async function () {
      this.page++
      const { data: { playlists } } = await _getHighquality(this.tags[this.currentIndex].name, this.limit * this.page).then()
      this.musicList = playlists
      this.$refs.scroll.finishPullUp()
    }, 800),
    // 导航栏的点击事件
    tagClick (index) {
      this.currentIndex = index
      this.getHighquality()
    }
  }
}
</script>
<style lang="less" scoped>
.category{
  margin: 0 auto 20px auto;
  padding-bottom: 20px;
  width: 98%;
  height: 100%;
  font-size: 14px;
  color: #01060a;;
  overflow: hidden;
  > .tags{
    margin-bottom: 20px;
    height: 30px;
    display: flex;
    align-items: center;
  }
}

.tags > .tag-item{
  padding: 0 10px;
  color: #828384;
  cursor: pointer;
}

.song-category{
  height: calc(100% - 30px);
  overflow: hidden;
}

.tagCur {
  color: #4facd1 !important;
}
</style>
