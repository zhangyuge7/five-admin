<script setup>
import { ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import LayoutMain from './main/LayoutMain.vue'
import LayoutAside from './main/LayoutAside.vue'
import LayoutHeader from './main/LayoutHeader.vue'
import Tabs from '@/layout/components/Tabs.vue'
import { useAppStore } from '@/stores/modules/app'

const appStore = useAppStore()
const scrollbar = ref()
// 路由变更时手动更新进度条
onBeforeRouteUpdate(() => {
  setTimeout(() => {
    scrollbar.value.update()
  }, 500)
})
</script>

<template>
  <el-container class="h-screen w-screen">
    <el-aside width="auto">
      <LayoutAside />
    </el-aside>
    <el-container>
      <el-header style="padding: 0;" :class="appStore.appConfig.isTabs ? 'fv-tab-header' : 'fv-header'">
        <LayoutHeader />
        <Tabs v-if="appStore.appConfig.isTabs" />
      </el-header>
      <el-main>
        <el-scrollbar ref="scrollbar" class="fv-main">
          <LayoutMain />
        </el-scrollbar>
      </el-main>
    </el-container>
    <el-backtop :right="40" :bottom="40" target=".fv-main>.el-scrollbar__wrap" />
  </el-container>
</template>

<style scoped>
.el-main{
  padding: 0;
}
:deep(.el-scrollbar__view){
  height: 100%;
}
.fv-tab-header{
  height: calc(var(--fv-header-height) + var(--fv-tabs-heigth));
}
.fv-header{
  height: var(--fv-header-height);
}
</style>
