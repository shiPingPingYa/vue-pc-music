<template>
  <div class="friend-detail">
    <!-- 左边动态区域 -->
    <attention-dynamic></attention-dynamic>
    <!-- 右边用户关注区域 -->
    <user-attention-info></user-attention-info>
  </div>
</template>
<script>
// 用户动态
import AttentionDynamic from './childComps/AttentionDynamic.vue'
// 用户用户关注默认信息
import UserAttentionInfo from './childComps/UserAttentionInfo.vue'
export default {
  components: { AttentionDynamic, UserAttentionInfo },
  name: 'FriendDetail'
}
</script>
<style lang="less" scoped>
  .friend-detail {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: flex-start;
  }
</style>
