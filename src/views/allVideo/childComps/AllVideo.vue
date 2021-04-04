<template>
  <div class="all-video-bar">
  <scroll class="all-video-scroll">
  <div class="content">
    <div class="type">分类:
      <div class="item" v-for="(item,index) in videoGroupList" :key="index"
      :class="{action:currentIndex == index}" @click="groupClick(index)">
        {{item.name}}
      </div>
    </div>
  <video-item :videoList="videoList"></video-item>
  </div>
  </scroll>
  </div>
</template>
<script>
// 导入数据接口
import { _getGroupList } from '../../../network/video'
import Scroll from '../../../components/common/scroll/Scroll.vue'
import VideoItem from './VideoItem.vue'
export default {
  name: 'AllVideo',
  components: { Scroll, VideoItem },
  data () {
    return {
      videoList: [],
      videoGroupList: null,
      GroupList: null,
      currentIndex: 0,
      groupId: 58100
    }
  },
  async created () {
    await _getGroupList().then(res => {
      this.videoGroupList = res.data.data.slice(0, 10)
    })
    // 获取默认的第一个导航条的数据
    // this.loadGroup()
  },
  methods: {
    // 加载导航条
    // async loadGroup () {
    //   for (var i of this.videoGroupList) {
    //     await _getGroupVideo(i.id).then(res => {
    //       // res.data.datas id:uid palyCount:praisedCount title:title , coverUlr:coverUrl
    //       console.log(res.data)
    //     })
    //   }
    // },
    // 导航条点击事件，重新获取数据
    groupClick (i) {
      this.currentIndex = i
    }
  }
}
</script>
<style lang="less" scoped>
.all-video-bar{
  width: 100%;
  height: 100%;
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
