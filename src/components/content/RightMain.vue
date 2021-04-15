<template>
  <div class="main">
    <keep-alive include="Allmv">
    <!-- 左边导航栏的路由占位符 -->
    <router-view></router-view>
    </keep-alive>
    <!-- 登录组件 -->
    <login v-show="$store.getters.getLoginStatus"></login>
    <!-- 注册组件 -->
    <register v-if="$store.state.isShowRegister"></register>
    <!-- 二维码组件 -->
    <qrcode v-if="$store.state.isShowQrcode"></qrcode>
  </div>
</template>
<script>
// 导入登录页面
import Login from '../content/user/Login'
// 注册组件
import Register from './user/Register.vue'
import Qrcode from './user/Qrcode'
export default {
  name: 'RightMain',
  components: { Login, Register, Qrcode }
}
</script>
<style lang="less" scoped>
.main{
  position: relative;
  width: 82%;
  height:100% ;
  background-color: #16181c;
  user-select: none;
}
</style>
