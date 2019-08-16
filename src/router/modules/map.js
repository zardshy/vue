import Layout from '@/views/layout'
export default [
  {
      path: '/map',
      redirect: '/map/mapboxgl',
      name: 'map',
      component: Layout,
      meta: {
          title: 'map'
      },
      children: [{
          path: '/map/leaflet',
          name: 'Leaflet',
          meta: {
              title: 'leaflet'
          },
          component: () =>
              import ('@/views/map/leaflet.vue')
      }, {
          path: '/map/openlayers',
          name: 'Openlayers',
          meta: {
              title: 'openlayers'
          },
          component: () =>
              import ('@/views/map/ol.vue')
      }, {
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
  }
]