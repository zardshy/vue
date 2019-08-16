import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'

Vue.use(Router);

const router= new Router({
  scrollBehavior: () => ({ y: 0 }),
  mode: 'hash',
  routes
});

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  // if (!isLogin() && to.path != '/login') {
  //     next({ path: '/login' });
  // } else {
  //     next();
  // }
  next();
});

export default router;