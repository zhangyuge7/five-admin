<script setup>
import AsideLogo from '@/layout/components/AsideLogo.vue'
import Menu from '@/layout/components/menu/Menu.vue'
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="el-header flex items-center">
      <AsideLogo />
    </div>
    <el-scrollbar class="flex-1">
      <Menu />
    </el-scrollbar>
  </div>
</template>
