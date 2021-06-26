<template>
  <transition name="qrc">
  <div class="qrcode">
    <div class="close" @click="qrcodeClose()">
      <img src="../../../assets/img/user/x.svg" alt="">
    </div>
      <!-- 二维码 -->
    <div class="qrcode-back">
      <img :src="qrImage" alt="">
    </div>
    <!-- 重新获取二维码 -->
    <div class="reload-qrcode">
      <el-button type="primary" @click="getQrcode()">重新获取二维码</el-button>
    </div>
  </div>
  </transition>
</template>
<script>
// 调用二维码接口
import { _getQrcodeImg, _getQrcodeKey, _getCheckQrcode, _getLonginStatus } from '../../../network/user'
export default {
  name: 'Qrcode',
  data () {
    return {
      // 二维码key
      qrKey: null,
      // 二维码图片
      qrImage: null,
      status: '',
      timer: null
    }
  },
  created () {
    this.getQrcode()
    clearInterval(this.timer)
  },
  methods: {
    // 关闭二维码组件
    qrcodeClose () {
      // 清除一下定时器
      clearInterval(this.timer)
      this.$store.commit('hiddenQrcode')
    },
    // 获取二维码
    async getQrcode () {
      clearInterval(this.timer)
      // 获取二维码的key
      await _getQrcodeKey().then(res => {
        this.qrKey = res.data.data.unikey
        return res.data.data.unikey
      }).then(async res => {
      // 根据生成的key，获取图片
        await _getQrcodeImg(res).then(res => { this.qrImage = res.data.data.qrimg })
      })
      // 定时判断是否登录
      this.timer = setInterval(async () => {
        await _getCheckQrcode(this.qrKey).then(res => {
          // 获取code字段
          this.status = res.data.code
          // 获取cookie
          if (res.data.cookit !== null) { this.$store.commit('addCookie', res.data.cookie) }
        })
        if (this.status === 800) {
          // 清除定时器
          clearInterval(this.timer)
          this.$message.warning('二维码已经过期，请重新获取')
        } else if (this.status === 803) {
          clearInterval(this.timer)
          this.$message.warning('登录成功')
          // 根据获取的cookie,获取用户信息
          _getLonginStatus(this.$store.state.cookie).then(res => {
            const obj = {
              uid: res.data.data.profile.userId,
              cookie: this.$store.state.cookie,
              nickname: res.data.data.profile.nickname,
              image: res.data.data.profile.avatarUrl
            }
            // 通过webstorag来存储用户信息,以便下次能自动登录
            window.localStorage.setItem('obj', JSON.stringify(obj))
            // 通过vuex来存储数据，获取歌单
            this.$store.commit('addUser', obj)
          })
          // 销毁二维码页面
          this.$store.commit('hiddenQrcode')
        }
      }, 4000)
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>
<style lang="less" scoped>
.qrcode{
  position: absolute;
  width: 400px ;
  height: 360px;
  top: 50%;
  z-index: 103;
  transform: translate(80%,-50%);
  background-color: #a3b2b8;
  > .close{
    width: 18px;
    height: 18px;
    position: absolute;
    right: 8px;
    top: 8px;
    img{
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
  > .qrcode-back{
    width: 180px;
    height: 180px;
    margin: 25% auto 0 auto;
  }
  > .reload-qrcode{
    width: 100%;
    height: 40px;
    margin-top: 20px;
    text-align: center;
  }
}

.qrc-enter-active,
.qrc-leave-active{
  transition: all 2s ease;
}

.qrc-enter,
.qrc-leave-to{
  opacity: 0;
}
</style>
