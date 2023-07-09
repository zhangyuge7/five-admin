<script setup>
import { ref } from 'vue'
import VerticalMenu from './menu/VerticalMenu.vue'
import AsideLogo from '@/layout/components/AsideLogo.vue'

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
    <div class="fv-aside-logo flex items-center shrink-0">
      <AsideLogo />
    </div>
    <el-scrollbar ref="scrollbar">
      <VerticalMenu @sub-menu-open="subMenuChange" @sub-menu-close="subMenuChange" />
    </el-scrollbar>
  </div>
</template>

<style scoped>
.fv-aside-logo{
  height: var(--fv-header-height);
  border-bottom: 1px solid var(--el-border-color);
}
.fv-aside{
  border-right: 1px solid var(--el-border-color);
  @apply
  flex flex-col h-full
}
</style>
