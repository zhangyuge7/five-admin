<script setup name="MenuItem">
import SvgIcon from '@/components/svg-icon/index.vue'

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

  return !!meta
}
// 是否显示为子菜单
function showSubMenu({ children, meta }) {
  if (!children)
    return false
  if (!meta || meta.isHide)
    return false

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
function isLink({ children, path, meta }) {
  if ((path.startsWith('http:') || path.startsWith('https:')) && !children?.length && !meta?.isIframe)
    return true
  return false
}
function openLink({ path }) {
  const arr = path.split(',')
  window.open(arr[0], arr[1])
}
</script>

<template>
  <template v-for="route in props.routes" :key="route.path">
    <el-menu-item v-if="isLink(route)" index="" @click="openLink(route)">
      <el-icon v-if="route.meta?.icon">
        <SvgIcon :name="route.meta.icon" />
      </el-icon>
      <template #title>
        {{ $t(route.meta?.title) }}
      </template>
    </el-menu-item>
    <el-menu-item v-else-if="showMenuItem(route)" :index="route.path">
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
