<script setup>
import { shallowRef, toRaw, watch } from 'vue'
import { useRouteStore } from '@/stores/modules/route'
import router from '@/router'
import SvgIcon from '@/components/SvgIcon/index.vue'

// 获取原路由信息
// 因为路由全部处理成了二级路由，使用 useRoute 并不能找到上下级关系，所以自己处理
const routeStore = useRouteStore()
const rawRoutes = toRaw(routeStore.menus)
const routes = shallowRef([])

// 递归查找当前路由
function findRoute(rawRoutes, path) {
  for (const route of rawRoutes) {
    if (route.path === path)
      return [route]
    if (route.children && route.children.length) {
      const node = findRoute(route.children, path)
      if (node && node.length)
        return [route, ...node]
    }
  }
  return []
}
// 侦听路由变化
watch(() => router.currentRoute.value, (val) => {
  routes.value = findRoute(rawRoutes, val.path)
}, { immediate: true })
</script>

<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="route in routes" :key="route.path" :to="{ path: route.path }">
        <div class="flex">
          <el-icon v-if="route.meta?.icon">
            <SvgIcon :name="route.meta.icon" />
          </el-icon>
          <span style="margin-left: 3px;">
            {{ route.meta?.title }}
          </span>
        </div>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
