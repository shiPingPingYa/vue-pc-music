// 导入数据请求
import { _VerifyPhone } from '../../../network/user'

export const mixins = {
  data () {
    return {
      isPhone: false,
      isPassword: false,
      phone: '',
      phoneMessage: '',
      phoneMessage1: '',
      password: '',
      passwordMessage: '',
      // 手机号的正则验证
      phoneExec: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      // 密码验证
      passwordExec: /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{8,18}$/
    }
  },
  methods: {
    // 鼠标一聚焦验证手机号
    verifyPhone () {
      // 判断号码是否为空
      if (this.phone.trim().length <= 0) {
        this.phoneMessage = '手机号不能为空'
      } else {
        // 验证手机号格式是否正确
        if (!this.phoneExec.test(this.phone)) {
          this.phoneMessage = '手机号码的格式有误'
        } else {
          // 检测手机号是否存在
          _VerifyPhone(this.phone).then(res => {
            if (res.data.exist === -1) {
              this.phoneMessage = '手机号码未被注册'
            } else {
              this.phoneMessage = ''
              this.isPhone = true
            }
          })
        }
      }
    },
    // 验证手机号注册
    verifyPhone2 () {
      // 判断号码是否为空
      if (this.phone.trim().length <= 0) {
        this.phoneMessage = '手机号不能为空'
      } else {
        // 验证手机号格式是否正确
        if (!this.phoneExec.test(this.phone)) {
          this.phoneMessage = '手机号码的格式有误'
        } else {
          // 检测手机号是否存在
          _VerifyPhone(this.phone).then(res => {
            if (res.data.exist === -1) {
              this.phoneMessage = ''
              this.isPhone = true
            } else {
              this.phoneMessage = '手机号已经被注册过了'
            }
          })
        }
      }
    },
    verifyPassword () {
      // 判断密码是否为空
      if (this.password.trim().length <= 0) {
        this.passwordMessage = '密码不能为空'
      } else {
        // 验证密码是否符合格式
        if (!this.passwordExec.test(this.password)) {
          this.passwordMessage = '密码格式有误'
        } else {
          this.passwordMessage = ''
          this.isPassword = true
        }
      }
    },
    // 判断是否禁用按钮
    btnDisabled () {
      return (this.isPhone && this.isPassword)
    },
    // 显示登录背景图
    userImage () {
      return (this.$store.state.uid !== null) ? this.$store.state.image : 'img/login.128c56ca.jpg'
    },
    // 显示验证码,并存储手机号和密码
    enterCaptcha () {
      this.$store.commit('addPhone', this.phone)
      this.$store.commit('addPassword', this.password)
      this.$store.commit('showCaptcha')
    },
    // 关闭注册页面
    closeRegister () {
      // 销毁注册，验证码，昵称页面
      this.$store.commit('hiddenRegister')
      this.$store.commit('hiddenCaptcha')
      this.$store.commit('hiddenNickName')
      // 清除添加的手机号，密码，验证码
      this.$store.commit('clearUserRegisterInfo', '')
    }

  }
}
