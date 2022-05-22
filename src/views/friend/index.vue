<template>
  <div class="friend-detail">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'friend-detail',
};
</script>
<style lang="less" scoped>
  .friend-detail {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 10px 20px 0;
  }
</style>
