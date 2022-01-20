<template>
  <div class="all-video-bar">
    <div class="content">
      <!-- 热门视频标签列表 -->
      <div class="w-120">
        <el-select v-model="videoGroupListTagId" placeholder="请选择" size="small" style="width:100%" @change="handleSelectChange">
          <el-option v-for="item in videoGroupListTag" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="type">分类:
        <div class="item" v-for="(item,index) in videoGroupList" :key="index" :class="{'action':currentIndex == index}" @click="handleGroupClick(index)">
          {{item.name}}
        </div>
      </div>
    </div>
    <scroll ref="scroll" class="all-video-scroll">
      <video-item :videoList="videoList"></video-item>
      <div class="video_pagination">
        <el-pagination v-show="videoList.length >= 38" @current-change="handleCurrentChange" background :current-page="page" layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
    </scroll>
  </div>
</template>
<script>
// 导入数据接口
import { _getGroupList, _getGroupVideo } from 'api/video'
import Scroll from 'common/scroll/Scroll.vue'
import VideoItem from './VideoItem.vue'
export default {
  name: 'AllVideo',
  components: { Scroll, VideoItem },
  data () {
    return {
      page: 1,
      videoList: [],
      currentIndex: 0,
      videoGroupList: [],
      videoGroupListTagId: '',
      videoGroupListTag: ''
    }
  },
  created () {
    // 获取导航条
    this.initGroupList()
  },
  methods: {
    async initGroupList () {
      const {
        data: { data }
      } = await _getGroupList()
      this.videoGroupList = data.slice(0, 10)
      this.videoGroupListTag = data.slice(10, data.length - 1)
      this.initVideoList(false)
    },
    async initVideoList (flag) {
      var params = {
        offset: this.videoList.length
      }
      flag
        ? (params.id = this.videoGroupListTagId)
        : (params.id = this.videoGroupList[this.currentIndex].id)
      // 清空视频列表
      this.videoList = []
      const {
        data: { datas }
      } = await _getGroupVideo(params)
      this.videoList = datas.map(item => {
        return {
          id: item.data.vid,
          cover: item.data.coverUrl,
          title: item.data.title,
          count: item.data.playTime,
          user: item.data.creator
        }
      })
      this.$refs.scroll.refresh()
    },
    // 导航条点击事件，重新修改导航条显示下标
    handleGroupClick (i) {
      this.currentIndex = i
      this.videoGroupListTagId = ''
      this.page = 1
      this.initVideoList(false)
    },
    // 获取对应页码数据
    handleCurrentChange (val) {
      this.$refs.scroll.refresh()
      this.page = val
      this.initVideoList(false)
    },
    // 热门视频标签的点击
    handleSelectChange () {
      this.currentIndex = -1
      this.page = 1
      this.initVideoList(true)
    }
  }
}
</script>
<style lang="less" scoped>
  .all-video-bar {
    width: 100%;
    height: 100%;
    padding: 0 20px;
    font-size: 14px;
    color: #01060a;
    > .all-video-scroll {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }

  .type {
    margin-top: 20px;
    display: flex;
    > .item {
      margin-left: 10px;
      padding: 0 10px;
      text-align: center;
      color: #54575f;
      cursor: pointer;
    }
  }
  .action {
    color: #fff !important;
    background-color: #54575f;
  }

  .video_pagination {
    display: flex;
    margin-top: 10px;
    padding-bottom: 120px;
    justify-content: flex-end;
  }
</style>
