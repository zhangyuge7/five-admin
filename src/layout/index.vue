<script setup name="Layout">
import SingleAsideLayout from './SingleAsideLayout.vue'
import DoubleAsideLayout from './DoubleAsideLayout.vue'
import DefaultLayout from './DefaultLayout.vue'
import CrosswiseLayout from './crosswise-layout/index.vue'
import MixtureNavLayout from './mixture-nav-layout/index.vue'
import { useAppStore } from '@/stores/modules/app'

const appStore = useAppStore()

const layoutTypes = {
  default: DefaultLayout, // 默认
  singleAside: SingleAsideLayout, // 单侧栏(经典)
  doubleAside: DoubleAsideLayout, // 双侧栏
  crosswise: CrosswiseLayout, // 横向上下布局
  mixture: MixtureNavLayout, // 混合导航布局
}
</script>

<template>
  <div>
    <Component :is="layoutTypes[appStore.appConfig.layoutType]" />
    <!-- 默认布局 -->
    <!-- <DefaultLayout v-if="layout === 'default'" /> -->
    <!-- 经典左右布局 -->
    <!-- <ClassicsLayout v-if="layout === 'classics'" /> -->
    <!-- 横向上下布局 -->
    <!-- <CrosswiseLayout v-if="layout === 'crosswise'" /> -->
    <!-- 混合导航布局 -->
    <!-- <MixtureNavLayout v-if="layout === 'mixture'" /> -->
  </div>
</template>
