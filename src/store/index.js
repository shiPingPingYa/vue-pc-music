import Vue from 'vue'
import Vuex from 'vuex'
// 导入获取歌单请求
import { _getSongList } from '../network/user'
Vue.use(Vuex)

const state = {
  // 是否显示登录页面
  isShowLogin: false,
  // 是否显示注册组件
  isShowRegister: false,
  // 是否显示验证码组件
  isCaptcha: false,
  // 是否显示呢称组件
  isNickName: false,
  // 用户名
  user: null,
  // 用户id
  uid: null,
  // 登录用户昵称
  nickname: '',
  // 注册手机号
  phone: '',
  // 注册密码
  password: '',
  // 验证码
  captcha: '',
  // cookie
  cookie: '',
  // 播放歌单
  playlist: [],
  // 歌手
  artist: null,
  // 用户歌单
  userSongList: null,
  // 用户背景图片
  image: null,
  // 用户id
  userName: '覃覃音乐',
  // 用户登录的手机号码
  isSongList: true
}

export default new Vuex.Store({
  state,
  mutations: {
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
    hiddenNickName (state) { state.isNickName = false },
    // 添加用户注册手机号，密码，验证码，昵称
    addPhone (state, phone) { state.phone = phone },
    addPassword (state, password) { state.password = password },
    addCaptcha (state, captcha) { state.captcha = captcha },
    addNickName (state, nickname) { state.nickname = nickname },
    // 添加用户信息，和cookie，uid
    async addUser (state, obj) {
      state.user = obj
      // 用户id
      state.uid = obj.uid
      state.cookie = obj.cookie
      // 用户背景图
      state.image = obj.image
      // 用户名字
      state.userName = obj.nickname
      // 获取用户歌单
      await _getSongList(state.uid).then(res => {
        state.userSongList = res.data.playlist
      })
    },
    // 显示用户歌单
    userSongList (state, isSongList) {
      state.isSongList = isSongList
    }
  },
  getters: {
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
    }
  }

})
