import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import store from './store'
import ElementUI from 'element-ui';
import '@/assets/css/style.scss';
import Config from '@/config/app';
import { isLogin } from '@/utils/dataStorage';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axios from "axios";

Vue.prototype.$axios = axios;
Vue.prototype.$Config = Config;

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(mavonEditor);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');