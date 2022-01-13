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
import {
  Message,
  Pagination,
  Row,
  Col,
  Select,
  Option,
  Tag,
  Form,
  Upload,
  Container,
  Main,
  Tabs,
  TabPane,
  Header,
  Table,
  TableColumn,
  Dialog,
  FormItem,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Tooltip,
  Checkbox,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Menu,
  MenuItem,
  Submenu
} from 'element-ui'
import { formDate } from './assets/common/tool'

Vue.use(Upload)
Vue.use(Tooltip)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Dropdown)
Vue.use(Pagination)
Vue.use(Row)
Vue.use(Col)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Option)
Vue.use(Tag)
Vue.use(Form)
Vue.use(Header)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(FormItem)
Vue.use(Container)
Vue.use(Main)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Select)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)

Vue.config.productionTip = false
// 挂载axios
Vue.prototype.$http = axios
// 创建事件中心
Vue.prototype.$bus = new Vue()
// 挂载消息提示
Vue.prototype.$Message = Message
Vue.prototype.formDate = formDate

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
