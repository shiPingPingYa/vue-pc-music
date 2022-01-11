<template>
  <div class="modal-content">
    <div class="icon-close-container">
      <div class="back">
        <i class="el-icon-arrow-left" />
        <span @click="enterCheC()">返回</span>
      </div>
      <img
        src="../../../../assets/img/user/x.svg"
        alt=""
        @click="closeRegister"
      >
    </div>
    <div class="user-img-container">
      <img
        src="../../../../assets/img/user/phone.svg"
        alt=""
      >
    </div>
    <div class="main-container">
      <div class="form-item">
        <el-input
          v-model="nickName"
          placeholder="请输入呢称"
          prefix-icon="el-icon-s-custom"
        />
      </div>
      <div class="form-item">
        <el-button
          type="danger"
          :disabled="btnNickN"
          @click="nickNC()"
        >
          立即注册
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mixins } from '../mixins/mixins'
// 导入数据接口
import { _registerPhone } from 'api/user'
export default {
  name: 'NickName',
  mixins: [mixins],
  data () {
    return {
      nickName: '',
      btnNickN: true
    }
  },
  watch: {
    nickName (newkey) {
      if (newkey.trim().length >= 4) {
        this.btnNickN = false
        this.$store.commit('addNickName', this.nickName.trim())
      }
    }
  },
  methods: {
    // 回退到验证码
    enterCheC () {
      this.$store.commit('hiddenNickName')
    },
    // 确认注册
    async nickNC () {
      // 隐藏注册，验证码，昵称页面
      this.closeRegister()
      try {
        console.log(this.$store.state.phone)
        await _registerPhone(this.$store.getters.getUserRegisterInfo).then(res => {
          this.$message.success('账号注册成功')
        }).catch(err => {
          console.log(err)
          this.$message.warning('注册失败')
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .modal-content {
    background-color: #a3b2b8;
    z-index: 100;
  }
  .form-item {
    display: flex;
    position: relative;
    width: 60%;
    margin: 20px auto;
    justify-content: space-between;
    font-size: 13px;
    color: red;
    > .el-button {
      display: block;
      width: 80%;
      margin: 0 auto;
    }
  }
</style>
