<script setup>
import { computed } from 'vue'
import MenuItem from '@/layout/components/MenuItem.vue'
import router from '@/router'
import { useAppStore } from '@/stores/modules/app'
import { useRouteStore } from '@/stores/modules/route'
import SvgIcon from '@/components/SvgIcon/index.vue'

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
// 当父级菜单隐藏时，是否继续显示子级菜单
function showChildren({ children, meta }) {
  if (!children)
    return false
  else if (meta && meta.hideChildren)
    return false
  return true
}
</script>

<template>
  <el-menu
    mode="horizontal"
    :default-active="currentRoute.path" router
    :unique-opened="appStore.appConfig.subMenuUniqueOpened"
    background-color="var(--fv-header-bg-color)"
  >
    <template v-for="(route, index) in routes">
      <el-menu-item v-if="showMenuItem(route)" :key="route.path" :index="route.path">
        <el-icon v-if="route.meta?.icon">
          <SvgIcon :name="route.meta.icon" />
        </el-icon>
        <template #title>
          {{ $t(route.meta?.title) }}
        </template>
      </el-menu-item>
      <el-sub-menu v-else-if="showSubMenu(route)" :key="index" :index="route.path">
        <template #title>
          <el-icon v-if="route.meta?.icon">
            <SvgIcon :name="route.meta.icon" />
          </el-icon>
          <span>{{ $t(route.meta?.title) }}</span>
        </template>
        <MenuItem :routes="route.children" />
      </el-sub-menu>
      <template v-else-if="showChildren(route)">
        <template v-for="(item, i) in route.children">
          <el-menu-item v-if="showMenuItem(item)" :key="item.path" :index="item.path">
            <el-icon v-if="item.meta?.icon">
              <SvgIcon :name="item.meta.icon" />
            </el-icon>
            <template #title>
              {{ $t(item.meta?.title) }}
            </template>
          </el-menu-item>
          <el-sub-menu v-else-if="showSubMenu(item)" :key="i" :index="item.path">
            <template #title>
              <el-icon v-if="item.meta?.icon">
                <SvgIcon :name="item.meta.icon" />
              </el-icon>
              <span>{{ $t(item.meta?.title) }}</span>
            </template>
            <MenuItem :routes="item.children" />
          </el-sub-menu>
        </template>
      </template>
    </template>
  </el-menu>
</template>

<style scoped>
.el-menu--horizontal{
  --el-menu-item-height:calc(var(--fv-header-height) - 3px);
  border-bottom: 0;
  width: 0;
}
:deep().el-menu-item.is-active{
  background-color: var(--fv-menu-active-bg-color);
}
</style>
