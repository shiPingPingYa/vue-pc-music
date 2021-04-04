import Vue from 'vue'
import VueRouter from 'vue-router'

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
    children: [
      { path: '/', redirect: '/discover/individ' },
      // 个性推荐
      { path: '/discover/individ', component: () => import('../views/discover/childRouter/Individuation') },
      // 歌单
      { path: '/discover/category', component: () => import('../views/discover/childRouter/MusicListCategory') },
      // 排行榜
      { path: '/discover/ranklist', component: () => import('../views/discover/childRouter/MusicListRank') },
      // 歌手
      { path: '/discover/artist', component: () => import('../views/discover/childRouter/ArtistCategory') },
      // 最新音乐
      { path: '/discover/newsongs', component: () => import('../views/discover/childRouter/NewSongs') },
      // MV首页
      { path: '/discover/mv', component: () => import('../views/mv/Mv') }
    ]
  },
  // 歌手信息
  {
    path: '/artist',
    // 歌手详细信息开始
    component: () => import('../views/artistDetail/ArtistDetail'),
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
  { path: '/search/:id', component: () => import('../views/search/SearchList') },
  // mv播放跳转,
  { path: '/playmv/:id', component: () => import('../views/mv/PlayMv') },
  // 所有mv
  { path: '/allmv', component: () => import('../views/mv/AllMv') },
  // 歌单详情页面
  { path: '/musicListDetail/:id/:time', component: () => import('../views/musicListDetail/MusicListDetail') },
  // 播放视频
  { path: '/playvideo/:id', component: () => import('../views/allVideo/childComps/PlayVideo') },
  // 所有视频
  {
    path: '/video',
    // 播放视频详情页面
    component: () => import('../views/allVideo/AllVideoDetail'),
    children: [
      { path: '/', redirect: '/video/allvideo' },
      // 所有视频
      { path: '/video/allvideo', component: () => import('../views/allVideo/childComps/AllVideo') },
      // 所有mv
      { path: '/video/allmv', component: () => import('../views/mv/AllMv') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
