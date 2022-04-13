<template>
  <div class="modal">
    <div class="modal-content">
      <div class="icon-close-container">
        <div class="back" />
        <img src="../../../assets/img/user/x.svg" alt="" @click="qrcodeClose()">
      </div>
      <div class="qr-code">
        <img :src="qrImage" alt="">
      </div>
      <!-- 重新获取二维码 -->
      <div class="reload-qrcode">
        <el-button type="primary" @click="getQrcode()">
          重新获取二维码
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
// 调用二维码接口
import { _getQrcodeImg, _getQrcodeKey, _getCheckQrcode, _getLonginStatus } from 'api/user'
export default {
  name: 'Qrcode',
  data() {
    return {
      // 二维码key
      qrKey: null,
      qrImage: null, // 二维码图片
      status: '',
      timer: null // 定时器，
    }
  },
  mounted() {
    this.getQrcode()
    this.$on('hook:destroyed', () => clearTimeout(this.timer))
  },
  methods: {
    qrcodeClose() {
      this.$store.commit('hiddenQrcode')
    },
    // 获取二维码
    async getQrcode() {
      // 获取二维码的key，进而通过key获取二维码图片
      const {
        data: {
          code,
          data: { unikey }
        }
      } = await _getQrcodeKey()
      if (code === 200) {
        const {
          data: {
            data: { qrimg }
          }
        } = await _getQrcodeImg(unikey)
        this.qrKey = unikey
        this.qrImage = qrimg
        this.startCheckScan()
      }
    },
    startCheckScan() {
      clearTimeout(this.timer)
      this.timer = setTimeout(this.checkScan, 4000)
    },
    async checkScan() {
      const codeList = [800, 803]
      const {
        data: { code, cookie }
      } = await _getCheckQrcode(this.qrKey)
      if (!codeList.includes(code)) return this.startCheckScan() // 等待扫码和待确认重新获取二维码扫描状态
      // code状态800过期，801等待扫码，8002待确认，8003授权成功并返回cookie
      if (code === 800) {
        this.$message.warning('二维码已过期，请点击重新获取二维码')
      } else if (code === 803) {
        this.$message.warning('登录成功')
        // 根据返回的cookie获取用户信息
        const {
          data: { data }
        } = await _getLonginStatus({ cookie: cookie, timestamp: Date.now() })
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
  .qr-code {
    width: 100%;
    height: 180px;
    margin-top: 40px;
    text-align: center;
    & img {
      width: 180px;
      height: 180px;
    }
  }
  .reload-qrcode {
    width: 100%;
    height: 40px;
    margin-top: 20px;
    text-align: center;
  }
</style>
