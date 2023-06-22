import { R, baseApi } from '.'

export default [
  // 登录
  {
    url: `${baseApi}/login`,
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      if (username !== 'admin')
        return R.fail('用户名不存在')

      else if (password !== 'admin')
        return R.fail('密码错误')

      return R.ok({ token: 'token12321' })
    },
  },
  // 用户信息
  {
    url: `${baseApi}/getUserInfo`,
    method: 'get',
    response: () => {
      const userInfo = {
        id: 1,
        username: 'admin',
        nickname: '小铁牛',
        roles: ['admin'],
        avatar: '',
        prems: [],
      }
      return R.ok(userInfo)
    },
  },

  // 路由信息
  {
    url: `${baseApi}/getMenuList`,
    method: 'get',
    response: () => {
      const menus = [
        {
          path: '/home',
          name: 'Home',
          component: 'home/index',
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
              component: 'dashboard/analysis/index',
            },
            {
              path: '/dashboard/workbench',
              name: 'Workbench',
              meta: {
                title: '工作台',
                isHide: false,
                icon: 'icon-park-outline:workbench',
              },
              component: 'dashboard/workbench/index',
            },
          ],
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
      ]
      return R.ok(menus)
    },
  },
  // 登出
  {
    url: `${baseApi}/logout`,
    method: 'post',
    response: () => {
      return R.ok()
    },
  },
]
