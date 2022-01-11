<template>

  <div class="modal">
    <div class="modal-content">
      <div class="icon-close-container">
        <div class="back"></div>
        <img src="../../../assets/img/user/x.svg" alt="" @click.stop="__hiddenLogin" />
      </div>
      <div class="user-img-container">
        <img :src="userImage()" alt />
      </div>
      <!-- 登录信息 -->
      <div class="main-container">
        <form>
          <div>
            <!-- 手机号码 -->
            <div class="form-item">
              <el-input placeholder="请输入账号" prefix-icon="el-icon-user" v-model="phone" @blur="verifyPhone"></el-input>
              <p>{{ phoneMessage }}</p>
            </div>
            <!-- 密码 -->
            <div class="form-item">
              <el-input placeholder="请输入密码" type="password" prefix-icon="el-icon-user" v-model="password" @blur="verifyPassword"></el-input>
              <p>{{ passwordMessage }}</p>
            </div>
            <!-- 登录 -->
            <div class="form-item">
              <input ref="btn" @click.stop="userLogin()" type="button" :disabled="!btnDisabled()" value="登陆" :class="{
                  'btn-login': btnDisabled(),
                  'disabled-btn': !btnDisabled()
                }" />
            </div>
            <!-- 注册 -->
            <div class="form-item">
              <div class="register" @click.stop="registerC()">注册</div>
            </div>
            <div class="form-item" @click.stop="qrcodeClick()">
              <span>二维码登录</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mixins } from './mixins/mixins'
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  mixins: [mixins],
  methods: {
    ...mapMutations(['hiddenLogin', 'showRegister', 'showQrcode']),
    // 隐藏登录界面
    __hiddenLogin () {
      // 清除提示信息
      this.password = ''
      this.phoneMessage = ''
      this.passwordMessage = ''
      this.hiddenLogin()
    },
    // 显示注册页面
    registerC () {
      // 隐藏登录页
      this.hiddenLogin()
      this.showRegister()
    },
    // 二维码组件
    qrcodeClick () {
      // 关闭注册组件
      this.hiddenLogin()
      this.showQrcode()
    },
    // 登录
    userLogin () {
      const data = { phone: this.phone, password: this.password }
      this.$store.dispatch('__LOGIN', data)
    }
  }
}
</script>
<style lang="less" scoped>
  .form-item {
    position: relative;
    width: 60%;
    margin: 0 auto;
    padding: 0px 0px 10px 10px;
    font-size: 13px;
    color: red;
    > .el-input {
      height: 30px;
    }
    > input {
      width: 98%;
      outline-style: none;
      height: 30px;
    }
    > p {
      margin-top: 10px;
    }
    .register {
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
    > span {
      display: inline-block;
      width: 46%;
      margin: 10px 2%;
      font-size: 14px;
      color: rgb(68, 155, 226);
      cursor: pointer;
    }
  }

  .disabled-btn {
    width: 60% !important;
    height: 40px;
    border: 0;
    outline-style: none;
    background: #828384;
    color: #fff;
    border-radius: 10px;
    cursor: pointer;
  }

  .btn-login {
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
