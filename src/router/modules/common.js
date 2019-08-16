export default [{
  path: '/',
  redirect: '/login',
},{
  path: '/login',
  meta: {
      title: '登陆页',
      keepAlive: false
  },
  component: () =>import ('@/views/login/Login.vue')
},{
  path:'*',
  meta: {
    title: '404'
  },
  component:() =>import('@/views/404.vue')
}]