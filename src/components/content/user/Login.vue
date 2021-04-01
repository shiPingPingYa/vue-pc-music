<template>
  <div class="login">
      <!-- 登录背景 -->
      <div class="login-back">
        <div class="close" @click="hiddenLogin">
          <img src="../../../assets/img/user/x.svg" alt="">
        </div>
        <div class="back">
          <img src="../../../assets/img/login.jpg" alt />
        </div>
      </div>
      <!-- 登录信息 -->
      <div class="main">
       <div>
         <!-- 手机号码 -->
         <div class="form-item">
           <input type="text" @blur="verifyPhone" v-model="phone"   placeholder="请输入手机号码">
           <p>{{phoneMessage}} </p>
         </div>
         <!-- 密码 -->
          <div class="form-item" >
           <input type="password" @blur="verifyPassword"  v-model="password" placeholder="请输入密码">
           <p>{{passwordMessage}} </p>
         </div>
        <!-- 登录 -->
         <div class="form-item" >
          <input ref="btn" @click="userLogin()" type="button" :disabled="!(isPhone && isPassword)" value="登陆" :class="{'btn-login':isPhone&&isPassword,'disabled-btn':!(isPhone && isPassword)}" >
         </div>
         <!-- 注册 -->
          <div class="form-item">
            <div class="register">注册</div>
         </div>
       </div>
      </div>
  </div>
</template>
<script>
// 导入数据请求
import { _login, _VerifyPhone } from '../../../network/user'
export default {
  name: 'Login',
  data () {
    return {
      isPhone: false,
      isPassword: false,
      phone: '',
      phoneMessage: '',
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
        if (this.phoneExec.exec(this.phone) === null) {
          this.phoneMessage = '手机号码的格式有误'
        } else {
          // 检测手机号是否存在
          _VerifyPhone(this.phone).then(res => {
            if (res.data.exist === -1) {
              this.phone = '手机号码未被注册'
            } else {
              this.phoneMessage = ''
              this.isPhone = true
            }
          })
        }
      }
    },
    verifyPassword () {
      // 判断密码是否为空
      if (this.password === '') {
        this.passwordMessage = '密码不能为空'
      } else {
        // 验证密码是否符合格式
        if (this.passwordExec.exec(this.password) === null) {
          this.passwordMessage = '密码格式有误'
        } else {
          this.passwordMessage = ''
          this.isPassword = true
        }
      }
    },
    // 隐藏登录界面
    hiddenLogin () {
      this.$store.commit('hiddenLogin')
    },
    // 登录
    userLogin () {
      _login(this.phone, this.password).then(res => {
        if (res.data.code !== 200) {
          this.passwordMessage = '密码错误'
        } else {
          // 获取响应数据(cookie，uname,image,uid)
          const obj = {
            uid: res.data.profile.userId,
            cookie: res.data.cookie,
            nickname: res.data.profile.nickname,
            image: res.data.profile.avatarUrl
          }
          window.localStorage.setItem('obj', JSON.stringify(obj))
          this.$store.commit('addUser', obj)
          // 隐藏登录页面
          this.hiddenLogin()
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login{
  position: absolute;
  width: 400px;
  height: 460px;
  left: -16%;
  top: 16%;
  margin: auto;
  z-index: 10;
  transform: translateX(50%);
  background-color: #dddddd;
  > .login-back{
    position: relative;
    width: 100%;
    height: 160px;
    > .close{
      position: absolute;
      width: 26px;
      height: 26px;
      right: 8px;
      top: 6px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        background-size: 100%,100%;
      }
    }
    > .back{
      position: absolute;
      width: 88px;
      height: 88px;
      top: 60px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 50%;
      img{
        width: 100%;
        height: 100%;
        background-size: 100%,100%;
        border-radius: 50%;
      }
    }
  }
  > .main{
    width: 100%;
    height: 300px;
    text-align: center;
  }
}

.form-item{
      position: relative;
      width: 60%;
      margin: 0 auto;
      padding: 0px 0px 10px 10px;
      font-size: 13px;
      color: red;
      > input{
        width: 98%;
        outline-style: none;
        height: 30px;
      }
      > p{
        margin-top: 6px;
      }
      .register{
        position: absolute;
        margin-left: 50%;
        width: 60%;
        height: 30px;
        font-size: 14px;
        text-align: center;
        color: rgb(68, 155, 226);
        transform: translateX(-50%);
        border-radius: 8px;
        cursor: pointer;
      }
}

.disabled-btn{
  width: 60% !important;
  height: 40px;
  border: 0;
  outline-style: none;
  background: #828384;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
}

.btn-login{
  width: 60% !important;
  height: 40px;
  border: 0;
  outline-style: none;
  background: red;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
}

</style>
