<template>
<transition name="nick">
 <div class="nick-name">
 <div class="nick-back">
      <!-- 上面图标区域 -->
      <div class="close">
        <div class="returnR" >
          <i class="el-icon-arrow-left"></i>
           <span @click="enterCheC()">返回</span>
        </div>
        <div class="closeReg" @click="closeRegister">
            <img src="../../../assets/img/user/x.svg" alt="">
        </div>
      </div>
      <!-- 图片背景 -->
      <div class="back">
      <img src="../../../assets/img/user/phone.svg" alt="">
      </div>
    </div>
    <div class="main">
      <div class="form-item">
         <el-input placeholder="请输入呢称"  prefix-icon="el-icon-s-custom" v-model="nickName">
         </el-input>
      </div>
      <div class="form-item">
       <el-button type="danger" :disabled="btnNickN" @click="nickNC()">立即注册</el-button>
      </div>
    </div>
  </div>
</transition>

</template>
<script>
import { mixins } from './mixins'
// 导入数据接口
import { _registerPhone } from '../../../network/user'
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
      try {
        await _registerPhone(this.$store.getters.getUserRegisterInfo).then(res => {
          this.$message.success('账号注册成功')
        }).catch(err => {
          console.log(err)
        })
        throw new Error('注册失败')
      } catch (e) {
        this.$$message.warning('注册失败')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.nick-name{
  position: absolute;
  width: 400px ;
  height: 360px;
  margin: auto;
  top: 0;
  left: 0;
  z-index: 102;
  background-color: #dddddd;
  > .nick-back{
    position: relative;
    width: 100%;
    height: 160px;
    text-align: center;
    > .close{
      display: flex;
      width: 100%;
      height: 26px;
      padding: 8px 10px ;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      > .returnR{
        font-size: 14px;
      }
      > .closeReg{
        width: 18px;
        height: 18px;
        img{
          width: 100%;
          height: 100%;
          background-size: 100%,100%;
        }
      }
    }
    > .back{
      position: absolute;
      width: 100%;
      height: 88px;
      top: 40px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 50%;
      p{
        margin: 6px 0;
      }
      img{
         width: 88px;
         height: 88px;
        background-size: 100%,100%;
      }
    }
  }
  > .main{
  width: 100%;
  height: 200px;
  .form-item{
  display: flex;
  position: relative;
  width: 60%;
  margin: 20px auto;
  justify-content: space-between;
  font-size: 13px;
  color: red;
  > .el-button{
    display: block;
    width: 80%;
    margin: 0 auto;
  }
  }
}
}

.nick-enter-active,
.nick-leave-active{
  transition: all 2s ease;
}

.nick-enter,
.nick-leave-to{
  opacity: 0;
}
</style>
