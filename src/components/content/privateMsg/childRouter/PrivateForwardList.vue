<template>
  <div class="private_content">
    <div class="foward_prompt">暂未处理获取@我数据</div>
  </div>
</template>
<script>
export default {
  name: 'PrivateForwardList',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="less" scoped>
  .private_content {
    width: 98%;
    height: 100%;
    padding: 4px 0 0 2px;
  }

  .foward_prompt {
    width: 100%;
    height: 30px;
    margin-top: 20%;
    line-height: 30px;
    text-align: center;
  }
</style>
