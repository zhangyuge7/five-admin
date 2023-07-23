<script setup>
import { ref } from 'vue'
import SubMenu from './menu/SubMenu.vue'
import MainMenu from './menu/MainMenu.vue'
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
  <div class="fv-aside">
    <div class="flex items-center shrink-0 fv-aside-logo">
      <AsideLogo />
    </div>
    <div class="flex shrink-0" style="height: calc(100% - var(--fv-header-height));">
      <el-scrollbar class="fv-main-menu">
        <MainMenu />
      </el-scrollbar>
      <el-scrollbar ref="scrollbar">
        <SubMenu @sub-menu-open="subMenuChange" @sub-menu-close="subMenuChange" />
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped>
.fv-aside-logo{
  height: var(--fv-header-height);
  /* border-bottom: 1px solid var(--el-border-color); */

}
.fv-aside{
  /* border-right: 1px solid var(--el-border-color); */
  background-color: var(--el-menu-bg-color);
  @apply
  flex  h-full flex-col
}
.fv-main-menu{
  --el-border-color:#4C4D4F;
  border-right: 1px solid var(--el-border-color);
}
</style>
