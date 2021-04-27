import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
// 导入创建好的vuex
import store from './store'

// 导入全局css样式
import '../src/assets/css/babel.css'
// 导入elementui
import '../src/plugins/element'

Vue.config.productionTip = false
// 挂载axios
Vue.prototype.$http = axios
// 创建事件中心
Vue.prototype.$bus = new Vue()
new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
