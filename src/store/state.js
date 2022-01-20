const state = {
  // 是否显示登录页面
  isShowLogin: false,
  // 是否显示注册组件
  isShowRegister: false,
  // 是否显示验证码组件
  isCaptcha: false,
  // 是否显示呢称组件
  isNickName: false,
  // 是否显示二维码
  isShowQrcode: false,
  // 用户默认信息
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
  // 播放歌单
  playlist: [],
  // 歌手
  artist: null,
  // 用户歌单
  userSongList: [],
  // 用户背景图片
  image: null,
  // 用户id
  userName: '点击登录',
  // 用户的关注
  userFollows: '',
  // 用户的粉丝
  userFolloweds: '',
  // 用户性别
  userGender: '',
  // 用户动态
  userEventCount: '',
  // 用户登录的手机号码
  isSongList: true,
  // 分享内容的图片显示与否
  asyncShareImag: false,
  isLogin: false,
  // 用户等级
  level: '',
  songListPath: '' // 播放音乐时存储的path，用于区分是否是在统一页面下面，是则不再请求接口修改音乐数据而是直接修改音乐播放列表的下标
}

try {
  if (localStorage.getItem('userId')) state.uid = localStorage.getItem('userId')
} catch (e) {
  console.log('获取用户id错误')
}

export default state
