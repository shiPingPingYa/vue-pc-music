import { _login, _getSongList, _getUserInfo } from '../network/user'
import { Message } from 'element-ui'
const actions = {
  async __LOGIN (context, params) {
    const {
      data: { code, profile, cookie }
    } = await _login(params)
    if (code !== 200) {
      Message.error('密码错误')
    } else {
      Message.success('登陆成功')
      localStorage.setItem('userId', profile.userId)
      localStorage.setItem('tt_cookie', cookie)
      context.commit('addUser', profile)
      context.commit('hiddenLogin')
      context.commit('setIslogin', true)
      context.dispatch('_GETUSERSONGLIST', profile.userId)
    }
  },
  // 获取用户歌单
  async _GETUSERSONGLIST (context, uid) {
    await _getSongList(uid).then(res => {
      context.commit('addSongList', res.data.playlist)
    })
  },
  // 获取用户信息(性别和其余信息，比如粉丝，关注等等)
  async _GETUSERINFO (context, uid) {
    const {
      data: { profile, level }
    } = await _getUserInfo({
      uid: uid,
      timestamp: Date.now()
    })
    profile.level = level
    context.commit('addUser', profile)
    context.dispatch('_GETUSERSONGLIST', profile.userId)
  },
  _Layout (context) {
    context.commit('setIslogin', false)
    localStorage.clear('userId')
    window.location.reload()
  }
}

export default actions
