<script setup>
import HorizontalMenu from './menu/HorizontalMenu.vue'
import UserInfo from '@/layout/components/UserInfo.vue'
import Tools from '@/layout/components/tools/index.vue'
import Burger from '@/layout/components/Burger.vue'
</script>

<template>
  <div class="fv-header-2 flex items-center justify-between">
    <div class="h-full flex items-center flex-1">
      <Burger class="fv-burger-1" />
      <HorizontalMenu class="flex-1" />
    </div>
    <div class="flex items-center h-full mr-2 flex-shrink-0 fv-header-right-2">
      <Tools class="mr-1" />
      <UserInfo />
    </div>
  </div>
</template>

<style scoped>
.fv-header-2{
  --fv-tools-hover-bg-color:#0C2135;
  height: var(--fv-header-height);
  /* border-bottom: 1px solid var(--el-border-color); */
  background-color: var(--el-menu-bg-color);

}
:deep().el-menu--horizontal > .el-sub-menu .el-sub-menu__title:hover{
  background-color: var(--el-menu-hover-bg-color);
}
.fv-burger-1{
  color: #fff;
}
</style>

<style>
.fv-header-right-2 *{
  color: #fff;
}
</style>
