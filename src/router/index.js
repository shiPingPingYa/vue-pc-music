import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui'

// 关于路由重复问题
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/discover',
    component: () => import('@/layout/layout'),
    children: [
      // 首页
      {
        path: '/discover',
        // 首页
        component: () => import('@/views/discover/DiscoverMusic'),
        meta: {
          title: '首页',
          requireLogin: false
        },
        children: [
          {
            path: '/',
            redirect: '/discover/individ'
          },
          // 个性推荐
          {
            path: '/discover/individ',
            component: () => import('@/views/discover/childRouter/Individuation'),
            meta: {
              title: '个性推荐',
              keepLive: true,
              requireLogin: false
            }
          },
          // 歌单
          {
            path: '/discover/category',
            component: () => import('@/views/discover/childRouter/MusicListCategory'),
            meta: {
              title: '歌单',
              keepLive: true,
              requireLogin: false
            }
          },
          // 排行榜
          {
            path: '/discover/ranklist',
            component: () => import('@/views/discover/childRouter/MusicListRank'),
            meta: {
              title: '排行榜',
              keepLive: true,
              requireLogin: false
            }
          },
          // 歌手
          {
            path: '/discover/artist',
            component: () => import('@/views/discover/childRouter/ArtistCategory'),
            meta: {
              title: '歌手',
              keepLive: true,
              requireLogin: false
            }
          },
          // 最新音乐
          {
            path: '/discover/newsongs',
            component: () => import('@/views/discover/childRouter/NewSongs'),
            meta: {
              title: '最新音乐',
              keepLive: true,
              requireLogin: false
            }
          },
          // MV首页
          {
            path: '/discover/mv',
            component: () => import('@/views/mv/Mv'),
            meta: {
              title: 'MV首页',
              keepLive: true,
              requireLogin: false
            }
          }
        ]
      },
      // 歌手信息
      {
        path: '/artist',
        // 歌手详细信息开始
        component: () => import('@/views/artistDetail/ArtistDetail'),
        meta: {
          title: '歌手信息',
          requireLogin: false
        },
        children: [
          {
            path: '/',
            redirect: '/artist/album'
          },
          // 歌手专辑
          {
            path: '/artist/album',
            component: () => import('@/views/artistDetail/childRouter/ArtistAlbum')
          },
          // 歌手mv
          {
            path: '/artist/artistmv',
            component: () => import('@/views/artistDetail/childRouter/ArtistMv')
          },
          // 歌手详情
          {
            path: '/artist/desc',
            component: () => import('@/views/artistDetail/childRouter/ArtistDescDetail')
          },
          // 相似歌手
          {
            path: '/artist/similar',
            component: () => import('@/views/artistDetail/childRouter/ArtistSimilar')
          }
        ]
      },
      // input输入框搜索信息，搜索内容
      {
        path: '/search/:id',
        component: () => import('@/views/search/SearchList'),
        meta: {
          title: '搜索内容',
          requireLogin: false
        }
      },
      // mv播放跳转,
      {
        path: '/playmv/:id',
        component: () => import('@/views/mv/PlayMv'),
        meta: {
          title: 'MV播放',
          requireLogin: false
        }
      },
      // 所有mv
      {
        path: '/allmv',
        component: () => import('@/views/mv/AllMv'),
        meta: {
          title: '所有MV',
          keepLive: true,
          requireLogin: false
        }
      },
      // 歌单详情页面
      {
        path: '/musicListDetail/:id',
        component: () => import('@/views/musicListDetail/MusicListDetail'),
        meta: {
          title: '歌单页面',
          requireLogin: false
        }
      },
      // 播放视频
      {
        path: '/playvideo/:id',
        component: () => import('@/views/allVideo/childComps/PlayVideo'),
        meta: {
          title: '视频播放',
          requireLogin: true
        }
      },
      // 所有视频
      {
        path: '/video',
        // 播放视频详情页面
        component: () => import('@/views/allVideo/AllVideoDetail'),
        children: [
          // 所有视频
          {
            path: '/video/allvideo',
            component: () => import('@/views/allVideo/childComps/AllVideo'),
            meta: {
              title: '所有视频',
              requireLogin: true
            }
          },
          // 所有mv
          {
            path: '/video/allmv',
            component: () => import('@/views/mv/AllMv'),
            meta: {
              title: '所有MV'
            }
          }
        ]
      },
      // 朋友
      {
        path: '/friend',
        component: () => import('@/components/content/friend/Friend'),
        meta: {
          title: '朋友',
          requireLogin: true
        },
        children: [
          {
            path: '/',
            redirect: 'frienddetail'
          },
          {
            path: '/friend/frienddetail',
            component: () => import('@/components/content/friend/FriendDetail'),
            meta: {
              requireLogin: true
            }
          },
          // 动态
          {
            path: '/friend/userdynamic',
            component: () => import('@/components/content/friend/childRouter/UserDynamic'),
            meta: {
              requireLogin: true
            }
          },
          // 粉丝
          {
            path: '/friend/userfolloweds',
            component: () => import('@/components/content/friend/childRouter/UserFolloweds'),
            meta: {
              requireLogin: true
            }
          },
          // 关注
          {
            path: '/friend/userfollows',
            component: () => import('@/components/content/friend/childRouter/UserFollows'),
            meta: {
              requireLogin: true
            }
          }
        ]
      },
      // 电台
      {
        path: '/transceiver',
        component: () => import('@/components/content/friend/Friend.vue'),
        meta: {
          title: '电台',
          requireLogin: true,
          keepLive: true
        }
      },
      // 每日推荐
      {
        path: '/daymusic',
        component: () => import('@/views/musicListDetail/childComps/DayMusic.vue'),
        meta: {
          title: '每日歌曲推荐',
          requireLogin: false
        }
      },
      {
        path: '/hotTopicRankList',
        component: () => import('@/components/content/friend/childRouter/HotTopicRankList.vue'),
        meta: {
          title: '热门话题',
          requireLogin: true
        }
      },
      {
        path: '/topicDetail/:id',
        component: () => import('@/components/content/friend/TopicDetail.vue'),
        meta: {
          title: '话题详情',
          requireLogin: true
        }
      },
      {
        path: '/noticesDetail/:id/:type',
        component: () => import('@/components/content/privateMsg/childComps/NoticesDetail.vue'),
        meta: {
          title: '通知详情',
          requireLogin: true
        }
      },
      {
        path: '/artist/albumDetail/:id',
        component: () => import('@/views/AlbumDetail/ArtistAlbumDetail.vue'),
        meta: {
          title: '歌手专辑',
          requireLogin: false
        }
      },
      {
        path: '/userDetail',
        component: () => import('@/components/content/user/UserDetail.vue'),
        meta: {
          title: '用户详情',
          keepLive: true,
          requireLogin: true
        }
      },
      {
        path: '/otherUserDetail',
        component: () => import('@/components/content/user/childRoute/OtherUserDetail.vue'),
        meta: {
          title: '用户歌单',
          requireLogin: true
        }
      },
      {
        path: '/404',
        component: () => import('@/components/common/error/404.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

const filterPath = routes => {
  const routerPath = []
  routes.forEach(item => {
    if (item.children) {
      routerPath.push(...filterPath(item.children))
    } else {
      routerPath.push(item.path)
    }
  })
  return routerPath
}
const isRoute = (item, routes) => item.meta.title || routes.indexOf(item.path) // 有些路由是动态路由，会出现路由查找不到的情况，所以加title来进行判断，不存在的路由是没有title的。
const setWebsiteTitle = title => {
  document.title = title
} // 设置网站title
const routerList = [...new Set(filterPath(routes))]

router.beforeEach((to, from, next) => {
  setWebsiteTitle(to.meta.title || '覃覃音乐')
  if (isRoute(to, routerList) === -1) return next('/404')
  // 判断是否需要登录鉴权(requireLogin),不需要直接放行。需要登录鉴权判断是否登录，未登录提示无权限访问页面，并且回退前一个页面，登录放行
  if (to.meta.requireLogin) {
    if (window.localStorage.getItem('userId')) next()
    else {
      Message.info('电台，视频等资源需登录后，才能获取数据，请先登录~~~~')
      setWebsiteTitle(from.meta.title || '覃覃音乐')
      next({ path: from.path })
    }
  } else next()
})

export default router
