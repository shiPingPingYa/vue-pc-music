import Vue from 'vue';
import VueRouter from 'vue-router';
import { Message } from 'element-ui';

// 关于路由重复问题
const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
// resolve => require([''], resolve);
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
            component: resolve => require(['@/views/individuation/index'], resolve),
            meta: {
              title: '个性推荐',
              keepLive: true,
              requireLogin: false
            }
          },
          {
            // 发现音乐-歌单
            path: '/discover/songList',
            component: resolve => require(['@/views/songListCategory/index'], resolve),
            meta: {
              title: '歌单',
              keepLive: true,
              requireLogin: false
            }
          },
          {
            // 发现音乐-排行榜
            path: '/discover/ranklist',
            component: resolve => require(['@/views/musicRankList/index'], resolve),
            meta: {
              title: '排行榜',
              keepLive: true,
              requireLogin: false
            }
          },
          {
            // 发现音乐-歌手
            path: '/discover/artist',
            component: resolve => require(['@/views/artistCategory/index'], resolve),
            meta: {
              title: '歌手',
              keepLive: true,
              requireLogin: false
            }
          },
          {
            // 发现音乐-最新音乐
            path: '/discover/newsongs',
            component: resolve => require(['@/views/newMusic/index'], resolve),
            meta: {
              title: '最新音乐',
              keepLive: true,
              requireLogin: false
            }
          },
          {
            // 发现音乐-MV
            path: '/discover/mv',
            component: resolve => require(['@/views/discoverMv/index'], resolve),
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
            component: resolve => require(['@/views/friend/friendDetail/index'], resolve),
            meta: { requireLogin: true }
          },
          {
            // 动态
            path: '/friend/userdynamic',
            component: resolve => require(['@/views/userDynamic/index'], resolve),
            meta: { requireLogin: true }
          },
          {
            // 粉丝
            path: '/friend/userfolloweds',
            component: resolve => require(['@/views/userfolloweds/index'], resolve),
            meta: { requireLogin: true }
          },
          {
            // 关注
            path: '/friend/userAttention',
            component: resolve => require(['@/views/userAttention/index'], resolve),
            meta: { requireLogin: true }
          }
        ]
      },
      {
        // 每日推荐
        path: '/daymusic',
        component: resolve => require(['@/views/dailyRecommendation/index'], resolve),
        meta: {
          title: '每日歌曲推荐',
          requireLogin: false
        }
      },
      {
        //用户详情页面
        path: '/userDetail',
        component: resolve => require(['@/views/userDetail/index'], resolve),
        meta: {
          title: '用户详情',
          keepLive: true,
          requireLogin: true
        }
      },
      {
        //其他用户详情页面
        path: '/otherUserDetail',
        component: resolve => require(['@/views/userDetail/components/otherUserDetail'], resolve),
        meta: {
          title: '用户歌单',
          requireLogin: true,
          keepLive: true
        }
      },
      {
        //话题排行榜
        path: '/hotTopicRankList',
        component: resolve => require(['@/views/hotTopic/index'], resolve),
        meta: {
          title: '热门话题',
          requireLogin: true
        }
      },
      {
        //话题详情页
        path: '/topicDetail/:id',
        component: resolve => require(['@/views/topicDetail/index'], resolve),
        meta: {
          title: '话题详情',
          requireLogin: true
        }
      },
      {
        path: '/noticesDetail/:id/:type',
        component: resolve => require(['@/views/noticeDetail/index'], resolve),
        meta: {
          title: '通知详情',
          requireLogin: true
        }
      },
      {
        //404页面
        path: '/404',
        component: resolve => require(['@/components/common/error/404.vue'], resolve)
      },
      {
        //歌手信息
        path: '/artist',
        // 歌手详细信息开始
        component: resolve => require(['@/views/artistDetail/index'], resolve),
        meta: { title: '歌手信息', requireLogin: false }
      },
      {
        // input输入框搜索信息，搜索内容
        path: '/search/:id',
        component: resolve => require(['@/views/searchMusicDeatil/index'], resolve),
        meta: {
          title: '搜索内容',
          requireLogin: false
        }
      },
      {
        // 所有mv
        path: '/allmv',
        component: resolve => require(['@/views/allMv/index'], resolve),
        meta: {
          title: '所有MV',
          keepLive: true,
          requireLogin: false
        }
      },
      {
        // mv播放跳转,
        path: '/playmv',
        component: resolve => require(['@/views/playMv/index'], resolve),
        meta: {
          title: 'MV播放',
          requireLogin: false
        }
      },
      {
        // 歌单详情页面
        path: '/musicListDetail/:id',
        component: resolve => require(['@/views/musicListDetail/MusicListDetail'], resolve),
        meta: {
          title: '歌单页面',
          requireLogin: false
        }
      },
      {
        // 播放视频
        path: '/playvideo/:id',
        component: resolve => require(['@/views/playVideo/index'], resolve),
        meta: {
          title: '视频播放',
          requireLogin: true
        }
      },
      {
        // 所有视频
        path: '/allVideo',
        // 播放视频详情页面
        component: resolve => require(['@/views/allVideo/alllVideoDetail'], resolve)
      },
      {
        // 电台
        path: '/transceiver',
        component: resolve => require(['@/views/friend/index']),
        meta: {
          title: '电台',
          requireLogin: true,
          keepLive: true
        }
      },
      {
        path: '/artist/albumDetail/:id',
        component: resolve => require(['@/views/album/index'], resolve),
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
