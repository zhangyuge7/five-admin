export default {
  path: 'demo',
  name: 'Demo',
  meta: {
    title: '演示',
    isHide: false,
  },
  children: [
    {
      path: 'demo1',
      name: 'Demo1',
      meta: {
        title: '演示1',
        isHide: false,
      },
      component: () => import('@/views/demo/Demo1/index.vue'),
    },
    {
      path: 'request',
      name: 'Request',
      meta: {
        title: '请求',
        isHide: false,
      },
      component: () => import('@/views/demo/Request/index.vue'),
    },
  ],
}
