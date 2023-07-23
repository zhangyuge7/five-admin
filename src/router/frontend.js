// 加入到路由集合中
const modules = import.meta.globEager('./modules/**/*.js')
const routeModuleList = []
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

export default [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: 'menus.home',
      isHide: false,
      icon: 'ph:house',
      fixedTab: true,
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    redirect: '/dashboard/analysis',
    meta: {
      title: 'menus.dashboard',
      isHide: false,
      icon: 'ant-design:dashboard-outlined',

    },
    children: [
      {
        path: '/dashboard/analysis',
        name: 'Analysis',
        meta: {
          title: 'menus.analysis',
          isHide: false,
          icon: 'ep:data-analysis',
        },
        component: () => import('@/views/dashboard/analysis/index.vue'),
      },
      {
        path: '/dashboard/workbench',
        name: 'Workbench',
        meta: {
          title: 'menus.workbench',
          isHide: false,
          icon: 'icon-park-outline:workbench',
        },
        component: () => import('@/views/dashboard/workbench/index.vue'),
      },
    ],
  },
  {
    path: '/user-info',
    name: 'UserInfo',
    meta: {
      title: 'menus.personalCenter',
      icon: 'ep:user',
    },
    component: () => import('@/views/user-info/index.vue'),
  },
  ...routeModuleList,
]
