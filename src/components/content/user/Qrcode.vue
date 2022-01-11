<template>
  <transition name="fade-in-linear">
    <div class="qrcode">
      <div class="close" @click="qrcodeClose()">
        <img src="../../../assets/img/user/x.svg" alt="" />
      </div>
      <!-- 二维码 -->
      <div class="qrcode-back">
        <img :src="qrImage" alt="" />
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
      qrImage: null, // 二维码图片
      status: '',
      timer: null // 定时器，
    }
  },
  mounted () {
    this.getQrcode()
    this.$on('hook:destroyed', () => clearTimeout(this.timer))
  },
  methods: {
    qrcodeClose () {
      this.$store.commit('hiddenQrcode')
    },
    // 获取二维码
    async getQrcode () {
      // 获取二维码的key，进而通过key获取二维码图片
      const { data: { code, data: { unikey } } } = await _getQrcodeKey()
      if (code === 200) {
        const { data: { data: { qrimg } } } = await _getQrcodeImg(unikey)
        this.qrKey = unikey
        this.qrImage = qrimg
        this.startCheckScan()
      }
    },
    startCheckScan () {
      clearTimeout(this.timer)
      this.timer = setTimeout(this.checkScan, 4000)
    },
    async checkScan () {
      const codeList = [800, 803]
      const { data: { code, cookie } } = await _getCheckQrcode(this.qrKey)
      if (!codeList.includes(code)) return this.startCheckScan() // 等待扫码和待确认重新获取二维码扫描状态
      // code状态800过期，801等待扫码，8002待确认，8003授权成功并返回cookie
      if (code === 800) {
        this.$message.warning('二维码已过期，请点击重新获取二维码')
      } else if (code === 803) {
        this.$message.warning('登录成功')
        // 根据返回的cookie获取用户信息
        const { data: { data } } = await _getLonginStatus({ cookie: cookie, timestamp: Date.now() })
        const obj = {
          uid: data.profile.userId,
          cookie: this.$store.state.cookie,
          nickname: data.profile.nickname,
          image: data.profile.avatarUrl
        }
        window.localStorage.setItem('userId', JSON.stringify(obj.uid)) // 通过webstorag来存储用户ID,以便下次根据id获取
        this.$store.commit('addUser', obj) // 存储用户信息
        this.$store.commit('addCookie', cookie) // 设置cookie
        this.qrcodeClose()
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .qrcode {
    position: absolute;
    width: 400px;
    height: 360px;
    top: 50%;
    z-index: 103;
    transform: translate(80%, -50%);
    background-color: #a3b2b8;
    > .close {
      width: 18px;
      height: 18px;
      position: absolute;
      right: 8px;
      top: 8px;
      img {
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
    > .qrcode-back {
      width: 180px;
      height: 180px;
      margin: 25% auto 0 auto;
    }
    > .reload-qrcode {
      width: 100%;
      height: 40px;
      margin-top: 20px;
      text-align: center;
    }
  }
</style>
