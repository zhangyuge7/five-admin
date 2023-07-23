<script setup>
import { ref } from 'vue'
import VerticalMenu from './VerticalMenu.vue'
import AsideLogo from '@/layout/components/AsideLogo.vue'
import { useAppStore } from '@/stores/modules/app'

const appStore = useAppStore()

const scrollbar = ref()
// 手动更新滚动条
function subMenuChange() {
  setTimeout(() => {
    scrollbar.value.update()
  }, 300)
}
</script>

<template>
  <div class=" fv-aside">
    <div v-if="appStore.appConfig.showLogo" class="fv-aside-logo flex items-center shrink-0">
      <AsideLogo />
    </div>
    <el-scrollbar ref="scrollbar" class="fv-aside-menu-scrollbar">
      <VerticalMenu @sub-menu-open="subMenuChange" @sub-menu-close="subMenuChange" />
    </el-scrollbar>
  </div>
</template>

<style scoped>
.fv-aside-logo{
  height: var(--fv-header-height);
  background-color: var(--fv-logo-bg-color);
}
.fv-aside{
  @apply
  flex flex-col h-full
}

.fv-aside-menu-scrollbar{
  background-color:var(--fv-side-bg-color);
  /* border-right: 1px solid var(--el-border-color); */
}
</style>
