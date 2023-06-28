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
      title: '首页',
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
      title: '仪表盘',
      isHide: false,
      icon: 'ant-design:dashboard-outlined',

    },
    children: [
      {
        path: '/dashboard/analysis',
        name: 'Analysis',
        meta: {
          title: '分析页',
          isHide: false,
          icon: 'ep:data-analysis',
        },
        component: () => import('@/views/dashboard/analysis/index.vue'),
      },
      {
        path: '/dashboard/workbench',
        name: 'Workbench',
        meta: {
          title: '工作台',
          isHide: false,
          icon: 'icon-park-outline:workbench',
        },
        component: () => import('@/views/dashboard/workbench/index.vue'),
      },
    ],
  },
  ...routeModuleList,
]
