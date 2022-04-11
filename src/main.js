import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
// 导入创建好的vuex
import store from './store'
// 导入全局css样式
import 'assets/css/babel.css'
import 'assets/css/index.css'
// 导入elementui
import '../src/plugins/element'
import { formDate } from './assets/common/tool'
import imgLazy from './dirctives/imgLazy'

Vue.config.productionTip = false
// 挂载axios
Vue.prototype.$http = axios
// 创建事件中心
Vue.prototype.$bus = new Vue()
Vue.prototype.formDate = formDate
Vue.directive('imgLazy', imgLazy)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
