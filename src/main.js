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
import { Message, Pagination, Row, Col, Select, Option, Tag, Form, Upload, Container } from 'element-ui'

Vue.config.productionTip = false
// 挂载axios
Vue.prototype.$http = axios
// 创建事件中心
Vue.prototype.$bus = new Vue()
// 挂载消息提示
Vue.prototype.$Message = Message
Vue.use(Pagination)
Vue.use(Row)
Vue.use(Col)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tag)
Vue.use(Form)
Vue.use(Upload)
Vue.use(Container)

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
