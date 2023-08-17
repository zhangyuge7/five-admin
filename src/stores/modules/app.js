import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import sysGlobalConfig from '@/appConfig'
import { cancelColorWeakness, cancelGray, setColorWeakness, setGray } from '@/utils/theme'

const PREFIX = import.meta.env.VITE_APP_STORAGE_PREFIX

export const useAppStore = defineStore('app', () => {
  const appConfig = ref({ ...sysGlobalConfig })

  // 侦听灰色模式
  watch(() => appConfig.value.enableGray, (val) => {
    val ? setGray() : cancelGray()
  }, { immediate: true })

  // 侦听色弱模式
  watch(() => appConfig.value.enableColorWeakness, (val) => {
    val ? setColorWeakness() : cancelColorWeakness()
  }, { immediate: true })

  return { appConfig }
}, {
  persist: {
    key: `${PREFIX}APPCONFIG`,
    paths: ['appConfig.defaultLanguage', 'appConfig.elementSize'],
    storage: localStorage,
    debug: true, // 输出持久化错误信息
  },
})
