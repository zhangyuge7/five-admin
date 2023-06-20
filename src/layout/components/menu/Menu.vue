<script setup>
import MenuItem from './MenuItem.vue'
import constantRoutes from '@/router/constant.js'
</script>

<template>
  <el-menu default-active="2" router>
    <MenuItem :routes="constantRoutes" />
  </el-menu>
</template>

<style scoped>
.el-menu{
  min-width: var(--fv-menu-min-width)
}
</style>
