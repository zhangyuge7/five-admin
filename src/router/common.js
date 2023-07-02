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
    path: '/user-info',
    name: 'UserInfo',
    meta: {
      title: 'menus.personalCenter',
      icon: 'ep:user',
    },
    component: () => import('@/views/user-info/index.vue'),
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
