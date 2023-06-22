import { defineStore } from 'pinia'
import { ref } from 'vue'

const PREFIX = import.meta.env.VITE_APP_STORAGE_PREFIX

export const useRouteStore = defineStore('route', () => {
  const routes = ref([])
  const menus = ref([])
  return { routes, menus }
}, {
  persist: {
    key: `${PREFIX}route`,
    paths: ['menus'],
    storage: sessionStorage,
  },
})
