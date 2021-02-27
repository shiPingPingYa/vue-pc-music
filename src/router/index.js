import Vue from 'vue'
import VueRouter from 'vue-router'

// 私人音乐组件
import DiscoverMusic from '../views/discover/DiscoverMusic'
Vue.use(VueRouter)
const routes = [
  { path: '/', redirect: '/discover' },
  {
    path: '/discover',
    component: DiscoverMusic

  }
]

const router = new VueRouter({
  routes
})

export default router
