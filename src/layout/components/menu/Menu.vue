<script setup>
import { computed } from 'vue'
import MenuItem from './MenuItem.vue'
import router from '@/router'

import { useRouteStore } from '@/stores/modules/route'

const routeStore = useRouteStore()

const { currentRoute } = router
const routes = computed(() => routeStore.menus || [])
</script>

<template>
  <el-menu :default-active="currentRoute.path" router>
    <MenuItem :routes="routes" />
  </el-menu>
</template>

<style scoped>
.el-menu{
  min-width: var(--fv-menu-min-width)
}
</style>
