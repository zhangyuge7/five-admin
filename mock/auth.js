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
export default [
  // 登录
  {
    url: `${baseApi}/login`,
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
    url: `${baseApi}/getUserInfo`,
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
    url: `${baseApi}/getMenuList`,
    method: 'get',
    response: () => {
      return R.ok(menuList)
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
