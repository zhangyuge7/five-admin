<script setup>
import { ref } from 'vue'
import AsideLogo from '@/layout/components/AsideLogo.vue'
import Menu from '@/layout/components/menu/Menu.vue'

const scrollbar = ref()
// 手动更新滚动条
function subMenuChange() {
  setTimeout(() => {
    scrollbar.value.update()
  }, 300)
}
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="fv-aside-logo flex items-center shrink-0">
      <AsideLogo />
    </div>
    <el-scrollbar ref="scrollbar">
      <Menu @sub-menu-open="subMenuChange" @sub-menu-close="subMenuChange" />
    </el-scrollbar>
  </div>
</template>

<style scoped>
.fv-aside-logo{
  height: var(--fv-header-height);
  border-bottom: 1px solid var(--el-border-color);
}
</style>
