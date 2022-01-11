<template>
  <div class="main">
    <!-- 左边导航栏的路由占位符 -->
    <keep-alive include="$route.meta.keepLive">
      <router-view></router-view>
    </keep-alive>
    <!-- 登录组件 -->
    <login v-show="getLoginStatus"></login>
    <!-- 注册组件 -->
    <register v-if="isShowRegister"></register>
    <!-- 二维码组件 -->
    <qrcode v-if="isShowQrcode"></qrcode>
  </div>
</template>
<script>
// 导入登录页面
import Login from '../content/user/Login'
// 注册组件
import Register from './user/Register.vue'
import Qrcode from './user/Qrcode'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'RightMain',
  components: { Login, Register, Qrcode },
  computed: {
    ...mapGetters(['getLoginStatus']),
    ...mapState(['isShowQrcode', 'isShowRegister'])
  }
}
</script>
<style lang="less" scoped>
  .main {
    position: relative;
    width: 82%;
    height: 100%;
    color: #01060a;
    background: #f5f5f7;
    user-select: none;
  }
</style>
