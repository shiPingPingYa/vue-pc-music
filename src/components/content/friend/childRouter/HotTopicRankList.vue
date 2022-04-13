<template>
  <div class="hot_topic_list">
    <scroll class="hot_topic_list_scroll">
      <div class="topic_rank">
        <hot-topic-list></hot-topic-list>
      </div>
    </scroll>
    <div class="topic">
      <top-topic :limit="limit"></top-topic>
    </div>
  </div>
</template>
<script>
import TopTopic from '../childComps/TopTopic.vue'
import HotTopicList from '../childComps/HotTopicList'
export default {
  name: 'HotTopicRankList',
  data() {
    return {
      limit: 12
    }
  },
  components: { TopTopic, HotTopicList }
}
</script>
<style lang="less" scoped>
  .hot_topic_list {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    .hot_topic_list_scroll {
      width: 80%;
      height: 100%;
      overflow: hidden;
    }
  }
  .topic_rank {
    width: 100%;
    border-right: 1px solid #828385;
  }
  .topic {
    flex: 1;
    padding: 200px 0 0 20px;
  }
</style>
