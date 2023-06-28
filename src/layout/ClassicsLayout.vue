<script setup>
import LayoutMain from './main/LayoutMain.vue'
import LayoutAside from './main/LayoutAside.vue'
import LayoutHeader from './main/LayoutHeader.vue'
import Tabs from '@/layout/components/Tabs.vue'
</script>

<template>
  <el-container class="h-screen w-screen">
    <el-aside width="auto">
      <LayoutAside />
    </el-aside>
    <el-container>
      <el-header style="padding: 0;">
        <LayoutHeader />
        <Tabs />
      </el-header>
      <el-main>
        <el-scrollbar>
          <LayoutMain />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.el-main{
  padding: 0;
}
:deep(.el-scrollbar__view){
  height: 100%;
}
.el-header{
  height: calc(var(--fv-header-height) + 40px);
}
</style>
