
export default {
  // 更新歌手
  addArtist (state, artist) {
    state.artist = artist
  },
  // 显示登录页面
  showLogin (state, isShowLogin) {
    state.isShowLogin = isShowLogin
  },
  // 隐藏登录页面
  hiddenLogin (state) {
    state.isShowLogin = false
  },
  // 显示注册页面
  showRegister (state) {
    state.isShowRegister = true
  },
  // 隐藏注册组件
  hiddenRegister (state) {
    state.isShowRegister = false
  },
  // 显示验证码组件
  showCaptcha (state) {
    state.isCaptcha = true
  },
  // 隐藏验证码组件
  hiddenCaptcha (state) {
    state.isCaptcha = false
  },
  // 显示昵称组件
  showNickName (state) { state.isNickName = true },
  // 隐藏昵称组件
  hiddenNickName (state) { state.isNickName = false },
  // 显示二维码组件
  showQrcode (state) { state.isShowQrcode = true },
  // 隐藏二维码组件
  hiddenQrcode (state) { state.isShowQrcode = false },
  // 添加用户注册手机号，密码，验证码，昵称
  addPhone (state, phone) { state.phone = phone },
  addPassword (state, password) { state.password = password },
  addCaptcha (state, captcha) { state.captcha = captcha },
  addNickName (state, nickname) { state.nickname = nickname },
  // 添加cookie
  addCookie (state, cookie) { state.cookie = cookie },
  // 清除用户登录信息
  clearUserRegisterInfo (state, flag) {
    state.phone = flag
    state.password = flag
    state.nickname = flag
    state.captcha = flag
  },
  // 添加用户信息，和cookie，uid
  async addUser (state, obj) {
    state.user = obj
    // 用户id
    state.uid = obj.uid
    // 用户背景图
    state.image = obj.avatarUrl
    // 用户名字
    state.userName = obj.nickname
    // 添加用户粉丝
    state.userFolloweds = obj.followeds
    // 添加用户性别
    state.userGender = obj.gender
    // 添加用户动态
    state.userEventCount = obj.eventCount
    // 添加用户关注
    state.userFollows = obj.follows
  },
  // 显示用户歌单
  userSongList (state, isSongList) {
    state.isSongList = isSongList
  },
  // 添加歌单路由
  addSongListPath (state, songListPath) {
    state.songListPath = songListPath
  },
  async addSongList (state, playlist) {
  // 获取用户歌单
    state.userSongList = playlist
  },
  // 设置分享内容图片的显示
  setAsyncShareImag (state, flag) {
    state.asyncShareImag = flag
  },
  // 修改用户背景图片
  setUserImage (state, img) {
    state.image = img
  },
  setIslogin (state, flag) {
    state.isLogin = flag
  }
}
