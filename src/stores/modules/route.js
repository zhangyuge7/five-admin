import { defineStore } from 'pinia'
import { ref } from 'vue'
import TreeOperate from 'tree-operate-j'
import { menuListApi } from '@/api/auth'
import router from '@/router'
import { hasRole } from '@/utils/auth'
import appConfig from '@/appConfig'
import routeModuleList from '@/router/modules'
import { useUserStore } from '@/stores/modules/user'

const { routeSource } = appConfig
// 根路由
const root = {
  path: '/',
  name: 'Root',
  meta: {
    icon: 'ph:house',
    title: 'HOME',
  },
  component: () => import('@/layout/index.vue'),
  redirect: import.meta.env.VITE_APP_HOME_PATH,
}
const layoutIframe = () => import('@/layout/main/LayoutIframe.vue')
const views = import.meta.glob('@/views/**/*.vue')
// 定义需要在 layout 框架外显示的路由列表
const outRoutes = []
// 判断路由是否为外链内嵌路由
function isIframe(route) {
  if (route.meta?.iframeLink) {
    if (route.meta.iframeLink.startsWith('http:') || route.meta.iframeLink.startsWith('https:')) {
      return true
    }
    else {
      console.warn(`${route.path} 路由不符合此框架内嵌外链接规则, route.meta.iframeLink 应以 'http:' 或 'https:' 开头`, route)
      return false
    }
  }
  return false
}

// 处理 component
function handleComponent(route) {
  let url = ''
  if (isIframe(route)) {
    route.component = layoutIframe
  }
  else if (route.component && typeof (route.component) === 'string') {
    url = route.component.endsWith('.vue')
      ? `/src/views/${route.component}`
      : `/src/views/${route.component}.vue`
    route.component = views[url] || null
  }
}
// 获取 homePath
function getHomePath() {
  const { userInfo } = useUserStore()
  return userInfo?.homePath || import.meta.env.VITE_APP_HOME_PATH
}

export const useRouteStore = defineStore('route', () => {
  // 菜单列表
  const menus = ref([])
  // 需要在移除组件时缓存的路由 name 列表
  const keepAliveViews = ref([])

  // 需要在 tabs 标签中固定的路由
  const fiexTabsRoutes = ref([])

  // 来自前端的路由列表
  function fromFrontendRoutes() {
    let data = routeModuleList
    const treeOperate = new TreeOperate({ id: 'path' })
    // 根据角色过滤
    data = treeOperate.filter((route) => {
      if (route.meta?.roles && !hasRole(route.meta.roles))
        return false
      return true
    }, data)
    // 菜单信息赋值
    menus.value = data
    // 遍历路由
    treeOperate.for((route) => {
      const meta = route.meta
      if (meta) {
      // 需要缓存的组件 名称列表
        if (meta.isKeep)
          keepAliveViews.value.push(route.name)
        // 需要在 layout 框架外显示的路由
        if (meta.isOuter)
          outRoutes.push(route)
        // 需要固定标签的路由
        else if (meta.fixedTab)
          fiexTabsRoutes.value.push(route)
      }
    }, data)
    // 获取homePath
    root.redirect = getHomePath()
    // 添加路由到路由器
    root.children = [...data]
    router.addRoute(root)
    // 提升需要在 layout 框架外显示的路由与 root 路由平级
    outRoutes.forEach((outRoute) => {
      router.addRoute(outRoute)
    })
  }

  // 来自后端的路由列表
  async function fromBackendRoutes() {
    // 请求路由
    let { data } = await menuListApi()
    const treeOperate = new TreeOperate({ id: 'path' })
    // 根据角色过滤
    data = treeOperate.filter((route) => {
      if (route.meta?.roles && !hasRole(route.meta.roles))
        return false
      return true
    }, data)
    // 菜单信息赋值
    menus.value = data
    // 遍历路由
    treeOperate.for((route) => {
    // 处理 component
      handleComponent(route)
      const meta = route.meta
      if (meta) {
      // 需要缓存的组件 名称列表
        if (meta.isKeep)
          keepAliveViews.value.push(route.name)
        // 需要在 layout 框架外显示的路由
        if (meta.isOuter)
          outRoutes.push(route)
        // 需要固定标签的路由
        else if (meta.fixedTab)
          fiexTabsRoutes.value.push(route)
      }
    }, data)

    // 获取homePath
    root.redirect = getHomePath()

    // 添加路由到路由器
    root.children = [...data]
    router.addRoute(root)
    // 提升需要在 layout 框架外显示的路由与 root 路由平级
    outRoutes.forEach((outRoute) => {
      router.addRoute(outRoute)
    })
  }
  // 来自前端与后端的路由列表
  async function formMixtureRoutes() {
    // 请求路由
    let { data } = await menuListApi()
    data = [...routeModuleList, ...data]
    const treeOperate = new TreeOperate({ id: 'path' })
    // 根据角色过滤
    data = treeOperate.filter((route) => {
      if (route.meta?.roles && !hasRole(route.meta.roles))
        return false
      return true
    }, data)
    // 菜单信息赋值
    menus.value = data
    // 遍历路由
    treeOperate.for((route) => {
    // 处理 component
      handleComponent(route)
      const meta = route.meta
      if (meta) {
      // 需要缓存的组件 名称列表
        if (meta.isKeep)
          keepAliveViews.value.push(route.name)
        // 需要在 layout 框架外显示的路由
        if (meta.isOuter)
          outRoutes.push(route)
        // 需要固定标签的路由
        else if (meta.fixedTab)
          fiexTabsRoutes.value.push(route)
      }
    }, data)

    // 获取homePath
    root.redirect = getHomePath()
    // 添加路由到路由器
    root.children = [...data]
    router.addRoute(root)
    // 提升需要在 layout 框架外显示的路由与 root 路由平级
    outRoutes.forEach((outRoute) => {
      router.addRoute(outRoute)
    })
  }
  // 初始化菜单列表
  async function initMenus() {
    switch (routeSource) {
      case 'frontend':
        fromFrontendRoutes()
        break
      case 'backend':
        await fromBackendRoutes()
        break
      case 'mixture':
        await formMixtureRoutes()
        break
    }
  }

  // 使用 setup 语法糖的 pinia 自己实现 $reset 方法
  function $reset() {
    menus.value = []
    keepAliveViews.value = []
    fiexTabsRoutes.value = []
  }
  return { menus, keepAliveViews, fiexTabsRoutes, initMenus, $reset }
})
