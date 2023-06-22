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
  // 如果配置为前端控制路由，获取前端路由及公共路由；如果配置为后端控制路由，仅获取公共路由，
  const rawRoutes = isFrontRoute() ? frontRoutes.concat(commonRoutes) : commonRoutes
  // 深拷贝路由列表，避免后续操作过程对原路由列表造成不可修复问题
  const routes = _.cloneDeep(rawRoutes)
  // 将路由列表转为二级路由
  return multToTwo(routes)
}

// 转二级路由
function multToTwo(routes) {
  // 需要在 layout 框架内显示的路由
  const innerRoutes = []
  // 需要在 layout 框架外显示的路由
  const outerRoutes = []

  // 分类拆解为路由数组
  classification(routes, innerRoutes, outerRoutes)

  // 将需要在 layout 框架内显示的路由作为根路由下的二级路由
  root.children = innerRoutes
  // 返回路由信息
  return [
    root,
    ...outerRoutes, // 需要在 layout 框架外显示的路由作为一级路由与根路由平级
  ]
}

// 递归路由分类。框架内展示的路由与框架外展示的路由
function classification(routes, innerRoutes, outerRoutes) {
  routes.forEach((route) => {
    route.meta?.isOuter ? outerRoutes.push(route) : innerRoutes.push(route)
    if (route.children) {
      classification(route.children, innerRoutes, outerRoutes)
      route.children = null
    }
  })
}

// 初始化菜单信息。应在 菜单组件中调用
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
  const rawRoutes = data || []
  const routes = _.cloneDeep(rawRoutes)
  // 转二级路由并添加到路由器
  multToTwo(routes).forEach((route) => {
    initComponent(route)
    router.addRoute(route)
  })

  // 存储菜单信息到 pinia 仓库
  const routeStore = useRouteStore()
  routeStore.menus = data || []
}
// 初始化路由的 component 属性
function initComponent(route) {
  let url = ''
  if (route.component && typeof (route.component) === 'string') {
    url = route.component.endsWith('.vue')
      ? `/src/views/${route.component}`
      : `/src/views/${route.component}.vue`
    route.component = views[url]
  }
  if (route.children) {
    route.children.forEach((item) => {
      initComponent(item)
    })
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
