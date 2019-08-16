import Layout from '@/views/layout'
export default [
  {
    path: '/example',
    name: 'example',
    component: Layout,
    meta: {
        title: 'Example'
    },
    children: [{
        path: '/example/table',
        name: 'table',
        component: () =>import ('@/views/example/table.vue'),
        meta: {
            title: '表格',
            icon: 'table'
        }

    }, {
        path: '/example/form',
        name: "form",
        component: () =>import ('@/views/example/form.vue'),
        meta: {
            title: '表单'
        }
    }, {
        path: '/example/markdown',
        name: "Markdown",
        component: () =>import ('@/views/example/markdown.vue'),
        meta: {
            title: '文本编辑器'
        }
    }]
  }
]