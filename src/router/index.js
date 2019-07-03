import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/layout'

Vue.use(Router)

let routerList = [{
    path: '/',
    redirect: '/example/table',
}, {
    path: '/example',
    name: 'example',
    component: Layout,
    meta: {
        title: 'Example'
    },
    children: [{
        path: '/example/table',
        name: 'table',
        component: () =>
            import('@/views/example/table.vue'),
        meta: {
            title: 'Table',
            icon: 'table'
        }

    }, {
        path: '/example/form',
        name: "form",
        component: () =>
            import('@/views/example/form.vue'),
        meta: {
            title: 'form'
        }
    }]
}, {
    path: '/map',
    redirect: '/map/leaflet',
    name: 'map',
    component: Layout,
    meta: {
        title: 'map'
    },
    children: [{
        path: '/map/leaflet',
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
    mode: 'history',
    routes: routerList
})