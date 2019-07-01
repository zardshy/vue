import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/layout/index.vue'

Vue.use(Router)

let RouterList = [
  {
    path: '/',
    redirect: '/example/table',
    name: 'Example',
    component: () => import('@/views/layout/index.vue'),
    children: [{
      path: '/example/table',
      component: () => import('@/views/example/table.vue')
    }]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登陆页',
      keepAlive: false
    },
    component: () => import('@/views/login/Login.vue')
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: RouterList
})
