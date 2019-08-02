import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/layout'

Vue.use(Router)

let routerList = [{
        path: '/',
        redirect: '/login',
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
                import ('@/views/example/table.vue'),
            meta: {
                title: 'Table',
                icon: 'table'
            }

        }, {
            path: '/example/form',
            name: "form",
            component: () =>
                import ('@/views/example/form.vue'),
            meta: {
                title: 'form'
            }
        }]
    }, {
        path: '/map',
        redirect: '/map/mapboxgl',
        name: 'map',
        component: Layout,
        meta: {
            title: 'map'
        },
        children: [{
            path: '/map/mapboxgl',
            name: 'mapboxgl',
            meta: {
                title: 'mapbox gl'
            },
            component: () =>
                import ('@/views/map/maoboxgl.vue')
        }, {
            path: '/map/maptalks',
            name: 'maptalks',
            meta: {
                title: 'maptalks'
            },
            component: () =>
                import ('@/views/map/maptalks.vue')
        }]
    },
    {
        path: '/see',
        redirect: '/see/wind',
        name: 'see',
        component: Layout,
        meta: {
            title: '可视化'
        },
        children: [{
                path: '/see/wind',
                name: 'wind',
                meta: {
                    title: '风场图'
                },
                component: () =>
                    import ('@/views/see/wind.vue')
            },
            {
                path: '/see/echartBar',
                name: 'echartBar',
                meta: {
                    title: 'echarts'
                },
                component: () =>
                    import ('@/views/see/echartBar.vue')
            }
        ]
    },
    {
        path: '/login',
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
    mode: 'history',
    routes: routerList
})