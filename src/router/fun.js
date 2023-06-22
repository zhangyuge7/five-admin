import _ from 'lodash'
import commonRoutes from './commonRoutes'
import frontRoutes from './frontRoutes'
import router, { whiteList } from '.'
import { useUserStore } from '@/stores/modules/user'
import { useRouteStore } from '@/stores/modules/route'
import Layout from '@/layout/index.vue'
import appConfig from '@/config/app'
import { menuListApi } from '@/api/auth'

const views = import.meta.glob('@/views/**/*.vue')

// 根路由
const root = {
  path: '/',
  name: 'Root',
  component: Layout,
  redirect: import.meta.env.VITE_APP_HOME_PATH,
}

// 路由前置守卫
export function routerBeforeEach(to, from, next) {
  const useUser = useUserStore()
  const hasToken = !!useUser.token

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
}

// 构建路由表
export function buildRoutes() {
  // 处理为数组
  const innerRoutes = []
  const outerRoutes = []
  const rawRoutes = isFrontRoute() ? frontRoutes.concat(commonRoutes) : commonRoutes
  const routes = _.cloneDeep(rawRoutes)
  multToTwo(routes, innerRoutes, outerRoutes)
  // 将所有路由作为根路由下的二级路由
  root.children = innerRoutes
  // 返回路由信息
  return [
    root,
    ...outerRoutes, // 大屏作为一级路由与根路由平级，会在框架外显示页面
  ]
}

// 多级路由转数组
function multToTwo(routes, innerRoutes, outerRoutes) {
  classification(routes, innerRoutes, outerRoutes)
  innerRoutes.forEach((route) => {
    route.children = null
  })
  outerRoutes.forEach((route) => {
    route.children = null
  })
}

// 递归路由分类。框架内展示的路由与框架外展示的路由
function classification(routes, innerRoutes, outerRoutes) {
  routes.forEach((route) => {
    route.meta?.isOuter ? outerRoutes.push(route) : innerRoutes.push(route)
    if (route.children)
      classification(route.children, innerRoutes, outerRoutes)
  })
}

// 初始化菜单信息
export function initMenus() {
  if (isBackRoute()) {
    getBackRoutes()
  }
  else if (isFrontRoute()) {
    const routeStore = useRouteStore()
    routeStore.menus = [...frontRoutes, ...commonRoutes]
  }
}
// 获取后端路由信息
async function getBackRoutes() {
  // 请求后端接口获取菜单路由信息
  const { data } = await menuListApi()

  // 转二级路由
  const innerRoutes = []
  const outerRoutes = []
  const routes = _.cloneDeep(data)
  multToTwo(routes, innerRoutes, outerRoutes)

  // 添加进路由器
  innerRoutes.forEach((route) => {
    initComponent(route)
    root.children.push(route)
  })
  outerRoutes.forEach((route) => {
    initComponent(route)
    router.addRoute(route)
  })
  router.addRoute(root)
  // 存储菜单信息到 pinia 仓库
  const routeStore = useRouteStore()
  routeStore.menus = data || []
}
// 初始化路由的 component 属性
function initComponent(route) {
  let url = ''
  if (route.component) {
    url = route.component.endsWith('.vue')
      ? `/src/views/${route.component}`
      : `/src/views/${route.component}.vue`
    route.component = views[url]
  }
}

export function isFrontRoute() {
  return appConfig.routeSource === 'front'
}
export function isBackRoute() {
  return appConfig.routeSource === 'back'
}
export function isMixtureRoute() {
  return appConfig.routeSource === 'mixture'
}
