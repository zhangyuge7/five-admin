import { defineStore } from 'pinia'
import { shallowRef } from 'vue'
import { ElNotification } from 'element-plus'
import router from '@/router'
import { loginApi, logoutApi, userInfoApi } from '@/api/auth'
import { initMenus } from '@/router/routeHandle'
import { t } from '@/i18n'

const PREFIX = import.meta.env.VITE_APP_STORAGE_PREFIX

export const useUserStore = defineStore('user', () => {
  const token = shallowRef('')
  const userInfo = shallowRef()

  // 登录
  async function login(form) {
    const { ok, data } = await loginApi(form)
    if (ok) {
      token.value = data.token
      loginAfter()
    }
  }
  // 登录之后
  async function loginAfter(path) {
    if (!token.value) {
      router.replace('/login')
      return
    }
    // 初始化用户信息
    const { ok } = await initUserInfo()
    if (ok) {
      // 初始化菜单信息
      await initMenus()
      // 重定向
      await router.replace(path || '/')
      if (!path && token.value) {
        ElNotification({
          title: t('app.welcome'),
          message: userInfo.value?.nickName || '',
          type: 'success',
        })
      }
    }
  }

  // 用户信息
  async function initUserInfo() {
    const { ok, data } = await userInfoApi()
    if (ok)
      userInfo.value = data
    return { ok }
  }
  // 登出
  async function logout() {
    try {
      await logoutApi()
    }
    finally {
      token.value = undefined
      router.replace('/login')
    }
  }

  return { token, userInfo, login, logout, loginAfter }
}, {

  persist: {
    key: `${PREFIX}USER`,
    paths: ['token'],
    storage: localStorage,
  },
})
