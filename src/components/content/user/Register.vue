<template>
<transition name="reg">
<div class="register" ref="register">
  <!-- 登录背景 -->
  <div class="register-back">
    <div class="close" @click="closeRegister()">
      <img src="../../../assets/img/user/x.svg" alt="">
    </div>
    <!-- 图片 -->
    <div class="back">
      <img src="../../../assets/img/user/phone.svg" alt="">
    </div>
  </div>
  <!-- 输入框 -->
  <div class="main">
    <div>
      <div class="form-item">
          <el-input placeholder="请输入手机号" @blur="verifyPhone2" v-model="phone"  prefix-icon="el-icon-user"></el-input>
          <p>{{phoneMessage}}</p>
      </div>
      <div class="form-item">
          <el-input placeholder="请输入密码8到18位" @blur="verifyPassword" v-model="password" type="password"  prefix-icon="el-icon-lock"></el-input>
           <p>{{passwordMessage}}</p>
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
.register{
  position: absolute;
  width: 400px ;
  height: 360px;
  top: 50%;
  z-index: 10;
  transform: translate(80%,-50%);
  background-color: #a3b2b8;
  > .register-back{
    position: relative;
    width: 100%;
    height: 160px;
    > .close{
      position: absolute;
      widows: 18px;
      height: 18px;
      top: 8px;
      right: 8px;
      cursor: pointer;
      img{
        widows: 100%;
        height: 100%;
        box-sizing: 100%,100%;
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
      }
    }
  }
  > .main{
  width: 100%;
  height: 200px;
  text-align: center;
  }
}

.form-item{
  position: relative;
  width: 60%;
  margin: 0 auto;
  font-size: 13px;
  color: red;
  > .user-register{
      > .el-button{
        width: 60% !important;
      }
  }
  p{
    margin-top: 6px;
  }
}

.reg-enter-active,
.reg-leave-active{
  transition: all 2s ease;
}

.reg-enter,
.reg-leave-to{
  opacity: 0;
}
</style>
