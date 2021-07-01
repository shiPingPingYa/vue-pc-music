export default {
  getLoginStatus (state) {
    return state.isShowLogin
  },
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
  getSongId (state) {
    return state.songID
  },
  // 获取歌单路由
  getSongListPath (state) {
    return state.songListPath
  }
}
