<template>
  <div class="main">
    <keep-alive include="$route.meta.keepLive">
      <router-view />
    </keep-alive>
    <transition name="fade-in-linear">
      <login v-if="getLoginStatus" />
    </transition>
    <transition name="fade-in-linear">
      <register v-if="isShowRegister" />
    </transition>
    <transition name="fade-in-linear">
      <qrcode v-if="isShowQrcode" />
    </transition>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import Login from '@/views/login/Login';
import Register from '@/views/login/Register';
import Qrcode from '@/views/login/Qrcode';
export default {
  name: 'RightMain',
  components: { Login, Register, Qrcode },
  computed: {
    ...mapGetters(['getLoginStatus']),
    ...mapState(['isShowQrcode', 'isShowRegister']),
  },
};
</script>
<style lang="less" scoped>
  .main {
    position: relative;
    width: calc(100% - 68px);
    height: 100%;
    color: #01060a;
    background: #f5f5f7;
    user-select: none;
  }
</style>
