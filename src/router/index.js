import Vue from 'vue'
import VueRouter from 'vue-router'

// 首页
// 左边导航菜单
const DiscoverMusic = () => import('../views/discover/DiscoverMusic')
// 个性推荐
const Individuation = () => import('../views/discover/childRouter/Individuation')
// 歌单
const MusicListCategory = () => import('../views/discover/childRouter/MusicListCategory')
// 排行榜
const MusicListRank = () => import('../views/discover/childRouter/MusicListRank')
// 歌手
const ArtistCategory = () => import('../views/discover/childRouter/ArtistCategory')
// 最新音乐
const NewSongs = () => import('../views/discover/childRouter/NewSongs')
// 搜索内容
const SearchList = () => import('../views/search/SearchList')
// 首页结束

// 歌手详细信息开始
const ArtistDetail = () => import('../views/artistDetail/ArtistDetail')
// 歌手专辑
const ArtistAlbum = () => import('../views/artistDetail/childRouter/ArtistAlbum')
// 歌手mv
const ArtistMv = () => import('../views/artistDetail/childRouter/ArtistMv')
// 歌手描述
const ArtistDescDetail = () => import('../views/artistDetail/childRouter/ArtistDescDetail')
// 相似 歌手
const ArtistSimilar = () => import('../views/artistDetail/childRouter/ArtistSimilar')
// 歌手详细信息结束

// MV
Vue.use(VueRouter)
const routes = [
  { path: '/', redirect: '/discover' },
  {
    path: '/discover',
    component: DiscoverMusic,
    children: [
      { path: '/', redirect: '/discover/individ' },
      { path: '/discover/individ', component: Individuation },
      { path: '/discover/category', component: MusicListCategory },
      { path: '/discover/ranklist', component: MusicListRank },
      { path: '/discover/artist', component: ArtistCategory },
      { path: '/discover/newsongs', component: NewSongs }
    ]
  },
  { path: '/search/:id', component: SearchList },
  // 歌手信息
  {
    path: '/artist',
    component: ArtistDetail,
    children: [
      { path: '/', redirect: '/artist/album' },
      { path: '/artist/album', component: ArtistAlbum },
      { path: '/artist/mv', component: ArtistMv },
      { path: '/artist/desc', component: ArtistDescDetail },
      { path: '/artist/similar', component: ArtistSimilar }

    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
