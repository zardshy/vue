import Vue from 'vue'
import Router from 'vue-router'

import layout from '@/views/layout'

Vue.use(Router)

let RouterList = [{
        path: '/',
        redirect: '/example/table',
        name: 'Example',
        component: layout,
        children: [{
            path: 'example/table',
            component: () =>
                import ('@/views/example/table.vue')
        }, {
            path: 'example/form',
            component: () =>
                import ('@/views/example/form.vue')
        }]
    }, {
        path: '/map',
        name: 'Map',
        component: layout,
        children: [{
            path: "map/leaflet",
            component: () =>
                import ('@/views/map/leaflet.vue')
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
            import ('@/views/login/Login.vue')
    }
]

export default new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: RouterList
})