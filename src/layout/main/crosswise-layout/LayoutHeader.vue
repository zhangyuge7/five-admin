<script setup>
import HorizontalMenu from './HorizontalMenu.vue'
import AsideLogo from '@/layout/components/AsideLogo.vue'
import UserInfo from '@/layout/components/UserInfo.vue'
import Tools from '@/layout/components/tools/index.vue'
import { useAppStore } from '@/stores/modules/app'

const appStore = useAppStore()
</script>

<template>
  <div class="fv-header-crosswise flex items-center justify-between">
    <div class="h-full flex items-center flex-1">
      <AsideLogo v-if="appStore.appConfig.showLogo" class="w-[220px] flex-shrink-0 fv-logo-crosswise" />
      <HorizontalMenu class="flex-1" />
    </div>
    <div class="flex items-center h-full mr-2 flex-shrink-0 fv-tools-crosswise">
      <Tools class="mr-1" />
      <UserInfo />
    </div>
  </div>
</template>

<style scoped>
.fv-header-crosswise{
  height: var(--fv-header-height);
  border-bottom: 1px solid var(--el-border-color);
  background-color: var(--fv-header-bg-color);
}
:deep().el-menu--horizontal > .el-sub-menu .el-sub-menu__title:hover{
  background-color: var(--el-menu-hover-bg-color);
}
.fv-logo-crosswise{
  height: 100%;
  display: flex;
  align-items: center;
  background-color: var(--fv-logo-bg-color);
}
</style>

<style>
.fv-tools-crosswise *{
  color: var(--fv-header-text-color);
}
</style>
