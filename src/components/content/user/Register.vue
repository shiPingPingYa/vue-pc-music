<template>
  <transition name="fade-in-linear">
    <div class="modal" ref="register">
      <div class="modal-content">
        <div class="icon-close-container">
          <div class="back"></div>
          <img src="../../../assets/img/user/x.svg" alt="" @click="closeRegister()" />
        </div>
        <div class="user-img-container">
          <img src="../../../assets/img/user/phone.svg" alt="" />
        </div>
        <!-- 输入框 -->
        <div class="main-container">
          <div>
            <div class="form-item">
              <el-input placeholder="请输入手机号" @blur="verifyPhone2" v-model="phone" prefix-icon="el-icon-user"></el-input>
              <p>{{ phoneMessage }}</p>
            </div>
            <div class="form-item">
              <el-input placeholder="请输入密码8到18位" @blur="verifyPassword" v-model="password" type="password" prefix-icon="el-icon-lock"></el-input>
              <p>{{ passwordMessage }}</p>
            </div>
            <div class="form-item">
              <div class="user-register">
                <el-button type="danger" :disabled="!btnDisabled()" @click="enterCaptcha()">注册</el-button>
              </div>
            </div>
          </div>
        </div>
        <!-- 验证码验证 -->
        <check-captcha ref="check_captcha" v-show="$store.state.isCaptcha"></check-captcha>
        <!-- 昵称 -->
        <nick-name v-show="$store.state.isNickName"></nick-name>
      </div>
    </div>
  </transition>
</template>
<script>
// 导入验证码组件
import CheckCaptcha from './CheckCaptcha'
// 昵称组件
import NickName from './NickName'
// 导入二维码组件
// 导入混入
import { mixins } from './mixins'
export default {
  name: 'Register',
  components: { CheckCaptcha, NickName },
  watch: {
    phone (newkey) {
      if (newkey.trim().length >= 11) {
        this.$refs.check_captcha.flag = 0
        clearInterval(this.$refs.check_captcha.timer)
      }
    }
  },
  mixins: [mixins]
}
</script>
<style lang="less" scoped>
  .form-item {
    position: relative;
    width: 60%;
    margin: 0 auto;
    font-size: 13px;
    color: red;
    > .user-register {
      > .el-button {
        width: 60% !important;
      }
    }
    p {
      margin-top: 6px;
    }
  }
</style>
