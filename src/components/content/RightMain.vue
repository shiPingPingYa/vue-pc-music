<template>
  <div class="main">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'RightMain'
}
</script>
<style lang="less" scoped>
.main{
  position: relative;
  width: 82%;
  height:100% ;
  background-color: #16181c;
}
</style>
