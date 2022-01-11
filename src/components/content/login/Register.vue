<template>
  <div
    ref="register"
    class="modal"
  >
    <div class="modal-content">
      <div class="icon-close-container">
        <div class="back" />
        <img
          src="../../../assets/img/user/x.svg"
          alt=""
          @click="closeRegister()"
        >
      </div>
      <div class="user-img-container">
        <img
          src="../../../assets/img/user/phone.svg"
          alt=""
        >
      </div>
      <!-- 输入框 -->
      <div class="main-container">
        <div class="form-item">
          <el-input
            v-model="phone"
            placeholder="请输入手机号"
            prefix-icon="el-icon-user"
            @blur="verifyPhone2"
          />
          <p>{{ phoneMessage }}</p>
        </div>
        <div class="form-item">
          <el-input
            v-model="password"
            placeholder="请输入密码8到18位"
            type="password"
            prefix-icon="el-icon-lock"
            @blur="verifyPassword"
          />
          <p>{{ passwordMessage }}</p>
        </div>
        <div class="form-item">
          <div class="user-register">
            <el-button
              type="danger"
              :disabled="!btnDisabled()"
              @click="enterCaptcha()"
            >
              注册
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade-in-linear">
      <!-- 验证码验证 -->
      <check-captcha
        v-show="isCaptcha"
        ref="check_captcha"
      />
    </transition>
    <transition name="fade-in-linear">
      <!-- 昵称 -->
      <nick-name v-show="isNickName" />
    </transition>
  </div>
</template>
<script>
// 导入验证码组件
import CheckCaptcha from './components/CheckCaptcha'
// 昵称组件
import NickName from './components/NickName'
// 导入二维码组件
// 导入混入
import { mixins } from './mixins/mixins'
import { mapState } from 'vuex'
export default {
  name: 'Register',
  components: { CheckCaptcha, NickName },
  mixins: [mixins],
  computed: { ...mapState(['isCaptcha', 'isNickName']) },
  watch: {
    phone (newkey) {
      if (newkey.trim().length >= 11) {
        this.$refs.check_captcha.flag = 0
        clearInterval(this.$refs.check_captcha.timer)
      }
    }
  }

}
</script>
<style lang="less" scoped>
  .form-item {
    width: 60%;
    margin: 0 auto;
    font-size: 13px;
    color: red;
    & .user-register {
      & .el-button {
        width: 60% !important;
      }
    }
    p {
      margin-top: 10px;
    }
  }
</style>
