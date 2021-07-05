import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui'
import { getPageTitle } from '../assets/common/tool'

// 关于路由重复问题
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)
const routes = [
  { path: '/', redirect: '/discover' },
  // 首页
  {
    path: '/discover',
    // 首页
    component: () => import('../views/discover/DiscoverMusic'),
    meta: { title: '首页' },
    children: [
      { path: '/', redirect: '/discover/individ' },
      // 个性推荐
      { path: '/discover/individ', component: () => import('../views/discover/childRouter/Individuation'), meta: { title: '个性推荐' } },
      // 歌单
      { path: '/discover/category', component: () => import('../views/discover/childRouter/MusicListCategory'), meta: { title: '歌单' } },
      // 排行榜
      { path: '/discover/ranklist', component: () => import('../views/discover/childRouter/MusicListRank'), meta: { title: '排行榜' } },
      // 歌手
      { path: '/discover/artist', component: () => import('../views/discover/childRouter/ArtistCategory'), meta: { title: '歌手' } },
      // 最新音乐
      { path: '/discover/newsongs', component: () => import('../views/discover/childRouter/NewSongs'), meta: { title: '最新音乐' } },
      // MV首页
      { path: '/discover/mv', component: () => import('../views/mv/Mv'), meta: { title: 'MV首页' } }
    ]
  },
  // 歌手信息
  {
    path: '/artist',
    // 歌手详细信息开始
    component: () => import('../views/artistDetail/ArtistDetail'),
    meta: { title: '歌手信息' },
    children: [
      { path: '/', redirect: '/artist/album' },
      // 歌手专辑
      { path: '/artist/album', component: () => import('../views/artistDetail/childRouter/ArtistAlbum') },
      // 歌手mv
      { path: '/artist/artistmv', component: () => import('../views/artistDetail/childRouter/ArtistMv') },
      // 歌手详情
      { path: '/artist/desc', component: () => import('../views/artistDetail/childRouter/ArtistDescDetail') },
      // 相似歌手
      { path: '/artist/similar', component: () => import('../views/artistDetail/childRouter/ArtistSimilar') }

    ]
  },
  // input输入框搜索信息，搜索内容
  { path: '/search/:id', component: () => import('../views/search/SearchList'), meta: { title: '搜索内容' } },
  // mv播放跳转,
  { path: '/playmv/:id', component: () => import('../views/mv/PlayMv'), meta: { title: 'MV播放' } },
  // 所有mv
  { path: '/allmv', component: () => import('../views/mv/AllMv'), meta: { title: '所有MV' } },
  // 歌单详情页面
  { path: '/musicListDetail/:id', component: () => import('../views/musicListDetail/MusicListDetail'), meta: { title: '歌单页面' } },
  // 播放视频
  { path: '/playvideo/:id', component: () => import('../views/allVideo/childComps/PlayVideo'), meta: { title: '视频播放' } },
  // 所有视频
  {
    path: '/video',
    // 播放视频详情页面
    component: () => import('../views/allVideo/AllVideoDetail'),
    children: [
      // 所有视频
      { path: '/video/allvideo', component: () => import('../views/allVideo/childComps/AllVideo'), meta: { title: '所有视频' } },
      // 所有mv
      { path: '/video/allmv', component: () => import('../views/mv/AllMv'), meta: { title: '所有MV' } }
    ]
  },
  // 朋友
  {
    path: '/friend',
    component: () => import('../components/content/friend/Friend'),
    meta: { title: '朋友' },
    children: [
      { path: '/', redirect: 'frienddetail' },
      { path: 'frienddetail', component: () => import('../components/content/friend/FriendDetail') },
      // 动态
      { path: 'userdynamic', component: () => import('../components/content/friend/childRouter/UserDynamic') },
      // 粉丝
      { path: 'userfolloweds', component: () => import('../components/content/friend/childRouter/UserFolloweds') },
      // 关注
      { path: 'userfollows', component: () => import('../components/content/friend/childRouter/UserFollows') }
    ]
  },
  // 电台
  {
    path: '/transceiver',
    component: () => import('../components/content/friend/Friend.vue'),
    meta: { title: '朋友' }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 设置网站title
  document.title = getPageTitle(to.meta.title)
  // 没有登录
  if (!window.localStorage.getItem('obj')) {
    // 访问视频
    if (to.path === '/video/allvideo' || to.path === '/friend/frienddetail' || to.path === '/transceiver') {
      Message.info('电台等资源必须登录后才能获取，请先登录')
      next('/discover/individ')
    }
  }

  // 其余直接放行
  next()
})
export default router
