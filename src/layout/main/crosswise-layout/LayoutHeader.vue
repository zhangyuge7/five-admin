<script setup>
import HorizontalMenu from './HorizontalMenu.vue'
import AsideLogo from '@/layout/components/AsideLogo.vue'
import UserInfo from '@/layout/components/UserInfo.vue'
import Tools from '@/layout/components/tools/index.vue'
</script>

<template>
  <div class="fv-header-1 flex items-center justify-between">
    <div class="h-full flex items-center flex-1">
      <AsideLogo class="w-[200px] flex-shrink-0" />
      <HorizontalMenu class="flex-1" />
    </div>
    <div class="flex items-center h-full mr-2 flex-shrink-0 fv-header-right-1">
      <Tools class="mr-1" />
      <UserInfo />
    </div>
  </div>
</template>

<style scoped>
.fv-header-1{
  --fv-tools-hover-bg-color:#0C2135;
  height: var(--fv-header-height);
  /* border-bottom: 1px solid var(--el-border-color); */
  background-color: var(--el-menu-bg-color);

}
:deep().el-menu--horizontal > .el-sub-menu .el-sub-menu__title:hover{
  background-color: var(--el-menu-hover-bg-color);
}
</style>

<style>
.fv-header-right-1 *{
  color: #fff;
}
</style>
