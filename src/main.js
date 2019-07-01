import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import store from './store'
import ElementUI from 'element-ui';
import '@/assets/css/style.scss';
import Config from '@/config/app';
import { isLogin } from '@/utils/dataStorage';

Vue.config.productionTip = false;
Vue.prototype.$Config = Config;
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title ? to.meta.title + '-' + Config.siteName : Config.siteName;
  if (!isLogin() && to.path != '/login') {
    next({ path: '/login' });
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
