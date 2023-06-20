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
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          isHide: false,
          icon: 'ant-design:dashboard-outlined',
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
            component: () => import('@/views/dashboard/Analysis/index.vue'),
          },
          {
            path: '/dashboard/workbench',
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
      {
        path: '/link',
        name: 'Link',
        meta: {
          title: '外链',
          isHide: false,
          icon: 'ant-design:dashboard-outlined',
        },
        children: [
          {
            path: '/link/baidu',
            name: 'Baidu',
            meta: {
              title: '百度外链',
              isHide: false,
              icon: 'ant-design:dashboard-outlined',
              link: 'https://www.baidu.com',
            },
            component: () => import('@/layout/main/LayoutLink.vue'),
          },
          {
            path: '/link/xigua',
            name: 'LinkXigua',
            meta: {
              title: '西瓜视频',
              isHide: false,
              icon: 'ant-design:dashboard-outlined',
              link: 'https://www.ixigua.com/',
            },
            component: () => import('@/layout/main/LayoutLink.vue'),
          },
        ],
      },
      {
        path: '/iframe-link',
        name: 'IfrmameLink',
        meta: {
          title: '内嵌外链',
          isHide: false,
          icon: 'ant-design:dashboard-outlined',
        },
        children: [
          {
            path: '/iframe-link/doc1',
            name: 'Doc1',
            meta: {
              title: 'nodejs',
              isHide: false,
              icon: 'ant-design:dashboard-outlined',
              link: 'https://nodejs.org/en',
              isIframe: true,
            },
            component: () => import('@/layout/main/LayoutIframe.vue'),
          },
          {
            path: '/iframe-link/doc2',
            name: 'Doc2',
            meta: {
              title: '哔哩哔哩',
              isHide: false,
              icon: 'ant-design:dashboard-outlined',
              link: 'https://www.bilibili.com/',
              isIframe: true,
            },
            component: () => import('@/layout/main/LayoutIframe.vue'),
          },
        ],
      },
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
