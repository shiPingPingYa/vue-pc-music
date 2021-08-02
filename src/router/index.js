import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  Message
} from 'element-ui'
import {
  getPageTitle
} from '../assets/common/tool'

import {
  filterPath,
  isRoute
} from './isRoute'

// 关于路由重复问题
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)
const routes = [{
  path: '/',
  redirect: '/discover'
},
// 首页
{
  path: '/discover',
  // 首页
  component: () => import('../views/discover/DiscoverMusic'),
  meta: {
    title: '首页'
  },
  children: [{
    path: '/',
    redirect: '/discover/individ'
  },
  // 个性推荐
  {
    path: '/discover/individ',
    component: () => import('../views/discover/childRouter/Individuation'),
    meta: {
      title: '个性推荐',
      keepLive: true

    }
  },
  // 歌单
  {
    path: '/discover/category',
    component: () => import('../views/discover/childRouter/MusicListCategory'),
    meta: {
      title: '歌单',
      keepLive: true

    }
  },
  // 排行榜
  {
    path: '/discover/ranklist',
    component: () => import('../views/discover/childRouter/MusicListRank'),
    meta: {
      title: '排行榜',
      keepLive: true

    }
  },
  // 歌手
  {
    path: '/discover/artist',
    component: () => import('../views/discover/childRouter/ArtistCategory'),
    meta: {
      title: '歌手',
      keepLive: true

    }
  },
  // 最新音乐
  {
    path: '/discover/newsongs',
    component: () => import('../views/discover/childRouter/NewSongs'),
    meta: {
      title: '最新音乐',
      keepLive: true
    }
  },
  // MV首页
  {
    path: '/discover/mv',
    component: () => import('../views/mv/Mv'),
    meta: {
      title: 'MV首页',
      keepLive: true

    }
  }
  ]
},
// 歌手信息
{
  path: '/artist',
  // 歌手详细信息开始
  component: () => import('../views/artistDetail/ArtistDetail'),
  meta: {
    title: '歌手信息'
  },
  children: [{
    path: '/',
    redirect: '/artist/album'
  },
  // 歌手专辑
  {
    path: '/artist/album',
    component: () => import('../views/artistDetail/childRouter/ArtistAlbum')
  },
  // 歌手mv
  {
    path: '/artist/artistmv',
    component: () => import('../views/artistDetail/childRouter/ArtistMv')
  },
  // 歌手详情
  {
    path: '/artist/desc',
    component: () => import('../views/artistDetail/childRouter/ArtistDescDetail')
  },
  // 相似歌手
  {
    path: '/artist/similar',
    component: () => import('../views/artistDetail/childRouter/ArtistSimilar')
  }

  ]
},
// input输入框搜索信息，搜索内容
{
  path: '/search/:id',
  component: () => import('../views/search/SearchList'),
  meta: {
    title: '搜索内容'
  }
},
// mv播放跳转,
{
  path: '/playmv/:id',
  component: () => import('../views/mv/PlayMv'),
  meta: {
    title: 'MV播放'
  }
},
// 所有mv
{
  path: '/allmv',
  component: () => import('../views/mv/AllMv'),
  meta: {
    title: '所有MV'
  }
},
// 歌单详情页面
{
  path: '/musicListDetail/:id',
  component: () => import('../views/musicListDetail/MusicListDetail'),
  meta: {
    title: '歌单页面'
  }
},
// 播放视频
{
  path: '/playvideo/:id',
  component: () => import('../views/allVideo/childComps/PlayVideo'),
  meta: {
    title: '视频播放',
    requireLogin: true
  }
},
// 所有视频
{
  path: '/video',
  // 播放视频详情页面
  component: () => import('../views/allVideo/AllVideoDetail'),
  children: [
    // 所有视频
    {
      path: '/video/allvideo',
      component: () => import('../views/allVideo/childComps/AllVideo'),
      meta: {
        title: '所有视频',
        requireLogin: true
      }
    },
    // 所有mv
    {
      path: '/video/allmv',
      component: () => import('../views/mv/AllMv'),
      meta: {
        title: '所有MV'
      }
    }
  ]
},
// 朋友
{
  path: '/friend',
  component: () => import('../components/content/friend/Friend'),
  meta: {
    title: '朋友',
    requireLogin: true
  },
  children: [{
    path: '/',
    redirect: 'frienddetail'
  },
  {
    path: '/friend/frienddetail',
    component: () => import('../components/content/friend/FriendDetail'),
    meta: {
      requireLogin: true
    }
  },
  // 动态
  {
    path: '/friend/userdynamic',
    component: () => import('../components/content/friend/childRouter/UserDynamic'),
    meta: {
      requireLogin: true
    }
  },
  // 粉丝
  {
    path: '/friend/userfolloweds',
    component: () => import('../components/content/friend/childRouter/UserFolloweds'),
    meta: {
      requireLogin: true
    }
  },
  // 关注
  {
    path: '/friend/userfollows',
    component: () => import('../components/content/friend/childRouter/UserFollows'),
    meta: {
      requireLogin: true
    }
  }
  ]
},
// 电台
{
  path: '/transceiver',
  component: () => import('../components/content/friend/Friend.vue'),
  meta: {
    title: '电台',
    requireLogin: true
  }
},
// 每日推荐
{
  path: '/daymusic',
  component: () => import('../views/musicListDetail/childComps/DayMusic.vue'),
  meta: {
    title: '每日歌曲推荐'
  }
},
{
  path: '/hotTopicRankList',
  component: () => import('../components/content/friend/childRouter/HotTopicRankList.vue'),
  meta: {
    title: '热门话题',
    requireLogin: true
  }
},
{
  path: '/topicDetail/:id',
  component: () => import('../components/content/friend/TopicDetail.vue'),
  meta: {
    title: '话题详情',
    requireLogin: true
  }
},
{
  path: '/noticesDetail/:id/:type',
  component: () => import('../components/content/privateMsg/childComps/NoticesDetail.vue'),
  meta: {
    title: '通知详情'
  }
},
{
  path: '/artist/albumDetail/:id',
  component: () => import('../views/AlbumDetail/ArtistAlbumDetail.vue'),
  meta: {
    title: '歌手专辑'
  }
},
{
  path: '/userDetail',
  component: () => import('../components/content/user/UserDetail.vue'),
  meta: {
    title: '用户详情',
    keepLive: true
  }
},
{
  path: '/otherUserDetail',
  component: () => import('../components/content/user/childRoute/OtherUserDetail.vue'),
  meta: {
    title: '用户歌单'
  }
},
{
  path: '/404',
  component: () => import('../components/common/error/404.vue')
}
  // {
  //   path: '/ceshi',
  //   component: () => import('../components/yunying/itemBankManage.vue'),
  //   meta: {
  //     title: '测试'
  //   }
  // }
]

const router = new VueRouter({
  routes
})

const routerPath = [...new Set(filterPath(routes))]

router.beforeEach((to, from, next) => {
  // 设置网站title
  document.title = getPageTitle(to.meta.title)
  if (isRoute(to, routerPath) === -1) return next('/404')
  // 未登录
  if (!window.localStorage.getItem('userId')) {
    if (to.meta.requireLogin) {
      Message.info('电台视频等资源须先登录后才能获取，请先登录')
      next('/discover/individ')
    }
  }
  // 登录状态下，直接放行
  next()
})

export default router
