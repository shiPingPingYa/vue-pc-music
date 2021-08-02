<template>
  <div class="all-video-bar">
    <div class="content">
    <!-- 热门视频标签列表 -->
    <div class="w-120" >
       <el-select v-model="videoGroupListTagId" placeholder="请选择" size="small" style="width:100%" @change="changeHighqualityName">
        <el-option
          v-for="item in videoGroupListTag"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div class="type">分类:
      <div class="item" v-for="(item,index) in videoGroupList" :key="index"
      :class="{action:currentIndex == index}" @click="groupClick(index)">
        {{item.name}}
      </div>
    </div>
  </div>
  <scroll ref="scroll" class="all-video-scroll" >
  <video-item :videoList="videoList"></video-item>
   <div class="video_pagination">
     <el-pagination
      v-show="videoList.length >= 38"
      @current-change="handleCurrentChange"
      background
      :current-page="currenPage"
      layout="prev, pager, next"
      :total="1000">
  </el-pagination>
  </div>
  </scroll>
  </div>
</template>
<script>
// 导入数据接口
import { _getGroupList, _getGroupVideo, Video } from '../../../network/video'
import Scroll from '../../../components/common/scroll/Scroll.vue'
import VideoItem from './VideoItem.vue'
export default {
  name: 'AllVideo',
  components: { Scroll, VideoItem },
  data () {
    return {
      videoList: [],
      videoGroupList: null,
      currentIndex: 0,
      currenPage: 1,
      page: 1,
      offset: 5,
      // 视频标签列表
      videoGroupListTag: '',
      videoGroupListTagId: ''
    }
  },
  async created () {
    // 获取导航条
    await _getGroupList().then(res => {
      this.videoGroupList = res.data.data.slice(0, 10)
      this.videoGroupListTag = res.data.data
    })
    this.loadGroup(false)
  },
  methods: {
    // 获取对应导航条下面的数据
    loadGroup (flag) {
      // 清空视频列表
      this.videoList = []
      if (flag === false) {
        const params = {
          id: this.videoGroupList[this.currentIndex].id,
          offset: undefined
        }
        for (let i = this.page; i <= this.offset; i++) {
          params.offset = i
          _getGroupVideo(params).then(res => {
            res.data.datas.forEach(item => this.videoList.push(new Video(item.data)))
          })
        }
      } else {
        const param = {
          id: this.videoGroupListTagId,
          offset: undefined
        }
        for (let i = this.page; i <= this.offset; i++) {
          param.offset = i
          _getGroupVideo(param).then(res => {
            res.data.datas.forEach(item => this.videoList.push(new Video(item.data)))
          })
        }
      }
    },
    // 导航条点击事件，重新修改导航条显示下标
    groupClick (i) {
      this.currentIndex = i
      this.page = 1
      this.offset = 5
      this.currenPage = 1
      // 重新获取数据
      this.loadGroup(false)
      this.$refs.scroll.finishPullUp()
    },
    // 获取对应页码数据
    async handleCurrentChange (val) {
      this.offset = val * 5
      this.page = this.offset - 4
      this.loadGroup(false)
    },
    // 热门视频标签的点击
    changeHighqualityName () {
      this.currentIndex = -1
      this.page = 1
      this.offset = 5
      this.currenPage = 1
      this.loadGroup(true)
    }
  }
}
</script>
<style lang="less" scoped>
.all-video-bar{
  width: 100%;
  height: 100%;
  padding: 0 20px;
  font-size: 14px;
  color: #01060a;
  > .all-video-scroll{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}

.type{
    margin-top: 20px;
    display: flex;
    > .item{
      margin-left: 10px;
      padding: 0 10px;
      text-align: center;
      color: #54575f  ;
      cursor: pointer;

    }
  }
.action{
  color: #fff  !important;
  background-color: #54575f;
}

.video_pagination{
  display: flex;
  margin-top: 10px;
  padding-bottom: 120px;
  justify-content: flex-end;

}
</style>
