import { defineStore } from 'pinia'
import { ref } from 'vue'
import { store } from '@/stores'
import sysGlobalConfig from '@/config/app.js'

const PREFIX = import.meta.env.VITE_APP_STORAGE_PREFIX

export const useAppStore = defineStore('app', () => {
  const appConfig = ref({ ...sysGlobalConfig })

  return { appConfig }
}, {
  persist: {
    key: `${PREFIX}APPCONFIG`,
    paths: ['appConfig.defaultLanguage', 'appConfig.elementSize'],
    storage: localStorage,
    debug: true, // 输出持久化错误信息
  },
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}
