<template>
  <div class="all-video-bar">
    <div class="type">分类:
      <div class="item" v-for="(item,index) in videoGroupList" :key="index"
      :class="{action:currentIndex == index}" @click="groupClick(index)">
        {{item.name}}
      </div>
    </div>
  </div>
</template>
<script>
// 导入数据接口
import { _getGroupList, _getGroupVideo } from '../../../network/video'
export default {
  name: 'AllVideo',
  data () {
    return {
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
    console.log(this.videoGroupList)
    for (var i of this.videoGroupList) {
      _getGroupVideo(i.id).then(res => {
        console.log(res)
      })
    }
  },
  methods: {
    groupClick (i) {
      this.currentIndex = i
    }
  }
}
</script>
<style lang="less" scoped>
.all-video-bar{
  font-size: 14px;
  color: #828385;
  padding-bottom: 8px;
   > .type{
    margin-top: 20px;
    display: flex;
    > .item{
      margin-left: 10px;
      padding: 0 10px;
      text-align: center;
      cursor: pointer;
    }
  }
}

.action{
  color: #fff;
  background-color: #54575f;
}
</style>
