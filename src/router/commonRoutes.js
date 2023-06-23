export default [
  {
    path: '/login',
    name: 'Login',
    meta: {
      isHide: true,
      isOuter: true,
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/:path(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    meta: {
      isHide: true,
    },
  },
]
