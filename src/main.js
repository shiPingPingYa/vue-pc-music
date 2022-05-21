import App from './App.vue';
import router from './router';
// 导入创建好的vuex
import store from './store';
// 导入全局css样式
import '@/assets/css/babel.less';
import '@/assets/css/index.less';
// 导入elementui
import '../src/plugins/element';
import scroll from '@/components/common/scroll/index';
import { formDate } from '@/assets/common/tool';
import imgLazy from './dirctives/imgLazy';

Vue.config.productionTip = false;
// 挂载axios
Vue.prototype.$http = axios;
// 创建事件中心
Vue.prototype.$bus = new Vue();
Vue.prototype.formDate = formDate;
Vue.directive('imgLazy', imgLazy);
Vue.component('scroll', scroll); //全局使用的scroll组件(因为这个scroll组件使用地方过多，所以全局注册)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
