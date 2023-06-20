import Layout from '@/layout/index.vue'

// 加入到路由集合中
const modules = import.meta.globEager('./modules/**/*.js')
const routeModuleList = []
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

const constantRoutes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    meta: {
      isHide: true,
      hideChildren: false,
    },
    children: [
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
            path: 'analysis',
            name: 'Analysis',
            meta: {
              title: '分析页',
              isHide: false,
              icon: 'ep:data-analysis',
            },
            component: () => import('@/views/dashboard/Analysis/index.vue'),
          },
          {
            path: 'workbench',
            name: 'Workbench',
            meta: {
              title: '工作台',
              isHide: false,
              icon: 'icon-park-outline:workbench',
            },
            component: () => import('@/views/dashboard/Workbench/index.vue'),
          },
        ],
      },
      ...routeModuleList,
    ],
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      isHide: true,
    },
    component: () => import('@/views/Login/index.vue'),
  },
]

export default constantRoutes
