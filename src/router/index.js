import { createRouter, createWebHashHistory } from 'vue-router'
import { buildCommonRoutes } from './routeHandle'
import { hasToken } from '@/utils/auth'
import { t } from '@/i18n'
import { useAppStore } from '@/stores/modules/app'
import { useUserStore } from '@/stores/modules/user'
import { useRouteStore } from '@/stores/modules/route'

const commonRoutes = buildCommonRoutes()
const router = createRouter({
  history: createWebHashHistory(),
  routes: commonRoutes,
})

// 前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    if (hasToken())
      next('/')
    else
      next()
  }
  else {
    if (hasToken()) {
      const userStore = useUserStore()
      const routeStore = useRouteStore()
      if (!routeStore.menus || !routeStore.menus.length)
        userStore.loginAfter(to.path)
      else
        next()
    }
    else {
      next('/login')
    }
  }
})
// 后置守卫
router.afterEach((to) => {
  const appStore = useAppStore()
  // 判断动态 html 标题是否开启
  if (appStore.appConfig.dynamicTitle)
    document.title = `${import.meta.env.VITE_APP_TITLE} - ${t(to.meta?.title || '')}`
})
function setupRouter(app) {
  app.use(router)
}
export default router
export { setupRouter }
