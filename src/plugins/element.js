import Vue from 'vue'
import {
  Button,
  Input,
  Message,
  MessageBox,
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
  Submenu,
  Backtop
} from 'element-ui'

Vue.use(Button)
Vue.use(Input)
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
Vue.use(Backtop)

Vue.prototype.$confirm = MessageBox
Vue.prototype.$message = Message
