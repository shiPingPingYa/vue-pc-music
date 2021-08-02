<template>
  <div class="to_topic">
 <div class="top_topic_header" v-if="isTitle">
    <p>热门话题</p>
    <p @click="toHotTopicRankList()">更多</p>
 </div>
 <div class="top_topic_header" v-else>推荐话题</div>
 <div class="topic_content" v-for="item in topicList" :key="item.actId" @click="goTopicDetail(item.actId)" >
   <div class="topic_content_image">
     <img :src="item.sharePicUrl+ '?param=60y60' " alt="">
   </div>
   <div class="topic_content_text">
     <div class="topic_title">#{{item.title}}#</div>
     <div class="topic_number">{{item.participateCount}}人参与</div>
   </div>
 </div>
  </div>
</template>
<script>
import { _getHotTopic } from '../../../../network/topic'
import { goTopicDetailMixin } from '../go'
export default {
  name: 'TopTopic',
  props: {
    limit: {
      type: Number,
      default () {
        return 0
      }
    },
    isTitle: {
      type: Boolean
    }
  },
  mixins: [goTopicDetailMixin],
  data () {
    return {
      topicList: []
    }
  },
  async created () {
    await _getHotTopic().then(res => {
      this.topicList = res.data.hot.slice(2, this.limit)
    })
  },
  methods: {
    toHotTopicRankList () {
      this.$router.push('/hotTopicRankList')
    }
  }
}
</script>
<style lang="less" scoped>
.to_topic{
  width: 100%;
  .top_topic_header{
    display: flex;
    padding: 10px 30px;
    justify-content: space-between;
    p:nth-child(2){
      color: rgb(129, 116, 116);
      &:hover{
        cursor: pointer;
      }
    }
  }
  .topic_content{
    display: flex;
    height: 60px;
    margin-left: 30px;
    margin-bottom: 10px;
    justify-content: flex-start;
    font-size: 14px;
    .topic_content_text{
      flex: 1;
      margin-left: 20px;
      .topic_number{
        color:  rgb(129, 116, 116);
      }
    }
    &:hover{
      background-color: rgb(198, 210, 218);
      cursor: pointer;
    }
  }
}

.topic_content_image{
  img{
    width: 60px ;
    height: 60px;
    vertical-align: 20px;
  }
}
</style>
