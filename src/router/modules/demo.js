export default {
  path: '/demo',
  name: 'Demo',
  meta: {
    title: '演示',
    isHide: false,
    icon: 'mdi:ev-plug-chademo',
  },
  children: [
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
            title: 'games',
            isHide: false,
            icon: 'mdi:nodejs',
            link: 'https://games.infinitynewtab.com/',
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
          },
          component: () => import('@/views/demo/data-big-screen/BigScreen2.vue'),
        },
      ],

    },
    {
      path: '/demo/permission',
      name: 'Permission',
      meta: {
        title: '权限控制',
        icon: 'arcticons:permissionsmanager',
      },
      children: [
        {
          path: '/demo/permission/button',
          name: 'PermissionButton',
          meta: {
            title: '按钮权限',
            icon: 'ic:twotone-radio-button-unchecked',
          },
          component: () => import('@/views/demo/permission/ButtonPerm.vue'),
        },
        {
          path: '/demo/permission/page-admin',
          name: 'PermissionPageAdmin',
          meta: {
            title: '页面权限',
            icon: 'streamline:interface-content-book-page-pages-content-books-book-open',
            roles: ['admin'],
          },
          component: () => import('@/views/demo/permission/PagePermAdmin.vue'),
        },
        {
          path: '/demo/permission/page-test',
          name: 'PermissionPageTest',
          meta: {
            title: '页面权限',
            icon: 'streamline:interface-content-book-page-pages-content-books-book-open',
            roles: ['test'],
          },
          component: () => import('@/views/demo/permission/PagePermTest.vue'),
        },
      ],
    },
    {
      path: '/demo/page-keep',
      name: 'PageKeep1',
      meta: {
        title: '页面缓存',
        icon: 'material-symbols:360',
      },
      children: [
        {
          path: '/demo/page-keep/keep',
          name: 'PageKeep',
          meta: {
            title: '缓存页面',
            isKeep: true,
          },
          component: () => import('@/views/demo/page-keep/PageKeep.vue'),
        },
        {
          path: '/demo/page-keep/not-keep',
          name: 'NotPageKeep',
          meta: {
            title: '不缓存页面',
          },
          component: () => import('@/views/demo/page-keep/NotPageKeep.vue'),
        },
      ],
    },
  ],
}
