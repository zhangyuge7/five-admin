<script setup>
import Burger from '@/layout/components/Burger.vue'
import Breadcrumb from '@/layout/components/Breadcrumb.vue'
import UserInfo from '@/layout/components/UserInfo.vue'
import Tools from '@/layout/components/tools/index.vue'
</script>

<template>
  <div class="fv-header-single-aside flex items-center justify-between">
    <div class="h-full flex items-center">
      <Burger />
      <Breadcrumb style="margin-left: 8px;" />
    </div>
    <div class="flex items-center mr-5 h-full">
      <Tools class="mr-1" />
      <UserInfo />
    </div>
  </div>
</template>

<style scoped>
.fv-header-single-aside{
  height: var(--fv-header-height);
  border-bottom: 1px solid var(--el-border-color);
  background-color: var(--fv-header-bg-color);
}
</style>

<style>
.fv-header-single-aside *{
  color: var(--fv-header-text-color);
}
</style>
