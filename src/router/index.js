import { createRouter, createWebHashHistory } from 'vue-router'
import baseRoutes from './base'
import useAuth from '@/hooks/useAuth'
import { t } from '@/i18n'
import { useAppStore } from '@/stores/modules/app'
import { useUserStore } from '@/stores/modules/user'
import PageLoading from '@/utils/pageLoading'

export const WHITE_LIST = []

const router = createRouter({
  history: createWebHashHistory(),
  routes: baseRoutes,
})

// 前置守卫
router.beforeEach((to, from, next) => {
  PageLoading.start()
  const { hasToken } = useAuth()
  if (to.path === '/login') {
    if (hasToken)
      next('/')
    else
      next()
  }
  else if (WHITE_LIST.includes(to.path)) {
    next()
  }
  else {
    if (hasToken) {
      const userStore = useUserStore()
      if (!userStore.userInfo)
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
  if (appStore.appConfig.dynamicTitle) {
    if (to.meta?.title)
      document.title = `${import.meta.env.VITE_APP_TITLE} - ${t(to.meta?.title)}`
    else
      document.title = import.meta.env.VITE_APP_TITLE
  }
  PageLoading.done()
})
function setupRouter(app) {
  app.use(router)
}
export default router
export { setupRouter }
