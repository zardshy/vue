import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'

Vue.use(Router)

const router = new Router({
    scrollBehavior: () => ({ y: 0 }),
    mode: 'hash',
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    if (to.path === '/login') {
        next();
    } else {
        if (sessionStorage.getItem('userToken')) {
            next();
        } else {
            next({ path: '/login' });
        }
    }
});

export default router