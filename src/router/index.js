import { createRouter, createWebHashHistory } from 'vue-router'
import { buildCommonRoutes, routerBeforeEach } from './routeHandle'

const commonRoutes = buildCommonRoutes()
const router = createRouter({
  history: createWebHashHistory(),
  routes: commonRoutes,
})

// 前置守卫
router.beforeEach((to, from, next) => routerBeforeEach(to, from, next))

function setupRouter(app) {
  app.use(router)
}
export default router
export { setupRouter }
