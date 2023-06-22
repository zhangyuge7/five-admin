import { defineStore } from 'pinia'
import { shallowRef } from 'vue'
import router from '@/router'
import { loginApi, logoutApi, userInfoApi } from '@/api/auth'

const PREFIX = import.meta.env.VITE_APP_STORAGE_PREFIX

export const useUserStore = defineStore('user', () => {
  const token = shallowRef('')
  const userInfo = shallowRef({
    id: 1,
    username: 'admin',
    nickname: '小铁牛',
    roles: ['admin'],
    avatar: '',
    prems: [],
  })

  // 登录
  async function login(form) {
    const { ok, data } = await loginApi(form)
    if (ok) {
      token.value = data.token
      getUserInfo()
      router.replace('/')
    }
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

  return { token, userInfo, login, logout, getUserInfo }
}, {

  persist: {
    key: `${PREFIX}USER`,
    paths: ['token'],
    storage: localStorage,
  },
})
