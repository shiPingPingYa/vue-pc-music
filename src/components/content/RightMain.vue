<template>
  <div class="main">
    <keep-alive include="Allmv">
    <router-view></router-view>
    </keep-alive>
    <!-- 登录组件 -->
    <login v-show="$store.getters.getLoginStatus"></login>
  </div>
</template>
<script>
// 导入登录页面
import Login from '../content/user/Login'
export default {
  name: 'RightMain',
  components: { Login }
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
