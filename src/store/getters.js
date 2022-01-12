const getters = {
  getLoginStatus: state => state.isShowLogin,
  getUserRegisterInfo (state) {
    const obj = {
      phone: state.phone,
      password: state.password,
      captcha: state.captcha,
      nickname: state.nickname
    }
    return obj
  },
  // 歌单id
  getSongId: state => state.songID,
  // 获取歌单路由
  getSongListPath: state => state.songListPath,
  getAsyncShareImag: state => state.asyncShareImag,
  getUserImage: state => state.image || require('../assets/img/login.jpg'),
  isLogin: state => state.isLogin || localStorage.getItem('userId')
}

export default getters
