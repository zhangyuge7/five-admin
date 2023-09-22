import appConfig from '@/appConfig'

const { innerNotFound } = appConfig
// 基础路由
const baseRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
  },
  // ...定义在这里
]

if (!innerNotFound) {
  baseRoutes.push({
    path: '/:path(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error-page/404.vue'),
  })
}

export default baseRoutes
