<template>
  <div ref="register" class="modal">
    <div class="modal-content">
      <div class="icon-close-container">
        <div class="back" />
        <img src="../../../assets/img/user/x.svg" alt="" @click="closeRegister()">
      </div>
      <div class="user-img-container">
        <img src="../../../assets/img/user/phone.svg" alt="">
      </div>
      <!-- 输入框 -->
      <div class="main-container">
        <div class="form-item">
          <el-input v-model="phone" placeholder="请输入手机号" prefix-icon="el-icon-user" @blur="verifyPhone" />
          <p>{{ phoneErr }}</p>
        </div>
        <div class="form-item">
          <el-input v-model="password" placeholder="请输入密码8到18位" type="password" prefix-icon="el-icon-lock" @blur="verifyPassword" />
          <p>{{ passwordErr }}</p>
        </div>
        <div class="form-item">
          <div class="user-register">
            <el-button type="danger" :disabled="btnDisabled" @click="enterCaptcha()">
              注册
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade-in-linear">
      <!-- 验证码验证 -->
      <check-captcha v-show="isCaptcha" ref="check_captcha" />
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
import { mapState } from 'vuex'
import { _VerifyPhone } from 'api/user'
export default {
  name: 'Register',
  components: { CheckCaptcha, NickName },
  data() {
    return {
      isPhone: false,
      isPassword: false,
      phoneErr: '',
      passwordErr: '',
      phone: '',
      password: '',
      passwordExec: /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{8,18}$/
    }
  },
  computed: {
    ...mapState(['isCaptcha', 'isNickName']),
    btnDisabled() {
      return !(this.isPhone && this.isPassword)
    }
  },
  watch: {
    phone(newkey) {
      if (newkey.trim().length >= 11) {
        this.$refs.check_captcha.flag = 0
        clearInterval(this.$refs.check_captcha.timer)
      }
    }
  },
  methods: {
    closeRegister() {
      // 销毁注册，验证码，昵称页面
      this.$store.commit('hiddenRegister')
      this.$store.commit('hiddenCaptcha')
      this.$store.commit('hiddenNickName')
      // 清除添加的手机号，密码，验证码
      this.$store.commit('clearUserRegisterInfo', '')
    },
    // 鼠标一聚焦验证手机号
    async verifyPhone() {
      this.isPhone = false
      const { phone } = this
      // 判断号码是否为空
      if (!phone) this.phoneErr = '手机号不能为空'
      else if (isNaN(phone)) this.phoneErr = '手机号码的格式有误,请输入数值'
      else if (phone.length !== 11) this.phoneErr = '请输入11位手机号'
      else {
        // 检测手机号是否已经被注册过了
        const {
          data: { exist }
        } = await _VerifyPhone(this.phone)
        if (exist !== -1) this.phoneErr = '该手机号已被注册了，请直接登录!!!'
        else {
          this.phoneErr = ''
          this.isPhone = true
        }
      }
    },
    verifyPassword() {
      this.isPassword = false
      const { password } = this
      // 判断密码 是否为空
      if (!password) this.passwordErr = '密码不能为空'
      else if (!this.passwordExec.test(password)) this.passwordErr = '密码格式有误'
      else {
        this.passwordErr = ''
        this.isPassword = true
      }
    },
    // 存储注册账号和密码，去往获取验证码页面校验手机号
    enterCaptcha() {
      this.$store.commit('addPhone', this.phone)
      this.$store.commit('addPassword', this.password)
      this.$store.commit('showCaptcha')
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
