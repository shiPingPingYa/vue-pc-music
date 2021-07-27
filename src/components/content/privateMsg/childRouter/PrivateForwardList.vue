<template>
  <div class="private_content">
    <div class="foward_prompt" v-show="forwardsList.length === 0">暂无数据</div>
  </div>
</template>
<script>
export default {
  name: 'PrivateForwardList',
  props: {
    forwardsList: {
      type: Array,
      default () {
        return []
      }
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
