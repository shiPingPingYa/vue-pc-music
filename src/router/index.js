import Vue from 'vue'
import VueRouter from 'vue-router'

// 发现音乐组件
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
  { path: '/search/:id', component: SearchList }
]

const router = new VueRouter({
  routes
})

export default router
