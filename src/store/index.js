import Vue from 'vue'
import Vuex from 'vuex'
// 导入获取歌单请求
import { _getSongList } from '../network/user'
Vue.use(Vuex)

const state = {
  // 是否显示登录页面
  isShowLogin: false,
  // 用户名
  user: null,
  // 用户id
  uid: null,
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
  userName: '未登录',
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
    // 添加用户信息，和cookie，uid
    async addUser (state, obj) {
      state.user = obj
      // 用户id
      state.uid = obj.uid
      state.cookie = obj.cookie
      // 用户背景图
      state.image = obj.avatarUrl
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
    }
  }

})
