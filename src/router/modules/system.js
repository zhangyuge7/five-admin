export default [
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
        component: () => import('@/views/system/menu/index.vue'),
        meta: {
          title: '菜单管理',
          isHide: false,
          icon: 'material-symbols:event-list-outline-rounded',
        },
      },
      {
        path: '/system/user',
        name: 'SystemUser',
        component: () => import('@/views/system/user/index.vue'),
        meta: {
          title: '用户管理',
          isHide: false,
          icon: 'ep:user',
        },
      },
      {
        path: '/system/role',
        name: 'SystemRole',
        component: () => import('@/views/system/role/index.vue'),
        meta: {
          title: '角色管理',
          isHide: false,
          icon: 'carbon:user-role',
        },
      },
    ],
  },
]
