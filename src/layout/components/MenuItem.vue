<script setup name="MenuItem">
import SvgIcon from '@/components/SvgIcon/index.vue'
import { hasRole } from '@/utils/auth'

const props = defineProps({
  routes: {
    type: Array,
    require: true,
  },
})

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
  <template v-for="route in props.routes" :key="route.path">
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
    <MenuItem v-else-if="showChildren(route)" :routes="route.children" />
  </template>
</template>

<style scoped>
.el-menu-item{
  height: var(--fv-menu-item-height);
}
:deep(.el-sub-menu__title){
  height: var(--fv-menu-item-height);
}
</style>
