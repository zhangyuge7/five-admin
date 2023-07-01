<script setup>
import Burger from '@/layout/components/Burger.vue'
import Breadcrumb from '@/layout/components/Breadcrumb.vue'
import UserInfo from '@/layout/components/UserInfo.vue'
</script>

<template>
  <div class="fv-header flex items-center justify-between">
    <div class="h-full flex items-center">
      <Burger />
      <Breadcrumb style="margin-left: 20px;" />
    </div>
    <div style="margin-right: 20px;">
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
