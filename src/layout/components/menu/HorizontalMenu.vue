<script setup>
import { computed } from 'vue'
import MenuItem from './MenuItem.vue'
import router from '@/router'
import { useAppStore } from '@/stores/modules/app'
import { useRouteStore } from '@/stores/modules/route'
import SvgIcon from '@/components/SvgIcon/index.vue'

const emit = defineEmits(['subMenuOpen', 'subMenuClose'])
const routeStore = useRouteStore()
const appStore = useAppStore()

const { currentRoute } = router
const routes = computed(() => routeStore.menus || [])
// 是否显示为菜单项
function showMenuItem({ children, meta }) {
  if (children)
    return false

  if (meta?.isHide)
    return false
  if (meta?.roles && !hasRole(meta?.roles))
    return false

  return !!meta
}
// 是否显示为子菜单
function showSubMenu({ children, meta }) {
  if (!children)
    return false
  if (!meta || meta.isHide)
    return false
  if (meta?.roles && !hasRole(meta?.roles)) {
    meta.hideChildren = true
    return false
  }
  return true
}
</script>

<template>
  <el-menu
    mode="horizontal"
    :default-active="currentRoute.path" router
    :unique-opened="appStore.appConfig.subMenuUniqueOpened"
    @open="emit('subMenuOpen')"
    @close="emit('subMenuClose')"
  >
    <template v-for="route in routes" :key="`${route.path}123`">
      <el-menu-item v-if="showMenuItem(route)" :index="route.path">
        <el-icon v-if="route.meta?.icon">
          <SvgIcon :name="route.meta.icon" />
        </el-icon>
        <template #title>
          {{ $t(route.meta?.title) }}
        </template>
      </el-menu-item>
      <el-sub-menu v-else-if="showSubMenu(route)" :index="route.path">
        <template #title>
          <el-icon v-if="route.meta?.icon">
            <SvgIcon :name="route.meta.icon" />
          </el-icon>
          <span>{{ $t(route.meta?.title) }}</span>
        </template>
        <MenuItem :routes="route.children" />
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<style scoped>
.el-menu{
  border-right: none;
  /* width: 1000px; */
}
</style>
