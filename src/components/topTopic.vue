<template>
  <div class="to_topic">
    <div class="top_topic_header" v-if="isTitle">
      <p>热门话题</p>
      <p @click="goHotTopicRankList()">更多</p>
    </div>
    <div class="top_topic_header" v-else>推荐话题</div>
    <div class="topic-item" v-for="item in topicList" :key="item.actId" @click="goTopicDetail(item.actId)">
      <div class="topic_content_image">
        <img src="" :data-src="item.sharePicUrl+ '?param=60y60' " alt="" v-imgLazy>
      </div>
      <div class="topic_content_text">
        <div class="topic_title more-over-eclipse">#{{item.title}}#</div>
        <div class="topic_number one-over-eclipse">{{item.participateCount}}人参与</div>
      </div>
    </div>
  </div>
</template>
<script>
import { _getHotTopic } from '@/network/topic';
export default {
  name: 'topTopic',
  props: {
    limit: {
      type: Number,
      default() {
        return 0;
      },
    },
    isTitle: {
      type: Boolean,
      default: () => false,
    },
  },
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
      this.topicList = hot.slice(0, this.limit);
    },
    goHotTopicRankList() {
      this.$router.push('/hotTopicRankList');
    },
    goTopicDetail(actid) {
      this.$router.push('/topicDetail/' + actid);
    },
  },
};
</script>
<style lang="less" scoped>
  .to_topic {
    width: 100%;
    padding: 0 10px 0;
    .top_topic_header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      p:nth-child(2) {
        color: rgb(129, 116, 116);
        &:hover {
          cursor: pointer;
        }
      }
    }
    .topic-item {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 10px;
      height: 60px;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        background-color: rgb(198, 210, 218);
      }
      .topic_content_image {
        img {
          width: 60px;
          height: 60px;
          vertical-align: 20px;
        }
      }
      .topic_content_text {
        flex: 1;
        margin-left: 20px;
        .topic_title {
          width: 100%;
          height: 40px;
          -webkit-line-clamp: 2;
        }
        .topic_number {
          width: 100%;
          height: 20px;
          color: rgb(129, 116, 116);
        }
      }
    }
  }
</style>
