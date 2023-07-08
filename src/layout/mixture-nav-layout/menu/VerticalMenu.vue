<script setup>
import { computed, onBeforeMount, onUnmounted, shallowRef } from 'vue'
import { useRoute } from 'vue-router'
import MenuItem from './MenuItem.vue'
import { useAppStore } from '@/stores/modules/app'
import mittBus from '@/utils/mitt'

const emit = defineEmits(['subMenuOpen', 'subMenuClose'])
const appStore = useAppStore()

const route = useRoute()
const routes = shallowRef([])
const showMenu = shallowRef(false)
const isCollapse = computed(() => appStore.appConfig.menuIsCollapse)

onBeforeMount(() => {
  mittBus.on('onMainMenuChange', (menus) => {
    showMenu.value = false
    routes.value = menus
    showMenu.value = true
  })
})
onUnmounted(() => {
  mittBus.off('onMainMenuChange')
})
</script>

<template>
  <el-menu
    v-if="showMenu" :default-active="route.path" router
    :collapse="isCollapse"
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
  border-right: none;
}
</style>
