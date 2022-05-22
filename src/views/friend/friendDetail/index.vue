<template>
  <div class="friend-detail">
    <attentionDynamic />
    <userAttentionInfo />
  </div>
</template>
<script>
// 用户动态
import attentionDynamic from './components/attentionDynamic';
// 用户用户关注默认信息
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
