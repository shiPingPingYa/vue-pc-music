<template>
  <div class="main">
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
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
