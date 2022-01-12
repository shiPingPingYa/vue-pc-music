<template>
  <div class="modal">
    <div class="modal-content">
      <div class="icon-close-container">
        <div class="back" />
        <img
          src="../../../assets/img/user/x.svg"
          alt=""
          @click.stop="__hiddenLogin"
        >
      </div>
      <div class="user-img-container">
        <img
          :src="getUserImage"
          alt
        >
      </div>
      <!-- 登录信息 -->
      <div class="main-container">
        <!-- 手机号码 -->
        <div class="form-item">
          <el-input
            v-model.trim="phone"
            placeholder="请输入账号"
            prefix-icon="el-icon-user"
            @blur="verifyPhone"
          />
          <p>{{ phoneErr }}</p>
        </div>
        <!-- 密码 -->
        <div class="form-item">
          <el-input
            v-model.trim="password"
            placeholder="请输入密码"
            type="password"
            prefix-icon="el-icon-user"
            @blur="verifyPassword"
          />
          <p>{{ passwordErr }}</p>
        </div>
        <!-- 登录 -->
        <div class="form-item">
          <input
            ref="btn"
            type="button"
            :class="{'login-btn':true,'active-btn':btnDisabled ,'disable-btn':!btnDisabled} "
            :disabled="!btnDisabled"
            value="登陆"
            @click.stop="userLogin()"
          >
        </div>
        <!-- 注册 -->
        <div
          class="other-btn"
          @click.stop="registerC()"
        >
          注册
        </div>
        <div
          class="other-btn"
          @click.stop="qrcodeClick()"
        >
          二维码登录
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { mixins } from './mixins/mixins'
import { mapMutations, mapState, mapGetters } from 'vuex'
import { _VerifyPhone } from 'api/user'
export default {
  name: 'Login',
  // mixins: [mixins],
  data () {
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
    ...mapState(['image']),
    ...mapGetters(['getUserImage']),
    btnDisabled () {
      return this.isPhone && this.isPassword
    }
  },
  methods: {
    ...mapMutations(['hiddenLogin', 'showRegister', 'showQrcode']),
    // 鼠标一聚焦验证手机号
    async verifyPhone () {
      this.isPhone = false
      const { phone } = this
      // 判断号码是否为空
      if (!phone) this.phoneErr = '手机号不能为空'
      else if (isNaN(phone)) this.phoneErr = '手机号码的格式有误,请输入数值'
      else if (phone.length !== 11) this.phoneErr = '请输入11位手机号'
      else {
        // 检测手机号是否存在
        const { data: { exist } } = await _VerifyPhone(this.phone)
        if (exist === -1) this.phoneErr = '手机号码未被注册，请注册账号后再登录'
        else {
          this.phoneErr = ''
          this.isPhone = true
        }
      }
    },
    verifyPassword () {
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
    // 隐藏登录界面
    __hiddenLogin () {
      // 清除提示信息
      this.password = ''
      this.phoneErr = ''
      this.passwordErr = ''
      this.hiddenLogin()
    },
    // 显示注册页面
    registerC () {
      this.hiddenLogin()
      this.showRegister()
    },
    // 二维码组件
    qrcodeClick () {
      this.hiddenLogin()
      this.showQrcode()
    },
    // 登录
    userLogin () {
      const { phone, password } = this
      this.$store.dispatch('__LOGIN', { phone, password })
    }
  }
}
</script>
<style lang="less" scoped>
  .form-item {
    width: 60%;
    margin: 0 auto;
    padding: 0px 0px 10px 10px;
    font-size: 13px;
    color: red;
    & .el-input {
      height: 30px;
    }
    & input {
      width: 98%;
      outline-style: none;
      height: 30px;
    }
    & p {
      margin-top: 10px;
    }
  }

  .other-btn {
    width: 40%;
    margin: 0 auto;
    line-height: 30px;
    font-size: 14px;
    text-align: center;
    color: rgb(68, 155, 226) !important;
    cursor: pointer;
  }

  .login-btn {
    width: 60%;
    height: 40px;
    border: 0;
    outline-style: none;
    border-radius: 10px;
  }

  .active-btn {
    color: #fff;
    background: red;
  }

  .disable-btn {
    color: #fff;
    background: #828384;
  }
</style>
