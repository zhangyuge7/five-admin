<script setup>
import MenuItem from './MenuItem.vue'
import router from '@/router'
import constantRoutes from '@/router/constant.js'

const { currentRoute } = router
</script>

<template>
  <el-menu :default-active="currentRoute.path" router>
    <MenuItem :routes="constantRoutes" />
  </el-menu>
</template>

<style scoped>
.el-menu{
  min-width: var(--fv-menu-min-width)
}
</style>
