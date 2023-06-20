import { createRouter, createWebHashHistory } from 'vue-router'
import constantRoutes from './constant'
import { localCache } from '@/utils/cache'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [...constantRoutes],
})
// 白名单
const whiteList = []
// 前置守卫
router.beforeEach((to, from, next) => {
  const userCache = localCache.get('USER')
  const hasToken = !!userCache && !!userCache.token

  if (whiteList.includes(to.path)) {
    next()
  }
  else if (to.path === '/login') {
    if (hasToken)
      next('/')
    else
      next()
  }
  else {
    if (hasToken)
      next()
    else
      next('/login')
  }
})

export default router

export function setupRouter(app) {
  app.use(router)
}
