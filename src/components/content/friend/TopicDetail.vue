<template>
  <div class="topic_detail" v-if="coverPCListUrl !== undefined">
    <div class="topic_left">
     <scroll class="topic_detail_scroll">
      <div class="topic_detail_image">
        <img :src="coverPCListUrl" alt="">
        <div class="topic_detail_content">
          <div class="topic_text">#{{title}}# </div>
          <div class="topic_count">{{participateCount}}人参与 </div>
          <el-button icon="el-icon-edit" style="width:80%;margin-left:10%;color:red" @click="shareTopicEvent('参与')">立即参与</el-button>
        </div>
        <div class="share_topic" @click="shareTopicEvent('分享')">
          <img src="../../../assets/img/share_topic.svg" alt="">
        </div>
      </div>
      <p>热门动态</p>
      <div>
        <event-dynamic :dynamicList="dynamicList"  @shaerContentImageChange="shaerContentImageChange"></event-dynamic>
      </div>
     </scroll>
    </div>
    <div class="topic_right">
    <top-topic :isTitle="true" :limit="10"></top-topic>
    </div>
    <!-- 展示分享图片 -->
      <alert-image v-if="asyncShareImag"  :index="shareContentImgIndex" :urlList="shareContentImg"></alert-image>
  </div>
</template>
<script>
import { _getTopicDetail, _getTopicEvent } from '../../../network/topic'
import Scroll from '../../common/scroll/Scroll.vue'
import TopTopic from './childComps/TopTopic.vue'
import { AttentionDynamic } from './childComps/handleUserInfo'
import { mapState } from 'vuex'
const EventDynamic = () => import('./childComps/EventDynamic.vue')
const AlertImage = () => import('./childRouter/AlertImage.vue')
export default {
  name: 'TopicDetail',
  components: { Scroll, TopTopic, EventDynamic, AlertImage },
  data () {
    return {
      participateCount: '',
      coverPCListUrl: '',
      title: '',
      id: '',
      dynamicList: [],
      shareContentImgIndex: 0,
      shareContentImg: []
    }
  },
  watch: {
    $route: {
      handler (val) {
        if (val.params.id !== ' ' && val.params.id !== undefined) {
          this.id = val.params.id
          this.initTopicDetail()
        }
      }
    }
  },
  computed: {
    ...mapState(['asyncShareImag'])
  },
  created () {
    this.id = this.$route.params.id
    this.initTopicDetail()
  },
  methods: {
    async initTopicDetail () {
      this.dynamicList = []
      const { data: { act: { coverPCListUrl, participateCount, title } } } = await _getTopicDetail(this.id)
      this.coverPCListUrl = coverPCListUrl
      this.participateCount = participateCount
      this.title = title
      _getTopicEvent(this.id).then(res => {
        res.data.events.forEach(item => this.dynamicList.push(new AttentionDynamic(item)))
      })
    },
    shaerContentImageChange (urlIndex, urlList) {
      this.shareContentImgIndex = urlIndex
      this.shareContentImg = urlList
    },
    shareTopicEvent (msg) {
      this.$message.info(`暂无${msg}动态功能`)
    }
  }
}
</script>
<style lang="less" scoped>
.topic_detail{
  display: flex;
  width: 100%;
  height: 100%;
  padding: 20px 30px;
  justify-content: flex-start;
  .topic_left{
    width: 70%;
    height: 100%;
    padding-right: 30px;
    border-right: 1px solid #949493;
    .topic_detail_scroll{
      height: 100%;
      overflow: hidden;
    }
  }
  .topic_right{
    flex: 1;
  }
}

 .topic_detail_image{
    position: relative;
    width: 100%;
    height: 400px;
    background-color: #818283;
    img{
      width: 100%;
      height: 100%;
      z-index: 1;
      opacity: .6;
    }
    .topic_detail_content{
      position: absolute;
      display: flex;
      width: 300px;
      height: 200px;
      top: 50%;
      left: 50%;
      flex-direction: column;
      justify-content: flex-end;
      text-align: center;
      vertical-align: 20px;
      color: #fff;
      z-index: 100;
      transform: translate(-50%,-50%);
    }
    .share_topic{
      position: absolute;
      width: 40px;
      height: 40px;
      right: 20px;
      top: 20px;
      border: 1px solid #fff;
      text-align: center;
      border-radius: 100%;
      img{
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-top: 10px;
        font-weight: bold;
        &:hover{
          cursor: pointer;
        }
      }
    }
}

.topic_text{
  margin-bottom: 20px;
  font-size: 26px;
}

.topic_count{
  margin-bottom: 10px;
}

p{
  padding:  20px 0 4px 0;
  font-weight: normal;
  border-bottom: 1px solid #818283;
}
</style>
