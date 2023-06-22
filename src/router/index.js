import { createRouter, createWebHashHistory } from 'vue-router'
import { buildRoutes, routerBeforeEach } from './fun'

const routes = buildRoutes()
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})
// 白名单
const whiteList = []
// 前置守卫
router.beforeEach((to, from, next) => routerBeforeEach(to, from, next))

function setupRouter(app) {
  app.use(router)
}
export default router
export { setupRouter, whiteList, routes }
