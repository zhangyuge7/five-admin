import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRouteStore = defineStore('route', () => {
  // 菜单列表
  const menus = ref([])
  // 需要在移除组件时缓存的路由 name 列表
  const keepAliveViews = ref([])

  return { menus, keepAliveViews }
})
