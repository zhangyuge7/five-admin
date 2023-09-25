// 基础路由
const baseRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/:path(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error-page/404.vue'),
  },
]

export default baseRoutes
