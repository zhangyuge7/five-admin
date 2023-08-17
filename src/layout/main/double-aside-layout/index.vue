<script setup name="DoubleAsideLayout">
import { computed, ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import LayoutHeader from './LayoutHeader.vue'
import LayoutAside from './LayoutAside.vue'
import LayoutMain from '@/layout/main/LayoutMain.vue'
import Tabs from '@/layout/components/Tabs.vue'
import { useAppStore } from '@/stores/modules/app'
import SettingDrawer from '@/layout/components/SettingDrawer.vue'
import LayoutFooter from '@/layout/main/LayoutFooter.vue'

const appStore = useAppStore()
const scrollbar = ref()
const footerHeight = computed(() => appStore.appConfig.showFooter ? 'var(--fv-footer-heigth)' : 0)
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
        <LayoutFooter v-if="appStore.appConfig.showFooter" />
      </el-main>
    </el-container>
  </el-container>
  <el-backtop v-if="appStore.appConfig.enableBacktop" :right="40" :bottom="40" target=".fv-main>.el-scrollbar__wrap" />
  <SettingDrawer />
</template>

<style scoped>
.fv-main{
  padding-bottom: v-bind(footerHeight);
  background-color: var(--fv-main-bg-color);
}
.el-main{
  padding: 0;
  position: relative;
}
:deep(.el-scrollbar__view){
  height: 100%;
}
.fv-tab-header{
  height: calc(var(--fv-header-height) + var(--fv-tabs-height));
}
.fv-header{
  height: var(--fv-header-height);
}
</style>
