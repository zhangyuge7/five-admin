<script setup>
import { computed } from 'vue'
import MenuItem from './MenuItem.vue'
import router from '@/router'
import { useAppStore } from '@/stores/modules/app'
import { useRouteStore } from '@/stores/modules/route'

const routeStore = useRouteStore()
const appStore = useAppStore()

const { currentRoute } = router
const routes = computed(() => routeStore.menus || [])
const isCollapse = computed(() => appStore.appConfig.menuIsCollapse)
</script>

<template>
  <el-menu :default-active="currentRoute.path" router :collapse="isCollapse">
    <MenuItem :routes="routes" />
  </el-menu>
</template>

<style scoped>
.el-menu:not(.el-menu--collapse) {
  width: var(--fv-menu-width);

}
.el-menu{
  border-right: none
}
</style>
