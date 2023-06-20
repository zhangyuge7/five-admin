<script setup>
import LayoutMain from './main/LayoutMain.vue'
import LayoutAside from './main/LayoutAside.vue'
import LayoutHeader from './main/LayoutHeader.vue'
</script>

<template>
  <el-container class="h-screen w-screen">
    <el-aside width="auto">
      <LayoutAside />
    </el-aside>
    <el-container>
      <el-header>
        <LayoutHeader />
      </el-header>
      <el-main>
        <LayoutMain />
      </el-main>
    </el-container>
  </el-container>
</template>
