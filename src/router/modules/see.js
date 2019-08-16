import Layout from '@/views/layout'
export default [
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
            path: '/see/leafletIDW',
            name: 'leafletIDW',
            meta: {
                title: '空间插值'
            },
            component: () =>
                import ('@/views/see/leafletIDW.vue')
        },
        {
            path: '/see/kriging',
            name: 'kriging',
            meta: {
                title: '克里金插值'
            },
            component: () =>
                import ('@/views/see/kriging.vue')
        },
        {
            path: '/see/heatMap',
            name: 'heatMap',
            meta: {
                title: '热力图'
            },
            component: () =>
                import ('@/views/see/heatMap.vue')
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
  }
]