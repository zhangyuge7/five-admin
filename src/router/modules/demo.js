export default {
  path: 'demo',
  name: 'Demo',
  children: [
    {
      path: 'demo1',
      name: 'Demo1',
      component: () => import('@/views/demo/Demo1/index.vue'),
    },
    {
      path: 'request',
      name: 'Request',
      component: () => import('@/views/demo/Request/index.vue'),
    },
  ],
}
