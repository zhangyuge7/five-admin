import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRouteStore = defineStore('route', () => {
  const menus = ref([])
  const keepAliveViews = ref([])

  return { menus, keepAliveViews }
})
