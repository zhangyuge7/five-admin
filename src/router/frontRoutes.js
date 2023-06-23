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
      sort: 0,
    },
    children: [
      {
        path: '/dashboard/analysis',
        name: 'Analysis',
        meta: {
          title: '分析页',
          isHide: false,
          icon: 'ep:data-analysis',
          isKeep: true,
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
  {
    path: '/link',
    name: 'Link',
    meta: {
      title: '外链',
      isHide: false,
      icon: 'ph:link-light',
    },
    children: [
      {
        path: '/link/baidu',
        name: 'Baidu',
        meta: {
          title: '百度外链',
          isHide: false,
          icon: 'tabler:brand-baidu',
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
          icon: 'icon-park-outline:xigua',
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
      icon: 'material-symbols:join-inner',
    },
    children: [
      {
        path: '/iframe-link/doc1',
        name: 'Doc1',
        meta: {
          title: 'nodejs',
          isHide: false,
          icon: 'mdi:nodejs',
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
          icon: 'tabler:brand-bilibili',
          link: 'https://www.bilibili.com/',
          isIframe: true,
        },
        component: () => import('@/layout/main/LayoutIframe.vue'),
      },
    ],
  },
  {
    path: '/screen',
    name: 'Screen',
    meta: {
      title: '数据大屏',
      icon: 'ph:monitor-thin',
    },
    children: [
      {
        path: '/screen/1',
        name: 'BigScreen1',
        meta: {
          title: '数据大屏1',
          icon: 'ph:monitor-thin',
          isOuter: true,
          isKeep: true,
        },
        component: () => import('@/views/demo/data-big-screen/BigScreen1.vue'),
      },
      {
        path: '/screen/2',
        name: 'BigScreen2',
        meta: {
          title: '数据大屏2',
          icon: 'ph:monitor-thin',
          isOuter: true,
          isKeep: true,
        },
        component: () => import('@/views/demo/data-big-screen/BigScreen2.vue'),
      },
    ],

  },
  ...routeModuleList,
]
