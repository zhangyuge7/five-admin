<script setup>
import { computed, onBeforeMount, onUnmounted, shallowRef } from 'vue'
import { useRoute } from 'vue-router'
import MenuItem from '@/layout/components/MenuItem.vue'
import { useAppStore } from '@/stores/modules/app'
import mittBus from '@/utils/mitt'

const emit = defineEmits(['subMenuOpen', 'subMenuClose'])
const appStore = useAppStore()

const route = useRoute()
const routes = shallowRef([])
const isCollapse = computed(() => appStore.appConfig.menuIsCollapse)

onBeforeMount(() => {
  mittBus.on('onAMainMenuChange', (menus) => {
    routes.value = menus
  })
})
onUnmounted(() => {
  mittBus.off('onAMainMenuChange')
})
</script>

<template>
  <el-menu
    :collapse-transition="appStore.appConfig.enableCollapseTransition"
    :default-active="route.path" router :collapse="isCollapse"
    :unique-opened="appStore.appConfig.subMenuUniqueOpened"
    @open="emit('subMenuOpen')" @close="emit('subMenuClose')"
  >
    <MenuItem :routes="routes" />
  </el-menu>
</template>

<style scoped>
.el-menu:not(.el-menu--collapse) {
  width: var(--fv-menu-width);

}

.el-menu {
  border-right: none;
}
:deep().el-menu--inline{
  background-color: var(--fv-menu-inline-bg-color);
}
:deep().el-menu-item.is-active{
  background-color: var(--fv-menu-active-bg-color);
}
</style>
