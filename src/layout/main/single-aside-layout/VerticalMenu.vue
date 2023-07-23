<script setup>
import { computed } from 'vue'
import MenuItem from '@/layout/components/MenuItem.vue'
import router from '@/router'
import { useAppStore } from '@/stores/modules/app'
import { useRouteStore } from '@/stores/modules/route'

const emit = defineEmits(['subMenuOpen', 'subMenuClose'])
const routeStore = useRouteStore()
const appStore = useAppStore()

const { currentRoute } = router
const routes = computed(() => routeStore.menus || [])
const isCollapse = computed(() => appStore.appConfig.menuIsCollapse)
</script>

<template>
  <el-menu
    :default-active="currentRoute.path" router :collapse="isCollapse"
    :unique-opened="appStore.appConfig.subMenuUniqueOpened"
    @open="emit('subMenuOpen')"
    @close="emit('subMenuClose')"
  >
    <MenuItem :routes="routes" />
  </el-menu>
</template>

<style scoped>
.el-menu:not(.el-menu--collapse) {
  width: var(--fv-menu-width);

}
.el-menu{
  --el-menu-text-color:var(--fv-menu-text-color);
  --el-menu-hover-bg-color:var(--fv-menu-hover-bg-color);
  --el-menu-item-height: var(--fv-menu-item-height);
  --el-menu-active-color: var(--fv-menu-active-color);
  --el-menu-item-font-size: var(--fv-menu-item-font-size);
  --el-menu-bg-color:var(--fv-side-bg-color);
  border-right: 0;
}
:deep().el-menu--inline{
  background-color: var(--fv-menu-inline-bg-color);
}
:deep().el-menu-item.is-active{
  background-color: var(--fv-menu-active-bg-color);
}
</style>
