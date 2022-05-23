import Vue from 'vue';
import VueRouter from 'vue-router';
import { Message } from 'element-ui';

// 关于路由重复问题
const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    redirect: '/discover',
    component: () => import('@/layout/index'),
    children: [
      {
        // 首页
        path: '/discover',
        redirect: '/discover/individ',
        component: () => import('@/layout/discover/index'),
        meta: {
          title: '首页',
          requireLogin: false
        },
        children: [
          {
            // 发现音乐-个性推荐
            path: '/discover/individ',
            component: () => import('@/views/individuation/index'),
            meta: {
              title: '个性推荐',
              keepLive: true,
              requireLogin: false
            }
          },
          {
            // 发现音乐-歌单
            path: '/discover/songList',
            component: () => import('@/views/songListCategory/index'),
            meta: {
              title: '歌单',
              keepLive: true,
              requireLogin: false
            }
          },
          {
            // 发现音乐-排行榜
            path: '/discover/ranklist',
            component: () => import('@/views/musicRankList/index'),
            meta: {
              title: '排行榜',
              keepLive: true,
              requireLogin: false
            }
          },
          {
            // 发现音乐-歌手
            path: '/discover/artist',
            component: () => import('@/views/artistCategory/index'),
            meta: {
              title: '歌手',
              keepLive: true,
              requireLogin: false
            }
          },
          {
            // 发现音乐-最新音乐
            path: '/discover/newsongs',
            component: () => import('@/views/newMusic/index'),
            meta: {
              title: '最新音乐',
              keepLive: true,
              requireLogin: false
            }
          },
          {
            // 发现音乐-MV
            path: '/discover/mv',
            component: () => import('@/views/discoverMv/index'),
            meta: {
              title: 'MV首页',
              keepLive: true,
              requireLogin: false
            }
          }
        ]
      },
      {
        // 朋友
        path: '/friend',
        redirect: '/friend/frienddetail',
        component: () => import('@/views/friend/index'),
        meta: { title: '朋友', requireLogin: true },
        children: [
          {
            //朋友首页
            path: '/friend/frienddetail',
            component: () => import('@/views/friend/friendDetail/index'),
            meta: { requireLogin: true }
          },
          {
            // 动态
            path: '/friend/userdynamic',
            component: () => import('@/views/userDynamic/index'),
            meta: { requireLogin: true }
          },
          {
            // 粉丝
            path: '/friend/userfolloweds',
            component: () => import('@/views/userfolloweds/index'),
            meta: { requireLogin: true }
          },
          {
            // 关注
            path: '/friend/userAttention',
            component: () => import('@/views/userAttention/index'),
            meta: { requireLogin: true }
          }
        ]
      },
      {
        // 每日推荐
        path: '/daymusic',
        component: () => import('@/views/dailyRecommendation/index'),
        meta: {
          title: '每日歌曲推荐',
          requireLogin: false
        }
      },
      {
        //用户详情页面
        path: '/userDetail',
        component: () => import('@/views/userDetail/index'),
        meta: {
          title: '用户详情',
          keepLive: true,
          requireLogin: true
        }
      },
      {
        //其他用户详情页面
        path: '/otherUserDetail',
        component: () => import('@/views/userDetail/components/otherUserDetail'),
        meta: {
          title: '用户歌单',
          requireLogin: true,
          keepLive: true
        }
      },
      {
        path: '/hotTopicRankList',
        component: () => import('@/views/hotTopic/index'),
        meta: {
          title: '热门话题',
          requireLogin: true
        }
      },
      {
        //404页面
        path: '/404',
        component: () => import('@/components/common/error/404.vue')
      },
      {
        //歌手信息
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
      {
        // input输入框搜索信息，搜索内容
        path: '/search/:id',
        component: () => import('@/views/search/SearchList'),
        meta: {
          title: '搜索内容',
          requireLogin: false
        }
      },
      {
        // mv播放跳转,
        path: '/playmv',
        component: () => import('@/views/mv/PlayMv'),
        meta: {
          title: 'MV播放',
          requireLogin: false
        }
      },
      {
        // 所有mv
        path: '/allmv',
        component: () => import('@/views/mv/AllMv'),
        meta: {
          title: '所有MV',
          keepLive: true,
          requireLogin: false
        }
      },
      {
        // 歌单详情页面
        path: '/musicListDetail/:id',
        component: () => import('@/views/musicListDetail/MusicListDetail'),
        meta: {
          title: '歌单页面',
          requireLogin: false
        }
      },
      {
        // 播放视频
        path: '/playvideo/:id',
        component: () => import('@/views/allVideo/childComps/PlayVideo'),
        meta: {
          title: '视频播放',
          requireLogin: true
        }
      },
      {
        // 所有视频
        path: '/video',
        // 播放视频详情页面
        component: () => import('@/views/allVideo/AllVideoDetail'),
        children: [
          {
            // 所有视频
            path: '/video/allvideo',
            component: () => import('@/views/allVideo/childComps/AllVideo'),
            meta: {
              title: '所有视频',
              requireLogin: true
            }
          },
          {
            // 所有mv
            path: '/video/allmv',
            component: () => import('@/views/mv/AllMv'),
            meta: {
              title: '所有MV'
            }
          }
        ]
      },
      {
        // 电台
        path: '/transceiver',
        component: () => import('@/views/friend/index'),
        meta: {
          title: '电台',
          requireLogin: true,
          keepLive: true
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
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

const getAllRoutePath = routes => {
  const routerPath = [];
  routes.forEach(item => {
    routerPath.push(item.path);
    if (item.children) routerPath.push(...getAllRoutePath(item.children));
  });
  return routerPath;
};
const isRoute = (item, routes) => item.meta.title || routes.indexOf(item.path); // 有些路由是动态路由，会出现路由查找不到的情况，所以加title来进行判断，不存在的路由是没有title的。
const setWebsiteTitle = title => (document.title = title); // 设置网站title
const routePathList = [...new Set(getAllRoutePath(routes))];

router.beforeEach((to, from, next) => {
  setWebsiteTitle(to.meta.title || '覃覃音乐');
  if (isRoute(to, routePathList) === -1) return next('/404'); //判断跳转路由是否存在
  // 判断是否需要登录鉴权(requireLogin),不需要直接放行。需要登录鉴权判断是否登录，未登录提示无权限访问页面，并且回退前一个页面，登录放行
  if (to.meta.requireLogin) {
    if (window.localStorage.getItem('userId')) next();
    else {
      Message.info('电台，视频等资源需登录后，才能获取数据，请先登录~~~~');
      setWebsiteTitle(from.meta.title || '覃覃音乐');
      next({
        path: from.path
      });
    }
  } else next();
});

export default router;
