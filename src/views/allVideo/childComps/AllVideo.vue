<template>
  <div class="all-video-bar">
     <div class="content">
    <div class="type">分类:
      <div class="item" v-for="(item,index) in videoGroupList" :key="index"
      :class="{action:currentIndex == index}" @click="groupClick(index)">
        {{item.name}}
      </div>
    </div>
  </div>
  <scroll ref="scroll" class="all-video-scroll" :pull-up-load="true" @pullingUp="pullingUp()">
  <video-item :videoList="videoList"></video-item>
  </scroll>
  </div>
</template>
<script>
// 导入数据接口
import { _getGroupList, _getGroupVideo, Video } from '../../../network/video'
import Scroll from '../../../components/common/scroll/Scroll.vue'
import VideoItem from './VideoItem.vue'
// 导入vuex获取保存的cookie
import { mapState } from 'vuex'
// 导入防抖函数
import { throttled } from '../../../assets/common/tool'
export default {
  name: 'AllVideo',
  components: { Scroll, VideoItem },
  data () {
    return {
      videoList: [],
      videoGroupList: null,
      GroupList: null,
      currentIndex: 0,
      groupId: 58100,
      // 分页参数
      page: 4
    }
  },
  computed: {
    ...mapState(['cookie'])
  },
  async created () {
    await _getGroupList().then(res => {
      this.videoGroupList = res.data.data.slice(0, 10)
    })
    // 判断是否登录
    if (this.cookie !== '' && this.cookie !== null) {
      // 获取默认的第一个导航条的数据
      this.loadGroup()
    } else {
      this.$message.warning('请先登录，才能获取视频')
    }
  },
  methods: {
    // 加载导航条
    async loadGroup () {
      this.videoList = []
      for (let i = 0; i < this.page; i++) {
        await _getGroupVideo(this.videoGroupList[this.currentIndex].id, this.cookie, i).then(res => {
          if (res.data.datas.length === 0) {
            this.$message.warning('当前标签下暂无音乐')
          }
          for (var i in res.data.datas) {
            var video = new Video(res.data.datas[i].data)
            this.videoList.push(video)
          }
        })
      }
    },
    // 下拉视频
    pullingUp: throttled(function () {
      ++this.page
      // 获取数据
      this.loadGroup()
      this.$refs.scroll.finishPullUp()
    }, 900),
    // 导航条点击事件，重新获取数据
    groupClick (i) {
      this.currentIndex = i
      this.page = 4
      // 重新获取数据
      this.loadGroup()
      this.$refs.scroll.finishPullUp()
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
  color: #828385;
  padding-bottom: 8px;
  > .all-video-scroll{
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
      cursor: pointer;
    }
  }
.action{
  color: #fff;
  background-color: #54575f;
}
</style>
