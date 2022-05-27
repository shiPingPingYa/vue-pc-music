let uid = '';
try {
  if (localStorage.getItem('userId')) uid = localStorage.getItem('userId');
} catch (e) {
  console.log('获取用户id错误');
}
const state = {
  isShowLogin: false, // 是否显示登录页面
  isShowRegister: false, // 是否显示注册组件
  isCaptcha: false, // 是否显示验证码组件
  isNickName: false, // 是否显示呢称组件
  isShowQrcode: false, // 是否显示二维码
  user: null, // 用户默认信息
  uid, // 用户id
  nickname: '', // 登录用户昵称
  phone: '', // 注册手机号
  password: '', // 注册密码
  captcha: '', // 验证码
  playlist: [], // 播放歌单
  artist: null, // 歌手
  userSongList: [], // 用户歌单
  image: null, // 用户背景图片
  userName: '点击登录', // 用户id
  userFollows: '', // 用户的关注
  userFolloweds: '', // 用户的粉丝
  userGender: '', // 用户性别
  userEventCount: '', // 用户动态
  isSongList: true, // 用户登录的手机号码
  asyncShareImag: false, // 分享内容的图片显示与否
  isLogin: false,
  level: '', // 用户等级
  songListPath: '', // 播放音乐时存储的path，用于区分是否是在统一页面下面，是则不再请求接口修改音乐数据而是直接修改音乐播放列表的下标
  musicList: [], //音乐列表
  playList: [] //播放音乐列表
};

export default state;
