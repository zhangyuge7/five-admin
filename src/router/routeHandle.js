import _ from 'lodash'
import commonRoutes from './common'
import frontRoutes from './frontend'
import router from '.'
import { useRouteStore } from '@/stores/modules/route'
import appConfig from '@/config/app'
import { menuListApi } from '@/api/auth'
import { hasRole } from '@/utils/auth'
import { useUserStore } from '@/stores/modules/user'
import FullLoading from '@/utils/loading'

const layoutLink = () => import('@/layout/main/LayoutLink.vue')
const layoutIframe = () => import('@/layout/main/LayoutIframe.vue')

const views = import.meta.glob('@/views/**/*.vue')

// 根路由
const root = {
  path: '/',
  name: 'Root',
  component: () => import('@/layout/index.vue'),
  redirect: import.meta.env.VITE_APP_HOME_PATH,
}

// 构建公共路由表
export function buildCommonRoutes() {
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
// 根据路由的 path去重 并根据 meta.sotr 排序
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
// 递归排序去重
function sortAndUniqueAll(routes) {
  routes.forEach((route) => {
    if (route.children && route.children.length > 0)
      route.children = sortAndUniqueAll(route.children)
  })
  return sortAndUnique(routes)
}

// 初始化菜单信息。应在用户登录后调用
export async function initMenus() {
  // 如果配置不正确，给出错误提示并停止
  if (!isMixtureRoute() && !isBackRoute() && !isFrontRoute()) {
    console.error('/src/config/app.js routeSource配置应为\'front\' 前端 | \'back\' 后端 | \'mixture\' 前后端都有')
    return
  }

  // 全屏loading动画执行
  FullLoading.start()

  // 定义原始路由信息数据
  let rawRoutes = []
  // 获取前后端所有路由信息
  if (isMixtureRoute()) {
    const { data, ok } = await menuListApi()
    if (ok)
      rawRoutes = [...frontRoutes, ...data, ...commonRoutes]
    else
      rawRoutes = [...frontRoutes, ...commonRoutes]
  }
  // 获取后端路由信息
  else if (isBackRoute()) {
    const { data, ok } = await menuListApi()
    if (ok)
      rawRoutes = [...data, ...commonRoutes]
    else
      rawRoutes = [...commonRoutes]
  }
  // 获取前端路由信息
  else if (isFrontRoute()) {
    rawRoutes = [...frontRoutes, ...commonRoutes]
  }
  // 排序并去重
  rawRoutes = sortAndUniqueAll(rawRoutes)
  // 数据深拷贝，避免路由处理过程中对原数据造成污染
  const routes = _.cloneDeep(rawRoutes)

  // 初始化需要固定在标签页的路由
  initFixedTabRoutes(routes)

  // 设置用户的 homePath
  root.redirect = getHomePath()

  // 清空路由器中现有的路由表
  clearRoutes()

  // 转二级路由并根据角色权限过滤
  const twoRoutes = multToTwo(routes, true)
  twoRoutes.forEach((route) => {
    // 递归处理 component
    handleComponent(route)
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
  FullLoading.done(300)
}
function getHomePath() {
  const { userInfo } = useUserStore()
  return userInfo?.homePath || import.meta.env.VITE_APP_HOME_PATH
}
// 递归处理路由的 component 属性
function handleComponent(route) {
  let url = ''
  if (route.meta?.link) {
    if (route.meta?.isIframe)
      route.component = layoutIframe
    else
      route.component = layoutLink
  }
  else if (route.component && typeof (route.component) === 'string') {
    url = route.component.endsWith('.vue')
      ? `/src/views/${route.component}`
      : `/src/views/${route.component}.vue`
    route.component = views[url] || null
  }

  if (route.children) {
    route.children.forEach((item) => {
      handleComponent(item)
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

// 初始化需要固定在标签页的路由
function initFixedTabRoutes(routes) {
  const routeStore = useRouteStore()
  const fixedTabRoutes = []
  findFixedTabRoutes(routes, fixedTabRoutes)
  routeStore.fiexTabsRoutes = fixedTabRoutes
}
// 查找所有 需要固定在标签页的路由
function findFixedTabRoutes(routes, fixedTabRoutes) {
  routes.forEach((route) => {
    if (route.meta?.fixedTab) {
      fixedTabRoutes.push({
        path: route.path,
        name: route.name,
        meta: {
          title: route.meta?.title,
          isHide: route.meta?.isHide,
          icon: route.meta?.icon,
          fixedTab: route.meta?.fixedTab,
        },
      })
    }
    if (route.children && route.children.length)
      findFixedTabRoutes(route.children, fixedTabRoutes)
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
