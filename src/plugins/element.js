import Vue from 'vue'
import { Button, Input, Message } from 'element-ui'

Vue.prototype.$message = Message

Vue.use(Message)
Vue.use(Button)
Vue.use(Input)
