<template>
  <transition name="log">
  <div class="login">
      <!-- 登录背景 -->
      <div class="login-back">
        <div class="close" @click="hiddenLogin">
          <img src="../../../assets/img/user/x.svg" alt="">
        </div>
        <div class="back">
          <img :src="userImage()" alt />
        </div>
      </div>
      <!-- 登录信息 -->
      <div class="main">
      <form>
         <div>
         <!-- 手机号码 -->
         <div class="form-item">
             <el-input placeholder="请输入账号"  prefix-icon="el-icon-user" v-model="phone" @blur="verifyPhone"></el-input>
           <p>{{phoneMessage}} </p>
         </div>
         <!-- 密码 -->
          <div class="form-item" >
            <el-input placeholder="请输入密码" type="password"  prefix-icon="el-icon-user" v-model="password" @blur="verifyPassword" ></el-input>
           <p>{{passwordMessage}} </p>
         </div>
        <!-- 登录 -->
         <div class="form-item" >
          <input ref="btn" @click="userLogin()" type="button" :disabled="!btnDisabled()" value="登陆" :class="{'btn-login':btnDisabled(),'disabled-btn':!btnDisabled()}" >
         </div>
         <!-- 注册 -->
          <div class="form-item">
            <div class="register" @click="registerC()">注册</div>
         </div>
         <div class="form-item" @click="qrcodeClick()">
         <span>二维码登录</span>
         </div>
       </div>
      </form>
      </div>
  </div>
  </transition>
</template>
<script>
import { mixins } from './mixins'
export default {
  name: 'Login',
  mixins: [mixins],
  methods: {
    // 隐藏登录界面
    hiddenLogin () {
      // 清除提示信息
      this.password = ''
      this.phoneMessage = ''
      this.passwordMessage = ''
      this.$store.commit('hiddenLogin')
    },
    // 显示注册页面
    registerC () {
      // 隐藏登录页
      this.$store.commit('hiddenLogin')
      this.$store.commit('showRegister')
    },
    // 二维码组件
    qrcodeClick () {
      // 关闭注册组件
      this.$store.commit('hiddenLogin')
      this.$store.commit('showQrcode')
    }

  }
}
</script>
<style lang="less" scoped>
.login{
  position: absolute;
  width: 400px;
  height: 380px;
  margin: auto;
  top: 50%;
  z-index: 10;
  transform: translate(80%,-50%);
  background-color: #a3b2b8;
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
    height: 320px;
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
      > .el-input{
        height: 30px;
      }
      > input{
        width: 98%;
        outline-style: none;
        height: 30px;
      }
      > p{
        margin-top: 10px;
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
      > span{
        display: inline-block;
        width: 46%;
        margin: 10px 2%;
        font-size: 14px;
        color: rgb(68, 155, 226);
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

.log-enter,
.log-leave-to{
  opacity: 0;
}

.log-enter-active,
.log-leave-active{
  transition: all 2s ease;
}
</style>
