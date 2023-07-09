<script setup>
import HorizontalMenu from './menu/HorizontalMenu.vue'
import UserInfo from '@/layout/components/UserInfo.vue'
import Tools from '@/layout/components/tools/index.vue'
import Burger from '@/layout/components/Burger.vue'
</script>

<template>
  <div class="fv-header flex items-center justify-between">
    <div class="h-full flex items-center flex-1">
      <!-- <AsideLogo class="w-[200px] flex-shrink-0" /> -->
      <Burger />
      <HorizontalMenu class="flex-1" />
    </div>
    <div class="flex items-center h-full w-[310px] flex-shrink-0">
      <Tools class="mr-1" />
      <UserInfo />
    </div>
  </div>
</template>

<style scoped>
.fv-header{
  height: var(--fv-header-height);
  border-bottom: 1px solid var(--el-border-color);
}
</style>
