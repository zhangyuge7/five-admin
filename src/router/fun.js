import _ from 'lodash'
import commonRoutes from './commonRoutes'
import frontRoutes from './frontRoutes'
import router from '.'
import { useRouteStore } from '@/stores/modules/route'
import appConfig from '@/config/app'
import { menuListApi } from '@/api/auth'
import { hasRole, hasToken } from '@/utils/auth'
import { useUserStore } from '@/stores/modules/user'
import { fiveLoading } from '@/utils/loading'

const views = import.meta.glob('@/views/**/*.vue')

// 根路由
const root = {
  path: '/',
  name: 'Root',
  component: () => import('@/layout/index.vue'),
  redirect: import.meta.env.VITE_APP_HOME_PATH,
}

// 路由前置守卫
export function routerBeforeEach(to, from, next) {
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
}

// 构建路由表
export function buildRoutes() {
  // 仅构建公共路由文件中的路由
  const rawRoutes = commonRoutes
  // 深拷贝路由列表，避免后续操作过程对原路由列表造成不可修复问题
  const routes = _.cloneDeep(rawRoutes)
  // 将路由列表转为二级路由
  return multToTwo(routes)
}

// 转二级路由
function multToTwo(routes, isFilterByRole = false) {
  // 需要在 layout 框架内显示的路由
  const innerRoutes = []
  // 需要在 layout 框架外显示的路由
  const outerRoutes = []

  // 分类拆解为路由数组并根据角色值过滤
  conversion(routes, innerRoutes, outerRoutes, isFilterByRole)

  // 将需要在 layout 框架内显示的路由作为根路由下的二级路由
  root.children = innerRoutes

  // 返回路由信息
  return [
    root,
    ...outerRoutes, // 需要在 layout 框架外显示的路由作为一级路由与根路由平级
  ]
}

// 递归路由转为数组，并根据角色值过滤和决定在框架内展示的路由与框架外展示的路由
function conversion(routes, innerRoutes, outerRoutes, isFilterByRole) {
  if (isFilterByRole) {
    routes.forEach((route) => {
      if (route.meta?.roles && hasRole(route.meta.roles)) {
        route.meta?.isOuter ? outerRoutes.push(route) : innerRoutes.push(route)
        if (route.children) {
          conversion(route.children, innerRoutes, outerRoutes, isFilterByRole)
          route.children = null
        }
      }
      else if (!route.meta?.roles) {
        route.meta?.isOuter ? outerRoutes.push(route) : innerRoutes.push(route)
        if (route.children) {
          conversion(route.children, innerRoutes, outerRoutes, isFilterByRole)
          route.children = null
        }
      }
    })
  }
  else {
    routes.forEach((route) => {
      route.meta?.isOuter ? outerRoutes.push(route) : innerRoutes.push(route)
      if (route.children) {
        conversion(route.children, innerRoutes, outerRoutes, isFilterByRole)
        route.children = null
      }
    })
  }
}

// 存储需要 KeepAlive 的路由名称
function initKeepAliveViews(routes, names) {
  routes.forEach((route) => {
    if (route.meta?.isKeep)
      names.push(route.name)
    if (route.children)
      initKeepAliveViews(route.children, names)
  })
}

// 判断是否有非 null | undefined 值
function hasVal(val) {
  if (val === null || val === undefined)
    return false
  return true
}
// 根据路由的 path去重 并根据 meta.sotr 排序并
export function sortAndUnique(routes) {
  routes = _.unionBy(routes, 'path')
  routes.sort((a, b) => {
    if (hasVal(a.meta?.sort) && hasVal(b.meta?.sort))
      return a.meta.sort - b.meta.sort
    if (!hasVal(a.meta?.sort) && hasVal(b.meta?.sort))
      return 1
    if (hasVal(a.meta?.sort) && !hasVal(b.meta?.sort))
      return -1
    return 0
  })

  return routes
}

// 初始化菜单信息。应在用户登录后调用
export async function initMenus() {
  // 如果配置不正确，给出错误提示并停止
  if (!isFrontRoute() && !isBackRoute() && !isMixtureRoute()) {
    console.error('/src/config/app.js routeSource配置应为\'front\' 前端 | \'back\' 后端 | \'mixture\' 混合前后端')
    return
  }

  // 全屏loading动画执行
  fiveLoading.start()
  // 默认获取前端路由信息
  let rawRoutes = [...frontRoutes, ...commonRoutes]
  // 获取后端路由信息
  if (isBackRoute()) {
    const { data } = await menuListApi()
    rawRoutes = data ? [...data, ...commonRoutes] : [...commonRoutes]
  }
  // 获取前后端所有路由信息
  if (isMixtureRoute()) {
    const { data } = await menuListApi()
    rawRoutes = data ? [...frontRoutes, ...data, ...commonRoutes] : [...frontRoutes, ...commonRoutes]
    rawRoutes = sortAndUnique(rawRoutes)
  }
  // 数据深拷贝，避免路由处理过程中对原数据造成污染
  const routes = _.cloneDeep(rawRoutes)
  // 清空路由器中现有的路由表
  clearRoutes()
  // 设置用户的 homePath
  const { userInfo } = useUserStore()
  root.redirect = userInfo.homePath || import.meta.env.VITE_APP_HOME_PATH

  // 转二级路由并根据角色权限过滤
  const twoRoutes = multToTwo(routes, true)

  twoRoutes.forEach((route) => {
    // 处理 component
    initComponent(route)
    // 添加进路由器
    router.addRoute(route)
  })
  // 初始化菜单列表
  const routeStore = useRouteStore()
  routeStore.menus = rawRoutes
  // 初始化需要 KeepAlive 的路由名称
  const names = []
  initKeepAliveViews(twoRoutes, names)
  routeStore.keepAliveViews = names
  // 全屏loading动画关闭
  fiveLoading.done(300)
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
// 清空路由器所有路由
function clearRoutes() {
  router.getRoutes().forEach((route) => {
    if (!route.path.includes(':'))
      router.removeRoute(route.name)
  })
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
