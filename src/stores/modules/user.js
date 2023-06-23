import { defineStore } from 'pinia'
import { shallowRef } from 'vue'
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
  async function loginAfter(url = '/') {
    if (!token.value) {
      router.replace('/login')
      return
    }
    await getUserInfo()
    await initMenus()
    router.replace(url)
  }

  // 用户信息
  async function getUserInfo() {
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
