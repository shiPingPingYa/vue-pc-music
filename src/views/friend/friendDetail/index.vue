<template>
  <div class="friend-detail">
    <attentionDynamic />
    <userAttentionInfo />
  </div>
</template>
<script>
import attentionDynamic from './components/attentionDynamic';
import userAttentionInfo from './components/userAttentionInfo';
export default {
  name: 'friendDetail',
  components: { attentionDynamic, userAttentionInfo },
};
</script>
<style lang="less" scoped>
  .friend-detail {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: flex-start;
  }
</style>
