<template>
  <div class="hot_topic">
    <div class="top_topic_header">
      <p>话题飙升榜</p>
    </div>
    <div class="topic_content" v-for="(item,index) in topicList" :key="item.actId" @click="goTopicDetail(item.actId)">
      <div class="topic_index" :class="{text_red:index < 3}">{{index + 1}}</div>
      <div class="topic_content_image">
        <img src="" :data-src="item.sharePicUrl+ '?param=100y100' " alt="" v-imgLazy>
      </div>
      <div class="topic_content_text">
        <div class="topic_title">#{{item.title}}#</div>
        <div class="topic_number">{{item.participateCount}}人参与</div>
      </div>
    </div>
  </div>
</template>
<script>
import { _getHotTopic } from '@/network/topic';
export default {
  name: 'soarTopicList',
  data() {
    return {
      topicList: [],
    };
  },
  created() {
    this.initTopicList();
  },
  methods: {
    async initTopicList() {
      const {
        data: { hot },
      } = await _getHotTopic();
      this.topicList = hot;
    },
    goTopicDetail(actid) {
      this.$router.push('/topicDetail/' + actid);
    },
  },
};
</script>
<style lang="less" scoped>
  .hot_topic {
    width: 100%;
    .top_topic_header {
      display: flex;
      padding: 10px 6px 6px;
      justify-content: space-between;
      p:nth-child(1) {
        width: 100%;
        padding-bottom: 20px;
        border-bottom: 1px solid black;
        font-size: 20px;
        color: rgb(129, 116, 116);
        &:hover {
          cursor: pointer;
        }
      }
    }
    .topic_content {
      display: flex;
      height: 140px;
      margin-bottom: 10px;
      justify-content: flex-start;
      font-size: 20px;
      .topic_index {
        width: 60px;
        line-height: 140px;
        text-align: center;
      }
      .topic_content_text {
        flex: 1;
        margin: 20px;
        .topic_number {
          color: rgb(129, 116, 116);
        }
      }
      &:hover {
        background-color: rgb(198, 210, 218);
        cursor: pointer;
      }
    }
  }

  .topic_content_image {
    img {
      display: inline-block;
      width: 100px;
      height: 100px;
      margin: 20px;
    }
  }

  .text_red {
    color: red;
  }
</style>
