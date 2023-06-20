import { defineStore } from 'pinia'
import { ref } from 'vue'
import { store } from '@/stores'
import { login, logout } from '@/api/system'
import router from '@/router'

const PREFIX = import.meta.env.VITE_APP_STORAGE_PREFIX

export const useUserStore = defineStore('user', () => {
  const token = ref('')

  /** 登录 */
  async function doLogin(form) {
    const { ok, data } = await login(form)
    if (ok) {
      token.value = data.token
      router.replace('/')
    }
  }
  /** 登出 */
  async function doLogout() {
    try {
      await logout()
    }
    finally {
      token.value = undefined
      router.replace('/login')
    }
  }

  return { token, doLogin, doLogout }
}, {

  persist: {
    key: `${PREFIX}USER`,
    paths: ['token'],
    storage: localStorage,
  },
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
