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
import { Message, Pagination, Row, Col, Select, Option, Tag, Form, Upload, Container, Main, Tabs, TabPane, Header, Table, TableColumn, Dialog, FormItem, RadioGroup, Radio, CheckboxGroup, Checkbox } from 'element-ui'

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
Vue.use(FormItem)
Vue.use(Upload)
Vue.use(Container)
Vue.use(Main)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Header)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
