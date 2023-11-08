<script setup name="Layout">
import { defineAsyncComponent } from 'vue'
import SettingDrawer from '@/layout/components/SettingDrawer.vue'

import { useAppStore } from '@/stores/modules/app'

const appStore = useAppStore()

const layoutTypes = {
  // 默认
  default: defineAsyncComponent(() => import('./DefaultLayout.vue')),
  // 单侧栏(经典)
  singleAside: defineAsyncComponent(() => import('./main/single-aside-layout/index.vue')),
  // 双侧栏
  doubleAside: defineAsyncComponent(() => import('./main/double-aside-layout/index.vue')),
  // 横向上下布局
  crosswise: defineAsyncComponent(() => import('./main/crosswise-layout/index.vue')),
  // 混合导航布局
  mixture: defineAsyncComponent(() => import('./main/mixture-nav-layout/index.vue')),
}
</script>

<template>
  <div>
    <Component :is="layoutTypes[appStore.appConfig.layoutType]" />
    <SettingDrawer />
  </div>
</template>
