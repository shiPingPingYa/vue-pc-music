import { _login, _getSongList, _getUserInfo } from '../network/user'
import { Message } from 'element-ui'
const actions = {
  async __LOGIN (context, params) {
    const {
      data: { code, profile }
    } = await _login(params)
    if (code !== 200) {
      Message.error('密码错误')
    } else {
      Message.success('登陆成功')
      localStorage.setItem('userId', profile.userId)
      context.commit('addUser', profile)
      context.commit('hiddenLogin')
      context.commit('setIslogin', true)
      context.dispatch('_GETUSERSONGLIST', profile.userId)
    }
  },
  async _GETUSERSONGLIST (context, uid) {
    await _getSongList(uid).then(res => {
      context.commit('addSongList', res.data.playlist)
    })
  },
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
  }
}

export default actions
