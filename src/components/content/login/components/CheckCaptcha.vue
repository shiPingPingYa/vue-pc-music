<template>
  <div class="modal-content">
    <div class="icon-close-container">
      <div class="back">
        <i class="el-icon-arrow-left" />
        <span @click="enterRegi()">返回</span>
      </div>
      <img
        src="../../../../assets/img/user/x.svg"
        alt=""
        @click="closeRegister"
      >
    </div>
    <div class="main-container">
      <div class="form-item">
        <el-input
          v-model="captcha"
          placeholder="请写验证码"
          prefix-icon="el-icon-key"
        />
        <el-button
          type="danger"
          :disabled="btnCaptcha"
          @click="getCaptcha()"
        >
          {{ startS }}
        </el-button>
      </div>
      <div class="form-item2">
        <el-button
          type="danger"
          size="medium"
          :disabled="btnDisabled()"
          @click="enterNickN()"
        >
          下一步
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
// 混入
import { mixins } from '../mixins/mixins'
// 导入数据接口，获取验证码
import { _getCaptcha, _getVerifyCaptcha } from 'api/user'
// 输入验证码防抖
import { debounce } from 'js/tool'
export default {
  name: 'CheckCaptcha',
  mixins: [mixins],
  data () {
    return {
      captcha: '',
      startS: '获取验证码',
      flag: 0,
      time: 60,
      exit: false,
      btnCaptcha: false,
      timer: null,
      message: ''
    }
  },
  watch: {
    // 监听验证码
    captcha (newkey) {
      if (newkey.trim().length === 4) {
        this.checkCaptcha(this)
      }
    }
  },
  methods: {
    // 退回注册页
    enterRegi () {
      this.$store.commit('hiddenCaptcha')
    },
    // 获取验证码和获取验证时间
    async getCaptcha () {
      // 第一次点击
      this.flag++
      this.btnCaptcha = true
      // 获取验证码
      try {
        await _getCaptcha(this.$store.state.phone)
        this.$message.warning('验证码已达每日最大五个上限')
        throw new Error('验证码已超过每日最大五个上限')
      } catch (e) {
        this.message = e.message.substr(10, 4)
      }
      // 验证码报错
      if (this.message.trim().length >= 1) {
        this.startS = this.message
        this.message = ''
        this.btnCaptcha = false
        return true
      }
      if (this.flag === 1) {
        this.timer = setInterval(() => {
          this.startS = `00:${this.time--}`
          if (this.time === 0) {
            clearInterval(this.timer)
            this.startS = '重新获取'
            this.btnCaptcha = false
            this.time = 60
          }
        }, 1000)
      } else if (this.flag >= 2) {
        this.timer = setInterval(() => {
          this.startS = `00:${this.time--}`
          if (this.time === 0) {
            clearInterval(this.timer)
            this.startS = '重新获取'
            this.btnCaptcha = false
            this.time = 60
          }
        }, 1000)
      }
    },
    // 验证，验证码是否输入正确
    checkCaptcha: debounce(function (e) {
      try {
        _getVerifyCaptcha(e.$store.state.phone, e.captcha.trim()).then(res => {
          console.log(res.data)
          e.exit = res.data.data
          // 存储验证码
          e.$store.commit('addCaptcha', e.captcha)
        }).catch(err => {
          console.log(err)
          e.$message.warning('验证码错误')
        })
      } catch (k) {
        console.log(k)
      }
    }, 800),
    // 是否禁用按钮
    btnDisabled () {
      if (this.captcha.trim().length === 4 && this.exit) {
        return false
      } else {
        return true
      }
    },
    // 显示呢称组件
    enterNickN () {
      this.$store.commit('showNickName')
      clearInterval(this.timer)
    }
  }
}
</script>
<style lang="less" scoped>
  .modal-content {
    background-color: #a3b2b8;
    z-index: 100;
  }

  .main-container{
   margin-top: 100px;
  }

  .form-item {
    display: flex;
    position: relative;
    width: 60%;
    margin: 0 auto;
    justify-content: space-between;
    font-size: 13px;
    color: red;
    > .el-input {
      width: 50%;
    }
    > .el-button {
      width: 46%;
    }
  }
  .form-item2 {
    width: 60%;
    margin: 20px auto;
    > .el-button {
      width: 100%;
    }
  }
</style>
