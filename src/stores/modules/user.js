import { defineStore } from 'pinia'
import { shallowRef } from 'vue'
import { ElNotification } from 'element-plus'
import router from '@/router'
import { loginApi, logoutApi, userInfoApi } from '@/api/auth'
import { initMenus } from '@/router/fun'

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
    await initUserInfo()
    // 初始化菜单信息
    await initMenus()
    // 重定向
    await router.replace(path || '/')
    if (!path) {
      ElNotification({
        title: '欢迎回来',
        message: userInfo.value.nickname,
        type: 'success',
      })
    }
  }

  // 用户信息
  async function initUserInfo() {
    const { ok, data } = await userInfoApi()
    if (ok)
      userInfo.value = data
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
