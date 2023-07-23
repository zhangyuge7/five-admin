<script setup>
import HorizontalMenu from './menu/HorizontalMenu.vue'
import UserInfo from '@/layout/components/UserInfo.vue'
import Tools from '@/layout/components/tools/index.vue'
import Burger from '@/layout/components/Burger.vue'
</script>

<template>
  <div class="fv-header-mixture-nav flex items-center justify-between">
    <div class="h-full flex items-center flex-1">
      <Burger class="fv-burger--mixture-nav" />
      <HorizontalMenu class="flex-1" />
    </div>
    <div class="flex items-center h-full mr-2 flex-shrink-0 fv-tools-mixture-nav">
      <Tools class="mr-1" />
      <UserInfo />
    </div>
  </div>
</template>

<style scoped>
.fv-header-mixture-nav{
  height: var(--fv-header-height);
  border-bottom: 1px solid var(--el-border-color);
  background-color: var(--fv-header-bg-color);

}
:deep().el-menu--horizontal > .el-sub-menu .el-sub-menu__title:hover{
  background-color: var(--el-menu-hover-bg-color);
}
</style>

<style>
.fv-tools-mixture-nav *{
  color: var(--fv-header-text-color);
}
.fv-header-mixture-nav .el-menu{
  background-color: var(--fv-header-bg-color);
}
.fv-burger--mixture-nav{
  color: var(--fv-header-text-color);
}
</style>
