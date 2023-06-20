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
    children: [
      {
        path: '',
        name: 'Dashboard',
        redirect: '/analysis',
        children: [
          {
            path: 'analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis/index.vue'),
          },
          {
            path: 'workbench',
            name: 'Workbench',
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
    component: () => import('@/views/Login/index.vue'),
  },
]

export default constantRoutes
