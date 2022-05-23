<template>
  <div class="hot_topic_list">
    <scroll class="hot_topic_list_scroll">
      <div class="topic_rank">
        <soarTopicList />
      </div>
    </scroll>
    <div class="topic">
      <topTopic :limit="6" :isTitle="false" />
    </div>
  </div>
</template>
<script>
import topTopic from '@/components/topTopic.vue';
import soarTopicList from './components/soarTopicList';
export default {
  name: 'hotTopic',
  components: { topTopic, soarTopicList },
};
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
      .topic_rank {
        width: 100%;
        border-right: 1px solid #828385;
      }
    }
    .topic {
      flex: 1;
      padding: 50px 0 60px 0;
    }
  }
</style>
