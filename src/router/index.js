import Vue from 'vue'
import Router from 'vue-router'

import layout from '@/views/layout'

Vue.use(Router)

let RouterList = [{
    path: '/',
    redirect: '/example/table',
    name: 'Example',
    component: layout,
    meta: {
        title: 'Example'
    },
    children: [{
        path: 'example/table',
        name: 'table',
        meta: {
            title: 'table'
        },
        component: () =>
            import('@/views/example/table.vue')
    }, {
        path: 'example/form',
        name: "form",
        meta: {
            title: 'form'
        },
        component: () =>
            import('@/views/example/form.vue')
    }]
}, {
    path: '/map',
    name: 'Map',
    component: layout,
    meta: {
        title: 'Map'
    },
    children: [{
        path: 'map/leaflet',
        name: 'leaflet',
        meta: {
            title: 'leaflet'
        },
        component: () =>
            import('@/views/map/leaflet.vue')
    }]
},
{
    path: '/login',
    name: 'login',
    meta: {
        title: '登陆页',
        keepAlive: false
    },
    component: () =>
        import('@/views/login/Login.vue')
}
]

export default new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: RouterList
})