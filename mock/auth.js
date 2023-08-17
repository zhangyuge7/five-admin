import { R, baseApi } from '.'

// 定义用户信息
const userList = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
    token: '1',
    nickName: '超级管理员',
    roles: ['admin'],
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    homePath: '/dashboard/analysis',
    perms: ['admin:button'],
  },
  {
    id: 2,
    username: 'test',
    password: 'test',
    token: '2',
    nickName: '测试用户',
    roles: ['test'],
    avatar: '',
    homePath: '',
    perms: ['test:button'],
  },
]
// 定义菜单信息
const menuList = [
  {
    path: '/home',
    name: 'Home',
    component: 'home/index',
    meta: {
      title: 'menus.home',
      isHide: false,
      icon: 'ph:house',
      fixedTab: true,
    },
  },
  {
    path: '/system',
    name: 'System',
    meta: {
      title: '系统管理',
      isHide: false,
      icon: 'icon-park-outline:all-application',
    },
    children: [
      {
        path: '/system/menu',
        name: 'SystemMenu',
        component: 'system/menu/index',
        meta: {
          title: '菜单管理',
          isHide: false,
          icon: 'material-symbols:event-list-outline-rounded',
        },
      },
      {
        path: '/system/user',
        name: 'SystemUser',
        component: 'system/user/index',
        meta: {
          title: '用户管理',
          isHide: false,
          icon: 'ep:user',
        },
      },
      {
        path: '/system/role',
        name: 'SystemRole',
        component: 'system/role/index',
        meta: {
          title: '角色管理',
          isHide: false,
          icon: 'carbon:user-role',
        },
      },
    ],
  },
  {
    path: '/demo',
    name: 'Demo',
    meta: {
      title: 'menus.demo',
      isHide: false,
      icon: 'mdi:ev-plug-chademo',
    },
    children: [
      {
        path: '/link',
        name: 'Link',
        meta: {
          title: 'menus.externalLink',
          isHide: false,
          icon: 'ph:link-light',
        },
        children: [
          {
            path: 'https://www.baidu.com',
            name: 'Baidu',
            meta: {
              title: 'menus.baidu',
              isHide: false,
              icon: 'tabler:brand-baidu',
            },
          },
          {
            path: 'https://www.ixigua.com/',
            name: 'LinkXigua',
            meta: {
              title: 'menus.xigua',
              isHide: false,
              icon: 'icon-park-outline:xigua',
            },
          },
        ],
      },
      {
        path: '/iframe-link',
        name: 'IfrmameLink',
        meta: {
          title: 'menus.iframeLink',
          isHide: false,
          icon: 'material-symbols:join-inner',
        },
        children: [
          {
            path: '/iframe-link/doc1',
            name: 'Doc1',
            meta: {
              title: 'menus.games',
              isHide: false,
              icon: 'mdi:nodejs',
              iframeLink: 'https://games.infinitynewtab.com/',
            },
          },
          {
            path: '/iframe-link/doc2',
            name: 'Doc2',
            meta: {
              title: 'menus.bilibili',
              isHide: false,
              icon: 'tabler:brand-bilibili',
              iframeLink: 'https://www.bilibili.com/',
            },
          },
        ],
      },
      {
        path: '/screen',
        name: 'Screen',
        meta: {
          title: 'menus.dataBigScreen',
          icon: 'ph:monitor-thin',
        },
        children: [
          {
            path: '/screen/1',
            name: 'BigScreen1',
            meta: {
              title: 'menus.dataBigScreen1',
              icon: 'ph:monitor-thin',
              isOuter: true,
            },
            component: 'demo/data-big-screen/BigScreen1',
          },
          {
            path: '/screen/2',
            name: 'BigScreen2',
            meta: {
              title: 'menus.dataBigScreen2',
              icon: 'ph:monitor-thin',
              isOuter: true,
            },
            component: 'demo/data-big-screen/BigScreen2',
          },
        ],

      },
      {
        path: '/demo/permission',
        name: 'Permission',
        meta: {
          title: 'menus.permission',
          icon: 'arcticons:permissionsmanager',
        },
        children: [
          {
            path: '/demo/permission/button',
            name: 'PermissionButton',
            meta: {
              title: 'menus.permissionButton',
              icon: 'ic:twotone-radio-button-unchecked',
            },
            component: 'demo/permission/ButtonPerm',
          },
          {
            path: '/demo/permission/page-admin',
            name: 'PermissionPageAdmin',
            meta: {
              title: 'menus.permissionPage',
              icon: 'streamline:interface-content-book-page-pages-content-books-book-open',
              roles: ['admin'],
            },
            component: 'demo/permission/PagePermAdmin',
          },
          {
            path: '/demo/permission/page-test',
            name: 'PermissionPageTest',
            meta: {
              title: 'menus.permissionPage',
              icon: 'streamline:interface-content-book-page-pages-content-books-book-open',
              roles: ['test'],
            },
            component: 'demo/permission/PagePermTest',
          },
        ],
      },
      {
        path: '/demo/page-keep',
        name: 'PageKeep1',
        meta: {
          title: 'menus.pageKeep',
          icon: 'material-symbols:360',
        },
        children: [
          {
            path: '/demo/page-keep/keep',
            name: 'PageKeep',
            meta: {
              title: 'menus.hasKeep',
              isKeep: true,
            },
            component: 'demo/page-keep/PageKeep',
          },
          {
            path: '/demo/page-keep/not-keep',
            name: 'NotPageKeep',
            meta: {
              title: 'menus.notKeep',
            },
            component: 'demo/page-keep/NotPageKeep',
          },
        ],
      },
      {
        path: '/demo/mitt',
        name: 'Mitt',
        meta: {
          title: 'menus.mitt',
          icon: 'material-symbols:airline-stops',
        },
        component: 'demo/mitt/index',
      },
      {
        path: '/demo/full-screen',
        name: 'FullScreen',
        meta: {
          title: 'menus.fullScreen',
          icon: 'ep:full-screen',
        },
        component: 'demo/full-screen/index',
      },
    ],
  },
]
export default [
  // 登录
  {
    url: `${baseApi}/auth/login`,
    method: 'post',
    response: ({ body }) => {
      let token = ''
      const { username, password } = body
      userList.forEach((user) => {
        if (user.username === username && user.password === password)
          token = user.token
      })

      return token ? R.ok({ token }) : R.fail('用户名或密码错误')
    },
  },
  // 用户信息
  {
    url: `${baseApi}/auth/userInfo`,
    method: 'get',
    response: ({ headers }) => {
      let userInfo
      userList.forEach((user) => {
        if (user.token === headers.authorization)
          userInfo = user
      })
      return userInfo ? R.ok(userInfo) : R.fail('token失效，请重新登录', 401)
    },
  },

  // 菜单信息
  {
    url: `${baseApi}/auth/menuList`,
    method: 'get',
    response: () => {
      return R.ok(menuList)
    },
  },
  // 登出
  {
    url: `${baseApi}/auth/logout`,
    method: 'post',
    response: () => {
      return R.ok()
    },
  },
]
