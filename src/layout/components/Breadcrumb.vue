<script setup>
import { shallowRef, toRaw, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRouteStore } from '@/stores/modules/route'
import SvgIcon from '@/components/SvgIcon/index.vue'

const route = useRoute()
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
watch(() => route.path, (val) => {
  routes.value = findRoute(rawRoutes, val)
}, { immediate: true })
</script>

<template>
  <div class="fv-breadcrumb">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item v-for="item in routes" :key="item.path" :to="{ path: item.path }">
        <div class="flex">
          <el-icon v-if="item.meta?.icon">
            <SvgIcon :name="item.meta.icon" />
          </el-icon>
          <span style="margin-left: 3px;">
            {{ $t(item.meta?.title) }}
          </span>
        </div>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped>
:deep(.el-breadcrumb__separator){
  margin: 0 5px;
}
</style>
